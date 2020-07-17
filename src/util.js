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
