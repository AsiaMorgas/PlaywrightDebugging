import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './src/e2e-tests/spec',

    /* ------------>  TIMEOUTS <------------ */
    //global timeout: for the whole test run, default is no timeout
    globalTimeout: 180 * 1000,
    //single test run timeout (overall with before/afterEach hooks), default is 30000 ms
    timeout: 30 * 1000,
    //assertion timeout:  default is 5000ms ms
    expect: {
        timeout: 2000
    },
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 1 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 1,
    /* ------------> REPORTERS <------------ */
    reporter: process.env.CI ? [['html'], ['github'], ['line']] : [['html'], ['line']],
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'https://www.backbase.com',
        headless: process.env.CI ? true : false,
        //viewport: null,
        //viewport: {width: 980, height: 500}, //defaults to: 1280 x 720
        screenshot: {mode: 'only-on-failure', fullPage: true}, // on, off, only-on-failure
        video: 'off', // off, on, retain-on-failure, on-first-retry
        launchOptions: {
            slowMo: process.env.CI ? 0 : 200,
            //devtools: true,
            // logger: {
            //     isEnabled: () => true,
            //     log: (name, severity, message, args, hints = {color: 'green'}) =>
            //         console.log(
            //             `logger name: ${name},severity: ${severity}, msg:  ${message}, `)
            // }
        },
        /* collecting trace always: See https://playwright.dev/docs/trace-viewer */
        trace: {mode: 'retain-on-failure', screenshots: true, snapshots: true, sources: true}
    },
    /*    projects: [
            {
                name: 'chromium',
                use: {
                    ...devices['Desktop Chrome'],
                    viewport: {width: 1980, height: 1020}
                }
            },
            {
                name: 'firefox',
                use: {
                    ...devices['Desktop Firefox'],
                    viewport: null
                }
            },
            {
                name: 'safari',
                use: {...devices['Desktop Firefox']}
            }
        ],
    /*
        /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/'
});
