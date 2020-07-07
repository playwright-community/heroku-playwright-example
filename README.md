# Heroku Playwright Example

This example demonstrates how to use Playwright with Chromium and Firefox on a Heroku environment.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/mxschmitt/heroku-playwright-example)

## General

The setup is based on using the [Playwright Heroku Buildpack](https://github.com/mxschmitt/heroku-playwright-buildpack.git) which installs the necessary dependencies and adjusts the needed Playwright specific settings. It's required to run this before using the [NodeJS Buildpack](https://github.com/heroku/heroku-buildpack-nodejs), because otherwise the NPM dependencies won't be installed correctly.

## Components

In this minimal setup, we are using an Express web server, which accepts requests with the browser name and the URL as parameters. This demonstrates, that the setup works during the normal Dyno runtime. For a full reference, you can find the HTTP handler in the [`src/index.js`](./src/index.js) file. It's important to run Chromium with the `--no-sandbox` flag, because Heroku has no usable sandbox functionality on their containers.

To see a live demonstration, you can checkout [heroku.playwright.tech](https://heroku.playwright.tech) or make requests to these URLs to see that a browser is launched, the specified URL is opened and a screenshot is taken and delivered to the user:

- Chromium: [heroku.playwright.tech/browser/chromium?url=https://microsoft.com](https://heroku.playwright.tech/browser/chromium?url=https://microsoft.com)
- Firefox: [heroku.playwright.tech/browser/firefox?url=https://github.com](https://heroku.playwright.tech/browser/firefox?url=https://github.com)

## Best practises

It's common to only install the [browser-specific NPM packages](https://playwright.dev/#version=v1.1.1&path=docs%2Finstallation.md&q=download-single-browser-binary), which will reduce installation time and slug size on Heroku in the end, that should fix also the error that the slug size is too large.
