import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'

export default function Hero() {
    const heroRef = useRef(null)
    const isInView = useInView(heroRef, { once: true })

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >

            {/* Gradient overlays — subtle side vignette only, no bottom cutoff */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/40 via-transparent to-[#020617]/40 z-[1]" />

            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern z-[1] opacity-40" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-4 sm:mb-6">
                        <span className="gradient-text">CodeChronicle</span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-3xl text-white/70 font-light mb-4 max-w-3xl mx-auto">
                        Understand Your Codebase Instantly
                    </p>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-sm sm:text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
                >
                    AI-Powered Dependency Graphs, Blast Radius Prediction, and Natural Language
                    Code Exploration — directly inside VS Code.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a
                        href="vscode:extension/AnujKamalJain.codechronicle"
                        className="group btn-primary text-lg"
                    >
                        Install Extension
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                        href="https://github.com/anujkamaljain/CodeChronicle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-lg"
                    >
                        <Github className="w-5 h-5" />
                        View GitHub
                    </a>
                </motion.div>
            </div>

        </section>
    )
}
