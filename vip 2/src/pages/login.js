import {
  postJSON,
  auth,
  connectInputNodeWithValueInsideObject,
  addError,
  restNodeInput,
  emptyObj
} from '../utlis';

export default ({ data, sideBar }) => {
  console.log(data);
  const logInButton = $('#log-in-page #log-in-btn');
  const backButton = $('#log-in-page #back');
  const nameNode = $('#log-in-page input[name=name]');
  const passwordNode = $('#log-in-page input[name=password]');
  const obj = {};

  const reset = () => {
    restNodeInput([nameNode, passwordNode]);
    emptyObj(obj);
  };

  const logIn = async () => {
    const { name, password } = obj;
    if (!name || name.length < 4 || name.length > 50) addError(nameNode);

    if (!password || password.length < 4 || password.length > 50)
      addError(passwordNode);

    if (
      !name ||
      !password ||
      name.length < 4 ||
      name.length > 50 ||
      password.length < 4 ||
      password.length > 50
    ) {
      return;
    }
    logInButton.addClass('disabled');

    try {
      const res = await postJSON(`signin`, obj);
      auth(res);
      data.LOG_IN = true;
      sideBar.rander();
      data.redraw('MAIN_PAGE');
      reset();
    } catch (e) {
      e.password && addError(passwordNode);
      e.name && addError(nameNode);
    }
    logInButton.removeClass('disabled');
  };

  const init = () => {
    connectInputNodeWithValueInsideObject(passwordNode, obj, 'password');
    connectInputNodeWithValueInsideObject(nameNode, obj, 'name');

    backButton.on('click', function() {
      data.redraw('MAIN_PAGE');
    });

    logInButton.on('click', logIn);
  };

  init();
};
