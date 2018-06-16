import RichTextEditor from 'react-rte'
import { initialState, IState } from '../../App/state'

export const EDITOR_CHANGE = 'EDITOR_CHANGE'
export const FEED_DELETE = 'FEED_DELETE'
export const FEED_DELETE_CONFIRM = 'FEED_DELETE_CONFIRM'
export const FEED_DELETE_CANCEL = 'FEED_DELETE_CANCEL'
export const FEED_DELETE_SUCCESS = 'FEED_DELETE_SUCCESS'
export const FEED_PUBLISH = 'FEED_PUBLISH'
export const FEED_PUBLISH_CONFIRM = 'FEED_PUBLISH_CONFIRM'
export const FEED_PUBLISH_CANCEL = 'FEED_PUBLISH_CANCEL'
export const FEED_PUBLISH_SUCCESS = 'FEED_PUBLISH_SUCCESS'
export const FEED_SNACKBAR_CLOSE = 'FEED_SNACKBAR_CLOSE'

const FeedReducer = (state: IState = initialState, action: any) => {
    switch(action.type) {
        case EDITOR_CHANGE: {
            return {
                ...state,
                feedEditor: action.editorState,
            }
        }
        case FEED_PUBLISH: {
            return {
                ...state,
                openFeedConfirmationDialog: true,
            }
        }
        case FEED_PUBLISH_CONFIRM: {
            return {
                ...state,
                postingToFeed: true,
            }
        }
        case FEED_PUBLISH_CANCEL: {
            return {
                ...state,
                openFeedConfirmationDialog: false,
            }
        }
        case FEED_PUBLISH_SUCCESS: {
            return {
                ...state,
                feedEditor: RichTextEditor.createEmptyValue(),
                openFeedConfirmationDialog: false,
                openSnackbar: true,
                postingToFeed: false,
                snackbarMessage: 'Post publicado com sucesso',
            }
        }
        case FEED_DELETE: {
            return {
                ...state,
                openFeedDeleteConfirmationDialog: true,
                storyId: action.storyId
            }
        }
        case FEED_DELETE_CANCEL: {
            return {
                ...state,
                openFeedDeleteConfirmationDialog: false
            }
        }
        case FEED_DELETE_CONFIRM: {
            return {
                ...state,
                deletingStory: true
            }
        }
        case FEED_DELETE_SUCCESS: {
            return {
                ...state,
                deletingStory: false,
                openFeedDeleteConfirmationDialog: false,
                openSnackbar: true,
                snackbarMessage: 'Post deletado com sucesso',
            }
        }
        case FEED_SNACKBAR_CLOSE: {
            return {
                ...state,
                openSnackbar: false,
                snackbarMessage: ''
            }
        }
        default: return state
    }
}

export default FeedReducer