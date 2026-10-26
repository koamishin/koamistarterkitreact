<?php

use Inertia\Testing\AssertableInertia;

test('returns a successful response', function (): void {
    $response = $this->get(route('home'));

    $response->assertOk()
        ->assertInertia(fn (AssertableInertia $assertableInertia): \Inertia\Testing\AssertableInertia => $assertableInertia->component('welcome'));
});
