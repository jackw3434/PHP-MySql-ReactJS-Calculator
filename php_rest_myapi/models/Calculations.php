<?php
class Calculation {

    //DB Stuff
    private $conn;
    private $table = 'calculatorhistory';

    // Calc properties
    public $id;
    public $equation;
    public $answer;

    //Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Get Answers
    public function read() {

        //Create Query
        $query = 'SELECT * FROM ' . $this->table . ' ';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execture statement
        $stmt->execute();

        return $stmt;
    }

    // Create Calculation
    public function create() {
        // Create query
        $query = 'INSERT INTO ' . $this->table . ' SET equation = :equation, answer = :answer';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->answer = htmlspecialchars(strip_tags($this->answer));
        $this->equation = htmlspecialchars(strip_tags($this->equation));

        // Bind data
        $stmt->bindParam(':answer', $this->answer);
        $stmt->bindParam(':equation', $this->equation);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error is something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }
}