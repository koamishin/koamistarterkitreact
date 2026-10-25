<div align="center">
  <a href="https://github.com/koamishin/KoamiStarterKit">
    <!-- Replace with actual logo URL if available, or keep using the text/emoji representation -->
    <img src="public/koamishin-logo.svg" alt="Logo" width="300" height="auto">
  </a>

  <h1 align="center">Koamishin Starterkit</h1>

  <p align="center">
    <strong>The Opinionated Laravel Starter Kit for Modern Artisans</strong>
  </p>

  <p align="center">
    <a href="https://laravel.com"><img src="https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel" alt="Laravel 13" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" /></a>
    <a href="https://inertiajs.com"><img src="https://img.shields.io/badge/Inertia-v3-9553E9?style=for-the-badge&logo=inertia" alt="Inertia v3" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind 4" /></a>
    <a href="https://ui.shadcn.com"><img src="https://img.shields.io/badge/Shadcn-UI-000000?style=for-the-badge&logo=shadcnui" alt="Shadcn UI" /></a>
  </p>
</div>

<br/>

## 🚀 Why This Exists?

I've tried different starter kits—including the official Laravel starter kits. They're great, no doubt about it. But every time I started a new project, I found myself doing the same ritual over and over:

- Setting up authentication and user management
- Installing and configuring Filament for the admin panel
- Wiring up roles and permissions
- Adding activity logs, notifications, impersonation
- Setting up development dependencies, linters, and CI/CD

It wasn't a huge deal, but it added up. Hours lost on configuration instead of building actual features.

**So I built Koamishin Starterkit for myself.** One command, zero friction, and I'm straight into shipping features instead of fighting config files.

> **Note**: This starter kit is configured for **specific applications** rather than SaaS products. I don't primarily build SaaS applications, so the architecture and features reflect that use case. If I start working on SaaS-based projects in the future, I'll update this to support those needs.

---

## 🎯 Who Is This For?

This starter kit is for developers who:

- Want to skip the initial setup phase and get straight to building features
- Work on custom applications rather than multi-tenant SaaS products
- Appreciate having authentication, admin panels, and user management ready out of the box
- Prefer a curated, opinionated setup over making endless configuration decisions

Use it as-is, fork it, or cherry-pick the parts you like—whatever gets you coding faster.

## ✨ Features

**Battery-included, but not bloated.** Everything you need to ship.

- **🔐 Complete Authentication**: Powered by **Fortify**. Login, Registration, 2FA, Email Verification, Passkeys, and Profile Management ready to go.
- **⚡ Developer Quick Login**: One-click developer authentication on the login page in `local` environment (`APP_ENV=local`). Instantly sign in as seeded accounts (Super Admin, User) without typing credentials. Strictly disabled (returns 404) in non-local environments.
- **🤖 Laravel AI SDK & MCP**: Integrated **laravel/ai** and **laravel/mcp** with dynamic configuration via Filament Settings. Supports 10+ providers (OpenAI, Anthropic, Gemini, Groq, Ollama, xAI, DeepSeek, Mistral, OpenRouter, and custom endpoints) and connects external Model Context Protocol (MCP) servers.
- **🔑 Social Login**: Login with **GitHub**, **Google**, or **Facebook** via Laravel Socialite. Configure credentials through the admin panel (stored in DB or `.env`).
- **📦 Modular Architecture**: Built on **nwidart/laravel-modules** — extend with self-contained modules that register their own routes, Filament resources, and Inertia pages.
- **👥 Roles & Permissions**: Built-in **Spatie Permissions**. Manage **Admins** (Filament access) and **Users** (Inertia access) out of the box.
- **⚙️ System Settings**: Powerful settings management with **spatie/laravel-settings**. Configure application details, features, social login, and security through a beautiful Filament interface.
- **🎨 Auth Layout Switcher**: Choose between 3 beautiful authentication layouts (Simple, Card, Split) directly from the admin settings panel.
- **⌨️ User Activity Logs** Included with Activity Logs filament plugin to monitor user activities on the application
- **🕵️‍♂️ User Impersonation**: Admins can easily impersonate users to troubleshoot issues, with a visible banner and quick "Leave" action.
- **🔔 Database Notifications**: Built-in notification system with a bell icon in the sidebar header. Shows unread count, dropdown list, and mark as read functionality.
- **🎛️ Admin Panel**: Pre-configured **Filament** admin dashboard with User Management.
- **🎨 40+ UI Components**: Beautiful, accessible components from **Shadcn UI (React)**, plus dark mode and multiple themes (Default, Rose, Ocean, Sage Garden, Claude).
- **🛠️ Type-Safe Routing**: **Wayfinder** ensures your frontend knows your backend routes. No more broken links.
- **⚡ High Performance**: **Laravel Octane** + **Inertia.js v3** + **Vite** for instant page loads.
- **🚢 Production Ready**: **Docker** support, **GitHub Actions** CI/CD, and strict code quality tools (Pint, PHPStan, Rector) pre-configured.

