import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Github, Copy, Check } from 'lucide-react'

export default function Hero() {
    const heroRef = useRef(null)
    const isInView = useInView(heroRef, { once: true })
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText('code --install-extension AnujKamalJain.codechronicle')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

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

                {/* Terminal command */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex justify-center mt-8"
                >
                    <div className="inline-flex items-center w-full max-w-lg rounded-xl bg-[#020617] border border-white/[0.08]"
                        style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)' }}
                    >
                        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3.5 w-full">
                            <span className="text-neon-cyan/70 text-[10px] sm:text-sm font-mono font-bold select-none">$</span>
                            <code className="text-[10px] sm:text-sm font-mono text-white/55 flex-1 truncate">
                                code --install-extension AnujKamalJain.codechronicle
                            </code>
                            <button
                                onClick={handleCopy}
                                className="flex items-center justify-center w-8 h-8 rounded-lg
                                    text-white/30 hover:text-white/70 hover:bg-white/[0.06]
                                    transition-all duration-200 cursor-pointer shrink-0"
                                title="Copy to clipboard"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4 text-green-400" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

        </section>
    )
}
