<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Promise;

class ExampleController extends Controller
{
    /**
     * This is a sample endpoint that we can use as an example
     * for getInitialProps() SSR and cloudfront caching.
     *
     * We just want to get some meta data from npm / packagist.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Throwable
     */
    public function summary()
    {
        $client = new Client();

        $packagistPromises = [
            $client->getAsync('https://repo.packagist.org/p2/laravel/laravel.json'),
            $client->getAsync('https://repo.packagist.org/p2/tymon/jwt-auth.json'),
            $client->getAsync('https://repo.packagist.org/p2/phpunit/phpunit.json'),
        ];
        $packagistResponse = Promise\Utils::unwrap($packagistPromises);

        $backendData = [];
        foreach ($packagistResponse as $i => $res) {
            $backendData[$i] = json_decode($res->getBody()->getContents(), true);
        }

        $unpkgPromises = [
            $client->getAsync('https://unpkg.com/next@latest/package.json'),
            $client->getAsync('https://unpkg.com/react-styled-flexboxgrid@latest/package.json'),
            $client->getAsync('https://unpkg.com/styled-components@latest/package.json'),
            $client->getAsync('https://unpkg.com/typescript@latest/package.json'),
            $client->getAsync('https://unpkg.com/cypress@latest/package.json'),
        ];
        $unpkgResponse = Promise\Utils::unwrap($unpkgPromises);

        $frontendData = [];
        foreach ($unpkgResponse as $i => $res) {
            $frontendData[$i] = json_decode($res->getBody()->getContents(), true);
        }

        return response()
            ->json([
                "backend"  => $backendData,
                "frontend" => $frontendData,
            ]);
    }
}
