/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const screenshots = [
    {
        title: 'Dependency Graph Dashboard',
        description: 'Full interactive view of your project architecture with color-coded risk levels.',
        tab: 'Graph View',
    },
    {
        title: 'Blast Radius Analysis',
        description: 'See exactly which files will be affected when you change a specific module.',
        tab: 'Blast Radius',
    },
    {
        title: 'Natural Language Query Interface',
        description: 'Ask questions about your code and get instant, accurate answers.',
        tab: 'AI Query',
    },
    {
        title: 'Risk Assessment Dashboard',
        description: 'Monitor codebase health metrics, complexity scores, and risk distributions.',
        tab: 'Risk Dashboard',
    },
]

function deterministicUnit(index, seed = 1) {
    const x = Math.sin((index + 1) * (seed * 12.9898)) * 43758.5453
    return x - Math.floor(x)
}

function MockScreenshot({ screenshot, index, onTabClick }) {
    const colors = ['#22d3ee', '#a78bfa', '#60a5fa', '#22d3ee']
    const color = colors[index % colors.length]

    const ref = useRef(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { stiffness: 100, damping: 25 })
    const springY = useSpring(mouseY, { stiffness: 100, damping: 25 })
    const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5])
    const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5])

    const handleMouse = (e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    return (
        <div style={{ perspective: 1200 }}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="glass-card rounded-2xl overflow-hidden"
            >
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-white/30 font-mono ml-2">CodeChronicle -{screenshot.tab}</span>
                </div>

                {/* Content */}
                <div className="p-6 min-h-[300px] sm:min-h-[360px] bg-dark-900/60">
                    {/* Tab bar */}
                    <div className="flex gap-2 mb-6">
                        {screenshots.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => onTabClick(i)}
                                className={`relative px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer
                    ${i === index
                                        ? 'text-neon-cyan border border-neon-cyan/20'
                                        : 'text-white/30 hover:text-white/50'
                                    }`}
                            >
                                {i === index && (
                                    <motion.div
                                        layoutId="activeScreenshotTab"
                                        className="absolute inset-0 bg-neon-cyan/10 rounded-lg"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{s.tab}</span>
                            </button>
                        ))}
                    </div>

                    {/* Mock content */}
                    {index === 0 && (
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <svg className="w-full" viewBox="0 0 400 200" style={{ maxHeight: 220 }}>
                                        <line x1="200" y1="30" x2="100" y2="80" stroke={color} strokeWidth="1" opacity="0.3" />
                                        <line x1="200" y1="30" x2="300" y2="80" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
                                        <line x1="100" y1="80" x2="60" y2="150" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
                                        <line x1="100" y1="80" x2="140" y2="150" stroke={color} strokeWidth="1" opacity="0.3" />
                                        <line x1="300" y1="80" x2="260" y2="150" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
                                        <line x1="300" y1="80" x2="340" y2="150" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
                                        <circle cx="200" cy="30" r="8" fill={color} opacity="0.9"><animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" /></circle>
                                        <circle cx="100" cy="80" r="6" fill="#a78bfa" opacity="0.7" />
                                        <circle cx="300" cy="80" r="6" fill="#60a5fa" opacity="0.7" />
                                        <circle cx="60" cy="150" r="5" fill={color} opacity="0.5" />
                                        <circle cx="140" cy="150" r="5" fill="#a78bfa" opacity="0.5" />
                                        <circle cx="260" cy="150" r="5" fill="#60a5fa" opacity="0.5" />
                                        <circle cx="340" cy="150" r="5" fill={color} opacity="0.5" />
                                    </svg>
                                </div>
                                <div className="hidden sm:block w-32 space-y-2">
                                    <div className="text-[10px] font-mono text-white/30 mb-2">MODULES</div>
                                    {['core/', 'auth/', 'api/', 'ui/'].map((f, i) => (
                                        <div key={i} className="px-2 py-1.5 rounded bg-white/[0.03] text-[10px] font-mono text-white/40 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors[i] }} />
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {index === 1 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-mono text-white/40">Analyzing:</span>
                                <span className="text-xs font-mono text-neon-cyan">auth/login.ts</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="glass-card rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold text-red-400 mb-1">12</div>
                                    <div className="text-[10px] text-white/40 font-mono">Direct Deps</div>
                                </div>
                                <div className="glass-card rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold text-yellow-400 mb-1">28</div>
                                    <div className="text-[10px] text-white/40 font-mono">Indirect</div>
                                </div>
                                <div className="glass-card rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold text-neon-cyan mb-1">High</div>
                                    <div className="text-[10px] text-white/40 font-mono">Risk Level</div>
                                </div>
                            </div>
                            <div className="space-y-2 mt-4">
                                {['UserService.ts', 'SessionManager.ts', 'TokenValidator.ts', 'AuthMiddleware.ts'].map((f, i) => (
                                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.02]">
                                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-400' : i === 1 ? 'bg-yellow-400' : 'bg-green-400'}`} />
                                        <span className="text-xs font-mono text-white/50">{f}</span>
                                        <span className="text-[10px] text-white/30 ml-auto">{['Critical', 'Warning', 'Safe', 'Safe'][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {index === 2 && (
                        <div className="space-y-4">
                            <div className="glass-card rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center">
                                        <span className="text-[10px]">🤖</span>
                                    </div>
                                    <span className="text-xs font-mono text-white/50">CodeChronicle AI</span>
                                </div>
                                <div className="text-sm text-white/60 font-mono mb-4">
                                    &gt; What files handle user authentication?
                                </div>
                                <div className="bg-dark-900/80 rounded-lg p-3 text-xs font-mono text-white/50 space-y-2">
                                    <p className="text-neon-cyan/80">Found 4 files related to authentication:</p>
                                    <p>1. <span className="text-white/70">auth/login.ts</span> -Main login handler</p>
                                    <p>2. <span className="text-white/70">auth/session.ts</span> -Session management</p>
                                    <p>3. <span className="text-white/70">middleware/auth.ts</span> -Auth middleware</p>
                                    <p>4. <span className="text-white/70">utils/token.ts</span> -JWT utilities</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {index === 3 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                {[
                                    { label: 'Health', value: '87%', color: 'text-green-400' },
                                    { label: 'Complexity', value: 'Med', color: 'text-yellow-400' },
                                    { label: 'Risk Files', value: '12', color: 'text-red-400' },
                                    { label: 'Coverage', value: '72%', color: 'text-neon-cyan' },
                                ].map((stat, i) => (
                                    <div key={i} className="glass-card rounded-lg p-3 text-center">
                                        <div className={`text-lg font-bold ${stat.color} mb-0.5`}>{stat.value}</div>
                                        <div className="text-[10px] text-white/40 font-mono">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-24 flex items-end gap-1">
                                {Array.from({ length: 20 }).map((_, i) => {
                                    const h = 20 + Math.sin(i * 0.5) * 30 + deterministicUnit(i, index + 3) * 30
                                    return (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-t"
                                            style={{
                                                height: `${h}%`,
                                                background: `linear-gradient(to top, ${colors[i % 4]}33, ${colors[i % 4]}11)`,
                                            }}
                                        />
                                    )
                                })}
                            </div>
                            <div className="text-[10px] font-mono text-white/30 text-center">Complexity trend -last 30 days</div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default function Screenshots() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(0)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const prev = () => {
        setDirection(-1)
        setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1))
    }
    const next = () => {
        setDirection(1)
        setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1))
    }

    const slideVariants = {
        enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.96, rotateY: d > 0 ? 5 : -5 }),
        center: { opacity: 1, x: 0, scale: 1, rotateY: 0 },
        exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 0.96, rotateY: d > 0 ? -5 : 5 }),
    }

    return (
        <section ref={sectionRef} id="screenshots" className="relative min-h-[auto] sm:min-h-screen flex flex-col justify-center py-12 sm:py-10 scroll-mt-20 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-blue/[0.05] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-neon-cyan/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Inside Your Editor</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        Powerful insights without leaving VS Code -graphs, blast radius, AI queries, and risk dashboards.
                    </p>
                </motion.div>

                {/* Carousel with 3D perspective transitions */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                    style={{ perspective: 1500 }}
                >
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <MockScreenshot screenshot={screenshots[current]} index={current} onTabClick={(i) => { setDirection(i > current ? 1 : -1); setCurrent(i) }} />
                        </motion.div>
                    </AnimatePresence>

                    {/* Caption */}
                    <motion.div
                        className="text-center mt-4"
                        key={`caption-${current}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-semibold text-white mb-1">{screenshots[current].title}</h3>
                        <p className="text-sm text-white/40">{screenshots[current].description}</p>
                    </motion.div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <motion.button
                            onClick={prev}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all hover:bg-white/[0.03]"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>

                        <div className="flex gap-2">
                            {screenshots.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                                    className="relative h-2 rounded-full transition-all"
                                    style={{ width: i === current ? 24 : 8 }}
                                >
                                    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${i === current ? 'bg-neon-cyan' : 'bg-white/20 hover:bg-white/40'}`} />
                                    {i === current && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute inset-0 rounded-full bg-neon-cyan"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <motion.button
                            onClick={next}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all hover:bg-white/[0.03]"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
