export const convertToObject = (data: string) => {
  const splitArray = data.split('\\"');
  const object = JSON.parse(splitArray.join());
  return object;
};
