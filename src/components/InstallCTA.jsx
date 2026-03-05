import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'

export default function InstallCTA() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section ref={sectionRef} id="install" className="relative min-h-screen flex flex-col justify-center py-24 sm:py-32 scroll-mt-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
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
                                className="mx-auto mb-8"
                            >
                                <img
                                    src="/logo1.png"
                                    alt="CodeChronicle"
                                    className="w-20 h-20 object-contain mx-auto brightness-110"
                                    style={{ mixBlendMode: 'screen' }}
                                />
                            </motion.div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                Ready to <span className="gradient-text">Chronicle</span> Your Code?
                            </h2>

                            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10">
                                Install CodeChronicle in VS Code and start understanding your codebase in seconds.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                                    View on GitHub
                                </a>
                            </div>

                            {/* Install command */}
                            <div className="mt-8">
                                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-dark-900/60 border border-white/5">
                                    <span className="text-neon-cyan/60 text-sm font-mono">$</span>
                                    <code className="text-sm font-mono text-white/50">
                                        code --install-extension AnujKamalJain.codechronicle
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
