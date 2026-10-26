<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Models\FeatureFlag;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Carbon;
use Spatie\Activitylog\Models\Activity;

class SelfHostedVitalsOverviewWidget extends StatsOverviewWidget
{
    protected static bool $isLazy = false;

    protected static ?int $sort = 2;

    protected ?string $pollingInterval = '30s';

    protected function getStats(): array
    {
        $totalUsers = User::count();
        $verifiedUsers = User::whereNotNull('email_verified_at')->count();

        // 7-day registration trend
        $userTrend = [];
        for ($i = 6; $i >= 0; $i--) {
            $day = Carbon::today()->subDays($i);
            $userTrend[] = User::whereDate('created_at', $day)->count();
        }

        // MFA Adoption
        $mfaUsers = User::query()->where(function ($q): void {
            $q->whereNotNull('app_authentication_secret')
                ->orWhere('has_email_authentication', true)
                ->orWhereNotNull('two_factor_secret')
                ->orWhereHas('passkeys');
        })->count();
        $mfaPercent = $totalUsers > 0 ? (int) round(($mfaUsers / $totalUsers) * 100) : 0;

        // Activity Stats
        $todayActivities = Activity::whereDate('created_at', Carbon::today())->count();
        $totalActivities = Activity::count();

        // Activity trend over last 7 days
        $activityTrend = [];
        for ($i = 6; $i >= 0; $i--) {
            $day = Carbon::today()->subDays($i);
            $activityTrend[] = Activity::whereDate('created_at', $day)->count();
        }

        // Feature flags
        $activeFlags = FeatureFlag::where('enabled', true)->count();
        $totalFlags = FeatureFlag::count();

        return [
            Stat::make('Total Users', (string) $totalUsers)
                ->description("{$verifiedUsers} verified accounts")
                ->descriptionIcon('heroicon-m-check-badge')
                ->color('primary')
                ->chart($userTrend)
                ->icon('heroicon-o-users')
                ->url(route('filament.admin.resources.users.index')),

            Stat::make('Security & MFA', "{$mfaPercent}%")
                ->description("{$mfaUsers} of {$totalUsers} with 2FA / Passkeys")
                ->descriptionIcon('heroicon-m-shield-check')
                ->color($mfaPercent > 50 ? 'success' : ($mfaPercent > 0 ? 'warning' : 'gray'))
                ->icon('heroicon-o-finger-print'),

            Stat::make('System Audit Events', (string) $totalActivities)
                ->description("{$todayActivities} events recorded today")
                ->descriptionIcon('heroicon-m-clock')
                ->color('info')
                ->chart($activityTrend)
                ->icon('heroicon-o-clipboard-document-list')
                ->url(route('filament.admin.resources.activity-logs.index')),

            Stat::make('Feature Flags', "{$activeFlags} / {$totalFlags}")
                ->description('Dynamic toggles active')
                ->descriptionIcon('heroicon-m-flag')
                ->color($activeFlags > 0 ? 'success' : 'gray')
                ->icon('heroicon-o-adjustments-horizontal')
                ->url(route('filament.admin.resources.feature-flag.feature-flags.index')),
        ];
    }
}
