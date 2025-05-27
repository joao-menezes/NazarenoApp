import {User} from "../common/interface/user.interface";

export const normalizeText = (text: string) => {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
};

const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

export const filterUsers = (users: User[], query: string): User[] => {
    if (!query) return users;

    const normalizedQuery = normalizeText(query.toLowerCase());

    return users.filter((user) => {
        const normalizedUsername = normalizeText(user.username.toLowerCase());

        const age = calculateAge(user.birthDate);
        const matchesUsername = normalizedUsername.includes(normalizedQuery);
        const matchesAge = age.toString().includes(normalizedQuery);

        return (
            matchesUsername ||
            matchesAge
        );
    });
};