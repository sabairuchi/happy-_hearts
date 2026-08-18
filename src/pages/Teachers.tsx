import { motion } from 'framer-motion';
import { Award, Heart, ShieldCheck, BookOpen } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import styles from './Teachers.module.css';

export default function Teachers() {
  const teachers = [
    {
      name: 'Sarah Jenkins',
      role: 'Head of Preschool Education',
      experience: '11+ Yrs Experience',
      qualification: 'B.Ed in Early Childhood Education',
      bio: 'Sarah leads our preschool program with a passion for creative arts and child psychology, ensuring every child feels safe and confident.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
      accent: 'var(--color-accent-coral)'
    },
    {
      name: 'David Okafor',
      role: 'Lead Crèche Care Specialist',
      experience: '8+ Yrs Experience',
      qualification: 'Certified Infant Nurse & CPR Specialist',
      bio: 'David brings a serene, deeply caring presence to our infant quarters. Certified in pediatric safety and early sensory stimulation.',
      image: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?q=80&w=600&auto=format&fit=crop',
      accent: 'var(--color-accent-sky)'
    },
    {
      name: 'Emily Chen',
      role: 'Preschool STEM & Nature Instructor',
      experience: '6+ Yrs Experience',
      qualification: 'M.Sc in Child Development',
      bio: 'Emily ignites young minds through hands-on science experiments, garden exploration, and interactive problem-solving activities.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop',
      accent: 'var(--color-accent-yellow)'
    },
    {
      name: 'Jessica Gomez',
      role: 'Music, Movement & Arts Specialist',
      experience: '7+ Yrs Experience',
      qualification: 'B.A. in Fine Arts & Music Therapy',
      bio: 'Jessica believes in the power of rhythm and storytelling to foster emotional regulation and joy across all age groups.',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=600&auto=format&fit=crop',
      accent: 'var(--color-accent-mint)'
    }
  ];

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
            <span className="badge-pill">Our Dedicated Educators</span>
            <h1>Meet Our Loving Teachers</h1>
            <p>Our educators are more than just teachers—they are gentle mentors, caregivers, and the warm heart of Happy Hearts.</p>
          </motion.div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className={styles.teachersSection}>
        <div className={`container ${styles.grid}`}>
          {teachers.map((teacher, index) => (
            <Card key={index} hoverEffect={true} delay={index * 0.1} className={styles.teacherCard} accentColor={teacher.accent}>
              <div className={styles.imageWrapper}>
                <img src={teacher.image} alt={teacher.name} className={styles.teacherImg} />
                <span className={styles.expBadge}>{teacher.experience}</span>
              </div>
              <div className={styles.info}>
                <h3>{teacher.name}</h3>
                <span className={styles.role}>{teacher.role}</span>
                <span className={styles.qualification}>
                  <Award size={14} /> {teacher.qualification}
                </span>
                <p className={styles.bio}>{teacher.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Staff Commitments Banner */}
      <section className={styles.standardsSection}>
        <div className="container">
          <div className={styles.standardsBox}>
            <div className={styles.standardItem}>
              <ShieldCheck size={36} color="var(--color-accent-coral)" />
              <div>
                <h4>100% Background Verified</h4>
                <p>Thorough background checks and police verification for every staff member.</p>
              </div>
            </div>
            <div className={styles.standardItem}>
              <Heart size={36} color="var(--color-accent-sky)" />
              <div>
                <h4>Pediatric First Aid Certified</h4>
                <p>All educators hold up-to-date pediatric CPR & medical emergency certificates.</p>
              </div>
            </div>
            <div className={styles.standardItem}>
              <BookOpen size={36} color="var(--color-accent-mint)" />
              <div>
                <h4>Continuous Training</h4>
                <p>Annual training workshops in early childhood psychology and inclusive education.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.joinSection}>
        <div className="container">
          <div className={styles.joinBox}>
            <h2>Are You a Passionate Educator?</h2>
            <p>We are always seeking compassionate teachers and daycare specialists to join our growing family.</p>
            <Link to="/contact">
              <Button variant="primary">Enquire About Careers</Button>
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
