<?php

include_once(realpath(__DIR__ . '/../../common.php'));

execute(function ($userid, $db) {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        include_once(realpath(__DIR__ . '/./delete.php'));
        $result = deleteList($userid, $db, $_GET['description']);
    }
    
    return $result;
});
