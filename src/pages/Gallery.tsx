import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import styles from './Gallery.module.css';

type Category = 'All' | 'Classroom' | 'Activities' | 'Events' | 'Playtime';

interface Photo {
  id: number;
  category: Category;
  color: string;
  img: string;
  title: string;
  desc?: string;
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories: Category[] = ['All', 'Classroom', 'Activities', 'Events', 'Playtime'];

  const photos: Photo[] = [
    { id: 1, category: 'Classroom', color: 'var(--color-bg-secondary)', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=700&auto=format&fit=crop', title: 'Cozy Reading Corner', desc: 'Children enjoying storytelling hour' },
    { id: 2, category: 'Activities', color: 'var(--color-accent-yellow)', img: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=700&auto=format&fit=crop', title: 'Finger Painting Studio', desc: 'Creative expression with non-toxic paints' },
    { id: 3, category: 'Playtime', color: 'var(--color-accent-coral)', img: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=700&auto=format&fit=crop', title: 'Block Architecture', desc: 'Building spatial skills through wooden blocks' },
    { id: 4, category: 'Events', color: 'var(--color-accent-sky)', img: 'https://images.unsplash.com/photo-1544733422-251e532ca221?q=80&w=700&auto=format&fit=crop', title: 'Annual Sports Day', desc: 'Joyful obstacle races & medal ceremonies' },
    { id: 5, category: 'Classroom', color: 'var(--color-accent-mint)', img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=700&auto=format&fit=crop', title: 'Montessori Puzzle Time', desc: 'Developing fine motor coordination' },
    { id: 6, category: 'Activities', color: 'var(--color-bg-secondary)', img: 'https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=700&auto=format&fit=crop', title: 'Music & Percussion Class', desc: 'Singing songs and learning rhythms' },
    { id: 7, category: 'Playtime', color: 'var(--color-accent-coral)', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=700&auto=format&fit=crop', title: 'Outdoor Playground Fun', desc: 'Fresh air, slides, and group games' },
    { id: 8, category: 'Events', color: 'var(--color-accent-yellow)', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700&auto=format&fit=crop', title: 'Birthday Celebrations', desc: 'Blowing candles with preschool classmates' },
    { id: 9, category: 'Activities', color: 'var(--color-accent-sky)', img: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=700&auto=format&fit=crop', title: 'Group STEM Discovery', desc: 'Exploring plant growth and water play' },
    { id: 10, category: 'Playtime', color: 'var(--color-bg-secondary)', img: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=700&auto=format&fit=crop', title: 'Little Best Friends', desc: 'Creating lifelong social memories' },
    { id: 11, category: 'Events', color: 'var(--color-accent-coral)', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=700&auto=format&fit=crop', title: 'Nature Field Trip', desc: 'Discovering butterflies and flowers' },
    { id: 12, category: 'Classroom', color: 'var(--color-accent-mint)', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700&auto=format&fit=crop', title: 'Bright Learning Spaces', desc: 'Thoughtfully curated classroom corners' },
  ];

  const filteredPhotos = activeCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  const selectedPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length]);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-pill">Life at Happy Hearts</span>
            <h1>Photo Gallery</h1>
            <p>Step inside our vibrant world of laughter, creative discovery, and daily adventures.</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={styles.gallerySection}>
        <div className="container">
          
          {/* Filters */}
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''} interactive`}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedPhotoIndex(null);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className={styles.grid}>
            <AnimatePresence>
              {filteredPhotos.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`${styles.photoItem} interactive`}
                  onClick={() => setSelectedPhotoIndex(idx)}
                >
                  <img src={photo.img} alt={photo.title} className={styles.galleryImg} />
                  <div className={styles.photoOverlay}>
                    <span className={styles.zoomIcon}><Maximize2 size={24} /></span>
                    <span className={styles.photoTitle}>{photo.title}</span>
                    <span className={styles.photoCatBadge}>{photo.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Brand Animation */}
      <section className={styles.brandSection}>
        <div className="container">
          <motion.h2 
            className={styles.bigText}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            HAPPY <span className={styles.bigHeart}>💛</span> HEARTS
          </motion.h2>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <button 
              className={styles.closeBtn}
              onClick={() => setSelectedPhotoIndex(null)}
              aria-label="Close modal"
            >
              <X size={28} />
            </button>

            <button 
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>

            <button 
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={handleNext}
              aria-label="Next photo"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedPhoto.img} alt={selectedPhoto.title} className={styles.lightboxImg} />
              <div className={styles.lightboxMeta}>
                <h3>{selectedPhoto.title}</h3>
                {selectedPhoto.desc && <p>{selectedPhoto.desc}</p>}
                <span className={styles.lightboxBadge}>{selectedPhoto.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
