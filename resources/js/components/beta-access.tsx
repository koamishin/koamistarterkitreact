import { useForm } from '@inertiajs/react';
import { FlaskConical } from 'lucide-react';
import { update } from '@/actions/App/Http/Controllers/Settings/BetaAccessController';
import InputError from '@/components/input-error';
import { Switch } from '@/components/ui/switch';

export default function BetaAccess({ enabled }: { enabled: boolean }) {
    const form = useForm({ enabled });

    return (
        <section
            className="rounded-xl border border-border bg-card p-5"
            aria-labelledby="beta-access-title"
        >
            <div className="flex items-start justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <FlaskConical
                            className="size-4 text-amber-600 dark:text-amber-400"
                            aria-hidden="true"
                        />
                        <h2 id="beta-access-title" className="font-medium">
                            Early access program
                        </h2>
                        <span className="rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide">
                            Beta
                        </span>
                    </div>
                    <p className="max-w-lg text-sm text-muted-foreground">
                        Try upcoming features before their stable release.
                        Experimental features may change. You can leave anytime;
                        stable features stay available.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {enabled
                            ? 'Enrolled in beta · Eligible features appear automatically'
                            : 'Stable experience · Beta features remain off'}
                    </p>
                </div>
                <Switch
                    aria-label="Opt in to beta access"
                    checked={enabled}
                    disabled={form.processing}
                    onCheckedChange={(value) => {
                        form.transform(() => ({ enabled: value }));
                        form.patch(update.url(), { preserveScroll: true });
                    }}
                />
            </div>
            <InputError message={form.errors.enabled} className="mt-2" />
        </section>
    );
}
