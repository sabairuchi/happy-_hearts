import { motion } from 'framer-motion';
import { Compass, Palette, Smile, BookOpen, Sparkles } from 'lucide-react';
import styles from './LearningJourney.module.css';

export const LearningJourney = () => {
  const steps = [
    {
      emoji: '🌱',
      icon: <Compass size={26} color="#2E7D32" />,
      badge: 'Step 1',
      title: 'EXPLORE',
      desc: 'Sensory nature walks, curiosity games & tactile discovery.',
      bg: '#EAFAF1',
      border: '#6BCB77',
      badgeColor: '#2E7D32',
    },
    {
      emoji: '🎨',
      icon: <Palette size={26} color="#B78103" />,
      badge: 'Step 2',
      title: 'CREATE',
      desc: 'Expressive finger painting, music rhythm & craft workshops.',
      bg: '#FFF3E0',
      border: '#FFD93D',
      badgeColor: '#B78103',
    },
    {
      emoji: '🧸',
      icon: <Smile size={26} color="#D32F2F" />,
      badge: 'Step 3',
      title: 'PLAY',
      desc: 'Collaborative playground games, block building & social fun.',
      bg: '#FFE5E5',
      border: '#FF6B6B',
      badgeColor: '#D32F2F',
    },
    {
      emoji: '📚',
      icon: <BookOpen size={26} color="#1565C0" />,
      badge: 'Step 4',
      title: 'LEARN',
      desc: 'Interactive storytelling, early phonics & math puzzle kits.',
      bg: '#EBF5FF',
      border: '#4D96FF',
      badgeColor: '#1565C0',
    },
    {
      emoji: '🌈',
      icon: <Sparkles size={26} color="#6A1B9A" />,
      badge: 'Step 5',
      title: 'GROW',
      desc: 'Building emotional confidence, empathy & lifelong friendships.',
      bg: '#F3E8FF',
      border: '#845EC2',
      badgeColor: '#6A1B9A',
    },
  ];

  return (
    <section className={styles.journeySection}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-pill badge-yellow">🌈 The Happy Hearts Path</span>
          <h2 className={styles.title}>Your Child's Joyful Learning Journey ✨</h2>
          <p className={styles.subtitle}>
            A carefully guided 5-stage experience designed to nurture wonder, creativity, and healthy confidence.
          </p>
        </motion.div>

        <div className={styles.journeyContainer}>
          {/* Curved Path Vector Line */}
          <div className={styles.svgPathWrapper}>
            <svg viewBox="0 0 1000 120" fill="none" className={styles.pathSvg} preserveAspectRatio="none">
              <motion.path
                d="M 50 60 Q 250 10, 500 60 T 950 60"
                stroke="#FFD93D"
                strokeWidth="4"
                strokeDasharray="8 8"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          <div className={styles.grid}>
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className={styles.stepCard}
                style={{ backgroundColor: step.bg, borderColor: step.border }}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
              >
                <div className={styles.iconWrapper} style={{ backgroundColor: '#FFFFFF' }}>
                  {step.icon}
                </div>
                <span className={styles.stepBadge} style={{ color: step.badgeColor }}>
                  {step.badge} {step.emoji}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
