Playwright Tests with Runtime Tag Injection and Caching
This repository demonstrates how to run Playwright tests with runtime tag injection and cache Node.js dependencies in a GitHub Actions workflow. This ensures that dependencies are only downloaded when necessary, improving CI performance.

![image](https://github.com/user-attachments/assets/32585bc5-b044-4b19-a290-1d7ebb622109)


![image](https://github.com/user-attachments/assets/7a76a25d-2cf3-420e-9411-a8de38162c2b)


Features
Tag Injection at Runtime: Specify test tags (e.g., @smoke, @regression) at runtime to run specific subsets of Playwright tests.
Caching Node.js Dependencies: Uses GitHub Actions' cache to store and reuse node_modules across runs, reducing the need to install dependencies on every workflow execution.
How It Works:-
1. Tag Injection
You can pass a tag (such as @smoke or @regression) at runtime when triggering the GitHub Action, either through a manual workflow dispatch or during push or pull requests. This tag is then used to filter and run specific tests.

By default, the workflow will use the tag @smoke if no other tag is provided.

2. Caching Dependencies
The workflow uses GitHub’s caching mechanism to cache node_modules, ensuring that dependencies are only installed when the package-lock.json changes. This speeds up subsequent runs by avoiding repeated downloads of dependencies.

Usage
Injecting Tags Manually
You can manually trigger the workflow from the GitHub Actions tab and provide a custom test tag. The default tag is @smoke if no input is provided.

Example YAML Workflow
yaml
Copy code
name: Playwright Tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch:  # Allows manual trigger with input
    inputs:
      tag:
        description: 'Tag to run (e.g. @smoke, @regression)'
        required: true
        default: '@smoke'

jobs:
  playwright:
    name: "Playwright Tests"
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.48.1-jammy
      options: --user 1001
    steps:
      # Step 1: Checkout the code
      - uses: actions/checkout@v4

      # Step 2: Set up Node.js
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*

      # Step 3: Cache Node.js dependencies
      - name: Cache Node.js dependencies
        uses: actions/cache@v4
        with:
          path: node_modules
          key: node-modules-${{ hashFiles('package-lock.json') }}
          restore-keys: |
            node-modules-

      # Step 4: Install dependencies
      - name: Install dependencies
        run: npm ci

      # Step 5: Run Playwright tests with input tag
      - name: Run Playwright tests
        run: npx playwright test --grep "${{ inputs.tag }}"

      # Step 6: Upload Playwright test report as an artifact
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
Key Components
Tag Injection:

The tag is passed as an input to the GitHub Action.
If no tag is provided, the default tag @smoke is used.
Dependency Caching:

The actions/cache@v4 action caches the node_modules directory.
The cache is based on the package-lock.json file. If the package-lock.json file changes, the cache is invalidated and dependencies are re-installed.
Running the Workflow
Automatically (on Push or PR)
Whenever you push to main or master, or open a pull request targeting these branches, the workflow runs with the default @smoke tag unless otherwise specified.

Manually (with Custom Tag)
You can manually trigger the workflow and specify a custom tag:

Go to the Actions tab in your GitHub repository.
Find the "Playwright Tests" workflow and click on Run workflow.
Enter a custom tag (e.g., @regression) and run the workflow.
License
This project is licensed under the MIT License. See the LICENSE file for more details.
