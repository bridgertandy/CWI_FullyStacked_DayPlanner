import eventTests from "./classCalendarEvent_test";
import storageTests from "./dataStorage_test";
import appStateTests from "./appState_test";
import appSettingsTests from "./appSettings_test";
import calendarNavigationFunctionsTest from "./use-calendar-nav-button_test";
import calendarHeaderDisplayTests from "./calendar-header-display_test";
import holidayTests from "./holidayTesting";

function runTests() {
  eventTests();
  storageTests();
  appStateTests();
  appSettingsTests();
  calendarNavigationFunctionsTest();
  calendarHeaderDisplayTests();
  holidayTests();
}

export default runTests;
