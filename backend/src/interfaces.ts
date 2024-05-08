export interface INotebook {
    notebook: {
        notebook: boolean
        tag: string
        modelo: string
        numero_serie: string
        versao: string
        caracteristicas: string
        observacao: string
    }
}

export interface IDesktop {
    desktop: {
        desktop: boolean
        tag: string
        modelo: string
        numero_serie: string
        versao: string
        caracteristicas: string
        observacao: string
    }
}

export interface IScreen1 {
    monitor: {
        monitor: boolean
        modelo: string
        numero_serie: string
        observacao: string
    }
}

export interface IScreen2 {
    monitor: {
        monitor: boolean
        modelo: string
        numero_serie: string
        observacao: string
    }
}

export interface ITeclado {
    teclado: {
        teclado: boolean
        modelo: string
        numero_serie: string
        observacao: string
    }
}

export interface IMouse {
    mouse: {
        mouse: boolean
        modelo: string
        numero_serie: string
        observacao: string
    }
}

export interface IAcessorios {
    acessorios: {
        acessorios: boolean
        suporte_notebook: boolean
        mouse_pad: string
        observacao: string
    }
}

export interface INobreak {
    nobreak: {
        nobreak: boolean
        modelo: string
        numero_serie: string
        observacao: string
    }
}

export interface IHeadset {
    headset: {
        headset: boolean
        modelo: string
        numero_serie: string
        observacao: string
    }
}

export interface ICelular {
    celular: {
        celular: boolean
        modelo: string
        imei: string
        numero: string
        observacao: string
    }
}

