<?php

function postItem($userid, $db, $list, $desc) {
    $query = $db->prepare('INSERT INTO item (description, list_id, complete) VALUES (:desc, :list, FALSE)');
    
    $listQuery = $db->prepare('SELECT id FROM list WHERE description = :list');
    
    $listQuery->execute(['list' => $list]);
    $id = $listQuery->fetch(PDO::FETCH_ASSOC)['id'];
    
    $query->execute(['desc' => $desc, 'list' => $id]);
    
    return ['success' => $db->lastInsertID()];
}
