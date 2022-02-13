export const page = (state) => {
    return state.page + 1
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
    let generosSelected = [];
    if (state.juego.generos != undefined) {
        generosSelected = state.juego.generos.map(gen => gen.nombre)
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