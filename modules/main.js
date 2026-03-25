// import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/baseStyling.css";
import "../styling/calendar.css";
import "../styling/dayCalendar.css";
import "../styling/eventForm.css";
import "../styling/weeklyCalendar.css";

import React from "react";
import { createRoot } from "react-dom/client";

import StorageManager from "./dataStorage.js";
import appSettings from "./settings.js";
import createSettingsMenu from "./settingsMenu.js";

import CalendarDisplayButtonsGroup from "./calendar/navigation/calendar-display-buttons-group.tsx";
import CalendarNavButtonsGroup from "./calendar/navigation/calendar-nav-buttons-group.tsx";
import { updateHeaderDate } from "./calendar/headerDate.js";
import { renderCalendarView, CalendarView } from "./calendar/calendar.js";
import initTodayButton from "./todayButton.js";

import { initializeEventManager } from "./eventManager.js";

import { loadWeatherDisplay } from "./weatherDisplay.js";

import runTests from "../tests/runTests.js";

// Load events and user settings from localStorage when the application starts
const allEvents = StorageManager.loadAllEvents();
appSettings.loadSettings();

createSettingsMenu();

initializeEventManager();
initTodayButton();

const viewDate = new Date();
viewDate.setHours(0, 0, 0, 0);
const calendarState = { viewDate, calendarView: CalendarView.DAY };

// Renders the calendar
function render() {
  renderCalendarView(
    allEvents,
    calendarState.viewDate,
    calendarState.calendarView,
  );
  updateHeaderDate(calendarState); // Updates the header date
}

const displayButtonsRootElement = document.getElementById(
  "calendarDisplayButtonsRoot",
);
if (displayButtonsRootElement) {
  const displayButtonsRoot = createRoot(displayButtonsRootElement);
  const renderDisplayButtons = () => {
    displayButtonsRoot.render(
      <CalendarDisplayButtonsGroup
        activeView={calendarState.calendarView}
        onSelectView={(view) => {
          calendarState.calendarView = view;
          render();
          renderDisplayButtons();
        }}
      />,
    );
  };

  renderDisplayButtons();
}

const calendarNavigationButtonsRootElement = document.getElementById(
  "calendarNavButtonsContainer",
);
if (calendarNavigationButtonsRootElement) {
  const calendarNavigationButtonsRoot = createRoot(
    calendarNavigationButtonsRootElement,
  );
  const renderCalendarNavButtons = () => {
    calendarNavigationButtonsRoot.render(
      <CalendarNavButtonsGroup state={calendarState} onRender={render} />,
    );
  };

  renderCalendarNavButtons();
}

render();
document
  .getElementById("slotDurationSelect")
  ?.addEventListener("change", render); // Event listener for the slot duration select

loadWeatherDisplay();

// runTests();
