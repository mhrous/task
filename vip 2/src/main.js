import '@babel/polyfill';
import {
  __ALL_CARS__,
  __ALL_DRIVER__,
  __ALL_PARTNER__,
  __CAR__,
  __DRIVER__,
  __PARTNER__,
  __LOG_IN__,
  __RECEIPTS__,
  __SETTINGS__,
  __SIDE_BAR__,
  __STATUS__,
  __DAILY__
} from './pages';
import data from './Data';

$(document).ready(function() {
  const CAR = __CAR__({ data });

  const ALL_CARS = __ALL_CARS__({ data, CAR });
  const DRIVER = __DRIVER__({ data });

  const ALL_DRIVER = __ALL_DRIVER__({ data, DRIVER });
  const PARTNER = __PARTNER__({ data });

  const ALL_PARTNER = __ALL_PARTNER__({ data, PARTNER });
  const RECEIPTS = __RECEIPTS__({ data });
  const SETTINGS = __SETTINGS__({ data });
  const STATUS = __STATUS__({ data });
  const DAILY = __DAILY__({ data });

  const sideBar = __SIDE_BAR__({
    data,
    _PAGES_: {
      ALL_CARS,
      ALL_DRIVER,
      ALL_PARTNER,
      RECEIPTS,
      SETTINGS,
      STATUS,
      DAILY
    }
  });

  __LOG_IN__({ data, sideBar });
});
