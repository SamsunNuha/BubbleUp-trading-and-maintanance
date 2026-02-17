import { motion } from "motion/react";
import { Button } from "./ui/button";

export function PartnerCTA() {
    return (
        <section className="relative py-24 bg-slate-950 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, rgba(251, 191, 36, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(251, 191, 36, 0.1) 1px, transparent 1px)
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

            <div className="relative max-w-6xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-8"
                >
                    Partner with Qatar's trusted engineering experts.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-300 text-lg md:text-xl mb-12 max-w-4xl mx-auto"
                >
                    From installation to maintenance, we keep your systems performing at their best — always on time, every time.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <Button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-6 text-lg font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all"
                    >
                        Connect Now
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
