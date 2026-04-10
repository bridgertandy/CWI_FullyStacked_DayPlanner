import { useEffect } from "react";
import CalendarEvent from "../../classCalendarEvent";
import * as Calendar from "../calendar"
import DayCalendarGridColumn from "./dayCalendarGridColumn";
import DayCalendarTimeSlotColumn from "./dayCalendarTimeSlotColumn";
import createAllSlotsForDay from "../dailyCalendar";


type Props = {
	events: CalendarEvent[];
	viewDate: Date;
	slotDuration: number;
};

/**
 * Builds the calendar screen for a single day
 * Calculates:
 * - which time slots to show
 * - how tall each slot should be in pixels
 * - whether we are viewing today (to show the current-time line)
 * 
 * Renders:
 * - DayCalendarTimeSlotColumn - time labels on the left
 * - DayCalendarGridColumn - grid lines, current-time line, and events on the right  
 */
export default function DayView({ events, viewDate, slotDuration }: Props) {
	/**
	 * If viewing today, calculates how many minutes have passed since midnight
	 * Example: 9:30 AM = 570 minutes
	 * If not viewing today, null is passed down to hide the current-time line.
	 */
	const currentMinutesFromMidnight = Calendar.isToday(viewDate)
		? Calendar.calculateTheCurrentMinutesFromMidnight()
		: null;

	// Height of each time slot row in pixels.
	const slotHeight = slotDuration * Calendar.PIXELS_PER_MINUTE;

	// Array of slot start values (minutes from midnight) for the full day.
	const slots = createAllSlotsForDay(slotDuration);

	/**
	 * Matches the old vanilla JS behavior
	 * when viewing today, scroll the active slot row into view automatically.
	 * Re-runs whenever the viewed date or slot duration changes.
	 */
	useEffect(() => {
	if (!Calendar.isToday(viewDate)) return;

	const activeRow = document.querySelector(
		'.calendarTimeSlotRow[data-active="true"]',
	);

	if (activeRow instanceof HTMLElement) {
		activeRow.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
		}
	}, [viewDate, slotDuration]);

	return (
		<div id="calendarDayContentWrapper" className="calendarDayContent">
			<DayCalendarTimeSlotColumn 
				slots={slots}
				currentMinutesFromMidnight={currentMinutesFromMidnight}
				slotDuration={slotDuration}
				slotHeight={slotHeight}
			/>
			<DayCalendarGridColumn
				slots={slots}
				slotHeight={slotHeight}
				currentMinutesFromMidnight={currentMinutesFromMidnight}
			/>
		</div>
	);
}