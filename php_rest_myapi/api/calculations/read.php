<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Calculations.php';

    // Instantiate DB & Connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate calculations object
    $calculation = new Calculation($db);

    // Calculation query
    $result = $calculation->read();
    // Get row count
    $num = $result->rowCount();

    // Check if any db entires
    if ($num > 0) {
        // Calculations array
        $calc_arr = array();
        $calc_arr['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $calc_item = array(
                'id' => $id,
                'answer' => $answer,
                'equation' => $equation
            );

            // Push to "data"
            array_push($calc_arr['data'], $calc_item);
        }

        // Turn it to JSON & output
        echo json_encode($calc_arr);
    } else {
        // No Calculations
        echo json_encode(array('message' => 'No Calculations Found'));
    }