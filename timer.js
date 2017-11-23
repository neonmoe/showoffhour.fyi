let SECOND = 1000;
let MINUTE = SECOND * 60;
let HOUR = MINUTE * 60;
let DAY = HOUR * 24;
let WEEK = DAY * 7;
// Offsets from Thursday (as 1.1.1970 (the epoch) was a Thursday)
let OFFSET_WEDNESDAY = DAY * 6;
let OFFSET_SATURDAY = DAY * 2;
let OFFSET_SUNDAY = DAY * 3;
// The #hours
let OFFSETS = [OFFSET_WEDNESDAY, OFFSET_WEDNESDAY + HOUR * 12, OFFSET_SATURDAY + HOUR * 18, OFFSET_SUNDAY + HOUR * 6];

let timerElement = document.getElementById("timer");

function updateTimer() {
    let time = Date.now();
    // Calculates the time until the given date
    let getTimeToDate = (date) => {
        let weeksPast = time / WEEK;
        let baseDate = Math.round((weeksPast - Math.floor(time / WEEK)) * WEEK);
        let finalDate = date - baseDate;
        if (finalDate < 0) finalDate += WEEK;
        return finalDate;
    };
    let nearestTime = WEEK;
    var theHourIsNow = false;
    OFFSETS.forEach((offset) => {
        let timeUntil = getTimeToDate(offset);
        if (timeUntil < nearestTime) {
            nearestTime = timeUntil;
        }
        if (timeUntil - WEEK > -HOUR) {
            timerElement.innerHTML = "It's #showoffhour!";
            theHourIsNow = true;
        }
    });
    if (!theHourIsNow) {
        let addLeadingZero = (n) => { if (n < 10) { return "0" + n; } else { return n; } };
        let day = addLeadingZero(Math.floor(nearestTime / DAY));
        let hour = addLeadingZero(Math.floor((nearestTime - day * DAY) / HOUR));
        let minute = addLeadingZero(Math.floor((nearestTime - day * DAY - hour * HOUR) / MINUTE));
        let second = addLeadingZero(Math.floor((nearestTime - day * DAY - hour * HOUR - minute * MINUTE) / SECOND));
        timerElement.innerHTML = day + ":" + hour + ":" + minute + ":" + second;
    }
}

updateTimer();
setInterval(updateTimer, 1000);
