import { motion } from "motion/react";
import { Hotel, Heart, Shirt, UtensilsCrossed, Factory } from "lucide-react";

const industries = [
  {
    icon: Hotel,
    name: "Hotels & Resorts",
    description: "Complete maintenance solutions for hospitality equipment including laundry, kitchen, and HVAC systems",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Heart,
    name: "Hospitals & Clinics",
    description: "Critical equipment maintenance ensuring hygiene standards and continuous operation",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Shirt,
    name: "Commercial Laundries",
    description: "Specialized support for industrial laundry operations with minimal downtime",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: UtensilsCrossed,
    name: "Restaurants & Bakeries",
    description: "Kitchen equipment maintenance and repair to keep your business running smoothly",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Factory,
    name: "Manufacturing Units",
    description: "Industrial electrical systems, control panels, and machinery maintenance",
    color: "from-green-500 to-emerald-500",
  },
];

export function Industries() {
  return (
    <section id="industries" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm tracking-widest uppercase mb-4 block">
            Industries We Serve
          </span>
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Trusted Across Multiple Sectors
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Providing specialized maintenance solutions tailored to the unique needs of each industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                style={{ perspective: 1000 }}
                className="group relative"
              >
                <div className="h-full bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 overflow-hidden">
                  {/* Gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Floating icon */}
                  <motion.div
                    className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-6`}
                    animate={{
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotateY: 180,
                      transition: { duration: 0.5 },
                    }}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl text-white mb-4 relative">
                    {industry.name}
                  </h3>

                  <p className="text-slate-400 relative">
                    {industry.description}
                  </p>

                  {/* Decorative corner accent */}
                  <motion.div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${industry.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            animate={{
              x: [0, 60],
              y: [0, 60],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "150+", label: "Active Clients" },
              { value: "500+", label: "Projects Delivered" },
              { value: "10+", label: "Years in Qatar" },
              { value: "24/7", label: "Service Support" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  className="text-5xl md:text-6xl text-white mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-blue-100 opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
