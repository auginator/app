export default class WorkersInterface {
    constructor() {

    }

    sendMessage(msg) {
        throw new TypeError('send message is not implemented');
    }

    response(msg, obj) {
        throw new TypeError('response is not implemented');
    }

    broadcast(msg) {
        throw new TypeError('broadcast is not implemented');
    }
}