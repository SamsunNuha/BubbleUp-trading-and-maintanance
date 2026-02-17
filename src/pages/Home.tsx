import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Industries } from "../components/Industries";
import { About } from "../components/About";
import { Team } from "../components/Team";
import { PartnerCTA } from "../components/PartnerCTA";
import { Clients } from "../components/Clients";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Toaster } from "../components/ui/sonner";
import { WhatsAppWidget } from "../components/WhatsAppWidget";

export function Home() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />
            <Hero />
            <Services />
            <Industries />
            <About />
            <Team />
            <PartnerCTA />
            <Clients />
            <Contact />
            <Footer />
            <Toaster position="top-right" />
            <WhatsAppWidget />
        </div>
    );
}
