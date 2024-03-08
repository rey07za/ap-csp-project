namespace SpriteKind {
    export const powerUpSprite = SpriteKind.create()
    export const BetterPowerUp = SpriteKind.create()
    export const secondEnemy = SpriteKind.create()
    export const thirdEnemy = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.BetterPowerUp, function (sprite, otherSprite) {
    info.changeScoreBy(3)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerUpSprite, function (sprite, otherSprite) {
    info.changeScoreBy(2)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    sprites.destroy(otherSprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.runtime() - timeCheck >= 500) {
        timeCheck = game.runtime()
        projectile = sprites.createProjectileFromSprite(img`
            . 9 . . . . . 9 . . . . 
            . . 9 9 9 9 9 9 9 . . . 
            9 . 1 1 1 1 1 1 9 9 . . 
            1 1 1 1 1 1 1 1 1 9 9 . 
            . . 1 1 1 9 9 9 1 1 9 9 
            9 1 1 1 1 1 1 9 1 1 1 9 
            . . 9 9 9 1 1 1 1 1 9 9 
            . 9 1 1 1 1 1 1 1 9 9 . 
            1 1 9 9 9 9 9 9 9 9 . . 
            9 . . . . . . . 9 . . . 
            . 1 . . . . . . . . . . 
            `, playerSprite, 40, 0)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.secondEnemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.coolRadial, 500)
    info.changeLifeBy(-3)
    info.changeScoreBy(-3)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.secondEnemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.rings, 500)
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
info.onLifeZero(function () {
    game.gameOver(true)
    game.reset()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.thirdEnemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.coolRadial, 500)
    info.changeLifeBy(-2)
    info.changeScoreBy(-2)
})
function EnemyDifficultySpawner (gameModeDifficulty: number) {
    if (gameModeDifficulty < 5) {
        alienEnemy = sprites.create(img`
            . a a a . . . . . . . . . . . . 
            b 1 1 1 b . . . . . . . a b a . 
            b 1 2 1 a . . . . . . b 1 1 1 b 
            b 1 2 1 a . . . . . . b 1 2 1 a 
            b 1 1 1 b . . . . . . b 1 2 1 a 
            . b b a a a . . . . . b 1 1 1 b 
            . . . . . a . . . . . . b a a . 
            . . . . . b a a a a a a . a . . 
            . . . . a a a a a a . . a a . . 
            . . . a b a a b a a b . . . . . 
            . . . b a a a a a a a . . . . . 
            . . . . b a a a a b . . . . . . 
            . . . . a a a a a a . . . . . . 
            . . . . a a a b a a . . . . . . 
            . . . . b a a a a a . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        alienEnemy.setPosition(151, randint(20, 135))
        alienEnemy.vx = -20
        for (let index = 0; index < 4; index++) {
            powerUpsList.pop()
        }
        powerUp = sprites.create(powerUpsList._pickRandom(), SpriteKind.powerUpSprite)
        powerUp.vx = -30
        powerUp.setPosition(151, randint(20, 135))
    } else if (gameModeDifficulty > 5) {
        alienEnemy = sprites.create(img`
            . . 2 2 2 2 2 4 4 4 4 4 4 4 . . 
            . 2 2 4 4 2 2 2 2 2 2 2 2 2 2 . 
            . 2 2 4 f 2 2 2 2 2 2 f 2 2 2 4 
            . 2 2 2 2 f 2 2 2 2 f 2 2 2 2 4 
            . 2 2 2 2 2 f 2 2 f 2 4 2 2 2 4 
            . 2 2 2 2 2 5 2 2 5 2 4 2 2 2 4 
            . 2 2 2 2 2 f 2 2 f 2 2 4 2 2 4 
            . 2 4 2 2 2 2 2 2 2 2 2 2 2 2 4 
            . 2 2 4 2 2 2 f f 2 2 2 2 2 2 4 
            . . 2 4 4 2 2 f f 2 2 2 2 2 4 4 
            . . . 2 2 2 2 2 2 2 4 4 4 4 4 . 
            . . 4 2 2 . 2 . . 2 . . 4 4 2 2 
            . 4 2 . 2 4 2 2 . 2 4 . 2 2 . 2 
            . 2 . . . 2 . 2 . . 4 . . 2 . . 
            . . 2 . 2 2 . 2 . 2 2 . . 4 2 . 
            . . 2 . 2 . . 2 . 2 . . . . 2 . 
            `, SpriteKind.secondEnemy)
        alienEnemy.setPosition(151, randint(20, 135))
        alienEnemy.vx = -50
        for (let index = 0; index < 4; index++) {
            powerUpsList.shift()
        }
        powerUp = sprites.create(powerUpsList._pickRandom(), SpriteKind.BetterPowerUp)
        powerUp.vx = -30
        powerUp.setPosition(151, randint(20, 135))
    } else {
        alienEnemy = sprites.create(assets.image`myImage`, SpriteKind.thirdEnemy)
        alienEnemy.setPosition(151, randint(20, 135))
        alienEnemy.vx = -35
        for (let index = 0; index < 2; index++) {
            powerUpsList.pop()
        }
        for (let index = 0; index < 2; index++) {
            powerUpsList.shift()
        }
        morePowerUp = sprites.create(powerUpsList._pickRandom(), SpriteKind.powerUpSprite)
        morePowerUp.vx = -30
        morePowerUp.setPosition(151, randint(20, 135))
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.thirdEnemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.rings, 500)
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.rings, 500)
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
})
let morePowerUp: Sprite = null
let powerUp: Sprite = null
let powerUpsList: Image[] = []
let alienEnemy: Sprite = null
let projectile: Sprite = null
let playerSprite: Sprite = null
let timeCheck = 0
game.splash("Don't let the enemy aliens get past you!")
game.splash("Use the space bar to shoot!")
game.setGameOverScoringType(game.ScoringType.HighScore)
timeCheck = game.runtime()
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444ffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff887ffff22ffff44444fffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff787ffff22fff4424444ffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff878fffffffff4444444ffffffff
    ffffffffffffffffff1ffffffffffffffaaaaffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444fffffffff
    ffffffffffffffffffffffffffffffffaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444ffffffffff
    fffffffffffffffffffffffffffffffaaaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffaaaaaaaacccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffccaaaaaaaaffccfffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffccfaaaaaaaacccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffccfffaaacccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffcccccccccafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffff1ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111fffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff88888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8888888cccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff88888888fccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff88888888ccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc888888ccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccf888cccc88ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffccc888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccf888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
playerSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . c c . . . . . . . . . . . . . 
    c 1 1 c . . . . . . . . . . . . 
    1 e 1 c c c c c . . . . . . . . 
    1 9 b 1 1 1 1 1 c . . . . . . . 
    1 9 b e e e e 1 c c c c c c . . 
    1 9 b b b b e e 1 1 1 1 1 1 c c 
    1 9 9 9 9 9 9 e e e e e e 1 1 1 
    1 9 b b b b e e 1 1 1 1 1 1 . . 
    1 9 b e e e e 1 . . . . . . . . 
    1 9 b 1 1 1 1 1 . . . . . . . . 
    1 e 1 . . . . . . . . . . . . . 
    . 1 1 . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
let gameModeDifficulty = game.askForNumber("Gamemode Difficulty?", 2)
while (gameModeDifficulty > 10) {
    gameModeDifficulty = game.askForNumber("Gamemode Difficulty?", 2)
}
playerSprite.setStayInScreen(true)
playerSprite.setPosition(6, 59)
controller.moveSprite(playerSprite, 0, 100)
let playerScore = 0
info.setScore(0)
info.setLife(25)
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.x < 6) {
            info.changeLifeBy(-1)
            info.changeScoreBy(-2)
            sprites.destroy(value)
        }
    }
})
game.onUpdateInterval(1000, function () {
    powerUpsList = [
    img`
        . . 5 5 5 5 . . 
        . 5 9 5 a 9 5 . 
        . 5 5 9 5 a 5 . 
        . 5 a 5 9 5 5 . 
        . 5 9 a 5 9 5 . 
        . . 5 5 5 5 . . 
        `,
    img`
        . . . 8 8 8 . . . . 
        . . . 5 5 8 8 . . . 
        . . . 5 5 5 8 8 . . 
        5 . 5 2 5 5 5 8 8 . 
        . . 5 5 5 5 2 5 3 8 
        . 5 5 5 5 5 3 3 8 . 
        . 5 2 5 3 3 . . . . 
        . 5 5 3 . . . . . . 
        . 2 3 . . 5 . . . . 
        . 5 3 . . . . . . . 
        . 3 . . . . . . . . 
        . . . . . . . . . . 
        5 . . . . . . . . . 
        `,
    img`
        . 2 2 . 2 2 . 
        2 2 2 2 1 2 2 
        2 2 2 2 2 1 2 
        . 2 2 2 2 2 . 
        . . 2 2 2 . . 
        . . . 2 . . . 
        `,
    img`
        . . . 7 . . . . . . 
        . . . . . . . . 7 . 
        . . . 1 1 1 1 1 . . 
        6 . . 1 . . . 1 . . 
        . . . 1 1 1 1 1 . . 
        . . . . 1 . 1 . . 6 
        . . . . 1 . 1 . . . 
        . . 6 . 1 . 1 . . . 
        . . . . 1 . 1 . 7 . 
        . . . 1 . . . 1 . . 
        . . 1 . . . . 7 1 . 
        . 1 . 7 7 . 6 7 7 1 
        . 1 7 6 7 7 7 1 7 1 
        . 1 7 7 7 7 1 7 7 1 
        . . 1 7 7 6 7 7 1 . 
        . . . 1 1 1 1 1 . . 
        `,
    img`
        . . 8 8 8 8 8 8 . . 
        . 8 8 8 3 8 8 3 8 . 
        8 8 3 8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 3 8 8 
        . a a a a a a a a . 
        7 7 7 7 7 7 7 7 7 7 
        . 5 5 5 5 5 5 5 5 . 
        8 8 3 8 8 5 5 5 8 8 
        . 8 8 3 8 8 8 3 8 . 
        `,
    img`
        . . c c c c c c c c . . 
        . c c d c c c d c c c . 
        . c c c c d c c c c c . 
        c c c c c c c c c d c c 
        c c d c c c d c c c c c 
        . c c c c c c c c c c . 
        . . 3 c c 3 3 3 3 8 . . 
        . . 3 3 c 3 3 8 3 8 . . 
        . . . 3 c 3 8 3 8 . . . 
        . . . 3 3 3 3 3 8 . . . 
        . . . . 3 3 3 8 . . . . 
        . . . . 3 3 3 8 . . . . 
        . . . . . 3 8 . . . . . 
        . . . . . 3 8 . . . . . 
        `
    ]
    EnemyDifficultySpawner(gameModeDifficulty)
})
