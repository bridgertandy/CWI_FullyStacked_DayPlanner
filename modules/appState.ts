import CalendarEvent from "./classCalendarEvent";
import StorageManager from "./dataStorage";
import { CalendarViews } from "./enumCalendarViews";


class AppState {
  private _allEvents: CalendarEvent[];
  private _calendarView: CalendarViews;
  private _dateView: Date;

  constructor() {
    this._allEvents = StorageManager.loadAllEvents();
    this._calendarView = StorageManager.loadCalendarView();
    this._dateView = new Date();
    this._dateView.setHours(0, 0, 0, 0);
  }

  // Read-only getter for allEvents, as events should only be modified through addEvent and removeEvent methods
  get allEvents(): CalendarEvent[] {
    return this._allEvents;
  }

  get calendarView(): CalendarViews {
    return this._calendarView;
  }

  set calendarView(view: CalendarViews) {
    if (!Object.values(CalendarViews).includes(view)) {
      throw new Error(
        `Invalid calendar view. Valid views are: ${Object.values(CalendarViews).join(", ")}`,
      );
    }
    this._calendarView = view;
    StorageManager.saveCalendarView(view);
  }

  get dateView(): Date {
    return this._dateView;
  }

  set dateView(date: Date | string) {
    if (typeof date === "string") {
      date = new Date(date);
      date.setHours(0, 0, 0, 0);
    }
    if (isNaN(date.getTime())) {
      throw new Error(
        "Invalid date format. Please provide a valid Date object or date string.",
      );
    }
    this._dateView = date;
  }
}

/**
 * Class that holds allEvents, calendarView, and dateView.
 * Initially loads allEvents and calendarView from localStorage, sets dateView to current date.
 */
const appState = new AppState();

export default appState;
