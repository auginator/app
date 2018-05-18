'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _users = require('code.summitsync.com/dist/users/users.server');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersServer = new _users2.default();

var services = {
    getUsers: function getUsers() {
        return usersServer.getUsers();
    }
};

exports.default = services;
//# sourceMappingURL=services.js.map
