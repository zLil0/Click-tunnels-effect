const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

class Particle {
    constructor(pos, radians) {
        this.pos = pos
        this.radians = radians
        this.radius = 5
        this.turnRate = radians
        this.ttl = 100
        this.opacity = 50
        this.hue = hue
        this.color = `hsl(${this.hue}, 100%, ${this.opacity}%)`
    }
    draw() {
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        c.fill()
        c.closePath
    }
    update() {
        this.opacity-=0.5
        this.hue = hue
        this.color = `hsl(${this.hue}, 100%, ${this.opacity}%)`
        this.draw()
        this.pos.x += Math.sin(this.radians) * 4
        this.pos.y += Math.cos(this.radians) * 4
        this.ttl--
        
    }
}

const particles = []
particlesCount = 100
let hue = 0
let hueRadians = 0
let mouse = {
    x: canvas.width/2,
    y: canvas.height/2
}
let mouseHolding = false
let ticker = 0

function genPulse() {
    ticker = 0
    for (let i = 0; i < particlesCount; i++) {
        const gapRadians = Math.PI * 2 / particlesCount
        particles.unshift(new Particle({ x: mouse.x, y: mouse.y }, gapRadians * i))
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.5)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    particles.forEach((particle, i) => {
        if(particle.ttl <=0){
            particles.splice(i, 1)
        }
        particle.update()
    })
    hue = Math.abs(Math.sin(hueRadians)*360)
    hueRadians+=0.004
    ticker++
    if(mouseHolding === true && ticker%20===0){
        genPulse()
    }
}
animate()
addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

addEventListener('mousemove', (event)=>{
    mouse.x = event.x,
    mouse.y = event.y
})

window.addEventListener('mousedown', (event) => {
    if(event.button == 0){
        genPulse()
        mouseHolding = true
    }
})
window.addEventListener('mouseup', (event) => {
    if(event.button == 0){
        mouseHolding = false
    }
})

