
exports.nullChecker = (field) => {
  console.log("null checker " + field)
  if (field === undefined || field === null) {
    return true;
  }
  return false;
};