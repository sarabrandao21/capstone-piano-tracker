export const formatDurationWithSec = (sec) => {
  const date = new Date(0);
  date.setSeconds(sec);
  const dateInString = date.toISOString();
  return dateInString.substr(11, 8);
};

export const stringToSeconds = (time) => {
  //index 0 == hour, 1 == min, 2 == sec
  const hourMinSec = time.split(":");
  const hourToSec = Number(hourMinSec[0]) * 60 * 60;
  const minTosec = Number(hourMinSec[1]) * 60;
  const totalSec = hourToSec + minTosec + Number(hourMinSec[2]);
  return totalSec;
};

export const formatDate = (date) => {
  const formattedDate = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
  return formattedDate;
};

export const formatTimeAsWords = (time) => {
  const timeArr = time.split(":");
  let result = "";
  const hours = parseInt(timeArr[0]);
  const minutes = parseInt(timeArr[1]);
  const seconds = parseInt(timeArr[2]);

  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? "s" : ""}, `;
  }
  if (minutes > 0) {
    result += `${minutes} minute${minutes > 1 ? "s" : ""} `;
  }
  if (parseInt(timeArr[2]) > 0) {
    result += `and ${seconds} second${seconds > 1 ? "s" : ""}`;
  }

  return result;
};
