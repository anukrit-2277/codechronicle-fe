import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const graphNodes = [
    { id: 'app', label: 'App.tsx', x: 50, y: 15, risk: 'High', deps: 8, color: '#22d3ee', size: 18 },
    { id: 'router', label: 'Router.tsx', x: 25, y: 35, risk: 'Medium', deps: 5, color: '#a78bfa', size: 14 },
    { id: 'store', label: 'Store.ts', x: 75, y: 35, risk: 'High', deps: 6, color: '#60a5fa', size: 14 },
    { id: 'home', label: 'Home.tsx', x: 12, y: 58, risk: 'Low', deps: 2, color: '#22d3ee', size: 10 },
    { id: 'auth', label: 'Auth.tsx', x: 35, y: 58, risk: 'Medium', deps: 4, color: '#a78bfa', size: 12 },
    { id: 'api', label: 'api.ts', x: 62, y: 58, risk: 'Low', deps: 3, color: '#60a5fa', size: 10 },
    { id: 'utils', label: 'utils.ts', x: 88, y: 58, risk: 'Low', deps: 1, color: '#22d3ee', size: 9 },
    { id: 'dashboard', label: 'Dashboard.tsx', x: 20, y: 80, risk: 'Medium', deps: 4, color: '#a78bfa', size: 11 },
    { id: 'settings', label: 'Settings.tsx', x: 48, y: 80, risk: 'Low', deps: 2, color: '#60a5fa', size: 9 },
    { id: 'hooks', label: 'hooks.ts', x: 78, y: 80, risk: 'Low', deps: 1, color: '#22d3ee', size: 8 },
]

const graphEdges = [
    ['app', 'router'], ['app', 'store'],
    ['router', 'home'], ['router', 'auth'], ['router', 'dashboard'],
    ['store', 'api'], ['store', 'utils'],
    ['auth', 'api'],
    ['dashboard', 'settings'], ['dashboard', 'hooks'],
    ['api', 'hooks'],
    ['settings', 'utils'],
]

export default function GraphDemo() {
    const [hoveredNode, setHoveredNode] = useState(null)
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const getNodeById = (id) => graphNodes.find((n) => n.id === id)

    return (
        <section ref={sectionRef} id="graph-demo" className="relative min-h-screen flex flex-col justify-center pt-4 pb-12 scroll-mt-28 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/[0.04] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neon-purple/[0.04] rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Interactive Architecture</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        See your entire architecture instantly.
                    </p>
                </motion.div>

                {/* Graph Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative"
                    style={{ perspective: 1200 }}
                >
                    <div className="glass-card rounded-2xl overflow-hidden glow-cyan p-2" style={{ animation: 'glow-breathe-cyan 4s ease-in-out infinite' }}>
                        {/* Title bar */}
                        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 mb-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-xs text-white/30 font-mono ml-2">codechronicle -graph explorer</span>
                        </div>

                        <div className="relative bg-dark-900/60 rounded-xl" style={{ height: 'min(500px, 50vh)' }}>
                            <svg className="w-full h-full" viewBox="0 0 100 95">
                                {/* Edges */}
                                {graphEdges.map(([from, to], i) => {
                                    const a = getNodeById(from)
                                    const b = getNodeById(to)
                                    const isHighlighted = hoveredNode === from || hoveredNode === to
                                    return (
                                        <line
                                            key={i}
                                            x1={a.x}
                                            y1={a.y}
                                            x2={b.x}
                                            y2={b.y}
                                            stroke={isHighlighted ? '#22d3ee' : '#334155'}
                                            strokeWidth={isHighlighted ? 0.4 : 0.15}
                                            opacity={isHighlighted ? 0.8 : 0.4}
                                            style={{ transition: 'all 0.3s ease' }}
                                        />
                                    )
                                })}

                                {/* Nodes */}
                                {graphNodes.map((node) => {
                                    const isHovered = hoveredNode === node.id
                                    const isConnected = graphEdges.some(
                                        ([a, b]) => (a === hoveredNode && b === node.id) || (b === hoveredNode && a === node.id)
                                    )
                                    const r = (node.size / 18) * 2.5
                                    return (
                                        <g key={node.id}>
                                            {/* Glow */}
                                            {(isHovered || isConnected) && (
                                                <circle
                                                    cx={node.x}
                                                    cy={node.y}
                                                    r={r * 2.5}
                                                    fill={node.color}
                                                    opacity={0.1}
                                                />
                                            )}
                                            <circle
                                                cx={node.x}
                                                cy={node.y}
                                                r={isHovered ? r * 1.4 : r}
                                                fill={node.color}
                                                opacity={isHovered ? 1 : isConnected ? 0.8 : 0.6}
                                                style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                                onMouseEnter={(e) => {
                                                    setHoveredNode(node.id)
                                                    const rect = e.currentTarget.closest('svg').getBoundingClientRect()
                                                    setTooltipPos({
                                                        x: (node.x / 100) * rect.width + rect.left,
                                                        y: (node.y / 95) * rect.height + rect.top - 10,
                                                    })
                                                }}
                                                onMouseLeave={() => setHoveredNode(null)}
                                            />
                                            <text
                                                x={node.x}
                                                y={node.y + r + 3}
                                                textAnchor="middle"
                                                fill="white"
                                                fontSize="2"
                                                fontFamily="JetBrains Mono, monospace"
                                                opacity={isHovered || isConnected ? 0.9 : 0.4}
                                                style={{ transition: 'opacity 0.3s ease', pointerEvents: 'none' }}
                                            >
                                                {node.label}
                                            </text>
                                        </g>
                                    )
                                })}
                            </svg>

                            {/* Tooltip */}
                            {hoveredNode && (() => {
                                const node = getNodeById(hoveredNode)
                                return (
                                    <div
                                        className="fixed z-50 glass-card rounded-lg px-4 py-3 pointer-events-none"
                                        style={{
                                            left: tooltipPos.x,
                                            top: tooltipPos.y,
                                            transform: 'translate(-50%, -100%)',
                                        }}
                                    >
                                        <p className="text-sm font-mono text-white font-medium">{node.label}</p>
                                        <div className="flex gap-4 mt-1.5 text-xs">
                                            <span>
                                                Risk:{' '}
                                                <span
                                                    className={
                                                        node.risk === 'High'
                                                            ? 'text-red-400'
                                                            : node.risk === 'Medium'
                                                                ? 'text-yellow-400'
                                                                : 'text-green-400'
                                                    }
                                                >
                                                    {node.risk}
                                                </span>
                                            </span>
                                            <span className="text-white/50">{node.deps} deps</span>
                                        </div>
                                    </div>
                                )
                            })()}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
