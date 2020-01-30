module.exports = function stringAsArray(values) {
  return values.split(',').map(value => value.trim());
};
