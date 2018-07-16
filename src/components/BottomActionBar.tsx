import Button from '@material-ui/core/Button/Button'
import Paper from '@material-ui/core/Paper/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import * as React from 'react'

interface IProps {
    onSaveClick?: () => void
    onCancelClick?: () => void
}

const styles = () => ({
    paper: {
        height: 64,
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 32
    }
})

const BottomActionBar = withStyles(styles)<IProps>(({ classes, onCancelClick, onSaveClick, ...rest }) => (
    <div {...rest}>
        <Paper elevation={4} className={classes.paper}>
            <Button color={'secondary'} size={'large'} onClick={onCancelClick}>
                Cancelar
            </Button>
            <Button color={'primary'} size={'large'} style={{ marginLeft: 32 }} onClick={onSaveClick}>
                Salvar
            </Button>
        </Paper>
    </div>
))

export default BottomActionBar