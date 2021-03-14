/*
Drop TABLE login;
Drop TABLE userInfo;
Drop TABLE course;
Drop table courseUserTake;
Drop table gradeLevel;
Drop table course;
Drop table courseStatus;
Drop table letterGrade;
Drop table OS;
Drop table programmingLanguage;
Drop table Gender;
*/

--Tables that user can access:

Create table login(  
    log_user_email char(50) PRIMARY KEY, 
    log_user_id char(50) UNIQUE,
    log_hashed_password char(150), 
    log_salt char(11)
);

Create table userInfo(
    info_user_id char(50) PRIMARY KEY, 
    info_grade char(5),
    info_gender char(5), 
    info_OS char(20),
    info_language char(20), --most familar language use
    CHECK ( info_grade IN ('1st year', '2nd year', '3rd year', '4th year') ),
    CHECK ( info_gender IN ('Female', 'Male', 'N/A') )
);


Create table courseUserTake(
    ct_user_id char(50), 
    ct_subject char(10), 
    ct_code char(5), 
    ct_status char(15),
    ct_letter_grade char(5), 
    CHECK ( ct_status IN ('taken', 'not taken', 'in progress', 'plan to take') ),
    CHECK ( ct_letter_grade IN ('A', 'B', 'C', 'P', 'NP', 'N/A') )
);



--Tables that will not be access by users:

Create table gradeLevel( --populated below
    grade_level char(10) PRIMARY KEY
);

INSERT INTO gradeLevel VALUES('1st year');
INSERT INTO gradeLevel VALUES('2nd year');
INSERT INTO gradeLevel VALUES('3rd year');
INSERT INTO gradeLevel VALUES('4th year');




Create table course(--populated below
    c_subject char(10), --for ex. cse 
    c_code char(5),     --for ex. 120
    c_name char(50) UNIQUE, --Software Engineering
    PRIMARY KEY(c_subject, c_code)
);

INSERT INTO course VALUES('cse', 120, 'Software Engineering');
INSERT INTO course VALUES('cse', 140, 'Computer Architecture');
INSERT INTO course VALUES('cse', 100, 'Algorithm and Design');
INSERT INTO course VALUES('cse', 160, 'Computer Networking');
INSERT INTO course VALUES('engr', 65, 'Circuit Theory');
INSERT INTO course VALUES('wri', 010, 'Composition Writing');



Create table courseStatus(--populated below
    course_status char(15) PRIMARY KEY
);

INSERT INTO courseStatus VALUES('not taken');
INSERT INTO courseStatus VALUES('taken');
INSERT INTO courseStatus VALUES('in progress');
INSERT INTO courseStatus VALUES('plan to take');



Create table letterGrade(--populated below
    letter_grade char(5) PRIMARY KEY
);

INSERT INTO letterGrade VALUES('A');
INSERT INTO letterGrade VALUES('B');
INSERT INTO letterGrade VALUES('C');
INSERT INTO letterGrade VALUES('P');
INSERT INTO letterGrade VALUES('NP');
INSERT INTO letterGrade VALUES('N/A');




Create table OS(--populated below
    os_name char(20) PRIMARY KEY
);
INSERT INTO OS VALUES('Windows 10');
INSERT INTO OS VALUES('Ubuntu/Linux');
INSERT INTO OS VALUES('Windows 10 & Ubuntu subsystem');
INSERT INTO OS VALUES('MAC OS');
INSERT INTO OS VALUES('N/A');



Create table programmingLanguage(
    programming_language char(20) PRIMARY KEY
);

INSERT INTO programmingLanguage VALUES('Java');
INSERT INTO programmingLanguage VALUES('C');
INSERT INTO programmingLanguage VALUES('C++');
INSERT INTO programmingLanguage VALUES('C#');
INSERT INTO programmingLanguage VALUES('Python');
INSERT INTO programmingLanguage VALUES('N/A');


Create table Gender(
    gender char(10) PRIMARY KEY
);
INSERT INTO gender VALUES('Female');
INSERT INTO gender VALUES('Male');
INSERT INTO gender VALUES('N/A');
