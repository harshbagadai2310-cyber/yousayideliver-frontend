import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqItems = [
  {
    question: "What is your standard turnaround time for projects?",
    answer: "Our timelines are structured based on scope. Phase 1 (Brand Strategy & Identity) typically completes in 2–3 weeks. Phase 2 (Collaterals and Marketing Templates) takes an additional 2–3 weeks. Phase 3 (Custom React Web Architecture) takes 4–6 weeks. With our Elite scale-up combo, we deploy specialized resources to deliver the entire integrated ecosystem within 8–10 weeks, using hyper-local velocity workflows."
  },
  {
    question: "Do I receive full vector source file ownership?",
    answer: "Absolutely. Upon final project sign-off and completion, you receive 100% intellectual property ownership of all custom design assets. This includes all high-resolution production vectors (.AI, .EPS, .SVG), Figma file templates, and raw React codebase files. We do not lock you into proprietary hosting or license fees."
  },
  {
    question: "How does the 9-step roadmap operate during engagement?",
    answer: "Our 9-step roadmap is our tactical execution blueprint. We start with 'Discover & Audit' to identify opportunities. We then move systematically through strategy, identity design, visual guidelines, asset production, social design, and content planning. The process culminates in UX wireframing and a high-performance MERN launch. Each step requires client sign-off, ensuring total alignment and zero surprises."
  },
  {
    question: "Why do you use MongoDB GridFS for image and media asset storage?",
    answer: "GridFS stores and streams media directly from our secure database clusters. This architecture eliminates third-party image hosting dependencies, keeps all project assets bound to our unified database schemas, and allows the admin interface to do native stream, replace, delete, and download operations securely."
  },
  {
    question: "Can packages be customized or scaled up after launch?",
    answer: "Yes, our structures are highly modular. You can start with Phase 1 and opt to integrate Phase 2 or Phase 3 collaterals as your scaling requirements grow. Our admin system allows us to customize package details directly from the dashboard so we can match your specific project constraints."
  }
];

function AccordionItem({ question, answer, isOpen, onClick }) {
  return (
    <div className={`faq-item glass-panel ${isOpen ? 'open' : ''}`}>
      <button className="faq-question-btn" onClick={onClick}>
        <span className="faq-question">{question}</span>
        <span className="faq-icon-box">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="faq-answer-wrapper"
          >
            <div className="faq-answer-content">
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-page section">
      <div className="container">
        <h1 className="section-title">FREQUENTLY ASKED QUESTIONS</h1>
        <p className="section-subtitle">
          Got questions about our production model, files, or execution templates? Here are transparent answers to our most common inquiries.
        </p>

        <div className="faq-list">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="faq-cta glass-panel">
          <HelpCircle size={28} className="faq-cta-icon" />
          <div className="faq-cta-text">
            <h4>Have a specific query not covered here?</h4>
            <p>Schedule a quick call with our strategic lead to review your unique requirements.</p>
          </div>
          <a href="/book" className="btn btn-primary">Book Consultation</a>
        </div>
      </div>

      <style>{`
        .faq-page {
          padding-top: 8rem;
          min-height: 80vh;
        }
        .faq-list {
          max-width: 800px;
          margin: 3rem auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .faq-item {
          border-radius: var(--border-radius-md);
          background: rgba(255, 255, 255, 0.55);
          overflow: hidden;
          padding: 0;
        }
        .faq-item.open {
          border-color: rgba(139, 0, 0, 0.2);
          background: rgba(255, 255, 255, 0.85);
          box-shadow: var(--shadow-md);
        }
        .faq-question-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
          gap: 1rem;
        }
        .faq-question {
          font-family: var(--font-serif);
          font-weight: 600;
          font-size: 1.2rem;
          color: var(--color-text-main);
        }
        .faq-icon-box {
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(139,0,0,0.05);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          transition: all 0.3s;
          flex-shrink: 0;
        }
        .faq-item.open .faq-icon-box {
          background: var(--color-primary);
          color: #FFFFFF;
        }
        .faq-answer-wrapper {
          overflow: hidden;
        }
        .faq-answer-content {
          padding: 0 2rem 1.5rem;
          border-top: 1px solid var(--color-border);
          padding-top: 1.25rem;
        }
        .faq-answer-content p {
          font-size: 0.98rem;
          line-height: 1.6;
          color: var(--color-text-muted);
        }
        
        /* CTA Section */
        .faq-cta {
          max-width: 800px;
          margin: 4rem auto 0;
          display: flex;
          align-items: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.7);
          gap: 1.5rem;
          border-radius: var(--border-radius-md);
        }
        .faq-cta-icon {
          color: var(--color-primary);
          flex-shrink: 0;
        }
        .faq-cta-text {
          flex-grow: 1;
        }
        .faq-cta-text h4 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          margin-bottom: 0.25rem;
        }
        .faq-cta-text p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }
        
        @media (max-width: 768px) {
          .faq-cta {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1.5rem;
          }
          .faq-cta .btn {
            width: 100%;
          }
          .faq-question-btn {
            padding: 1.25rem 1.5rem;
          }
          .faq-question {
            font-size: 1.05rem;
          }
          .faq-answer-content {
            padding: 0 1.5rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
