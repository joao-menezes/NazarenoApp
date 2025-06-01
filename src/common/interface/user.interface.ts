import {RoleEnum} from "../enums/role.enum";

export interface User {
    userId: string;
    userPicUrl: string;
    username: string;
    birthDate: Date;
    roomId: string;
    role: RoleEnum;
    phoneNumber: string;
}