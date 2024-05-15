export function getDate(day, weeksForward) {
    var startDate = new Date();
    var endDate = new Date();
    var todayWeekday = startDate.getDay();

    // Calcuate how many days away the next selected weekday is 
    var daysAway = todayWeekday <= day ? day - todayWeekday : (7-todayWeekday) + day;

    // Default weekday is the current weekday
    if (day === -1) {
        daysAway = 0;
    }

    // Get the start and end date of the weekday 
    startDate.setDate(startDate.getDate() + daysAway + 7*weeksForward);
    endDate.setDate(startDate.getDate() + 7);

    // Start and end dates in 'YYYY-MM-DD' format
    const startDateStr = startDate.getFullYear() + '-' + startDate.getMonth().toString().padStart(2, '0') + '-' + startDate.getDate().toString().padStart(2, '0');
    const endDateStr = endDate.getFullYear() + '-' + endDate.getMonth().toString().padStart(2, '0') + '-' + endDate.getDate().toString().padStart(2, '0');

    return [startDateStr, endDateStr];
}