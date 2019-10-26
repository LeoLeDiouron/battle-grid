# _______ IMPORTS _______

import time

from send_request import send_get_request as get, send_post_request as post

# _______ GLOBALS _______

BASE_URL = "http://localhost:8080/api"

# _______ FUNCTIONS _______

def end_turn(id_player, id_room):
    print("end turn")
    get(BASE_URL + "/turn_over/" + id_room + "?idPlayer=" + id_player)

def already_in_enemies_vision(enemies_in_vision, id_enemy):
    for enemy in enemies_in_vision:
        if enemy['idx'] == id_enemy:
            return True
    return False

def find_unit_with_id(status_game, army, id_unit):
    for unit in status_game[army]:
        if unit['idx'] == id_unit:
            return unit
    return None

def find_avaible_unit(status_game):
    for unit in status_game['myArmy']:
        import json
        print(json.dumps(unit))
        if unit['idx'] != 0 and unit['hasAttacked'] == False:
            print("Avaible unit %s" % (unit['idx']))
            return unit['idx']
    return 0

def is_in_range(unit, enemy_x, enemy_y, coeff):
    if enemy_x >= unit['x'] - (unit['move'] * coeff - unit['range']) and enemy_x <= unit['x'] + (unit['move'] * coeff - unit['range']) and enemy_y >= unit['y'] - (unit['move'] * coeff - unit['range']) and enemy_y <= unit['y'] + (unit['move'] * coeff - unit['range']):
        return True
    else:
        return False

def is_in_move(unit, enemy_x, enemy_y):
    if enemy_x >= unit['x'] - unit['move'] and enemy_x <= unit['x'] + unit['move'] and enemy_y >= unit['y'] - unit['move'] and enemy_y <= unit['y'] + unit['move']:
            return True
    else:
        return False
    
def is_move(x, y, unit):
    if x >= unit['x'] - unit['move'] and x <= unit['x'] + unit['move'] and y >= unit['y'] - unit['move'] and y <= unit['y'] + unit['move']:
        return True
    else:
        return False 

def find_closest_enemy(enemies_in_vision, unit_x, unit_y):
    id_closest = 0 # by default, the id of the leader
    diff_closest = None
    for enemy in enemies_in_vision: # check king
        if enemy['idx'] == 0:
            return 0
    for enemy in enemies_in_vision:
        diff_x = abs(enemy['x'] - unit_x)
        diff_y = abs(enemy['y'] - unit_y)
        diff_avg = (diff_x + diff_y) / 2
        if diff_closest is None or diff_avg < diff_closest:
            id_closest = enemy['idx']
            diff_closest = diff_avg
    return id_closest

def check_enemies_in_vision(status_game, unit_x, unit_y):
    enemies_in_vision = []
    for unit in status_game['myArmy']:
        for enemy_unit in status_game['enemyArmy']:
            if is_in_range(unit, enemy_unit['x'], enemy_unit['y'], 1.5) == True and \
                (is_in_move(unit, enemy_unit['x'], enemy_unit['y']) == True or enemy_unit['type'] != 'ninja' or enemy_unit['invisible'] == False):
                if already_in_enemies_vision(enemies_in_vision, enemy_unit['idx']) == False:
                    enemies_in_vision.append({
                        "idx": enemy_unit['idx'],
                        "x": enemy_unit['x'],
                        "y": enemy_unit['y']
                    })
    id_enemy = find_closest_enemy(enemies_in_vision, unit_x, unit_y)
    return id_enemy

def is_on_allie(army, x, y, current_unit):
    for unit in army:
        if unit['x'] == x and unit['y'] == y and unit['idx'] != current_unit['idx']:
            return True
    return False

def is_on_obstacle(obstalces, x, y):
    for obstacle in obstalces:
        if obstacle['x'] == x and obstacle['y'] == y:
            return True
    return False

def is_on_shieldman(army, x, y):
    for unit in army:
        if unit['x'] == x and unit['y'] == y:
            if unit['type'] == 'shieldman':
                return True
            else:
                return False
    return False

def is_on_enemy(army, x, y):
    for unit in army:
        if unit['x'] == x and unit['y'] == y:
            return unit['idx']
    return -1

def behind_obstacle_or_enemy(status_game, x, y, unit, is_move):
    x_tmp = unit['x']
    y_tmp = unit['y']
    x_move = 1 if x_tmp < x else -1
    y_move = 1 if y_tmp < y else -1

    while x_tmp != x or y_tmp != y:
        if is_on_obstacle(status_game['obstacles'], x_tmp, y_tmp) == True or is_on_shieldman(status_game['enemyArmy'], x_tmp, y_tmp) == True:
            return 1
        elif is_move == True:
            status = 2 if unit['type'] == 'bowman' or unit['type'] == 'crossbowman' else 1
            idx_enemy = is_on_enemy(status_game['enemyArmy'], x_tmp, y_tmp)
            if ((x_tmp != unit['x'] or y_tmp != unit['y']) and idx_enemy != -1) or (is_on_allie(status_game['myArmy'], x_tmp, y_tmp, unit) == True):
                return status
        if x_tmp != x:
            x_tmp += x_move
        if y_tmp != y:
            y_tmp += y_move
    return 0

