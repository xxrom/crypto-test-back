export const getMillis = () => Date.now();

let lastResponsTime = getMillis();
let queue = 0;

export const debounce = async (fn: Function, timeout = -1) => {
  if (timeout <= 0) {
    return fn();
  }

  queue += 1;
  //console.log("debounce:", timeout);
  console.log("debounce > queue", queue, (getMillis() % 1000000) / 1000);

  const currentTime = getMillis();
  lastResponsTime = currentTime;
  const timeDiff = lastResponsTime + queue * timeout - currentTime;

  return await new Promise((res) =>
    setTimeout(() => {
      queue -= 1;
      console.log("< end queue", queue, (getMillis() % 1000000) / 1000);

      res("end");
    }, timeDiff)
  ).then(() => fn());
};
