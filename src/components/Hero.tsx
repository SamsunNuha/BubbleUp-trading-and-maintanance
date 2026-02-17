import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "./ui/button";

const heroImages = [
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&q=80",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80",
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&q=80",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80",
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#0f172a",
      }}
    >
      {/* Background Image Slideshow */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImages[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.55) 50%, rgba(15,23,42,0.70) 100%)",
          zIndex: 1,
        }}
      />

      {/* Slide indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 20,
        }}
      >
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            style={{
              width: i === currentImage ? "32px" : "10px",
              height: "10px",
              borderRadius: "5px",
              border: "none",
              background: i === currentImage ? "#f59e0b" : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20"
        style={{ zIndex: 10, textAlign: "left", width: "100%", maxWidth: "1280px", padding: "80px 24px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            style={{
              display: "inline-block",
              marginBottom: "24px",
              padding: "8px 20px",
              background: "rgba(245,158,11,0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: "9999px",
            }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(251, 191, 36, 0.3)",
                "0 0 40px rgba(251, 191, 36, 0.5)",
                "0 0 20px rgba(251, 191, 36, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span
              style={{
                color: "#fef3c7",
                fontSize: "13px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              WELCOME TO BUBBLE UP
            </span>
          </motion.div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: "24px",
              letterSpacing: "-0.02em",
            }}
          >
            Smart Engineering for
            <br />
            Every <span style={{ color: "#f59e0b", fontStyle: "italic" }}>Sustainable</span>
          </h1>

          <p style={{ fontSize: "18px", color: "#cbd5e1", marginBottom: "12px", maxWidth: "600px" }}>
            Reliable Industrial Equipment Supply & Maintenance Solutions
          </p>

          <p style={{ fontSize: "16px", color: "#94a3b8", marginBottom: "40px", maxWidth: "500px" }}>
            Serving Hotels • Hospitals • Laundries • Restaurants • Factories
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "#000000",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(245,158,11,0.3)",
                }}
              >
                Discover More
                <ArrowRight style={{ width: "18px", height: "18px" }} />
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  background: "transparent",
                  color: "#93c5fd",
                  fontSize: "15px",
                  fontWeight: 600,
                  border: "2px solid #60a5fa",
                  borderRadius: "8px",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                }}
              >
                <Phone style={{ width: "18px", height: "18px" }} />
                Contact Us
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            marginTop: "80px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
            maxWidth: "800px",
          }}
        >
          {[
            { number: "10+", label: "Years Experience" },
            { number: "24/7", label: "Support Available" },
            { number: "500+", label: "Projects Completed" },
            { number: "100%", label: "Quality Assured" },
          ].map((item, i) => (
            <motion.div
              key={i}
              style={{ textAlign: "center" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <div style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#60a5fa", marginBottom: "8px", fontWeight: 700 }}>
                {item.number}
              </div>
              <div style={{ fontSize: "13px", color: "#94a3b8" }}>{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          style={{
            width: "24px",
            height: "40px",
            border: "2px solid rgba(96,165,250,0.5)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "8px",
          }}
        >
          <div style={{ width: "4px", height: "12px", background: "#60a5fa", borderRadius: "4px" }} />
        </div>
      </motion.div>
    </section>
  );
}
