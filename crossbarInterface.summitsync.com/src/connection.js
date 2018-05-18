import autobahn from '../resources/autobahn.min.jgz';

export default class CrossbarConnection {
    constructor(wsUrl, onJoin = Promise.resolve(), onLeave = Promise.resolve()) {
        this.wsUrl = wsUrl;
        this.onJoin = onJoin;
        this.onLeave = onLeave;
        this.connection = null;
        this.connected = false;
        this.session = null;
    }

    _connect() {
        return new autobahn.Connection({
            url: this.wsUrl,
            realm: 'realm1'
        });
    }

    _session() {
        if (!this._getSession) {
            this._getSession = new Promise((resolve, reject) => {
                try {
                    this.connection = this._connect();

                    this.connected = true;

                    this.connection.onopen = (session, details) => {
                        this.session = session;
                        this.onJoin(session, details)
                            .then(_ => {
                                this.session.caller_disclose_me = true;
                                resolve(this.session);
                            });
                    }

                    this.connection.onclose = (reason, details) => {
                        this.connected = false;
                        this._getSession = null;
                        this.onLeave(reason, details)
                            .then(_ => { });
                        if (reason === 'lost') {
                            return true;
                        }
                    }
                } catch (ex) {
                    console.log('autobahn connection error: ', ex);
                }
            });
        }
        return this._getSession;
    }

    close() {
        if (this.connected) {
            this.connection.close();
        }
    }

    exec(config, callback) {
        return this._session()
            .then(_ => {
                this[config.type](config, callback);
            });
    }

    call(config, callback) {
        this.session.call(config.namespace, config.parameters, config.kwargs, config.options)
            .then(response => {
                callback({ id: config.id, status: 'success', response });
            }, err => {
                callback({ id: config.id, status: 'error', error });
            });
    }
}