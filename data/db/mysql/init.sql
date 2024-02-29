-- create the databases
CREATE DATABASE IF NOT EXISTS easyadmin;

-- create the users for each database
CREATE USER 'easyadmin'@'%' IDENTIFIED BY 'easyadmin';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `easyadmin`.* TO 'easyadmin'@'%';

FLUSH PRIVILEGES;
