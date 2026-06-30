import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { ChevronLeft, Calendar, User, Tag, Clock } from 'lucide-react';

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const data = await api.blogs.getBySlug(slug);
        setBlog(data);
      } catch (err) {
        console.error('Failed to load article detail:', err);
        setError('Article not found or server connection failed.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-detail-page loading-screen">
        <div className="spinner"></div>
        <p>Syncing article data...</p>
        <style>{`
          .loading-screen {
            height: 80vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--color-text-muted);
            gap: 1rem;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(139,0,0,0.1);
            border-top: 3px solid var(--color-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-page error-screen section">
        <div className="container error-container glass-panel">
          <h2>Transmission Unavailable</h2>
          <p>{error || 'The requested article could not be resolved.'}</p>
          <Link to="/blogs" className="btn btn-primary"><ChevronLeft size={16} /> Return to Transmissions</Link>
        </div>
        <style>{`
          .error-screen {
            padding-top: 8rem;
            min-height: 80vh;
          }
          .error-container {
            max-width: 600px;
            margin: 4rem auto;
            text-align: center;
            padding: 3rem 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.25rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="blog-detail-page section">
      <div className="container">
        {/* Back Link */}
        <Link to="/blogs" className="back-link">
          <ChevronLeft size={16} /> Back to Transmissions
        </Link>

        <article className="blog-article">
          {/* Header Title */}
          <header className="article-header">
            <h1 className="article-title">{blog.title}</h1>
            <p className="article-summary-lead">{blog.summary}</p>
            
            <div className="article-meta-row">
              <span className="meta-info"><User size={14} /> By {blog.author}</span>
              <span className="meta-info"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              {blog.tags && blog.tags.length > 0 && (
                <div className="meta-tags-inline">
                  {blog.tags.map(t => (
                    <span key={t} className="inline-tag"><Tag size={10} /> {t}</span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Featured Image Banner */}
          <div className="article-banner">
            {blog.imageFileId ? (
              <img src={api.media.getStreamUrl(blog.imageFileId)} alt={blog.title} className="banner-img" />
            ) : (
              <div className="banner-fallback-art">
                <div className="fallback-art-glow"></div>
                <h2>YOU SAY I DELIVER</h2>
                <p>System Blueprint Publication</p>
              </div>
            )}
          </div>

          {/* HTML Article content */}
          <div 
            className="article-content-body" 
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </article>
      </div>

      <style>{`
        .blog-detail-page {
          padding-top: 8rem;
          background-color: var(--color-bg-base);
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 2rem;
          transition: transform 0.2s;
        }
        .back-link:hover {
          transform: translateX(-4px);
        }
        
        .blog-article {
          max-width: 820px;
          margin: 0 auto;
        }
        .article-header {
          margin-bottom: 2.5rem;
        }
        .article-title {
          font-family: var(--font-serif);
          font-size: 3rem;
          line-height: 1.15;
          margin-bottom: 1rem;
          color: var(--color-text-main);
        }
        .article-summary-lead {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-weight: 500;
          border-left: 3px solid var(--color-primary);
          padding-left: 1rem;
        }
        
        .article-meta-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          font-size: 0.85rem;
          color: var(--color-text-muted);
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 1.25rem;
        }
        .meta-info {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .meta-info svg {
          color: var(--color-primary);
        }
        .meta-tags-inline {
          display: flex;
          gap: 0.4rem;
        }
        .inline-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: #F0EDE8;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.72rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        /* Banner Frame */
        .article-banner {
          width: 100%;
          height: 380px;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          margin-bottom: 3.5rem;
          box-shadow: var(--shadow-md);
        }
        .banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .banner-fallback-art {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1C1C1C 0%, #4a0005 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .fallback-art-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(139,0,0,0.3) 0%, rgba(139,0,0,0) 70%);
          border-radius: 50%;
        }
        .banner-fallback-art h2 {
          font-family: var(--font-serif);
          font-size: 2.25rem;
          letter-spacing: 0.05em;
          color: #FFFFFF;
          position: relative;
          z-index: 1;
        }
        .banner-fallback-art p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-top: 0.5rem;
          position: relative;
          z-index: 1;
        }
        
        /* Typography Content */
        .article-content-body {
          font-size: 1.12rem;
          line-height: 1.8;
          color: var(--color-text-main);
        }
        .article-content-body p {
          margin-bottom: 1.5rem;
          color: #2C2C2C;
        }
        .article-content-body h2, .article-content-body h3 {
          font-family: var(--font-serif);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: var(--color-text-main);
          line-height: 1.3;
        }
        .article-content-body h2 {
          font-size: 2rem;
        }
        .article-content-body h3 {
          font-size: 1.5rem;
        }
        .article-content-body ul, .article-content-body ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        .article-content-body li {
          margin-bottom: 0.5rem;
        }
        .article-content-body blockquote {
          border-left: 4px solid var(--color-primary);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--color-text-muted);
          font-size: 1.2rem;
        }
        
        @media (max-width: 768px) {
          .article-title {
            font-size: 2.25rem;
          }
          .article-banner {
            height: 240px;
            margin-bottom: 2rem;
          }
          .article-summary-lead {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
