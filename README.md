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
#### [storybook](https://github.com/storybookjs/storybook/)
#### [clockwork](https://github.com/itsgoingd/clockwork)
#### [Cypress](https://github.com/cypress-io/cypress)

There is also a predefined github action CI/CD workflow (WIP) for running various tests (PHPUnit & Cypress) before deployment.

```bash
docker-compose up -d
docker-compose run composer composer install
docker-compose run composer php artisan key:generate
docker-compose run composer php artisan migrate
docker-compose run composer php artisan optimize
```

# API

The `/api` route is proxied through to the Laravel API Lambda. You can check out an internal proxied API request on the index page `getServerSideProps` 

## Clockwork API Debugging / Monitoring in dev mode

Clockwork is available in dev mode for debugging / performance monitoring under `http://localhost:8000/clockwork/app`

![image](https://user-images.githubusercontent.com/11991564/115364122-5adc1700-a1c3-11eb-8ffb-495bba850d4e.png)