---

## 🏁 Getting Started

### Prerequisites

- PHP 8.2+
- Composer
- Node.js & NPM/Bun

### Installation

You can create a new project using Composer:

```bash
composer create-project koamishin/koamistarterkit my-app
cd my-app
```

Or use laravel new command:

```bash
laravel new my-app --using=koamishin/koamistarterkit
```

### ⚙️ Setup & Configuration

Once installed, personalize the starter kit with your own project details using our setup wizard:

```bash
php artisan setup:starter-kit
```

This interactive tool will:

- 🎨 **Personalize** `composer.json` with your author and package details.
- 🐳 **Configure Docker** settings (Docker Hub vs GHCR).
- 🤖 **Update GitHub Actions** workflows to use your repository and registry.

> **Fresh install?** `composer create-project` runs the wizard once with safe
> defaults so it never blocks. Re-run `php artisan setup:starter-kit`
> afterwards to personalize — it's safe to re-run anytime.

Every question also has a CLI flag for unattended/scripted setups:

```bash
php artisan setup:starter-kit \
  --github=my-org \
  --name=my-app \
  --author="Jane Doe" \
  --email=jane@example.com \
  --docker \
  --registry=ghcr \
  --strategy=rolling \
  --install \
  --create-repo \
  --push \
  --force
```

The wizard can also **create the GitHub repository for you** — via the `gh`
CLI when you're signed in (`gh auth login`), or a personal access token
(`--github-token`, or `GH_TOKEN`/`GITHUB_TOKEN` env). Otherwise it prints a
one-click manual fallback link. `--push` uploads the initial commit.

Run `php artisan setup:starter-kit --help` for all options.

### Development

Start the development server with one simple command:

```bash
composer run dev
```

This runs both the Laravel server and the Vite development server concurrently.

---

## 📦 What's Inside?

### UI Components (Shadcn)

This starter kit includes a comprehensive suite of UI components to jumpstart your development:

<details>
<summary><strong>Click to view all included components</strong></summary>

- **Form Elements**: Input, Select, Checkbox, Radio, Switch, Slider, Textarea, Form, Combobox
- **Feedback**: Alert, Badge, Progress, Skeleton, Sonner (Toast), Spinner, Tooltip
- **Overlay**: Dialog, Drawer, Sheet, Popover, Hover Card, Context Menu, Dropdown Menu
- **Layout**: Card, Aspect Ratio, Resizable, Scroll Area, Separator
- **Navigation**: Sidebar, Navigation Menu, Breadcrumb, Tabs, Menubar, Pagination, Stepper
- **Data Display**: Table, Avatar, Accordion, Collapsible, Carousel, Calendar
- **Charts**: Extensive charting library support

</details>

---

## 🔔 Using Notifications

This starter kit includes a database notification system integrated into the sidebar header. Users can view and manage their notifications from the bell icon.

### Sending Notifications

Send notifications to users using Laravel's notification system:

```php
use App\Models\User;
use App\Notifications\YourNotification;

$user->notify(new YourNotification());
```

### Creating Notifications

Create a new notification class:

```bash
php artisan make:notification YourNotification
```

In your notification class, define the database channel:

