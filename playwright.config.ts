import {defineConfig, devices} from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './e2e/tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html', {open: 'never'}], ['list']],

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'firefox',
            use: devices['Desktop Firefox'],
        },
    ],

    maxFailures: 1,
    repeatEach: 100,
    use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on',

        contextOptions: {
            reducedMotion: 'reduce',
        },
    },
});
