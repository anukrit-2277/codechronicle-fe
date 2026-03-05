export default function FloatingBadges() {
    return (
        <>
            {/* Kiro — bottom-left */}
            <a
                href="https://kiro.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 left-5 z-[999] flex items-center gap-3 px-4 py-3 rounded-2xl no-underline group cursor-pointer"
                style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 6px 30px rgba(0,0,0,0.35)',
                    transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(34,211,238,0.08)'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(0,0,0,0.35)'
                }}
            >
                <img src="/kiro-logo.avif" alt="Kiro" style={{ height: 26, width: 'auto' }} />
                <span style={{ fontSize: 14, fontWeight: 500, color: '#e5e7eb' }}>Made with Kiro</span>
            </a>

            {/* AWS — bottom-right */}
            <a
                href="https://aws.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 right-5 z-[999] flex items-center gap-3 px-4 py-3 rounded-2xl no-underline group cursor-pointer"
                style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 6px 30px rgba(0,0,0,0.35)',
                    transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255,153,0,0.08)'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(0,0,0,0.35)'
                }}
            >
                <img src="/aws-logo.webp" alt="AWS" style={{ height: 26, width: 'auto' }} />
                <span style={{ fontSize: 14, fontWeight: 500, color: '#e5e7eb' }}>Powered by AWS</span>
            </a>
        </>
    )
}
