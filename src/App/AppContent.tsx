import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'

const decorate = withStyles(({ palette, spacing, transitions, zIndex, mixins }) => ({
    content: {
        backgroundColor: palette.background.default,
        flexGrow: 1,
        marginTop: 64,
        overflowY: 'auto' as 'auto',
        overflowX: 'hidden' as 'hidden',
        padding: 0,
    },
    toolbar: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...mixins.toolbar,
    },
}))

const AppContent = decorate(({ classes, children }) => (
    <main className={classes.content}>
        <div>
            {children}
        </div>
    </main>
))

export default AppContent