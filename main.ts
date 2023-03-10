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
        . . . . . . . . . . . . . . . . 
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
    if (doublefireMode && doublefireMode.lifespan > 0) {
        projectile.y += -5
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
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
        projectile.y += 5
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemyDeath(status.spriteAttachedTo())
})
function enemyDeath (enemy: Sprite) {
    sprites.destroy(enemy, effects.disintegrate, 500)
    if (Math.percentChance(10)) {
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
        powerUp.x = enemy.x
        powerUp.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite3, otherSprite3) {
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    enemyDeath(otherSprite3)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    sprites.destroy(sprite2)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite2).value += -15
    info.changeScoreBy(2)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUP, function (sprite, otherSprite) {
    doublefireMode = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . c a a a c . . . . . 
        . . . . . c c f a b b c . . . . 
        . . . . . b f f b f a a . . . . 
        . . . . . b b a b f f a . . . . 
        . . . . . c b f b b a c . . . . 
        . . . . . . b a f c c . . . . . 
        . . . . . . . b b c . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . c a a a c . . . . 
        . . . . . . c c f a b b c . . . 
        . . . . . . b f f b f a a . . . 
        . . . . . . b b a b f f a . . . 
        . . . . . . c b f b b a c . . . 
        . . . . . . . b a f c c . . . . 
        . . . . . . . . b b c . . . . . 
        `, SpriteKind.Player)
    doublefireMode.setPosition(48, 7)
    doublefireMode.lifespan = 2000
})
let statusbar: StatusBarSprite = null
let enemyShip: Sprite = null
let powerUp: Sprite = null
let doublefireMode: Sprite = null
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
