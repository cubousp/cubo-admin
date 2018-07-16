import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { RetryLink } from 'apollo-link-retry'
import { logout, signIn } from './auth'

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_CUBO_API,
})

const authLink = setContext((_, {headers}: any) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const logoutLink = onError((error) => {
    if (
        error.response &&
        error.response.errors &&
        (error.response.errors[0] as any).code === 'Unauthorized'
    ) {
        logout()
    }
})

interface IResponseError {
    statusCode: number
    bodyText: string
}

const recoveryLink = new RetryLink({
    delay: {
        initial: 0,
    },
    attempts: {
        max: 2,
        retryIf: (error: IResponseError) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const email = localStorage.getItem('email')
                    const password = localStorage.getItem('password')
                    if (!email || !password) {
                        return
                    }
                    const apollo = new ApolloClient({cache: new InMemoryCache(), link: httpLink})
                    const {data} = await apollo.query({query: signIn(email, password)})
                    localStorage.setItem('token', (data as any).signIn)
                    return resolve()
                } catch (err) {
                    return reject()
                }
            })
        },
    },
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, recoveryLink, logoutLink, httpLink]),
})