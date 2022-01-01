import { ApplicationUserDto } from "./application-user-dto";
import { PlaylistBriefDto } from "./playlist-brief-dto";
import { SongDto } from "./song-dto";

export interface SearchResultDto {
    songs: Array<SongDto>;
    playlistBriefs?: Array<PlaylistBriefDto>;
    users?: Array<ApplicationUserDto>;
}