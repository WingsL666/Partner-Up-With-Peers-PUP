/*
Delete TABLE login;
Delete TABLE userInfo;
Delete TABLE course;
Delete table courseUserTake;
*/

INSERT INTO login VALUES('pup.ucmerced.edu','Pup', '387647fnxiceh', 'uhweyiklucnywie');
--Will be turn into prepare statement later:
--INSERT INTO login VALUES('pup.ucmerced.edu','Pup', ? , ? );


INSERT INTO userInfo VALUES('Pup', '1st');
--Testing 
--INSERT INTO userInfo VALUES('Pp', '123');


INSERT INTO course VALUES('cse', 120, 'Software Engineering');
INSERT INTO course VALUES('cse', 140, 'Architecture');

--Testing for constraint 
--INSERT INTO course VALUES('cse', 140, 'Software Engineering');
--INSERT INTO course VALUES('c', 120, 'SE');



INSERT INTO courseUserTake VALUES('Pup', 'cse', 120, 'taken', 'P');