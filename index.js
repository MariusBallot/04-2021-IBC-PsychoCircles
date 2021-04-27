const canvas = document.querySelector('.can')
const ctx = canvas.getContext('2d')
const gui = new dat.GUI()

let cW = window.innerWidth;
let cH = window.innerHeight;

ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight

const params = {
    circNum: 100,
    colOffset: 10,
    speed: 0.005,
    itOffset: 0.2,
    animIntensity: 50,
}

gui.add(params, "circNum", 1, 500).name("Circle Number").onChange(hydrateCircles)
gui.add(params, "colOffset", 0.01, 30).step(0.001).name("Color Offset").onChange(hydrateCircles)
gui.add(params, "speed", 0.001, 0.05).name("Animation Speed")
gui.add(params, "itOffset", 0, 1).name("Circle Iteration Offset")
gui.add(params, "animIntensity", 0, 200).name("Animation Intensity")

let cirlces = []

function hydrateCircles() {
    cirlces = []
    for (let i = 1; i <= params.circNum; i++) {
        const c = {
            pos: [0, 0],
            radius: ((Math.sqrt(cW * cW + cH * cH) / 2) / params.circNum) * (params.circNum - i + 1),
            col: 'hsl(' + i * params.colOffset + ',100%,50%)'
        }
        cirlces.push(c)
        console.log(c.radius)
    }

}

function update() {
    ctx.clearRect(0, 0, cW, cH)

    let i = 0;
    while (i < cirlces.length) {
        const c = cirlces[i]
        ctx.save();
        const x = Math.sin(Date.now() * params.speed + i * params.itOffset) * params.animIntensity
        const y = Math.cos(Date.now() * params.speed + i * params.itOffset) * params.animIntensity
        ctx.translate(cW / 2 + x, cH / 2 + y)
        ctx.beginPath()
        ctx.arc(c.pos[0], c.pos[1], c.radius, 0, Math.PI * 2)
        ctx.fillStyle = c.col
        ctx.fill()
        ctx.closePath()
        ctx.restore();
        i++
    }
    requestAnimationFrame(update)
}

function resize() {
    cW = window.innerWidth;
    cH = window.innerHeight;
    ctx.canvas.width = cW
    ctx.canvas.height = cH
}

hydrateCircles()
update()
window.addEventListener('resize', resize)

console.log(ctx)