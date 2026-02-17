import { motion, useMotionValue, useTransform } from "motion/react";
import { Waves, Utensils, Scissors, Snowflake, Cpu, RotateCw, Plug, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const services = [
  {
    icon: Waves,
    title: "Laundry Equipment Supply & Maintenance",
    description: "Reliable washing, drying, and ironing systems for industrial use.",
    image: "", // Placeholder for real image
    details: [
      "Washing machines & dryers",
      "Ironing & pressing machines",
      "Installation & repair services",
      "Annual Maintenance Contracts (AMC)",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Utensils,
    title: "Kitchen & Bakery Equipment Services",
    description: "Designed to enhance efficiency and meet modern food industry needs.",
    image: "",
    details: [
      "Ovens, mixers & refrigerators",
      "Installation & servicing",
      "Hotels & restaurants support",
      "Emergency repair service",
    ],
    color: "from-blue-900 to-slate-900",
  },
  {
    icon: Scissors,
    title: "Embroidery Machine Repairing",
    description: "Expert troubleshooting, repairing, and maintenance for industrial embroidery machines to ensure smooth operation and precision.",
    image: "",
    details: [
      "Troubleshooting & diagnostics",
      "Parts replacement",
      "Calibration & testing",
      "Preventive maintenance",
    ],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Snowflake,
    title: "Air Conditioning Services",
    description: "Comprehensive AC repair, installation, gas filling, piping, uninstallation, and annual maintenance for residential and commercial systems.",
    image: "",
    details: [
      "Residential & Commercial units",
      "Gas filling & piping repair",
      "Annual maintenance (AMC)",
      "Installation & uninstallation",
    ],
    color: "from-sky-500 to-blue-500",
  },
  {
    icon: Cpu,
    title: "Control Panel Manufacturing & Troubleshooting",
    description: "Design, production, and maintenance of electrical control panels — including Power Distribution, MCC, PLC, Automation, and Synchronization Panels.",
    image: "",
    details: [
      "Power Distribution Panels",
      "MCC & PLC Automation",
      "Synchronization Panels",
      "System upgrades & maintenance",
    ],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: RotateCw,
    title: "Motor Rewinding & Repair",
    description: "Professional motor rewinding services for single-phase and three-phase motors used in industrial and commercial applications.",
    image: "",
    details: [
      "Single & Three-phase motors",
      "Industrial motor overhaul",
      "Bearing replacement",
      "Insulation & testing",
    ],
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Plug,
    title: "Electrical Installation & House Wiring",
    description: "Complete electrical wiring and installation for residential, commercial, and industrial facilities — ensuring safety and compliance with international standards.",
    image: "",
    details: [
      "Residential house wiring",
      "Commercial electrical setup",
      "Industrial facility installation",
      "Safety inspections & compliance",
    ],
    color: "from-yellow-500 to-amber-500",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Service Image Section */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <motion.div
          className="absolute inset-0 bg-slate-200" // Placeholder background
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        {/* Placeholder for real images once generated */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-0">
          <Icon className="w-16 h-16 text-slate-300 opacity-20" />
        </div>
      </div>

      {/* Content Section with Left Blue Bar */}
      <div className="relative p-8 flex-grow flex">
        {/* The requested Blue Vertical Bar */}
        <div className="absolute left-0 top-8 bottom-8 w-1.5 bg-blue-600 rounded-r-full" />

        <div className="pl-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            {service.description}
          </p>

          <ul className="space-y-3 mb-8">
            {service.details.map((detail, i) => (
              <li key={i} className="flex items-center text-sm text-slate-500">
                <div className="w-1 h-1 rounded-full bg-blue-400 mr-3" />
                {detail}
              </li>
            ))}
          </ul>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 h-auto text-sm font-semibold transition-all group-hover:shadow-lg group-hover:shadow-blue-500/30"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Expert Help
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-24 bg-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm tracking-widest uppercase" style={{ color: "#f59e0b" }}>What We Offer</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#ffffff" }}>
            Engineering solutions for all industries
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#94a3b8" }}>
            Expert maintenance, repair, and installation services for industrial and commercial equipment across Qatar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <span className="text-sm tracking-widest uppercase mb-4 block" style={{ color: "#f59e0b" }}>
              Why Choose Us
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#ffffff" }}>
              World class quality is our priority
            </h3>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "#94a3b8" }}>
              At <span className="font-semibold" style={{ color: "#ffffff" }}>Bubble Up Trading & Maintenance</span>, we take pride in delivering dependable engineering solutions backed by expertise, innovation, and customer commitment. Our goal is to provide high-quality services that ensure performance, safety, and lasting value for every client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: "⚙️",
                title: "Skilled Engineers & Technicians",
                description: "Our experienced team ensures every project is handled with precision, safety, and technical excellence."
              },
              {
                icon: "💰",
                title: "Reliable & Cost-Effective Solutions",
                description: "We deliver quality services that balance performance, durability, and affordability for every client."
              },
              {
                icon: "📊",
                title: "24/7 Customer Support",
                description: "Round-the-clock assistance to ensure your operations run smoothly without interruption."
              },
              {
                icon: "✓",
                title: "Commitment to Quality & Safety",
                description: "We follow strict international standards to guarantee safe, efficient, and long-lasting results."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2" style={{ color: "#ffffff" }}>{item.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
