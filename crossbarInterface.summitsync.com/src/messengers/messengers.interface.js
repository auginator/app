export default class MessengerInterface {
    constructor(onSuccess = () => { }, onError = () => { }) {
        this.onSuccess = onSuccess;
        this.onError = onError;
    }

    send(msg) {
        throw new TypeError('send not implemented');
    }

    _onSuccess(msg) {
        throw new TypeError('on success not implemented');
    }

    _onError(err) {
        throw new TypeError('on error not implemented');
    }
}