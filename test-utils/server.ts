const handler = require('serve-handler')
const http = require('http')

export class Server {

    public static async start() {
        console.log('Starting server')
        return new Promise((resolve) => {
            this.server.listen(process.env.PORT, () => {
                console.log(`Listening on http://localhost:${process.env.PORT}`)
                resolve()
            })
        })
    }

    public static async stop() {
        console.log('Shutting down server...')
        return new Promise((resolve) => {
            this.server.close(() => {
                console.log('Done!')
                resolve()
            })
        })
    }

    private static server = http.createServer((request: any, response: any) => {
        return handler(request, response, {
            public: 'build'
        })
    })
}
