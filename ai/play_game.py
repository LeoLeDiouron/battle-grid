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
        if unit['idx'] != 0 and unit['nbAttack'] > 0:
            return unit['idx']
    return 0

def is_in_range(unit, enemy_x, enemy_y, coeff):
    if enemy_x >= unit['x'] - (unit['move'] * coeff - unit['range']) and enemy_x <= unit['x'] + (unit['move'] * coeff - unit['range']) and enemy_y >= unit['y'] - (unit['move'] * coeff - unit['range']) and enemy_y <= unit['y'] + (unit['move'] * coeff - unit['range']):
        return True
    else:
        return False

def find_closest_enemy(enemies_in_vision, unit_x, unit_y):
    id_closest = None
    diff_closest = None
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
            if is_in_range(unit, enemy_unit['x'], enemy_unit['y'], 1.5) == True:
                if already_in_enemies_vision(enemies_in_vision, enemy_unit['idx']) == False:
                    enemies_in_vision.append({
                        "idx": enemy_unit['idx'],
                        "x": enemy_unit['x'],
                        "y": enemy_unit['y']
                    })
    id_enemy = find_closest_enemy(enemies_in_vision, unit_x, unit_y)
    return id_enemy

def can_attack(status_game, unit, id_closest_enemy):
    enemy_unit = find_unit_with_id(status_game, 'enemyArmy', id_closest_enemy)
    if enemy_unit is not None:
        return is_in_range(unit, enemy_unit['x'], enemy_unit['y'], 1)
    else:
        return None

def move_to_enemy(status_game, unit, id_closest_enemy):
    enemy_unit = find_unit_with_id(status_game, 'enemyArmy', id_closest_enemy)
    x_direction = 1 if enemy_unit['x'] > unit['x'] else -1
    y_direction = 1 if enemy_unit['y'] > unit['y'] else -1
    offset_x = 0
    offset_y = 0
    while offset_x <= unit['move'] and offset_y <= unit['move']:
        offset_x += x_direction
        offset_y += y_direction
        tmp_unit = unit
        tmp_unit['x'] = unit['x'] + offset_x
        tmp_unit['y'] = unit['y'] + offset_y
        if is_in_range(tmp_unit, enemy_unit['x'], enemy_unit['y'], 1):
            print("%s:%s" % (offset_x, offset_y))
            return offset_x, offset_y
    return 0, 0


def attack(id_room, id_player, unit_idx, enemy_idx):
    print("Attack")
    body = {
        "idx": unit_idx,
        "idxEnemy": enemy_idx
    }
    post(BASE_URL + "/attack/" + id_room + "?idPlayer=" + id_player, body)

def do_action(id_player, id_room, status_game):
    offset_x = 0
    offset_y = 2
    idx_unit = find_avaible_unit(status_game)
    unit = status_game['myArmy'][idx_unit]
    id_closest_enemy = check_enemies_in_vision(status_game, unit['x'], unit['y'])
    if id_closest_enemy is not None:
        if can_attack(status_game, unit, id_closest_enemy) == True:
            attack(id_room, id_player, unit['idx'], id_closest_enemy)
            return
        else:
            offset_x, offset_y = move_to_enemy(status_game, unit, id_closest_enemy)
    body = {
        "idx": idx_unit,
        "x": unit['x'] + offset_x,
        "y": unit['y'] + offset_y
    }
    post(BASE_URL + "/move/" + id_room + "?idPlayer=" + id_player, body)

def play_game(id_player, id_room, config):
    nb_actions = 0
    while True:
        status_room = get(BASE_URL + "/status_room/" + id_room)
        if status_room['status'] == 3:
            status_game = get(BASE_URL + "/status_game/" + id_room + "?idPlayer=" + id_player)
            if status_game['turnPlayer'] == id_player:
                if nb_actions == 0:
                    nb_actions = status_game['maxNbActions']
                    print("Nb actions : %s" % (str(nb_actions)))
                do_action(id_player, id_room, status_game)
                nb_actions -= 1
                if nb_actions == 0:
                    end_turn(id_player, id_room)
        time.sleep(1)