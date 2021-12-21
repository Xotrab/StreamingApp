import { Genre } from "src/app/helpers/genre.enum";

export interface UploadSongDto {
    file: File;
    genre: Genre;
};