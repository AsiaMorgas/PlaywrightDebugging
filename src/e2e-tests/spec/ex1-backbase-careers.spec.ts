import { test, expect } from '@playwright/test';
import { CareersPage, JobOpeningsPage, MainPage } from '../pages';

test.describe('Backbase Job Openings', async () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('/');

    });


    // test('The Candidate navigates to Jobs Openings for Krakow location', async ({ page }) => {

    //     const displayedAddress = page.locator('.test address');
    //     const jobOffersAmount = page.locator('p strong');
    //     const expectedAddress = 'Pawia 21';
    //     const expectedJobOffersNumber = '16';


    //     await page.getByRole('button', { name: 'Accept' }).click();

    //     await page.locator('footer [href="/careers"]').click();

    //     await page.locator('#nav a').filter({ hasText: 'Locations' }).click();


    //     await page.locator('[href*="krakow"]').click();

    //     await displayedAddress.waitFor();

    //     await expect(displayedAddress).toContainText(expectedAddress);


    //     await page.locator('a[href="/careers/jobs"]').click();


    //     await expect(jobOffersAmount, `Incorrect job offers amount - expected: ${expectedJobOffersNumber}`).toHaveText(expectedJobOffersNumber);
    // });



    //-------------------------



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
