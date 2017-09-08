<?php

function getItems($userid, $db, $list) {
    if (isset($list)) {
        $query = $db->prepare('SELECT * FROM item WHERE list_id = :list');
        $query->execute(['list' => $list]);
        return $query->fetchAll(FETCH_ASSOC);
    } else {
        $query = $db->prepare('SELECT item.id, item.description, item.list_id, item.complete FROM list JOIN item ON item.list_id = list.id WHERE list.user_id = :user');
        $query->execute(['user' => $userid]);
        return $query->fetchAll(FETCH_ASSOC);
    }
}
