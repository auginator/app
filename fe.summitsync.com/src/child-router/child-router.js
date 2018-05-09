import { PLATFORM } from 'aurelia-pal';

export class ChildRouter {
  heading = 'Child Router';

  configureRouter(config, router) {
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: PLATFORM.moduleName('../welcome/welcome'),      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: PLATFORM.moduleName('../users/users'),        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: PLATFORM.moduleName('../child-router/child-router'), nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
