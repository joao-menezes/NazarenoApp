import axios from 'axios';
import {User} from "../common/interface/user.interface";
import {mockedUser} from "../mocked";

export class ApiService {
    static api = axios.create({
        baseURL: 'http://192.168.15.43:3000/api',
        timeout: 10000,
    });

    static async getPresence(){
        try {
            const response = await ApiService.api.get('/presence');
            return response.data;
        } catch (error) {
            console.error("Erro ao pegar presença:", error);
            throw error;
        }
    };


    static async savePresence (presenceList: User[]){
        try {
            const response = await ApiService.api.post('/presence', presenceList);
            return response.data;
        } catch (error) {
            console.error("Erro ao salvar presença:", error);
            throw error;
        }
    };

    static async getUsers() {
        try {
            const response = await ApiService.api.get('/users');
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error(`Erro na API - status: ${error.response.status}, dados:`, error.response.data);
                return mockedUser
            } else if (error.request) {
                console.error('Nenhuma resposta recebida:', error.request);
                return mockedUser
            } else {
                console.error('Erro ao configurar requisição:', error.message);
                return mockedUser
            }
            throw error;
        }
    }
}
