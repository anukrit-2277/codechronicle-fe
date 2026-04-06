/* eslint-disable no-unused-vars */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Shield, Download } from 'lucide-react'

export default function Trust() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section ref={sectionRef} id="trust" className="relative py-24 sm:py-32">
            {/* Ambient glow */}
            <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-neon-blue/4 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-neon-purple/4 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Trusted by Developers</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        Open source, transparent, and built for the community.
                    </p>
                </motion.div>

                {/* Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 sm:gap-6"
                >

                    {/* Open source */}
                    <div className="glass-card rounded-xl px-6 py-4 flex items-center gap-3 hover:scale-105 transition-all duration-300">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-medium text-white/70">Open Source</span>
                    </div>

                    {/* VS Code badge */}
                    <div className="glass-card rounded-xl px-6 py-4 flex items-center gap-3 hover:scale-105 transition-all duration-300">
                        <Download className="w-5 h-5 text-neon-blue" />
                        <span className="text-sm font-medium text-white/70">VS Code Marketplace</span>
                    </div>
                </motion.div>

                {/* Testimonial-style quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <div className="glass-card rounded-2xl p-8 sm:p-12 max-w-2xl mx-auto">
                        <p className="text-lg sm:text-xl text-white/60 italic leading-relaxed mb-6">
                            "CodeChronicle changed how our team approaches large refactors.
                            We can finally see the full picture before making changes."
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-sm font-bold">
                                SK
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium text-white/80">Senior Engineer</p>
                                <p className="text-xs text-white/40">Open Source Contributor</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
