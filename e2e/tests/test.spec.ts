import {expect, test} from '@playwright/test';
import {join} from "path";
import {FILES_DIR} from "../constants/paths";

test('firefox file input bug', async ({page}) => {
    await page.setContent(`<input type="file" id="testFile" multiple/>`);

    const input = page.locator('#testFile');

    const countHandle = await input.evaluateHandle(input => {
        const countHandle = {
            count: -1,
        };

        if (input instanceof HTMLInputElement) {
            input.addEventListener('change', () => countHandle.count = input.files.length, {once: true})
        }

        return countHandle;
    });

    await input.setInputFiles([
        join(FILES_DIR, 'valid_file_1.txt'),
        join(FILES_DIR, 'valid_file_2.txt'),
    ]);

    await expect(countHandle.evaluate(handle => handle.count)).resolves.toBe(2);
});