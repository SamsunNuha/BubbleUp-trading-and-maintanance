import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Industrial Pump",
        category: "Machinery",
        price: 1200,
        offer: "10% OFF",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400",
    },
    {
        id: 2,
        name: "Safety Gear Kit",
        category: "Safety",
        price: 350,
        offer: "New Arrival",
        image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&q=80&w=400",
    },
    {
        id: 3,
        name: "Maintenance Toolset",
        category: "Tools",
        price: 850,
        offer: "Best Seller",
        image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=400",
    },
];

export function Shop() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                        Our Products
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Browse our premium selection of industrial equipment, maintenance tools, and safety gear.
                    </p>
                </motion.div>

                {/* Offers Banner */}
                <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-2xl p-8 mb-16 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                            <Star className="text-yellow-400" /> Exclusive Offers
                        </h2>
                        <p className="text-slate-300 mb-4">Get up to 25% discount on bulk maintenance service kits this month.</p>
                        <Button className="bg-blue-600 hover:bg-blue-700">View Deals</Button>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShoppingBag size={150} />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_PRODUCTS.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ y: -10 }}
                            className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden group"
                        >
                            <div className="aspect-square relative overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {product.offer}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-blue-400 text-sm mb-2">{product.category}</div>
                                <h3 className="text-xl font-bold mb-4">{product.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold">${product.price}</span>
                                    <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                                        Reserve <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
