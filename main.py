def on_button_pressed_ab():
    control.reset()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_value(name, value):
    if name == "bleft":
        if bpaddleA.get(LedSpriteProperty.X) > 0:
            bpaddleA.change(LedSpriteProperty.X, -1)
            bpaddleB.change(LedSpriteProperty.X, -1)
    if name == "bright":
        if bpaddleA.get(LedSpriteProperty.X) < 3:
            bpaddleA.change(LedSpriteProperty.X, 1)
            bpaddleB.change(LedSpriteProperty.X, 1)
    if name == "tleft":
        if tpaddleA.get(LedSpriteProperty.X) > 0:
            tpaddleA.change(LedSpriteProperty.X, -1)
            tpaddleB.change(LedSpriteProperty.X, -1)
    if name == "tright":
        if tpaddleA.get(LedSpriteProperty.X) < 3:
            tpaddleA.change(LedSpriteProperty.X, 1)
            tpaddleB.change(LedSpriteProperty.X, 1)
radio.on_received_value(on_received_value)

tpaddleB: game.LedSprite = None
tpaddleA: game.LedSprite = None
bpaddleB: game.LedSprite = None
bpaddleA: game.LedSprite = None
radio.set_group(69)
bpaddleA = game.create_sprite(2, 4)
bpaddleB = game.create_sprite(3, 4)
ball = game.create_sprite(randint(0, 4), 1)
directionY = 1
directionX = randint(-1, 1)
tpaddleA = game.create_sprite(1, 0)
tpaddleB = game.create_sprite(2, 0)
basic.pause(500)

def on_forever():
    global directionY, directionX
    ball.change(LedSpriteProperty.X, directionX)
    ball.change(LedSpriteProperty.Y, directionY)
    if ball.is_touching(bpaddleA) or ball.is_touching(bpaddleB):
        ball.change(LedSpriteProperty.X, directionX * -1)
        ball.change(LedSpriteProperty.Y, -1)
        directionY = -1
        directionX = randint(-1, 1)
    else:
        if ball.get(LedSpriteProperty.Y) <= 0:
            directionY = 1
            directionX = randint(-1, 1)
        elif ball.get(LedSpriteProperty.Y) >= 4:
            ball.set(LedSpriteProperty.BLINK, 1)
            basic.show_leds("""
                # # # # #
                                . . # . .
                                . . # . .
                                . . # . .
                                . . # . .
            """)
            basic.pause(2000)
            game.game_over()
        if ball.get(LedSpriteProperty.X) <= 0:
            directionX = 1
        elif ball.get(LedSpriteProperty.X) >= 4:
            directionX = -1
        basic.pause(500)
    if ball.is_touching(tpaddleA) or ball.is_touching(tpaddleB):
        ball.change(LedSpriteProperty.X, directionX * -1)
        ball.change(LedSpriteProperty.Y, 1)
        directionY = 1
        directionX = randint(-1, 1)
    else:
        if ball.get(LedSpriteProperty.Y) <= 0:
            ball.set(LedSpriteProperty.BLINK, 1)
            basic.show_leds("""
                # # # # .
                                # . . . #
                                # # # # #
                                # . . . #
                                # # # # .
            """)
            basic.pause(2000)
            game.game_over()
basic.forever(on_forever)
