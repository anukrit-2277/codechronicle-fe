import Hero from '../components/Hero'
import GraphDemo from '../components/GraphDemo'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Screenshots from '../components/Screenshots'
import Stats from '../components/Stats'
import Trust from '../components/Trust'
import InstallCTA from '../components/InstallCTA'
import Footer from '../components/Footer'

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden">
            <Hero />
            <GraphDemo />
            <Features />
            <HowItWorks />
            <Screenshots />
            <Stats />
            <Trust />
            <InstallCTA />
            <Footer />
        </main>
    )
}
