import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const links = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/anujkamaljain/CodeChronicle', external: true },
    { icon: FileText, label: 'Documentation', to: '/docs', external: false },
]

export default function Footer() {
    const footerRef = useRef(null)
    const isInView = useInView(footerRef, { once: true, margin: '-50px' })

    return (
        <footer ref={footerRef} className="relative">
            {/* Animated gradient border */}
            <div className="glow-divider" />
            <div className="border-t border-white/5" />

            <div className="max-w-6xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-8"
                >
                    {/* Logo */}
                    <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                        <img src="/logo1.png" alt="CodeChronicle" className="w-9 h-9 object-contain brightness-110" style={{ mixBlendMode: 'screen' }} />
                        <span className="text-lg font-semibold text-white/80">CodeChronicle</span>
                    </motion.div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {links.map((link, i) =>
                            link.external ? (
                                <motion.a
                                    key={i}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                                    whileHover={{ y: -2 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.label}
                                </motion.a>
                            ) : (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -2 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    <Link
                                        to={link.to}
                                        className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                                    >
                                        <link.icon className="w-4 h-4" />
                                        {link.label}
                                    </Link>
                                </motion.div>
                            )
                        )}
                    </div>
                </motion.div>

                {/* Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-8 pt-8 border-t border-white/5 text-center"
                >
                    <p className="text-xs text-white/25">
                        © {new Date().getFullYear()} CodeChronicle. Built for developers.
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}
