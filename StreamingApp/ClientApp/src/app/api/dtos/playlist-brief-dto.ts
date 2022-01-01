import { ApplicationUserDto } from "./application-user-dto";

export interface PlaylistBriefDto {
    id: number;
    name: string;
    songIds: Array<number>;
    playbacks: number;
    likes: number;
    likedByUser: boolean;
    author: ApplicationUserDto;
};