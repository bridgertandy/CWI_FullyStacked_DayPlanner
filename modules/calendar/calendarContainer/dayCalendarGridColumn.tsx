import DayCalendarHourGridLines from './dayCalendarHourGridLines';
import DayCalendarCurrentTimeLine from './dayCalendarCurrentTimeLine';

type Props = {
	slots: number[];
	slotHeight: number;
	currentMinutesFromMidnight: number | null;
};

export default function DayCalendarGridColumn({
	slots,
	slotHeight,
	currentMinutesFromMidnight,
}: Props) {
	return (
		<div id="calendarDayGridColumn" className="calendarDayGridColumn">
			<DayCalendarHourGridLines slots={slots} slotHeight={slotHeight} />
			<DayCalendarCurrentTimeLine
				currentMinutesFromMidnight={currentMinutesFromMidnight}
			/>
		</div>
	);
}