import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import MaterialDialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import * as React from 'react'

function Transition(props: any) {
    return <Slide direction='up' {...props} />
}

interface IProps {
    open: boolean
    isLoading: boolean
    onConfirm: (() => Promise<void>) |(() => void)
    onCancel?: () => void
    title: string,
    text?: string
    cancelLabel?: string
    confirmLabel?: string
    disableCancelButton?: boolean
}

const Dialog:React.SFC<IProps> = (props) => (
    <div>
        <MaterialDialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted={true}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
        >
            <DialogTitle id='alert-dialog-slide-title'>
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-slide-description'>
                    {props.text}
                </DialogContentText>
            </DialogContent>
            {
                props.isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 16 }}>
                        <CircularProgress/>
                    </div>
                ) : (
                    <DialogActions>
                        {
                            props.disableCancelButton ? null :
                                <Button onClick={props.onCancel}>
                                    {props.cancelLabel || 'Cancelar'}
                                </Button>
                        }

                        <Button onClick={props.onConfirm} color='primary'>
                            {props.confirmLabel || 'Ok'}
                        </Button>
                    </DialogActions>
                )
            }
        </MaterialDialog>
    </div>
)

export default Dialog