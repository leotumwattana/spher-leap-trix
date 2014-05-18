// $(document).ready(function() {

// create an array of assets to load
var assetsToLoad = [
  "data/PixieSpineData.json",
  "data/Pixie.json",
  "data/PixieSpineData_red.json",
  "data/Pixie_red.json",
  "data/iP4_BGtile.jpg",
  "data/iP4_ground.png"];

// create a new loader
loader = new PIXI.AssetLoader(assetsToLoad);

// use callback
loader.onComplete = onAssetsLoaded;

//begin load
loader.load();

// create a renderer instance
renderer = new PIXI.autoDetectRenderer(1024, 640);

// set the canvas width and height to fill the screen
renderer.view.style.display = "block";
renderer.view.style.width = "100%"
renderer.view.style.height = "100%"

// add render view to DOM
// document.body.appendChild(renderer.view);

var postition = 0;
var background;
var background2;

function onAssetsLoaded() {

  // create an new instance of a pixi stage
  stage = new PIXI.Stage(0xFFFFFF, true);

  background = PIXI.Sprite.fromImage("data/iP4_BGtile.jpg");
  background2 = PIXI.Sprite.fromImage("data/iP4_BGtile.jpg");
  stage.addChild(background);
  stage.addChild(background2);

  foreground = PIXI.Sprite.fromImage("data/iP4_ground.png");
  foreground2 = PIXI.Sprite.fromImage("data/iP4_ground.png");
  stage.addChild(foreground);
  stage.addChild(foreground2);
  foreground.position.y = foreground2.position.y = 640 - foreground2.height;

  var pixie = new PIXI.Spine("data/PixieSpineData.json");
  console.log("lala");

  var scale = 0.3;//window.innerHeight / 700;

  pixie.position.x = 1024/10;
  pixie.position.y =  500

  pixie.scale.x = pixie.scale.y = scale


  //dragon.state.setAnimationByName("running", true);

  stage.addChild(pixie);

  pixie.stateData.setMixByName("running", "jump", 0.2);
  pixie.stateData.setMixByName("jump", "running", 0.4);

  pixie.state.setAnimationByName("running", true);


  // Pixie Red
  var pixie_red = new PIXI.Spine("data/PixieSpineData_red.json");

  var scale = 0.3;//window.innerHeight / 700;

  pixie_red.position.x = 1024/4;
  pixie_red.position.y =  500

  pixie_red.scale.x = pixie_red.scale.y = scale


  //dragon.state.setAnimationByName("running", true);

  stage.addChild(pixie_red);

  pixie_red.stateData.setMixByName("running", "jump", 0.2);
  pixie_red.stateData.setMixByName("jump", "running", 0.4);

  pixie_red.state.setAnimationByName("running", true);

  requestAnimFrame(animate);

  // controller = Leap.loop { enableGestures: true }, (frame) ->
  //     if frame.valid && frame.gestures.length > 0
  //       frame.gestures.forEach (gesture) ->
  //         switch gesture.type
  //           when 'keyTap'
  //             handleKeyTapGesture(gesture)

  //   handleKeyTapGesture = (gesture) ->
  //     console.log "It's alive!!!"
  //     Meteor.call 'moveSphero', 'FORWARD', 128

  var controller = Leap.loop({enableGestures: true}, function(frame) {
    if(frame.valid && frame.gestures.length > 0) {
      frame.gestures.forEach(function(gesture){
        if(gesture.type === 'keyTap'){
          pixie.position.x = pixie.position.x + 10;
        }
      });
    }
  });

  // Leap.loop(function(frame) {
  //   if (frame.hands.length > 0) {

      // console.log(frame.hands.length);

      // pixie.position.x = pixie.position.x + frame.hands.length

  //   }
  // });
}


function animate() {

  postition += 10;

  background.position.x = -(postition * 0.6);
  background.position.x %= 1286 * 2;
  if(background.position.x<0)background.position.x += 1286 * 2;
  background.position.x -= 1286;

  background2.position.x = -(postition * 0.6) + 1286;
  background2.position.x %= 1286 * 2;
  if(background2.position.x<0)background2.position.x += 1286 * 2;
  background2.position.x -= 1286;

  foreground.position.x = -postition;
  foreground.position.x %= 1286 * 2;
  if(foreground.position.x<0)foreground.position.x += 1286 * 2;
  foreground.position.x -= 1286;

  foreground2.position.x = -postition + 1286;
  foreground2.position.x %= 1286 * 2;
  if(foreground2.position.x<0)foreground2.position.x += 1286 * 2;
  foreground2.position.x -= 1286;

  requestAnimFrame( animate );

  //  Leap.loop(function(frame) {
  // if (frame.hands.length > 0) {

  //   background.position = background.position + frame.hands.length
  //   background2.position = background2.position + frame.hands.length
  //   foreground.position = foreground.position + frame.hands.length
  //   foreground2.position = foreground2.position + frame.hands.length

  // }
  // });


  renderer.render(stage);
}
// });