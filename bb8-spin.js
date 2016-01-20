var Cylon = require('cylon');
var json = require('./bb8.json');

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'central', uuid: json.bb8.uuid, module: 'cylon-ble'}
  },

  devices: {
    bb8: { driver: 'bb8', module: 'cylon-sphero-ble'}
  },

  work: function(my) {
    //1秒後に右回転する処理
    after((1).second(), function() {
      console.log("bb8 is spinning right.");
      my.bb8.spin("right", 100);
      my.bb8.color(0xFF0000)
    });
    //5秒後に左回転する処理
    after((5).second(), function() {
      console.log("bb8 is spinning left.");
      my.bb8.spin("left", 100);
      my.bb8.color(0xFF0000)
    });
    //10秒後に停止する処理
    after((10).seconds(), function() {
      my.bb8.stop();
      my.bb8.color(0xFF0000)
      console.log("bb8 is stopped.");
    });
  }
}).start();
