import eventTests from "./classCalendarEvent_test.js";
import storageTests from "./dataStorage_test.js";

function runTests() {
  eventTests();
  storageTests();
}

export default runTests;
