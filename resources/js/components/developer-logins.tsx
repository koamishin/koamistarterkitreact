import { router } from '@inertiajs/react';
import { ArrowRight, Code2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { developerLogin } from '@/routes';

export type DeveloperUser = {
    id: number;
    name: string;
    email: string;
    role: string;
};

interface DeveloperLoginsProps {
    users?: DeveloperUser[];
}

export default function DeveloperLogins({ users }: DeveloperLoginsProps) {
    const [submittingEmail, setSubmittingEmail] = useState<string | null>(null);

    const devUsers = users ?? [];

    if (devUsers.length === 0) {
        return null;
    }

    const handleQuickLogin = (email: string) => {
        setSubmittingEmail(email);

        router.post(
            developerLogin.url(),
            { email },
            {
                onFinish: () => setSubmittingEmail(null),
            },
        );
    };

    return (
        <div className="space-y-3">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span
                        className="w-full border-t border-dashed border-border"
                        aria-hidden="true"
                    />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="flex items-center gap-1.5 bg-background px-2 font-mono text-[11px] text-muted-foreground">
                        <Code2 className="h-3.5 w-3.5 text-amber-500" />
                        Quick Developer Login
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {devUsers.map((user) => (
                    <button
                        key={user.id}
                        type="button"
                        onClick={() => handleQuickLogin(user.email)}
                        disabled={submittingEmail !== null}
                        className="flex items-center justify-between rounded-lg border border-dashed border-amber-500/30 bg-amber-500/5 px-3 py-2 text-left text-sm transition-colors hover:border-amber-500/50 hover:bg-amber-500/10 disabled:pointer-events-none disabled:opacity-50 dark:border-amber-500/20 dark:bg-amber-500/5 dark:hover:bg-amber-500/10"
                        data-test={`developer-login-${user.id}`}
                    >
                        <div className="flex min-w-0 flex-col pr-2">
                            <span className="truncate font-medium text-foreground">
                                {user.name}
                            </span>
                            <span className="truncate font-mono text-xs text-muted-foreground">
                                {user.email}
                            </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            <Badge
                                variant="outline"
                                className="border-amber-500/40 font-mono text-[10px] text-amber-600 dark:text-amber-400"
                            >
                                {user.role}
                            </Badge>
                            {submittingEmail === user.email ? (
                                <Spinner className="h-4 w-4" />
                            ) : (
                                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
