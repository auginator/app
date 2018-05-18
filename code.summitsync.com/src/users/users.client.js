import CrossbarInterfaceClient from '../crossbar/client.interface';

export default class UsersClient {
    constructor() {
        this.crossbarInterfaceClient = new CrossbarInterfaceClient;        
    }

    getUsers(){
        return this.crossbarInterfaceClient.call('users.getUsers', []);
    }
}