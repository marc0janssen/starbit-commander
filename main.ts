function checkPositionSpaceship () {
    for (let astroid of astroids) {
        if (spaceship.get(LedSpriteProperty.X) == astroid.get(LedSpriteProperty.X) && spaceship.get(LedSpriteProperty.Y) == astroid.get(LedSpriteProperty.Y)) {
            if (astroid.get(LedSpriteProperty.Blink) == astroidBlinking && spaceship.get(LedSpriteProperty.Blink) == spaceshipBlinking) {
                game.addScore(20 * astroids.length)
                music.playTone(880, music.beat(BeatFraction.Whole))
                while (astroids.length != 0) {
                    astroids.removeAt(0).delete()
                }
                spaceship.set(LedSpriteProperty.Blink, spaceshipNormal)
                timer = 1000
            } else if (astroid.get(LedSpriteProperty.Blink) == astroidBlinking && spaceship.get(LedSpriteProperty.Blink) != spaceshipBlinking) {
                music.playTone(622, music.beat(BeatFraction.Whole))
                astroids.removeAt(astroids.indexOf(astroid)).delete()
                spaceship.set(LedSpriteProperty.Blink, spaceshipBlinking)
            } else if (astroid.get(LedSpriteProperty.Blink) != astroidBlinking && spaceship.get(LedSpriteProperty.Blink) == spaceshipBlinking) {
                spaceship.set(LedSpriteProperty.Blink, spaceshipNormal)
                game.addScore(5)
            } else {
                isCrashed = 1
                spaceship.set(LedSpriteProperty.Blink, spaceshipCrash)
                game.addScore(ticks)
                music.playMelody("C D E C D C F E ", 120)
                game.gameOver()
            }
        }
    }
}
input.onButtonPressed(Button.A, function () {
    spaceship.change(LedSpriteProperty.X, -1)
    checkPositionSpaceship()
})
input.onButtonPressed(Button.B, function () {
    spaceship.change(LedSpriteProperty.X, 1)
    checkPositionSpaceship()
})
let astroidPosX = 0
let astroidsEveryPosX: number[] = []
let astroidsPerRow = 0
let astriodInterval = 0
let timer = 0
let ticks = 0
let isCrashed = 0
let spaceshipCrash = 0
let spaceshipNormal = 0
let spaceshipBlinking = 0
let astroidBlinking = 0
let astroids: game.LedSprite[] = []
let spaceship: game.LedSprite = null
spaceship = game.createSprite(2, 5)
astroids = []
astroidBlinking = 300
spaceshipBlinking = 600
spaceshipNormal = 0
spaceshipCrash = 80
isCrashed = 0
ticks = 0
timer = 1000
spaceship.set(LedSpriteProperty.Brightness, 255)
spaceship.set(LedSpriteProperty.Blink, 0)
game.setScore(0)
music.playMelody("A F E F D G E F ", 120)
basic.forever(function () {
    if (isCrashed == 0) {
        while (astroids.length > 0 && astroids[0].get(LedSpriteProperty.Y) == 4) {
            astroids.removeAt(0).delete()
        }
        for (let astroid2 of astroids) {
            astroid2.change(LedSpriteProperty.Y, 1)
        }
        astriodInterval = randint(1, 2)
        if (ticks % astriodInterval == 0) {
            astroidsPerRow = randint(0, 3)
            astroidsEveryPosX = []
            for (let index = 0; index < astroidsPerRow; index++) {
                astroidPosX = randint(0, 4)
                if (astroidsEveryPosX.indexOf(astroidPosX) == -1) {
                    astroids.push(game.createSprite(astroidPosX, 0))
                    astroids[astroids.length - 1].set(LedSpriteProperty.Brightness, 128)
                    if (randint(0, 20) == 0) {
                        astroids[astroids.length - 1].set(LedSpriteProperty.Blink, astroidBlinking)
                    }
                }
                astroidsEveryPosX.push(astroidPosX)
            }
        }
        checkPositionSpaceship()
        if (ticks % 2 == 0 && timer > 500) {
            timer += -10
        }
        basic.pause(timer)
        ticks += 1
    }
})
