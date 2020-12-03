export const parseToken = (t?: string) => t && t.split(/\s+/).filter(Boolean).pop();

export const padLeft = (str: string, length: number, pad = ' ') => {
  let newStr = str;
  while (newStr.length !== length) {
    newStr += pad;
  }
  return newStr;
};

export const padRight = (str: string, length: number, pad = ' ') =>
  padLeft(str.split('').reverse().join(''), length, pad).split('').reverse().join('');
