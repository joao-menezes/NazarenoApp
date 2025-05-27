import axios from 'axios';
import {User} from "../common/interface/user.interface";

export class ApiService {
    static api = axios.create({
        baseURL: 'http://localhost:3000/api',
    });

    static async savePresence (presenceList: User[]){
        try {
            const response = await ApiService.api.post('/presence', presenceList);
            return response.data;
        } catch (error) {
            console.error("Erro ao salvar presença:", error);
            throw error;
        }
    };

    static async getUsers()  {
        try {
            const response = await ApiService.api.get('/presence');
            return response.data;
        } catch (error) {
            console.error("Erro ao pegar os usuarios:", error);
            throw error;
        }
    };
}
