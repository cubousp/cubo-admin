import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { logout } from './auth'

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_CUBO_API,
})

const authLink = setContext((_, { headers }: any) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
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

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(logoutLink).concat(httpLink)
})