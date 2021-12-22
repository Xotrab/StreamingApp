import { Genre } from "src/app/helpers/genre.enum";
import { ApplicationUserDto } from "./application-user-dto";

export interface SongDto {
    id: number;
    name: string;
    url: string;
    genre: Genre;
    playbacks: number;
    likes: number;
    addedOn: Date;
    author: ApplicationUserDto;
};