from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Go to dashboard page and click the "Go to Edit Page" button
    page.goto("http://localhost:5173/dashboard")
    page.get_by_role("button", name="Go to Edit Page").click()
    page.screenshot(path="jules-scratch/verification/edit-page.png")

    # Go back to dashboard page
    page.get_by_role("button", name="Back to Dashboard").click()
    page.screenshot(path="jules-scratch/verification/dashboard-page.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
