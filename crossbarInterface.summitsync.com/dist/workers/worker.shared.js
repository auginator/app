'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _worker = require('./worker.base');

var _worker2 = _interopRequireDefault(_worker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SharedWorker = function (_WorkerBase) {
    _inherits(SharedWorker, _WorkerBase);

    function SharedWorker() {
        _classCallCheck(this, SharedWorker);

        return _possibleConstructorReturn(this, (SharedWorker.__proto__ || Object.getPrototypeOf(SharedWorker)).call(this));
    }

    return SharedWorker;
}(_worker2.default);

exports.default = SharedWorker;


var worker = new SharedWorker();
(function (self) {
    self.onconnect = function (e) {

        console.log('WORKER CONNECTED', e);

        var port = e.ports[0];
        port.onmessage = function (msg) {
            worker.sendMessage(msg.data);
        };
    };
})(typeof self !== 'undefined' ? self : {});
//# sourceMappingURL=worker.shared.js.map
