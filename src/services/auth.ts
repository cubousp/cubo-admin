import gql from 'graphql-tag'

export interface ICurrentUser {
    email: string,
    name: string
    picture: string
}

export const signIn = (email: string, password: string) => gql`    
    {  
        signInAsAdmin(email: "${email}", password: "${password}") {
            token
            user {
                email
                name
                picture
            }
        }
    } 
`

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    window.location.replace('/login')
}

export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null
}