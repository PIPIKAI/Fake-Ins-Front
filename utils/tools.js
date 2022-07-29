const parseHead = function (s) {
  // eslint-disable-next-line no-new-object
  const dict = new Object()
  let temp = ''
  let key = ''
  for (const char of s) {
    if (char === '=') {
      key = temp
      temp = ''
    } else if (char === ';') {
      dict[key] = temp
      temp = ''
    } else {
      temp += char
    }
  }
  dict[key]=temp
  return dict
}
export default parseHead