```php
public function via(object $notifiable): array
{
    return ['database'];
}

public function toArray(object $notifiable): array
{
    return [
        'title' => 'Notification Title',
        'message' => 'Your notification message here',
        'action_url' => '/optional-action-url',
    ];
}
```

---

## ⚙️ System Settings

This starter kit includes a comprehensive settings management system powered by **spatie/laravel-settings** with a beautiful Filament interface.

### Settings Sections

The settings are organized into logical sections accessible from the admin panel at `/admin/settings`:

<details>
<summary><strong>Application Details</strong></summary>

Configure your application's identity and display settings:

- **Site Information**: Name, description, logo URL, favicon URL
- **Date & Time**: Timezone, date format, time format
- **Contact**: Contact email, support URL

</details>

<details>
<summary><strong>Application Features</strong></summary>

Toggle application features on or off:

- **Authentication Features**: User registration, email verification, 2FA, password reset
- **User Management**: User impersonation, default role for new users
- **System Features**: Activity logging, notifications
- **Auth Layout**: Choose between Simple, Card, or Split layout for authentication pages

</details>

<details>
<summary><strong>Application Security</strong></summary>

Configure security policies:

- **Password Policy**: Minimum length, require uppercase/lowercase/numbers/symbols
- **Session Settings**: Session lifetime, single session per user
- **Login Protection**: Rate limiting attempts, lockout duration

</details>

<details>
<summary><strong>Social Login</strong></summary>

Configure OAuth providers for social authentication:

- **GitHub**: Enable/disable, client ID, client secret, redirect URI
- **Google**: Enable/disable, client ID, client secret, redirect URI
- **Facebook**: Enable/disable, client ID, client secret, redirect URI

Each provider shows whether it's using environment variables or database-stored credentials.

</details>

### Auth Layout Switcher

Choose from three beautiful authentication layouts directly from the settings panel:

| Layout     | Description                                  |
| ---------- | -------------------------------------------- |
| **Simple** | Clean, centered layout with minimal styling  |
| **Card**   | Form wrapped in a card component with shadow |
| **Split**  | Side-by-side layout with branding panel      |

The layout selection is instant and applies to all authentication pages (login, register, password reset).

### Social Login

Social login is managed through the **Social Login** settings page in the admin panel (`/admin/settings`). Supports GitHub, Google, and Facebook.

#### Configuration

Credentials can be set in two ways, with `.env` taking precedence:

1. **Environment variables** (recommended for production):
```env
GITHUB_CLIENT_ID=your-id
GITHUB_CLIENT_SECRET=your-secret
GOOGLE_CLIENT_ID=your-id
GOOGLE_CLIENT_SECRET=your-secret
FACEBOOK_CLIENT_ID=your-id
FACEBOOK_CLIENT_SECRET=your-secret
```

2. **Database settings** (via the Filament admin panel) — stored in the `social_login` settings group. Falls back to these when `.env` values are empty.

#### Linking Behavior

| Scenario | Behavior |
|---|---|
| New provider ID | Creates a new user and social account. Email is auto-verified. |
| Existing social account | Logs in the linked user, updates profile data. |
| Matching verified email | Auto-links the social account to the existing verified user. |
| Matching unverified email | Returns 409 — user must verify their email first. |
| Disabled provider | Redirects to login with an error message. |

#### Code

```php
use App\Enums\SocialLoginProvider;
use App\Settings\SocialLoginSettings;

$settings = app(SocialLoginSettings::class);

// Check if a provider is enabled
if ($settings->isProviderEnabled(SocialLoginProvider::Github)) {
    // Show GitHub login button
}

// Resolve credentials (env wins over stored settings)
$creds = $settings->resolveCredentials(SocialLoginProvider::Google);
```

---

### Passkeys (WebAuthn)

Passkey authentication is available on both the **admin panel** (Filament) and the **frontend** (Inertia login page). Users can register passkeys from their profile settings.

Passkeys are device-bound ("phone-as-passkey" style) and use the browser's native WebAuthn API. Login with a passkey requires only biometrics or device PIN — no password needed.

#### Frontend Usage

The passkey sign-in button appears automatically on the login page when the feature is enabled. Users can manage passkeys from their security settings.

