/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Globe, Files, Zap, Sparkles } from 'lucide-react'

const stats = [
    { icon: Globe, value: 15, suffix: '+', label: 'Languages Supported', color: 'text-neon-cyan', glowColor: 'rgba(34, 211, 238, 0.12)' },
    { icon: Files, value: 10, suffix: 'k+', label: 'Files Scanned', color: 'text-neon-purple', glowColor: 'rgba(167, 139, 250, 0.12)' },
    { icon: Zap, value: 2, prefix: '<', suffix: 's', label: 'Graph Generation', color: 'text-neon-blue', glowColor: 'rgba(96, 165, 250, 0.12)' },
    { icon: Sparkles, value: 100, suffix: '%', label: 'AI Powered Insights', color: 'text-neon-cyan', glowColor: 'rgba(34, 211, 238, 0.12)' },
]

function AnimatedNumber({ value, prefix = '', suffix = '', isInView }) {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!isInView) return
        const duration = 2000
        const startTime = performance.now()

        const animate = (time) => {
            const elapsed = time - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            setCurrent(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
    }, [isInView, value])

    return (
        <span>
            {prefix}{current}{suffix}
        </span>
    )
}

function StatCard({ stat, index, isInView }) {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 150, damping: 20 })
    const springY = useSpring(y, { stiffness: 150, damping: 20 })
    const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
    const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

    const handleMouse = (e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ perspective: 800 }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={() => { x.set(0); y.set(0) }}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="glass-card rounded-2xl p-6 sm:p-8 text-center group"
            >
                <div style={{ transform: 'translateZ(15px)' }}>
                    <motion.div
                        className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center bg-white/[0.03]"
                        whileHover={{
                            scale: 1.15,
                            backgroundColor: 'rgba(255,255,255,0.06)',
                            boxShadow: `0 0 30px ${stat.glowColor}`,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </motion.div>

                    <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-2 font-mono`}
                        style={{ transform: 'translateZ(10px)' }}
                    >
                        <AnimatedNumber
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                            isInView={isInView}
                        />
                    </div>

                    <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Stats() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section ref={sectionRef} className="relative min-h-[auto] sm:min-h-screen flex flex-col justify-center py-12 sm:py-10 scroll-mt-20 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-neon-purple/[0.05] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-neon-cyan/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Built for Scale</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        Performance that matches your ambition.
                    </p>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} index={index} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    )
}
