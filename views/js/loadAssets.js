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
    // load leaders
    game.load.image('rich_king', 'assets/images/leaders/rich_king.png');
    game.load.image('queen_of_slaves', 'assets/images/leaders/queen_of_slaves.png');
    game.load.image('ulfrik_the_terror', 'assets/images/leaders/ulfrik_the_terror.png');
    // load units
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
    game.load.image('redBorder', 'assets/images/round/enemy_border.png');
    game.load.image('enemyRange', 'assets/images/round/enemy_range.png');
    game.load.image('next', 'assets/images/round/next.png');
    game.load.image('yourTurn', 'assets/images/round/your_turn.png');
    // load background
    game.load.image('fog', 'assets/images/round/fog.png');
    game.load.image('damaged', 'assets/images/round/damaged.png');
    game.load.image('ground1', 'assets/images/round/areas/ground1.png');
    game.load.image('ground2', 'assets/images/round/areas/ground2.png');
    game.load.image('ground3', 'assets/images/round/areas/ground3.png');
    game.load.image('ground4', 'assets/images/round/areas/ground4.png');
    game.load.image('ground5', 'assets/images/round/areas/ground5.png');
    // load obstacles
    game.load.image('void', 'assets/images/round/obstacles/void.png');
    game.load.image('tree', 'assets/images/round/obstacles/tree.png');
    game.load.image('deadTree', 'assets/images/round/obstacles/dead_tree.png');
    game.load.image('house', 'assets/images/round/obstacles/house.png');
    game.load.image('rockAndSword', 'assets/images/round/obstacles/rock_and_sword.png');
    game.load.image('wall', 'assets/images/round/obstacles/wall.png');
    // load end buttons
    game.load.image('retry', 'assets/images/menu/retry.png');
    // load font
    game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
    // load animations
    game.load.spritesheet('animationHeal', 'assets/animations/animation_heal.png', 260, 260, 4);
    game.load.spritesheet('animationAttack', 'assets/animations/animation_attack.png', 260, 260, 7);
    game.load.spritesheet('animationFireHouse', 'assets/animations/animation_fire_house.png', 260, 260, 4);
    game.load.spritesheet('animationYourTurn', 'assets/animations/animation_your_turn.png', 380, 340, 6);
    return game;
}