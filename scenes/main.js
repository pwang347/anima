var THREE = require('three');
var shapes = require('../util/shapes.js');
var materials = require('../util/materials.js');

var renderer, scene, camera, composer, particle, progress;

window.onload = function() {
  init();
  animate();
}

var velocity = new THREE.Vector3();
var prevTime = performance.now();
var speed = 100.0;
var moving = false;
var MAX_PROGRESS = 1000;
var tween;

document.onkeypress = function ( event ) {
  var keyCode = event.keyCode;
  if (keyCode == 100 && progress < MAX_PROGRESS - 1){
    velocity.x = speed;
    moving = true;
  } else if (keyCode == 97 && progress > 1){
    velocity.x = -speed;
    moving = true;
  }
}

document.onkeyup = function ( event ) {
   moving = false;
}

function createMountains(container, offset_x, offset_y, offset_z, scale){
  let mountainShape = new THREE.Mesh(shapes.mountainGeometry, materials.mountainMaterial);
  mountainShape.scale.x = mountainShape.scale.y = mountainShape.scale.z = scale*1.5;
  mountainShape.position.set(offset_x, offset_y, offset_z);
  container.add(mountainShape);

  let mountainShape2 = new THREE.Mesh(shapes.mountainGeometry, materials.mountainMaterial);
  mountainShape2.scale.x = mountainShape2.scale.y = mountainShape2.scale.z = scale*3;
  mountainShape2.position.set(offset_x + 5, offset_y-5, offset_z-5);
  container.add(mountainShape2);

  let mountainShape3 = new THREE.Mesh(shapes.mountainGeometry, materials.mountainMaterial);
  mountainShape3.scale.x = mountainShape3.scale.y = mountainShape3.scale.z = scale*2;
  mountainShape3.position.set(offset_x + 2, offset_y-5, offset_z-5);
  container.add(mountainShape3);
}

function createPositionalAudio(audio_file, x, y, z){
   // audio stuff
  let listener = new THREE.AudioListener();
  camera.add(listener);
  let sound = new THREE.PositionalAudio(listener);
  let audioLoader = new THREE.AudioLoader();
  audioLoader.load(audio_file, function(buffer) {
    sound.setBuffer(buffer);
    sound.setRefDistance(20);
    sound.play();
  });
  // create an object for the sound to play from
  let sphere = new THREE.SphereGeometry(20, 32, 16);
  let material = new THREE.MeshPhongMaterial({ color: 0xff2200 });
  let audio1 = new THREE.Mesh(sphere, material);
  scene.add(audio1);
  audio1.add(sound);
  audio1.position.x = x
  audio1.position.y = y
  audio1.position.z = z
}

/* TODO
function createBackgroundTransition(x, y, z){
  if (shouldBeginTween){
    tween = new TWEEN.Tween(INTERSECTED.material.color)
    .to({r: 0, g: 25, b: 155}, 2000)
    .easing(TWEEN.Easing.Quartic.In)
    .start();
  }
}*/

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x6fccc9);
  scene.fog = new THREE.Fog(0x000000, 0.015, 50);
  // text
  loader = new THREE.FontLoader();
  loader.load('fonts/Open Sans_Regular.json', function (font) {
  var textGeometry = new THREE.TextGeometry('Hello', {
      font: font,
      size: 3,
      height: 0,
    });
  var text = new THREE.Mesh(textGeometry, materials.textMaterial);
  text.position.set(0, 10, 0);
  scene.add(text);
  });

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 12;
  camera.position.y = 10;
  scene.add(camera);
  particle = new THREE.Object3D();
  mountains = new THREE.Object3D();
  scene.add(particle);
  scene.add(mountains);

  createPositionalAudio('audio/mitis_born.mp3', 0, 0, 0);
  createPositionalAudio('audio/mitis_the_boy_who_shattered_time.mp3', 200, 0,0);
  createPositionalAudio('audio/mitis_change_will_come.mp3', 400, 0, 0);
  createPositionalAudio('audio/mitis_pain.mp3', 600, 0,0);

  for (var i = 0; i < 1000; i++) {
    var mesh = new THREE.Mesh(shapes.particleGeometry, materials.particleMaterial);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(90 + (Math.random() * 700));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }

  createMountains(mountains, 0, 0, 0, 1)
  createMountains(mountains, 100, -3, 10, 0.6)

  var ambientLight = new THREE.AmbientLight(0xffffff);
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
  progress = camera.position.x;
  if (camera.position.x + velocity.x * delta < 0){
    camera.position.x = 0;
    moving = false
  } else if (camera.position.x + velocity.x * delta > MAX_PROGRESS) {
    camera.position.x = MAX_PROGRESS;
    moving = false
  }
  camera.translateX(velocity.x * delta);
  if (moving === false) {
     velocity.x /= 1.5
  }
  prevTime = time;
  scene.traverse (function (object){
    console.log(object.name);
  });
  if (tween) tween.update(delta);
};
