var copy = require('copy-to');

copy(require('./campaigns'))
  .and(require('./lists'))
  .and(require('./reports'))
  .to(module.exports);
