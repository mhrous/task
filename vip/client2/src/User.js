import { observable, action } from 'mobx';
import { auth } from './lib';
import { TOKEN_NAME } from './config';

class User {
  @observable logIn = false;

  @action
  logOut() {
    this.logIn = false;

    localStorage.removeItem(TOKEN_NAME);
    auth(null);
  }
  @action
  logIn({ TOKEN }) {
    this.logIn = true;

    localStorage.setItem(TOKEN_NAME, TOKEN);
    auth(TOKEN);
  }
}

export default new User();
