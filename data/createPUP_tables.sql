/*
Drop TABLE login;
Drop TABLE userInfo;
Drop TABLE course;
Drop table courseUserTake;
*/

Create table login(  
    log_user_email char(50) PRIMARY KEY, 
    log_user_id char(50) UNIQUE,
    log_hashed_password char(150), 
    log_salt char(11)
);

Create table userInfo(
    info_user_id char(50) PRIMARY KEY, 
    info_grade char(5) NOT NULL,
    CHECK ( info_grade IN ('1st', '2nd', '3rd', '4th') )
);


Create table course(
    c_subject char(10), --cse 
    c_code char(5),     --120
    c_name char(50) UNIQUE, --Software Engineering
    PRIMARY KEY(c_subject, c_code)
);


Create table courseUserTake(
    ct_user_id char(50), 
    ct_subject char(10), 
    ct_code char(5), 
    ct_status char(15),
    ct_letter_grade char(15), 
    CHECK ( ct_status IN ('taken', 'not taken', 'in progress', 'plan to take') )
    CHECK ( ct_letter_grade IN ('A', 'B', 'C', 'P', 'NP', 'N/A') )
);
