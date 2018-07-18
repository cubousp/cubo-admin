import gql from 'graphql-tag'

export const SEARCH_PARTICIPANT = gql`
    query searchParticipant($email: String!) {
        searchParticipant(email: $email, limit: 5) {
            id
            email
        }
    }
`