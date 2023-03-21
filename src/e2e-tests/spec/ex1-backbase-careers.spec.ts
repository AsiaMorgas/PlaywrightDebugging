import { test, expect } from '@playwright/test';
import { CareersPage, JobOpeningsPage, MainPage } from '../pages';

test.describe('Backbase Job Openings', async () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('/');

    });

    test('The Candidate can filter out all Jobs Openings for Krakow location', async ({ page }) => {

        const careersPage = new CareersPage(page);
        const jobOpeningsPage = new JobOpeningsPage(page);
        const mainPage = new MainPage(page);

        const locationName = 'Krakow';

        await mainPage.acceptCookies();
        await mainPage.careersButton.click();
        await careersPage.jobOpeningsButton.click();
        await jobOpeningsPage.selectLocation(locationName);

        const allJobOpeningsListed = await jobOpeningsPage.getAllJobOpeningItems();
        const openingsListLength = allJobOpeningsListed.length;
        const displayedNumberLabel = jobOpeningsPage.jobOpeningsAmount;
      //  await page.pause();

        expect.soft(displayedNumberLabel).toHaveText(openingsListLength.toString());

        for (let i = 0; i < openingsListLength; i++) {
            await expect.soft(allJobOpeningsListed[i]).toContainText(locationName);
        }

    });

});