#### Configuration

```env
# Config is handled via the admin Application Features settings page
# and the config/passkeys.php file
```

---

### ⚡ Developer Quick Login (Local Environment)

In local development (`APP_ENV=local`), the login screen automatically renders a **Quick Developer Login** panel. Developers can click any seeded account to authenticate instantly with one click without entering passwords or passing MFA challenges:

- **Admin User** (`admin@admin.com`) — `Super Admin` role with full Filament admin panel access
- **Regular User** (`user@user.com`) — `User` role for Inertia frontend testing
- Default password for manual login: `password`

> **Security**: The developer login route (`/developer-login`) and login panel are strictly gated by `app()->environment('local')`. In testing, staging, and production environments, the endpoint unconditionally returns `404 Not Found`, and no developer accounts are exposed to the frontend.

---

### 🤖 Laravel AI SDK & Model Context Protocol (MCP)

This starter kit includes first-party integration with **laravel/ai** and **laravel/mcp**, completely configurable at runtime through the Filament admin panel under **Settings > AI & MCP**.

#### Features

- **Dynamic Provider Selection**: Switch between 10+ providers (OpenAI, Anthropic, Google Gemini, Groq, xAI, DeepSeek, Mistral, OpenRouter, Ollama, and OpenAI-compatible endpoints) without touching `.env`.
- **Precedence**: Environment variables (e.g. `OPENAI_API_KEY`) automatically take precedence over database-stored values when present.
- **Model Context Protocol (MCP) Tools**: Connect external MCP servers (remote HTTP or local CLI commands) to dynamically feed tools to AI agents.
- **Built-in Assistant**: Pre-configured `ApplicationAgent` exposing application information and connected MCP tools.
- **Test Connection Action**: Verify credentials and provider responses directly from the Filament settings interface.
- **CLI Prompting**: Test and query the assistant via Artisan:

```bash
php artisan ai:ask "What is this application about?"
```

---

### Accessing Settings in Code

```php
use App\Settings\ApplicationFeaturesSettings;

// Get settings instance
$settings = app(ApplicationFeaturesSettings::class);

// Access individual settings
if ($settings->registration_enabled) {
    // Allow registration
}

// Update settings
$settings->auth_layout = 'card';
$settings->save();
```

---

## Feature management and beta releases

Feature Management in Filament replaces the old role-toggle screen. Super admins can create and edit permanent feature keys, assign owners and tags, target audiences, stage rollouts, explain individual access, inspect audit history, and restore fields from a previous change.

Regression coverage includes backend/Filament workflows and Chromium browser tests for profile enrollment, revocation, mobile layout, and the admin definition editor. After installing development dependencies, run `npx playwright install chromium`, `npm run build`, and `php artisan test --compact`. Browser tests intentionally load built assets instead of the running Vite dev server.

### Lifecycle and distribution

- **Draft**: never delivered, even with a user override.
- **Beta**: delivered only to users who explicitly enrolled in early access from **Settings > Profile**. Users can leave anytime.
- **Stable**: no beta enrollment required; other rollout restrictions still apply.
- **Archived**: inactive, retained for history and cleanup.

Delivery controls include an immediate kill switch, environment restrictions, start/end windows, role audiences, exact email-domain/user-ID/verified-email rules, and deterministic percentage rollouts. All targeting rules must match. Raising a percentage retains the existing cohort for the same feature key and user ID. Guests use one shared anonymous cohort, not per-browser identities.

The kill switch, draft/archive status, environment, schedule, beta consent, and explicit role denies take precedence over user overrides. A force-on user override bypasses targeting and percentage rollout, but cannot bypass those safety gates. Conflicting role overrides use **deny wins**.

**User preferences are separate from administrator overrides.** Only flags marked **Allow user preferences** appear in account feature settings. Users cannot grant themselves protected features or bypass targeting. Existing built-in feature defaults and role settings remain supported; legacy Pennant values are read only for user-controllable preferences. The old `beta-features` key now reflects explicit beta enrollment, rather than granting beta access itself.

### Setup and release workflow

