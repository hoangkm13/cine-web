import {CommentDTO, FilmDTO} from "../cine-svc";

export interface ErrorDialogData {
  title?: string
  buttonText?: string
  description?: string
  onAccept: Function
}

export interface SnackBarData {
  message: string
}

export interface idFavorite {
  idFavorite: number,
  idFilm: number
}

export interface FilmByGenre {
  film: FilmDTO
  idFavorite?: number
}

export interface LandingData {
  genre: string,
  data: Array<FilmByGenre>
}
