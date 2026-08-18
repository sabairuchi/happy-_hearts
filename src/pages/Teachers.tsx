import { motion } from 'framer-motion';
import { Award, Heart, ShieldCheck, BookOpen, ArrowRight } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import styles from './Teachers.module.css';

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

export default function Teachers() {
  const teachers = [
    {
      name: 'Sarah Jenkins',
      role: 'Head of Preschool Education',
      experience: '11+ Yrs Experience',
      qualification: 'B.Ed in Early Childhood Education',
      bio: 'Sarah leads our preschool program with a passion for creative arts and child psychology, ensuring every child feels safe and confident.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
      bg: '#FFF0F0',
      border: '#FF6B5A',
      badgeColor: '#FF5240'
    },
    {
      name: 'David Okafor',
      role: 'Lead Crèche Care Specialist',
      experience: '8+ Yrs Experience',
      qualification: 'Certified Infant Nurse & CPR Specialist',
      bio: 'David brings a serene, deeply caring presence to our infant quarters. Certified in pediatric safety and early sensory stimulation.',
      image: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?q=80&w=600&auto=format&fit=crop',
      bg: '#F0F9FF',
      border: '#0284C7',
      badgeColor: '#0284C7'
    },
    {
      name: 'Emily Chen',
      role: 'Preschool STEM & Nature Instructor',
      experience: '6+ Yrs Experience',
      qualification: 'M.Sc in Child Development',
      bio: 'Emily ignites young minds through hands-on science experiments, garden exploration, and interactive problem-solving activities.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop',
      bg: '#FFFBEB',
      border: '#FFC107',
      badgeColor: '#D97706'
    },
    {
      name: 'Jessica Gomez',
      role: 'Music, Movement & Arts Specialist',
      experience: '7+ Yrs Experience',
      qualification: 'B.A. in Fine Arts & Music Therapy',
      bio: 'Jessica believes in the power of rhythm and storytelling to foster emotional regulation and joy across all age groups.',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=600&auto=format&fit=crop',
      bg: '#ECFDF5',
      border: '#10B981',
      badgeColor: '#059669'
    }
  ];

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
            <span className="badge-pill badge-yellow">👩‍🏫 Our Dedicated Educators</span>
            <h1>Meet Our <span className="text-gradient">Loving Teachers</span> 🎨</h1>
            <p>Our educators are more than just teachers—they are gentle mentors, caregivers, and the warm heart of Happy Hearts.</p>
          </motion.div>
        </div>
      </section>

      <WavyDivider fill="#FFFBEB" />

      {/* TEACHERS GRID (Alternating Background 1: Soft Yellow Tint) */}
      <section className={styles.teachersSection}>
        <div className={`container ${styles.grid}`}>
          {teachers.map((teacher, index) => (
            <Card 
              key={index} 
              hoverEffect={true} 
              delay={index * 0.1} 
              className={styles.teacherCard} 
              style={{
                backgroundColor: teacher.bg,
                border: `2.5px solid ${teacher.border}`,
                borderTop: `6px solid ${teacher.badgeColor}`
              }}
            >
              <div className={styles.imageWrapper}>
                <img src={teacher.image} alt={teacher.name} className={styles.teacherImg} />
                <span className={styles.expBadge}>{teacher.experience}</span>
              </div>
              <div className={styles.info}>
                <h3>{teacher.name}</h3>
                <span className={styles.role} style={{ color: teacher.badgeColor }}>{teacher.role}</span>
                <span className={styles.qualification}>
                  <Award size={16} color={teacher.badgeColor} /> {teacher.qualification}
                </span>
                <p className={styles.bio}>{teacher.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <WavyDivider fill="#F0F9FF" />

      {/* STAFF STANDARDS SECTION (Alternating Background 2: Soft Sky Blue Tint) */}
      <section className={styles.standardsSection}>
        <div className="container">
          <div className={styles.standardsBox}>
            <Card className={styles.standardCard} style={{ backgroundColor: '#FFF0F0', border: '2.5px solid #FF6B5A' }}>
              <div className={styles.standardIconWrapper} style={{ backgroundColor: 'rgba(255, 107, 90, 0.18)' }}>
                <ShieldCheck size={32} color="#FF5240" fill="#FFD0CB" />
              </div>
              <div>
                <h4>100% Background Verified</h4>
                <p>Thorough background checks and police verification for every staff member.</p>
              </div>
            </Card>

            <Card className={styles.standardCard} style={{ backgroundColor: '#F0F9FF', border: '2.5px solid #0284C7' }}>
              <div className={styles.standardIconWrapper} style={{ backgroundColor: 'rgba(2, 132, 199, 0.18)' }}>
                <Heart size={32} color="#0284C7" fill="#BAE6FD" />
              </div>
              <div>
                <h4>Pediatric First Aid Certified</h4>
                <p>All educators hold up-to-date pediatric CPR & medical emergency certificates.</p>
              </div>
            </Card>

            <Card className={styles.standardCard} style={{ backgroundColor: '#ECFDF5', border: '2.5px solid #10B981' }}>
              <div className={styles.standardIconWrapper} style={{ backgroundColor: 'rgba(16, 185, 129, 0.18)' }}>
                <BookOpen size={32} color="#059669" fill="#A7F3D0" />
              </div>
              <div>
                <h4>Continuous Training</h4>
                <p>Annual training workshops in early childhood psychology and inclusive education.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className={styles.joinSection}>
        <div className="container">
          <div className={styles.joinBox}>
            <h2>Are You a Passionate Educator? 🚀</h2>
            <p>We are always seeking compassionate teachers and daycare specialists to join our growing family.</p>
            <Link to="/contact">
              <Button variant="secondary" size="lg" icon={<ArrowRight size={20} />}>Enquire About Careers</Button>
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
