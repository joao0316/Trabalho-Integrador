import { createMovieModel, findMovieByNameModel, selectMoviesModel } from "../model/movie";

export async function createMovie(name:string, releaseDate:string, imageURL:string) {
    try {
        const movieByName = await findMovieByNameModel(name);

        if ( movieByName != undefined ) {
            return { message: "Movie already registered" };
        }

        const response = await createMovieModel(name, releaseDate, imageURL);
        return response;

    }
    catch (err) {
        return { message: "Something went wrong" };
    }
}

export async function selectMovies() {
    try {
        const movies = await selectMoviesModel();

        return movies;

    }
    catch(err) {
        return { message: "Something went wrong" };
    }
}

export async function findMovieByName(name:string) {
    try {
        const movie = await findMovieByNameModel(name);

        if ( movie == undefined ) {
            return { message: "Movie not found" };
        }

        return movie;

    }
    catch(err) {
        return { message: "Something went wrong" };
    }
}