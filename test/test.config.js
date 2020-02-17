const path = require('path');
global.chai = require('chai');
global.expect = global.chai.expect;
global.chai.use(require('chai-as-promised'));
global.srcDir = path.resolve(path.join(__dirname, '../lib') );

process.on('unhandledRejection', (reason, p) => {

  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);

  process.exit(-1); // eslint-disable-line
});
