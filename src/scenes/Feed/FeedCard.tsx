import Avatar from '@material-ui/core/Avatar'
 import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Delete } from '@material-ui/icons'
import * as React from 'react'
import ReactTimeAgo from 'react-time-ago'

const styles = (theme: Theme) => ({
    actions: {
        display: 'flex',
    },
    card: {
        width: '100%',
    },
})

interface IProps {
    story: {
        id: string,
        createdAt: Date,
        message: string
    }
    onDelete: () => void
}

class FeedCard extends React.Component<IProps & WithStyles<'actions' | 'card'>> {

    constructor(props: any) {
        super(props)
    }

    public render() {
        const { classes, story, onDelete } = this.props

        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar
                                src={'https://s3.amazonaws.com/cubo-2018/cubo+quadrado+perfil+face.png'}
                                aria-label='Story'
                            />
                        }
                        title='CUBO | Organização'
                        subheader={<ReactTimeAgo locale={'pt-BR'}>{story.createdAt}</ReactTimeAgo>}
                    />
                    <CardContent>
                        <Typography component='div'>
                            <div dangerouslySetInnerHTML={{__html: story.message}}/>
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing={true}>
                        <IconButton
                            aria-label='Delete'
                            onClick={onDelete}
                        >
                            <Delete />
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(FeedCard)