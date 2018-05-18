import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { UsersService } from 'code.summitsync.com/dist/users/users.service';
import autobahn from '../../lib/autobahn';

// polyfill fetch client conditionally
const fetchPolyfill = !self.fetch
  ? System.import('isomorphic-fetch' /* webpackChunkName: 'fetch' */)
  : Promise.resolve(self.fetch);

@inject(Lazy.of(HttpClient), UsersService)
export class Users {
  heading = 'Github Users';
  users = [];

  constructor(getHttpClient, usersService) {
    this.getHttpClient = getHttpClient;
    this.usersService = usersService;
    //this.usersService.relayInterfaceClient = new RelayInterfaceClient;
    this.showModal = true;

    let autobahnConn = new autobahn.Connection({
      url: 'ws://127.0.0.1:9090/ws',
      realm: 'realm1'
    });

    autobahnConn.onopen = (session, details) => {
      session.call('users.getUsers', [])
        .then(res => {
          console.log('users results: ', res);
        }, err => {
          console.log('users error: ', err)
        });
    }

    autobahnConn.onclose = (reason, details) => {
      console.log('Connection closed: ', reason, details);
    }

    autobahnConn.open();

    setTimeout(_ => {
      //autobahnConn.close();
    }, 30000);
  }

  canActivate() {
    /*console.log('USERS SERVICE', this.usersService);
    this.usersService.getUsers()
      .then(u => {
        console.log('SERVICE USERS', u);
      });*/
    return true;
  }

  async activate() {
    // ensure fetch is polyfilled before we create the http client
    await fetchPolyfill;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    const response = await http.fetch('users');
    this.users = await response.json();
  }

  closeModal() {
    this.showModal = false;
  }
}
