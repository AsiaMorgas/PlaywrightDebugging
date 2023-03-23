import {expect, test} from '@playwright/test';
import {CareersPage, JobOpeningsPage, MainPage} from '../pages';

test.describe('Backbase Job Openings', async () => {
    const locationName = 'Krakow';
    const positionType = 'QA Engineer';

    test.beforeEach(async ({page}) => {
        const mainPage = new MainPage(page);
        const careersPage = new CareersPage(page);

        await page.goto('/');
        await mainPage.acceptCookies();
        await mainPage.careersButton.click();
        await careersPage.jobOpeningsButton.click();
    });

    test(`User can filter Job Openings against "${locationName}" location`, async ({page}) => {

        const jobOpeningsPage = new JobOpeningsPage(page);

        await jobOpeningsPage.selectLocation(locationName);

        const allJobOpeningsListed = await jobOpeningsPage.getAllJobOpeningItems();
        const openingsListLength = allJobOpeningsListed.length;
        const displayedNumberLabel = jobOpeningsPage.jobOpeningsAmount;
        //  await page.pause();

        await expect.soft(displayedNumberLabel).toHaveText(openingsListLength.toString());

        for (let i = 0; i < openingsListLength; i++) {
            await expect.soft(allJobOpeningsListed[i]).toContainText(locationName);
        }

    });


    test(`User can filter Job Openings against "${positionType}" phrase`, async ({page}) => {

        const jobOpeningsPage = new JobOpeningsPage(page);

        await jobOpeningsPage.searchForPhrase(positionType);

        const jobOpeningsDisplayed = await jobOpeningsPage.getAllJobOpeningItems();
        const openingsListLength = jobOpeningsDisplayed.length;
        const openingsNumberLabel = jobOpeningsPage.jobOpeningsAmount;
        //  await page.pause();

        await expect.soft(openingsNumberLabel).toHaveText(openingsListLength.toString());

        for (let i = 0; i < openingsListLength; i++) {
            await expect.soft(jobOpeningsDisplayed[i]).toContainText(positionType);
        }

    });
});
