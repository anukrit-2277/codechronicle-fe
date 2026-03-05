import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'
import ThreeGraphBackground from './ThreeGraphBackground'

export default function Hero() {
    const heroRef = useRef(null)
    const isInView = useInView(heroRef, { once: true })

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 3D Background */}
            <ThreeGraphBackground />

            {/* Gradient overlays — subtle side vignette only, no bottom cutoff */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/40 via-transparent to-[#020617]/40 z-[1]" />

            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern z-[1] opacity-40" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6">
                        <span className="gradient-text">CodeChronicle</span>
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl text-white/70 font-light mb-4 max-w-3xl mx-auto">
                        Understand Your Codebase Instantly
                    </p>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
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

                {/* Floating mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-16 relative"
                >
                    <div className="relative mx-auto max-w-4xl">
                        {/* Mock VS Code window */}
                        <div className="glass-card rounded-2xl overflow-hidden glow-cyan">
                            {/* Title bar */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs text-white/30 font-mono ml-2">CodeChronicle — Dependency Graph</span>
                            </div>
                            {/* Content */}
                            <div className="p-6 sm:p-8 bg-gradient-to-br from-dark-900/90 to-dark-800/90">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="px-3 py-1.5 rounded-lg bg-neon-cyan/10 text-neon-cyan text-xs font-mono border border-neon-cyan/20">
                                        Graph View
                                    </div>
                                    <div className="px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-xs font-mono">
                                        Blast Radius
                                    </div>
                                    <div className="px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-xs font-mono">
                                        AI Query
                                    </div>
                                </div>
                                {/* Mock graph */}
                                <div className="relative h-48 sm:h-64">
                                    <svg className="w-full h-full" viewBox="0 0 600 250">
                                        {/* Edges */}
                                        <line x1="300" y1="40" x2="150" y2="120" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
                                        <line x1="300" y1="40" x2="450" y2="120" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
                                        <line x1="150" y1="120" x2="80" y2="200" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
                                        <line x1="150" y1="120" x2="220" y2="200" stroke="#22d3ee" strokeWidth="1" opacity="0.3" />
                                        <line x1="450" y1="120" x2="380" y2="200" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
                                        <line x1="450" y1="120" x2="520" y2="200" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
                                        {/* Nodes */}
                                        <circle cx="300" cy="40" r="12" fill="#22d3ee" opacity="0.8">
                                            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx="150" cy="120" r="10" fill="#a78bfa" opacity="0.7" />
                                        <circle cx="450" cy="120" r="10" fill="#60a5fa" opacity="0.7" />
                                        <circle cx="80" cy="200" r="7" fill="#22d3ee" opacity="0.5" />
                                        <circle cx="220" cy="200" r="7" fill="#a78bfa" opacity="0.5" />
                                        <circle cx="380" cy="200" r="7" fill="#60a5fa" opacity="0.5" />
                                        <circle cx="520" cy="200" r="7" fill="#22d3ee" opacity="0.5" />
                                        {/* Labels */}
                                        <text x="300" y="25" textAnchor="middle" fill="white" fontSize="9" fontFamily="JetBrains Mono" opacity="0.7">App.tsx</text>
                                        <text x="150" y="105" textAnchor="middle" fill="white" fontSize="8" fontFamily="JetBrains Mono" opacity="0.6">Router.tsx</text>
                                        <text x="450" y="105" textAnchor="middle" fill="white" fontSize="8" fontFamily="JetBrains Mono" opacity="0.6">Store.ts</text>
                                        <text x="80" y="220" textAnchor="middle" fill="white" fontSize="7" fontFamily="JetBrains Mono" opacity="0.5">Home.tsx</text>
                                        <text x="220" y="220" textAnchor="middle" fill="white" fontSize="7" fontFamily="JetBrains Mono" opacity="0.5">Auth.tsx</text>
                                        <text x="380" y="220" textAnchor="middle" fill="white" fontSize="7" fontFamily="JetBrains Mono" opacity="0.5">api.ts</text>
                                        <text x="520" y="220" textAnchor="middle" fill="white" fontSize="7" fontFamily="JetBrains Mono" opacity="0.5">utils.ts</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -right-4 top-12 glass-card rounded-xl px-4 py-3 glow-purple hidden lg:block"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-xs text-white/70 font-mono">12 files analyzed</span>
                            </div>
                        </motion.div>

                        {/* Another floating badge */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            className="absolute -left-4 bottom-16 glass-card rounded-xl px-4 py-3 glow-cyan hidden lg:block"
                        >
                            <div className="text-xs font-mono">
                                <span className="text-neon-cyan">Risk:</span>
                                <span className="text-white/60 ml-1">Low</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

        </section>
    )
}
