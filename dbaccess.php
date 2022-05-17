<?php
function getSql($lekeres,$insert){
    $servername= "localhost";
    $username= "root";
    $password= "";
    $dbname= "szoftzh2_2022";
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->set_charset("utf8");
    /* if ($conn->connect_error) {
         die("Connection failed: " . $conn->connect_error);
     }*/
    $sql = $lekeres;
    if($insert !="query"){
        $conn->query($sql);
    }else{
        $result = $conn->query($sql);
        $rows = [];
        if ($result) {
            if ($result->num_rows > 0) {
                while ($row = mysqli_fetch_array($result)) {

                    $rows[] = $row;
                }
            } else {

            }
        }
        $conn->close();
        return $rows;
    }

}

if(isset($_GET["init_sql_json"])){

    getSql('CREATE DATABASE IF NOT EXITS exam_score','');
    getSql('DROP TABLE IF EXISTS  People','');
    getSql('CREATE TABLE IF NOT EXISTS People (
                    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                    gender VARCHAR(30) ,
                    ethnicity VARCHAR(30) ,
                    edu VARCHAR(50),
                    lunch VARCHAR(50),
                    prep VARCHAR (50),
                    math_score int,
                    read_score int,
                    write_score int
                    )','');

    $data = json_decode( file_get_contents("examscores.json"),true);
        foreach($data as $d){

            getSql('INSERT INTO People(gender,ethnicity,edu,lunch,prep ,math_score,read_score,write_score) 
                            values("'.$d["gender"].'","'.$d["race/ethnicity"].'","'.$d["parental level of education"].'","'.$d["lunch"].'",
                            "'.$d["test preparation course"].'",'.$d["math score"].','.$d["reading score"].','.$d["writing score"].')','');

        }


    echo json_encode(getSql('SELECT * from People','query'));
}

if(isset($_GET["init_sql_remote"])){

    getSql('CREATE DATABASE IF NOT EXITS exam_score','');
    getSql('DROP TABLE IF EXISTS  People','');
    getSql('CREATE TABLE IF NOT EXISTS People (
                    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                    gender VARCHAR(30) ,
                    ethnicity VARCHAR(30) ,
                    edu VARCHAR(50),
                    lunch VARCHAR(50),
                    prep VARCHAR (50),
                    math_score int,
                    read_score int,
                    write_score int
                    )','');

    $url = 'http://roycekimmons.com/system/generate_data.php?dataset=exams&n='.$_GET['init_sql_remote'];
    $data = array('key1' => 'value1', 'key2' => 'value2');

// use key 'http' even if you send the request to https://...
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST'


        )
    );
    $context  = stream_context_create($options);
    unlink(__DIR__.'\exams.csv');
    $result = file_get_contents($url, false, $context);
    file_put_contents("exams.csv", $result);
    $path =__DIR__."\\exams.csv";
    echo $path;
    $path =preg_replace('/\\\\/','\\\\\\\\',$path);
    echo  $path;
    getSql("LOAD DATA INFILE '".$path."'
INTO TABLE People
FIELDS TERMINATED BY ','
ENCLOSED BY '\"'
ESCAPED BY '\\'
LINES TERMINATED BY '/n'
IGNORE 1 ROWS;","");

    echo json_encode(getSql('SELECT * from People','query'));
}
if(isset($_GET['query'])){

    $re = getSql($_GET['query'],'query');

    if(count($re)>0){
    echo json_encode($re);
    }else{
    echo json_encode([]);
    }
}