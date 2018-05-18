import MessengerInterface from '../messengers.interface';

var instance = null;
export default class Worker extends MessengerInterface {
    constructor(onSuccess = () => { }, onError = () => { }) {
        if (!instance) {
            super(onSuccess, onError);
            this._init();
            instance = this;
        }
        return instance;
    }

    _init() {
        this.sharedWorker = new SharedWorker('dist-resources/workers/worker.shared.js?v=1');
        this.sharedWorker.port.onmessage = (msg) => {
            this._onSuccess(msg.data);
        }
        this.sharedWorker.onerror = (err) => {
            this._onError(err);
        }
    }

    _onSuccess(data) {
        this.onSuccess(data);
    }

    _onError(err) {
        this.onError(err);
    }

    send(msg) {
        this.sharedWorker.port.postMessage(msg);
    }
}