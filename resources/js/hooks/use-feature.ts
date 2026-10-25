import { usePage } from '@inertiajs/react';

export function useFeature(key: string): boolean {
    const { featureFlags } = usePage<{
        featureFlags: Record<string, boolean>;
    }>().props;

    return featureFlags?.[key] === true;
}
