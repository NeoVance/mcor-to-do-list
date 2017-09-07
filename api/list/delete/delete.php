<?php

function deleteList($userid, $db, $name) {
    $query = $db->prepare('DELETE FROM list WHERE user_id = :user AND description = :name');
    $query->execute(['user' => $userid, 'name' => $name]);
    return ['success' => true];
}