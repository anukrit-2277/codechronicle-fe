/* eslint-disable no-unused-vars */
import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
    GitBranch,
    Target,
    FileText,
    Shield,
    MessageSquare,
    Activity,
} from 'lucide-react'

const features = [
    {
        icon: GitBranch,
        title: 'Dependency Graph Visualization',
        description: 'Instantly map every import, module, and connection across your entire codebase with stunning interactive graphs.',
        color: 'from-neon-cyan/20 to-neon-cyan/5',
        iconColor: 'text-neon-cyan',
        glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]',
    },
    {
        icon: Target,
        title: 'Blast Radius Prediction',
        description: 'See exactly which files and systems will be affected before you make changes. Prevent cascade failures.',
        color: 'from-neon-purple/20 to-neon-purple/5',
        iconColor: 'text-neon-purple',
        glowColor: 'group-hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]',
    },
    {
        icon: FileText,
        title: 'AI File Summaries',
        description: 'Get instant AI-generated summaries of any file. Understand complex code without reading every line.',
        color: 'from-neon-blue/20 to-neon-blue/5',
        iconColor: 'text-neon-blue',
        glowColor: 'group-hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]',
    },
    {
        icon: Shield,
        title: 'Semantic Risk Scoring',
        description: 'Every file gets a risk score based on complexity, dependencies, and change frequency. Focus on what matters.',
        color: 'from-neon-cyan/20 to-neon-cyan/5',
        iconColor: 'text-neon-cyan',
        glowColor: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]',
    },
    {
        icon: MessageSquare,
        title: 'Natural Language Code Queries',
        description: 'Ask questions like "What files handle authentication?" and get precise answers with file references.',
        color: 'from-neon-purple/20 to-neon-purple/5',
        iconColor: 'text-neon-purple',
        glowColor: 'group-hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]',
    },
    {
        icon: Activity,
        title: 'Codebase Health Dashboard',
        description: 'Monitor technical debt, complexity trends, and architecture health in real-time from a single dashboard.',
        color: 'from-neon-blue/20 to-neon-blue/5',
        iconColor: 'text-neon-blue',
        glowColor: 'group-hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]',
    },
]

function Tilt3DCard({ children, className }) {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8])

    const handleMouse = (e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    return (
        <div style={{ perspective: 800 }}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={() => { x.set(0); y.set(0) }}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className={className}
            >
                <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
                    {children}
                </div>
            </motion.div>
        </div>
    )
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

export default function Features() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section ref={sectionRef} id="features" className="relative min-h-auto sm:min-h-screen flex flex-col justify-center py-12 sm:py-10 scroll-mt-20 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-neon-purple/4 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-blue/4 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8 sm:mb-10"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Powerful Features</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        Everything you need to understand, navigate, and maintain complex codebases.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <Tilt3DCard
                                className={`group glass-card rounded-2xl p-5 sm:p-6 transition-all duration-500 hover:scale-[1.02] ${feature.glowColor}`}
                            >
                                {/* Icon with glow pulse */}
                                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                                    style={{ transform: 'translateZ(10px)' }}
                                >
                                    <feature.icon className={`w-6 h-6 ${feature.iconColor} transition-all duration-300`} />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/95 transition-colors"
                                    style={{ transform: 'translateZ(5px)' }}
                                >
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                                    {feature.description}
                                </p>

                                {/* Bottom glow line */}
                                <div className="mt-4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </Tilt3DCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
