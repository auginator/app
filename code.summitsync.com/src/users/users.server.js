export default class UsersServer {
    constructor() {
        this.users = [{ name: 'mike bike', email: 'mike@bike.com' }]
    }

    getUsers() {
        return this.users;
    }
}