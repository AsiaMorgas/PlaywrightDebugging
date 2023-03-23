import {expect, Locator, test} from '@playwright/test';
import {CareersPage, JobOpeningsPage, MainPage} from '../pages';


test.describe('Backbase Job Openings filtering', async () => {

    const locationName = 'Krakow';
    const positionType = 'QA Engineer';

    test.beforeEach(async ({page}) => {
        const mainPage = new MainPage(page);
        const careersPage = new CareersPage(page);

        await test.step('Step: Open Backbase Home page', async () => {
            await page.goto('/');
        });
        await test.step('Step: Accept cookies.', async () => {
            await mainPage.acceptCookies();
        });
        await test.step('Step: Go to "Careers" page.', async () => {
            await mainPage.careersButton.click();
        });
        await test.step('Step: Go to "Job Openings" page.', async () => {
            await careersPage.jobOpeningsButton.click({force: true});
        });

    });


    test(`Steps: User can filter Job Openings against "${locationName}" location`,
        async ({page}) => {
            const jobOpeningsPage = new JobOpeningsPage(page);
            let allJobOpeningsListed: Locator[];
            let openingsListLength: number;


            await test.step(`Step: Select ${locationName} location.`, async () => {
                await jobOpeningsPage.selectLocation(locationName);
            });

            await test.step(`Step: Count displayed openings.`, async () => {
                allJobOpeningsListed = await jobOpeningsPage.getAllJobOpeningItems();
                openingsListLength = allJobOpeningsListed.length;
            });

            const displayedNumberLabel = jobOpeningsPage.jobOpeningsAmount;
            // await page.pause();

            await test.step('Step: Verify if openings number correct.', async () => {
                const expectedOpeningsNumber = openingsListLength.toFixed();
                await expect.soft(displayedNumberLabel, 'Incorrect openings number displayed.')
                    .toHaveText(`${expectedOpeningsNumber}`);
            });

            await test.step(`Step: Verify if all displayed offers have correct location.`, async () => {
                for (let i = 0; i < allJobOpeningsListed.length; i++) {
                    const currentRow = allJobOpeningsListed[i];
                    await expect.soft(currentRow).toContainText(locationName);
                }
            });

        });


    test(`Steps: User can filter Job Openings against "${positionType}" phrase`, async ({page}) => {
        const jobOpeningsPage = new JobOpeningsPage(page);
        let jobOpeningsDisplayed: Locator[];
        let openingsListLength: number;

        await test.step(`Step: Search for "${positionType}" phrase.`, async () => {
            await jobOpeningsPage.searchForPhrase(positionType);
        });

        await test.step(`Step: Count displayed openings.`, async () => {
            jobOpeningsDisplayed = await jobOpeningsPage.getAllJobOpeningItems();
            openingsListLength = jobOpeningsDisplayed.length;
        });
        const openingsNumberLabel = jobOpeningsPage.jobOpeningsAmount;
        // await page.pause();

        await test.step('Step: Verify if openings number correct.', async () => {
            const expectedOpeningsNumber = openingsListLength.toFixed();
            await expect.soft(openingsNumberLabel).toHaveText(expectedOpeningsNumber);
        });
        await test.step(`Step: Verify if all displayed offers contain "${positionType}" phrase.`, async () => {
            for (let i = 0; i < openingsListLength; i++) {
                await expect.soft(jobOpeningsDisplayed[i]).toContainText(positionType);
            }
        });

    });

});