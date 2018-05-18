import UsersServices from '../users/services';

import AutobahnConnection from './connection';

var autobahnConnection = new AutobahnConnection();

export default class Router {
    constructor() {
        this.connect();
    }

    connect() {
        autobahnConnection.connection.onopen = (session) => {            
            session.register('users.getUsers', UsersServices.getUsers)
                .then(reg => {
                    console.log('procedure was registered ', reg.procedure);
                }, err => {
                    console.log('error registaring procedure ', err);
                });
        }        
        autobahnConnection.connection.open();
    }
}

var router = new Router();