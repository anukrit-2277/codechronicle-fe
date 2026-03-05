import { Github, FileText, Scale, User } from 'lucide-react'

const links = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/anujkamaljain/CodeChronicle' },
    { icon: FileText, label: 'Documentation', href: '#' },
    { icon: Scale, label: 'MIT License', href: '#' },
    { icon: User, label: 'Author', href: '#' },
]

export default function Footer() {
    return (
        <footer className="relative border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img src="/logo1.png" alt="CodeChronicle" className="w-9 h-9 object-contain brightness-110" style={{ mixBlendMode: 'screen' }} />
                        <span className="text-lg font-semibold text-white/80">CodeChronicle</span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {links.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                            >
                                <link.icon className="w-4 h-4" />
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <p className="text-xs text-white/25">
                        © {new Date().getFullYear()} CodeChronicle. Built with ❤️ for developers.
                    </p>
                </div>
            </div>
        </footer>
    )
}
