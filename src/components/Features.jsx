import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
}

export default function Features() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section ref={sectionRef} id="features" className="relative min-h-screen flex flex-col justify-center py-24 sm:py-32 scroll-mt-20 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-neon-purple/[0.04] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-blue/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className={`group glass-card rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02] ${feature.glowColor}`}
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-white/95 transition-colors">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                                {feature.description}
                            </p>

                            {/* Bottom line */}
                            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
