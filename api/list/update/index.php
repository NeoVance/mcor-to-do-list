<?php

include_once(realpath(__DIR__ . '/./update.php'));
include_once(realpath(__DIR__ . '/../../common.php'));

execute(function($userid, $db) {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        return updateList($userid, $db, $_GET['previous'], $_GET['next']);
    }
});
