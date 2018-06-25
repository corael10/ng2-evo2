export class User {

    constructor(
        public id: number,
        public is_superuser: number,
        public username: string, 
        public first_name: string,
        public last_name?: string,
        public is_staff?: string,
        public is_active?: string,  
        public password?: string,
        public email?: string, 
        public date_joined?: string, 
           
    ) {

    }
}
export class UserAuth {
    Login: string;
    Password: string;
}
export class UserPassword {
    id: number;
    usuario : string;
    password_anterior: string;
    password: string;
}
