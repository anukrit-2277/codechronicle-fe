/* eslint-disable no-unused-vars */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, Search, Sparkles, Monitor } from 'lucide-react'

const steps = [
    {
        number: '01',
        icon: Search,
        title: 'Search for CodeChronicle',
        description:
            'Open the Extensions panel in Kiro (Ctrl+Shift+X / Cmd+Shift+X), type "CodeChronicle" in the search bar, and locate the extension by AnujKamalJain.',
        image: '/1.png',
        color: 'cyan',
    },
    {
        number: '02',
        icon: Download,
        title: 'Install the Extension',
        description:
            'Click the Install button on the CodeChronicle extension page. Once installed, you\'ll see the CodeChronicle icon appear in the sidebar with options like Scan Workspace and Open Graph View.',
        image: '/2.png',
        color: 'purple',
    },
    {
        number: '03',
        icon: Sparkles,
        title: 'Start Exploring',
        description:
            'Click "Scan Workspace" to analyze your project. Open the Graph View to visualize dependencies, use Blast Radius to predict change impact, or ask AI questions about your codebase in plain English.',
        image: null,
        color: 'blue',
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
}

const glowColors = {
    cyan: {
        border: 'rgba(34, 211, 238, 0.15)',
        bg: 'rgba(34, 211, 238, 0.04)',
        number: 'rgba(34, 211, 238, 0.7)',
        shadow: '0 0 30px rgba(34, 211, 238, 0.08)',
        dot: 'bg-neon-cyan',
    },
    purple: {
        border: 'rgba(167, 139, 250, 0.15)',
        bg: 'rgba(167, 139, 250, 0.04)',
        number: 'rgba(167, 139, 250, 0.7)',
        shadow: '0 0 30px rgba(167, 139, 250, 0.08)',
        dot: 'bg-neon-purple',
    },
    blue: {
        border: 'rgba(96, 165, 250, 0.15)',
        bg: 'rgba(96, 165, 250, 0.04)',
        number: 'rgba(96, 165, 250, 0.7)',
        shadow: '0 0 30px rgba(96, 165, 250, 0.08)',
        dot: 'bg-neon-blue',
    },
}

function StepCard({ step, index }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })
    const colors = glowColors[step.color]

    return (
        <motion.div
            ref={ref}
            custom={index}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative"
        >
            {/* Connector line between steps */}
            {index < steps.length - 1 && (
                <div
                    className="absolute left-8 top-full w-px h-12 sm:h-16 z-0 hidden sm:block"
                    style={{
                        background: `linear-gradient(to bottom, ${colors.border}, transparent)`,
                    }}
                />
            )}

            <div
                className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01]"
                style={{
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    boxShadow: colors.shadow,
                }}
            >
                <div className={`flex flex-col ${step.image ? 'lg:flex-row' : ''} gap-6 sm:gap-8 p-6 sm:p-8`}>
                    {/* Text content */}
                    <div className={`flex-1 ${step.image ? 'lg:max-w-md' : ''}`}>
                        {/* Step number + icon row */}
                        <div className="flex items-center gap-4 mb-5">
                            <div
                                className="flex items-center justify-center w-14 h-14 rounded-xl backdrop-blur-sm"
                                style={{
                                    background: colors.bg,
                                    border: `1px solid ${colors.border}`,
                                }}
                            >
                                <span
                                    className="text-xl font-bold font-mono"
                                    style={{ color: colors.number }}
                                >
                                    {step.number}
                                </span>
                            </div>
                            <div
                                className="flex items-center justify-center w-10 h-10 rounded-lg"
                                style={{ background: colors.bg }}
                            >
                                <step.icon
                                    className="w-5 h-5"
                                    style={{ color: colors.number }}
                                />
                            </div>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-white/90 mb-3">
                            {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                            {step.description}
                        </p>

                        {/* Feature chips for step 3 */}
                        {!step.image && (
                            <div className="flex flex-wrap gap-2 mt-5">
                                {['Scan Workspace', 'Graph View', 'Blast Radius', 'AI Queries'].map((feat) => (
                                    <span
                                        key={feat}
                                        className="px-3 py-1.5 rounded-full text-xs font-medium"
                                        style={{
                                            background: colors.bg,
                                            border: `1px solid ${colors.border}`,
                                            color: colors.number,
                                        }}
                                    >
                                        {feat}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Screenshot */}
                    {step.image && (
                        <motion.div
                            className="flex-1 relative group"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <div
                                className="relative rounded-xl overflow-hidden"
                                style={{
                                    border: `1px solid ${colors.border}`,
                                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), ${colors.shadow}`,
                                }}
                            >
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />
                                {/* Gradient overlay on screenshot */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(135deg, ${colors.bg}, transparent)`,
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default function InstallGuide() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            ref={sectionRef}
            id="install-guide"
            className="relative py-24 sm:py-32"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                        style={{
                            background: 'rgba(34, 211, 238, 0.06)',
                            border: '1px solid rgba(34, 211, 238, 0.12)',
                        }}
                    >
                        <Monitor className="w-3.5 h-3.5 text-neon-cyan" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-neon-cyan/80">
                            Quick Setup
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Installation Guide</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        Get CodeChronicle running in your IDE in under a minute
                    </p>
                </motion.div>

                {/* Kiro badge */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center gap-3 mb-10"
                >
                    <img
                        src="/kiro-logo.avif"
                        alt="Kiro"
                        className="w-7 h-7 rounded-md object-contain"
                    />
                    <span className="text-lg font-semibold text-white/80">
                        Installing on Kiro
                    </span>
                </motion.div>

                {/* Steps */}
                <div className="space-y-12 sm:space-y-16 mb-16">
                    {steps.map((step, i) => (
                        <StepCard key={step.number} step={step} index={i} />
                    ))}
                </div>

                {/* Other IDEs note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center"
                >
                    <div
                        className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl backdrop-blur-sm"
                        style={{
                            background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.05), rgba(96, 165, 250, 0.05))',
                            border: '1px solid rgba(167, 139, 250, 0.12)',
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-neon-purple/70" />
                        <span className="text-sm sm:text-base text-white/50">
                            The same steps apply for{' '}
                            <span className="text-neon-blue/80 font-medium">VS Code</span>,{' '}
                            <span className="text-neon-purple/80 font-medium">Antigravity</span>, and any other VS Code-compatible IDE.
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
