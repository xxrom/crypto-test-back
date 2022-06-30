export const getMillis = (timeout = 0) => Date.now() + timeout;
export const getSeconds = (timeout = 0) =>
  (Date.now() % 1000000) / 1000 + timeout;

let lastResponsTime = getMillis();
let queue = 0;

export const debounce = async (fn: Function, timeout = -1) => {
  if (timeout <= 0) {
    return fn();
  }

  queue += 1;
  console.log("debounce > queue", queue, getSeconds());

  const currentTime = getMillis();
  lastResponsTime = currentTime;
  const timeDiff = lastResponsTime + queue * timeout - currentTime;

  return new Promise((res) =>
    setTimeout(() => {
      queue -= 1;
      console.log("< end queue", queue, getSeconds());

      res("end queue");
    }, timeDiff)
  ).then(() => fn());
};
