import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
    { label: 'Architecture', href: '#graph-demo' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Preview', href: '#screenshots' },
    { label: 'Docs', href: '/docs', isRoute: true },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            const sections = navLinks.map(l => l.href.replace('#', ''))
            let current = ''
            for (const id of sections) {
                const el = document.getElementById(id)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= 200) current = id
                }
            }
            setActiveSection(current)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleClick = (e, link) => {
        e.preventDefault()
        setMobileOpen(false)
        if (link.isRoute) {
            window.location.href = link.href
            return
        }
        const el = document.querySelector(link.href)
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 96
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between h-24">
                        {/* Logo with hover effect */}
                        <motion.a
                            href="#hero"
                            onClick={(e) => handleClick(e, { href: '#hero' })}
                            className="flex items-center gap-2.5 group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            <motion.img
                                src="/logo2.png"
                                alt="CodeChronicle"
                                className="w-11 h-11 object-contain"
                                style={{ mixBlendMode: 'screen' }}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                            />
                            <span className="text-base font-semibold text-white/90 group-hover:text-white transition-colors tracking-tight">
                                CodeChronicle
                            </span>
                        </motion.a>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-0.5">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.replace('#', '')
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleClick(e, link)}
                                        className={`relative px-2.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                            ? 'text-neon-cyan'
                                            : 'text-white/50 hover:text-white/80'
                                            }`}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 bg-neon-cyan/[0.08] rounded-lg border border-neon-cyan/20"
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                    </a>
                                )
                            })}
                        </div>

                        {/* Install CTA */}
                        <div className="hidden md:block">
                            <motion.a
                                href="vscode:extension/AnujKamalJain.codechronicle"
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium relative overflow-hidden
                                    bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-900
                                    hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]
                                    transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                Install
                            </motion.a>
                        </div>

                        {/* Mobile hamburger */}
                        <motion.button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                {mobileOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, y: 0, backdropFilter: 'blur(20px)' }}
                        exit={{ opacity: 0, y: -20, backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="fixed inset-x-0 top-24 z-40 bg-[#020617]/95 border-b border-white/[0.06] md:hidden"
                    >
                        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
                            {navLinks.map((link, i) => {
                                const isActive = activeSection === link.href.replace('#', '')
                                return (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleClick(e, link)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                            ? 'text-neon-cyan bg-neon-cyan/[0.08] border border-neon-cyan/20'
                                            : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'
                                            }`}
                                    >
                                        {link.label}
                                    </motion.a>
                                )
                            })}
                            <motion.a
                                href="vscode:extension/AnujKamalJain.codechronicle"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                                className="mt-2 text-center px-4 py-3 rounded-lg text-sm font-medium
                                    bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-900"
                            >
                                Install Extension
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
