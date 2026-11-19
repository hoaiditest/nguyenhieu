import { test, expect } from '@playwright/test';
import fs from 'node:fs';

fs.mkdirSync('screenshots', { recursive: true });
fs.mkdirSync('videos', { recursive: true });

// Cuộn từ từ để kích hoạt hiệu ứng reveal
async function scrollThrough(page, step = 400, delay = 120) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += step) {
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(delay);
  }
  // Quay về đầu trang để header sticky nằm đúng vị trí trong ảnh chụp toàn trang
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(300);
}

test('Screenshot desktop 1440px', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await scrollThrough(page, 600, 60);
  await page.screenshot({ path: 'screenshots/desktop-full.png', fullPage: true });
  await expect(page.locator('#services .card')).toHaveCount(6);
  await expect(page.locator('.credit')).toHaveText('Thiết kế bởi Mai Duy');
});

test('Mobile 375px: không scroll ngang, menu hoạt động', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await scrollThrough(page, 600, 60);
  await page.screenshot({ path: 'screenshots/mobile-full.png', fullPage: true });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);

  await page.evaluate(() => scrollTo(0, 0));
  const burger = page.locator('.burger');
  await burger.click();
  await expect(page.locator('#nav')).toHaveClass(/open/);
  await page.locator('#nav a', { hasText: 'Combo ưu đãi' }).click();
  await expect(page.locator('#nav')).not.toHaveClass(/open/);
});

test('Header sticky và nút lên đầu trang', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => scrollTo(0, 1500));
  await expect(page.locator('#header')).toHaveClass(/is-stuck/);
  await expect(page.locator('#to-top')).toHaveClass(/show/);
  await expect(page.locator('#header')).toBeInViewport();
});

test('Validate form: thiếu / sai SĐT', async ({ page }) => {
  await page.goto('/#dat-lich');
  const form = page.locator('#booking');
  await form.locator('[name=name]').fill('Nguyễn Văn A');
  await form.locator('button[type=submit]').click();
  await expect(form.locator('.field.invalid .error')).toHaveText('Vui lòng nhập số điện thoại.');

  await form.locator('[name=phone]').fill('12345');
  await form.locator('button[type=submit]').click();
  await expect(form.locator('.field.invalid .error')).toHaveText('Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.');
});

test.describe('Video demo', () => {
  test('Cuộn trang → chọn dịch vụ → đặt lịch', async ({ browser, baseURL }) => {
    const size = { width: 1280, height: 720 };
    const context = await browser.newContext({ baseURL, viewport: size, recordVideo: { dir: 'test-results/video', size } });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForTimeout(800);
    await scrollThrough(page, 250, 180);
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(800);

    await page.locator('[data-book="Massage đá nóng"]').click();
    await expect(page.locator('#b-service')).toHaveValue('Massage đá nóng');
    await page.waitForTimeout(800);

    const form = page.locator('#booking');
    await form.locator('[name=name]').pressSequentially('Trần Thị B', { delay: 60 });
    await form.locator('[name=phone]').pressSequentially('0912345678', { delay: 60 });

    let alertText = '';
    page.once('dialog', async (d) => { alertText = d.message(); await d.accept(); });
    await form.locator('button[type=submit]').click();
    await expect(form.locator('.form__msg')).toHaveText('Đặt lịch thành công! Chúng tôi sẽ gọi lại sớm.');
    expect(alertText).toBe('Đặt lịch thành công! Chúng tôi sẽ gọi lại sớm.');
    await page.waitForTimeout(1200);

    const video = page.video();
    await context.close();
    await video.saveAs('videos/demo.webm');
  });
});
