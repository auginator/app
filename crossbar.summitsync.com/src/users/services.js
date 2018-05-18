import UsersServer from 'code.summitsync.com/dist/users/users.server';

let usersServer = new UsersServer;

let services = {
    getUsers : () => {
        return usersServer.getUsers();
    }
}

export default services;