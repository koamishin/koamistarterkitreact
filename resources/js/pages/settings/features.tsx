import { Head, router } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Heading from '@/components/heading';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import BetaAccess from '@/components/beta-access';
import { update } from '@/actions/App/Http/Controllers/Settings/FeatureFlagsController';

type FeatureFlag = {
    key: string;
    name: string;
    description: string;
    value: boolean;
    available: boolean;
    stage: string;
    reason: string;
};

export default function Features({
    features,
    betaOptedIn,
}: {
    features: FeatureFlag[];
    betaOptedIn: boolean;
}) {
    const [pending, setPending] = useState<string | null>(null);

    const toggleFeature = (key: string, active: boolean) => {
        const feature = features.find((f) => f.key === key);

        if (feature && !feature.available) {
            toast.error('This feature is not available for your role');
            return;
        }

        setPending(key);
        router.patch(
            update.url(),
            { feature: key, active },
            {
                preserveScroll: true,
                onSuccess: () =>
                    toast.success(
                        `${features.find((f) => f.key === key)?.name || key} ${active ? 'enabled' : 'disabled'}`,
                    ),
                onError: (errors) => {
                    const message = (
                        errors as Record<string, string | undefined>
                    ).message;
                    if (message) {
                        toast.error(message);
                    } else {
                        toast.error('Failed to update feature setting');
                    }
                },
                onFinish: () => setPending(null),
            },
        );
    };

    const availableFeatures = features.filter((f) => f.available);
    const unavailableFeatures = features.filter((f) => !f.available);

    return (
        <>
            <Head title="Feature settings" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Your feature preferences"
                    description="Choose your experience within the features released to your account."
                />

                <BetaAccess enabled={betaOptedIn} />

                {availableFeatures.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2">
                        {availableFeatures.map((feature) => (
                            <div
                                key={feature.key}
                                className={cn(
                                    'rounded-lg border bg-card p-4 transition-all duration-200',
                                    feature.value
                                        ? 'border-green-500/30 dark:border-green-500/20'
                                        : 'border-border',
                                )}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1">
                                        <p className="leading-none font-medium">
                                            {feature.name}{' '}
                                            <span className="font-mono text-xs uppercase text-muted-foreground">
                                                {feature.stage}
                                            </span>
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {feature.description}
                                        </p>
                                        <div className="flex items-center gap-2 pt-2">
                                            <span
                                                className={cn(
                                                    'flex h-2 w-2 rounded-full',
                                                    feature.value
                                                        ? 'bg-green-500'
                                                        : 'bg-muted-foreground/30',
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    'text-xs font-medium',
                                                    feature.value
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : 'text-muted-foreground',
                                                )}
                                            >
                                                {feature.value
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                    <Switch
                                        aria-label={`Enable ${feature.name}`}
                                        checked={feature.value}
                                        disabled={pending === feature.key}
                                        onCheckedChange={(active: boolean) =>
                                            toggleFeature(feature.key, active)
                                        }
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {unavailableFeatures.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Unavailable Features
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {unavailableFeatures.map((feature) => (
                                <div
                                    key={feature.key}
                                    className="rounded-lg border border-border bg-card/50 p-4 opacity-60"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <p className="leading-none font-medium">
                                                {feature.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.description}
                                            </p>
                                            <div className="flex items-center gap-2 pt-2">
                                                <span className="flex h-2 w-2 rounded-full bg-muted-foreground/30" />
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    {feature.reason.replaceAll(
                                                        '_',
                                                        ' ',
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Info className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                About Feature Flags
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Feature flags allow you to control which
                                features are enabled for your account. Toggle
                                features on or off to customize your experience.
                                Availability depends on release stage, beta
                                enrollment, targeting, and rollout. Preferences
                                cannot override administrator restrictions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
