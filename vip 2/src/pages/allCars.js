import {
  PAGE_NAME,
  tableConfig,
  emptyTableRender,
  connectInputNodeWithValueInsideObject,
  postJSON,
  addError,
  restNodeInput,
  emptyObj,
  getJSON
} from '../utlis';

export default ({ data }) => {
  const _NAME_ = PAGE_NAME.allCars;
  const tableNode = $('#ALL_CARS #ALL_CARS_TABLE');
  let table = null;
  const modal = $('#ALL_CARS #car-modal');
  const addBtn = $('#ALL_CARS .add-btn');
  const saveBtn = $('#ALL_CARS .save-btn ');

  const nameNode = $('#ALL_CARS input[name=name]');
  const numberNode = $('#ALL_CARS input[name=number]');
  const expensesMaxNode = $('#ALL_CARS input[name=expensesMax]');
  const typeNode = $('#ALL_CARS input[name=type]');
  const obj = {};

  const reset = () => {
    restNodeInput([nameNode, numberNode, expensesMaxNode, typeNode]);
    emptyObj(obj);
  };

  const resetTable = async () => {
    table.clear();

    try {
      const res = await getJSON('admin/car');
      console.log(res, 'kkkkkkkkkkkkkkk');
      for (let i in res.data) console.log(i, res.data[i].name);
      table.rows.add(res.data);
      table.draw(true);
    } catch (e) {}
  };

  const saveCar = async () => {
    const { name, number, expensesMax } = obj;
    (!name || name.length < 3) && addError(nameNode);
    (!number || number.length < 3) && addError(numberNode);
    (!expensesMax || !expensesMax.length) && addError(expensesMaxNode);

    console.log(
      obj,
      !name || name.length < 3,
      !number || number.length < 3,
      !expensesMax || !expensesMax.length
    );

    if (
      !name ||
      name.length < 3 ||
      !number ||
      number.length < 3 ||
      !expensesMax ||
      !expensesMax.length
    )
      return;

    saveBtn.addClass('disabled');
    try {
      const res = await postJSON('admin/car', obj);

      table.row.add(res.data).draw(false);
      modal.modal('hide');
    } catch (e) {
      e.number && addError(numberNode);
      e.name && addError(nameNode);
      e.expensesMax && addError(expensesMaxNode);
    }

    saveBtn.removeClass('disabled');
  };

  const init = () => {
    table = tableNode.DataTable({
      ...tableConfig,
      columns: [
        { title: 'اسم', data: 'name' },
        { title: 'رقم', data: 'number' },
        { title: 'مصروف', data: 'expensesMax' },
        { title: 'نوع', data: 'type' },
        {
          data: '_id',
          orderable: false,
          render: function(data) {
            console.log('render', data);
            return `<button class="ui icon  primary button">
            <i class="edit outline
            icon"></i>
          </button> <button class="ui icon red  button">
          <i class="trash alternate outline icon"></i>
        </button>`;
          }
        }
      ]
    });
    tableNode.on('click', 'tr', function() {
      console.log(table.row(this).data());
    });
    emptyTableRender();
    connectInputNodeWithValueInsideObject(nameNode, obj, 'name');
    connectInputNodeWithValueInsideObject(numberNode, obj, 'number');
    connectInputNodeWithValueInsideObject(expensesMaxNode, obj, 'expensesMax');
    connectInputNodeWithValueInsideObject(typeNode, obj, 'type');

    addBtn.on('click', function() {
      modal.modal('show');
      reset();
    });
    saveBtn.on('click', saveCar);
  };

  const render = () => {
    data.CONTENT.children('.--page--').addClass('hidden');
    $(`#${_NAME_}`).removeClass('hidden');
    resetTable();
  };

  init();

  return { render };
};
