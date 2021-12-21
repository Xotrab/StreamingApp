import { ApplicationUserDto } from "./application-user-dto";
import { SongDto } from "./song-dto";

export interface PlaylistDto {
    id: number;
    name: string;
    songs: Array<SongDto>;
    playbacks: number;
    likes: number;
    author: ApplicationUserDto;
};