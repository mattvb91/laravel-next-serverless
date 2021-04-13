<center>
    <h1>Laravel API / NextJs / Serverless Template</h1>
</center>

This is an "opinionated" (see below) template for a backend API running on Laravel with JWT Authentication and a NextJS frontend with Lambda deployments through the [Serverless](https://github.com/serverless/serverless) framework with github actions.

The local development environment is also provided through docker compose.

## Define "opinionated"
In this starter kit we make use of some libraries on the frontend & backend that you may not need or wish to use. You can of course remove them and instead use your own as your requirements specify.

This starter kit comes with some of the following libs already integrated ready to go: 

#### [styled-components](https://styled-components.com/)
#### [react-styled-flexboxgrid](https://github.com/LoicMahieu/react-styled-flexboxgrid)
#### [tymon/jwt-auth](https://github.com/tymondesigns/jwt-auth)


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