var THREE = require('three');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// audio stuff
var audioLoader = new THREE.AudioLoader();
var listener = new THREE.AudioListener();
var audio = new THREE.Audio( listener );
audioLoader.load( 'audio/mitis_change_will_come.mp3', function ( buffer ) {
	audio.setBuffer( buffer );
	audio.setLoop( true );
	audio.play();
} );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
scene.background = new THREE.Color( 0xffffff );
light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 0, 1 );
scene.add( light );

camera.position.z = 5;

var velocity = new THREE.Vector3();
var speed = 10.0;

var onKeyUp = function ( event ) {
  switch( event.keyCode ) {
    case 39: // right
    case 68: // d
      velocity.x += speed;
      console.log("right");
      break;
    case 37: // left
    case 65: // a
      velocity.x -= speed;
      console.log("left");
      break;
    }
}

var animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;

	renderer.render(scene, camera);

 	var time = performance.now();
  	var delta = ( time - prevTime ) / 1000;
 
  	//pass velocity as an argument to translateZ and call it on camera.
  	camera.translateX( velocity.x * delta );
	velocity.x /= 2;

  	prevTime = time;
};

animate();
