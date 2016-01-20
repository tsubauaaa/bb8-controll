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
    my.bb8.collisionCount = 0;
    my.bb8.moveCount = 0;
    my.bb8.moveHeading = 0;

    //Collisionの定義
    after((1).seconds(), function() {
      console.log("Setting up Collision Detection...");
      my.bb8.detectCollisions();
    });
    //四角に動く処理
    every((1).second(), function() {
      my.bb8.moveCount += 1;
      console.log("move:", my.bb8.moveCount);
      if(my.bb8.moveCount % 2 == 0) {
        my.bb8.moveHeading += 90;
      }
      if(my.bb8.moveHeading > 360) {
        my.bb8.moveHeading = 0;
      }
      my.bb8.roll(600, my.bb8.moveHeading);
      my.bb8.randomColor()
    });

    my.bb8.on("collision", function() {
    console.log("Collision:", ++my.bb8.collisionCount);
    my.bb8.color(0x00FFFF);
    });
  }
}).start();
