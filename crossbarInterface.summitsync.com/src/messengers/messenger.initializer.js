import Worker from './messengers/messenger.worker';

export default class MessengerInitializer {
    constructor() {

    }

    static useWorker() {
        return !!window.SharedWorker;
    }

    static get(onSuccess = () => { }, onError = () => { }) {
        if (MessengerInitializer.useWorker()) {
            return new Worker(onSuccess, onError);
        }
    }
}