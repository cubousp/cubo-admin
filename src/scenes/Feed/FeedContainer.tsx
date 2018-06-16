import { connect, Dispatch } from 'react-redux'
import { IState } from '../../App/state'
import { deleteStory, getFeed, postToFeed } from '../../repositories/feed'
import { client } from '../../services/client'
import Feed from './Feed'
import {
    EDITOR_CHANGE, FEED_DELETE, FEED_DELETE_CANCEL, FEED_DELETE_CONFIRM, FEED_DELETE_SUCCESS,
    FEED_PUBLISH, FEED_PUBLISH_CANCEL,
    FEED_PUBLISH_CONFIRM,
    FEED_PUBLISH_SUCCESS, FEED_SNACKBAR_CLOSE,
} from './FeedReducer'

const mapStateToProps = ({
    postingToFeed,
    openFeedConfirmationDialog,
    feedEditor,
    deletingStory,
    openFeedDeleteConfirmationDialog,
    storyId,
    openSnackbar,
    snackbarMessage
}: IState) => ({
    deletingStory,
    editorState: feedEditor,
    openDeleteConfirmationDialog: openFeedDeleteConfirmationDialog,
    openPublishConfirmationDialog: openFeedConfirmationDialog,
    openSnackbar,
    postingToFeed,
    snackbarMessage,
    storyId
}) as any

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onEditorStateChange(editorState: any) {
        dispatch({ type: EDITOR_CHANGE, editorState })
    },
    onPublish() {
        dispatch({ type: FEED_PUBLISH })
    },
    async onPublishConfirm(editorState: any) {
        dispatch({ type: FEED_PUBLISH_CONFIRM })
        try {
            const message = editorState.toString('html')
            await client.mutate({
                mutation: postToFeed(message),
                update: (cache, { data }) => {
                    const { feed } = cache.readQuery({ query: getFeed }) as any
                    const newStory =  data!.postToFeed
                    cache.writeQuery({
                        data: {
                            feed: {
                                ...feed,
                                stories: [newStory].concat(feed.stories)
                            }
                        },
                        query: getFeed
                    })
                }
            })
            dispatch({ type: FEED_PUBLISH_SUCCESS })
        } catch(err) {
            throw err
        }
    },
    onPublishCancel() {
        dispatch({ type: FEED_PUBLISH_CANCEL })
    },
    onDeleteStory(storyId: string) {
        dispatch({ type: FEED_DELETE, storyId })
    },
    async onDeleteStoryConfirm(storyId: string) {
        dispatch({ type: FEED_DELETE_CONFIRM })
        try {
            await client.mutate({
                mutation: deleteStory(storyId),
                update: (cache, { data }) => {
                    const { feed } = cache.readQuery({ query: getFeed }) as any
                    cache.writeQuery({
                        data: {
                            feed: {
                                ...feed,
                                stories: feed.stories.filter(({ id }: any) => id !== storyId)
                            }
                        },
                        query: getFeed
                    })
                }
            })
            dispatch({ type: FEED_DELETE_SUCCESS })
        } catch(err) {
            throw err
        }
    },
    onDeleteStoryCancel() {
        dispatch({ type: FEED_DELETE_CANCEL })
    },
    onCloseSnackbar() {
        dispatch({ type: FEED_SNACKBAR_CLOSE })
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed)
