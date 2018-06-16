import gql from 'graphql-tag'

export const postToFeed = (content: any) => gql`
    mutation PostToFeed {
        postToFeed(input: {
            message: """${content}"""
        }) {
            id
            message
            createdAt
        }
    }
`

export const getFeed = gql`
    query Feed {
        feed {
            hasMore
            last
            stories {
                id
                message
                createdAt
            }
        }
    }
`

export const deleteStory = (storyId: string) => gql`
    mutation DeleteStory {
        deleteStory(id: "${storyId}")
    }
`