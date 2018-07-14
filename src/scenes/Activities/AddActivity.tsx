import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'
import AddActivityForm from './AddActivityForm'

const styles = () => ({
    appBar: {
        position: 'relative' as any,
    },
    flex: {
        flex: 1,
    },
})

interface IProps {
    handleClose: () => void
    open: boolean
}

const Transition = (props: any) => {
    return <Slide direction='up' {...props} />
}

const AddActivity = withStyles(styles)<IProps>(({ classes, handleClose, open }) => (
    <Dialog
        fullScreen={true}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
    >
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton color='inherit' onClick={handleClose} aria-label='Close'>
                    <CloseIcon />
                </IconButton>
                <Typography variant='title' color='inherit' className={classes.flex}>
                    Nova atividade
                </Typography>
                <Button color='inherit' onClick={handleClose}>
                    Salvar
                </Button>
            </Toolbar>
        </AppBar>
        <AddActivityForm/>
    </Dialog>
))

export default AddActivity