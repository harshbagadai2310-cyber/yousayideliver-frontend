import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Image as ImageIcon, ExternalLink, X } from 'lucide-react';

const getRatioClass = (categoryName) => {
  const name = categoryName?.toLowerCase() || '';
  if (name.includes('reel') || name.includes('brand kit')) {
    return 'ratio-9-16';
  } else if (name.includes('ads') || name.includes('ad creative')) {
    return 'ratio-3-4';
  } else if (name.includes('logo')) {
    return 'ratio-1-1';
  }
  return 'ratio-1-1'; // Default fallback
};

export default function Work() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [niches, setNiches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [showNicheDropdown, setShowNicheDropdown] = useState(false);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const [itemsData, nichesData, categoriesData] = await Promise.all([
          api.portfolio.list(),
          api.portfolio.listNiches(),
          api.portfolio.listCategories()
        ]);
        setPortfolioItems(itemsData);
        setNiches(nichesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Failed to load portfolio content:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolioData();
  }, []);

  // Filter logic using useMemo for high performance
  const filteredItems = useMemo(() => {
    return portfolioItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.niche?.name && item.niche.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.category?.name && item.category.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category matching
      const matchesCategory = selectedCategory === 'All' || 
        (item.category && item.category._id === selectedCategory) ||
        (item.category && item.category.name === selectedCategory);
        
      // Niche matching
      const matchesNiche = selectedNiche === 'All' || 
        (item.niche && item.niche._id === selectedNiche) ||
        (item.niche && item.niche.name === selectedNiche);

      return matchesSearch && matchesCategory && matchesNiche;
    });
  }, [portfolioItems, searchQuery, selectedCategory, selectedNiche]);

  const [colsCount, setColsCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setColsCount(width > 1024 ? 3 : width > 768 ? 2 : 1);
    };
    handleResize(); // run on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Partition filteredItems into columns
  const columns = useMemo(() => {
    const cols = Array.from({ length: colsCount }, () => []);
    filteredItems.forEach((item, index) => {
      cols[index % colsCount].push(item);
    });
    return cols;
  }, [filteredItems, colsCount]);

  const activeNicheName = useMemo(() => {
    if (selectedNiche === 'All') return 'All Niches';
    const found = niches.find(n => n._id === selectedNiche || n.name === selectedNiche);
    return found ? found.name : 'Niche';
  }, [selectedNiche, niches]);

  return (
    <div className="work-page section">
      <div className="container">
        <h1 className="section-title">OUR WORK</h1>
        <p className="section-subtitle">
          Explore a curated library of visual handbooks, conversion-optimized interfaces, custom brand systems, and marketing frameworks crafted for elite operations.
        </p>

        {/* Filter Controls Panel */}
        <div className="filter-controls-panel glass-panel">
          {/* Search Box */}
          <div className="search-box-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search portfolio..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="search-clear-btn">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="category-filters">
            <button 
              className={`filter-tab ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                className={`filter-tab ${selectedCategory === cat._id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat._id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Niche Selector */}
          <div className="niche-selector-wrapper">
            <button 
              className={`niche-dropdown-btn ${selectedNiche !== 'All' ? 'niche-active' : ''}`}
              onClick={() => setShowNicheDropdown(!showNicheDropdown)}
            >
              <SlidersHorizontal size={16} />
              <span>{activeNicheName}</span>
            </button>
            
            {showNicheDropdown && (
              <div className="niche-dropdown-menu glass-panel">
                <button 
                  className={`niche-menu-item ${selectedNiche === 'All' ? 'active' : ''}`}
                  onClick={() => { setSelectedNiche('All'); setShowNicheDropdown(false); }}
                >
                  All Niches
                </button>
                <div className="niche-items-grid">
                  {niches.map((niche) => (
                    <button
                      key={niche._id}
                      className={`niche-menu-item ${selectedNiche === niche._id ? 'active' : ''}`}
                      onClick={() => { setSelectedNiche(niche._id); setShowNicheDropdown(false); }}
                    >
                      {niche.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading curated gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="no-results-panel glass-panel">
            <ImageIcon size={36} />
            <h3>No Portfolio Items Found</h3>
            <p>Try clearing your filters or adjustments to your search queries.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedNiche('All'); }}
              className="btn btn-secondary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="portfolio-grid-masonry">
            {columns.map((columnItems, colIndex) => (
              <div key={colIndex} className="portfolio-column">
                <AnimatePresence mode="popLayout">
                  {columnItems.map((item) => (
                    <motion.div
                      layout
                      key={item._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="portfolio-card glass-panel"
                    >
                      <div className={`portfolio-media-wrapper ${getRatioClass(item.category?.name)}`}>
                        {item.imageFileId ? (
                          item.mediaInfo?.contentType?.startsWith('video/') ? (
                            <video 
                              src={api.media.getStreamUrl(item.imageFileId)} 
                              className="portfolio-image"
                              controls
                              controlsList="nodownload nofullscreen noremoteplayback"
                              playsInline
                              preload="metadata"
                              autoPlay
                              loop
                              muted
                              onContextMenu={(e) => e.preventDefault()}
                            />
                          ) : (
                            <img 
                              src={api.media.getStreamUrl(item.imageFileId)} 
                              alt={item.title} 
                              className="portfolio-image"
                              loading="lazy"
                            />
                          )
                        ) : (
                          <div className="portfolio-fallback-art">
                            <div className="fallback-glow"></div>
                            <span className="fallback-watermark">{item.category?.name || 'Asset'}</span>
                            <ImageIcon size={32} className="fallback-icon" />
                          </div>
                        )}
                        {!(item.mediaInfo?.contentType?.startsWith('video/')) && (
                          <div className="media-overlay">
                            <span className="overlay-category">{item.category?.name}</span>
                            <span className="overlay-niche">{item.niche?.name}</span>
                          </div>
                        )}
                      </div>

                      {/* Body details */}
                      <div className="portfolio-details">
                        <h3 className="portfolio-item-title">{item.title}</h3>
                        {item.description && <p className="portfolio-item-desc">{item.description}</p>}
                        <div className="portfolio-meta-tags">
                          <span className="meta-tag">{item.niche?.name}</span>
                          <span className="meta-tag">{item.category?.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .work-page {
          padding-top: 8rem;
          min-height: 80vh;
        }
        
        /* Filter Panel Styling */
        .filter-controls-panel {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.25rem 2rem;
          margin-bottom: 3rem;
          background: rgba(255, 255, 255, 0.7);
          flex-wrap: wrap;
          position: relative;
          z-index: 100;
        }
        .search-box-wrapper {
          display: flex;
          align-items: center;
          background: #F0EDE8;
          border-radius: 20px;
          padding: 0.5rem 1rem;
          flex-grow: 1;
          min-width: 250px;
          border: 1px solid transparent;
          transition: all 0.3s;
          position: relative;
        }
        .search-box-wrapper:focus-within {
          border-color: var(--color-primary);
          background: #FFFFFF;
          box-shadow: 0 4px 12px rgba(139, 0, 0, 0.05);
        }
        .search-icon {
          color: var(--color-text-muted);
          margin-right: 0.5rem;
        }
        .search-input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-text-main);
        }
        .search-clear-btn {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          position: absolute;
          right: 0.75rem;
          display: flex;
          align-items: center;
        }
        .category-filters {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .filter-tab {
          border: none;
          background: transparent;
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          color: var(--color-text-muted);
          transition: all 0.3s;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .filter-tab:hover {
          color: var(--color-primary);
          background: rgba(139, 0, 0, 0.03);
        }
        .filter-tab.active {
          background-color: var(--color-primary);
          color: #FFFFFF;
          border-color: var(--color-primary);
          box-shadow: 0 4px 10px rgba(139,0,0,0.15);
        }
        
        /* Niche dropdown styling */
        .niche-selector-wrapper {
          position: relative;
        }
        .niche-dropdown-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid rgba(0,0,0,0.08);
          background: #FFFFFF;
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          color: var(--color-text-muted);
          transition: all 0.3s;
        }
        .niche-dropdown-btn:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }
        .niche-active {
          background-color: var(--color-primary);
          color: #FFFFFF !important;
          border-color: var(--color-primary);
        }
        .niche-dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          width: 320px;
          max-height: 400px;
          overflow-y: auto;
          background: #FFFFFF;
          z-index: 100;
          padding: 1.25rem;
          box-shadow: var(--shadow-lg);
        }
        .niche-items-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--color-border);
        }
        .niche-menu-item {
          background: none;
          border: none;
          text-align: left;
          font-size: 0.85rem;
          padding: 0.4rem 0.6rem;
          cursor: pointer;
          border-radius: 4px;
          color: var(--color-text-muted);
          transition: all 0.2s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .niche-menu-item:hover {
          background: rgba(139,0,0,0.05);
          color: var(--color-primary);
        }
        .niche-menu-item.active {
          background: rgba(139,0,0,0.1);
          color: var(--color-primary);
          font-weight: 600;
        }
        
        /* Grid and Cards Styling */
        .portfolio-grid-masonry {
          display: flex;
          gap: 2.5rem;
          margin-top: 2rem;
          width: 100%;
          align-items: start;
        }
        .portfolio-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          min-width: 0;
        }
        @media (max-width: 1024px) {
          .portfolio-grid-masonry {
            gap: 2rem;
          }
          .portfolio-column {
            gap: 2rem;
          }
        }
        @media (max-width: 768px) {
          .portfolio-grid-masonry {
            flex-direction: column;
            gap: 2rem;
          }
        }
        .portfolio-card {
          width: 100%;
          overflow: hidden;
          border-radius: var(--border-radius-md);
          background: #FFFFFF;
        }
        .portfolio-card:hover .portfolio-image {
          transform: scale(1.05);
        }
        .portfolio-card:hover .media-overlay {
          opacity: 1;
        }
        .portfolio-media-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
          background: #E8E5DF;
          aspect-ratio: 1 / 1;
        }
        .portfolio-media-wrapper.ratio-9-16 {
          aspect-ratio: 9 / 16;
        }
        .portfolio-media-wrapper.ratio-3-4 {
          aspect-ratio: 3 / 4;
        }
        .portfolio-media-wrapper.ratio-1-1 {
          aspect-ratio: 1 / 1;
        }
        .portfolio-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        /* Remove fullscreen media control button */
        video.portfolio-image::-webkit-media-controls-fullscreen-button {
          display: none !important;
        }
        .portfolio-fallback-art {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: linear-gradient(135deg, #1C1C1C 0%, #3D0007 100%);
          color: rgba(255, 255, 255, 0.8);
          overflow: hidden;
        }
        .fallback-glow {
          position: absolute;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(139,0,0,0.4) 0%, rgba(139,0,0,0) 70%);
          border-radius: 50%;
        }
        .fallback-watermark {
          position: absolute;
          font-family: var(--font-serif);
          font-weight: 800;
          font-size: 4rem;
          opacity: 0.05;
          letter-spacing: 0.05em;
          pointer-events: none;
          text-transform: uppercase;
        }
        .fallback-icon {
          position: relative;
          z-index: 1;
          color: rgba(255, 255, 255, 0.4);
        }
        .media-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(28, 28, 28, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
        }
        .overlay-category {
          color: #FFFFFF;
          font-family: var(--font-serif);
          font-weight: 600;
          font-size: 1.25rem;
        }
        .overlay-niche {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .portfolio-details {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex-grow: 1;
        }
        .portfolio-item-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          line-height: 1.3;
        }
        .portfolio-item-desc {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .portfolio-meta-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: auto;
        }
        .meta-tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          background: rgba(139,0,0,0.05);
          color: var(--color-primary);
          font-weight: 600;
          border: 1px solid rgba(139,0,0,0.1);
        }

        .no-results-panel {
          text-align: center;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.4);
          max-width: 600px;
          margin: 3rem auto;
        }
        .no-results-panel svg {
          color: var(--color-text-muted);
        }
        .no-results-panel p {
          margin-bottom: 1rem;
        }
        
        @media (max-width: 992px) {
          .filter-controls-panel {
            flex-direction: column;
            align-items: stretch;
            padding: 1.5rem;
          }
          .niche-dropdown-menu {
            width: 100%;
            position: fixed;
            top: 20%;
            left: 5%;
            right: 5%;
            width: 90%;
            max-height: 60vh;
          }
        }
      `}</style>
    </div>
  );
}
