import { Then, When } from 'cucumber'
const { client } = require('nightwatch-cucumber')

When(/^I open CUBO Admin homepage/, () => {
  return client
    .url(`http://localhost:${process.env.PORT}`)
})

Then(/^the title is "(.*?)"$/, (text) => {
  return client.assert.title(text)
})