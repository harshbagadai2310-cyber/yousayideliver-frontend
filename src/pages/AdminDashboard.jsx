import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { 
  Calendar, Briefcase, FileText, Image as ImageIcon, Tags, Plus, Trash2, 
  Check, RefreshCw, Upload, AlertCircle, Edit, ExternalLink, X, Save, MessageSquare
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Data States
  const [bookings, setBookings] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [niches, setNiches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [media, setMedia] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Form states
  const [nicheForm, setNicheForm] = useState('');
  const [catForm, setCatForm] = useState('');

  // Portfolio Form State (New or Editing)
  const [editingItem, setEditingItem] = useState(null);
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    niche: '',
    category: '',
    imageFileId: '',
    description: ''
  });
  // Services Form State
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    phase: 'Phase 1',
    description: '',
    price: '',
    originalPrice: '',
    savings: '',
    featuresText: '', // COMMA/NEWLINE separated features
    ctaLabel: 'Book Now'
  });

  // Blogs Form & Data States
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    summary: '',
    content: '',
    imageFileId: '',
    tagsText: '',
    published: false
  });

  // Load Data
  const loadTabContent = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'bookings') {
        const data = await api.bookings.list();
        setBookings(data);
      } else if (activeTab === 'portfolio') {
        const [items, ns, cats, files] = await Promise.all([
          api.portfolio.list(),
          api.portfolio.listNiches(),
          api.portfolio.listCategories(),
          api.media.list()
        ]);
        setPortfolio(items);
        setNiches(ns);
        setCategories(cats);
        setMedia(files);
      } else if (activeTab === 'metadata') {
        const [ns, cats] = await Promise.all([
          api.portfolio.listNiches(),
          api.portfolio.listCategories()
        ]);
        setNiches(ns);
        setCategories(cats);
      } else if (activeTab === 'services') {
        const data = await api.services.list();
        setServices(data);
      } else if (activeTab === 'media') {
        const files = await api.media.list();
        setMedia(files);
      } else if (activeTab === 'blogs') {
        const [blogsData, filesData] = await Promise.all([
          api.blogs.listAll(),
          api.media.list()
        ]);
        setBlogs(blogsData);
        setMedia(filesData);
      } else if (activeTab === 'inquiries') {
        const data = await api.inquiries.list();
        setInquiries(data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data for tab: ' + activeTab);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTabContent();
  }, [activeTab]);

  const showFeedback = (msg, isErr = false) => {
    if (isErr) {
      setError(msg);
      setTimeout(() => setError(null), 5000);
    } else {
      setMessage(msg);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  // ==========================================
  // Bookings Handlers
  // ==========================================
  const handleUpdateBookingStatus = async (id, status) => {
    try {
      await api.bookings.updateStatus(id, status);
      showFeedback('Booking status updated successfully!');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  const handleDeleteBooking = async (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!window.confirm('Delete this booking permanently?')) return;
    try {
      await api.bookings.delete(id);
      showFeedback('Booking deleted.');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  // ==========================================
  // Inquiries Handlers
  // ==========================================
  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      await api.inquiries.updateStatus(id, status);
      showFeedback('Inquiry status updated successfully!');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await api.inquiries.delete(id);
      showFeedback('Inquiry deleted.');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  // ==========================================
  // Niches & Categories Handlers
  // ==========================================
  const handleAddNiche = async (e) => {
    e.preventDefault();
    if (!nicheForm) return;
    try {
      await api.portfolio.createNiche(nicheForm);
      setNicheForm('');
      showFeedback('Niche tag created!');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  const handleDeleteNiche = async (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!window.confirm('Delete this niche tag? (Cannot be undone and fails if referenced)')) return;
    try {
      await api.portfolio.deleteNiche(id);
      showFeedback('Niche tag deleted.');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!catForm) return;
    try {
      await api.portfolio.createCategory(catForm);
      setCatForm('');
      showFeedback('Category tag created!');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  const handleDeleteCategory = async (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!window.confirm('Delete this content category? (Fails if referenced)')) return;
    try {
      await api.portfolio.deleteCategory(id);
      showFeedback('Category deleted.');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  // ==========================================
  // Portfolio CRUD Handlers
  // ==========================================
  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();
    const { title, niche, category, imageFileId, description } = portfolioForm;
    if (!title || !niche || !category) {
      showFeedback('Title, Niche, and Category are required.', true);
      return;
    }

    try {
      if (editingItem) {
        await api.portfolio.update(editingItem._id, {
          title,
          niche,
          category,
          imageFileId: imageFileId || null,
          description
        });
        showFeedback('Portfolio item modified.');
      } else {
        await api.portfolio.create({
          title,
          niche,
          category,
          imageFileId: imageFileId || null,
          description
        });
        showFeedback('New portfolio item launched!');
      }
      setEditingItem(null);
      setPortfolioForm({ title: '', niche: '', category: '', imageFileId: '', description: '' });
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  const startEditPortfolio = (item) => {
    setEditingItem(item);
    setPortfolioForm({
      title: item.title,
      niche: item.niche?._id || item.niche || '',
      category: item.category?._id || item.category || '',
      imageFileId: item.imageFileId || '',
      description: item.description || ''
    });
  };

  const handleDeletePortfolio = async (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!window.confirm('Are you sure you want to delete this portfolio project?')) return;
    try {
      await api.portfolio.delete(id);
      showFeedback('Portfolio project removed.');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  // ==========================================
  // Services CRUD Handlers
  // ==========================================
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    const { title, phase, description, price, originalPrice, savings, featuresText, ctaLabel } = serviceForm;
    if (!title || !phase || !description || !price) {
      showFeedback('Title, phase, description, and price are required.', true);
      return;
    }

    // Split featuresText by newline and filter out empty strings
    const features = featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    try {
      if (editingService) {
        await api.services.update(editingService._id, {
          title, phase, description, price, originalPrice, savings, features, ctaLabel
        });
        showFeedback('Service package modified.');
      } else {
        await api.services.create({
          title, phase, description, price, originalPrice, savings, features, ctaLabel
        });
        showFeedback('New package tier added!');
      }
      setEditingService(null);
      setServiceForm({ title: '', phase: 'Phase 1', description: '', price: '', originalPrice: '', savings: '', featuresText: '', ctaLabel: 'Book Now' });
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  const startEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      phase: service.phase,
      description: service.description,
      price: service.price,
      originalPrice: service.originalPrice || '',
      savings: service.savings || '',
      featuresText: service.features.join('\n'),
      ctaLabel: service.ctaLabel || 'Book Now'
    });
  };

  const handleDeleteService = async (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!window.confirm('Delete this service package tier permanently?')) return;
    try {
      await api.services.delete(id);
      showFeedback('Service package deleted.');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  // ==========================================
  // Media GridFS Handlers
  // ==========================================
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      await api.media.upload(file);
      showFeedback('File uploaded successfully to MongoDB GridFS!');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedia = async (e, fileId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!window.confirm('Delete this file from GridFS database?')) return;
    try {
      await api.media.delete(fileId);
      showFeedback('Media asset deleted.');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  // ==========================================
  // Blogs Handlers
  // ==========================================
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const { title, summary, content, imageFileId, tagsText, published } = blogForm;
    if (!title || !summary || !content) {
      showFeedback('Title, summary, and content are required.', true);
      return;
    }

    const tags = tagsText
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    try {
      if (editingBlog) {
        await api.blogs.update(editingBlog._id, {
          title,
          summary,
          content,
          imageFileId: imageFileId || null,
          tags,
          published
        });
        showFeedback('Blog post modified.');
      } else {
        await api.blogs.create({
          title,
          summary,
          content,
          imageFileId: imageFileId || null,
          tags,
          published
        });
        showFeedback('New blog post launched!');
      }
      setEditingBlog(null);
      setBlogForm({ title: '', summary: '', content: '', imageFileId: '', tagsText: '', published: false });
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  const startEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      imageFileId: blog.imageFileId || '',
      tagsText: blog.tags ? blog.tags.join(', ') : '',
      published: blog.published || false
    });
  };

  const handleDeleteBlog = async (e, id) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!window.confirm('Delete this blog post permanently?')) return;
    try {
      await api.blogs.delete(id);
      showFeedback('Blog post deleted.');
      loadTabContent();
    } catch (err) {
      showFeedback(err.message, true);
    }
  };

  return (
    <div className="admin-dashboard-page section">
      <div className="container-fluid admin-container">
        <div className="admin-header">
          <div>
            <h1>ADMIN CONTROL CONSOLE</h1>
            <p>You Say I Deliver MERN Systems Hub</p>
          </div>
          <button className="btn btn-secondary" onClick={loadTabContent} title="Reload Data">
            <RefreshCw size={16} /> Reload
          </button>
        </div>

        {/* Global Feedback Banner */}
        {message && <div className="feedback-banner success-feedback">{message}</div>}
        {error && <div className="feedback-banner error-feedback"><AlertCircle size={16} /> {error}</div>}

        {/* Sub-Navigation Tabs */}
        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            <Calendar size={16} /> Bookings
          </button>
          <button className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`} onClick={() => setActiveTab('portfolio')}>
            <FileText size={16} /> Portfolio Work
          </button>
          <button className={`tab-btn ${activeTab === 'metadata' ? 'active' : ''}`} onClick={() => setActiveTab('metadata')}>
            <Tags size={16} /> Niches & Categories
          </button>
          <button className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
            <Briefcase size={16} /> Services & Pricing
          </button>
           <button className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`} onClick={() => setActiveTab('media')}>
            <ImageIcon size={16} /> GridFS Media Library
          </button>
          <button className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>
            <FileText size={16} /> Blogs CRUD
          </button>
          <button className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`} onClick={() => setActiveTab('inquiries')}>
            <MessageSquare size={16} /> Inquiries
          </button>
        </div>

        {/* Dynamic Panels */}
        <div className="admin-panel-card glass-panel">
          {loading && (
            <div className="panel-loading-overlay">
              <div className="spinner"></div>
              <p>Syncing systems...</p>
            </div>
          )}

          {/* BOOKINGS TAB */}
          {activeTab === 'bookings' && (
            <div className="bookings-panel">
              <h3>Appointment Schedule ({bookings.length})</h3>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date / Slot</th>
                      <th>Client Info</th>
                      <th>Package Interest</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id} className={`status-row-${booking.status.toLowerCase()}`}>
                        <td>
                          <div className="td-bold">{booking.date}</div>
                          <div className="td-sub">{booking.timeSlot}</div>
                        </td>
                        <td>
                          <div className="td-bold">{booking.name}</div>
                          <div className="td-sub">{booking.companyName || 'No Company'}</div>
                          <div className="td-sub">{booking.email} | {booking.phone}</div>
                        </td>
                        <td><span className="package-interest-badge">{booking.packageInterest}</span></td>
                        <td>
                          <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-row">
                            {booking.status !== 'Confirmed' && (
                              <button 
                                type="button"
                                className="action-icon-btn confirm-btn" 
                                onClick={(e) => { e.preventDefault(); handleUpdateBookingStatus(booking._id, 'Confirmed'); }}
                                title="Confirm Booking"
                              >
                                <Check size={14} /> Confirm
                              </button>
                            )}
                            {booking.status !== 'Cancelled' && (
                              <button 
                                type="button"
                                className="action-icon-btn cancel-btn" 
                                onClick={(e) => { e.preventDefault(); handleUpdateBookingStatus(booking._id, 'Cancelled'); }}
                                title="Cancel Booking"
                              >
                                Cancel
                              </button>
                            )}
                            <button 
                              type="button"
                              className="action-icon-btn delete-btn" 
                              onClick={(e) => handleDeleteBooking(e, booking._id)}
                              title="Delete Booking"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan="5" className="empty-td">No booking requests found. Connect and verify logs.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PORTFOLIO TAB */}
          {activeTab === 'portfolio' && (
            <div className="portfolio-panel">
              <div className="grid-form-list">
                {/* Form Side */}
                <div className="admin-sub-card">
                  <h4>{editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Project'}</h4>
                  <form onSubmit={handlePortfolioSubmit} className="admin-form">
                    <div className="form-group">
                      <label>Project Title *</label>
                      <input 
                        type="text" 
                        value={portfolioForm.title}
                        onChange={(e) => setPortfolioForm({...portfolioForm, title: e.target.value})}
                        placeholder="e.g. Tour Guide Responsive Portal"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Niche Tag *</label>
                      <select 
                        value={portfolioForm.niche}
                        onChange={(e) => setPortfolioForm({...portfolioForm, niche: e.target.value})}
                        required
                      >
                        <option value="">-- Choose Niche --</option>
                        {niches.map((n) => <option key={n._id} value={n._id}>{n.name}</option>)}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Content Category *</label>
                      <select 
                        value={portfolioForm.category}
                        onChange={(e) => setPortfolioForm({...portfolioForm, category: e.target.value})}
                        required
                      >
                        <option value="">-- Choose Category --</option>
                        {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>GridFS Media File (Optional)</label>
                      <select 
                        value={portfolioForm.imageFileId}
                        onChange={(e) => setPortfolioForm({...portfolioForm, imageFileId: e.target.value})}
                      >
                        <option value="">-- None (Styled Fallback Rendered) --</option>
                        {media.map((file) => (
                          <option key={file._id} value={file._id}>
                            {file.filename} ({(file.length / 1024 / 1024).toFixed(2)} MB)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Project Description</label>
                      <textarea 
                        rows="3"
                        value={portfolioForm.description}
                        onChange={(e) => setPortfolioForm({...portfolioForm, description: e.target.value})}
                        placeholder="Add project specifics, client goals, and technologies used."
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        <Save size={16} /> {editingItem ? 'Save Updates' : 'Publish Project'}
                      </button>
                      {editingItem && (
                        <button 
                          type="button" 
                          className="btn btn-secondary" 
                          onClick={() => {
                            setEditingItem(null);
                            setPortfolioForm({ title: '', niche: '', category: '', imageFileId: '', description: '' });
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* List Side */}
                <div className="admin-list-side">
                  <h4>Curated Portfolio ({portfolio.length})</h4>
                  <div className="list-container">
                    {portfolio.map((item) => (
                      <div key={item._id} className="item-row glass-panel">
                        <div className="item-thumb">
                          {item.imageFileId ? (
                            item.mediaInfo?.contentType?.startsWith('video/') ? (
                              <video src={api.media.getStreamUrl(item.imageFileId)} muted preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <img src={api.media.getStreamUrl(item.imageFileId)} alt="" />
                            )
                          ) : (
                            <div className="thumb-placeholder"><ImageIcon size={18} /></div>
                          )}
                        </div>
                        <div className="item-info">
                          <h5>{item.title}</h5>
                          <div className="item-tags">
                            <span className="badge-tag">{item.category?.name || 'Category'}</span>
                            <span className="badge-tag">{item.niche?.name || 'Niche'}</span>
                          </div>
                        </div>
                        <div className="item-row-actions">
                          <button type="button" className="row-action-btn edit" onClick={(e) => { e.preventDefault(); startEditPortfolio(item); }} title="Edit Project">
                            <Edit size={14} />
                          </button>
                          <button type="button" className="row-action-btn delete" onClick={(e) => handleDeletePortfolio(e, item._id)} title="Delete Project">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NICHES & CATEGORIES TAB */}
          {activeTab === 'metadata' && (
            <div className="metadata-panel">
              <div className="grid-form-list">
                {/* Niches CRUD */}
                <div className="admin-sub-card">
                  <h4>Manage Niche Tags ({niches.length})</h4>
                  <form onSubmit={handleAddNiche} className="inline-add-form">
                    <input 
                      type="text" 
                      placeholder="Add custom niche... (e.g. Tours and Travel)" 
                      value={nicheForm}
                      onChange={(e) => setNicheForm(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary"><Plus size={16} /></button>
                  </form>

                  <div className="meta-tags-list">
                    {niches.map((n) => (
                      <div key={n._id} className="meta-tag-chip">
                        <span>{n.name}</span>
                        <button type="button" onClick={(e) => handleDeleteNiche(e, n._id)}><X size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories CRUD */}
                <div className="admin-sub-card">
                  <h4>Manage Content Categories ({categories.length})</h4>
                  <form onSubmit={handleAddCategory} className="inline-add-form">
                    <input 
                      type="text" 
                      placeholder="Add category... (e.g. Reel Content)" 
                      value={catForm}
                      onChange={(e) => setCatForm(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary"><Plus size={16} /></button>
                  </form>

                  <div className="meta-tags-list">
                    {categories.map((c) => (
                      <div key={c._id} className="meta-tag-chip">
                        <span>{c.name}</span>
                        <button type="button" onClick={(e) => handleDeleteCategory(e, c._id)}><X size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="services-panel">
              <div className="grid-form-list">
                {/* Form Side */}
                <div className="admin-sub-card">
                  <h4>{editingService ? 'Edit Pricing Tier' : 'Add New Pricing Tier'}</h4>
                  <form onSubmit={handleServiceSubmit} className="admin-form">
                    <div className="form-group">
                      <label>Package Title *</label>
                      <input 
                        type="text" 
                        value={serviceForm.title}
                        onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                        placeholder="e.g. Ultimate Package Tier: Elite Corporate..."
                        required
                      />
                    </div>

                    <div className="grid-2-form">
                      <div className="form-group">
                        <label>Phase Tier *</label>
                        <select 
                          value={serviceForm.phase}
                          onChange={(e) => setServiceForm({...serviceForm, phase: e.target.value})}
                          required
                        >
                          <option value="Phase 1">Phase 1</option>
                          <option value="Phase 2">Phase 2</option>
                          <option value="Phase 3">Phase 3</option>
                          <option value="Elite">Elite Tier</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Price Display *</label>
                        <input 
                          type="text" 
                          value={serviceForm.price}
                          onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                          placeholder="e.g. ₹5,000"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid-2-form">
                      <div className="form-group">
                        <label>Original Price (Strike-through)</label>
                        <input 
                          type="text" 
                          value={serviceForm.originalPrice}
                          onChange={(e) => setServiceForm({...serviceForm, originalPrice: e.target.value})}
                          placeholder="e.g. ₹6,000 (Optional)"
                        />
                      </div>

                      <div className="form-group">
                        <label>Savings Label</label>
                        <input 
                          type="text" 
                          value={serviceForm.savings}
                          onChange={(e) => setServiceForm({...serviceForm, savings: e.target.value})}
                          placeholder="e.g. ₹1,000 (Optional)"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Package Description *</label>
                      <textarea 
                        rows="3"
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                        placeholder="Provide details about target objectives and core focus..."
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Included Features (One per line) *</label>
                      <textarea 
                        rows="4"
                        value={serviceForm.featuresText}
                        onChange={(e) => setServiceForm({...serviceForm, featuresText: e.target.value})}
                        placeholder="Figma core blueprints&#10;Custom React deployment&#10;9-step custom roadmap integration"
                      />
                    </div>

                    <div className="form-group">
                      <label>Call-to-Action (CTA) Label</label>
                      <input 
                        type="text" 
                        value={serviceForm.ctaLabel}
                        onChange={(e) => setServiceForm({...serviceForm, ctaLabel: e.target.value})}
                        placeholder="e.g. Book Strategy Session"
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        <Save size={16} /> {editingService ? 'Save Updates' : 'Publish Package'}
                      </button>
                      {editingService && (
                        <button 
                          type="button" 
                          className="btn btn-secondary" 
                          onClick={() => {
                            setEditingService(null);
                            setServiceForm({ title: '', phase: 'Phase 1', description: '', price: '', featuresText: '', ctaLabel: 'Book Now' });
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* List Side */}
                <div className="admin-list-side">
                  <h4>Active Packages ({services.length})</h4>
                  <div className="list-container">
                    {services.map((service) => (
                      <div key={service._id} className="item-row glass-panel">
                        <div className="item-info">
                          <span className="service-phase">{service.phase}</span>
                          <h5>{service.title}</h5>
                          <div className="td-bold">{service.price}</div>
                        </div>
                        <div className="item-row-actions">
                          <button type="button" className="row-action-btn edit" onClick={(e) => { e.preventDefault(); startEditService(service); }} title="Edit Package">
                            <Edit size={14} />
                          </button>
                          <button type="button" className="row-action-btn delete" onClick={(e) => handleDeleteService(e, service._id)} title="Delete Package">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MEDIA TAB */}
          {activeTab === 'media' && (
            <div className="media-panel">
              <div className="media-uploader-box glass-panel">
                <Upload size={32} className="upload-box-icon" />
                <h4>MongoDB GridFS Upload Port</h4>
                <p>Select images or video assets to store in GridFS bucket chunks.</p>
                <label className="btn btn-primary file-input-label">
                  <Upload size={16} /> Choose File
                  <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
                </label>
              </div>

              <h4>Stored Media Files ({media.length})</h4>
              <div className="media-files-grid">
                {media.map((file) => (
                  <div key={file._id} className="media-file-card glass-panel">
                    <div className="media-preview-container">
                      {file.contentType && file.contentType.startsWith('image/') ? (
                        <img src={api.media.getStreamUrl(file._id)} alt="" className="media-file-img" />
                      ) : (
                        <div className="file-icon-placeholder"><ImageIcon size={32} /></div>
                      )}
                    </div>
                    <div className="media-file-details">
                      <div className="media-file-name" title={file.filename}>{file.filename}</div>
                      <div className="media-file-size">{(file.length / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                    <div className="media-card-footer">
                      <a href={api.media.getStreamUrl(file._id)} target="_blank" rel="noreferrer" className="media-action-btn view" title="Open Stream">
                        <ExternalLink size={14} />
                      </a>
                      <button type="button" className="media-action-btn delete" onClick={(e) => handleDeleteMedia(e, file._id)} title="Delete file">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {media.length === 0 && (
                  <div className="empty-media-msg">No media files stored in GridFS yet.</div>
                )}
              </div>
            </div>
          )}

          {/* BLOGS TAB */}
          {activeTab === 'blogs' && (
            <div className="blogs-panel">
              <div className="grid-form-list">
                {/* Form Side */}
                <div className="admin-sub-card">
                  <h4>{editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</h4>
                  <form onSubmit={handleBlogSubmit} className="admin-form">
                    <div className="form-group">
                      <label>Blog Title *</label>
                      <input 
                        type="text" 
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                        placeholder="e.g. Modern MERN Stack Best Practices"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Brief Summary *</label>
                      <input 
                        type="text" 
                        value={blogForm.summary}
                        onChange={(e) => setBlogForm({...blogForm, summary: e.target.value})}
                        placeholder="Provide a 1-sentence hook for the catalog catalog..."
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>GridFS Featured Image</label>
                      <select 
                        value={blogForm.imageFileId}
                        onChange={(e) => setBlogForm({...blogForm, imageFileId: e.target.value})}
                      >
                        <option value="">-- None (Styled Fallback Cover) --</option>
                        {media.map((file) => (
                          <option key={file._id} value={file._id}>
                            {file.filename} ({(file.length / 1024 / 1024).toFixed(2)} MB)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Tags (Comma separated)</label>
                      <input 
                        type="text" 
                        value={blogForm.tagsText}
                        onChange={(e) => setBlogForm({...blogForm, tagsText: e.target.value})}
                        placeholder="e.g. Branding, Strategy, React"
                      />
                    </div>

                    <div className="form-group" style={{ flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}>
                      <input 
                        type="checkbox" 
                        id="blog-published"
                        checked={blogForm.published}
                        onChange={(e) => setBlogForm({...blogForm, published: e.target.checked})}
                        style={{ width: 'auto', cursor: 'pointer' }}
                      />
                      <label htmlFor="blog-published" style={{ cursor: 'pointer', userSelect: 'none' }}>Publish Article Immediately</label>
                    </div>

                    <div className="form-group">
                      <label>Article Content (HTML formatting supported) *</label>
                      <textarea 
                        rows="8"
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                        placeholder="<p>Write your detailed article body here...</p>"
                        required
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        <Save size={16} /> {editingBlog ? 'Save Updates' : 'Launch Article'}
                      </button>
                      {editingBlog && (
                        <button 
                          type="button" 
                          className="btn btn-secondary" 
                          onClick={() => {
                            setEditingBlog(null);
                            setBlogForm({ title: '', summary: '', content: '', imageFileId: '', tagsText: '', published: false });
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* List Side */}
                <div className="admin-list-side">
                  <h4>Article Blueprints ({blogs.length})</h4>
                  <div className="list-container">
                    {blogs.map((b) => (
                      <div key={b._id} className="item-row glass-panel" style={{ opacity: b.published ? 1 : 0.6 }}>
                        <div className="item-thumb">
                          {b.imageFileId ? (
                            b.mediaInfo?.contentType?.startsWith('video/') ? (
                              <video src={api.media.getStreamUrl(b.imageFileId)} muted preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <img src={api.media.getStreamUrl(b.imageFileId)} alt="" />
                            )
                          ) : (
                            <div className="thumb-placeholder"><ImageIcon size={18} /></div>
                          )}
                        </div>
                        <div className="item-info">
                          <span className={`status-badge ${b.published ? 'status-confirmed' : 'status-pending'}`} style={{ marginBottom: '0.25rem' }}>
                            {b.published ? 'Published' : 'Draft'}
                          </span>
                          <h5>{b.title}</h5>
                          <div className="td-sub" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.summary}</div>
                        </div>
                        <div className="item-row-actions">
                          <button type="button" className="row-action-btn edit" onClick={(e) => { e.preventDefault(); startEditBlog(b); }} title="Edit Article">
                            <Edit size={14} />
                          </button>
                          <button type="button" className="row-action-btn delete" onClick={(e) => handleDeleteBlog(e, b._id)} title="Delete Article">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {blogs.length === 0 && (
                      <div className="empty-media-msg">No articles drafted or published yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="tab-pane">
              <div className="section-header">
                <h2>Client Inquiries Ledger</h2>
                <p>Manage raw inquiry responses and milestone requests</p>
              </div>
              
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name / Company</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Phone</th>
                      <th>Message Details</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center">No inquiry requests registered.</td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => (
                        <tr key={inq._id}>
                          <td>
                            <strong>{inq.name}</strong>
                            {inq.companyName && <div className="text-muted small">{inq.companyName}</div>}
                          </td>
                          <td><a href={`mailto:${inq.email}`}>{inq.email}</a></td>
                          <td>{inq.location}</td>
                          <td>{inq.phone || 'N/A'}</td>
                          <td style={{ maxWidth: '300px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                            {inq.details}
                          </td>
                          <td>
                            <select 
                              value={inq.status} 
                              onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                              className={`status-select status-${inq.status.toLowerCase()}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Reviewed">Reviewed</option>
                              <option value="Replied">Replied</option>
                            </select>
                          </td>
                          <td>
                            <button 
                              type="button"
                              onClick={() => handleDeleteInquiry(inq._id)} 
                              className="delete-row-btn"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-dashboard-page {
          padding-top: 8rem;
          min-height: 90vh;
          background: #FAF6EE;
        }
        .admin-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }
        .admin-header h1 {
          font-family: var(--font-serif);
          font-size: 2.25rem;
          letter-spacing: 0.05em;
        }
        .admin-header p {
          color: var(--color-text-muted);
          font-size: 0.9rem;
        }
        
        /* Tab panel */
        .admin-tabs {
          display: flex;
          gap: 0.5rem;
          border-bottom: 1.5px solid var(--color-border);
          margin-bottom: 2rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          padding: 0.75rem 1.25rem;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-text-muted);
          cursor: pointer;
          border-radius: 8px 8px 0 0;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .tab-btn:hover {
          color: var(--color-primary);
          background: rgba(139, 0, 0, 0.03);
        }
        .tab-btn.active {
          color: var(--color-primary);
          border-bottom: 3px solid var(--color-primary);
          background: rgba(255, 255, 255, 0.6);
        }
        
        .admin-panel-card {
          padding: 2.5rem;
          background: #FFFFFF;
          position: relative;
          min-height: 400px;
          border-radius: var(--border-radius-lg);
        }
        .panel-loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(2px);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        /* Banner styles */
        .feedback-banner {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .success-feedback {
          background: rgba(40, 167, 69, 0.08);
          border: 1px solid rgba(40, 167, 69, 0.2);
          color: #28A745;
        }
        .error-feedback {
          background: rgba(220, 53, 69, 0.08);
          border: 1px solid rgba(220, 53, 69, 0.2);
          color: #DC3545;
        }
        
        /* Table Layout */
        .table-responsive {
          width: 100%;
          overflow-x: auto;
          margin-top: 1.5rem;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.9rem;
        }
        .admin-table th {
          background: #F8F5EE;
          padding: 1rem;
          font-weight: 600;
          border-bottom: 1.5px solid var(--color-border);
        }
        .admin-table td {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid #E8E5DF;
          vertical-align: middle;
        }
        .td-bold {
          font-weight: 600;
          color: var(--color-text-main);
        }
        .td-sub {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          margin-top: 0.15rem;
        }
        .package-interest-badge {
          background: rgba(139,0,0,0.05);
          color: var(--color-primary);
          padding: 0.25rem 0.6rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .status-pending {
          background: #FFE8CC;
          color: #D9480F;
        }
        .status-confirmed {
          background: #D3F9D8;
          color: #2B8A3E;
        }
        .status-cancelled {
          background: #FFE3E3;
          color: #C92A2A;
        }
        
        .action-row {
          display: flex;
          gap: 0.5rem;
        }
        .action-icon-btn {
          border: none;
          padding: 0.35rem 0.65rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.2s;
        }
        .confirm-btn {
          background: #E6FCF5;
          color: #0CA678;
        }
        .confirm-btn:hover {
          background: #C3FAE8;
        }
        .cancel-btn {
          background: #FFF0F6;
          color: #D6336C;
        }
        .cancel-btn:hover {
          background: #FFE3E3;
        }
        .delete-btn {
          background: #FFF5F5;
          color: #E03131;
        }
        .delete-btn:hover {
          background: #FFE3E3;
        }
        
        /* Grid split (Form / List) */
        .grid-form-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: flex-start;
        }
        .admin-sub-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .admin-sub-card h4 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 0.5rem;
        }
        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
        }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.65rem 0.85rem;
          border: 1px solid #E8E5DF;
          background: #FAF8F5;
          border-radius: 6px;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          outline: none;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: var(--color-primary);
          background: #FFFFFF;
        }
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        
        /* List list-container */
        .admin-list-side h4 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .list-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 550px;
          overflow-y: auto;
        }
        .item-row {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.7);
          border-radius: 8px;
          gap: 1rem;
        }
        .item-thumb {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          overflow: hidden;
          background: #F0EDE8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .item-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .thumb-placeholder {
          color: var(--color-text-muted);
        }
        .item-info {
          flex-grow: 1;
        }
        .item-info h5 {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--color-text-main);
          margin-bottom: 0.25rem;
        }
        .item-tags {
          display: flex;
          gap: 0.4rem;
        }
        .badge-tag {
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          background: #F0EDE8;
          border-radius: 10px;
          color: var(--color-text-muted);
          font-weight: 500;
        }
        .item-row-actions {
          display: flex;
          gap: 0.4rem;
        }
        .row-action-btn {
          border: none;
          background: none;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .row-action-btn.edit {
          color: #1A73E8;
        }
        .row-action-btn.edit:hover {
          background: rgba(26,115,232,0.08);
        }
        .row-action-btn.delete {
          color: #DC3545;
        }
        .row-action-btn.delete:hover {
          background: rgba(220,53,69,0.08);
        }
        
        /* Inline metadata form */
        .inline-add-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .inline-add-form input {
          flex-grow: 1;
          padding: 0.6rem 0.85rem;
          border: 1px solid #E8E5DF;
          background: #FAF8F5;
          border-radius: 6px;
          outline: none;
          font-family: var(--font-sans);
          font-size: 0.88rem;
        }
        .inline-add-form input:focus {
          border-color: var(--color-primary);
          background: #FFFFFF;
        }
        .meta-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          max-height: 250px;
          overflow-y: auto;
          padding: 0.5rem 0;
        }
        .meta-tag-chip {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: #F0EDE8;
          padding: 0.35rem 0.75rem;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .meta-tag-chip button {
          border: none;
          background: none;
          cursor: pointer;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          padding: 0.1rem;
          border-radius: 50%;
        }
        .meta-tag-chip button:hover {
          background: var(--color-primary);
          color: #FFFFFF;
        }
        
        /* Media uploader Port */
        .media-uploader-box {
          border: 2px dashed rgba(139,0,0,0.25);
          background: rgba(139,0,0,0.01);
          padding: 3rem 2rem;
          text-align: center;
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          border-radius: var(--border-radius-md);
        }
        .upload-box-icon {
          color: var(--color-primary);
        }
        .file-input-label {
          margin-top: 0.5rem;
        }
        
        .media-files-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .media-file-card {
          display: flex;
          flex-direction: column;
          padding: 0.5rem;
          background: #FFFFFF;
          border-radius: 8px;
          overflow: hidden;
        }
        .media-preview-container {
          width: 100%;
          height: 120px;
          border-radius: 6px;
          overflow: hidden;
          background: #F5F2EC;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .media-file-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .file-icon-placeholder {
          color: var(--color-text-muted);
        }
        .media-file-details {
          padding: 0.5rem 0.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex-grow: 1;
        }
        .media-file-name {
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--color-text-main);
        }
        .media-file-size {
          font-size: 0.72rem;
          color: var(--color-text-muted);
        }
        .media-card-footer {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #FAF8F5;
          padding-top: 0.5rem;
        }
        .media-action-btn {
          border: none;
          background: none;
          padding: 0.35rem;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .media-action-btn.view {
          color: var(--color-text-muted);
        }
        .media-action-btn.view:hover {
          color: var(--color-primary);
          background: rgba(139,0,0,0.05);
        }
        .media-action-btn.delete {
          color: #DC3545;
        }
        .media-action-btn.delete:hover {
          background: rgba(220,53,69,0.08);
        }
        .empty-media-msg {
          grid-column: 1 / -1;
          text-align: center;
          color: var(--color-text-muted);
          padding: 3rem 0;
          font-size: 0.9rem;
        }

        @media (max-width: 992px) {
          .grid-form-list {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .admin-panel-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
