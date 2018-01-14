var THREE = require('three');
var shapes = require('../util/shapes.js');
var materials = require('../util/materials.js');

var renderer, scene, camera, composer, particle;

window.onload = function() {
  init();
  animate();
}

var velocity = new THREE.Vector3();
var prevTime = performance.now();
var speed = 100.0;
var moving = false;

document.onkeypress = function ( event ) {
  var keyCode = event.keyCode;
  if (keyCode == 100){
    velocity.x = speed;
    moving = true;
  } else if (keyCode == 97){
    velocity.x = -speed;
    moving = true;
  }
}

document.onkeyup = function ( event ) {
   moving = false;
}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  // audio stuff
  let audioLoader = new THREE.AudioLoader();
  let listener = new THREE.AudioListener();
  let audio = new THREE.Audio( listener );
  audioLoader.load('audio/mitis_change_will_come.mp3', function (buffer) {
    audio.setBuffer(buffer);
    audio.setLoop(true);
    audio.play();
  });

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 300;
  scene.add(camera);
  particle = new THREE.Object3D();
  objects = new THREE.Object3D();
  scene.add(particle);
  scene.add(objects);

  var geometry = new THREE.TetrahedronGeometry(2, 0);
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  for (var i = 0; i < 1000; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(90 + (Math.random() * 700));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }

  var heartShape = new THREE.Mesh(shapes.heartGeometry, materials.heartMaterial);
  heartShape.scale.x = heartShape.scale.y = heartShape.scale.z = 5;
  objects.add(heartShape);

  var ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);
  
  var lights = [];
  lights[0] = new THREE.DirectionalLight(0xffffff, 1);
  lights[0].position.set(1, 0, 0);
  lights[1] = new THREE.DirectionalLight(0x11E8BB, 1);
  lights[1].position.set(0.75, 1, 0.5);
  lights[2] = new THREE.DirectionalLight(0x8200C9, 1);
  lights[2].position.set(-0.75, -1, 0.5);
  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);
  window.addEventListener('resize', onWindowResize, false);

};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;
  renderer.clear();
  renderer.render(scene, camera)
  let time = performance.now();
  let delta = (time - prevTime) / 1000;
  //pass velocity as an argument to translateX and call it on camera.
  camera.translateX(velocity.x * delta);
  if (moving === false) {
     velocity.x /= 1.5
  }
  prevTime = time;
};
