<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../../config/Database.php';
    include_once '../../models/Calculations.php';

    // Instantiate DB & Connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate calculations object
    $calculation = new Calculation($db);

    //echo $calculation->answer;

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    if($data->equation == ""){
        return null;
    } else {
        // Evaluate the math string
        $evalExpression = eval('return '.$data->equation.';');

        $calculation->answer = $evalExpression;
        $calculation->equation = $data->equation;

        // Create calculation
        if($calculation->create()){
            echo json_encode(array('answer' => $evalExpression));
        } else {
            echo json_encode(array('message' => 'Calculation not created'));
        };
    }