import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Clock, User, ArrowRight, Tag } from 'lucide-react';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await api.blogs.list();
        setBlogs(data);
      } catch (err) {
        console.error('Failed to load blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Compute all unique tags from active blogs
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    blogs.forEach(blog => {
      if (blog.tags) {
        blog.tags.forEach(tag => tagsSet.add(tag.trim()));
      }
    });
    return ['All', ...Array.from(tagsSet)];
  }, [blogs]);

  // Filter logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === 'All' || 
        (blog.tags && blog.tags.some(t => t.trim() === selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [blogs, searchQuery, selectedTag]);

  return (
    <div className="blogs-page section">
      <div className="container">
        <h1 className="section-title">THE TRANSMISSIONS</h1>
        <p className="section-subtitle">
          Strategic research reports, digital systems analysis, branding philosophies, and technical blueprints written for high-growth operations.
        </p>

        {/* Filter panel */}
        <div className="blogs-filter-panel glass-panel">
          <div className="blogs-search">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="blogs-tags">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-filter-btn ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog grid */}
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Syncing transmissions library...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="no-blogs-panel glass-panel">
            <BookOpen size={36} />
            <h3>No Transmissions Found</h3>
            <p>Try matching another tag or search string.</p>
            <button className="btn btn-secondary" onClick={() => { setSearchQuery(''); setSelectedTag('All'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="blogs-grid">
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map(blog => (
                <motion.div
                  layout
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="blog-card glass-panel"
                >
                  <div className="blog-media">
                    {blog.imageFileId ? (
                      <img src={api.media.getStreamUrl(blog.imageFileId)} alt={blog.title} className="blog-img" />
                    ) : (
                      <div className="blog-fallback-cover">
                        <div className="fallback-glow"></div>
                        <span className="fallback-tag">{blog.tags[0] || 'Strategic'}</span>
                        <BookOpen size={24} className="fallback-icon" />
                      </div>
                    )}
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span className="meta-item"><User size={12} /> {blog.author}</span>
                      <span className="meta-item"><Clock size={12} /> {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h3 className="blog-card-title">{blog.title}</h3>
                    <p className="blog-card-summary">{blog.summary}</p>
                    
                    <div className="blog-card-tags">
                      {blog.tags.map(t => (
                        <span key={t} className="blog-tag-chip"><Tag size={10} /> {t}</span>
                      ))}
                    </div>

                    <div className="blog-card-footer">
                      <Link to={`/blogs/${blog.slug}`} className="btn-text read-more-btn">
                        Read Blueprint <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <style>{`
        .blogs-page {
          padding-top: 8rem;
          min-height: 80vh;
        }
        
        /* Filter controls */
        .blogs-filter-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 2rem;
          margin-bottom: 3rem;
          background: rgba(255,255,255,0.7);
          gap: 2rem;
          flex-wrap: wrap;
        }
        .blogs-search {
          display: flex;
          align-items: center;
          background: #F0EDE8;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          min-width: 250px;
          flex-grow: 0.5;
        }
        .blogs-search .search-icon {
          color: var(--color-text-muted);
          margin-right: 0.5rem;
        }
        .blogs-search input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-text-main);
        }
        .blogs-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .tag-filter-btn {
          border: 1px solid rgba(0,0,0,0.05);
          background: transparent;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          color: var(--color-text-muted);
          transition: all 0.3s;
        }
        .tag-filter-btn:hover {
          color: var(--color-primary);
          background: rgba(139,0,0,0.03);
        }
        .tag-filter-btn.active {
          background: var(--color-primary);
          color: #FFFFFF;
          border-color: var(--color-primary);
          box-shadow: 0 4px 10px rgba(139,0,0,0.15);
        }

        /* Blogs Catalog Grid */
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2.5rem;
        }
        .blog-card {
          display: flex;
          flex-direction: column;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          background: #FFFFFF;
        }
        .blog-media {
          width: 100%;
          height: 200px;
          overflow: hidden;
          position: relative;
        }
        .blog-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .blog-card:hover .blog-img {
          transform: scale(1.05);
        }
        .blog-fallback-cover {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1C1C1C 0%, #3a0003 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          position: relative;
          overflow: hidden;
        }
        .fallback-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(139,0,0,0.4) 0%, rgba(139,0,0,0) 70%);
          border-radius: 50%;
        }
        .fallback-tag {
          position: absolute;
          font-family: var(--font-serif);
          font-weight: 800;
          font-size: 3.5rem;
          opacity: 0.05;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          pointer-events: none;
        }
        .fallback-icon {
          position: relative;
          z-index: 1;
          color: rgba(255,255,255,0.4);
        }
        
        .blog-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex-grow: 1;
        }
        .blog-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .blog-card-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--color-text-main);
          line-height: 1.3;
        }
        .blog-card-summary {
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--color-text-muted);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-card-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }
        .blog-tag-chip {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.72rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(139,0,0,0.05);
          color: var(--color-primary);
          font-weight: 500;
        }
        .blog-card-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid #FAF8F5;
        }
        .read-more-btn {
          font-size: 0.88rem;
        }
        
        .no-blogs-panel {
          text-align: center;
          padding: 4rem;
          max-width: 600px;
          margin: 3rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .no-blogs-panel svg {
          color: var(--color-text-muted);
        }
        
        @media (max-width: 768px) {
          .blogs-filter-panel {
            flex-direction: column;
            align-items: stretch;
            padding: 1.5rem;
          }
          .blogs-search {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
