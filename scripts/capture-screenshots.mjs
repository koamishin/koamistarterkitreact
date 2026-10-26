import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('docs/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'dark',
  });

  const page = await context.newPage();

  // 1. Welcome page
  console.log('Capturing welcome page...');
  await page.goto('http://127.0.0.1:8000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'welcome.png'), fullPage: false });

  // 2. Login page
  console.log('Capturing login page...');
  await page.goto('http://127.0.0.1:8000/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'login.png'), fullPage: false });

  // Quick Developer Login to authenticate as Super Admin
  console.log('Logging in as super admin...');
  // Click "Super Admin" quick login if available, or fill credentials
  const devAdminBtn = page.locator('text=Super Admin').first();
  if (await devAdminBtn.isVisible()) {
    await devAdminBtn.click();
    await page.waitForURL('**/dashboard', { timeout: 8000 }).catch(() => {});
  } else {
    await page.fill('input[type="email"], input[name="email"]', 'admin@admin.com');
    await page.fill('input[type="password"], input[name="password"]', 'password');
    await page.press('input[type="password"], input[name="password"]', 'Enter');
    await page.waitForURL('**/dashboard', { timeout: 8000 }).catch(() => {});
  }
  await page.waitForTimeout(1500);

  // 3. User Settings / Profile
  console.log('Capturing user settings...');
  await page.goto('http://127.0.0.1:8000/settings/profile', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'user-profile.png'), fullPage: false });

  // 4. Filament Admin Login / Dashboard
  console.log('Navigating to Filament Admin...');
  await page.goto('http://127.0.0.1:8000/admin', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // If redirect to admin/login, log in there
  if (page.url().includes('/admin/login')) {
    console.log('Logging in on /admin/login...');
    await page.fill('input[type="email"], input[name="email"], input[id*="email"]', 'admin@admin.com');
    await page.fill('input[type="password"], input[name="password"], input[id*="password"]', 'password');
    await page.press('input[type="password"], input[name="password"], input[id*="password"]', 'Enter');
    await page.waitForURL('**/admin', { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(1500);
  }

  // Admin Dashboard
  console.log('Capturing admin dashboard...');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outDir, 'admin-dashboard.png'), fullPage: false });

  // 5. Admin Users Management
  console.log('Capturing admin users management...');
  await page.goto('http://127.0.0.1:8000/admin/users', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outDir, 'admin-users.png'), fullPage: false });

  // 6. Admin Feature Flags
  console.log('Capturing admin feature flags...');
  await page.goto('http://127.0.0.1:8000/admin/feature-flag/feature-flags', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outDir, 'admin-features.png'), fullPage: false });

  // 7. Admin AI Settings
  console.log('Capturing admin AI settings...');
  await page.goto('http://127.0.0.1:8000/admin/settings/ai-settings-page', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outDir, 'admin-ai-settings.png'), fullPage: false });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
