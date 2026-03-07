import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Menu, X, BookOpen, Layers, Cloud, Zap, Code2, Settings, Wrench, Rocket, Shield } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import FloatingBadges from '../components/FloatingBadges'

const sections = [
    { id: 'introduction', label: 'Introduction', icon: BookOpen, file: '/docs/introduction.md' },
    { id: 'architecture', label: 'Architecture', icon: Layers, file: '/docs/architecture.md' },
    { id: 'aws-services', label: 'AWS Services', icon: Cloud, file: '/docs/aws-services.md' },
    { id: 'features', label: 'Features', icon: Zap, file: '/docs/features.md' },
    { id: 'api-reference', label: 'API Reference', icon: Code2, file: '/docs/api-reference.md' },
    { id: 'configuration', label: 'Configuration', icon: Settings, file: '/docs/configuration.md' },
    { id: 'tech-stack', label: 'Tech Stack', icon: Wrench, file: '/docs/tech-stack.md' },
    { id: 'getting-started', label: 'Getting Started', icon: Rocket, file: '/docs/getting-started.md' },
    { id: 'security', label: 'Security & Resilience', icon: Shield, file: '/docs/security.md' },
]

export default function Docs() {
    const [contents, setContents] = useState({})
    const [activeSection, setActiveSection] = useState('introduction')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const sectionRefs = useRef({})

    // Fetch all markdown files
    useEffect(() => {
        window.scrollTo(0, 0)
        Promise.all(
            sections.map(s =>
                fetch(s.file)
                    .then(r => r.text())
                    .then(text => ({ id: s.id, text }))
            )
        ).then(results => {
            const map = {}
            results.forEach(r => (map[r.id] = r.text))
            setContents(map)
            setLoading(false)
        })
    }, [])

    // Scroll-spy: track which section is visible
    useEffect(() => {
        if (loading) return
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
        )
        sections.forEach(s => {
            const el = sectionRefs.current[s.id]
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [loading])

    const scrollToSection = useCallback((id) => {
        const el = sectionRefs.current[id]
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 72
            window.scrollTo({ top, behavior: 'smooth' })
        }
        setActiveSection(id)
        setSidebarOpen(false)
    }, [])

    // Handle hash on mount
    useEffect(() => {
        if (loading) return
        const hash = window.location.hash.replace('#', '')
        if (hash && sectionRefs.current[hash]) {
            setTimeout(() => scrollToSection(hash), 100)
        }
    }, [loading, scrollToSection])

    return (
        <div className="min-h-screen bg-[#020617]">
            {/* Top bar */}
            <div className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="w-full px-4 sm:px-8 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Back to Home</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/logo1.png" alt="CodeChronicle" className="w-5 h-5 object-contain brightness-110" style={{ mixBlendMode: 'screen' }} />
                        <span className="text-sm font-semibold text-white/70">Documentation</span>
                    </div>
                </div>

            </div>

            <div className="max-w-[1400px] mx-auto flex">
                {/* Sidebar overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={`
                    fixed md:sticky top-14 z-40 h-[calc(100vh-3.5rem)]
                    w-[260px] shrink-0 overflow-y-auto
                    bg-[#020617] md:bg-transparent
                    border-r border-white/[0.06]
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    <nav className="p-4 space-y-1">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/25 px-3 mb-3">
                            Documentation
                        </p>
                        {sections.map(section => {
                            const Icon = section.icon
                            const isActive = activeSection === section.id
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`
                                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[0.8125rem]
                                        transition-all duration-200 cursor-pointer
                                        ${isActive
                                            ? 'bg-neon-cyan/[0.08] text-neon-cyan border border-neon-cyan/20'
                                            : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-transparent'
                                        }
                                    `}
                                >
                                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-neon-cyan' : 'text-white/25'}`} />
                                    {section.label}
                                </button>
                            )
                        })}
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-16 py-10 md:py-14">
                    {loading ? (
                        <div className="flex items-center justify-center py-32">
                            <div className="w-8 h-8 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="max-w-3xl">
                            {sections.map((section, i) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    ref={el => (sectionRefs.current[section.id] = el)}
                                    className={i > 0 ? 'mt-16 pt-16 border-t border-white/[0.04]' : ''}
                                >
                                    <article className="docs-prose">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeRaw]}
                                        >
                                            {contents[section.id] || ''}
                                        </ReactMarkdown>
                                    </article>
                                </section>
                            ))}

                            {/* Footer */}
                            <div className="mt-20 pt-10 border-t border-white/[0.05] text-center pb-16">
                                <p className="text-white/25 text-sm">
                                    Built with deterministic analysis and AI reasoning.
                                </p>
                                <p className="text-white/45 font-semibold mt-2 text-sm">
                                    CodeChronicle -Understand your code before you change it.
                                </p>
                                <a
                                    href="https://marketplace.visualstudio.com/items?itemName=AnujKamalJain.codechronicle"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 text-neon-cyan/60 hover:text-neon-cyan text-sm transition-colors"
                                >
                                    Install from VS Code Marketplace →
                                </a>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            <FloatingBadges />
        </div>
    )
}
