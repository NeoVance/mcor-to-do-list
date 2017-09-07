<?php

function updateList($userid, $db, $prev, $next) {
    $query = $db->prepare('UPDATE list SET description = :next WHERE user_id = :user AND description = :prev');
    $query->execute(['user' => $userid, 'prev' => $prev, 'next' => $next]);
    return ['success' => true, 'new' => $next];
}
