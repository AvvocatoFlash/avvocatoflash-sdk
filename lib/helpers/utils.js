
const Utils = {

  removeEmptyStrings(data) {
    return Object.keys(data).reduce((acc, prop) => {
        if (data[prop] !== '' && data[prop] !== undefined) {
          return Object.assign(acc, {[prop]: data[prop]});
        }
        return acc;
      },
      {});
  },

};

module.exports = Utils;
