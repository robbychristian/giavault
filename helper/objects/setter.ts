export const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any, data: any, setData: React.Dispatch<React.SetStateAction<any>>) => {
  const { name, value } = event.target;
  let parsedValue: any = value;

  const parsedDate = Date.parse(value);
  if (!isNaN(parsedDate)) {
    parsedValue = new Date(parsedDate);
  }

  setData({ ...data, [name]: value });
};

export const arrayToObject = (arr: []) => {
  return arr.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});
};

export const objectToArray = (obj: any) => {
  const { fields } = obj;
  return Object.entries(fields).map(([key, value]) => ({
    key,
    value,
  }));
};
