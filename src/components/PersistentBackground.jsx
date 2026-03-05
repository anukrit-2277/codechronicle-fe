import { useEffect, useRef } from 'react'

export default function PersistentBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        let animationId
        let particles = []

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = document.documentElement.scrollHeight
        }

        const createParticles = () => {
            particles = []
            const count = Math.floor((canvas.width * canvas.height) / 25000)
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5 + 0.3,
                    speedX: (Math.random() - 0.5) * 0.15,
                    speedY: (Math.random() - 0.5) * 0.15,
                    opacity: Math.random() * 0.4 + 0.1,
                    color: ['#22d3ee', '#a78bfa', '#60a5fa'][Math.floor(Math.random() * 3)],
                })
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((p) => {
                p.x += p.speedX
                p.y += p.speedY

                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = p.color
                ctx.globalAlpha = p.opacity
                ctx.fill()
            })

            // Draw connecting lines between nearby particles
            ctx.globalAlpha = 0.03
            ctx.strokeStyle = '#22d3ee'
            ctx.lineWidth = 0.5
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 120) {
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }

            ctx.globalAlpha = 1
            animationId = requestAnimationFrame(animate)
        }

        resize()
        createParticles()
        animate()

        const resizeObserver = new ResizeObserver(() => {
            resize()
            createParticles()
        })
        resizeObserver.observe(document.documentElement)

        return () => {
            cancelAnimationFrame(animationId)
            resizeObserver.disconnect()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    )
}
