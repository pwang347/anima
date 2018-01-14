"use strict";

var THREE = require('three');
var TWEEN = require('tween.js');
var shapes = require('../util/shapes.js');
var materials = require('../util/materials.js');

var renderer, scene, camera, composer, particle, progress, mountains, meshesByLevel, transitionZones, velocity, speed, moving, tween, currentLevel, meshMap, prevTime;

window.addEventListener("load", function() {
  init();
  animate();
}, false);

var summonerData = {
  'summoner_name': 'LinusTechTips',
  'max_progress': 1000,
  'summaries': [
    {
      'start_date': '2017-05-30',
      'end_date': '2017-06-30',
      'num_games': 10,
      'favourite_champion': {
        'name': 'Caitlyn',
        'colours': ['#ffffff', '#000000'],
      },
      'win_ratio': 0.5,
    }
  ]
}

document.onkeypress = function (event) {
  var keyCode = event.keyCode;
  if (keyCode == 100 && progress < summonerData['max_progress'] - 1){
    velocity.x = speed;
    moving = true;
  } else if (keyCode == 97 && progress > 1){
    velocity.x = -speed;
    moving = true;
  }
}

document.onkeyup = function (event) {
   moving = false;
}

function createMountainRange(container, scale){
  let range = 0
  while (range < summonerData['max_progress']) {
    let x_d = Math.random() * 20 * (Math.random() >= 0.5) ? 1 : -1
    let y_d = Math.random() * 5 * (Math.random() >= 0.5) ? 1 : -1
    let z_d = -1 * Math.random() * 10 * (Math.random() >= 0.5)
    let scale_d = Math.random() * 3 * (Math.random() >= 0.5) ? 1 : -1
    let level = getLevelFromProgress(range);
    let mountainShape = new THREE.Mesh(...getFromMeshMap('mountain', level));
    mountainShape.scale.x = mountainShape.scale.y = mountainShape.scale.z = scale + scale_d - (x_d * 2 / 20);
    mountainShape.position.set(range + x_d, y_d, z_d-5);
    addLevelMesh(mountainShape, container, range + x_d, 'mountain');
    range += 20
  }
}

function createMountains(container, offset_x, offset_y, offset_z, scale){
  let level = getLevelFromProgress(offset_x);
  let mountainShape = new THREE.Mesh(...getFromMeshMap('mountain', level));
  mountainShape.scale.x = mountainShape.scale.y = mountainShape.scale.z = scale*1.5;
  mountainShape.position.set(offset_x, offset_y, offset_z);
  container.add(mountainShape);

  let mountainShape2 = new THREE.Mesh(...getFromMeshMap('mountain', level));
  mountainShape2.scale.x = mountainShape2.scale.y = mountainShape2.scale.z = scale*3;
  mountainShape2.position.set(offset_x + 5, offset_y-5, offset_z-5);
  container.add(mountainShape2);

  let mountainShape3 = new THREE.Mesh(...getFromMeshMap('mountain', level));
  mountainShape3.scale.x = mountainShape3.scale.y = mountainShape3.scale.z = scale*2;
  mountainShape3.position.set(offset_x + 2, offset_y + 10, offset_z-10);
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
    sound.setRefDistance(1);
    sound.play();
  });
  // create an object for the sound to play from
  let sphere = new THREE.SphereGeometry(20, 32, 16);
  let material = new THREE.ShadowMaterial({ color: 0xff2200 });
  let audio1 = new THREE.Mesh(sphere, material);
  scene.add(audio1);
  audio1.add(sound);
  audio1.position.x = x
  audio1.position.y = y
  audio1.position.z = z
}

function createTextCarousel(text, x, y, z, size){
  var loader = new THREE.FontLoader();
  var circle = new THREE.Mesh(shapes.circleGeometry, materials.circleMaterial);
  loader.load('fonts/Open Sans_Regular.json', function (font) {
  var textGeometry = new THREE.TextGeometry(text, {
      font: font,
      size: size,
      height: 0,
    });
  var textObj = new THREE.Mesh(textGeometry, materials.textMaterial);
  textObj.position.set(x, y + 10, z);
  circle.position.set(x, y + 10, z-5);
  addLevelMesh(textObj, scene, x, 'text');
  addLevelMesh(circle, scene, x, 'text');
  });
}

function addLevelMesh(mesh, container, progress, mesh_type_id){
  if (!meshesByLevel){
    meshesByLevel = [[]] // init zero case too
    for(let idx in transitionZones){
      meshesByLevel.push([])
    }
  }
  mesh.mesh_type_id = mesh_type_id;
  meshesByLevel[getLevelFromProgress(progress)].push(mesh);
  container.add(mesh);
}

