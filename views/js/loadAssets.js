function loadAssets(game) {
    // plugin for input
    game.add.plugin(PhaserInput.Plugin);
    // load menu buttons
    game.load.image('new', 'assets/images/menu/new.png');
    game.load.image('join', 'assets/images/menu/join.png');
    game.load.image('random', 'assets/images/menu/random.png');
    // load join buttons
    game.load.image('back', 'assets/images/menu/back.png');
    // load selection buttons
    game.load.image('validate', 'assets/images/selection/validate.png');
    game.load.image('more', 'assets/images/selection/more.png');
    game.load.image('less', 'assets/images/selection/less.png');
    // load units
    game.load.image('king', 'assets/images/units/king.png');
    game.load.image('peasant', 'assets/images/units/peasant.png');
    game.load.image('shieldman', 'assets/images/units/shieldman.png');
    game.load.image('soldier', 'assets/images/units/soldier.png');
    game.load.image('ninja', 'assets/images/units/ninja.png');
    game.load.image('knight', 'assets/images/units/knight.png');
    game.load.image('bowman', 'assets/images/units/bowman.png');
    game.load.image('doctor', 'assets/images/units/doctor.png');
    game.load.image('crossbowman', 'assets/images/units/crossbowman.png');
    game.load.image('necromancer', 'assets/images/units/necromancer.png');
    game.load.image('zombie', 'assets/images/units/zombie.png');
    // load images action
    game.load.image('attack', 'assets/images/round/attack.png');
    game.load.image('move', 'assets/images/round/move.png');
    game.load.image('range', 'assets/images/round/range.png');
    game.load.image('blocked', 'assets/images/round/blocked.png');
    game.load.image('enemyBorder', 'assets/images/round/enemy_border.png');
    game.load.image('enemyRange', 'assets/images/round/enemy_range.png');
    game.load.image('next', 'assets/images/round/next.png');
    // load background
    game.load.image('fog', 'assets/images/round/fog.png');
    game.load.image('damaged', 'assets/images/round/damaged.png');
    game.load.image('obstacle', 'assets/images/round/areas/desert/obstacle.png');
    game.load.image('ground1', 'assets/images/round/areas/desert/ground1.png');
    game.load.image('ground2', 'assets/images/round/areas/desert/ground2.png');
    game.load.image('ground3', 'assets/images/round/areas/desert/ground3.png');
    game.load.image('ground4', 'assets/images/round/areas/desert/ground4.png');
    game.load.image('ground5', 'assets/images/round/areas/desert/ground5.png');
    // load end buttons
    game.load.image('retry', 'assets/images/menu/retry.png');
    // load font
    game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
    // load animations
    game.load.spritesheet('animationHeal', 'assets/animations/animation_heal.png', 260, 260, 4);
    // game.load.spritesheet('animationAttack', 'assets/animations/animation_attack.png', 260, 260, 4);
    game.load.spritesheet('animationAttack', 'assets/animations/animation_attack.png', 260, 260, 7);
    return game;
}