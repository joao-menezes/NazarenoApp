import Toast from "react-native-toast-message";

class ToastService {
    static showSuccess(message: string, description?: string) {
        Toast.show({
            type: "success",
            text1: message,
            text2: description,
            position: "top",
        });
    }

    static showError(message: string, description?: string) {
        Toast.show({
            type: "error",
            text1: message,
            text2: description,
            position: "top",
        });
    }

    static showInfo(message: string, description?: string) {
        Toast.show({
            type: "info",
            text1: message,
            text2: description,
            position: "top",
        });
    }
}

export default ToastService;