def move_avaible(status_game, x, y, unit):
    if x == unit['x'] and unit['y'] == unit['y']:
        return False
    elif x < 0 or x >= 15:
        return False
    elif y < 0 or y >= 15:
        return False
    elif is_on_allie(status_game['myArmy'], x, y, unit) == True:
        return False
    elif is_on_obstacle(status_game['obstacles'], x, y) == True:
        return False
    return True

def get_all_possible_moves(status_game, unit):
    moves = []
    moves_attack = []
    for x in range(unit['x'] - (unit['move'] + unit['range']), unit['x'] + (unit['move'] + unit['range']) + 1):
        for y in range(unit['y'] - (unit['move'] + unit['range']), unit['y'] + (unit['move'] + unit['range']) + 1):
            status_behind_obstacle = behind_obstacle_or_enemy(status_game, x, y, unit, is_move(x, y, unit))
            if status_behind_obstacle == 1:
                pass
            moves_attack.append({"x": x, "y": y})
            can_move = move_avaible(status_game, x, y, unit)
            if is_move(x, y, unit) and can_move == True:
                moves.append({"x": x, "y": y})
    return moves, moves_attack

# return the best move to go to enemy position
def find_best_move(moves, enemy):
    best_move = {"x": None, "y": None}
    for move in moves:
        if (best_move['x'] is None and best_move['y'] is None):
            best_move = move
        elif abs(enemy['y'] - move['y']) < abs(enemy['y'] - best_move['y']):
            best_move = move
        elif abs(enemy['y'] - move['y']) == abs(enemy['y'] - best_move['y']) and abs(enemy['x'] - move['x']) < abs(enemy['x'] - best_move['x']):
            best_move = move
    return best_move

def move_to_enemy(id_room, id_player, status_game, moves, unit, id_closest_enemy):
    enemy_unit = find_unit_with_id(status_game, 'enemyArmy', id_closest_enemy)
    best_move = find_best_move(moves, enemy_unit)
    body = {
        "idx": unit['idx'],
        "x": best_move['x'],
        "y": best_move['y']
    }
    print("Unit %s (%s:%s) MOVE IN (%s:%s)" % (str(unit['idx']), str(unit['x']), str(unit['y']), str(body['x']), str(body['y'])))
    post(BASE_URL + "/move/" + id_room + "?idPlayer=" + id_player, body)

def attack(id_room, id_player, unit_idx, enemy_idx):
    body = {
        "idx": unit_idx,
        "idxEnemy": enemy_idx
    }
    post(BASE_URL + "/attack/" + id_room + "?idPlayer=" + id_player, body)

def find_enemy_to_attack(enemy_army, moves):
    for move in moves: # check king
        if move['x'] == enemy_army[0]['x'] and move['y'] == enemy_army[0]['y']:
            return 0
    for move in moves:
        for enemy in enemy_army:
            if move['x'] == enemy['x'] and move['y'] == enemy['y']:
                return enemy['idx']
    return -1

def do_action(id_player, id_room, status_game):
    idx_unit = find_avaible_unit(status_game)
    unit = status_game['myArmy'][idx_unit]
    moves, moves_attack = get_all_possible_moves(status_game, unit)
    id_enemy_to_attack = find_enemy_to_attack(status_game['enemyArmy'], moves_attack)
    if id_enemy_to_attack != -1:
        attack(id_room, id_player, unit['idx'], id_enemy_to_attack)
    else:
        id_closest_enemy = check_enemies_in_vision(status_game, unit['x'], unit['y'])
        move_to_enemy(id_room, id_player, status_game, moves, unit, id_closest_enemy) # 0 is the id of the enemy leader

def play_game(id_player, id_room, config):
    nb_actions = 0
    while True:
        status_room = get(BASE_URL + "/status_room/" + id_room)
        if status_room['status'] == 3:
            status_game = get(BASE_URL + "/status_game/" + id_room + "?idPlayer=" + id_player)
            if status_game['turnPlayer'] == id_player:
                import json
                print(json.dumps(status_game['myArmy']))
                if nb_actions == 0:
                    nb_actions = status_game['maxNbActions']
                    print("Nb actions : %s" % (str(nb_actions)))
                do_action(id_player, id_room, status_game)
                nb_actions -= 1
                if nb_actions == 0:
                    end_turn(id_player, id_room)
        time.sleep(1)