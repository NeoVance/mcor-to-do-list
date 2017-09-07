<?php

function post($userid, $db, $data) {
    $postQuery = $db->prepare('INSERT INTO list (description, user_id) VALUES (:desc, :user)');
    $postQuery->execute(['user' => $userid, 'desc' => $data['description']]);
    if ($db->errorCode() > 0) {
        throw new Exception('Database query error.');
    }
    return [ 'success' => true, 'id' => $db->lastInsertId() ];
}
