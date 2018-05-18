import CrossbarConnection from '../connection';
import WorkerInterface from './worker.interface';

export default class WorkerBase extends WorkerInterface {
    constructor() {
        super();
    }

    sendMessage(msg) {
        let namespace = msg.namespace;
        return this.crossbarConnection.exec(msg, obj => {
            this.response(msg, obj);
        });
    }

    response(msg, obj) {
        return obj;
    }

    get crossbarConnection() {
        if (!this.cbConnection) {
            this.cbConnection = new CrossbarConnection('ws://127.0.0.1/ws', (session, details) => { return this.onJoin(session, details) }, (reason, details) => { return this.onLeave(reason, details) });
        }
        return this.cbConnection;
    }

    onJoin(session, details) {
        return Promise.resolve(session)
            .then(session => {
                return session
            });
    }

    onLeave(reason, details) {
        return Promise.reject(details)
            .then(details => {
                return details;
            });
    }
}