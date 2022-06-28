input.onButtonPressed(Button.AB, function () {
    control.reset()
})
radio.onReceivedValue(function (name, value) {
    if (name == "bleft") {
        if (bpaddleA.get(LedSpriteProperty.X) > 0) {
            bpaddleA.change(LedSpriteProperty.X, -1)
            bpaddleB.change(LedSpriteProperty.X, -1)
        }
    }
    if (name == "bright") {
        if (bpaddleA.get(LedSpriteProperty.X) < 3) {
            bpaddleA.change(LedSpriteProperty.X, 1)
            bpaddleB.change(LedSpriteProperty.X, 1)
        }
    }
    if (name == "tleft") {
        if (tpaddleA.get(LedSpriteProperty.X) > 0) {
            tpaddleA.change(LedSpriteProperty.X, -1)
            tpaddleB.change(LedSpriteProperty.X, -1)
        }
    }
    if (name == "tright") {
        if (tpaddleA.get(LedSpriteProperty.X) < 3) {
            tpaddleA.change(LedSpriteProperty.X, 1)
            tpaddleB.change(LedSpriteProperty.X, 1)
        }
    }
})
let tpaddleB: game.LedSprite = null
let tpaddleA: game.LedSprite = null
let bpaddleB: game.LedSprite = null
let bpaddleA: game.LedSprite = null
radio.setGroup(69)
bpaddleA = game.createSprite(2, 4)
bpaddleB = game.createSprite(3, 4)
let ball = game.createSprite(randint(0, 4), 1)
let directionY = 1
let directionX = randint(-1, 1)
tpaddleA = game.createSprite(1, 0)
tpaddleB = game.createSprite(2, 0)
basic.pause(500)
basic.forever(function () {
    ball.change(LedSpriteProperty.X, directionX)
    ball.change(LedSpriteProperty.Y, directionY)
    if (ball.isTouching(bpaddleA) || ball.isTouching(bpaddleB)) {
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
            basic.showLeds(`
                # # # # #
                . . # . .
                . . # . .
                . . # . .
                . . # . .
                `)
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
    if (ball.isTouching(tpaddleA) || ball.isTouching(tpaddleB)) {
        ball.change(LedSpriteProperty.X, directionX * -1)
        ball.change(LedSpriteProperty.Y, 1)
        directionY = 1
        directionX = randint(-1, 1)
    } else if (ball.get(LedSpriteProperty.Y) <= 0) {
        ball.set(LedSpriteProperty.Blink, 1)
        basic.showLeds(`
            # # # # .
            # . . . #
            # # # # #
            # . . . #
            # # # # .
            `)
        basic.pause(2000)
        game.gameOver()
    }
})
