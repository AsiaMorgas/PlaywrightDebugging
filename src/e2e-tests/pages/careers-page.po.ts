import { Page } from "@playwright/test";

export class CareersPage {

    readonly jobOpeningsButton = this.page.locator('#nav [href="/careers/jobs"] span');

    constructor(protected page: Page) { }
}