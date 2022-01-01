import { Genre } from "src/app/helpers/genre.enum";

export interface SearchDto {
    filter: string;
    genre? : Genre;
    onlySongs: boolean;
}