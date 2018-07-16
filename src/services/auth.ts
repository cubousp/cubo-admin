import gql from 'graphql-tag'

export const signIn = (email: string, password: string) => gql`    
    {  
        signIn(email: "${email}", password: "${password}")
    } 
`

export const logout = () => {
    localStorage.removeItem('token')
    window.location.replace('/login')
}

export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null
}