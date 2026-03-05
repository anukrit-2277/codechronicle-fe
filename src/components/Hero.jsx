import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'

const floatingShapes = [
    { x: '8%', y: '22%', size: 60, delay: 0, duration: 20 },
    { x: '87%', y: '16%', size: 42, delay: 1.5, duration: 16 },
    { x: '78%', y: '70%', size: 50, delay: 0.8, duration: 18 },
    { x: '13%', y: '72%', size: 34, delay: 2, duration: 22 },
    { x: '92%', y: '55%', size: 26, delay: 1, duration: 14 },
    { x: '45%', y: '85%', size: 30, delay: 2.5, duration: 17 },
]

export default function Hero() {
    const heroRef = useRef(null)
    const isInView = useInView(heroRef, { once: true })
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150])
    const parallaxOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/40 via-transparent to-[#020617]/40 z-[1]" />
            <div className="absolute inset-0 grid-pattern z-[1] opacity-40" />

            {/* Floating geometric shapes */}
            {floatingShapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute pointer-events-none z-[2] hidden sm:block"
                    style={{ left: shape.x, top: shape.y }}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={isInView ? { opacity: 0.07, scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 1.5, delay: 1.2 + shape.delay * 0.3, ease: 'easeOut' }}
                >
                    <motion.div
                        animate={{
                            y: [0, -15, 0, 10, 0],
                            rotate: [0, 360],
                        }}
                        transition={{
                            y: { duration: shape.duration / 3, repeat: Infinity, ease: 'easeInOut' },
                            rotate: { duration: shape.duration, repeat: Infinity, ease: 'linear' },
                        }}
                    >
                        <div
                            className="border border-white/20 rounded-xl"
                            style={{ width: shape.size, height: shape.size }}
                        />
                    </motion.div>
                </motion.div>
            ))}

            {/* Content with parallax */}
            <motion.div
                className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-20"
                style={{ y: parallaxY, opacity: parallaxOpacity }}
            >
                {/* Animated badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan" />
                        </span>
                        <span className="text-xs font-medium text-white/50 tracking-wide uppercase">
                            AI-Powered VS Code Extension
                        </span>
                    </span>
                </motion.div>

                {/* Title with blur-to-focus + scale reveal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
                    animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-4 sm:mb-6">
                        <span className="gradient-text">CodeChronicle</span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                        className="text-lg sm:text-xl md:text-3xl text-white/70 font-light mb-4 max-w-3xl mx-auto"
                    >
                        Understand Your Codebase Instantly
                    </motion.p>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="text-sm sm:text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
                >
                    AI-Powered Dependency Graphs, Blast Radius Prediction, and Natural Language
                    Code Exploration — directly inside VS Code.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 }}
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
            </motion.div>
        </section>
    )
}
