```bash
docker-compose run composer php artisan key:generate
docker-compose exec db bash
mysql -u root -p
```

```mysql
CREATE USER 'laraveluser'@'%'  IDENTIFIED BY 'your_laravel_db_password';
GRANT ALL PRIVILEGES ON laravel.* TO 'laraveluser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

```bash
docker-compose run composer php artisan migrate
```