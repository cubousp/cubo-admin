/* tslint:disable jsx-no-lambda */
import { Theme, WithStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import withStyles from '@material-ui/core/styles/withStyles'
import * as React from 'react'
import Query from 'react-apollo/Query'
import RichTextEditor from 'react-rte'
import Dialog from '../../components/Dialog'
import Snackbar from '../../components/Snackbar'
import { getFeed } from '../../repositories/feed'
import './Feed.css'
import FeedCard from './FeedCard'

interface IProps {
    editorState?: any
    openPublishConfirmationDialog: boolean
    openDeleteConfirmationDialog: boolean
    onEditorStateChange: (editorState: any) => void
    onPublish: () => void
    onPublishConfirm: (editorState: any) => Promise<void>
    onPublishCancel: () => void
    onDeleteStory: (storyId: string) => void
    onDeleteStoryConfirm: (id: string) => Promise<void>
    onDeleteStoryCancel: () => void
    postingToFeed: boolean
    deletingStory: boolean
    storyId?: string
    onCloseSnackbar: () => void
    openSnackbar: boolean
    snackbarMessage: string
}

const styles = (theme: Theme) => ({
    button: {
        background: theme.palette.secondary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        position: 'absolute' as 'absolute',
        right: 0,
        width: 120,
    },
    buttonContainer: {
        marginTop: 8,
        position: 'relative' as 'relative'
    },
    container: {
        margin: 'auto',
        marginTop: 32,
        maxWidth: 600
    },
    editor: {
        fontFamily: 'Roboto',
    },
    editorContainer: {
    },
    feedCardContainer: {
      marginTop: 16,
      width: '100%'
    },
    feedContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column' as 'column',
        marginTop: 64
    },
})

class Feed extends React.Component<IProps & WithStyles<'container' | 'feedCardContainer' | 'feedContainer' | 'buttonContainer' | 'editor' | 'editorContainer' | 'button'>>{

    constructor(props: any) {
        super(props)
        props.onEditorStateChange(RichTextEditor.createEmptyValue())
    }

    public onChange = (editorState: any) => {
        this.props.onEditorStateChange(editorState)
    }

    public handlePublish = () => this.props.onPublish()

    public handleCloseSnackbar = (event: any, reason: string) => {
        if (reason === 'clickaway') {
            return
        }
        this.props.onCloseSnackbar()
    }

    public render() {
        const {
            classes,
            openPublishConfirmationDialog,
            editorState,
            onPublishCancel,
            onPublishConfirm,
            postingToFeed,
            onDeleteStory,
            onDeleteStoryConfirm,
            onDeleteStoryCancel,
            openDeleteConfirmationDialog,
            deletingStory,
            storyId,
            openSnackbar,
            snackbarMessage
        } = this.props
        const toolbarConfig = {
            // Optionally specify the groups to display (displayed in the order listed).
            BLOCK_TYPE_BUTTONS: [
                {label: 'UL', style: 'unordered-list-item'},
                {label: 'OL', style: 'ordered-list-item'},
                {label: 'Blockquote', style: 'blockquote'},
            ],
            BLOCK_TYPE_DROPDOWN: [
                {label: 'Normal', style: 'unstyled'},
                {label: 'Heading Large', style: 'header-one'},
                {label: 'Heading Medium', style: 'header-two'},
                {label: 'Heading Small', style: 'header-three'}
            ],
            INLINE_STYLE_BUTTONS: [
                {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
                {label: 'Italic', style: 'ITALIC'},
                {label: 'Underline', style: 'UNDERLINE'}
            ],
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
        }
        return (
            <div className={classes.container}>
                <div className={classes.editorContainer}>
                    {
                        editorState && (
                            <RichTextEditor
                                value={editorState}
                                toolbarConfig={toolbarConfig}
                                className={classes.editor}
                                onChange={this.onChange}
                                placeholder={'Faça um post e mantenha o público do CUBO atualizado :)'}
                            />
                        )
                    }
                    <div className={classes.buttonContainer}>
                        <Button
                            color='secondary'
                            variant={'raised'}
                            className={classes.button}
                            onClick={this.handlePublish}
                        >
                            Publicar
                        </Button>
                    </div>
                </div>
                <div className={classes.feedContainer}>
                    <Query
                        query={getFeed}
                    >
                        {({loading, error, data}) => {
                            if (loading) { return <CircularProgress/> }
                            if (error) { return `Error! ${error.message}` }
                            return data.feed.stories.map(({ createdAt, id, message }: any) => (
                                <div
                                    key={id}
                                    className={classes.feedCardContainer}
                                >
                                    <FeedCard
                                        story={{createdAt: new Date(createdAt), id, message}}
                                        onDelete={() => onDeleteStory(id)}
                                    />
                                </div>
                            ))
                        }}
                    </Query>
                </div>
                <Dialog
                    open={openPublishConfirmationDialog}
                    onConfirm={() => onPublishConfirm(editorState)}
                    onCancel={onPublishCancel}
                    title={'Tem certeza de que deseja publicar no feed?'}
                    text={'Ao clicar em publicar, este post ficará visível para todos os participantes\n' +
                    '                    do evento.'}
                    confirmLabel={'Publicar'}
                    isLoading={postingToFeed}
                />
                <Dialog
                    open={openDeleteConfirmationDialog}
                    onConfirm={() => onDeleteStoryConfirm(storyId!)}
                    onCancel={onDeleteStoryCancel}
                    title={'Tem certeza de que deseja deletar esse post?'}
                    confirmLabel={'Deletar'}
                    isLoading={deletingStory}
                />
                <Snackbar
                   open={openSnackbar}
                   onClose={this.handleCloseSnackbar}
                   message={snackbarMessage}
                   variant={'success'}
                />
            </div>

        )
    }
}


export default withStyles(styles)(Feed)