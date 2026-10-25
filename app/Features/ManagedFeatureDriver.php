<?php

declare(strict_types=1);

namespace App\Features;

use App\Models\FeatureAssignment;
use App\Models\User;
use Laravel\Pennant\Drivers\DatabaseDriver;

class ManagedFeatureDriver extends DatabaseDriver
{
    public function get(mixed $feature, mixed $scope): mixed
    {
        return app(FeatureEvaluator::class)->evaluate($feature, $scope instanceof User ? $scope : null)['active'];
    }

    public function getAll(mixed $features): array
    {
        $values = [];
        foreach ($features as $feature => $scopes) {
            $values[$feature] = array_map(fn ($scope) => $this->get($feature, $scope), $scopes);
        }

        return $values;
    }

    public function set(mixed $feature, mixed $scope, mixed $value): void
    {
        if ($scope instanceof User) {
            $flag = FeatureManifest::ensure($feature);
            FeatureAssignment::query()->updateOrCreate([
                'feature_flag_id' => $flag->id, 'user_id' => $scope->id, 'kind' => 'override',
            ], ['active' => (bool) $value]);
        }
    }

    public function setForAllScopes(mixed $feature, mixed $value): void
    {
        FeatureManifest::ensure($feature)->update(['enabled' => (bool) $value, 'default_value' => (bool) $value]);
    }

    public function delete(mixed $feature, mixed $scope): void
    {
        if ($scope instanceof User) {
            FeatureAssignment::query()->whereHas('featureFlag', fn ($query) => $query->where('key', $feature))
                ->where('user_id', $scope->id)->get()->each->delete();
        }
    }

    public function setAll(array $features): void
    {
        foreach ($features as $feature) {
            $this->set($feature['feature'], $feature['scope'], $feature['value']);
        }
    }

    public function purge(mixed $features): void
    {
        $query = FeatureAssignment::query()->where('kind', 'override');
        if ($features !== null) {
            $query->whereHas('featureFlag', fn ($query) => $query->whereIn('key', $features));
        }
        $query->get()->each->delete();
        parent::purge($features);
    }
}
