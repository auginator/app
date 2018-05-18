import WorkerBase from './worker.base';

export default class SharedWorker extends WorkerBase {
    constructor() {
        super();
    }
}

let worker = new SharedWorker();
(function (self) {
    self.onconnect = e => {

        console.log('WORKER CONNECTED', e);

        let port = e.ports[0];
        port.onmessage = msg => {
            worker.sendMessage(msg.data);
        }
    }
})(typeof self !== 'undefined' ? self : {});