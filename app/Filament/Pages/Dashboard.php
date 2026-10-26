<?php

declare(strict_types=1);

namespace App\Filament\Pages;

use App\Filament\Widgets\RecentActivityWidget;
use App\Filament\Widgets\SelfHostedHealthWidget;
use App\Filament\Widgets\SelfHostedQuickActionsWidget;
use App\Filament\Widgets\SelfHostedVitalsOverviewWidget;
use App\Filament\Widgets\UserGrowthChartWidget;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\Widget;
use Filament\Widgets\WidgetConfiguration;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Facades\Artisan;
use Throwable;

class Dashboard extends BaseDashboard
{
    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedSquares2x2;

    #[\Override]
    public function getTitle(): string|Htmlable
    {
        return 'Self-Hosted Control Center';
    }

    #[\Override]
    public function getSubheading(): string|Htmlable|null
    {
        return 'System health, real-time node telemetry, and instance controls';
    }

    /**
     * @return int | array<string, ?int>
     */
    #[\Override]
    public function getColumns(): int|array
    {
        return [
            'default' => 1,
            'md' => 2,
            'lg' => 3,
        ];
    }

    /**
     * @return array<class-string<Widget> | WidgetConfiguration>
     */
    #[\Override]
    public function getWidgets(): array
    {
        return [
            SelfHostedHealthWidget::class,
            SelfHostedVitalsOverviewWidget::class,
            SelfHostedQuickActionsWidget::class,
            UserGrowthChartWidget::class,
            RecentActivityWidget::class,
        ];
    }

    /**
     * @return array<Action>
     */
    #[\Override]
    protected function getHeaderActions(): array
    {
        return [
            Action::make('flushCache')
                ->label('Flush Caches')
                ->icon('heroicon-o-arrow-path')
                ->color('gray')
                ->requiresConfirmation()
                ->modalHeading('Flush Application Caches?')
                ->modalDescription('This will clear framework cache, configuration cache, route cache, and compiled Blade views.')
                ->action(function (): void {
                    try {
                        Artisan::call('cache:clear');
                        Artisan::call('config:clear');
                        Artisan::call('route:clear');
                        Artisan::call('view:clear');

                        Notification::make()
                            ->title('All Caches Flushed')
                            ->body('Application, config, and view caches cleared successfully.')
                            ->success()
                            ->send();
                    } catch (Throwable $e) {
                        Notification::make()
                            ->title('Cache Flush Failed')
                            ->body($e->getMessage())
                            ->danger()
                            ->send();
                    }
                }),

            Action::make('diagnostics')
                ->label('Diagnostics')
                ->icon('heroicon-o-information-circle')
                ->color('gray')
                ->modalHeading('Self-Hosted Instance Diagnostics')
                ->modalDescription('Environment and server configuration snapshot')
                ->modalSubmitAction(false)
                ->modalCancelActionLabel('Close')
                ->modalContent(view('filament.pages.diagnostics-modal', [
                    'phpVersion' => PHP_VERSION,
                    'laravelVersion' => app()->version(),
                    'os' => php_uname('s').' '.php_uname('r').' ('.php_uname('m').')',
                    'memoryLimit' => ini_get('memory_limit'),
                    'maxExecutionTime' => ini_get('max_execution_time').'s',
                    'uploadMaxFilesize' => ini_get('upload_max_filesize'),
                    'postMaxSize' => ini_get('post_max_size'),
                    'opcacheEnabled' => function_exists('opcache_get_status') && ! empty(opcache_get_status()['opcache_enabled']),
                    'extensions' => get_loaded_extensions(),
                    'dbDriver' => config('database.default'),
                    'cacheDriver' => config('cache.default'),
                    'queueDriver' => config('queue.default'),
                ])),

            Action::make('settings')
                ->label('Instance Settings')
                ->icon('heroicon-o-cog-6-tooth')
                ->color('primary')
                ->url(route('filament.admin.settings.pages.application-details-settings-page')),
        ];
    }
}
