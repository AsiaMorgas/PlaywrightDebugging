import { Page } from "@playwright/test";

export class JobOpeningsPage {

    readonly jobOpeningsAmount = this.page.locator('.form__group p strong');
    private readonly filterLocationsSelect = this.page.locator('#filter-locations');
    private readonly jobOpeningItem = this.page.locator('.list li');
    private readonly searchField = this.page.locator('#search');
    private readonly searchButton = this.page.locator('button span', {hasText:'Search'});

    constructor(protected page: Page) { }

    async selectLocation(locationName: string) {
        await this.filterLocationsSelect.selectOption({ label: locationName });
    }

    async searchForPhrase(phrase: string) {
        await this.searchField.fill(phrase);
        await this.searchButton.click();
    }

    async getAllJobOpeningItems() {
        return await this.jobOpeningItem.all();
    }

}