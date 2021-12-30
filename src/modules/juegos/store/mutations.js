export const setJuegos = (state, { data, page, order }) => {
  if (page === 1) {
    state.juegos = data
    state.paginateActive = true
    state.order = null
  } else {
    state.juegos = state.juegos.concat(data)
  }
  if (data.length <= 0) state.paginateActive = false
  order.value != null ? state.order = order : state.order = null
  state.page = page
  state.search = null
  state.genero = null
  state.desarrolladora = null
}

export const searchJuegos = (state, { data, search }) => {
  state.juegos = data
  state.paginateActive = false
  state.search = search
  state.genero = null
  state.desarrolladora = null
}

export const setJuegosDesarrolladora = (state, { data, page, slug }) => {
  state.juegos = data
  state.paginateActive = false
  state.page = page
  state.desarrolladora = slug
  state.search = null
  state.genero = null
}

export const setJuegosGenero = (state, { data, page, slug }) => {
  state.juegos = data
  state.paginateActive = false
  state.page = page
  state.genero = slug
  state.search = null
  state.desarrolladora = null
}

export const setOrder = (state, order) => {
  state.order = order
  state.page = 0
  state.paginateActive = true
}

export const setOrderSearch = (state, order) => {
  state.order = order
  state.page = 1
  state.paginateActive = true
}

export const setScreenItems = (state, items) => {
  state.items = items
}

export const setJuegoDelete = (state, slug) => {
  state.juegos = state.juegos.filter(function (juego) {
    return juego.slug !== slug;
  });
}

export const setJuego = (state, juego) => {
  state.juego = juego
}

export const setDesarrolladoras = (state, desarrolladoras) => {
  state.desarrolladoras = desarrolladoras
}

export const setGeneros = (state, generos) => {
  state.generos = generos
}

export const setLoadingActivate = (state) => {
  state.isLoading = true
}

export const setLoadingDesactivate = (state) => {
  state.isLoading = false
}

export const setPusherAddJuego = (state, juego) => {
  state.juegos = [juego].concat(state.juegos)
  state.juegos.splice(-1)
}

export const setPusherUpdateJuego = (state, {juego, oldSlug}) => {
  const foundIndex = state.juegos.findIndex(x => x.slug === oldSlug);
  if (foundIndex != undefined) state.juegos[foundIndex] = juego
  if (state.juego.slug === oldSlug) state.juego = juego
}

export const setPusherDeleteJuego = (state, slug) => {
  state.juegos = state.juegos.filter(function (juego) {
    return juego.slug !== slug;
  });
  state.items = state.items - 1
}

//Update
export const setEditNombre = (state, nombre) => {
  state.juego.nombre = nombre
}

export const setEditDesarrolladora = (state, desarrolladora) => {
  if (desarrolladora != "") state.juego.desarrolladora.nombre = desarrolladora
}

export const setEditDescripcion = (state, descripcion) => {
  state.juego.descripcion = descripcion
}

export const setEditGeneros = (state, generos) => {
  state.juego.generos = generos
}

export const setEditImagen = (state, imagen) => {
  state.juego.imagen = imagen
}

export const setEditFecha = (state, fecha) => {
  state.juego.fecha = fecha
}

export const setImageInitial = (state, imagen) => {
  state.imageInitial = imagen
}