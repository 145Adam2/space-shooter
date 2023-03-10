@namespace
class SpriteKind:
    PowerUP = SpriteKind.create()

def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
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
        """),
        mySprite,
        200,
        0)
    if doublefireMode and doublefireMode.lifespan > 0:
        projectile.y += -5
        projectile = sprites.create_projectile_from_sprite(img("""
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
            """),
            mySprite,
            200,
            0)
        projectile.y += 5
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_zero(status):
    enemyDeath(status.sprite_attached_to())
statusbars.on_zero(StatusBarKind.enemy_health, on_on_zero)

def enemyDeath(enemy: Sprite):
    global powerUp
    sprites.destroy(enemy, effects.disintegrate, 500)
    if Math.percent_chance(50):
        powerUp = sprites.create(img("""
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
            """),
            SpriteKind.PowerUP)
        powerUp.x = enemy.x
        powerUp.y = enemy.y

def on_on_overlap(sprite, otherSprite):
    global doublefireMode
    doublefireMode = sprites.create(img("""
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
        """),
        SpriteKind.player)
    doublefireMode.set_position(48, 7)
    doublefireMode.lifespan = 2000
sprites.on_overlap(SpriteKind.player, SpriteKind.PowerUP, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    sprites.destroy(sprite2)
    statusbars.get_status_bar_attached_to(StatusBarKind.enemy_health, otherSprite2).value += -15
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap2)

def on_on_overlap3(sprite3, otherSprite3):
    info.change_life_by(-1)
    scene.camera_shake(4, 500)
    enemyDeath(otherSprite3)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap3)

statusbar: StatusBarSprite = None
enemyShip: Sprite = None
powerUp: Sprite = None
doublefireMode: Sprite = None
projectile: Sprite = None
mySprite: Sprite = None
effects.star_field.start_screen_effect()
mySprite = sprites.create(img("""
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
    """),
    SpriteKind.player)
controller.move_sprite(mySprite, 100, 100)
mySprite.set_flag(SpriteFlag.STAY_IN_SCREEN, True)
info.set_life(5)

def on_update_interval():
    global enemyShip, statusbar
    enemyShip = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    enemyShip.x = scene.screen_width()
    enemyShip.vx = -20
    enemyShip.y = randint(10, scene.screen_height() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.enemy_health)
    statusbar.set_color(5, 10)
    statusbar.max = 100
    statusbar.attach_to_sprite(enemyShip)
game.on_update_interval(2000, on_update_interval)
