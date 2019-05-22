class Data {
  constructor() {
    this.API_URL = 'http://localhost:4000/vip/';
    this.TOKEN_NAME = 'VIP_TOKEN';
    this.LOG_IN_PAGE = $('#log-in-page');
    this.MAIN_PAGE = $('#container');
    this.CONTENT = $('#content-container');
    this.LOG_IN = true;
    this.page = 'log-in';
  }
  redraw = pageName => {
    switch (pageName) {
      case 'MAIN_PAGE':
        this.MAIN_PAGE.removeClass('hidden');
        this.LOG_IN_PAGE.addClass('hidden');
        return;
      case 'LOG_IN_PAGE':
        this.MAIN_PAGE.addClass('hidden');
        this.LOG_IN_PAGE.removeClass('hidden');
        return;

      default:
        break;
    }
  };
}

export default new Data();
