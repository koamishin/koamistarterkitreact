import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import {
    CheckCircle2,
    XCircle,
    Server,
    Shield,
    Sliders,
    ArrowRight,
    ArrowLeft,
    Check,
    Loader2,
} from 'lucide-react';

interface Requirement {
    name: string;
    current: string;
    satisfied: boolean;
}

interface Props {
    requirements: Record<string, Requirement>;
    defaultSiteName: string;
    timezones: string[];
    systemTimezone: string;
}

export default function Setup({
    requirements,
    defaultSiteName,
    timezones,
    systemTimezone,
}: Props) {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const { data, setData, post, processing, errors } = useForm({
        site_name: defaultSiteName,
        site_description: 'Self-hosted application instance',
        timezone: systemTimezone || 'UTC',
        admin_name: '',
        admin_email: '',
        admin_password: '',
        admin_password_confirmation: '',
    });

    const allSatisfied = Object.values(requirements).every(
        (req) => req.satisfied,
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/setup');
    };

    return (
        <>
            <Head title="Self-Hosted Setup Wizard" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 lg:p-8 text-foreground">
                <div className="w-full max-w-2xl">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                            <Server className="h-6 w-6" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Self-Hosted Setup Wizard
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Configure your instance and initialize the first
                            Super Admin account.
                        </p>
                    </div>

                    {/* Step Tracker */}
                    <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
                        <div className="flex items-center gap-2">
                            <span
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                                    step >= 1
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                }`}
                            >
                                1
                            </span>
                            <span className="text-sm font-medium">
                                Readiness
                            </span>
                        </div>
                        <div className="h-0.5 flex-1 mx-4 bg-border" />
                        <div className="flex items-center gap-2">
                            <span
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                                    step >= 2
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                }`}
                            >
                                2
                            </span>
                            <span className="text-sm font-medium">
                                Instance
                            </span>
                        </div>
                        <div className="h-0.5 flex-1 mx-4 bg-border" />
                        <div className="flex items-center gap-2">
                            <span
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                                    step === 3
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                }`}
                            >
                                3
                            </span>
                            <span className="text-sm font-medium">
                                Super Admin
                            </span>
                        </div>
                    </div>

                    {/* Step 1: System Readiness */}
                    {step === 1 && (
                        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-2">
                                <Sliders className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">
                                    Environment & System Checks
                                </h2>
                            </div>
                            <p className="mb-4 text-xs text-muted-foreground">
                                Verify that your server meets the operational
                                requirements before initializing the instance.
                            </p>

                            <div className="space-y-3">
                                {Object.entries(requirements).map(
                                    ([key, req]) => (
                                        <div
                                            key={key}
                                            className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 text-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                {req.satisfied ? (
                                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                                                ) : (
                                                    <XCircle className="h-5 w-5 text-rose-500 shrink-0" />
                                                )}
                                                <span className="font-medium">
                                                    {req.name}
                                                </span>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-mono">
                                                {req.current}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button
                                    type="button"
                                    disabled={!allSatisfied}
                                    onClick={() => setStep(2)}
                                    className="gap-2"
                                >
                                    Continue to Instance Setup
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2 & 3 Form */}
                    {step > 1 && (
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-xl border border-border bg-card p-6 shadow-sm"
                        >
                            {step === 2 && (
                                <div className="space-y-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <Sliders className="h-5 w-5 text-primary" />
                                        <h2 className="text-lg font-semibold">
                                            Instance Details
                                        </h2>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-4">
                                        Configure public identification and time
                                        display.
                                    </p>

                                    <div>
                                        <Label htmlFor="site_name">
                                            Site Name
                                        </Label>
                                        <Input
                                            id="site_name"
                                            value={data.site_name}
                                            onChange={(e) =>
                                                setData(
                                                    'site_name',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            className="mt-1"
                                            placeholder="My Awesome App"
                                        />
                                        <InputError
                                            message={errors.site_name}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="site_description">
                                            Site Description
                                        </Label>
                                        <Input
                                            id="site_description"
                                            value={data.site_description}
                                            onChange={(e) =>
                                                setData(
                                                    'site_description',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1"
                                            placeholder="Describe your self-hosted instance"
                                        />
                                        <InputError
                                            message={errors.site_description}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="timezone">
                                            Default Timezone
                                        </Label>
                                        <select
                                            id="timezone"
                                            value={data.timezone}
                                            onChange={(e) =>
                                                setData(
                                                    'timezone',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                        >
                                            {timezones.map((tz) => (
                                                <option
                                                    key={tz}
                                                    value={tz}
                                                    className="bg-popover text-popover-foreground"
                                                >
                                                    {tz}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.timezone}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="mt-6 flex justify-between pt-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(1)}
                                            className="gap-2"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                            Back
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => setStep(3)}
                                            className="gap-2"
                                        >
                                            Next: Create Super Admin
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-primary" />
                                        <h2 className="text-lg font-semibold">
                                            Super Admin Account
                                        </h2>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-4">
                                        This account will hold absolute
                                        administrative control over the
                                        instance.
                                    </p>

                                    <div>
                                        <Label htmlFor="admin_name">
                                            Full Name
                                        </Label>
                                        <Input
                                            id="admin_name"
                                            value={data.admin_name}
                                            onChange={(e) =>
                                                setData(
                                                    'admin_name',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            className="mt-1"
                                            placeholder="Admin Operator"
                                        />
                                        <InputError
                                            message={errors.admin_name}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="admin_email">
                                            Email Address
                                        </Label>
                                        <Input
                                            id="admin_email"
                                            type="email"
                                            value={data.admin_email}
                                            onChange={(e) =>
                                                setData(
                                                    'admin_email',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            className="mt-1"
                                            placeholder="admin@example.com"
                                        />
                                        <InputError
                                            message={errors.admin_email}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="admin_password">
                                                Password
                                            </Label>
                                            <Input
                                                id="admin_password"
                                                type="password"
                                                value={data.admin_password}
                                                onChange={(e) =>
                                                    setData(
                                                        'admin_password',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                className="mt-1"
                                                placeholder="Minimum 8 characters"
                                            />
                                            <InputError
                                                message={errors.admin_password}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="admin_password_confirmation">
                                                Confirm Password
                                            </Label>
                                            <Input
                                                id="admin_password_confirmation"
                                                type="password"
                                                value={
                                                    data.admin_password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'admin_password_confirmation',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                className="mt-1"
                                                placeholder="Re-enter password"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-between pt-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(2)}
                                            disabled={processing}
                                            className="gap-2"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="gap-2"
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Initializing Instance...
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="h-4 w-4" />
                                                    Complete Setup & Launch
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
