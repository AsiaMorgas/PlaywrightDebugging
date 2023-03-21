import {defineConfig} from '@playwright/test';

export default defineConfig({

    testDir: './src/e2e-tests/spec',

    /*---> timeouts <----*/

    /*global timeout: for the whole test run, default is no timeout*/
    //globalTimeout: 40000,
    /*single test run timeout (overall with before/afterEach hooks), default is 30000 ms*/
    timeout: 30 * 1000,
    /*assertion timeout:  default is 5000ms ms*/
    expect: {
        timeout: 2000
    },

    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 1 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter:'dot',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'https://www.backbase.com',
        browserName: 'chromium',
        bypassCSP: true,
        headless: false,
        /*browsers: 'chromium','firefox','webkit', defaults to chromium */
        //viewport: null,
        //viewport: {width: 980, height: 500},
        screenshot: {mode: 'only-on-failure', fullPage: true},
        video: 'on',
        launchOptions: {
            slowMo: 200,
            //devtools: true,
            //    logger: {
            //        isEnabled: () => true,
            //        log: (name, severity, message, args, hints= {color:'green'}) =>
            //            console.log(
            //                `logger name: ${name},severity: ${severity}, msg:  ${message}, `)
            //    }
        },
        /* collecting trace always: See https://playwright.dev/docs/trace-viewer */
        trace: {mode: 'on', screenshots: true, snapshots: true, sources: true},
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
        }
        // {
        //   name: 'safari',
        //   use: { ...devices['Desktop Firefox'] }
        // },
        // {
        //     name: 'mobile chrome',
        //     use: { ...devices['Pixel 5'] }
        //   }
    ], */

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/'
});
