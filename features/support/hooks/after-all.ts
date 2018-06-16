import { AfterAll } from 'cucumber'
import { Server } from '../../../test-utils/server'

AfterAll({ timeout: 10 * 1000}, async () => {
    await Server.stop()
})