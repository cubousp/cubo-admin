import { Dashboard, InsertChart, People, RssFeed } from '@material-ui/icons'
import * as React from 'react'

interface IDrawerItem {
    icon: any,
    label: string,
    link: string,
    disabled?: boolean
}

export const drawerItems: IDrawerItem[] = [
    {
        icon: <RssFeed/>,
        label: 'Feed',
        link: '/feed'
    }, {
        icon: <Dashboard/>,
        label: 'Atividades',
        link: '/activities'
    }, {
        disabled: true,
        icon: <People/>,
        label: 'Participantes',
        link: '/participants',
    }, {
        disabled: true,
        icon: <InsertChart/>,
        label: 'Análise de Dados',
        link: '/analytics'
    }
]
