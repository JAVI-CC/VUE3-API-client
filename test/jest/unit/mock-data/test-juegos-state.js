export const juegosState = {
    juegos: [
        {
            nombre: "Mario Kart 8",
            descripcion: "Mario Kart 8 contará con nuevos personajes, ajustes jugables y un renovado Modo Batalla. De esta forma, Mario Kart 8 Deluxe tendrá 48 circuitos (los 32 del original más los 16 de los DLC) y 40 personajes, cinco de ellos nuevos. Estos son Inkling chico e Inkling chica de Splatoon, el Rey Boo, Huesitos y Bowsy, así como nuevas piezas con las que configurar nuestros vehículos.",
            desarrolladora: {
                nombre: "Nintendo Entertainment",
                slug: "nintendo-entertaiment"
            },
            generos: [
                {
                    nombre: "Carreras",
                    slug: "carreras"
                }
            ],
            fecha: "2014-05-29",
            slug: "mario-kart-8",
            imagen: "http://127.0.0.1:8000/media/juegos/34-mario-kart-8.png?t=1641979121"
        },
        {
            nombre: "DOOM ETERNAL",
            descripcion: "DOOM Eternal es la secuela del éxito de 2016, DOOM. Ahondando de nuevo en las raíces clásicas del género de acción en primera persona, la segunda parte desarrollada por id Software y Bethesda sigue apostando por la guerra sin cuartel contra los demonios.",
            desarrolladora: {
                nombre: "Id Software",
                slug: "id-software"
            },
            generos: [
                {
                    nombre: "Aventura",
                    slug: "aventura"
                },
                {
                    nombre: "First Person Shooter",
                    slug: "first-person-shooter"
                },
                {
                    nombre: "Plataformas",
                    slug: "plataformas"
                }
            ],
            fecha: "2020-03-20",
            slug: "doom-eternal",
            imagen: "http://127.0.0.1:8000/media/juegos/7-doom-eternal.png?t=1641976878"
        },
        {
            nombre: "Bloodborne",
            descripcion: "Bloodborne es un juego exclusivo de From Software, diseñado por Hidetaka Miyazaki, creador de Dark Souls y Demons Souls. Como éstos, es un título de acción y rol en el que priman los enfrentamientos contra complicados enemigos que nos pondrán en apuros. La ambientación es entre gótica y apocalíptica, llevándonos a un mundo steampunk con armas de fuego y criaturas fantásticas.",
            desarrolladora:
            {
                nombre: "From Software",
                slug: "from-software"
            },
            generos: [
                {
                    nombre: "Acción",
                    slug: "accion"
                },
                {
                    nombre: "Aventura",
                    slug: "aventura"
                },
                {
                    nombre: "RPG de Acción",
                    slug: "rpg-de-accion"
                }
            ],
            fecha: "2015-03-24",
            slug: "bloodborne",
            imagen: "http://127.0.0.1:8000/media/juegos/9-bloodborne.png?t=1641979317"
        }
    ],
    juego: [],
    desarrolladoras: [],
    generos: [],
    search: null,
    page: 1,
    errorMessage: "",
    desarrolladora: null,
    genero: null,
    paginateActive: true,
    order: null,
    items: 8,
    imageInitial: null,
    isLoading: true,
}