export const juegos = (state) => {
    return state.juegos
}

export const juego = (state) => {
    return state.juego
}

export const page = (state) => {
    return state.page + 1
}

export const search = (state) => {
    return state.search
}

export const desarrolladora = (state) => {
    return state.desarrolladora
}

export const genero = (state) => {
    return state.genero
}

export const paginateActive = (state) => {
    return state.paginateActive
}

export const order = (state) => {
    return state.order
}

export const generos = (state) => {
    return state.generos
}

export const items = (state) => {
    return state.items
}

export const isLoading = (state) => {
    return state.isLoading
}

//Update
export const editNombre = (state) => {
    return state.juego.nombre
}

export const editDesarrolladora = (state) => {
    return state.juego.desarrolladora?.nombre
}

export const editDescripcion = (state) => {
    return state.juego.descripcion
}

export const editGeneros = (state) => {
    const generosSelected = [];
    if (state.juego.generos != undefined) {
        for (let i = 0; i < state.juego.generos.length; i++) {
            generosSelected[i] = state.juego.generos[i].nombre;
        }
    }
    return generosSelected
}

export const editImagen = (state) => {
    return state.juego.imagen
}

export const editFecha = (state) => {
    return state.juego.fecha
}

export const editSlug = (state) => {
    return state.juego.slug
}

export const imageInitial = (state) => {
    return state.imageInitial
}