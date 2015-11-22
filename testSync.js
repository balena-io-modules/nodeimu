var util = require('util')
var nodeimu  = require('./index.js');
var IMU = new nodeimu.IMU();

var num = 0;
var numStop = 100;

console.time("sync");

function dispAccel() {
  var tic = new Date(); 
  var data = IMU.getValueSync();
  var toc = new Date();
  var sx = data.accel.x >= 0 ? ' ' : '';
  var sy = data.accel.y >= 0 ? ' ' : '';
  var sz = data.accel.z >= 0 ? ' ' : '';

  var str = util.format('%s%s %s%s %s%s', sx, data.accel.x.toFixed(4), sy, data.accel.y.toFixed(4), sz, data.accel.z.toFixed(4));
  var str2 = "";
  if (data.temperature && data.pressure && data.humidity) {
    var str2 = util.format(' %s %s %s', data.temperature.toFixed(4), data.pressure.toFixed(4), data.humidity.toFixed(4));
  }
  console.log(str + str2);
  num++;
  if (num == numStop) {
    console.timeEnd("sync");
  } else {
    setTimeout(dispAccel, 50 - (toc - tic));
  }
}

dispAccel();

