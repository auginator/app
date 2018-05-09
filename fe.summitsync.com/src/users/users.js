import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { UsersService } from 'code.summitsync.com/dist/users/users.service';

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

    this.showModal = true;
  }

  canActivate() {
    console.log('USERS SERVICE', this.usersService);
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
    debugger;
    this.showModal = false;
  }
}
