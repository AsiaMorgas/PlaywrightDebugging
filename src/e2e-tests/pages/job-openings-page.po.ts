import { Page } from "@playwright/test";

export class JobOpeningsPage {

    readonly jobOpeningsAmount = this.page.locator('.form__group p strong');
    private readonly filterLocationsSelect = this.page.locator('#filter-locations');
    private readonly jobOpeningItem = this.page.locator('.list li');

    constructor(protected page: Page) { }

    async selectLocation(locationName: string) {
        await this.filterLocationsSelect.selectOption({ label: locationName });
    }

    async getAllJobOpeningItems() {
        return await this.jobOpeningItem.all();
    }

}