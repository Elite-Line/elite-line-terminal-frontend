// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
        }
    })
})

// Terminal typing animation
const terminalLines = [
    '[SYSTEM] Initializing network...',
    '[NETWORK] SIP trunk connected ✓',
    '[ROUTE] Optimal path selected ✓',
    '[CALL] Crystal clear audio ✓',
    '[STATUS] SYSTEM OPERATIONAL █'
]

const terminalBody = document.querySelector('.terminal-body')

function typeTerminal() {
    terminalBody.innerHTML = ''
    let lineIndex = 0

    function typeLine() {
        if (lineIndex >= terminalLines.length) {
            setTimeout(typeTerminal, 3000)
            return
        }

        const line = terminalLines[lineIndex]
        const p = document.createElement('p')
        terminalBody.appendChild(p)

        let charIndex = 0
        const typeChar = setInterval(() => {
            p.textContent += line[charIndex]
            charIndex++
            if (charIndex >= line.length) {
                clearInterval(typeChar)
                // Add green color to brackets
                p.innerHTML = p.textContent
                    .replace(/\[SYSTEM\]/g, '<span class="terminal-green">[SYSTEM]</span>')
                    .replace(/\[NETWORK\]/g, '<span class="terminal-green">[NETWORK]</span>')
                    .replace(/\[ROUTE\]/g, '<span class="terminal-green">[ROUTE]</span>')
                    .replace(/\[CALL\]/g, '<span class="terminal-green">[CALL]</span>')
                    .replace(/\[STATUS\]/g, '<span class="terminal-green">[STATUS]</span>')
                    .replace(/SYSTEM OPERATIONAL █/g, '<span class="blink">SYSTEM OPERATIONAL █</span>')
                lineIndex++
                setTimeout(typeLine, 300)
            }
        }, 30)
    }

    typeLine()
}

typeTerminal()

// Counter animation for stats
function animateCounter(element, target, suffix = '') {
    let current = 0
    const increment = target / 50
    const timer = setInterval(() => {
        current += increment
        if (current >= target) {
            current = target
            clearInterval(timer)
        }
        element.textContent = Math.floor(current) + suffix
    }, 30)
}

// Trigger counter when hero section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(document.querySelectorAll('.stat-number')[0], 99.9, '%')
            animateCounter(document.querySelectorAll('.stat-number')[1], 50, '+')
            animateCounter(document.querySelectorAll('.stat-number')[2], 24, '/7')
            observer.disconnect()
        }
    })
}, { threshold: 0.5 })

const heroStats = document.querySelector('.hero-stats')
if (heroStats) observer.observe(heroStats)

// Navbar active state on scroll
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav-links a')

window.addEventListener('scroll', () => {
    let current = ''
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id')
        }
    })

    navLinks.forEach(link => {
        link.style.color = '#aaa'
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#00ff88'
        }
    })
})

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar')
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)'
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)'
    }
})