```bash
php artisan migrate --no-interaction
php artisan features:manifest sync
```

The default Pennant store is now `managed`. If your environment explicitly sets `PENNANT_STORE=database` or `array`, change it to `PENNANT_STORE=managed` to use rollout evaluation through Pennant. Restart long-running workers after deployment. Definitions and assignments are loaded per request, with no user-specific static cache.

1. Ship code guarded by a permanent feature key.
2. Create its definition in Filament; choose Beta, enable delivery, set the default value, and select an audience/percentage.
3. Assign an exact release version, such as `2.0.0`.
4. Promote that release from Filament or deployment automation:

```bash
php artisan features:release 2.0.0
```

Promotion changes matching **Beta** definitions to **Stable**. It deliberately preserves kill switches, default values, schedules, audiences, and rollout percentages. Set rollout to 100%, default value to on, and clear audience restrictions separately when ready for general availability. Promotion is explicit; a deployment alone does not silently release features.

### Guard application code

```php
use App\Features\FeatureRegistry;
use Laravel\Pennant\Feature;

$enabled = FeatureRegistry::isEnabledForUser($user, 'new-search');
$enabled = Feature::for($user)->active('new-search');

Route::get('/new-search', SearchController::class)
    ->middleware(['auth', 'feature:new-search']);
```

The `feature` middleware returns 404 when access is unavailable. Feature access is not a replacement for model authorization or permission checks.

```tsx
import { useFeature } from '@/hooks/use-feature';

const showNewSearch = useFeature('new-search');
```

Inertia shares only evaluated boolean flags, not audience rules or per-user assignments. Hiding frontend controls is not security: protect the matching backend operation too.

### Portable feature manifests

```bash
php artisan features:manifest export features.json
php artisan features:manifest import features.json
# Explicitly replace definitions that already exist:
php artisan features:manifest import features.json --overwrite
```

Filament also supports JSON import/export. Manifests use `schema_version: 1`, are validated before a transactional import, and skip existing definitions unless overwrite is selected. Code-definition sync is idempotent and never resets administrator rollout settings. Database seeding also syncs built-in definitions.

Manifests contain definition configuration, including any targeting user IDs or email domains you configured. They exclude per-user overrides, preferences, and beta enrollment. Review targeting data before distributing a manifest, especially between unrelated databases. Import never deletes definitions absent from the manifest.

Configuration changes, overrides, role settings, and beta consent changes use the existing activity log. The feature-specific history shows configuration and override changes; beta enrollment changes remain in the user activity log. Audit history is bounded to the latest 50 matching entries per view.

This is a self-hosted boolean release-management system. It does not provide multivariate experiments, statistical A/B analysis, or remote client SDK streaming.

---

## 📦 Modular Architecture (nwidart/laravel-modules)

This starter kit supports a modular architecture via **nwidart/laravel-modules**. Modules live in the `Modules/` directory and are self-contained units with their own models, controllers, routes, Filament resources, frontend pages, and tests.

### Included Module: Blog

A fully-functional blog module is included as a reference implementation. It demonstrates:

- **Filament Resource** — CRUD for blog posts in the admin panel
- **Inertia Page** — Public blog post listing at `/blog`
- **Module Routes** — Registered automatically when the module is enabled
- **Module Tests** — Feature, unit, and Filament tests packaged with the module

### Creating a New Module

```bash
php artisan module:make MyModule
```

This scaffolds a new module in `Modules/MyModule/` with providers, routing, and configuration files. The module's Inertia pages are auto-discovered (place them in `resources/js/pages/`) and Filament resources are registered via a plugin class:

```php
class MyModulePlugin implements Plugin
{
    public function register(Panel $panel): void
    {
        $panel->discoverResources(
            in: __DIR__.'/Filament/Resources',
            for: 'Modules\\MyModule\\Filament\\Resources',
        );
    }
}
```

Modules are enabled/disabled in `modules_statuses.json` and via `php artisan module:enable` / `php artisan module:disable`.

---

## 🤝 Contributing

This is a community-friendly project. If you find a bug or have an idea for an improvement, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <p>Built with ❤️ by Koamishin</p>
</div>
