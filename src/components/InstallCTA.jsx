import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'

export default function InstallCTA() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section ref={sectionRef} id="install" className="relative min-h-[auto] sm:min-h-screen flex flex-col justify-center py-16 sm:py-32 scroll-mt-20 overflow-hidden">
            {/* Ambient lighting */}
            <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 60%)' }} />
            <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 60%)' }} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full text-center">
                {/* Logo with float animation */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mb-8"
                >
                    <motion.img
                        src="/logo1.png"
                        alt="CodeChronicle"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto brightness-110"
                        style={{ mixBlendMode: 'screen' }}
                        animate={{
                            y: [0, -8, 0],
                            filter: [
                                'drop-shadow(0 0 20px rgba(34,211,238,0.3))',
                                'drop-shadow(0 0 35px rgba(34,211,238,0.5))',
                                'drop-shadow(0 0 20px rgba(34,211,238,0.3))',
                            ],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5"
                >
                    Ready to{' '}
                    <span
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: 'linear-gradient(90deg, #22d3ee, #60a5fa, #a78bfa)' }}
                    >
                        Chronicle
                    </span>{' '}
                    Your Code?
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-white/50 text-base sm:text-lg max-w-xl mx-auto mb-9 leading-relaxed"
                >
                    Install CodeChronicle in VS Code and start understanding your codebase in seconds.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
                >
                    <motion.a
                        href="vscode:extension/AnujKamalJain.codechronicle"
                        className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-dark-900 font-semibold text-base sm:text-lg relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #22d3ee, #60a5fa)',
                            boxShadow: '0 0 20px rgba(34,211,238,0.25), 0 8px 32px rgba(34,211,238,0.15)',
                        }}
                        whileHover={{
                            y: -3,
                            boxShadow: '0 0 40px rgba(34,211,238,0.4), 0 15px 50px rgba(34,211,238,0.25)',
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                        <span className="absolute inset-0 overflow-hidden rounded-2xl">
                            <span
                                className="absolute top-0 left-0 w-[60%] h-full pointer-events-none"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                    animation: 'shimmer-sweep 3s ease-in-out infinite',
                                }}
                            />
                        </span>
                        <span className="relative z-10 flex items-center gap-2.5">
                            Install Extension
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                    </motion.a>

                    <motion.a
                        href="https://github.com/anujkamaljain/CodeChronicle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-medium text-base sm:text-lg
                            text-white/70 hover:text-white transition-all duration-300
                            bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08]"
                        whileHover={{ y: -3, boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                        <Github className="w-5 h-5" />
                        View on GitHub
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
