import { Page } from "@playwright/test";

export class MainPage {

    readonly careersButton = this.page.locator('#nav [class*="Header_navigation-item"] span', { hasText: 'Careers' });
    private readonly acceptButton = this.page.getByRole('button', { name: 'Accept' });
    private readonly cookieTitle = this.page.locator('#cookie-title');

    constructor(protected page: Page) { }

    async acceptCookies() {
        await this.acceptButton.click();
        await this.cookieTitle.waitFor({state: 'hidden'});
    }
}