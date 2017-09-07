<?php

include_once(realpath(__DIR__ . '/../common.php'));

execute(function ($userid, $db) {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        include_once(realpath(__DIR__ . '/./get.php'));
        $result = myGetFunction($userid, $db);
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        include_once(realpath(__DIR__ . '/./post.php'));
        $result = post($userid, $db, $_POST);
    }
    
    return $result;
});
