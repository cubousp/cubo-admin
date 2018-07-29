import * as React from 'react'

interface IProps {
    title: string
    updateTitle: (title: string) => void
}

export default class UpdateAppTitle extends React.Component<IProps> {
    public componentDidMount() {
        this.props.updateTitle(this.props.title)
    }

    public render() {
        return null
    }
}