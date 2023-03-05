import { test, expect, Locator } from '@playwright/test';
import { CareersPage, JobOpeningsPage, MainPage } from '../pages';


test.describe('Backbase Job Openings', async () => {

    test.beforeEach(async ({ page }) => {
    
        await test.step('Step 0: Open Backbase page', async () => {
            await page.goto('/');   
        });

    });


    test('The Candidate navigates to Jobs Openings for Krakow location', async ({ page }) => {

        const displayedAddress = page.locator('.test address');
        const jobOffersAmount = page.locator('p strong');
        const expectedAddress = 'Pawia 21';
        const expectedJobOffersNumber = '16';

        await test.step('Step 1: Accept cookies', async () => {
            await page.getByRole('button', { name: 'Accept' }).click();
        });

        await test.step('Step 2: Open Careers page', async () => {
            await page.locator('footer [href="/careers"]').click();
        });

        await test.step('Step 3: Open Locations page', async () => {
            await page.locator('#nav a').filter({ hasText: 'Locations' }).click();
        });

        await test.step('Step 4: Open Krakow location page', async () => {
            await page.locator('[href*="krakow"]').click();
        });

        await displayedAddress.waitFor();

        await expect(displayedAddress).toContainText(expectedAddress);

        await test.step('Step 5: Open Careers for Krakow location', async () => {
            await page.locator('a[href="/careers/jobs"]').click();
        });

        await expect(jobOffersAmount, `Incorrect job offers amount - expected: ${expectedJobOffersNumber}`).toHaveText(expectedJobOffersNumber);
    });



    //-------------------------


    test.only('ex2: The Candidate can filter out all Jobs Openings for Krakow location', async ({ page }) => {

        const careersPage = new CareersPage(page);
        const jobOpeningsPage = new JobOpeningsPage(page);
        const mainPage = new MainPage(page);

        const locationName = 'Krakow';
        let allJobOpeningsListed: Locator[];
        let openingsListLength: number = 0;

        await test.step('Step: Accept cookies.', async () => {
            await mainPage.acceptCookies();
        });

        await test.step('Step: Go to "Careers" page.', async () => {
            await mainPage.careersButton.click();
        });

        await test.step('Step: Go to "Job Openings" page.', async () => {
            await careersPage.jobOpeningsButton.click();
        });

        await test.step(`Step: Select ${locationName} location.`, async () => {
            await jobOpeningsPage.selectLocation(locationName);
        });

        await test.step(`Step: Count all openings displayed.`, async () => {
            allJobOpeningsListed = await jobOpeningsPage.getAllJobOpeningItems();
            openingsListLength = allJobOpeningsListed.length;
        });

        const displayedNumberLabel = jobOpeningsPage.jobOpeningsAmount;
        //  await page.pause();

       // await test.step('Step: Verify if openings number correct.', async () => {
           // const expectedOpeningsNumber = openingsListLength.toString();
            const expectedOpeningsNumber = (++openingsListLength).toString();
            expect.soft(displayedNumberLabel, 'Incorrect number displayed.').toHaveText(expectedOpeningsNumber);
      //  });


        await test.step(`Step: Verify if all displayed offers have correct location.`, async () => {
            for (let i = 0; i < allJobOpeningsListed.length; i++) {
                const currentOfferRow =  allJobOpeningsListed[i];
             // const toPrint = (typeof allJobOpeningsListed[i]);
                const toPrint = (typeof currentOfferRow);
                console.log(`>>>>>> ${toPrint}`);
                await expect.soft(currentOfferRow).toContainText(locationName);
            }
        });

    });

});