import { useState, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';
import styles from './Gallery.module.css';

type Category = 'All' | 'Classroom' | 'Activities' | 'Events' | 'Playtime';

interface Photo {
  id: number;
  category: Category;
  color: string;
  img: string;
  title: string;
  desc: string;
  alt: string;
}

const WavyDivider = ({ fill }: { fill: string }) => (
  <div className="section-divider-wave">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        fill={fill}
      />
    </svg>
  </div>
);

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories: Category[] = ['All', 'Classroom', 'Activities', 'Events', 'Playtime'];

  const photos: Photo[] = [
    { 
      id: 1, 
      category: 'Activities', 
      color: '#FF6B6B', 
      img: '/images/finger-painting.jpg', 
      title: 'Playgroup Finger Painting & Art Studio 🎨', 
      desc: 'Playgroup toddlers exploring primary color mixing, tactile canvas creation, and fine motor finger expression with certified non-toxic washable paints.',
      alt: 'Preschool teacher and children finger painting together with bright colorful paints under Little Artists At Work sign'
    },
    { 
      id: 2, 
      category: 'Playtime', 
      color: '#FFD93D', 
      img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=900&auto=format&fit=crop', 
      title: 'Tactile Wooden Block & Train Track Play 🧱', 
      desc: 'Developing early spatial awareness, cause-and-effect reasoning, and cooperative tower building with natural wooden Montessori toys.',
      alt: 'Preschool toddlers building wooden block towers and train tracks together on the playroom floor'
    },
    { 
      id: 3, 
      category: 'Playtime', 
      color: '#6BCB77', 
      img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=900&auto=format&fit=crop', 
      title: 'Outdoor Playground & Green Nature Walk 🌿', 
      desc: 'Toddlers enjoying fresh air, soft-impact climbing mounds, sensory garden exploration, and gross motor physical development.',
      alt: 'Preschool children playing on the green outdoor playground with climbing structures and grass'
    },
    { 
      id: 4, 
      category: 'Classroom', 
      color: '#4D96FF', 
      img: '/images/story-circle.jpg', 
      title: 'Interactive Story Circle & Rhyme Time 📚', 
      desc: 'Teacher-led picture book storytelling, vocal expression, and early vocabulary building in our comfortable cushioned library corner.',
      alt: 'Preschool teacher sitting with young children in a fairy-lit story circle reading an illustrated picture book'
    },
    { 
      id: 5, 
      category: 'Classroom', 
      color: '#845EC2', 
      img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=900&auto=format&fit=crop', 
      title: 'Infant & Toddler Care Sanctuary 🧸', 
      desc: 'Tranquil, clean, and sanitised sleeping quarters with dedicated 1:3 nurse supervision for infant crèche and daycare toddlers.',
      alt: 'Attentive daycare caregiver interacting warmly with a toddler in a clean nursery sanctuary'
    },
    { 
      id: 6, 
      category: 'Activities', 
      color: '#6BCB77', 
      img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=900&auto=format&fit=crop', 
      title: 'Montessori Shape Matching & Puzzles 🧩', 
      desc: 'Fostering cognitive problem solving, hand-eye precision, and geometric pattern recognition with child-safe Montessori puzzle kits.',
      alt: 'Preschool toddler actively solving a wooden Montessori shape-matching puzzle at a low table'
    },
    { 
      id: 7, 
      category: 'Events', 
      color: '#FF6B6B', 
      img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=900&auto=format&fit=crop', 
      title: 'Preschool Birthday Celebrations 🎂', 
      desc: 'Celebrating milestone birthdays with organic fruit treats, festive party hats, group songs, and warm hugs from classmates.',
      alt: 'Preschool children wearing party hats and celebrating a classmate birthday together at table'
    },
    { 
      id: 8, 
      category: 'Events', 
      color: '#FFD93D', 
      img: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=900&auto=format&fit=crop', 
      title: 'Annual Junior Sports & Obstacle Day 🏆', 
      desc: 'Encouraging team cooperation, active balance, physical stamina, and sportsmanship through gentle toddler obstacle courses.',
      alt: 'Preschool toddlers participating in an active outdoor sports obstacle game on green grass'
    },
    { 
      id: 9, 
      category: 'Activities', 
      color: '#4D96FF', 
      img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop', 
      title: 'Rhyme & Percussion Music Class 🎵', 
      desc: 'Singing nursery rhymes, shaking wooden maracas, and developing rhythmic auditory processing with specialized music educators.',
      alt: 'Preschool teacher and children playing rhythm instruments and singing songs together in music class'
    },
    { 
      id: 10, 
      category: 'Playtime', 
      color: '#6BCB77', 
      img: '/images/sandbox-play.jpg', 
      title: 'Sensory Sandbox & Splash Play 🏖️', 
      desc: 'Tactile sand sculpting, sieve pouring, and water float experiments promoting early scientific curiosity and sensory fun.',
      alt: 'Preschool toddlers playing in a red sensory water and sand basin with scoops, buckets, and water wheels'
    },
    { 
      id: 11, 
      category: 'Classroom', 
      color: '#FF6B6B', 
      img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=900&auto=format&fit=crop', 
      title: 'Nutritious Organic Snack & Table Etiquette 🍎', 
      desc: 'Freshly sliced fruit bowls, organic milk, and social mealtime etiquette guided by attentive classroom teachers.',
      alt: 'Preschool children sitting together at a classroom table eating healthy fruit snacks with teacher guidance'
    },
    { 
      id: 12, 
      category: 'Playtime', 
      color: '#845EC2', 
      img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop', 
      title: 'Empathy & Peer Friendship Building 🧸', 
      desc: 'Building emotional intelligence, turn-taking cooperation, and genuine lifelong peer friendships in a loving community.',
      alt: 'Two preschool toddlers playing and building together happily in classroom'
    }
  ];

  const filteredPhotos = activeCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  const selectedPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const handleNext = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrev = (e?: MouseEvent) => {
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
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <span className="floating-sticker" style={{ top: '15%', left: '4%', animationDelay: '0s' }}>🎈</span>
        <span className="floating-sticker" style={{ top: '25%', right: '5%', animationDelay: '1.2s' }}>🎨</span>
        <span className="floating-sticker" style={{ bottom: '15%', left: '6%', animationDelay: '2.4s' }}>🧸</span>
        <span className="floating-sticker" style={{ bottom: '10%', right: '8%', animationDelay: '0.8s' }}>⭐</span>

        <div className="container">
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-pill badge-sky">
              <Sparkles size={16} /> 📸 Life at Happy Hearts
            </span>
            <h1>Vibrant <span className="text-gradient">Toddler Photo Gallery</span> 🎨</h1>
            <p>Explore real playgroup moments of laughter, sensory art, Montessori puzzles, and daily toddler adventures at Happy Hearts.</p>
          </motion.div>
        </div>
      </section>

      <WavyDivider fill="#FFFBEB" />

      {/* GALLERY SECTION */}
      <section className={styles.gallerySection}>
        <div className="container">
          
          {/* Filters */}
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
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
                  className={styles.photoItem}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  style={{ borderColor: photo.color, borderTop: `6px solid ${photo.color}` }}
                >
                  <div className={styles.imageContainer}>
                    <img 
                      src={photo.img} 
                      alt={photo.alt} 
                      className={styles.galleryImg} 
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop';
                      }}
                    />
                    <div className={styles.photoOverlay}>
                      <span className={styles.zoomIcon}><Maximize2 size={24} /></span>
                      <span className={styles.photoHoverText}>Click to View Fullscreen</span>
                    </div>
                  </div>
                  
                  {/* Clean Always-Visible Card Explanation Bar */}
                  <div className={styles.cardHeaderBar} style={{ borderTop: `2px solid ${photo.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span className={styles.photoCatBadge} style={{ backgroundColor: photo.color }}>{photo.category}</span>
                    </div>
                    <h4 className={styles.cardHeaderTitle}>{photo.title}</h4>
                    <p className={styles.cardHeaderDesc}>{photo.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* BRAND CALLOUT BOX */}
      <section className={styles.brandSection}>
        <div className="container">
          <div className={styles.brandBox}>
            <h2>Experience Happy Hearts in Person! 🚀</h2>
            <p>Schedule a campus tour to see our joyful classrooms, spacious green play areas, and loving teachers firsthand.</p>
            <Link to="/contact">
              <Button size="lg" variant="secondary" icon={<ArrowRight size={20} />}>Book a Tour Today</Button>
            </Link>
          </div>
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
              <img 
                src={selectedPhoto.img} 
                alt={selectedPhoto.alt} 
                className={styles.lightboxImg}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop';
                }}
              />
              <div className={styles.lightboxMeta}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{selectedPhoto.title}</h3>
                  <span className={styles.lightboxBadge} style={{ backgroundColor: selectedPhoto.color }}>{selectedPhoto.category}</span>
                </div>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>{selectedPhoto.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
