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

export const GET_ACTIVITY = gql`
    query activity($id: ID!) {
        activity(id: $id) {
            id
            title
            startsAt
            endsAt
            kind
            shortDescription
            longDescription
            internalComment
            speaker {
                name
                description
                picture
            }
            inscriptionBeginsAt
            inscriptionEndsAt
            vacancies {
                total
                available
            }
            visibleForParticipants
            location
        }
    }
`

export const UPDATE_ACTIVITY = gql`
    mutation updateActivity($id: ID!, $input: UpdateActivityInput!) {
        updateActivity(id: $id, input: $input) {
            id
        }
    }
`