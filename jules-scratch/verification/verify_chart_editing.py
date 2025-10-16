from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    page.goto("http://localhost:5173/")
    page.screenshot(path="jules-scratch/verification/debug.png")

    # Add a pie chart
    add_chart_button = page.get_by_role("button", name="Add Chart")
    expect(add_chart_button).to_be_visible()
    add_chart_button.click()
    page.get_by_role("menuitem", name="Pie Chart").click()

    # Edit the pie chart
    page.locator(".group").last.get_by_role("button", name="Edit").click()

    # Wait for the modal to appear
    page.wait_for_timeout(1000)

    # Uncheck the first two properties
    page.locator("#Jan").uncheck()
    page.locator("#Feb").uncheck()

    # Save the changes
    page.get_by_role("button", name="Save").click()

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)