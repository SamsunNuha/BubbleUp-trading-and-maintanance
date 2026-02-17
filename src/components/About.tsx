import { motion } from "motion/react";

const featureCards = [
  {
    icon: "👷",
    title: "Skilled Professionals",
    description:
      "Our experienced engineers and technicians ensure precise, high-quality work in every project.",
  },
  {
    icon: "💡",
    title: "Comprehensive Solutions",
    description:
      "From equipment supply to maintenance and control systems — all your industrial needs under one roof.",
  },
  {
    icon: "👍",
    title: "Quality & Reliability",
    description:
      "We use advanced technology and trusted materials to guarantee long-lasting performance and safety.",
  },
  {
    icon: "🤝",
    title: "Customer-Centric Approach",
    description:
      "We prioritize your satisfaction with responsive service, transparent communication, and timely delivery.",
  },
];

export function About() {
  return (
    <section id="about" style={{ background: '#0f172a' }}>
      {/* About Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          padding: '60px 24px',
          textAlign: 'center',
          borderBottom: '3px solid #f59e0b',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            fontStyle: 'italic',
          }}
        >
          About Us
        </motion.h2>
      </div>

      {/* WHO WE ARE Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span
            style={{
              color: '#f59e0b',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            WHO WE ARE
          </span>
          <h3
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '24px',
              lineHeight: 1.2,
            }}
          >
            About Bubble Up Trading & Maintenance
          </h3>

          <div style={{ maxWidth: '800px' }}>
            <p
              style={{
                color: '#cbd5e1',
                fontSize: '16px',
                lineHeight: 1.8,
                marginBottom: '20px',
              }}
            >
              <strong style={{ color: '#ffffff' }}>Bubble Up Trading & Maintenance</strong> is a
              trusted engineering solutions provider in Qatar, offering a complete range of industrial
              and commercial equipment services. We specialize in the{" "}
              <strong style={{ color: '#ffffff' }}>
                supply, installation, repair, and maintenance
              </strong>{" "}
              of laundry machines, kitchen & bakery equipment, embroidery machines, air conditioning
              systems, and electrical control panels.
            </p>

            <p
              style={{
                color: '#cbd5e1',
                fontSize: '16px',
                lineHeight: 1.8,
              }}
            >
              With years of industry experience and a team of skilled engineers and technicians, we
              deliver{" "}
              <strong style={{ color: '#ffffff', fontStyle: 'italic' }}>
                reliable, efficient, and cost-effective
              </strong>{" "}
              solutions that meet international quality and safety standards. From industrial laundry
              units to power distribution systems, we serve diverse sectors with precision and
              professionalism.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Equipment Image Showcase */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 60px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80', label: 'Electrical Panels' },
            { url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80', label: 'Industrial Equipment' },
            { url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80', label: 'Engineering Work' },
            { url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=80', label: 'Factory Systems' },
            { url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80', label: 'Machinery' },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '1',
              }}
            >
              <img
                src={img.url}
                alt={img.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '12px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                {img.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                border: '2px solid #f59e0b',
                borderRadius: '16px',
                padding: '32px 24px',
                background: 'rgba(15,23,42,0.3)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(245,158,11,0.15)' }}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>{card.icon}</div>
              <div
                style={{
                  width: '50px',
                  height: '2px',
                  background: '#f59e0b',
                  marginBottom: '20px',
                }}
              />
              <h4
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '12px',
                }}
              >
                {card.title}
              </h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7 }}>
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vision / Mission / Motto */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
              borderRadius: '20px',
              padding: '40px 32px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: '#f59e0b',
              }}
            />
            <h4
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              Our Vision
            </h4>
            <div
              style={{
                width: '40px',
                height: '2px',
                background: '#f59e0b',
                marginBottom: '20px',
              }}
            />
            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.8 }}>
              To provide reliable, efficient, and high-quality industrial and commercial solutions
              that enhance productivity, safety, and performance.
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '20px',
              padding: '40px 32px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <h4
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: '16px',
              }}
            >
              Our Mission
            </h4>
            <div
              style={{
                width: '40px',
                height: '2px',
                background: '#1a1a2e',
                marginBottom: '20px',
              }}
            />
            <p style={{ fontSize: '15px', color: '#1e293b', lineHeight: 1.8, fontWeight: 500 }}>
              To be Qatar's most trusted multi-service engineering company — known for quality,
              integrity, and sustainable growth across every project we deliver.
            </p>
          </motion.div>

          {/* Our Motto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
              borderRadius: '20px',
              padding: '40px 32px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: '#f59e0b',
              }}
            />
            <h4
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              Our Motto
            </h4>
            <div
              style={{
                width: '40px',
                height: '2px',
                background: '#f59e0b',
                marginBottom: '20px',
              }}
            />
            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.8 }}>
              Engineering excellence is at the heart of everything we do — from concept to
              completion, we work to ensure reliability, safety, and customer satisfaction.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
