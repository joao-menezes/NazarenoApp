import {User} from "./common/interface/user.interface";
import {RoleEnum} from "./common/enums/role.enum";

export const mockedUser: User[] = [
    {
        userId: "1",
        userPicUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        username: "john.doe",
        birthDate: new Date("1990-05-15"),
        roomName: "Math 101",
        role: RoleEnum.Admin,
        phoneNumber: "+1-202-555-0125",
        attendance: 18
    },
    {
        userId: "2",
        userPicUrl: "https://randomuser.me/api/portraits/women/45.jpg",
        username: "jane.smith",
        birthDate: new Date("1985-11-30"),
        roomName: "Physics 202",
        role: RoleEnum.Professor,
        phoneNumber: "+44-7911-123456",
        attendance: 34
    },
    {
        userId: "3",
        userPicUrl: "https://randomuser.me/api/portraits/men/64.jpg",
        username: "michael.brown",
        birthDate: new Date("2000-07-21"),
        roomName: "Chemistry 303",
        role: RoleEnum.Student,
        phoneNumber: "+61-412-345-678",
        attendance: 34
    },
    {
        userId: "4",
        userPicUrl: "https://randomuser.me/api/portraits/men/74.jpg",
        username: "Ismaeel.Pittman",
        birthDate: new Date("2002-09-12"),
        roomName: "Chemistry 303",
        role: RoleEnum.Student,
        phoneNumber: "+61-412-345-678",
        attendance: 67
    },
    {
        userId: "5",
        userPicUrl: "https://randomuser.me/api/portraits/men/44.jpg",
        username: "Cassius.Thornton",
        birthDate: new Date("2003-06-14"),
        roomName: "Chemistry 303",
        role: RoleEnum.Student,
        phoneNumber: "+61-412-345-678",
        attendance: 45
    },
    {
        userId: "6",
        userPicUrl: "https://randomuser.me/api/portraits/women/25.jpg",
        username: "emily.watson",
        birthDate: new Date("1998-03-12"),
        roomName: "Biology 404",
        role: RoleEnum.Moderator,
        phoneNumber: "+55-11-91234-5678",
        attendance: 24
    },
    {
        userId: "7",
        userPicUrl: "https://randomuser.me/api/portraits/men/78.jpg",
        username: "david.lee",
        birthDate: new Date("1995-09-05"),
        roomName: "History 505",
        role: RoleEnum.Professor,
        phoneNumber: "+33-6-12-34-56-78",
        attendance: 15
    },
];
