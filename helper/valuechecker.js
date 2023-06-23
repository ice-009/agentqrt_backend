
exports.valueChecker = (field,type) => {
    if (typeof(field) != type.type) {
        console.log('experiment successfull')
      return true;
    }
    return false;
  };