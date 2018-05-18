'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _interface = require('./interface');

var _interface2 = _interopRequireDefault(_interface);

var _messenger = require('./messengers/messenger.initializer');

var _messenger2 = _interopRequireDefault(_messenger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var instance = null;

var CrossbarInterfaceClient = function (_CrossbarInterface) {
    _inherits(CrossbarInterfaceClient, _CrossbarInterface);

    function CrossbarInterfaceClient() {
        var _ret;

        _classCallCheck(this, CrossbarInterfaceClient);

        var _this = _possibleConstructorReturn(this, (CrossbarInterfaceClient.__proto__ || Object.getPrototypeOf(CrossbarInterfaceClient)).call(this));

        if (!instance) {
            _this.callbacks = {};
            _this.initWorker();
            instance = _this;
        }

        return _ret = instance, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CrossbarInterfaceClient, [{
        key: 'requestCallback',
        value: function requestCallback(config, id) {
            var callbackId = void 0;
            if (config && config.handler) {
                callbackId = this.addCallback(config.handler.resolve, config.handler.reject, config.handler.ttl);
            }
            this.messagingAgent.send({
                namespace: config.namespace,
                parameters: config.parameters,
                path: config.path,
                id: id,
                callbackId: callbackId,
                type: config.type
            });
        }
    }, {
        key: 'triggerCallback',
        value: function triggerCallback(callback, id, status, response, error) {
            try {
                if (status !== 'error') {
                    callback.resolve(response);
                } else {
                    var err = error ? (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && !(error instanceof Error) ? Object.assign(new Error(), error) : new Error(error) : null;
                    callback.reject(err || error);
                }
            } catch (ex) {
                console.log('triggerCallback error: ', ex);
            }
        }
    }, {
        key: 'initWorker',
        value: function initWorker() {
            var _this2 = this;

            this.messagingAgent = _messenger2.default.get(function (msg) {
                var id = msg.id,
                    status = msg.status,
                    response = msg.response,
                    error = msg.error;

                if (_this2.callbacks[id]) {
                    var callback = _this2.callbacks[id];
                    _this2.triggerCallback(callback, id, status, response, error);

                    var ttl = callback.ttl;
                    if (!ttl || typeof ttl === 'undefined' || ttl === null || ttl <= 1 && ttl !== -1) {
                        delete _this2.callbacks[id];
                    } else {
                        if (ttl !== -1) {
                            callback.ttl--;
                        }
                    }
                }
            }, function (err) {
                console.log('Worker On Error: ', err);
            });
        }
    }]);

    return CrossbarInterfaceClient;
}(_interface2.default);

exports.default = CrossbarInterfaceClient;
//# sourceMappingURL=interface.client.js.map
