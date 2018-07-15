class PageTitle {
    public pattern: RegExp
    public title: string

    constructor(pattern: RegExp, title: string) {
        this.pattern = pattern
        this.title = title
    }
}

export const pagesTitle = [
    new PageTitle(/^\/$/, 'Atividades'),
    new PageTitle(/activities$/, 'Atividades'),
    new PageTitle(/activities\/.+/, 'Atividade'),
    new PageTitle(/analytics$/, 'Análise de Dados'),
    new PageTitle(/feed$/, 'Feed'),
    new PageTitle(/participants$/, 'Participantes')
]

