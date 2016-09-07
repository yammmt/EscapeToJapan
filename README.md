# EscapeToJapan

NEETs, get out of your room and go somewhere decided by your own fortune.  

## Abstract
If you open index.html and click START button, the roulette starts. And then you click STOP button, the roulette stops at random.  
Once you click Blue button (before click START button), that button changes to white button and can**not** be selected by roulette. Of course, if you click white button, that button changes to blue button and can be selected.

When the roulette stops, selected button changes to red and link to Google appears. (To visit Google, you need to connect Internet, not only local.)

### Parameters
Following parameters are defined in the main.js:
- ROULETTE_SPEED_DEFAULT
  - The roulette speed until you click STOP button.
- ROULETTE_SPEED_UPPER_LIMIT
  - The slowest roulette speed after you click STOP button.
- TIME_TO_CLEAR_MIN
  - The shortest time to decelerate roulette speed after you click STOP button.
- TIME_TO_CLEAR_MAX
  - The longest time to decelerate roulette speed after you click STOP button.
  - Actually, the real longest time is not the same as this.
- TIME_TO_CLEAR_ADDED_MAX
  - The longest time added to inteval time (clear setTimeout).

Note that roulette speed and the time to clear timeoutID is **not** the same parameters.

### Coding Style
See [JavaScript style guide (JP)](https://developer.mozilla.org/ja/docs/JavaScript_style_guide) by the Mozilla Developer Network.

## License
- This program is released under the MIT license.
- [Bootstrap](http://getbootstrap.com/) is released under the MIT license, by Twitter, Inc.
- [jQuery](https://jquery.com/) is released under the MIT license (see [here](https://github.com/jquery/jquery/blob/master/LICENSE.txt)), by The jQuery Foundation.
  - jQuery is used in Bootstrap.

___

## Others
- This program is based on the idea of [ダーツの旅](http://www.ntv.co.jp/warakora/index.html).
- [経県](http://uub.jp/kkn/) might be helpful to select which prefectures to nominate.
