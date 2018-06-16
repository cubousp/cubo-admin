const seleniumServer = require('selenium-server')
const chromedriver = require('chromedriver')
const geckodriver = require('geckodriver')

require('nightwatch-cucumber')({
    cucumberArgs: ['--require', 'features/support/**/*.ts','--require-module','ts-node/register','--format', 'node_modules/cucumber-pretty', '--format', 'json:reports/cucumber.json', 'features']
})

module.exports = {
    custom_assertions_path: '',
    disable_colors: false,
    live_output: false,
    selenium: {
        host: '127.0.0.1',
        log_path: '',
        port: 4444,
        server_path: seleniumServer.path,
        start_process: true
    },
    test_settings: {
        chrome: {
            desiredCapabilities: {
                acceptSslCerts: true,
                browserName: 'chrome',
                javascriptEnabled: true
            },
            selenium: {
                cli_args: {
                    'webdriver.chrome.driver': chromedriver.path
                }
            }
        },
        default: {
            desiredCapabilities: {
                acceptSslCerts: true,
                browserName: 'chrome',
                chromeOptions: {
                    args: ['incognito', 'headless', 'no-sandbox', 'disable-gpu']
                },
                javascriptEnabled: true
            },
            launch_url: 'http://localhost:8087',
            selenium: {
                cli_args: {
                    'webdriver.chrome.driver': chromedriver.path
                }
            },
            selenium_host: '127.0.0.1',
            selenium_port: 4444,
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                javascriptEnabled: true,
                marionette: true
            },
            selenium: {
                cli_args: {
                    'webdriver.gecko.driver': geckodriver.path
                }
            }
        }
    }
}