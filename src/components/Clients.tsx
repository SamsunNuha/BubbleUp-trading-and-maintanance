import { motion } from "motion/react";

const clients = [
    { name: "Girbau", logo: "GIRBAU" },
    { name: "Speed Queen", logo: "Speed Queen" },
    { name: "UniMac", logo: "UniMac" },
    { name: "Lavamac", logo: "lavamac" },
    { name: "Image Laundry Systems", logo: "Image" },
    { name: "Electrolux", logo: "Electrolux" },
];

export function Clients() {
    return (
        <section className="relative py-24 bg-slate-900">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl text-white font-bold mb-6">
                        OUR CLIENTS
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        We proudly serve clients across industrial, commercial, and residential sectors.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {clients.map((client, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-xl p-6 flex items-center justify-center aspect-square hover:bg-white/10 transition-all"
                        >
                            <div className="text-center">
                                <p className="text-white font-bold text-lg">{client.logo}</p>
                                <p className="text-slate-500 text-xs mt-1">{client.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-slate-500 text-sm mt-12"
                >
                    Trusted by leading brands in the laundry and industrial equipment industry
                </motion.p>
            </div>
        </section>
    );
}
