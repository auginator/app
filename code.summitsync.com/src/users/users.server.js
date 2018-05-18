import jsonResponse from '../utils/jsonResponse';

export default class UsersServer {
    constructor() {
        this.users = [{ name: 'mike bike', email: 'mike@bike.com' }]
    }

    getUsers() {
        return Promise.resolve(jsonResponse.success(this.users));
    }
}