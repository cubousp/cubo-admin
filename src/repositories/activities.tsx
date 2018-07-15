import gql from 'graphql-tag'

export const GET_ACTIVITIES = gql`
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

export const CREATE_ACTIVITY = gql`
    mutation createActivity($newActivity: CreateActivityInput!) {
        createActivity(input: $newActivity) {
            id
        }
    }
`
