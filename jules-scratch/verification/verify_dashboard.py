from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Go to edit page and create a new widget
    page.goto("http://localhost:5173/edit")
    page.get_by_role("button", name="Create Widget").click()
    page.get_by_label("Name").fill("Test Widget")
    page.get_by_label("X axis").fill("X")
    page.get_by_label("Y axis").fill("Y")
    page.get_by_role("button", name="Add").click()

    # Go to dashboard page and drag and drop the widget
    page.goto("http://localhost:5173/dashboard")
    source = page.locator('div:has-text("Test Widget")')
    target = page.locator(".react-grid-layout")
    source.drag_to(target)

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
