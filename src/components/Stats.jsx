import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Files, Zap, Sparkles } from 'lucide-react'

const stats = [
    { icon: Globe, value: 15, suffix: '+', label: 'Languages Supported', color: 'text-neon-cyan' },
    { icon: Files, value: 10, suffix: 'k+', label: 'Files Scanned', color: 'text-neon-purple' },
    { icon: Zap, value: 2, prefix: '<', suffix: 's', label: 'Graph Generation', color: 'text-neon-blue' },
    { icon: Sparkles, value: 100, suffix: '%', label: 'AI Powered Insights', color: 'text-neon-cyan' },
]

function AnimatedNumber({ value, prefix = '', suffix = '', isInView }) {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!isInView) return
        let start = 0
        const duration = 2000
        const startTime = performance.now()

        const animate = (time) => {
            const elapsed = time - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
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

export default function Stats() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section ref={sectionRef} className="relative py-24 sm:py-32">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Built for Scale</span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto">
                        Performance that matches your ambition.
                    </p>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="glass-card rounded-2xl p-6 sm:p-8 text-center group hover:scale-105 transition-transform duration-500"
                        >
                            <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center bg-white/[0.03] group-hover:bg-white/[0.06] transition-all`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>

                            <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-2 font-mono`}>
                                <AnimatedNumber
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                    isInView={isInView}
                                />
                            </div>

                            <p className="text-white/45 text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
