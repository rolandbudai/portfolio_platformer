const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const body = document.body

//get body background color
const bgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');

//get size of the body
const cHeight = document.body.scrollHeight
const cWidth = document.body.scrollWidth

//body size to canvas size
canvas.width = cWidth
canvas.height = cHeight

//arrow keys default values
const keys = {
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}
//changing gravity, move speed
const gravity = 0.5
const moveSpeed = 2

/////////PLAYER object/////////
class Player {
    constructor(position) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.height = 100
        this.width = 100
        this.hitFloor = false
        this.image = new Image()
        this.image.src = 'ninja/Run_000.png'
    }

//draw it to the canvas
    draw() {
       //c.fillStyle = 'red'
       //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        if (!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

//continous updating and moving it    
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        //add gravity - falling
        if(this.position.y + this.height + this.velocity.y < cHeight) 
        this.velocity.y += gravity
        else this.velocity.y = 0   
    }
}

//construct new Player element with start coordinates
const player = new Player({
    x: 10,
    y: -150
})

//animating the player
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = bgColor
    c.fillRect(0, 0, cWidth, cHeight)
    player.update()

    player.velocity.x = 0
    
    //horizontal moving
    if (keys.ArrowRight.pressed && player.position.x < cWidth-player.width) player.velocity.x = moveSpeed
    else if (keys.ArrowLeft.pressed && player.position.x > 0) player.velocity.x = moveSpeed * -1
        
    //crouch
    // if (keys.ArrowDown.pressed) player.height = 25
    //else player.height = 50

    //shake when player hits floor
    if(player.position.y > cHeight - player.height-20) player.hitFloor = true
    else player.hitFloor = false

    if(player.hitFloor) body.style = "animation: shake 0.3s;  overflow: hidden;" 
    else body.style = ("animation: none; overflow: hidden;")
}

animate()

//listening to button events
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight': keys.ArrowRight.pressed = true
        break
        case 'ArrowLeft': keys.ArrowLeft.pressed = true  
        break
        case 'ArrowDown': keys.ArrowDown.pressed = true
        break
        //jump
        case 'ArrowUp': player.velocity.y = -20
        break
        }
    })

    //keyup 
    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'ArrowRight': keys.ArrowRight.pressed = false
            break
            case 'ArrowLeft': keys.ArrowLeft.pressed = false
            break
            case 'ArrowDown': keys.ArrowDown.pressed = false
            break
            }
        })



