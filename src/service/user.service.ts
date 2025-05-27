import {User} from "../common/interface/user.interface";
import {ApiService} from "./api.service";

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await ApiService.api.get('/users');
        return response.data.Users;
    } catch (error) {
        throw error;
    }
};

export const setUsersPresence = async (): Promise<User[]> => {
    try {
        const response = await ApiService.api.post('/users');
        return response.data.Users;
    } catch (error) {
        throw error;
    }
};

export const editUsersPresence = async (): Promise<User[]> => {
    try {
        const response = await ApiService.api.put('/users');
        return response.data.Users;
    } catch (error) {
        throw error;
    }
};
