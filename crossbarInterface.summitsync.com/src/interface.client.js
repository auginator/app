import CrossbarInterface from './interface';
import MessengerInitializer from './messengers/messenger.initializer';

var instance = null;
export default class CrossbarInterfaceClient extends CrossbarInterface {
    constructor() {
        super();
        if (!instance) {
            this.callbacks = {};
            this.initWorker();
            instance = this;
        }

        return instance;
    }

    requestCallback(config, id) {
        let callbackId;
        if (config && config.handler) {
            callbackId = this.addCallback(config.handler.resolve, config.handler.reject, config.handler.ttl);
        }
        this.messagingAgent.send({
            namespace: config.namespace,
            parameters: config.parameters,
            path: config.path,
            id,
            callbackId,
            type: config.type
        });
    }

    triggerCallback(callback, id, status, response, error) {
        try {
            if (status !== 'error') {
                callback.resolve(response);
            } else {
                let err = error ? (typeof error === 'object' && !(error instanceof Error) ? Object.assign(new Error(), error) : new Error(error)) : null;
                callback.reject(err || error);
            }
        } catch (ex) {
            console.log('triggerCallback error: ', ex);
        }
    }

    initWorker() {
        this.messagingAgent = MessengerInitializer.get(msg => {
            let { id, status, response, error } = msg;
            if (this.callbacks[id]) {
                let callback = this.callbacks[id];
                this.triggerCallback(callback, id, status, response, error);

                let ttl = callback.ttl;
                if (!ttl || typeof ttl === 'undefined' || ttl === null || (ttl <= 1 && ttl !== -1)) {
                    delete this.callbacks[id];
                } else {
                    if (ttl !== -1) {
                        callback.ttl--;
                    }
                }
            }
        }, err => {
            console.log('Worker On Error: ', err);
        })
    }
}