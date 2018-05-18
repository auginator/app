import autobahn from 'autobahn';

var instance = null;

export default class AutobahnConnection {
    constructor() {
        if (instance) {
            return instance;
        }

        this.connect();
        instance = this;
    }

    connect() {
        let connection = new autobahn.Connection({
            url: 'ws://127.0.0.1:9090/ws',
            realm: 'realm1'
        });        
        this.connection = connection;
    }
}