'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messengers = require('../messengers.interface');

var _messengers2 = _interopRequireDefault(_messengers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var instance = null;

var Worker = function (_MessengerInterface) {
    _inherits(Worker, _MessengerInterface);

    function Worker() {
        var onSuccess = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

        var _ret;

        var onError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        _classCallCheck(this, Worker);

        if (!instance) {
            var _this = _possibleConstructorReturn(this, (Worker.__proto__ || Object.getPrototypeOf(Worker)).call(this, onSuccess, onError));

            _this._init();
            instance = _this;
        }
        return _ret = instance, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Worker, [{
        key: '_init',
        value: function _init() {
            var _this2 = this;

            this.sharedWorker = new SharedWorker('dist-resources/workers/worker.shared.js?v=1');
            this.sharedWorker.port.onmessage = function (msg) {
                _this2._onSuccess(msg.data);
            };
            this.sharedWorker.onerror = function (err) {
                _this2._onError(err);
            };
        }
    }, {
        key: '_onSuccess',
        value: function _onSuccess(data) {
            this.onSuccess(data);
        }
    }, {
        key: '_onError',
        value: function _onError(err) {
            this.onError(err);
        }
    }, {
        key: 'send',
        value: function send(msg) {
            this.sharedWorker.port.postMessage(msg);
        }
    }]);

    return Worker;
}(_messengers2.default);

exports.default = Worker;
//# sourceMappingURL=messenger.worker.js.map
