import kaboom from "kaboom"
import "kaboom/global"

// initialize context
kaboom()

setGravity(2000)
setBackground(141, 183, 255)

loadSprite("block", 'sprites/block.jpg')
loadSprite('cat', 'sprites/cat.png')
loadSprite('portail', 'sprites/portail.png')

let clickedOnBlock = false;
const SPEED = 320
let lvl = 1

const player = add([
  sprite("cat"),
  pos(80, 40),
  area(),
  scale(0.16),
  body(),
  "player"
])

player.onCollide('portail', (portail) => {
  add([
    text("You Win!"),
    pos(width() / 2, height() / 2),
    scale(0.5),
    color(0, 0, 255),
  ])
  lvl += 1;
  switch(lvl) {
      case 1: lvl1(); break;
      case 2: lvl2(); break;
  }
})

onKeyPress("z", () => {
  // .isGrounded() is provided by body()
  if (player.isGrounded()) {
    // .jump() is provided by body()
    player.jump()
  }
})

// onKeyDown() registers an event that runs every frame as long as user is holding a certain key
onKeyDown("q", () => {
  // .move() is provided by pos() component, move by pixels per second
  player.move(-SPEED, 0)
  player.flipX = true
})

onKeyDown("d", () => {
  player.move(SPEED, 0)
  player.flipX = false
})

// Constrain the player within the screen boundaries
player.onUpdate(() => {
  // Get the player's position
  const pos = player.pos

  // Screen boundaries
  const leftBoundary = 0
  const rightBoundary = width()-98
  const topBoundary = -10
  const bottomBoundary = 510
  // Constrain the player's position within the boundaries
  if (pos.x < leftBoundary) {
    player.pos.x = leftBoundary
  }
  if (pos.x > rightBoundary) {
    player.pos.x = rightBoundary
  }
  if (pos.y < topBoundary) {
    player.pos.y = topBoundary
  }
  if (pos.y > bottomBoundary) {
    player.pos.y = bottomBoundary
  }
})

const portail = add([
sprite('portail'),
pos(width() - 125, 50),
scale(0.27),
area(),
'portail'
])

// Function to create a block
function createBlock(x, y) {
  const block = add([
    sprite("block"),
    pos(x, y),
    area(),
    scale(0.2),
    body({ isStatic: true }),
    "block" // Tag to identify the block
  ])

  // Add click event to the block
  block.onClick(() => {
    destroy(block)
    clickedOnBlock = true
  })
}

function destroyAllBlock() {
  const blocks = get("block")
  for (let i = 0; i < blocks.length; i++){
    destroy(blocks[i])
  }
}

  onClick(() => {
    const mousePosition = mousePos()

    if (!clickedOnBlock && mousePosition.y >= 50) {
      const offsetX = 5;  // Add a slight offset to avoid immediate destruction
      const offsetY = 5;  // Add a slight offset to avoid immediate destruction
      createBlock(mousePosition.x + offsetX, mousePosition.y + offsetY)
    }

    // Reset the flag for the next click
    clickedOnBlock = false;
  })

const lvl1 = () => {
 
  add([
  rect(width(), 48),
  pos(0, height() - 48),
  outline(4),
  area(),
  body({ isStatic: true }),
  color(255, 255, 255),
  ])

}


const lvl2 = () => {
  destroyAllBlock();
  player.pos = vec2(80, 40)
  
  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    body({ isStatic: true }),
    color(0, 0, 0),
    ])
}

lvl1();

  






