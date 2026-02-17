import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real application, this would send to a backend
    toast.success("Message sent successfully! We'll contact you soon.");

    setFormData({
      name: "",
      company: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+974 3339 3335",
      action: "tel:+97433393335",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      content: "Quick Response",
      action: "https://wa.me/97433393335",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email",
      content: "bubbleuptrading@gmail.com",
      action: "mailto:bubbleuptrading@gmail.com",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Doha, Qatar",
      action: null,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-slate-950">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
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
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Contact Us Today
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Need reliable maintenance support? Our team is ready to help you 24/7
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={index}
                href={info.action || undefined}
                target={info.action?.startsWith('http') ? '_blank' : undefined}
                rel={info.action?.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}
                className={`block bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 ${info.action ? 'cursor-pointer' : 'cursor-default'
                  } group relative overflow-hidden`}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative flex items-start gap-4">
                  <motion.div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <div>
                    <h4 className="text-white mb-1">{info.title}</h4>
                    <p className="text-slate-400 text-sm">{info.content}</p>
                  </div>
                </div>
              </motion.a>
            );
          })}

          {/* Operating Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-600/30 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>

              <div>
                <h4 className="text-white mb-3">Operating Hours</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-slate-300">24/7 Emergency Support</p>
                  <p className="text-slate-400">Office: Sat-Thu, 8AM-6PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl text-white mb-6">Request a Service</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-2">Your Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">Company Name</label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-2">Phone Number *</label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                      placeholder="+974 3339 3335"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">Email Address *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Service Required *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select a service</option>
                    <option value="laundry">Industrial Laundry Equipment</option>
                    <option value="kitchen">Kitchen & Bakery Equipment</option>
                    <option value="embroidery">Embroidery Machine Repair</option>
                    <option value="hvac">HVAC & Air Conditioning</option>
                    <option value="electrical">Electrical Control Panels</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 min-h-32"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg group"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Map & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Map Placeholder */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative text-center">
                <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h4 className="text-white text-xl mb-2">Our Location</h4>
                <p className="text-slate-400">Doha, Qatar</p>
                <p className="text-sm text-slate-500 mt-2">
                  (Exact address available upon contact)
                </p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <h4 className="text-white text-xl mb-4">Quick Response</h4>
              <p className="text-slate-300 mb-6">
                For urgent service requests or emergencies, call us directly or send a WhatsApp message for immediate assistance.
              </p>

              <div className="space-y-3">
                <motion.a
                  href="tel:+974XXXXXXXX"
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3 text-blue-400 hover:text-blue-300"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now: +974 3339 3335</span>
                </motion.a>

                <motion.a
                  href="https://wa.me/97433393335"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-3 text-green-400 hover:text-green-300"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp Chat</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
