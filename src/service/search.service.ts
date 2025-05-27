import { User } from "../common/interface/user.interface";

export const normalizeText = (text: string) => {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
};

export const filterUsers = (users: User[], query: string): User[] => {
    if (!query) return users;

    const normalizedQuery = normalizeText(query.toLowerCase());

    return users.filter((user) => {
        const normalizedUsername = normalizeText(user.username.toLowerCase());

        const matchesUsername = normalizedUsername.includes(normalizedQuery);
        const matchesAge = user.age.toString().includes(normalizedQuery);

        return matchesUsername || matchesAge;
    });
};
