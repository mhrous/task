import { PAGE_NAME } from '../utlis';

export default ({ data }) => {
  const _NAME_ = PAGE_NAME.car;
  // console.log(_NAME_);

  const init = () => {};
  const render = () => {
    data.CONTENT.children('.--page--').addClass('hidden');
    $(`#${_NAME_}`).removeClass('hidden');

  };

  return { render };
};
