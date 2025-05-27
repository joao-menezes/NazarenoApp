import {RoleEnum} from "../enums/role.enum";

export interface User {
    userId: string;
    userPicUrl: string,
    username: string,
    birthDate: Date,
    roomName: string,
    role: RoleEnum,
    phoneNumber: string,
    attendance: number
}