radio.onReceivedValue(function (name, value) {
    if (name == "left") {
        if (paddleA.get(LedSpriteProperty.X) > 0) {
            paddleA.change(LedSpriteProperty.X, -1)
            paddleB.change(LedSpriteProperty.X, -1)
        }
    }
    if (name == "right") {
        if (paddleA.get(LedSpriteProperty.X) < 3) {
            paddleA.change(LedSpriteProperty.X, 1)
            paddleB.change(LedSpriteProperty.X, 1)
        }
    }
})
let paddleB: game.LedSprite = null
let paddleA: game.LedSprite = null
radio.setGroup(69)
paddleA = game.createSprite(2, 4)
paddleB = game.createSprite(3, 4)
let ball = game.createSprite(randint(0, 4), 0)
let directionY = 1
let directionX = randint(-1, 1)
basic.pause(500)
basic.forever(function () {
    ball.change(LedSpriteProperty.X, directionX)
    ball.change(LedSpriteProperty.Y, directionY)
    if (ball.isTouching(paddleA) || ball.isTouching(paddleB)) {
        ball.change(LedSpriteProperty.X, directionX * -1)
        ball.change(LedSpriteProperty.Y, -1)
        directionY = -1
        directionX = randint(-1, 1)
    } else {
        if (ball.get(LedSpriteProperty.Y) <= 0) {
            directionY = 1
            directionX = randint(-1, 1)
        } else if (ball.get(LedSpriteProperty.Y) >= 4) {
            ball.set(LedSpriteProperty.Blink, 1)
            basic.pause(2000)
            game.gameOver()
        }
        if (ball.get(LedSpriteProperty.X) <= 0) {
            directionX = 1
        } else if (ball.get(LedSpriteProperty.X) >= 4) {
            directionX = -1
        }
        basic.pause(500)
    }
})
