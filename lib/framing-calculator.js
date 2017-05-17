'use strict';

const debug = require('debug')('yesterdays:framing-calculator');

module.exports = exports = {};

exports.exteriorFramingCalc = function(perimeter, studSpacing, corners, openings) {
  debug('framing exterior calculator');
  let estimate = {
    studs: 0;
    plates: 0;
  }

  studs = Math.ceil((perimeter / studSpacing) + (corners * 4) + (openings * 3));
  plates = Math.ceil(perimeter / 16);
  return estimate;
};

exports.interiorFramingCalc = function(wallLength, studSpacing, corners, openings) {
  debug('framing interior calculator');

  let studs = 0;
  let plates = 0;
  studs = Math.ceil((wallLength / studSpacing) + (corners * 4) + (openings * 3));
  plates = Math.ceil(wallLength / 16);
};
