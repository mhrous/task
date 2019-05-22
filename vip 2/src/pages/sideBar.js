import { auth, PAGE_NAME } from '../utlis';

export default ({ data, _PAGES_ }) => {
  let activePage = 'ALL_CARS';
  const sidebar = $('#sidebar');
  const randerPage = () => {
    console.log(activePage, _PAGES_, 555555555);
    _PAGES_[activePage].render();
  };
  const rander = () => {
    activePage = 'ALL_CARS';

    let str = '';
    str += data.LOG_IN
      ? `
    <a class="item active" data-id="${PAGE_NAME.daily}">رحلات اليوم</a>
    <a class="item" data-id="${PAGE_NAME.status}">حالة السائقين</a>
    <a class="item" data-id="${PAGE_NAME.allDriver}">السائقين</a>
    <a class="item" data-id="${PAGE_NAME.allPartner}">الشركاء</a>
    <a class="item" data-id="${PAGE_NAME.allCars}">السيارات</a>
    <a class="item" data-id="${PAGE_NAME.receipts}">دفعات</a>
    <div class="action">
      <button id="settings" class=" ui big primary button">
        الاعدادت
      </button>
      <button id="log-out" class="ui big primary button">
        تسجيل الخروج
      </button>
    </div>
  </div>`
      : `
      <a class="item active" data-id="${PAGE_NAME.daily}">رحلات اليوم</a>
      <a class="item" data-id="${PAGE_NAME.status}">حالة السائقين</a>
      <div class="action">

        <button id="log-in" class="ui big primary button">
          تسجيل الدخول
        </button>
      </div>
    </div>`;

    sidebar.html(str);
    randerPage();
  };

  const init = () => {
    sidebar.on('click', '.item', function() {
      $('#sidebar .active').removeClass('active');
      $(this).addClass('active');
      activePage = $(this).data('id');
      console.log(activePage);
      randerPage();
    });
    sidebar.on('click', '#log-in', function() {
      data.redraw('LOG_IN_PAGE');
    });
    sidebar.on('click', '#log-out', function() {
      data.LOG_IN = false;
      rander();
      auth(null);
    });

    sidebar.on('click', '#settings', function() {
      $('#sidebar .active').removeClass('active');
      activePage = PAGE_NAME.settings;
      randerPage();
    });
  };

  init();
  rander();

  return { rander };
};
