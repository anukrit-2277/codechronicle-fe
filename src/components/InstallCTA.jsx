import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'

export default function InstallCTA() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section ref={sectionRef} id="install" className="relative py-24 sm:py-32">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Glow background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-neon-purple/5 to-neon-blue/5 rounded-3xl blur-xl" />

                    <div className="relative glass-card rounded-3xl p-8 sm:p-12 md:p-16 text-center overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-white/10 flex items-center justify-center mx-auto mb-8"
                            >
                                <svg viewBox="0 0 24 24" className="w-8 h-8 text-neon-cyan" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                Ready to <span className="gradient-text">Chronicle</span> Your Code?
                            </h2>

                            <p className="text-white/50 text-lg max-w-lg mx-auto mb-10">
                                Install CodeChronicle in VS Code and start understanding your codebase in seconds.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="vscode://code/install?itemName=YOUR_EXTENSION_ID"
                                    className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl
                             bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-900 font-semibold text-lg
                             transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
                                >
                                    Install Extension
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>

                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                             border border-white/10 text-white/70 font-medium text-lg
                             hover:border-white/20 hover:text-white hover:bg-white/5
                             transition-all duration-300"
                                >
                                    <Github className="w-5 h-5" />
                                    View on GitHub
                                </a>
                            </div>

                            {/* Install command */}
                            <div className="mt-8">
                                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-dark-900/60 border border-white/5">
                                    <span className="text-neon-cyan/60 text-sm font-mono">$</span>
                                    <code className="text-sm font-mono text-white/50">
                                        code --install-extension YOUR_EXTENSION_ID
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
