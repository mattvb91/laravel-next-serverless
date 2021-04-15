CREATE USER 'laraveluser'@'%'  IDENTIFIED BY 'your_laravel_db_password';
GRANT ALL PRIVILEGES ON laravel.* TO 'laraveluser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;