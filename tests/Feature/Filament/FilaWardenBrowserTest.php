<?php

declare(strict_types=1);

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Vite;

beforeEach(function (): void {
    $this->app->forgetInstance(Vite::class);
    app(Vite::class)->useHotFile(storage_path('framework/testing-no-vite-hot'));
    $this->seed(DatabaseSeeder::class);
    $this->actingAs(User::query()->where('email', 'admin@admin.com')->firstOrFail());
});

test('browser can visit filawarden executive dashboard', function (): void {
    $page = visit('/admin/filawarden/dashboard');

    $page->assertSee('Executive Operations Dashboard')
        ->assertNoJavaScriptErrors()
        ->screenshot(fullPage: false, filename: 'filawarden-executive-dashboard');
});

test('browser can visit filawarden deployment auditor page', function (): void {
    $page = visit('/admin/filawarden/deployment-auditor');

    $page->assertSee('Deployment Readiness Auditor')
        ->assertNoJavaScriptErrors()
        ->screenshot(fullPage: false, filename: 'filawarden-deployment-auditor');
});

test('browser can visit filawarden infrastructure monitor page', function (): void {
    $page = visit('/admin/filawarden/infrastructure');

    $page->assertSee('Infrastructure Telemetry')
        ->assertNoJavaScriptErrors()
        ->screenshot(fullPage: false, filename: 'filawarden-infrastructure');
});

test('browser can visit filawarden database health page', function (): void {
    $page = visit('/admin/filawarden/database-health');

    $page->assertSee('Database Performance & Health')
        ->assertNoJavaScriptErrors()
        ->screenshot(fullPage: false, filename: 'filawarden-database-health');
});

test('browser can visit filawarden scheduler monitor page', function (): void {
    $page = visit('/admin/filawarden/scheduler-monitor');

    $page->assertSee('Scheduled Tasks & Cron Monitor')
        ->assertNoJavaScriptErrors()
        ->screenshot(fullPage: false, filename: 'filawarden-scheduler-monitor');
});

test('browser can visit filawarden queue monitor page', function (): void {
    $page = visit('/admin/filawarden/queue-monitor');

    $page->assertSee('Queue & Background Jobs Monitor')
        ->assertNoJavaScriptErrors()
        ->screenshot(fullPage: false, filename: 'filawarden-queue-monitor');
});

test('browser can visit filawarden risk files page', function (): void {
    $page = visit('/admin/filawarden/risk-files');

    $page->assertSee('Dangerous & Risk File Scanner')
        ->assertNoJavaScriptErrors()
        ->screenshot(fullPage: false, filename: 'filawarden-risk-files');
});

test('browser can visit filawarden error logs page', function (): void {
    $page = visit('/admin/filawarden/error-logs');

    $page->assertSee('Application Log & Exception Reader')
        ->assertNoJavaScriptErrors()
        ->screenshot(fullPage: false, filename: 'filawarden-error-logs');
});

test('browser can visit filawarden ssl monitor page', function (): void {
    $page = visit('/admin/filawarden/ssl-monitor');

    $page->assertSee('SSL / TLS Certificate Sentinel')
        ->assertNoJavaScriptErrors()
        ->screenshot(fullPage: false, filename: 'filawarden-ssl-monitor');
});
