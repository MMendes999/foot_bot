var FootballBot = require('footballbot');
var bot = new FootballBot('/dev/tty.HC-06-DevB');
var keypress = require('keypress');

bot.on('ready', function () {
  var left = bot.attach(new FootballBot.Motor({pins: {pwm: 9, dir: 7}}));
  var right = bot.attach(new FootballBot.Motor({pins: {pwm: 10, dir: 8}}));
  //dont start motors untill wee issue a commmand with the keyboard
  var motorsStarted = false;

  this.digitalWrite(13, this.HIGH);

  //set the function to initiate motors with keyboard input
  function startMotors () {
    if (!motorsStarted) {
      left.start();
      right.start();
      motorsStarted = true;
    }
  }

  //show our command on the command line
  this.reply.inject({left: left, right: rigth});

  // make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);

  //initate streamin on keypress event
  process.stdin.on('keypress', function (ch, key) {
    if (!key) return; //if no key is pressed, do nothing

    if (key.name == 'up') { //move forward if up key is pressed
      left.forward();
      right.forward();
      startMotors();
    } else if (key.name == 'down') { //move backwards if down key is pressed
      left.reverse();
      right.reverse();
      startMotors();
    } else if (key.ctrl && key.name == 'c') { //exit the process if key + control or "c" is pressed
      process.exit();
        }
  });

  //read process stream in as raw input
  process.stdin.setRawMode(true);
  process.stdin.resume();
});
