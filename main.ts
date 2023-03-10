namespace SpriteKind {
    export const PowerUP = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . c . . . . . . . . 
        . . . . c a a a c . . . . . . . 
        . . . c c f a b b c . . . . . . 
        . . . b f f b f a a . . . . . . 
        . . . b b a b f f a . . . . . . 
        . . . c b f b b a c . . . . . . 
        . . . . b a f c c . . . . . . . 
        . . . . . b b c . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemyDeath(status.spriteAttachedTo())
})
function enemyDeath (enemy: Sprite) {
    sprites.destroy(enemy, effects.disintegrate, 500)
    if (Math.percentChance(50)) {
        powerUp = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . 8 8 8 8 8 8 8 . . . . 
            . . . . 8 7 7 7 7 7 7 7 8 . . . 
            . . . 8 8 7 7 7 7 7 7 7 8 8 . . 
            . . 8 8 8 7 7 8 8 8 7 7 8 8 8 . 
            . . 8 8 8 7 7 8 8 8 7 7 8 8 8 . 
            . . 8 8 8 7 7 8 8 8 7 7 8 8 8 . 
            . . 8 8 8 7 7 7 7 7 7 7 8 8 8 . 
            . . 8 8 8 7 7 7 7 7 7 7 8 8 8 . 
            . . 8 8 8 7 7 8 8 8 8 8 8 8 8 . 
            . . 8 8 8 7 7 8 8 8 8 8 8 8 8 . 
            . . . 8 8 7 7 8 8 8 8 8 8 8 . . 
            . . . . 8 8 8 8 8 8 8 8 8 . . . 
            . . . . . 8 8 8 8 8 8 8 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.PowerUP)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    enemyDeath(otherSprite)
})
let statusbar: StatusBarSprite = null
let enemyShip: Sprite = null
let powerUp: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . 6 4 4 4 
    . . . . . . . . . . 6 6 6 6 6 . 
    . . . . . . . . 6 6 6 6 6 . . . 
    . . . . . . . 6 6 6 6 6 6 . . . 
    . . . . 6 6 6 6 6 6 6 6 . . . . 
    . . 8 8 8 8 8 8 8 8 8 a . . . . 
    6 6 6 6 6 6 6 6 6 6 a a a . . . 
    . 6 6 6 6 6 6 6 6 6 a a a . . . 
    . . 8 8 8 8 8 8 8 8 8 a . . . . 
    . . . . . 6 6 6 6 6 6 6 6 6 . . 
    . . . . . . . . . 6 6 6 6 6 6 . 
    . . . . . . . . . . . . . 4 4 4 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
game.onUpdateInterval(2000, function () {
    enemyShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . a 4 4 4 
        . . . . . . . . . . a a a a a . 
        . . . . . . . . a a a a a . . . 
        . . . . . . . a a a a a a . . . 
        . . . . a a a a a a a a . . . . 
        . . a a a a a a a a a 4 . . . . 
        5 5 5 5 5 5 5 5 5 5 4 4 4 . . . 
        . 5 5 5 5 5 5 5 5 5 4 4 4 . . . 
        . . a a a a a a a a a 4 . . . . 
        . . . . . a a a a a a a a a . . 
        . . . . . . . . . a a a a a a . 
        . . . . . . . . . . . . . 4 4 4 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemyShip.x = scene.screenWidth()
    enemyShip.vx = -20
    enemyShip.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.setColor(5, 10)
    statusbar.max = 100
    statusbar.attachToSprite(enemyShip)
})