function init() {
  transitionZones = [[300, 600], [1000,1300]]
  velocity = new THREE.Vector3();
  speed = 100.0;
  moving = false;
  prevTime = performance.now();
  currentLevel = 0;
  meshMap = {
    'background': [
      new THREE.Color(0x6fccc9),
      new THREE.Color(0x00ffff),
    ],
    'mountain': [
      [shapes.mountainGeometry, materials.mountainMaterial],
      [shapes.mountainGeometry, materials.mountainMaterial2],
    ],
    'text': [
      [null, materials.textMaterial],
      [null, materials.textMaterial],
    ]
  };
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x6fccc9);
  scene.fog = new THREE.Fog(0x4ca6ff, 0.015, 50);

  // text
  var loader = new THREE.FontLoader();
  loader.load('fonts/Open Sans_Regular.json', function (font) {
  var textGeometry = new THREE.TextGeometry('Hello, ' + summonerData['summoner_name'], {
      font: font,
      size: 2,
      height: 0,
    });
  var text = new THREE.Mesh(textGeometry, materials.textMaterial);
  text.position.set(0, 10, 0);
  scene.add(text);
  });

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 12;
  camera.position.y = 15;
  scene.add(camera);
  particle = new THREE.Object3D();
  mountains = new THREE.Object3D();
  scene.add(particle);
  scene.add(mountains);

  createPositionalAudio('audio/mitis_born.mp3', 0, 0, 0);
  createPositionalAudio('audio/mitis_the_boy_who_shattered_time.mp3', 200, 0,0);
  createPositionalAudio('audio/mitis_change_will_come.mp3', 400, 0, 0);
  createPositionalAudio('audio/mitis_pain.mp3', 600, 0,0);

  var counter = 1
  for (let summary of summonerData['summaries']){
    createTextCarousel('Games won: ' + summary['num_games'] * summary['win_ratio'], 500*counter, 0, 0, 2);
    createTextCarousel('Games played: ' + summary['num_games'], 500*counter + 100, 0, 0, 2)
    createTextCarousel('Favourite champion: ' + summary['favourite_champion']['name'], 500*counter + 200, 0, 0, 2)
    counter += 1
  }

  for (var i = 0; i < 1000; i++) {
    var mesh = new THREE.Mesh(shapes.particleGeometry, materials.particleMaterial);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(90 + (Math.random() * 700));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }

  createMountainRange(mountains, 1)
  function get_palette(champion_name) {
    URL = "http://localhost:8001/riot/get_palette?champion_name=" + champion_name;
    return fetch(URL);
  }

  get_palette("caitlin").then((resp) => {
    return resp.json();
  }).then((obj) => {
    if (obj['results'] === undefined) return;
    for (let color of obj['results']) {
      let randMat = new MeshLambertMaterial({
        color: color,
        flatShading: true
      });
      let randGeometry = new THREE.TextGeometry(color, {
        font: font,
        size: 2,
        height: 0,
      });
      var randShape = new THREE.mesh(randGeometry, randMat);
      randShape.position.set(1, y+10*Math.random(), 0);
      scene.add(randShape);
    }
  });


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

function getFromMeshMap(key, currentLevel){
  if (currentLevel >= meshMap[key].length){
    return meshMap[key][meshMap[key].length-1]
  } else {
    return meshMap[key][currentLevel]
  }
}

function startTween(level){
  for (let j = 0; j < mountains.children.length; j++) {
    let new_mesh = getFromMeshMap('mountain', currentLevel);
    let new_material_color = null;
    if (new_mesh) {
      new_material_color = new_mesh[1].color;
    }
    tween = new TWEEN.Tween(mountains.children[j].material.color)
    .to(new_material_color, 2000)
    .easing(TWEEN.Easing.Quartic.In)
    .start();
  }
}

function getLevelFromProgress(progress){
  let level = -1;
  for (let pos in transitionZones){
    if (progress >= pos[0]) {
      level += 1;
    }
  }
  return level
}

function lerpRGB(target, first_color, second_color, percentage){
    target.r = THREE.Math.lerp(first_color.r, second_color.r, percentage)
    target.g = THREE.Math.lerp(first_color.g, second_color.g, percentage)
    target.b = THREE.Math.lerp(first_color.b, second_color.b, percentage)
}

function lerpBackground(){
  let percentage, first_color, second_color;
  if (currentLevel < transitionZones.length && progress > transitionZones[currentLevel][0] && progress <= transitionZones[currentLevel][1]){
      percentage = (progress - transitionZones[currentLevel][0])/(transitionZones[currentLevel][1] - transitionZones[currentLevel][0])
      first_color = getFromMeshMap('background', currentLevel);
      second_color = getFromMeshMap('background', currentLevel + 1);
      lerpRGB(scene.background, first_color, second_color, percentage);
      let meshesInLevel = meshesByLevel[currentLevel];
      for (let mesh of meshesInLevel){
        let f_c = getFromMeshMap(mesh.mesh_type_id, currentLevel)[1].color;
        let s_c = getFromMeshMap(mesh.mesh_type_id, currentLevel + 1)[1].color;
        lerpRGB(mesh.material.color, f_c, s_c, percentage);
      }
  } else if (currentLevel > 0 && progress >= transitionZones[currentLevel -1][0] && progress <= transitionZones[currentLevel-1][1]){
      percentage = (transitionZones[currentLevel-1][1]-progress)/(transitionZones[currentLevel-1][1] - transitionZones[currentLevel-1][0])
      first_color = getFromMeshMap('background', currentLevel);
      second_color = getFromMeshMap('background', currentLevel - 1);
      lerpRGB(scene.background, first_color, second_color, percentage);
      let meshesInLevel = meshesByLevel[currentLevel];
      for (let mesh of meshesInLevel){
        let f_c = getFromMeshMap(mesh.mesh_type_id, currentLevel)[1].color;
        let s_c = getFromMeshMap(mesh.mesh_type_id, currentLevel - 1)[1].color;
        lerpRGB(mesh.material.color, f_c, s_c, percentage);
      } 
  }
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
  } else if (camera.position.x + velocity.x * delta > summonerData['max_progress']) {
    camera.position.x = summonerData['max_progress'];
    moving = false
  }
  lerpBackground()
  if (progress > transitionZones[currentLevel][1]){
    currentLevel += 1
    console.log("level is " + currentLevel)
  } else if (currentLevel > 0 && progress < transitionZones[currentLevel-1][0]){
    currentLevel -= 1
    console.log("level is " + currentLevel)
  }
  mountains.rotation.x += 0.00001;
  camera.translateX(velocity.x * delta);
  if (moving === false) {
     velocity.x /= 1.5
  }
  prevTime = time;
};
