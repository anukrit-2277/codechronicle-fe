import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Github, Copy, Check, Terminal } from 'lucide-react'

const COMMAND = 'code --install-extension AnujKamalJain.codechronicle'

export default function InstallCTA() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(COMMAND)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section ref={sectionRef} id="install" className="relative min-h-[auto] sm:min-h-screen flex flex-col justify-center py-16 sm:py-32 scroll-mt-20 overflow-hidden">
            {/* Ambient lighting */}
            <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 60%)' }} />
            <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 60%)' }} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full text-center">
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mb-8"
                >
                    <img
                        src="/logo1.png"
                        alt="CodeChronicle"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto brightness-110 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                        style={{ mixBlendMode: 'screen' }}
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
                    <a
                        href="vscode:extension/AnujKamalJain.codechronicle"
                        className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-dark-900 font-semibold text-base sm:text-lg
                            hover:-translate-y-0.5 transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, #22d3ee, #60a5fa)',
                            boxShadow: '0 0 20px rgba(34,211,238,0.25), 0 8px 32px rgba(34,211,238,0.15)',
                        }}
                    >
                        Install Extension
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>

                    <a
                        href="https://github.com/anujkamaljain/CodeChronicle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-medium text-base sm:text-lg
                            text-white/70 hover:text-white hover:-translate-y-0.5 transition-all duration-300
                            bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08]"
                    >
                        <Github className="w-5 h-5" />
                        View on GitHub
                    </a>
                </motion.div>

                {/* Terminal command */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="flex justify-center"
                >
                    <div className="relative inline-flex items-center w-full max-w-lg rounded-xl bg-[#020617] border border-white/[0.08]"
                        style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)' }}
                    >
                        <div className="flex items-center gap-3 px-5 py-4 w-full">
                            <span className="text-neon-cyan/70 text-xs sm:text-sm font-mono font-bold select-none">$</span>
                            <code className="text-xs sm:text-sm font-mono text-white/55 flex-1 truncate">
                                {COMMAND}
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
