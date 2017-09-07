<?php

function myGetFunction($userid, $db) {
    $getQuery = $db->prepare('SELECT id, description FROM list WHERE user_id = :user');
    $getQuery->execute(['user' => $userid]);
    $result = $getQuery->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}