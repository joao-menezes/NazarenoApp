import * as FileSystem from 'expo-file-system';
import { ApiService } from "./api.service";
import ToastService from "./toast.service";

export class ReportService {

    static async DownloadReport() {
        const fileName = 'relatorio-presenca.pdf';
        const fileUri = `${FileSystem.documentDirectory}${fileName}`;

        const downloadUrl = `${ApiService.api.defaults.baseURL}/report`;

        try {
            console.log(`Iniciando download de ${downloadUrl} para ${fileUri}`);

            const downloadResumable= FileSystem.createDownloadResumable(
                downloadUrl,
                fileUri,
                {},
            );

            const downloadResponse = await downloadResumable.downloadAsync();

            if (!downloadResponse) {
                console.error('Erro no download: Resposta do downloadAsync está vazia.');
                ToastService.showError('Error', 'Falha ao obter resposta do download.');
                return null;
            }
            console.log('Resposta do download:', JSON.stringify(downloadResponse, null, 2));

            if (downloadResponse.status !== 200) {
                console.error(`Erro no download: Status HTTP inesperado: ${downloadResponse.status}`);
                let serverErrorMessage = 'Erro no servidor.';
                try {
                    const errorContent = await FileSystem.readAsStringAsync(downloadResponse.uri, { encoding: FileSystem.EncodingType.UTF8 });
                    try {
                        const errorJson = JSON.parse(errorContent);
                        serverErrorMessage = errorJson.message || JSON.stringify(errorJson);
                    } catch { serverErrorMessage = errorContent; }
                    await FileSystem.deleteAsync(downloadResponse.uri, { idempotent: true });
                } catch (readError) {
                    console.warn('Não foi possível ler a resposta de erro do servidor.', readError);
                }
                ToastService.showError('Error no Download', `O servidor respondeu com status ${downloadResponse.status}. ${serverErrorMessage}`);
                return null;
            }
            const fileInfo = await FileSystem.getInfoAsync(downloadResponse.uri);

            if (!fileInfo.exists) {
                console.error('Erro no download: Arquivo não encontrado após download.', fileInfo);
                ToastService.showError('Error', 'O arquivo baixado não foi encontrado no dispositivo.');
                return null;
            }

            if (fileInfo.size === 0) {
                console.error('Erro no download: Arquivo baixado está vazio.', fileInfo);
                ToastService.showError('Error', 'O arquivo baixado está vazio.');
                await FileSystem.deleteAsync(downloadResponse.uri, { idempotent: true });
                return null;
            }

            console.log(`Arquivo salvo com sucesso em: ${downloadResponse.uri}`);
            ToastService.showError('Sucesso', 'Relatório baixado com sucesso.');
            return downloadResponse.uri;

        } catch (error: any) {
            console.error('Erro durante o processo de download do relatório:', error);
            let errorMessage = 'Não foi possível baixar o relatório.';
            if (error.message) {
                errorMessage += `\nDetalhes: ${error.message}`;
            }
            throw error;
        }
    }
}
