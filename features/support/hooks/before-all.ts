import { BeforeAll } from 'cucumber'
import { Server } from '../../../test-utils/server'

BeforeAll({ timeout: 10 * 1000}, async () => {
    await Server.start()
})