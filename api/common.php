<?php

function execute(Callable $fun) {
    $userid = 1;
    $db = new PDO('mysql:host=localhost;dbname=c9', 'netaccessory', '');
    
    $result = $fun($userid, $db);
    // call_user_func - built in method of calling functions
    
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    
    echo json_encode($result);
}
