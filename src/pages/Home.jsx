import Hero from '../components/Hero'
import InstallGuide from '../components/InstallGuide'
import GraphDemo from '../components/GraphDemo'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Screenshots from '../components/Screenshots'
import Stats from '../components/Stats'
import InstallCTA from '../components/InstallCTA'
import Footer from '../components/Footer'
import PersistentBackground from '../components/PersistentBackground'

function GlowOrb({ color = 'cyan', position = 'left', top = '0px', delay = 0 }) {
    const colors = {
        cyan: 'bg-neon-cyan/[0.07]',
        purple: 'bg-neon-purple/[0.07]',
        blue: 'bg-neon-blue/[0.07]',
    }
    const pos = position === 'left' ? '-left-32 sm:-left-48' : '-right-32 sm:-right-48'

    return (
        <div
            className={`absolute ${pos} w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] ${colors[color]} rounded-full blur-[100px] sm:blur-[150px] pointer-events-none animate-orb-drift`}
            style={{
                top,
                animationDelay: `${delay}s`,
                animationDuration: `${18 + delay * 2}s`,
            }}
        />
    )
}

import Navbar from '../components/Navbar'
import ThreeGraphBackground from '../components/ThreeGraphBackground'

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden">
            {/* Navbar */}
            <Navbar />

            {/* 3D animated background -fixed across entire page */}
            <ThreeGraphBackground />

            {/* Persistent particle background */}
            <PersistentBackground />

            {/* Grid overlay across entire page */}
            <div className="fixed inset-0 z-0 pointer-events-none grid-pattern opacity-30" />

            {/* Floating glow orbs with drift animation */}
            <GlowOrb color="cyan" position="left" top="600px" delay={0} />
            <GlowOrb color="purple" position="right" top="1200px" delay={2} />
            <GlowOrb color="blue" position="left" top="2000px" delay={4} />
            <GlowOrb color="cyan" position="right" top="2800px" delay={1} />
            <GlowOrb color="purple" position="left" top="3600px" delay={3} />
            <GlowOrb color="blue" position="right" top="4400px" delay={5} />
            <GlowOrb color="cyan" position="left" top="5200px" delay={2} />

            <div className="relative z-10">
                <Hero />

                {/* Glow divider between sections */}
                <div className="max-w-4xl mx-auto px-6">
                    <div className="glow-divider" />
                </div>

                <InstallGuide />

                <div className="max-w-4xl mx-auto px-6">
                    <div className="glow-divider" />
                </div>

                <GraphDemo />

                <div className="max-w-4xl mx-auto px-6">
                    <div className="glow-divider" />
                </div>

                <Features />

                <div className="max-w-4xl mx-auto px-6">
                    <div className="glow-divider" />
                </div>

                <HowItWorks />

                <div className="max-w-4xl mx-auto px-6">
                    <div className="glow-divider" />
                </div>

                <Screenshots />

                <div className="max-w-4xl mx-auto px-6">
                    <div className="glow-divider" />
                </div>

                <Stats />

                <div className="max-w-4xl mx-auto px-6">
                    <div className="glow-divider" />
                </div>

                <InstallCTA />
                <Footer />
            </div>
        </main>
    )
}
