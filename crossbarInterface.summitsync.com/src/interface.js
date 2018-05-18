import uuid from 'uuid';

export default class CrossbarInterface {
    constructor() {

    }

    addCallback(resolve, reject, ttl) {
        let id = `_${uuid.v1()}`;
        let cb = { resolve, reject, ttl };
        this.callbacks[id] = cb;      
        return id;
    }

    request(config) {
        return new Promise((resolve, reject) => {
            let ttl = config.handler && config.handler.ttl ? config.handler.ttl : null;
            let id = this.addCallback(resolve, reject, ttl);
            return this.requestCallback(config, id);
        });
    }

    call(namespace, data) {
        return this.request({ namespace, data, type: 'call' });
    }

    register(namespace, data) {
        return this.request({ namespace, data, type: 'register' });
    }

    publish(namespace, data) {
        return this.request({ namespace, data, type: 'publish' });
    }

    subscribe(namespace, data) {
        return this.request({ namespace, data, type: 'subscribe' });
    }

    unsubscribe(namespace, data) {
        return this.request({ namespace, data, type: 'unsubscribe' });
    }
}