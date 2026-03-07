import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FolderOpen, Scan, Brain } from 'lucide-react'

const steps = [
    {
        step: '01',
        icon: FolderOpen,
        title: 'Open your project in VS Code',
        description: 'Open any project -TypeScript, Python, Go, Rust, or 15+ other languages.',
        iconBg: 'bg-neon-cyan/10',
        iconBorder: 'border-neon-cyan/20',
        iconColor: 'text-neon-cyan',
        badgeBg: 'bg-neon-cyan/10',
        badgeText: 'text-neon-cyan',
        glowColor: 'rgba(34, 211, 238, 0.15)',
    },
    {
        step: '02',
        icon: Scan,
        title: 'Run CodeChronicle Scan',
        description: 'One command to analyze your entire codebase. Results in under 2 seconds.',
        iconBg: 'bg-neon-purple/10',
        iconBorder: 'border-neon-purple/20',
        iconColor: 'text-neon-purple',
        badgeBg: 'bg-neon-purple/10',
        badgeText: 'text-neon-purple',
        glowColor: 'rgba(167, 139, 250, 0.15)',
    },
    {
        step: '03',
        icon: Brain,
        title: 'Explore with AI',
        description: 'Navigate dependency graphs, predict blast radius, and ask questions in natural language.',
        iconBg: 'bg-neon-blue/10',
        iconBorder: 'border-neon-blue/20',
        iconColor: 'text-neon-blue',
        badgeBg: 'bg-neon-blue/10',
        badgeText: 'text-neon-blue',
        glowColor: 'rgba(96, 165, 250, 0.15)',
    },
]

export default function HowItWorks() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section ref={sectionRef} id="how-it-works" className="relative min-h-[auto] sm:min-h-screen flex flex-col justify-center py-12 sm:py-10 scroll-mt-20 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-neon-cyan/[0.05] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-blue/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">How It Works</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        From install to insight in three simple steps.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Animated connector line (desktop) */}
                    <motion.div
                        className="hidden lg:block absolute top-1/2 left-[16.666%] right-[16.666%] h-px z-0"
                        style={{ transform: 'translateY(-50%)' }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="w-full h-full bg-gradient-to-r from-neon-cyan/30 via-neon-purple/30 to-neon-blue/30" />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-neon-cyan/60 via-neon-purple/60 to-neon-blue/60 blur-[2px]"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: [0, 0.6, 0.3] } : {}}
                            transition={{ duration: 2, delay: 1.5 }}
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.3 + index * 0.25,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="relative text-center"
                            >
                                {/* Step number background */}
                                <motion.div
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-[120px] font-black text-white/[0.02] leading-none select-none pointer-events-none"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 1, delay: 0.5 + index * 0.3 }}
                                >
                                    {step.step}
                                </motion.div>

                                {/* Icon with hover glow */}
                                <motion.div
                                    className={`w-20 h-20 rounded-2xl mx-auto mb-6 ${step.iconBg} border ${step.iconBorder} flex items-center justify-center cursor-default`}
                                    whileHover={{
                                        scale: 1.1,
                                        boxShadow: `0 0 40px ${step.glowColor}`,
                                        rotate: 5,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                >
                                    <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                                </motion.div>

                                {/* Step label */}
                                <div className={`inline-block px-3 py-1 rounded-full ${step.badgeBg} ${step.badgeText} text-xs font-mono font-medium mb-4`}>
                                    Step {step.step}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                                    {step.description}
                                </p>

                                {/* Arrow (mobile only) */}
                                {index < steps.length - 1 && (
                                    <motion.div
                                        className="lg:hidden flex justify-center my-6"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.8 + index * 0.3 }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/20">
                                            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
