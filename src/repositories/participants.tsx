import gql from 'graphql-tag'

export const SEARCH_PARTICIPANT = gql`
    query searchParticipant($email: String!) {
        searchParticipant(email: $email, limit: 5) {
            id
            email
        }
    }
`
export const PARTICIPANTS = gql`
    query participants($limit: Int) {
        participants(limit: $limit) {
            participants{
                name
                email
                kind
            }
        }
    }
`

export const CREATE_PARTICIPANT = gql`
    mutation createParticipant($input: CreateParticipantInput!){
        createParticipant(input: $input) {
            id
            name
            email
            kind
        }
    }
`
export const ENROLL_PARTICIPANT = gql`
    mutation enrollParticipant($activityId: ID!, $participantId: ID!) {
        enrollParticipant(activityId: $activityId, participantId: $participantId) {
            id
        }
    }
`

export const DISENROLL_PARTICIPANT = gql`
    mutation disenrollParticipant($inscriptionId: ID!) {
        disenrollParticipant(inscriptionId: $inscriptionId)
    }
`

export const UPDATE_INSCRIPTION_STATUS = gql`
    mutation updateInscriptionStatus($inscriptionId: ID!, $status: InscriptionStatus!) {
        updateInscriptionStatus(inscriptionId: $inscriptionId, status: $status)
    }
`