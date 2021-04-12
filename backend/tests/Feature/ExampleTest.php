<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testHealthEndpoint()
    {
        $response = $this->get('/api/health');

        $response->assertStatus(200);
    }

    public function testSummary()
    {
        $response = $this->get('/api/summary');

        $response->assertStatus(200);
        $response->assertHeader("Cache-Control", "max-age=3600, public");

        $response->assertJsonStructure(['backend', 'frontend']);
    }
}
