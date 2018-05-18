import UsersClient from './users.client';

export class UsersService {
    constructor() {        
        this._usersClient = null;
    }

    get usersClient() {
        if(this._usersClient === null){
            this._usersClient = new UsersClient();
        }
        return this._usersClient;
    }

    getUsers() {
        console.log('getting users from service')
        return this.usersClient.getUsers()
            .then(res => {
                this.users = res.data;
                return res;
            });
    }
}