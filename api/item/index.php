<?php

include_once(realpath(__DIR__ . '/../common.php'));
include_once(realpath(__DIR__ . '/./get.php'));
include_once(realpath(__DIR__ . '/./post.php'));

execute(function($userid, $db) {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        return getItems($userid, $db, $_GET['list']);
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $data = file_get_contents('php://input');
        $json = json_decode($data);
        return postItem($userid, $db, $json->list, $json->desc);
    }
});
