import {expect, Locator, test} from '@playwright/test';
import {CareersPage, JobOpeningsPage, MainPage} from '../pages';


test.describe('Backbase Job Openings filtering', async () => {

    const locationName = 'Krakow';

    test.beforeEach(async ({page}) => {

        await test.step('Step: Open Backbase page', async () => {
            await page.goto('/');
        });

    });

    test(`ex2: The Candidate can filter out all Jobs Openings for ${locationName} location`,
        async ({page}) => {

            const careersPage = new CareersPage(page);
            const jobOpeningsPage = new JobOpeningsPage(page);
            const mainPage = new MainPage(page);

            let allJobOpeningsListed: Locator[];
            let openingsListLength: number;

            await test.step('Step: Accept cookies.', async () => {
                await mainPage.acceptCookies();
            });

            await test.step('Step: Go to "Careers" page.', async () => {
                await mainPage.careersButton.click();
            });

            await test.step('Step: Go to "Job Openings" page.', async () => {
                await careersPage.jobOpeningsButton.click({force: true});
            });

            await test.step(`Step: Select ${locationName} location.`, async () => {
                await jobOpeningsPage.selectLocation(locationName);
            });

            await test.step(`Step: Count all openings displayed.`, async () => {
                allJobOpeningsListed = await jobOpeningsPage.getAllJobOpeningItems();
                openingsListLength = allJobOpeningsListed.length;
            });

            const displayedNumberLabel = jobOpeningsPage.jobOpeningsAmount;
           // await page.pause();

            await test.step('Step: Verify if openings number correct.', async () => {
                const expectedOpeningsNumber = openingsListLength.toFixed();
                await expect.soft(displayedNumberLabel, 'Incorrect openings number displayed.')
                    .toHaveText(`x${expectedOpeningsNumber}`);
            });

            await test.step(`Step: Verify if all displayed offers have correct location.`, async () => {
                for (let i = 0; i < allJobOpeningsListed.length; i++) {
                    const currentRow = allJobOpeningsListed[i];
                    await expect.soft(currentRow).toContainText(locationName);
                }
            });

        });

});