import gql from 'graphql-tag'

export const getActivities = gql`
    query Activities {
        eventSchedule {
            id
            title
            startsAt
            endsAt
            kind
        }
    }
`