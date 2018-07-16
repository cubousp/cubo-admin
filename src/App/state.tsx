export interface IState {
    loading: boolean,
    loginError: boolean,
    postingToFeed: boolean,
    openFeedConfirmationDialog: boolean,
    deletingStory: boolean,
    openFeedDeleteConfirmationDialog: boolean,
    newPost?: any,
    feedEditor?: any,
    storyId?: string
    openSnackbar: boolean,
    snackbarMessage?: string,
    redirectToDashboard: boolean
}

export const initialState: IState = {
    deletingStory: false,
    loading: false,
    loginError: false,
    openFeedConfirmationDialog: false,
    openFeedDeleteConfirmationDialog: false,
    openSnackbar: false,
    postingToFeed: false,
    redirectToDashboard: false
}