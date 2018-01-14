function Point(e, n) {
  this.x = e || 0,
  this.y = n || 0
}
function Point3D(e, n, o) {
  this.x = e || 0,
  this.y = n || 0,
  this.z = o || 0
}
function Vector(e, n) {
  this.x = e || 0,
  this.y = n || 0
}
function Size(e, n) {
  this.w = e || 0,
  this.h = n || 0
}
function RGBA(e, n, o, t) {
  this.R = e,
  this.G = n,
  this.B = o,
  this.A = t,
  this.toString = function () {
    return 'rgba(' + this.R + ',' + this.G + ',' + this.B + ',1)'
  },
  this.clone = function () {
    return new RGBA(this.R, this.G, this.B, this.A)
  }
}
function Alpha(e) {
  this.A = e
}
function Particle(e, n) {
  this.Position = e || new Point,
  this.Vector = n || new Vector,
  this.Active = !1
}
function Worm(e, n, o) {
  this.Position = e || new Point,
  this.Vector = n || new Vector,
  this.Particles = o || [
  ],
  this.History = [
  ],
  this.Tails = [
  ],
  this.Sprites = [
  ],
  this.Active = !1
}
function Sprite(e) {
  this.Points = e || [
  ]
}
function Background(e, n, o, t) {
  this.ThreeObject = e || MasterObject,
  this.Positions = n || [
    new Point
  ],
  this.Sprite = o || new Sprite,
  this.Color = t || new RGBA(Math.round(255 * Math.random()), Math.round(255 * Math.random()), Math.round(255 * Math.random()), 1)
}
function Scenery(e, n, o, t) {
  this.Name = e || 'No Name',
  this.ThreeObject = n || MasterObject,
  this.Positions = o || [
    new Point
  ],
  this.XScale = t || !1
}
function Shard(e, n, o, t, i, a) {
  this.ThreeObject = e || MasterObject,
  this.Size = n || new Size,
  this.Sprite = o || new Sprite,
  this.Color = t || new RGBA(Math.round(255 * Math.random()), Math.round(255 * Math.random()), Math.round(255 * Math.random()), 1),
  this.XScale = i || !1,
  this.Vine = a || 0
}
function Controller(e, n, o, t, i, a, s, r, l, c) {
  this.Name = e || 'No Name',
  this.Positions = n || [
    new Point
  ],
  this.ThreeObject = o || MasterObject,
  this.ThreeFloat = t || MasterObject,
  this.ThreeDest = new Point(this.ThreeObject.position.x, this.ThreeObject.position.y),
  this.Size = i || new Size,
  this.RollOver = !1,
  this.Mode = a || 'omni',
  this.ArrowAlpha = 0,
  this.Slider = s,
  s && (this.Slider.origin = this.Slider.origins[0]),
  this.Event = r,
  this.Shards = l || [
  ],
  this.IsPressed = !1,
  this.Text = c || ''
}
function Grain(e, n, o) {
  this.Player = new Tone.Player,
  this.Envelope = new Tone.AmplitudeEnvelope({
    attack: GrainLength / 2,
    decay: 0.01,
    sustain: 1,
    release: GrainLength / 2
  }),
  this.Player.connect(this.Envelope),
  this.Envelope.connect(n),
  this.Player.buffer = e,
  this.Player.volume.value = o
}
function Granular(e) {
  this.Grains = e,
  this.Spread = 1,
  this.CurrentGrain = 0,
  this.Location = 5,
  this.Volume = - 45
}
function Wind(e, n) {
  this.Particles = e,
  this.Amp = n,
  this.Focus = 0,
  this.Sprite = [
  ],
  this.Position = randomPoint()
}
function Radial() {
  this.Position = new Point,
  this.Vector = new Vector,
  this.Rad = 200 + 70 * Math.random(),
  this.Angle = 360 * Math.random(),
  this.Active = !1,
  this.Speed = 5 + 3 * Math.random()
}
function Passage(e, n, o) {
  this.Position = e || new Point,
  this.Vector = n || new Vector,
  this.Active = !1,
  this.Z = o
}
function ValueInRange(e, n, o) {
  var t = n,
  i = o;
  return t > i && (t = o, i = n),
  t > e && (e = t),
  e > i && (e = i),
  e
}
function logValue(e, n, o, t, i) {
  var a = Math.log(o),
  s = Math.log(t),
  r = (s - a) / (n - e);
  return Math.exp((i - e) * r + a)
}
function linValue(e, n, o, t, i) {
  var a = (t - o) / (n - e);
  return (i - e) * a + o
}
function linPosition(e, n, o, t, i) {
  var a = (t - o) / (n - e);
  return e + (i - o) / a
}
function comparison(e, n, o) {
  return o = o || 50,
  Math.round(e * o) === Math.round(n * o)
}
function clone2D(e) {
  return new Point(e.x, e.y)
}
function clone3D(e) {
  return new Point3D(e.x, e.y, e.x)
}
function near(e, n, o) {
  return e >= n - o && n + o >= e
}
function degToRad(e) {
  return e * (Math.PI / 180)
}
function getRadius(e, n) {
  return Math.sqrt(e * e + n * n)
}
function angleFromVector(e, n) {
  return Math.atan2(e, n)
}
function randomAngle() {
  return 2 * Math.random() * Math.PI
}
function vectorFromAngle(e) {
  return new Vector(Math.cos(e), Math.sin(e))
}
function pointWithRotation(e, n) {
  var o = Math.cos(e) * n,
  t = Math.sin(e) * n;
  return new Point(o, t)
}
function point2Dfrom3D(e) {
  var n = masterRotate,
  o = getRadius(e.y, e.z),
  t = getRadius(e.x, e.z),
  i = angleFromVector(e.y, e.z),
  a = angleFromVector(e.x, e.z),
  s = pointWithRotation(n.y + i, o).x,
  r = pointWithRotation(n.x + a, t).y,
  l = 30;
  return new Point(s * l, r * l)
}
function perspectiveOffset(e, n, o) {
  var t = normaliseVector(new Vector(e, n));
  return new Point(e + t.x * o, n + t.y * o)
}
function normaliseVector(e) {
  var n = Math.sqrt(e.x * e.x + e.y * e.y);
  return new Point(e.x / n, e.y / n)
}
function randomPoint(e, n) {
  return e = e || halfX,
  n = n || halfY,
  new Point( - e + 2 * Math.random() * e, - n + 2 * Math.random() * n)
}
function fluctuate(e, n) {
  return e += - n + 2 * Math.random() * n
}
function loadPalette(e, n) {
  var o = new PixelPalette(n);
  o.Load(function (n) {
    var o;
    switch (e) {
      case 'land':
        for (landColsLight = n, o = 0; o < n.length; o++) landCols[o] = n[o].clone();
        break;
      case 'shardLight':
        for (o = 0; o < shardCols.length; o++) shardColsLight[o] = shardCols[o].clone();
        break;
      case 'shardDark':
        for (shardCols = n, o = 0; o < shardCols.length; o++) shardColsDark[o] = shardCols[o].clone()
    }
    getAllLoads()
  })
}
function getAllLoads() {
  loadCount += 1,
  3 === loadCount && loadComplete()
}
function init() {
  canvas = document.getElementById('cnvs');
  var e = canvas;
  e.addEventListener('mousedown', mousePress, !1),
  e.addEventListener('mouseup', mouseRelease, !1),
  e.addEventListener('mousemove', mouseMove, !1),
  e.addEventListener('touchstart', function (e) {
    1 == e.targetTouches.length ? (touch = e.targetTouches[0], touchTakeover = !0)  : touchTakeover = !1,
    clickOrTouch()
  }, !1),
  e.addEventListener('touchmove', function (e) {
    e.preventDefault(),
    1 == e.targetTouches.length && (touch = e.targetTouches[0]),
    mouseMove(e)
  }, !1),
  e.addEventListener('touchend', function (e) {
    mouseRelease(),
    touchTakeover = !1
  }, !1),
  cxa = canvas.getContext('2d'),
  cxa.mozImageSmoothingEnabled = !1,
  cxa.imageSmoothingEnabled = !1,
  metrics(),
  setupAudio(),
  loadPalette('land', 'img/land.gif'),
  loadPalette('shardDark', 'img/shardDark.gif'),
  draw()
}
function loadComplete() {
  setupScene(),
  setup3D(),
  createFlickerParticles(),
  createFlickerParticles2(),
  createWorms(),
  createWind(),
  createDust(),
  createRadials(),
  createPassage(),
  selectedController = controllers[0],
  BackgroundList = [
  ],
  ControllerList = [
  ],
  SceneryList = [
  ],
  loadReady = !0
}
function startScene1() {
  scene = 1,
  Tone.Transport.setInterval(function () {
    if (ArpOsc.volume.value > - 30) {
      var e = ArpBase + Math.round(Math.random()),
      n = Math.floor(Math.random() * ArpScale.length);
      ArpOsc.frequency.rampTo(ArpOsc.noteToFrequency('' + ArpScale[n] + e), 0.006)
    }
  }, '64n'),
  Tone.Transport.start(),
  delayTo(introAlpha, 'A', 0, 1, 0),
  setTimeout(function () {
    colourTo(masterCol, - 160, - 120, - 70, 0, 4),
    positionTo(controllers[0], controllers[0].Positions[1], 0.1, 0),
    positionTo(controllers[3], controllers[3].Positions[1], 0.1, 0),
    delayTo(MasterObject.rotation, 'x', 0.07, 7, 0.4),
    delayTo(MasterObject.rotation, 'y', 0, 5, 0.4)
  }, 500),
  setTimeout(function () {
    colourTo(masterCol, 120, 100, 100, 1, 0.2),
    bumpFunctions(0.1, !0),
    easeRotate = !0
  }, 6800),
  setTimeout(function () {
    colourTo(masterCol, 60, - 30, - 100, 1, 1.6)
  }, 7000),
  setTimeout(function () {
    colourTo(masterCol, - 40, - 55, - 45, 1, 1.6),
    colourTo(highPass, 50, 45, 0, 0, 1.6),
    colourTo(lowPass, - 255, 30, 50, 0, 1.6)
  }, 8600),
  setTimeout(function () {
    interactable = !0
  }, 9000)
}
function draw() {
  0 === scene && drawIntro(),
  scene > 0 && (update(), drawBG(), drawScene(), interactable || drawIntro()),
  requestAnimationFrame(draw)
}
function update() {
  TWEEN && TWEEN.update(),
  renderer3D.render(scene3D, camera3D),
  easeRotate && (MasterObject.rotation.y += easeTo(MasterObject.rotation.y, rotateDest.x, 8, 100), MasterObject.rotation.x += easeTo(MasterObject.rotation.x, rotateDest.y, 8, 100));
  for (var e = 0; e < controllers.length; e++) {
    var n = controllers[e];
    n.ThreeObject.position.x += easeTo(n.ThreeObject.position.x, n.ThreeDest.x, 20, 100),
    n.ThreeObject.position.y += easeTo(n.ThreeObject.position.y, n.ThreeDest.y, 20, 100)
  }
  scenery[3].ThreeObject.position.y += easeTo(scenery[3].ThreeObject.position.y, sunDest, 20, 100),
  orderY += easeTo(orderY, orderDest, 10, 100),
  masterRotate.y += degToRad(0.5),
  scaleRotate(),
  updateFlicker(),
  updateFlicker2(),
  updateWorm2(),
  updateWind(),
  updateDust(),
  updateRadial(),
  updatePassage();
  var o = DrumMeter.getLevel();
  o > 0.01 && (drumLevel = 1 + 0.1 * o)
}
function easeTo(e, n, o, t) {
  return Math.round(e * t) !== Math.round(n * t) ? (n - e) / 100 * o : 0
}
function scaleRotate() {
  var e = MasterObject.rotation.y;
  0 > e && (e = - MasterObject.rotation.y);
  var n = MasterObject.rotation.y;
  0 > n && (n = - MasterObject.rotation.y),
  rotateScale.x = 1 - 0.5 * e,
  rotateScale.y = 1 - 0.5 * n
}
function updateFlicker() {
  for (var e = 0; e < flickerParticles.length; e++) {
    var n = flickerParticles[e];
    if (n.Active) {
      n.Position.x += n.Vector.x,
      n.Position.y += n.Vector.y;
      var o = 0.5,
      t = 20,
      i = 17;
      n.Position.x > 50 * units && (n.Vector.x -= o * (0.5 + Math.random())),
      n.Position.x < - 50 * units && (n.Vector.x += o * (0.5 + Math.random())),
      n.Position.y > 0 && (n.Vector.y -= o * (0.5 + Math.random())),
      n.Position.y < 0 && (n.Vector.y += o * (0.5 + Math.random())),
      n.Vector.x = ValueInRange(n.Vector.x, - t, t),
      n.Vector.y = ValueInRange(n.Vector.y, - i, i)
    }
  }
}
function updateFlicker2() {
  for (var e = 0; e < flickerParticles2.length; e++) {
    var n = flickerParticles2[e];
    if (n.Active) {
      n.Position.y -= n.Vector.y;
      var o = n.Position.y * units;
      - fullY > o && (n.Position.y = fullY / units, n.Position.x = - 100 + 200 * Math.random())
    }
  }
}
function updateRadial() {
  for (var e = 0; e < radialParticles.length; e++) {
    var n = radialParticles[e];
    n.Active && (n.Angle += n.Speed, n.Angle > 360 && (n.Angle -= 360), n.Vector = vectorFromAngle(degToRad(n.Angle)), n.Position = pointWithRotation(degToRad(n.Angle), n.Rad))
  }
}
function updatePassage() {
  if (passageAlpha.A > 0 && Player[9].volume.value >= - 21) for (var e = 0; e < passageParticles.length; e++) {
    var n = passageParticles[e];
    n.Position.y += (floatSpeed.y + 0.3 * (Player[9].volume.value + 20)) * n.Z,
    n.Position.y > fullY / units && (n.Position.y = - (fullY / units), n.Position.x = ( - halfX + Math.random() * fullX) / units)
  }
}
function updateWind() {
  var e,
  n,
  o = 2;
  for (e = 0; e < windParticles.length; e++) {
    var t = windParticles[e];
    t.Focus > t.Particles.length && resetWind(t);
    var i = 0.15;
    t.Amp[t.Focus] += i,
    t.Focus > 0 && t.Amp[t.Focus - 1] > 0 && (t.Amp[t.Focus - 1] -= i),
    t.Amp[t.Focus] >= 1 && (t.Focus += 1);
    var a = [
    ],
    s = t.Particles[0],
    r = t.Amp[0] * o;
    for (a.push(new Point(s.Position.x, s.Position.y)), a.push(new Point(s.Position.x, s.Position.y)), n = 1; n < t.Particles.length; n++) s = t.Particles[n],
    r = t.Amp[n] * o,
    n === t.Particles.length - 1 && (r = 0),
    a.push(new Point(s.Position.x, s.Position.y - r));
    for (n = t.Particles.length - 1; n > 0; n--) s = t.Particles[n],
    r = t.Amp[n] * o,
    n === t.Particles.length - 1 && (r = 0),
    a.push(new Point(s.Position.x, s.Position.y + r));
    t.Sprite = a
  }
}
function resetWind(e) {
  e.Focus = 0,
  e.Particles[0].Vector.x = - (70 + 30 * Math.random()),
  e.Particles[0].Vector.y = 20 * Math.random(),
  e.Particles[0].Position = new Point,
  e.Position = randomPoint(100, 50),
  e.Amp[e.Amp.length - 1] = 0;
  for (var n = 1; n < e.Particles.length; n++) e.Particles[n].Vector.x = e.Particles[n - 1].Vector.x,
  e.Particles[n].Vector.y = e.Particles[n - 1].Vector.y - windDir - 10 * Math.random(),
  e.Particles[n].Position.x = e.Particles[n - 1].Position.x + e.Particles[n].Vector.x,
  e.Particles[n].Position.y = e.Particles[n - 1].Position.y + e.Particles[n].Vector.y
}
function updateDust() {
  var e;
  for (e = 0; e < dustParticles.length; e++) {
    var n = dustParticles[e];
    n.Position.x += n.Vector.x,
    n.Position.y += n.Vector.y,
    n.Vector.x = fluctuate(n.Vector.x, 0.5),
    n.Vector.y = fluctuate(n.Vector.y, 0.5),
    n.Vector.x = ValueInRange(n.Vector.x, - 3, - 10),
    n.Vector.y = ValueInRange(n.Vector.y, - 3, 3),
    n.Position.y < - 150 && (n.Vector.y = 0.5),
    n.Position.y > 150 && (n.Vector.y = - 0.5),
    n.Position.x < - halfX && (n.Position.x = fullX)
  }
}
function updateWorm2() {
  var e,
  n,
  o,
  t = 20,
  i = 11,
  a = 0;
  for (Player[3].volume.value > 5 && (a = (Player[3].volume.value - 5) / 2), e = 0; e < worms.length; e++) {
    var s = worms[e];
    if (s.Active) {
      s.Position.x += s.Vector.x,
      s.Position.y += s.Vector.y;
      var r = [
      ];
      for (n = 0; n < s.Particles.length; n++) {
        var l = s.Particles[n];
        if (l.Position.x += - 1 + 2 * Math.random(), l.Position.y += - 1 + 2 * Math.random(), l.Position.x = ValueInRange(l.Position.x, - 45, 45), l.Position.y = ValueInRange(l.Position.y, - 45, 45), wormClock === t && r.push(new Point(s.Position.x + l.Position.x, s.Position.y + l.Position.y)), s.History.length > 1) {
          var c = new Vector(s.History[1][n].x - s.History[0][n].x, s.History[1][n].y - s.History[0][n].y);
          s.Tails[n] = new Point(s.History[0][n].x + c.x / t * wormClock, s.History[0][n].y + c.y / t * wormClock)
        }
        if (s.History.length === i) {
          var u = [
          ],
          P = 1 / i,
          w = P / t,
          d = 1;
          for (u.push(new Point(s.Position.x + l.Position.x, s.Position.y + l.Position.y + a)), u.push(new Point(s.Position.x + l.Position.x, s.Position.y + l.Position.y - a)), o = i - 1; o >= 0; o--) d = P * o - w * wormClock,
          u.push(new Point(s.History[o][n].x, s.History[o][n].y - a * d));
          for (u.push(new Point(s.Tails[n].x, s.Tails[n].y)), o = 1; i > o; o++) d = P * o - w * wormClock,
          u.push(new Point(s.History[o][n].x, s.History[o][n].y + a * d));
          s.Sprites[n] = u
        }
      }
      wormClock === t && (s.History.push(r), s.History.length > i && s.History.shift());
      var h = 0.06,
      x = 10,
      p = 9;
      s.Position.x > 50 * units && (s.Vector.x -= h * (0.5 + Math.random())),
      s.Position.x < - 50 * units && (s.Vector.x += h * (0.5 + Math.random())),
      s.Position.y > 0 && (s.Vector.y -= h * (0.5 + Math.random())),
      s.Position.y < 0 && (s.Vector.y += h * (0.5 + Math.random())),
      s.Vector.x = ValueInRange(s.Vector.x, - x, x),
      s.Vector.y = ValueInRange(s.Vector.y, - p, p)
    }
  }
  wormClock += 1,
  wormClock > t && (wormClock = 0)
}
function metrics() {
  const e = window.innerWidth,
  n = window.innerHeight,
  o = getPixelRatio();
  canvas.width = e * o,
  canvas.height = n * o,
  canvas.style.width = e + 'px',
  canvas.style.height = n + 'px',
  console.log(e),
  console.log(o),
  halfX = Math.round(e * o / 2),
  halfY = Math.round(n * o / 2),
  fullX = e * o,
  fullY = n * o,
  device = fullY > 1.05 * fullX ? 'mobile' : fullY > 0.65 * fullX ? 'tablet' : 'desktop',
  console.log(device);
  var t;
  'mobile' == device ? (t = e * o * 2.6, units = t / 1200, headerType = Math.round(t / 25), midType = Math.round(t / 80), dataType = Math.round(t / 100), bodyType = Math.round(t / 100), subType = Math.round(t / 90), camera3D && (camera3D.aspect = fullX / (1.2 * fullX), camera3D.aspect = halfX / halfY, camera3D.updateProjectionMatrix(), cameraDepth = 4 + 5 * (n / e - 1), camera3D.position.z = cameraDepth))  : (t = n * o * 1.8, units = t / 800, headerType = Math.round(t / 12), midType = Math.round(t / 65), dataType = Math.round(t / 82), bodyType = Math.round(t / 42), subType = Math.round(t / 90), camera3D && (camera3D.aspect = halfX / halfY, camera3D.updateProjectionMatrix(), cameraDepth = 4, camera3D.position.z = cameraDepth)),
  dx = halfX,
  dy = halfY,
  cxa.font = '400 ' + midType + 'px Raleway';
  var i = 'info'.toUpperCase();
  infoWidth = cxa.measureText(i).width,
  panelOpen ? panelPos.y = 0 : (panelPos.y = - fullY, panelOpen = !1)
}
function getPixelRatio() {
  var e = cxa,
  n = window.devicePixelRatio || 1,
  o = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
  return n / o
}
function mousePress() {
  if (0 === scene && loadReady && startScene1(), interactable) {
    if (mouseIsDown = !0, rolloverCheck(), !panelOpen) {
      downPoint.x = mouseX,
      downPoint.y = mouseY,
      downRotation.x = MasterObject.rotation.y,
      downRotation.y = MasterObject.rotation.x;
      for (var e = 0; e < controllers.length; e++) {
        var n = controllers[e];
        if (n.RollOver) return void (n.Event ? n.Event()  : (n.IsPressed = !0, selectedController = n, selectedControllerPos = clone3D(n.ThreeObject.position), mouseDown3D = cursorTo3D(mouseX, mouseY, n, camera3D)))
      }
    }(infoOver || orderOver) && openInfo(),
    closeOver && closeInfo(),
    linkOver[0] && window.open('https://heliosmusic.bandcamp.com/', '_blank'),
    linkOver[1] && window.open('https://itunes.apple.com/album/yume/id1021990602', '_blank'),
    linkOver[2] && window.open('http://unseen-music.com/', '_blank'),
    linkOver[3] && window.open('http://whitevinyldesign.com', '_blank')
  }
}
function mouseRelease() {
  mouseIsDown = !1,
  rotating = !1;
  for (var e = 0; e < controllers.length; e++) {
    var n = controllers[e];
    n.IsPressed = !1,
    touchTakeover && (n.RollOver = !1)
  }
}
function mouseMove(e) {
  var n,
  o;
  1 == touchTakeover ? (n = touch.pageX, o = touch.pageY)  : (n = e.pageX, o = e.pageY);
  const t = getPixelRatio();
  mouseX = n * t,
  mouseY = o * t,
  rolloverCheck(),
  selectedController && selectedController.IsPressed && interactable && dragController(selectedController, !0)
}
function rolloverCheck() {
  var e = !1;
  if (scene > 0) {
    for (var n = 0; n < controllers.length; n++) {
      var o = controllers[n],
      t = get2Dfrom3D(o, camera3D);
      o.RollOver = hitBox(t.x - 0.5 * o.Size.w * units, t.y - 0.5 * o.Size.h * units, o.Size.w * units, o.Size.h * units)
    }
    infoOver = hitBox(20 * units, fullY - 45 * units, 40 * units, 35 * units),
    orderOver = hitBox(halfX - 100 * units, halfY - 145 * units - orderY * units, 200 * units, 40 * units),
    closeOver = hitBox(halfX - 60 * units, panelPos.y + halfY + 90 * units, 120 * units, 30 * units),
    linkOver[0] = hitBox(halfX - 240 * units, panelPos.y + halfY - 45 * units, 160 * units, 30 * units),
    linkOver[1] = hitBox(halfX - 80 * units, panelPos.y + halfY - 45 * units, 160 * units, 30 * units),
    linkOver[2] = hitBox(halfX + 80 * units, panelPos.y + halfY - 45 * units, 160 * units, 30 * units),
    linkOver[3] = hitBox(halfX, panelPos.y + halfY + 45 * units, 60 * units, 20 * units),
    interactable && (panelOpen && (linkOver[0] || linkOver[1] || linkOver[2] || linkOver[3]) && (e = !0), e ? canvas.style.cursor = 'pointer' : canvas.style.cursor = 'default')
  }
}
function hitBox(e, n, o, t) {
  var i = mouseX,
  a = mouseY;
  return i > e && e + o > i && a > n && n + t > a
}
function clickOrTouch(e) {
  var n,
  o;
  1 == touchTakeover ? (n = touch.pageX, o = touch.pageY)  : (n = e.pageX, o = e.pageY);
  const t = getPixelRatio();
  mouseX = n * t,
  mouseY = o * t,
  0 == mouseIsDown && mousePress(e)
}
function drag3D() {
  if (mouseIsDown) {
    rotating = !0,
    rotateDest.x = downRotation.x + Math.PI / 180 * ((mouseX - downPoint.x) / 10),
    rotateDest.y = downRotation.y + Math.PI / 180 * ((mouseY - downPoint.y) / 10);
    var e = 40,
    n = 20;
    rotateDest.x < Math.PI / 180 * - e && (rotateDest.x = Math.PI / 180 * - e),
    rotateDest.x > Math.PI / 180 * + e && (rotateDest.x = Math.PI / 180 * + e),
    rotateDest.y < Math.PI / 180 * - n && (rotateDest.y = Math.PI / 180 * - n),
    rotateDest.y > Math.PI / 180 * + n && (rotateDest.y = Math.PI / 180 * + n)
  }
}
function dragController(e, n) {
  if (e.Slider) {
    var o = e.ThreeDest,
    t = e.Slider,
    i = 0 !== t.range.x,
    a = 0 !== t.range.y,
    s = t.origin.x,
    r = t.origin.y,
    l = 0.1,
    c = o;
    if (n) {
      var u = cursorTo3D(mouseX, mouseY, e, camera3D),
      P = new Point(selectedControllerPos.x - mouseDown3D.x, selectedControllerPos.y - mouseDown3D.y);
      c = new Point(u.x + P.x, u.y + P.y)
    }
    i && (o.x = c.x, o.x = ValueInRange(o.x, s, s + t.range.x), t.value.x = getValue(e, 'x'), t.functions && t.functions[0](t.value.x, l, !0)),
    a && (o.y = c.y, o.y = ValueInRange(o.y, r, r + t.range.y), t.value.y = getValue(e, 'y'), t.functions && t.functions[1](t.value.y, l, !0))
  }
}
function setController(e, n, o) {
  var t = e.ThreeDest,
  i = e.Slider,
  a = 0 !== i.range.x,
  s = 0 !== i.range.y,
  r = 0.1;
  a && 'x' === o && (t.x = getPosition(e, 'x'), i.functions && i.functions[0](i.value.x, r, n)),
  s && 'y' === o && (t.y = getPosition(e, 'y'), i.functions && i.functions[1](i.value.y, r, n))
}
function getValue(e, n) {
  var o = e.ThreeDest,
  t = e.Slider,
  i = t.origin['' + n];
  return linValue(i, i + t.range['' + n], t.minVal['' + n], t.maxVal['' + n], o['' + n])
}
function getPosition(e, n) {
  var o = e.Slider.value['' + n],
  t = e.Slider,
  i = t.origin['' + n];
  return linPosition(i, i + t.range['' + n], t.minVal['' + n], t.maxVal['' + n], o)
}
function setValue(e, n, o) {
  e.Slider.value['' + n] = o
}
function setPosition(e, n) {
  var o = e.ThreeDest;
  o['' + n] = getPosition(e, n)
}
function openInfo() {
  panelOpen = !0,
  delayTo(panelPos, 'y', 0, 0.4, 0)
}
function closeInfo() {
  panelOpen = !1,
  delayTo(panelPos, 'y', - fullY, 0.2, 0)
}
function setup3D() {
  var e;
  for (renderer3D = new THREE.CanvasRenderer, scene3D = new THREE.Scene, camera3D = new THREE.PerspectiveCamera(45, halfX / halfY, 0.1, 1000), MasterObject = new THREE.Object3D, scene3D.add(MasterObject), World3D = new THREE.Object3D, MasterObject.add(World3D), MasterObject.rotation.x = Math.PI / 180 * - 20, MasterObject.rotation.y = Math.PI / 180 * - 40, e = 0; e < BackgroundList.length; e++) {
    var n = BackgroundList[e];
    backgrounds.push(createBackground(n))
  }
  for (e = 0; e < SceneryList.length; e++) {
    var o = SceneryList[e];
    scenery.push(createScenery(o))
  }
  for (e = 0; e < ControllerList.length; e++) {
    var t = ControllerList[e];
    controllers.push(createController(t)),
    floatTo(controllers[e], 2 * Math.random())
  }
  camera3D.position.set(0, 0, cameraDepth),
  metrics()
}
function get2Dfrom3D(e, n) {
  var o = new Point,
  t = new THREE.Vector3,
  i = e;
  e.ThreeObject && (i = e.ThreeObject),
  i.updateMatrixWorld();
  var a = i.matrixWorld;
  return t.setFromMatrixPosition(a),
  t.project(n),
  o.x = 0.5 * (t.x + 1) * fullX,
  o.y = 0.5 * ( - t.y + 1) * fullY,
  o
}
function cursorTo3D(e, n, o, t) {
  var i = new Point;
  i.x = (e - halfX) / fullX * 2,
  i.y = 2 * - ((n - halfY) / fullY);
  var a = new THREE.Vector3;
  o.ThreeObject.updateMatrixWorld();
  var s = o.ThreeObject.matrixWorld;
  a.setFromMatrixPosition(s),
  a.project(t);
  var r = new THREE.Vector3;
  return r.set(i.x, i.y, a.z),
  r.unproject(t),
  r
}
function setupAudio() {
  Tone.Master.volume.value = - 18,
  Player[0] = new Tone.Player,
  Player[0].load('loops/trimmed/ambient01.mp3', function (e) {
    e.loopEnd = 3,
    e.loop = !0,
    loopsLoaded()
  }),
  loadTotal += 1,
  Player[0].volume.value = - 50,
  Player[1] = new Tone.Player,
  Player[1].load('loops/trimmed/drums01.mp3', function (e) {
    e.loopEnd = 3,
    e.loop = !0,
    loopsLoaded()
  }),
  loadTotal += 1,
  Player[1].volume.value = - 50,
  DrumMeter = new Tone.Meter,
  Player[2] = new Tone.Player,
  Player[2].load('loops/trimmed/tune01.mp3', function (e) {
    e.loopEnd = 9,
    e.loop = !0,
    loopsLoaded()
  }),
  loadTotal += 1,
  Player[2].volume.value = - 50,
  Player[3] = new Tone.Player,
  Player[3].load('loops/trimmed/tune02.mp3', function (e) {
    e.loopEnd = 12,
    e.loop = !0,
    loopsLoaded()
  }),
  loadTotal += 1,
  Player[3].volume.value = - 50,
  Player[4] = new Tone.Player,
  Player[4].load('loops/trimmed/pagoda01.mp3', function (e) {
    e.loopEnd = 19.5,
    e.loop = !0,
    loopsLoaded()
  }),
  loadTotal += 1,
  Player[4].volume.value = - 50,
  Player[5] = new Tone.Player,
  Player[5].load('loops/trimmed/pagodaDrums01.mp3', function (e) {
    e.loopEnd = 3,
    e.loop = !0,
    loopsLoaded()
  }),
  loadTotal += 1,
  Player[5].volume.value = - 50,
  Player[6] = new Tone.Player,
  Player[6].load('loops/trimmed/sun01.mp3', function (e) {
    e.loopEnd = 12,
    e.loop = !0,
    loopsLoaded()
  }),
  loadTotal += 1,
  Player[6].volume.value = - 50,
  Player[7] = new Tone.Player,
  Player[7].load('loops/trimmed/sun02.mp3', function (e) {
    e.loopEnd = 6,
    e.loop = !0,
    loopsLoaded()
  }),
  loadTotal += 1,
  Player[7].volume.value = - 50,
  Player[8] = new Tone.Player,
  Player[8].load('loops/trimmed/passage01c.mp3', function (e) {
    e.loopEnd = 12,
    e.loop = !0,
    loopsLoaded()
  }),
  loadTotal += 1,
  Player[8].volume.value = - 50,
  Player[9] = new Tone.Player,
  Player[9].load('loops/trimmed/passageDrums01.mp3', function (e) {
    e.loopEnd = 3,
    e.loop = !0,
    loopsLoaded()
  }),
  loadTotal += 1,
  Player[9].volume.value = - 50,
  Player[10] = new Tone.Player,
  Player[10].load('loops/trimmed/floaty01.mp3', function (e) {
    e.loopEnd = 9,
    e.loop = !0,
    loopsLoaded()
  }),
  loadTotal += 1,
  Player[10].volume.value = - 50,
  Reverb = new Tone.JCReverb(0.9),
  Reverb.wet.value = 0,
  Delay = new Tone.FeedbackDelay,
  Delay.delayTime.value = 0.05,
  Delay.feedback.value = 0.65,
  Delay.wet.value = 0.5,
  Osc[0] = new Tone.Oscillator(440, 'sine'),
  Osc[0].volume.value = - 60,
  Osc[1] = new Tone.PWMOscillator(293.66, 1),
  Osc[1].volume.value = - 60,
  Osc[2] = new Tone.Oscillator(440, 'sawtooth'),
  Osc[2].volume.value = - 200,
  Osc[3] = new Tone.Oscillator(440, 'sawtooth'),
  Osc[3].volume.value = - 200,
  Noise[0] = new Tone.Noise,
  Noise[0].volume.value = - 50,
  Filter[0] = new Tone.Filter(400),
  Filter[0].gain.value = 15,
  Filter[1] = new Tone.Filter(400),
  Filter[1].gain.value = 15,
  LFO[0] = new Tone.LFO(0.4, - 10, 10),
  ArpOsc = new Tone.Oscillator(440, 'sine'),
  ArpOsc.volume.value = - 50,
  ArpFilter = new Tone.Filter(1600),
  SlideFilter = new Tone.Filter(5000),
  SlideLFO = new Tone.LFO(3, - 300, 300),
  Player[1].connect(DrumMeter.input),
  LFO[0].connect(Osc[0].detune),
  Player[0].connect(Filter[0]),
  Player[1].connect(Filter[0]),
  Player[2].connect(Filter[0]),
  Player[3].connect(Filter[0]),
  Player[4].connect(Filter[0]),
  Player[5].connect(Filter[0]),
  Player[6].connect(Filter[0]),
  Player[7].connect(Filter[0]),
  Player[8].connect(Filter[0]),
  Player[9].connect(Filter[0]),
  Player[10].connect(Filter[0]),
  Osc[0].connect(Filter[0]),
  Osc[1].connect(Filter[0]),
  Noise[0].connect(Filter[0]),
  Osc[2].connect(Filter[1]),
  Osc[3].connect(Filter[1]),
  ArpFilter.connect(Delay),
  ArpOsc.connect(ArpFilter),
  Filter[0].connect(Reverb),
  Filter[1].connect(Reverb),
  Reverb.toMaster(),
  Delay.toMaster(),
  Player[0].sync(),
  Player[1].sync(),
  Player[2].sync(),
  Player[3].sync(),
  Player[4].sync(),
  Player[5].sync(),
  Osc[0].sync(),
  Osc[1].sync(),
  Osc[2].sync(),
  Osc[3].sync(),
  Noise[0].sync(),
  LFO[0].sync(),
  ArpOsc.sync()
}
function SynthSet(e) {
  switch (e) {
    case 0:
      LFO[0].disconnect(),
      LFO[0].set({
        frequency: 0.4,
        min: - 10,
        max: 10
      }),
      LFO[0].connect(Osc[0].detune);
      break;
    case 1:
      LFO[0].disconnect(),
      LFO[0].set({
        frequency: 3,
        min: - 300,
        max: 300
      }),
      LFO[0].connect(Filter[1].frequency)
  }
}
function loopsLoaded() {
  loadedLoops += 1,
  11 == loadedLoops && getAllLoads()
}
function granLoop(e) {
  if (Gran[e].Volume > - 30) {
    var n = Gran[e].CurrentGrain,
    o = Gran[e].Grains[n],
    t = Gran[e].Location - 0.5 * Gran[e].Spread + Math.random() * Gran[e].Spread;
    t = ValueInRange(t, 0.05, o.Player.duration - 2 * GrainLength - 0.01);
    var i = t + 1.1 * GrainLength;
    o.Player.stop(),
    o.Player.start('+0.01', t, i),
    o.Envelope.triggerAttackRelease(0.5 * GrainLength, '+0.01'),
    Gran[e].CurrentGrain += 1,
    Gran[e].CurrentGrain === Gran[e].Grains.length && (Gran[e].CurrentGrain = 0)
  }
}
function setupScene() {
  BackgroundList = [
    {
      positions: [
        new Point3D(40, 8.5, - 2)
      ],
      sprite: [
        new Point( - 500, 1000),
        new Point( - 37, 5),
        new Point( - 30, - 55),
        new Point( - 15, - 60),
        new Point(0, 0),
        new Point(20, - 20),
        new Point(40, 3),
        new Point(46, 40),
        new Point(300, 1000)
      ],
      color: landCols[1]
    },
    {
      positions: [
        new Point3D(0, - 1.5, - 2),
        new Point3D(0, - 14.5, - 2)
      ],
      sprite: [
        new Point( - 1500, 200),
        new Point( - 1000, 0),
        new Point( - 700, 50),
        new Point(30, - 90),
        new Point(200, 0),
        new Point(390, - 20),
        new Point(1100, 100),
        new Point(1500, 300)
      ],
      color: landCols[1]
    },
    {
      positions: [
        new Point3D(40, 8.2, - 5)
      ],
      sprite: [
        new Point( - 50, 1000),
        new Point( - 45, 30),
        new Point( - 35, 40),
        new Point( - 15, - 5),
        new Point(0, - 40),
        new Point(45, - 27),
        new Point(60, 25),
        new Point(68, 20),
        new Point(75, 60),
        new Point(120, 100),
        new Point(300, 120),
        new Point(300, 1000)
      ],
      color: landCols[2]
    },
    {
      positions: [
        new Point3D(0, - 1, - 6),
        new Point3D(0, - 14, - 6)
      ],
      sprite: [
        new Point( - 1500, 200),
        new Point( - 1000, 0),
        new Point( - 700, 50),
        new Point( - 100, - 120),
        new Point(50, 20),
        new Point(330, - 20),
        new Point(1100, 100),
        new Point(1500, 300)
      ],
      color: landCols[2]
    },
    {
      positions: [
        new Point3D(0, - 1, - 12),
        new Point3D(0, - 14, - 12)
      ],
      sprite: [
        new Point( - 1500, 200),
        new Point( - 1000, 0),
        new Point( - 700, 30),
        new Point(20, - 10),
        new Point(150, - 50),
        new Point(350, - 20),
        new Point(650, 30),
        new Point(850, 10),
        new Point(1500, 300)
      ],
      color: landCols[3]
    },
    {
      positions: [
        new Point3D(0, - 1, - 18),
        new Point3D(0, - 14, - 18)
      ],
      sprite: [
        new Point( - 1500, 200),
        new Point( - 9000, 10),
        new Point( - 700, 50),
        new Point( - 550, - 20),
        new Point( - 450, 15),
        new Point(50, - 100),
        new Point(90, - 70),
        new Point(410, - 15),
        new Point(550, - 20),
        new Point(1100, 100),
        new Point(1500, 300)
      ],
      color: landCols[4]
    }
  ],
  SceneryList = [
    {
      name: 'Pagoda1',
      positions: [
        new Point3D(40, 22, - 2)
      ],
      xscale: !0
    },
    {
      name: 'Pagoda2',
      positions: [
        new Point3D(40, 22, - 2.25)
      ],
      xscale: !0
    },
    {
      name: 'Pagoda2',
      positions: [
        new Point3D(40, 22, - 2.5)
      ],
      xscale: !0
    },
    {
      name: 'Sun',
      positions: [
        new Point3D(0, 110, - 25)
      ]
    }
  ],
  ControllerList = [
    {
      name: 'Left',
      positions: [
        new Point3D( - 1, 20, - 0.1),
        new Point3D( - 1, 0.75, - 0.1),
        new Point3D( - 1, 14, - 0.1)
      ],
      size: new Size(40, 80),
      mode: 'leftRight',
      slider: {
        minVal: new Point( - 20, 0),
        maxVal: new Point(25, 0),
        range: new Point(0.6, 0),
        value: new Point(0, 0),
        origins: [
          new Point( - 1, 1),
          new Point( - 1.2, 1)
        ],
        functions: [
          SliderFunctions[3],
          function () {
          }
        ]
      },
      shards: [
        {
          position: new Point3D( - 0.05, - 0.1, - 0.05),
          size: new Size(30, 90),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.3),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[2],
          vine: 50
        },
        {
          position: new Point3D(0.05, 0.1, 0.05),
          size: new Size(25, 80),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1],
          vine: 40
        }
      ]
    },
    {
      name: 'Top',
      positions: [
        new Point3D(0.37, 0.5, - 0.2)
      ],
      size: new Size(40, 80),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, - 10),
        maxVal: new Point(0, 10),
        range: new Point(0, 0.5),
        value: new Point(0, 0),
        origins: [
          new Point(0, 0.35)
        ],
        functions: [
          function () {
          },
          SliderFunctions[4]
        ]
      },
      shards: [
        {
          position: new Point3D( - 0.06, - 0.05, - 0.1),
          size: new Size(24, 60),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.3),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[2],
          vine: 40
        },
        {
          position: new Point3D(0, 0, 0),
          size: new Size(32, 90),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1],
          vine: 80
        },
        {
          position: new Point3D(0.06, 0.05, 0.1),
          size: new Size(26, 65),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[0],
          vine: 70
        }
      ]
    },
    {
      name: 'Master',
      positions: [
        new Point3D(0, - 0.3, - 0.1),
        new Point3D(0.2, 14.5, - 0.1)
      ],
      size: new Size(70, 120),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, - 20),
        maxVal: new Point(0, 25),
        range: new Point(0, 0.4),
        value: new Point(0, 50),
        origins: [
          new Point(0, - 0.45),
          new Point(0, 14.35)
        ],
        functions: [
          function () {
          },
          SliderFunctions[0]
        ]
      },
      shards: [
        {
          position: new Point3D( - 0.2, 0, - 0.2),
          size: new Size(30, 90),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[2],
          vine: 50
        },
        {
          position: new Point3D(0, 0.1, - 0.1),
          size: new Size(40, 100),
          sprite: [
            new Point( - 0.1, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0.25, 0.4),
            new Point( - 0.1, 0.5),
            new Point( - 0.5, 0.1)
          ],
          color: shardCols[2],
          vine: 40
        },
        {
          position: new Point3D(0.1, 0.1, - 0.1),
          size: new Size(25, 80),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.1),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[2],
          vine: 60
        },
        {
          position: new Point3D( - 0.05, 0, 0),
          size: new Size(60, 120),
          sprite: [
            new Point( - 0.1, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0.25, 0.4),
            new Point( - 0.1, 0.5),
            new Point( - 0.5, 0.1)
          ],
          color: shardCols[1],
          xscale: !0,
          vine: 50
        },
        {
          position: new Point3D(0, 0, 0),
          size: new Size(34, 150),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.3),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.25)
          ],
          color: shardCols[1],
          vine: 100
        },
        {
          position: new Point3D(0.2, - 0.2, 0.08),
          size: new Size(18, 70),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.25)
          ],
          color: shardCols[1]
        },
        {
          position: new Point3D( - 0.05, 0, 0.05),
          size: new Size(33, 90),
          sprite: [
            new Point( - 0.1, - 0.5),
            new Point(0.5, - 0.3),
            new Point(0, 0.5),
            new Point( - 0.5, 0.1)
          ],
          color: shardCols[4],
          xscale: !0,
          vine: 70
        },
        {
          position: new Point3D( - 0.2, 0.1, 0.1),
          size: new Size(25, 80),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.1),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[0],
          vine: 85
        },
        {
          position: new Point3D( - 0.05, 0, 0.15),
          size: new Size(50, 90),
          sprite: [
            new Point( - 0.1, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0.25, 0.4),
            new Point( - 0.1, 0.5),
            new Point( - 0.5, 0.1)
          ],
          color: shardCols[0],
          xscale: !0,
          vine: 50
        },
        {
          position: new Point3D( - 0.02, - 0.2, 0.2),
          size: new Size(26, 70),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[0],
          vine: 40
        }
      ]
    },
    {
      name: 'FilterSynth',
      positions: [
        new Point3D(0.8, 20, 0.1),
        new Point3D(0.8, - 0.5, 0.1),
        new Point3D(0.8, - 15, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'omni',
      slider: {
        minVal: new Point( - 20, 500),
        maxVal: new Point(20, 12000),
        range: new Point(0.8, 0.8),
        value: new Point(0, 400),
        origins: [
          new Point(0.4, - 0.6)
        ],
        functions: [
          SliderFunctions[2],
          SliderFunctions[1]
        ]
      },
      shards: [
        {
          position: new Point3D(0.06, 0, - 0.1),
          size: new Size(30, 80),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.3),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[2],
          vine: 40
        },
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 70),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1],
          vine: 60
        },
        {
          position: new Point3D( - 0.1, 0.1, 0),
          size: new Size(20, 50),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[0],
          vine: 30
        }
      ]
    },
    {
      name: 'EarthToSky',
      text: 'To the Sky',
      positions: [
        new Point3D(0, 1, 0.14),
        new Point3D(0, - 14, 0.14)
      ],
      size: new Size(25, 55),
      mode: 'shiftUp',
      event: SkipEvents[0],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'SkyToEarth',
      text: 'To the Earth',
      positions: [
        new Point3D(0, 13, 0.15)
      ],
      size: new Size(25, 55),
      mode: 'shiftDown',
      event: SkipEvents[1],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'Player2',
      positions: [
        new Point3D(0.8, 14, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, - 20),
        maxVal: new Point(0, 25),
        range: new Point(0, 0.5),
        value: new Point(0, - 10),
        origins: [
          new Point(0, 14)
        ],
        functions: [
          function () {
          },
          SliderFunctions[5]
        ]
      },
      shards: [
        {
          position: new Point3D(0.06, 0, - 0.1),
          size: new Size(30, 80),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.3),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[2],
          vine: 40
        },
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 70),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1],
          vine: 100
        },
        {
          position: new Point3D( - 0.06, 0.1, 0),
          size: new Size(20, 50),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[0],
          vine: 50
        }
      ]
    },
    {
      name: 'Arp',
      positions: [
        new Point3D( - 0.9, 14.6, - 0.15)
      ],
      size: new Size(70, 80),
      mode: 'omni',
      slider: {
        minVal: new Point(2, - 45),
        maxVal: new Point(7, 3),
        range: new Point(0.8, 0.8),
        value: new Point(0, 0),
        origins: [
          new Point( - 1.3, 14.5)
        ],
        functions: [
          SliderFunctions[6],
          SliderFunctions[7]
        ]
      },
      shards: [
        {
          position: new Point3D(0.05, 0, - 0.05),
          size: new Size(24, 70),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.3),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[2],
          vine: 70
        },
        {
          position: new Point3D( - 0.07, 0.05, 0),
          size: new Size(25, 70),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1],
          vine: 60
        },
        {
          position: new Point3D(0, 0, 0.05),
          size: new Size(24, 80),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[0],
          vine: 50
        }
      ]
    },
    {
      name: 'SkyToGarden',
      text: 'To the Peak',
      positions: [
        new Point3D(1.4, 14, 0.15)
      ],
      size: new Size(25, 55),
      mode: 'shiftRight',
      event: SkipEvents[2],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'GardenToSky',
      text: 'To the Sky',
      positions: [
        new Point3D(38.6, 10, 0.15)
      ],
      size: new Size(25, 55),
      mode: 'shiftLeft',
      event: SkipEvents[0],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'GardenSynth',
      positions: [
        new Point3D(40, 9.6, - 0.15)
      ],
      size: new Size(70, 100),
      mode: 'omni',
      slider: {
        minVal: new Point(0, - 30),
        maxVal: new Point(9, - 10),
        range: new Point(2, 0.8),
        value: new Point(0, 0),
        origins: [
          new Point(39, 9.6)
        ],
        functions: [
          SliderFunctions[8],
          SliderFunctions[9]
        ]
      },
      shards: [
        {
          position: new Point3D(0.04, 0.05, 0.05),
          size: new Size(30, 70),
          sprite: [
            new Point(0.4, - 0.5),
            new Point(0.5, 0),
            new Point( - 0.1, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[1],
          vine: 60
        },
        {
          position: new Point3D( - 0.04, 0, 0),
          size: new Size(35, 100),
          sprite: [
            new Point( - 0.1, - 0.5),
            new Point(0.5, - 0.1),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[0],
          vine: 100
        }
      ]
    },
    {
      name: 'GardenToPagoda',
      text: 'To the Ruin',
      positions: [
        new Point3D(40, 11, 0.15)
      ],
      size: new Size(25, 55),
      mode: 'shiftUp',
      event: SkipEvents[3],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'PagodaToGarden',
      text: 'To the Peak',
      positions: [
        new Point3D(40, 21, 0.15)
      ],
      size: new Size(25, 55),
      mode: 'shiftDown',
      event: SkipEvents[2],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'PagodaToSun',
      text: 'To the Sun',
      positions: [
        new Point3D(40, 23, 0.15)
      ],
      size: new Size(25, 55),
      mode: 'shiftUp',
      event: SkipEvents[4],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'FilterSynth2',
      positions: [
        new Point3D(40, 21.7, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'omni',
      slider: {
        minVal: new Point( - 20, 500),
        maxVal: new Point(20, 12000),
        range: new Point(0.8, 0.8),
        value: new Point(0, 400),
        origins: [
          new Point(39.6, 21.6)
        ],
        functions: [
          SliderFunctions[10],
          SliderFunctions[11]
        ]
      },
      shards: [
        {
          position: new Point3D(0, 0, - 0.1),
          size: new Size(25, 90),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[2],
          vine: 90
        },
        {
          position: new Point3D(0.08, - 0.1, 0),
          size: new Size(19, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[1],
          vine: 40
        },
        {
          position: new Point3D( - 0.08, 0.1, 0.1),
          size: new Size(19, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[0],
          vine: 50
        }
      ]
    },
    {
      name: 'PagodaPlayer',
      positions: [
        new Point3D(41, 21.6, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, - 20),
        maxVal: new Point(0, 22),
        range: new Point(0, 0.5),
        value: new Point(0, - 10),
        origins: [
          new Point(0, 21.6)
        ],
        functions: [
          function () {
          },
          SliderFunctions[12]
        ]
      },
      shards: [
        {
          position: new Point3D( - 0.06, 0, - 0.1),
          size: new Size(25, 70),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, 0.05)
          ],
          color: shardCols[1],
          vine: 100
        },
        {
          position: new Point3D(0.06, 0.1, 0),
          size: new Size(20, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[0],
          vine: 50
        }
      ]
    },
    {
      name: 'PagodaDrums',
      positions: [
        new Point3D(39, 21.6, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, - 20),
        maxVal: new Point(0, 22),
        range: new Point(0, 0.5),
        value: new Point(0, - 10),
        origins: [
          new Point(0, 21.6)
        ],
        functions: [
          function () {
          },
          SliderFunctions[13]
        ]
      },
      shards: [
        {
          position: new Point3D(0.06, 0, - 0.1),
          size: new Size(25, 100),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[2],
          vine: 80
        },
        {
          position: new Point3D( - 0.06, 0, 0),
          size: new Size(25, 100),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.1),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1],
          vine: 50
        },
        {
          position: new Point3D(0.02, - 0.06, 0.1),
          size: new Size(20, 60),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[0],
          vine: 100
        }
      ]
    },
    {
      name: 'SunToPagoda',
      text: 'To the Ruin',
      positions: [
        new Point3D(1.4, 100, 0.15)
      ],
      size: new Size(25, 55),
      mode: 'shiftRight',
      event: SkipEvents[3],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'SunSample1',
      positions: [
        new Point3D( - 1, 99.6, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, - 20),
        maxVal: new Point(0, 22),
        range: new Point(0, 0.8),
        value: new Point(0, - 10),
        origins: [
          new Point(0, 99.6)
        ],
        functions: [
          function () {
          },
          SliderFunctions[14]
        ]
      },
      shards: [
        {
          position: new Point3D( - 0.08, - 0.05, - 0.1),
          size: new Size(30, 80),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.3),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[2],
          vine: 80
        },
        {
          position: new Point3D(0.08, 0.1, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1],
          vine: 50
        },
        {
          position: new Point3D( - 0.02, 0.1, 0),
          size: new Size(27, 60),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.1),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[0],
          vine: 60
        }
      ]
    },
    {
      name: 'SunSample2',
      positions: [
        new Point3D(1, 99.6, 0.1),
        new Point3D(1, 199.6, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, - 20),
        maxVal: new Point(0, 22),
        range: new Point(0, 0.8),
        value: new Point(0, - 10),
        origins: [
          new Point(0, 99.6),
          new Point(0, 199.6)
        ],
        functions: [
          function () {
          },
          SliderFunctions[15]
        ]
      },
      shards: [
        {
          position: new Point3D(0.07, 0, - 0.1),
          size: new Size(35, 110),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[2],
          vine: 110
        },
        {
          position: new Point3D( - 0.07, 0.1, 0),
          size: new Size(35, 110),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1],
          vine: 160
        },
        {
          position: new Point3D(0, - 0.1, 0),
          size: new Size(16, 40),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[0],
          vine: 70
        }
      ]
    },
    {
      name: 'SunReverb',
      positions: [
        new Point3D(0, 99.6, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, 0),
        maxVal: new Point(0, 0.16),
        range: new Point(0, 0.8),
        value: new Point(0, 400),
        origins: [
          new Point(0, 99.6)
        ],
        functions: [
          function () {
          },
          SliderFunctions[16]
        ]
      },
      shards: [
        {
          position: new Point3D(0.06, 0, 0),
          size: new Size(36, 75),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.1),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[1],
          vine: 70
        },
        {
          position: new Point3D( - 0.06, - 0.1, 0),
          size: new Size(25, 50),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[0],
          vine: 60
        }
      ]
    },
    {
      name: 'SunToPassage',
      text: 'To the Passage',
      positions: [
        new Point3D(0, 101, 0.15)
      ],
      size: new Size(25, 55),
      mode: 'shiftUp',
      event: SkipEvents[5],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'PassageToSun',
      text: 'To the Sun',
      positions: [
        new Point3D(0, 199, 0.15)
      ],
      size: new Size(25, 55),
      mode: 'shiftDown',
      event: SkipEvents[4],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'PassageSample1',
      positions: [
        new Point3D( - 1, 200, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, - 20),
        maxVal: new Point(0, 22),
        range: new Point(0, 0.8),
        value: new Point(0, - 10),
        origins: [
          new Point(0, 200)
        ],
        functions: [
          function () {
          },
          SliderFunctions[17]
        ]
      },
      shards: [
        {
          position: new Point3D(0, 0.1, - 0.1),
          size: new Size(26, 110),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.1),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[2],
          vine: 110
        },
        {
          position: new Point3D( - 0.07, 0, 0),
          size: new Size(33, 110),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1],
          vine: 160
        },
        {
          position: new Point3D(0.07, - 0.1, 0),
          size: new Size(19, 50),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[0],
          vine: 70
        }
      ]
    },
    {
      name: 'PassageSample2',
      positions: [
        new Point3D( - 0.35, 199.6, 0.1)
      ],
      size: new Size(70, 110),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, - 20),
        maxVal: new Point(0, 22),
        range: new Point(0, 0.8),
        value: new Point(0, - 10),
        origins: [
          new Point(0, 199.6)
        ],
        functions: [
          function () {
          },
          SliderFunctions[18]
        ]
      },
      shards: [
        {
          position: new Point3D(0.08, 0, - 0.1),
          size: new Size(35, 100),
          sprite: [
            new Point(0.1, - 0.5),
            new Point(0.5, - 0.1),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[2],
          vine: 110
        },
        {
          position: new Point3D( - 0.08, - 0.1, 0),
          size: new Size(48, 150),
          sprite: [
            new Point(0.2, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1),
            new Point( - 0.49, - 0.3)
          ],
          color: shardCols[1],
          vine: 150
        },
        {
          position: new Point3D( - 0.16, - 0.2, 0),
          size: new Size(16, 70),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.1),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[0],
          vine: 70
        }
      ]
    },
    {
      name: 'PassageSunSample',
      positions: [
        new Point3D(0.35, 199.6, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, - 20),
        maxVal: new Point(0, 22),
        range: new Point(0, 0.8),
        value: new Point(0, - 10),
        origins: [
          new Point(0, 199.6)
        ],
        functions: [
          function () {
          },
          SliderFunctions[19]
        ]
      },
      shards: [
        {
          position: new Point3D(0.07, 0, - 0.1),
          size: new Size(35, 110),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[2],
          vine: 110
        },
        {
          position: new Point3D( - 0.07, 0.1, 0),
          size: new Size(35, 110),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1],
          vine: 160
        },
        {
          position: new Point3D(0, - 0.1, 0),
          size: new Size(16, 40),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.2),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.2)
          ],
          color: shardCols[0],
          vine: 70
        }
      ]
    },
    {
      name: 'PassageArp2',
      positions: [
        new Point3D(1, 200, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'omni',
      slider: {
        minVal: new Point(2, - 45),
        maxVal: new Point(7, 3),
        range: new Point(0.5, 0.5),
        value: new Point(0, - 45),
        origins: [
          new Point(1, 200)
        ],
        functions: [
          SliderFunctions[20],
          SliderFunctions[21]
        ]
      },
      shards: [
        {
          position: new Point3D(0, 0, - 0.1),
          size: new Size(25, 90),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[2],
          vine: 90
        },
        {
          position: new Point3D(0.08, - 0.1, 0),
          size: new Size(19, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[1],
          vine: 40
        },
        {
          position: new Point3D( - 0.08, 0.1, 0.1),
          size: new Size(19, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[0],
          vine: 50
        }
      ]
    },
    {
      name: 'PassageToNight',
      text: 'To the Night',
      positions: [
        new Point3D(0, 201, 0.15)
      ],
      size: new Size(25, 55),
      mode: 'shiftUp',
      event: SkipEvents[6],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'NightToPassage',
      text: 'To the Passage',
      positions: [
        new Point3D(0, 219, 0.15)
      ],
      size: new Size(25, 55),
      mode: 'shiftDown',
      event: SkipEvents[5],
      shards: [
        {
          position: new Point3D(0, 0, 0),
          size: new Size(25, 55),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, - 0.15),
            new Point(0, 0.5),
            new Point( - 0.5, - 0.1)
          ],
          color: shardCols[1]
        }
      ]
    },
    {
      name: 'FloatySample',
      positions: [
        new Point3D(0, 220.5, 0.1)
      ],
      size: new Size(70, 80),
      mode: 'upDown',
      slider: {
        minVal: new Point(0, - 60),
        maxVal: new Point(0, - 18),
        range: new Point(0, 0.5),
        value: new Point(0, - 15),
        origins: [
          new Point(0, 220)
        ],
        functions: [
          function () {
          },
          SliderFunctions[22]
        ]
      },
      shards: [
        {
          position: new Point3D(0, - 0.1, - 0.1),
          size: new Size(50, 110),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[2]
        },
        {
          position: new Point3D(0, 0, 0),
          size: new Size(60, 170),
          sprite: [
            new Point(0, - 0.5),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[1]
        },
        {
          position: new Point3D(0.1, 0.1, 0),
          size: new Size(25, 60),
          sprite: [
            new Point(0, - 0.5),
            new Point(0.5, 0),
            new Point(0, 0.5)
          ],
          color: shardCols[0]
        },
        {
          position: new Point3D( - 0.1, - 0.2, 0.1),
          size: new Size(25, 60),
          sprite: [
            new Point(0, - 0.5),
            new Point(0, 0.5),
            new Point( - 0.5, 0)
          ],
          color: shardCols[0]
        }
      ]
    }
  ]
}
function bumpFunctions(e, n) {
  console.log('bump: ' + n),
  e = e || 0.1;
  for (var o = 0; o < controllers.length; o++) {
    var t = controllers[o];
    console.log(t.Name),
    t.Slider && (n && dragController(t, !1), t.Slider.functions[0](t.Slider.value.x, e, n), t.Slider.functions[1](t.Slider.value.y, e, n))
  }
}
function createController(e) {
  var n = new THREE.Object3D;
  World3D.add(n),
  n.position.set(e.positions[0].x, e.positions[0].y, e.positions[0].z);
  var o = new THREE.Object3D;
  n.add(o);
  for (var t = [
  ], i = 0; i < e.shards.length; i++) {
    var a = e.shards[i],
    s = new THREE.Object3D;
    o.add(s),
    s.position.set(a.position.x, a.position.y, a.position.z);
    var r = !1;
    a.xscale && (r = a.xscale),
    t.push(new Shard(s, a.size, new Sprite(a.sprite), a.color, r, a.vine))
  }
  return new Controller(e.name, e.positions, n, o, e.size, e.mode, e.slider, e.event, t, e.text)
}
function createBackground(e) {
  var n = new THREE.Object3D;
  return World3D.add(n),
  n.position.set(e.positions[0].x, e.positions[0].y, e.positions[0].z),
  new Background(n, e.positions, new Sprite(e.sprite), e.color)
}
function createScenery(e) {
  var n = new THREE.Object3D;
  return World3D.add(n),
  n.position.set(e.positions[0].x, e.positions[0].y, e.positions[0].z),
  new Scenery(e.name, n, e.positions, e.xscale)
}
function createFlickerParticles() {
  for (var e = 0; 8 > e; e++) {
    var n = new Particle(new Point( - halfX + 200 * Math.random(), - halfY + 200 * Math.random()), new Vector);
    n.Active = !0,
    flickerParticles.push(n)
  }
}
function createFlickerParticles2() {
  for (var e = 0; 14 > e; e++) {
    var n = new Particle(new Point( - 150 + 300 * Math.random(), - halfY + Math.random() * fullY), new Vector(0, 10 + 20 * Math.random()));
    n.Active = !0,
    flickerParticles2.push(n)
  }
}
function createWorms() {
  for (var e = 0; 2 > e; e++) {
    for (var n = [
    ], o = 0; 4 > o; o++) {
      var t = new Particle(new Point( - 30 + 60 * Math.random(), - 30 + 60 * Math.random()), new Vector);
      n.push(t)
    }
    var i = new Worm(new Point( - halfX + 200 * Math.random(), - halfY + 200 * Math.random()), new Vector, n);
    i.Active = !0,
    worms.push(i)
  }
}
function createWind() {
  for (var e = 0; 4 > e; e++) {
    for (var n = [
    ], o = [
    ], t = 0; 10 > t; t++) {
      var i = new Particle(new Point(halfX + Math.random() * fullX, - halfY + Math.random() * fullY), new Vector);
      n.push(i),
      o.push(0)
    }
    o.push(0);
    var a = new Wind(n, o);
    resetWind(a),
    a.Focus = 2 * e,
    windParticles.push(a)
  }
}
function createDust() {
  for (var e = 0; 14 > e; e++) {
    var n = new Particle(randomPoint(), new Vector( - (10 + 10 * Math.random()), - 3 + 6 * Math.random()));
    dustParticles.push(n)
  }
}
function createRadials() {
  for (var e = 0; 12 > e; e++) {
    var n = new Radial;
    n.Active = !0,
    radialParticles.push(n)
  }
}
function createPassage() {
  for (var e = 0; 30 > e; e++) {
    var n = new Passage(randomPoint(), new Vector( - (10 + 10 * Math.random()), - 3 + 6 * Math.random()), 0.2 + 1.8 * Math.random());
    passageParticles.push(n)
  }
}
function drawBG() {
  cxa.globalAlpha = 1,
  setColor(landCols[0]),
  cxa.fillRect(0, 0, fullX, fullY)
}
function drawIntro() {
  if (cxa.globalAlpha = introAlpha.A / 100, 0 === scene && (cxa.fillStyle = '#000', cxa.fillRect(0, 0, fullX, fullY)), cxa.fillStyle = '#fff', cxa.strokeStyle = '#fff', cxa.textAlign = 'center', loadReady) {
    cxa.font = '100 ' + headerType + 'px Raleway',
    cxa.fillText('HELIOS | YUME'.toUpperCase(), halfX, halfY - 10 * units);
    var e = 1 + 0.2 * Math.random(),
    n = halfY + 30 * units;
    cxa.beginPath(),
    cxa.moveTo(halfX - 20 * e * units, n - 10 * e * units),
    cxa.lineTo(halfX + 20 * e * units, n - 10 * e * units),
    cxa.lineTo(halfX, n + 10 * e * units),
    cxa.closePath(),
    cxa.fill()
  } else cxa.font = '400 ' + midType + 'px Raleway',
  cxa.fillText('Loading Sounds'.toUpperCase(), halfX, halfY - 4 * units),
  cxa.fillRect(halfX - 6 * units, halfY + 4 * units, 12 * units, 2 * units),
  cxa.beginPath(),
  cxa.moveTo(halfX - 60 * units, halfY + 20 * units),
  cxa.lineTo(halfX + 60 * units, halfY + 20 * units),
  cxa.moveTo(halfX + 60 * units, halfY + 32 * units),
  cxa.lineTo(halfX - 60 * units, halfY + 32 * units),
  cxa.stroke(),
  cxa.fillRect(halfX - 60 * units, halfY + 20 * units, 120 / loadTotal * loadedLoops * units, 12 * units);
  cxa.font = '400 ' + dataType + 'px Raleway',
  cxa.fillText('Chrome Recommended', halfX, halfY + 170 * units)
}
function drawScene() {
  var e,
  n;
  if (drawSun(), near(scene, 1, 3)) for (e = backgrounds.length - 1; e > - 1; e--) {
    var o = backgrounds[e];
    n = get2Dfrom3D(o, camera3D),
    setColor(o.Color),
    drawBackground(o, n)
  }
  for (drawTriangle(), e = 0; e < worms.length; e++) drawWorm2(worms[e]);
  for (drawPagoda(), e = 0; e < windParticles.length; e++) drawWind(windParticles[e]);
  for (e = 0; e < dustParticles.length; e++) drawDust(dustParticles[e]);
  for (e = 0; e < flickerParticles2.length; e++) drawFlickers2(flickerParticles2[e]);
  for (e = 0; e < radialParticles.length; e++) drawRadials(radialParticles[e]);
  for (drawPassage(), drawExtra(), e = 0; e < controllers.length; e++) {
    var t = controllers[e];
    cxa.globalAlpha = 1;
    for (var i = 0; i < t.Shards.length; i++) {
      var a = t.Shards[i];
      n = get2Dfrom3D(a, camera3D),
      a.Vine > 0 && (setColor(shardCols[6]), drawVine(a.Vine, n)),
      drawSprite(a, n)
    }
    drawArrows(t)
  }
  if (drawLensFlare(), cxa.globalAlpha = 1, setColor(shardCols[4]), cxa.font = '400 ' + midType + 'px Raleway', cxa.textAlign = 'center', cxa.fillText('Helios | Yume'.toUpperCase(), halfX, fullY - 30 * units), cxa.fillRect(halfX - 6 * units, fullY - 21 * units, 12 * units, 2 * units), 1 == easeRotate && (infoOver ? infoAlpha.A < 100 && (infoAlpha.A += 2)  : infoAlpha.A > 0 && (infoAlpha.A -= 2), cxa.lineWidth = 2, cxa.globalAlpha = 1 - infoAlpha.A / 100, cxa.beginPath(), cxa.moveTo(20 * units, fullY - 32 * units), cxa.lineTo(50 * units, fullY - 38 * units), cxa.moveTo(20 * units, fullY - 26 * units), cxa.lineTo(50 * units, fullY - 32 * units), cxa.moveTo(20 * units, fullY - 20 * units), cxa.lineTo(50 * units, fullY - 26 * units), cxa.stroke(), setColor(shardCols[0]), 7 == scene && setColor(landCols[1]), cxa.globalAlpha = infoAlpha.A / 100, cxa.beginPath(), cxa.moveTo(20 * units, fullY - 32 * units), cxa.lineTo(50 * units, fullY - 38 * units), cxa.moveTo(20 * units, fullY - 26 * units), cxa.lineTo(50 * units, fullY - 32 * units), cxa.moveTo(20 * units, fullY - 20 * units), cxa.lineTo(50 * units, fullY - 26 * units), cxa.stroke(), setColor(shardCols[4]), cxa.globalAlpha = 1, cxa.lineWidth = 1, 7 == scene)) {
    var s = orderY * units,
    r = 'Order Yume by Helios'.toUpperCase(),
    l = cxa.measureText(r).width;
    orderOver ? cxa.lineWidth = 3 : cxa.lineWidth = 1,
    setColor(shardCols[4]),
    cxa.beginPath(),
    cxa.moveTo(halfX - 20 * units - 0.5 * l, halfY - 110 * units - s),
    cxa.lineTo(halfX + 20 * units + 0.5 * l, halfY - 110 * units - s),
    cxa.lineTo(halfX + 20 * units + 0.5 * l, halfY - 140 * units - s),
    cxa.lineTo(halfX - 20 * units - 0.5 * l, halfY - 140 * units - s),
    cxa.closePath(),
    cxa.stroke(),
    cxa.fillText(r, halfX, halfY - 120 * units - s)
  }
  for (e = 0; e < flickerParticles.length; e++) drawFlickers(flickerParticles[e]);
  drawPanel()
}
function drawSprite(e, n) {
  var o = e.Size,
  t = e.Sprite.Points,
  i = n.x,
  a = n.y,
  s = 1;
  e.XScale === !0 && (s = rotateScale.x),
  setColor(e.Color),
  cxa.beginPath(),
  cxa.moveTo(i + t[0].x * o.w * s * units, a + t[0].y * o.h * units);
  for (var r = 1; r < t.length; r++) cxa.lineTo(i + t[r].x * o.w * s * units, a + t[r].y * o.h * units);
  cxa.closePath(),
  cxa.fill()
}
function drawVine(e, n) {
  var o = 2 * units,
  t = e * units;
  cxa.beginPath(),
  cxa.moveTo(n.x - o, n.y),
  cxa.lineTo(n.x, n.y + t * units),
  cxa.lineTo(n.x + o, n.y),
  cxa.closePath(),
  cxa.fill()
}
function drawArrows(e) {
  if (e.RollOver ? e.ArrowAlpha < 100 && (e.ArrowAlpha += 5)  : e.ArrowAlpha > 0 && (e.ArrowAlpha -= 5), e.IsPressed && (e.ArrowAlpha = 100), e.ArrowAlpha > 0 && interactable && (!selectedController.IsPressed || selectedController === e)) {
    var n = e.Mode,
    o = get2Dfrom3D(e, camera3D),
    t = 5 * units,
    i = (8 + 0.016 * e.ArrowAlpha) * units,
    a = e.ArrowAlpha / 100;
    if (e.Slider) var s = comparison(e.ThreeDest.x, e.Slider.origin.x),
    r = comparison(e.ThreeDest.x, e.Slider.origin.x + e.Slider.range.x),
    l = comparison(e.ThreeDest.y, e.Slider.origin.y),
    c = comparison(e.ThreeDest.y, e.Slider.origin.y + e.Slider.range.y);
    var u = 'upDown' == n || 'omni' == n || 'shiftDown' == n,
    P = 'upDown' == n || 'omni' == n || 'shiftUp' == n,
    w = 'leftRight' == n || 'omni' == n || 'shiftLeft' == n,
    d = 'leftRight' == n || 'omni' == n || 'shiftRight' == n,
    h = 0.1;
    setColor(7 > scene ? shardCols[4] : landCols[1]),
    u && (l ? cxa.globalAlpha = a * h : cxa.globalAlpha = a, cxa.beginPath(), cxa.moveTo(o.x - t, o.y + i), cxa.lineTo(o.x, o.y + i + t), cxa.lineTo(o.x + t, o.y + i), cxa.lineTo(o.x + t - 2 * units, o.y + i), cxa.lineTo(o.x, o.y + i + t - 2 * units), cxa.lineTo(o.x - t + 2 * units, o.y + i), cxa.closePath(), cxa.fill()),
    P && (c ? cxa.globalAlpha = a * h : cxa.globalAlpha = a, cxa.beginPath(), cxa.moveTo(o.x - t, o.y - i), cxa.lineTo(o.x, o.y - i - t), cxa.lineTo(o.x + t, o.y - i), cxa.lineTo(o.x + t - 2 * units, o.y - i), cxa.lineTo(o.x, o.y - i - t + 2 * units), cxa.lineTo(o.x - t + 2 * units, o.y - i), cxa.closePath(), cxa.fill()),
    w && (s ? cxa.globalAlpha = a * h : cxa.globalAlpha = a, cxa.beginPath(), cxa.moveTo(o.x - i, o.y - t), cxa.lineTo(o.x - i - t, o.y), cxa.lineTo(o.x - i, o.y + t), cxa.lineTo(o.x - i, o.y + t - 2 * units), cxa.lineTo(o.x - i - t + 2 * units, o.y), cxa.lineTo(o.x - i, o.y - t + 2 * units), cxa.closePath(), cxa.fill()),
    d && (r ? cxa.globalAlpha = a * h : cxa.globalAlpha = a, cxa.beginPath(), cxa.moveTo(o.x + i, o.y - t), cxa.lineTo(o.x + i + t, o.y), cxa.lineTo(o.x + i, o.y + t), cxa.lineTo(o.x + i, o.y + t - 2 * units), cxa.lineTo(o.x + i + t - 2 * units, o.y), cxa.lineTo(o.x + i, o.y - t + 2 * units), cxa.closePath(), cxa.fill()),
    ('shiftUp' === n || 'shiftDown' === n || 'shiftLeft' === n || 'shiftRight' === n) && (cxa.globalAlpha = a, cxa.beginPath(), cxa.moveTo(o.x - 2 * units, o.y), cxa.lineTo(o.x, o.y - 2 * units), cxa.lineTo(o.x + 2 * units, o.y), cxa.lineTo(o.x, o.y + 2 * units), cxa.closePath(), cxa.fill(), cxa.font = '400 ' + midType + 'px Raleway', cxa.textAlign = 'center', cxa.font = '400 italic ' + midType + 'px PT Sans', setColor(shardCols[0]), cxa.globalAlpha = a, cxa.fillText(e.Text, o.x, o.y - 42 * units), cxa.fillRect(o.x - 6 * units, o.y - 36 * units, 12 * units, 2 * units))
  }
  cxa.globalAlpha = 1
}
function drawBackground(e, n) {
  var o = e.Sprite.Points,
  t = n.x,
  i = n.y;
  cxa.beginPath(),
  cxa.moveTo(t + o[0].x * units, i + o[0].y * units);
  for (var a = 1; a < o.length; a++) {
    var s = 1;
    o[a].y < 0 && (s = drumLevel),
    cxa.lineTo(t + o[a].x * units, i + o[a].y * s * units)
  }
  cxa.lineTo(t + 1500 * units, i + 1000 * units),
  cxa.lineTo(t - 1500 * units, i + 1000 * units),
  cxa.closePath(),
  cxa.fill()
}
function drawFlickers(e) {
  var n = get2Dfrom3D(World3D, camera3D),
  o = n.x + e.Position.x * units,
  t = n.y + e.Position.y * units,
  i = 2 * e.Vector.x,
  a = 2 * e.Vector.y,
  s = 0;
  Player[0].volume.value > 5 && (s = (Player[0].volume.value - 5) / 8, setColor(shardCols[4]), cxa.beginPath(), cxa.moveTo(o - i * units, t - (a + s) * units), cxa.lineTo(o + i * units, t + (a - s) * units), cxa.lineTo(o + i * units, t + (a + s) * units), cxa.lineTo(o - i * units, t - (a - s) * units), cxa.closePath(), cxa.fill())
}
function drawFlickers2(e) {
  var n = get2Dfrom3D(scenery[0], camera3D),
  o = n.x + e.Position.x * units,
  t = n.y + e.Position.y * units,
  i = 0;
  Player[5].volume.value > 5 && (i = (Player[5].volume.value - 5) / 12, setColor(shardCols[4]), cxa.fillRect(o - i * units, t - 100 * units, 2 * i * units, 200 * units))
}
function drawWind(e) {
  var n = get2Dfrom3D(backgrounds[0], camera3D),
  o = e.Sprite,
  t = n.x + (e.Position.x + 500) * units,
  i = n.y + (e.Position.y - 100) * units;
  setColor(shardCols[4]),
  cxa.beginPath(),
  cxa.moveTo(t + o[0].x * units, i + o[0].y * units);
  for (var a = 0; a < o.length; a++) cxa.lineTo(t + o[a].x * units, i + o[a].y * units);
  cxa.closePath(),
  cxa.fill()
}
function drawDust(e) {
  var n = 4 * units,
  o = get2Dfrom3D(backgrounds[0], camera3D),
  t = o.x + e.Position.x * units,
  i = o.y + (e.Position.y - 100) * units;
  setColor(shardCols[4]),
  cxa.fillRect(t - 0.5 * n, i - 0.5 * n, n, n)
}
function drawSun() {
  var e,
  n = get2Dfrom3D(scenery[3], camera3D),
  o = n.x,
  t = n.y;
  setRGBA(200, 180, 160, 1),
  e = 50 * Math.random(),
  cxa.beginPath(),
  cxa.arc(o, t, (2500 * Reverb.wet.value + e) * units, 0, 2 * Math.PI),
  cxa.closePath(),
  cxa.fill(),
  setColor(shardCols[4]),
  e = 10 * Math.random(),
  cxa.beginPath(),
  cxa.arc(o, t, (180 + e) * units, 0, 2 * Math.PI),
  cxa.closePath(),
  cxa.fill()
}
function drawRadials(e) {
  var n = get2Dfrom3D(scenery[3], camera3D),
  o = n.x + e.Position.x * units,
  t = n.y + e.Position.y * units,
  i = e.Vector.x,
  a = e.Vector.y,
  s = 1 + (Player[7].volume.value + 20) / 11.25;
  setRGBA(180, 80, 90, 1),
  cxa.beginPath(),
  cxa.moveTo(o - 50 * a * units, t + 50 * i * units),
  cxa.lineTo(o + i * s * units, t + a * s * units),
  cxa.lineTo(o + 50 * a * units, t - 50 * i * units),
  cxa.lineTo(o + 1 * i * units, t + 1 * a * units),
  cxa.closePath(),
  cxa.fill()
}
function drawLensFlare() {
  var e = get2Dfrom3D(scenery[3], camera3D),
  n = halfX - 0.7 * (e.x - halfX),
  o = halfY - 60 * units - 0.7 * (e.y - halfY);
  setRGBA(210, 220, 255, 1),
  cxa.globalAlpha = 0.5,
  cxa.beginPath(),
  cxa.moveTo(n - 20 * units, o - 5 * units),
  cxa.lineTo(n + 20 * units, o - 5 * units),
  cxa.lineTo(n, o + 31 * units),
  cxa.closePath(),
  cxa.fill(),
  n = halfX - 0.9 * (e.x - halfX),
  o = halfY - 60 * units - 0.9 * (e.y - halfY),
  setRGBA(255, 220, 230, 1),
  cxa.beginPath(),
  cxa.moveTo(n - 40 * units, o - 10 * units),
  cxa.lineTo(n + 40 * units, o - 10 * units),
  cxa.lineTo(n, o + 55 * units),
  cxa.closePath(),
  cxa.fill(),
  cxa.globalAlpha = 1
}
function drawPassage() {
  if (passageAlpha.A > 0) {
    var e;
    for (setColor(shardCols[4]), cxa.globalAlpha = passageAlpha.A / 100, e = 0; e < passageParticles.length; e++) {
      var n = passageParticles[e],
      o = n.Z,
      t = o * units,
      i = halfX + n.Position.x * units,
      a = halfY + n.Position.y * units;
      cxa.fillRect(i - t, a - (1 + 2 * (Player[9].volume.value + 20)) * t, 2 * t, (2 + 4 * (Player[9].volume.value + 20)) * t)
    }
    cxa.globalAlpha = 1
  }
}
function drawPagoda() {
  var e,
  n,
  o,
  t = 1;
  o = get2Dfrom3D(scenery[2], camera3D),
  e = o.x,
  n = o.y;
  var i = 5 * Math.random();
  setColor(shardCols[5]),
  cxa.beginPath(),
  cxa.moveTo(e - 140 * t * units, n - (120 + i) * units),
  cxa.lineTo(e, n - (80 + i) * units),
  cxa.lineTo(e + 140 * t * units, n - (120 + i) * units),
  cxa.lineTo(e + 140 * t * units, n - (80 - i) * units),
  cxa.lineTo(e, n - (40 - i) * units),
  cxa.lineTo(e - 140 * t * units, n - (80 - i) * units),
  cxa.closePath(),
  cxa.fill(),
  setColor(landCols[2]),
  pagodaHeader(e, n - 5 * units, 180, 60, t),
  setColor(shardCols[5]),
  drawVine(100, new Point(e - 60 * units, n - 5 * units)),
  drawVine(140, new Point(e - 56 * units, n - 5 * units)),
  drawVine(70, new Point(e + 80 * units, n - 5 * units)),
  drawVine(90, new Point(e + 90 * units, n - 5 * units)),
  drawVine(180, new Point(e - 132 * units, n - 5 * units)),
  drawVine(120, new Point(e - 145 * units, n - 5 * units)),
  cxa.lineWidth = 2 * units;
  var a = new Point(e + 60 * units, n - 5 * units),
  s = new Point(e + 155 * units, n - 5 * units);
  cxa.beginPath(),
  cxa.moveTo(a.x, a.y),
  cxa.bezierCurveTo(a.x, a.y + 100 * units, s.x, a.y + 100 * units, s.x, s.y),
  cxa.stroke(),
  cxa.lineWidth = 1,
  o = get2Dfrom3D(scenery[1], camera3D),
  e = o.x,
  n = o.y,
  setColor(landCols[2]),
  pagodaHeader(e, n - 60 * units, 100, 32, t),
  cxa.beginPath(),
  cxa.moveTo(e - 60 * t * units, n - 80 * units),
  cxa.lineTo(e + 60 * t * units, n - 80 * units),
  cxa.lineTo(e, n - 100 * units),
  cxa.closePath(),
  cxa.fill(),
  cxa.beginPath(),
  cxa.moveTo(e - 140 * t * units, n),
  cxa.lineTo(e - 140 * t * units, n + 120 * units),
  cxa.lineTo(e - 110 * t * units, n + 130 * units),
  cxa.lineTo(e - 100 * t * units, n + 140 * units),
  cxa.lineTo(e - 100 * t * units, n),
  cxa.closePath(),
  cxa.fill(),
  cxa.beginPath(),
  cxa.moveTo(e + 140 * t * units, n),
  cxa.lineTo(e + 140 * t * units, n + 160 * units),
  cxa.lineTo(e + 130 * t * units, n + 170 * units),
  cxa.lineTo(e + 107 * t * units, n + 175 * units),
  cxa.lineTo(e + 100 * t * units, n + 180 * units),
  cxa.lineTo(e + 100 * t * units, n),
  cxa.closePath(),
  cxa.fill(),
  setColor(shardCols[3]),
  cxa.beginPath(),
  cxa.moveTo(e - 140 * t * units, n - 5 * units),
  cxa.lineTo(e - 140 * t * units, n + 15 * units),
  cxa.lineTo(e - 120 * t * units, n + 10 * units),
  cxa.lineTo(e - 107 * t * units, n + 30 * units),
  cxa.lineTo(e - 100 * t * units, n + 20 * units),
  cxa.lineTo(e - 100 * t * units, n - 5 * units),
  cxa.moveTo(e + 140 * t * units, n - 5 * units),
  cxa.lineTo(e + 140 * t * units, n + 40 * units),
  cxa.lineTo(e + 130 * t * units, n + 55 * units),
  cxa.lineTo(e + 107 * t * units, n + 50 * units),
  cxa.lineTo(e + 100 * t * units, n + 60 * units),
  cxa.lineTo(e + 100 * t * units, n - 5 * units),
  cxa.closePath(),
  cxa.fill(),
  setRGBA(105, 130, 115, 1),
  cxa.beginPath(),
  cxa.moveTo(e - 20 * t * units, n - 5 * units),
  cxa.lineTo(e + 20 * t * units, n + 10 * units),
  cxa.lineTo(e + 40 * t * units, n + 6 * units),
  cxa.lineTo(e + 70 * t * units, n + 17 * units),
  cxa.lineTo(e + 75 * t * units, n + 19 * units),
  cxa.lineTo(e + 100 * t * units, n + 13 * units),
  cxa.lineTo(e + 130 * t * units, n - 5 * units),
  cxa.closePath(),
  cxa.fill(),
  setRGBA(120, 140, 130, 1),
  cxa.beginPath(),
  cxa.moveTo(e + 90 * t * units, n - 5 * units),
  cxa.lineTo(e + 60 * t * units, n + 10 * units),
  cxa.lineTo(e + 50 * t * units, n + 40 * units),
  cxa.lineTo(e + 65 * t * units, n + 14 * units),
  cxa.lineTo(e + 90 * t * units, n - 3 * units),
  cxa.lineTo(e + 80 * t * units, n + 15 * units),
  cxa.lineTo(e + 75 * t * units, n + 55 * units),
  cxa.lineTo(e + 85 * t * units, n + 20 * units),
  cxa.closePath(),
  cxa.fill(),
  setColor(shardCols[5]),
  cxa.fillRect(e - 145 * units, n - 40 * units, 290 * units, 44 * units),
  o = get2Dfrom3D(scenery[0], camera3D),
  e = o.x,
  n = o.y,
  drawVine(50, new Point(e - 90 * units, n - 5 * units)),
  drawVine(60, new Point(e - 65 * units, n - 5 * units)),
  drawVine(120, new Point(e + 85 * units, n - 5 * units)),
  drawVine(50, new Point(e + 160 * units, n - 5 * units)),
  drawVine(170, new Point(e + 130 * units, n - 5 * units)),
  cxa.lineWidth = 2 * units,
  a = new Point(e + 130 * units, n - 5 * units),
  s = new Point(e + 165 * units, n - 5 * units),
  cxa.beginPath(),
  cxa.moveTo(a.x, a.y),
  cxa.bezierCurveTo(a.x, a.y + 80 * units, s.x, a.y + 80 * units, s.x, s.y),
  cxa.stroke(),
  cxa.lineWidth = 1,
  pagodaHeader(e, n, 200, 60, t),
  cxa.beginPath(),
  cxa.moveTo(e - 60 * t * units, n - 45 * units),
  cxa.lineTo(e + 60 * t * units, n - 45 * units),
  cxa.lineTo(e, n - 65 * units),
  cxa.closePath(),
  cxa.fill(),
  cxa.beginPath(),
  cxa.moveTo(e - 140 * t * units, n - 5 * units),
  cxa.lineTo(e - 130 * t * units, n + 8 * units),
  cxa.lineTo(e - 120 * t * units, n + 3 * units),
  cxa.lineTo(e - 107 * t * units, n + 5 * units),
  cxa.lineTo(e - 105 * t * units, n + 3 * units),
  cxa.lineTo(e - 100 * t * units, n - 5 * units),
  cxa.moveTo(e + 140 * t * units, n - 5 * units),
  cxa.lineTo(e + 140 * t * units, n - 5 * units),
  cxa.lineTo(e + 130 * t * units, n + 8 * units),
  cxa.lineTo(e + 120 * t * units, n + 2 * units),
  cxa.lineTo(e + 110 * t * units, n + 5 * units),
  cxa.lineTo(e + 100 * t * units, n - 5 * units),
  cxa.closePath(),
  cxa.fill(),
  setColor(shardCols[3]),
  cxa.beginPath(),
  cxa.moveTo(e - 50 * t * units, n - 30 * units),
  cxa.lineTo(e, n - 20 * units),
  cxa.lineTo(e + 50 * t * units, n - 30 * units),
  cxa.closePath(),
  cxa.fill()
}
function pagodaHeader(e, n, o, t, i) {
  var a = 5 * Math.random();
  a = 0,
  cxa.beginPath(),
  cxa.moveTo(e - 1.05 * o * i * units, n - (1.15 * t + a) * units),
  cxa.lineTo(e - 0.9 * o * i * units, n - (0.82 * t + a) * units),
  cxa.lineTo(e + 0.9 * o * i * units, n - (0.82 * t + a) * units),
  cxa.lineTo(e + 1.05 * o * i * units, n - (1.15 * t + a) * units),
  cxa.lineTo(e + 0.95 * o * i * units, n + a * units),
  cxa.lineTo(e - 0.95 * o * i * units, n + a * units),
  cxa.closePath(),
  cxa.fill()
}
function drawWorm2(e) {
  var n,
  o;
  if (Player[3].volume.value > 5 && (setColor(shardCols[4]), cxa.globalAlpha = 1, e.Sprites.length)) for (n = 0; n < e.Sprites.length; n++) {
    var t = e.Sprites[n];
    for (cxa.beginPath(), cxa.moveTo(halfX + t[0].x * units, halfY + t[0].y * units), o = 1; o < t.length; o++) cxa.lineTo(halfX + t[o].x * units, halfY + t[o].y * units);
    cxa.closePath(),
    cxa.fill()
  }
}
function drawTriangle() {
  if (ArpOsc.volume.value > - 20) {
    setColor(shardCols[5]),
    cxa.globalAlpha = 1;
    var e = triVector,
    n = (160 + 10 * Math.random()) * units,
    o = halfX,
    t = halfY + 20 * units,
    i = (ArpOsc.volume.value + 20) * (2.5 + 1.5 * Math.random()) * units;
    4 > scene ? (cxa.beginPath(), cxa.moveTo(o - n * e.x, t + n * e.y), cxa.lineTo(o, t - n), cxa.lineTo(o + n * e.x, t + n * e.y), cxa.lineTo(o + (n - i) * e.x, t + (n - i) * e.y), cxa.lineTo(o, t - (n - i)), cxa.lineTo(o - (n - i) * e.x, t + (n - i) * e.y), cxa.closePath(), cxa.fill())  : (setColor(shardCols[4]), cxa.fillRect(o - i * e.x, 0, i * e.x * 2, fullY))
  }
}
function drawExtra() {
  setColor(shardCols[6]),
  cxa.lineWidth = 2 * units;
  var e = get2Dfrom3D(controllers[7], camera3D),
  n = get2Dfrom3D(controllers[6], camera3D);
  cxa.beginPath(),
  cxa.moveTo(e.x, e.y),
  cxa.bezierCurveTo(e.x, e.y + 240 * units, n.x, e.y + 240 * units, n.x, n.y),
  cxa.stroke(),
  cxa.lineWidth = 1
}
function setColor(e) {
  var n = Math.round(e.R + masterCol.R),
  o = Math.round(e.G + masterCol.G),
  t = Math.round(e.B + masterCol.B),
  i = e.A + masterCol.A,
  a = (n + o + t) / 3,
  s = a / 255,
  r = 1 - a / 255;
  n += Math.round(highPass.R * s + lowPass.R * r),
  o += Math.round(highPass.G * s + lowPass.G * r),
  t += Math.round(highPass.B * s + lowPass.B * r),
  buildColour(n, o, t, i)
}
function setRGBA(e, n, o, t) {
  var i = Math.round(e + masterCol.R),
  a = Math.round(n + masterCol.G),
  s = Math.round(o + masterCol.B),
  r = t + masterCol.A,
  l = (i + a + s) / 3,
  c = l / 255,
  u = 1 - l / 255;
  i += Math.round(highPass.R * c + lowPass.R * u),
  a += Math.round(highPass.G * c + lowPass.G * u),
  s += Math.round(highPass.B * c + lowPass.B * u),
  buildColour(i, a, s, r)
}
function buildColour(e, n, o, t) {
  0 > e && (e = 0),
  e > 255 && (e = 255),
  0 > n && (n = 0),
  n > 255 && (n = 255),
  0 > o && (o = 0),
  o > 255 && (o = 255),
  0 > t && (t = 0),
  t > 1 && (t = 1),
  cxa.fillStyle = cxa.strokeStyle = 'rgba(' + e + ',' + n + ',' + o + ',' + t + ')'
}
function drawPanel() {
  cxa.fillStyle = '#000',
  cxa.fillRect(0, panelPos.y, fullX, fullY);
  var e = panelPos.y + halfY + 90 * units;
  closeOver ? cxa.lineWidth = 3 : cxa.lineWidth = 1,
  setColor(shardCols[4]),
  cxa.beginPath(),
  cxa.moveTo(halfX - 60 * units, e),
  cxa.lineTo(halfX + 60 * units, e),
  cxa.lineTo(halfX + 60 * units, e + 30 * units),
  cxa.lineTo(halfX - 60 * units, e + 30 * units),
  cxa.closePath(),
  cxa.stroke(),
  cxa.lineWidth = 1,
  cxa.beginPath(),
  cxa.moveTo(halfX - 5 * units, e + 10 * units),
  cxa.lineTo(halfX + 5 * units, e + 20 * units),
  cxa.moveTo(halfX + 5 * units, e + 10 * units),
  cxa.lineTo(halfX - 5 * units, e + 20 * units),
  e = panelPos.y + halfY,
  cxa.moveTo(halfX - 80 * units, e - 42 * units),
  cxa.lineTo(halfX - 80 * units, e - 22 * units),
  cxa.moveTo(halfX + 80 * units, e - 42 * units),
  cxa.lineTo(halfX + 80 * units, e - 22 * units),
  cxa.stroke(),
  cxa.font = '400 italic ' + dataType + 'px PT Sans',
  cxa.textAlign = 'center',
  cxa.fillText('All samples from the track Yume.', halfX, e + 45 * units),
  cxa.fillText('Interactive by Whitevinyl.', halfX, e + 60 * units);
  var n = 0.5 * cxa.measureText('Interactive by Whitevinyl.').width,
  o = cxa.measureText('Whitevinyl.').width;
  linkOver[3] ? cxa.lineWidth = 3 : cxa.lineWidth = 1,
  cxa.beginPath(),
  cxa.moveTo(halfX + n - units, e + 66 * units),
  cxa.lineTo(halfX + n - o + units, e + 66 * units),
  cxa.stroke(),
  cxa.fillText('Order the album Yume here:', halfX, e - 65 * units),
  cxa.font = '300 ' + bodyType + 'px Raleway',
  cxa.fillText('Bandcamp'.toUpperCase(), halfX - 160 * units, e - 25 * units),
  cxa.fillText('iTunes'.toUpperCase(), halfX, e - 25 * units),
  cxa.fillText('Unseen'.toUpperCase(), halfX + 160 * units, e - 25 * units),
  o = 0,
  linkOver[0] && (o = 20),
  cxa.fillRect(halfX - 166 * units - 0.5 * o * units, e - 10 * units, 12 * units + o * units, 2 * units),
  o = 0,
  linkOver[1] && (o = 20),
  cxa.fillRect(halfX - 6 * units - 0.5 * o * units, e - 10 * units, 12 * units + o * units, 2 * units),
  o = 0,
  linkOver[2] && (o = 20),
  cxa.fillRect(halfX + 154 * units - 0.5 * o * units, e - 10 * units, 12 * units + o * units, 2 * units)
}
function colourTo(e, n, o, t, i, a) {
  a = a || 1000;
  var s = {
    red: e.R,
    green: e.G,
    blue: e.B,
    alpha: e.A
  },
  r = new TWEEN.Tween(s);
  r.to({
    red: n,
    green: o,
    blue: t,
    alpha: i
  }, 1000 * a),
  r.start(),
  r.onUpdate(function () {
    e.R = this.red,
    e.G = this.green,
    e.B = this.blue,
    e.A = this.alpha
  }),
  r.easing(TWEEN.Easing.Quadratic.InOut)
}
function colourToColour(e, n, o) {
  o = o || 1000;
  var t = {
    red: e.R,
    green: e.G,
    blue: e.B,
    alpha: e.A
  },
  i = new TWEEN.Tween(t);
  i.to({
    red: n.R,
    green: n.G,
    blue: n.B,
    alpha: n.A
  }, 1000 * o),
  i.start(),
  i.onUpdate(function () {
    e.R = this.red,
    e.G = this.green,
    e.B = this.blue,
    e.A = this.alpha
  }),
  i.easing(TWEEN.Easing.Quadratic.InOut)
}
function paletteTo(e, n, o) {
  var t = e.length;
  t > n.length && (t = n.length);
  for (var i = 0; t > i; i++) colourToColour(e[i], n[i], o)
}
function delayTo(e, n, o, t, i) {
  var a = {
    x: e['' + n]
  },
  s = new TWEEN.Tween(a);
  s.to({
    x: o
  }, 1000 * t),
  s.delay(1000 * i),
  s.start(),
  s.onUpdate(function () {
    e['' + n] = this.x
  }),
  s.easing(TWEEN.Easing.Quadratic.InOut)
}
function cancelTo(e, n, o, t, i) {
  var a = {
    x: e['' + n]
  };
  cancelTween = new TWEEN.Tween(a),
  cancelTween.to({
    x: o
  }, 1000 * t),
  cancelTween.delay(1000 * i),
  cancelTween.start(),
  cancelTween.onUpdate(function () {
    e['' + n] = this.x
  }),
  cancelTween.easing(TWEEN.Easing.Quadratic.InOut)
}
function positionTo(e, n, o, t, i) {
  i = i || 'quint';
  var a;
  a = e.ThreeObject ? e.ThreeObject.position : e.position;
  var s = {
    x: a.x,
    y: a.y,
    z: a.z
  },
  r = new TWEEN.Tween(s);
  r.to({
    x: n.x,
    y: n.y,
    z: n.z
  }, 1000 * o),
  r.delay(1000 * t),
  r.start(),
  r.onUpdate(function () {
    a.x = this.x,
    a.y = this.y,
    a.z = this.z,
    e.ThreeDest && (e.ThreeDest.x = this.x, e.ThreeDest.y = this.y)
  }),
  'quad' === i ? r.easing(TWEEN.Easing.Quadratic.InOut)  : 'cube' === i ? r.easing(TWEEN.Easing.Cubic.InOut)  : 'quart' === i ? r.easing(TWEEN.Easing.Quartic.InOut)  : 'quint' === i ? r.easing(TWEEN.Easing.Quintic.InOut)  : 'expo' === i && r.easing(TWEEN.Easing.Exponential.InOut)
}
function automate(e, n, o, t, i, a) {
  a = a || !1;
  var s = e.Slider.value['' + n],
  r = {
    x: s
  },
  l = new TWEEN.Tween(r);
  l.to({
    x: o
  }, 1000 * t),
  l.delay(1000 * i),
  l.start(),
  l.onUpdate(function () {
    e.Slider.value['' + n] = this.x,
    setController(e, a, n)
  }),
  l.easing(TWEEN.Easing.Quadratic.InOut)
}
function floatTo(e, n) {
  var o,
  t = {
    y: e.ThreeFloat.position.y
  };
  o = e.ThreeFloat.position.y > 0 ? - 0.02 : 0.02;
  var i = new TWEEN.Tween(t);
  i.to({
    y: o
  }, 2000),
  i.delay(1000 * n),
  i.start(),
  floatTweens.push(i),
  i.onUpdate(function () {
    e.ThreeFloat.position.y = this.y
  }),
  i.onComplete(function () {
    floatTo(e, 0)
  }),
  i.easing(TWEEN.Easing.Sinusoidal.InOut)
}
var canvas,
cxa,
scene = 0,
TWEEN,
loadCount = 0,
loadReady = !1,
introAlpha = new Alpha(100),
halfX = 0,
halfY = 0,
fullX = 0,
fullY = 0,
units = 0,
dx = halfX,
dy = halfY,
headerType = 0,
midType = 0,
dataType = 0,
bodyType = 0,
subType = 0,
device = 'desktop',
windowFocussed = !0,
triVector = vectorFromAngle(degToRad(30)),
cameraDepth = 4,
mouseX = 0,
mouseY = 0,
touchTakeover = !1,
touch,
mouseIsDown = !1,
downPoint = new Point,
downRotation = new Point,
rotateDest = new Point,
rotateScale = new Size,
rotating = !1,
easeRotate = !1,
selectedController = null,
selectedControllerPos = new Point3D,
mouseDown3D = new Point3D,
interactable = !1,
infoAlpha = new Alpha(0),
infoOver = !1,
infoWidth = 10,
orderOver = !1,
cancelTween,
orderDest = 500,
orderY = 500,
orderFill = 0,
panelOpen = !1,
panelPos = new Point(0, - 5000),
closeOver = !1,
linkOver = [
],
landCols = [
],
landColsLight = [
],
shardCols = [
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1)
],
shardColsDark = [
],
shardColsLight = [
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1),
  new RGBA(255, 255, 255, 1)
],
linkCol = new RGBA(30, 35, 40, 1),
masterCol = new RGBA( - 255, - 255, - 255, 0),
highPass = new RGBA(0, 0, 0, 0),
lowPass = new RGBA(0, 0, 0, 0),
BackgroundList = [
],
ControllerList = [
],
SceneryList = [
],
backgrounds = [
],
controllers = [
],
scenery = [
],
flickerParticles = [
],
flickerParticles2 = [
],
windParticles = [
],
dustParticles = [
],
radialParticles = [
],
passageParticles = [
],
windDir = 0,
worms = [
],
wormClock = 0,
floatTweens = [
],
sunDest = 110,
masterRotate = new Point3D,
drumLevel = 1,
passageAlpha = new Alpha(0),
floatSpeed = new Vector(0, 1);
window.onblur = function () {
  windowFocussed = !1
},
window.onfocus = function () {
  windowFocussed = !0;
  var e;
  for (e = 0; e < floatTweens.length; e++) floatTweens[e].stop();
  for (floatTweens = [
  ], e = 0; e < controllers.length; e++) floatTo(controllers[e], 2 * Math.random())
},
$('html').mouseleave(function () {
  mouseRelease()
});
var renderer3D,
scene3D,
camera3D,
MasterObject,
World3D,
DrumMeter,
ArpOsc,
ArpFilter,
SlideFilter,
SlideLFO,
Reverb,
Delay,
Osc = [
],
LFO = [
],
Player = [
],
Gran = [
],
Noise = [
],
Filter = [
],
ArpBase = 5,
ArpScale = [
  'a',
  'b',
  'c#',
  'd',
  'e',
  'f#'
],
slideOctave = 4,
slideScale = [
  'a' + (slideOctave - 1),
  'f#' + (slideOctave - 1),
  'd' + slideOctave,
  'c#' + slideOctave,
  'd' + slideOctave,
  'a' + slideOctave,
  'c#' + slideOctave,
  'd' + slideOctave,
  'f#' + slideOctave,
  'g' + slideOctave
],
slideScale2 = [
  'd' + (slideOctave - 2),
  'd' + (slideOctave - 2),
  'f#' + (slideOctave - 2),
  'f#' + (slideOctave - 2),
  'b' + (slideOctave - 3),
  'b' + (slideOctave - 3),
  'a' + (slideOctave - 2),
  'a' + (slideOctave - 2),
  'g' + (slideOctave - 2),
  'g' + (slideOctave - 2)
],
synthGain = new Point(1.1, 0),
slideCurrent = 3,
loadedLoops = 0,
loadTotal = 0;
Tone.Transport.bpm.value = 80,
SliderFunctions = [
  function (e, n) {
    Player[0].volume.rampTo(e, n)
  },
  function (e, n, o) {
    if (Filter[0].frequency.rampTo(e, n), o) {
      var t = e / 240 - 50;
      masterCol.R = t + e / 600,
      masterCol.G = t - 10,
      masterCol.B = e / 480 - 50
    }
  },
  function (e, n, o) {
    Noise[0].volume.rampTo(e * synthGain.x - 35, n),
    Osc[0].volume.rampTo(e * synthGain.x - 35, n),
    Osc[1].volume.rampTo(e * synthGain.x - 35, n),
    o && (rotateDest.x = e * (Math.PI / 180))
  },
  function (e, n) {
    Player[1].volume.rampTo(e, n)
  },
  function (e, n, o) {
    Player[2].volume.rampTo(2 * e, n),
    o && (rotateDest.y = - e * (Math.PI / 180))
  },
  function (e, n) {
    Player[3].volume.rampTo(e, n)
  },
  function (e, n, o) {
    ArpBase = Math.round(e),
    o && (rotateDest.x = 6 * (e - 4) * (Math.PI / 180))
  },
  function (e, n) {
    ArpOsc.volume.rampTo(e, n)
  },
  function (e, n, o) {
    Math.round(e) !== slideCurrent && (slideCurrent = Math.round(e), Osc[2].frequency.rampTo(Tone.Master.noteToFrequency('' + slideScale[Math.round(e)]), 0.002), Osc[3].frequency.rampTo(Tone.Master.noteToFrequency('' + slideScale2[Math.round(e)]), 0.002)),
    o && (windDir = 2 * (e - 2))
  },
  function (e, n) {
    Osc[2].volume.rampTo(e, n),
    Osc[3].volume.rampTo(e, n);
    var o = 320 + 180 * (e + 30);
    Filter[1].frequency.rampTo(o, n)
  },
  function (e, n, o) {
    controllers[3].Slider.value.x = e,
    setController(controllers[3], o, 'x')
  },
  function (e, n, o) {
    if (controllers[3].Slider.value.y = e, setController(controllers[3], !1, 'y'), o) {
      var t = (e - 6000) / 85;
      masterCol.R = 35 + t,
      0 > t && (t *= 0.5),
      masterCol.G = 8 + t,
      0 > t && (t *= 0.2),
      masterCol.B = - 30 + t
    }
  },
  function (e, n) {
    Player[4].volume.rampTo(e, n)
  },
  function (e, n) {
    Player[5].volume.rampTo(e, n)
  },
  function (e, n, o) {
    Player[6].volume.rampTo(e, n),
    o && (sunDest = 152 - (e + 20))
  },
  function (e, n) {
    Player[7].volume.rampTo(e, n)
  },
  function (e, n) {
    Reverb.wet.rampTo(e, n)
  },
  function (e, n) {
    Player[8].volume.rampTo(e, n)
  },
  function (e, n) {
    Player[9].volume.rampTo(e, n)
  },
  function (e, n) {
    controllers[19].Slider.value.y = e,
    setController(controllers[19], !1, 'y')
  },
  function (e, n) {
    controllers[7].Slider.value.x = e,
    setController(controllers[7], !1, 'x')
  },
  function (e, n) {
    controllers[7].Slider.value.y = e,
    setController(controllers[7], !1, 'y')
  },
  function (e, n) {
    Tone.Master.volume.rampTo(e, n),
    orderDest = e > - 20 ? 100 * (e + 20)  : 0
  }
],
WebFontConfig = {
  google: {
    families: [
      'Raleway:400,300,100:latin',
      'PT+Sans:400italic:latin'
    ]
  }
},
function () {
  var e = document.createElement('script');
  e.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js',
  e.type = 'text/javascript',
  e.async = 'false';
  var n = document.getElementsByTagName('script') [0];
  n.parentNode.insertBefore(e, n)
}(),
SkipEvents = [
  function () {
    var e = 2.5,
    n = 1.1;
    if (colourTo(masterCol, 20, 0, 0, 1, e), colourTo(highPass, 0, - 15, - 15, 0, e), colourTo(lowPass, 10, 0, 10, 0, e), colourTo(landCols[0], 220, 200, 180, 0, e), delayTo(rotateDest, 'x', 0, e, 0), delayTo(rotateDest, 'y', 0, e, 0), 1 === scene) {
      var o = new Point3D(controllers[0].Slider.origins[1].x + (controllers[0].ThreeDest.x - controllers[0].Slider.origins[0].x), controllers[0].Positions[2].y, controllers[0].Positions[2].z),
      t = new Point3D(controllers[2].Positions[1].x, controllers[2].Slider.origins[1].y + (controllers[2].ThreeDest.y - controllers[2].Slider.origins[0].y), controllers[2].Positions[1].z);
      positionTo(controllers[0], o, e * n, 0, 'expo'),
      positionTo(controllers[2], t, e * n, 0, 'expo')
    }
    positionTo(World3D, new Point3D(0, - 14, 0), e, 0, 'quint'),
    controllers[0].Slider.origin = controllers[0].Slider.origins[1],
    controllers[2].Slider.origin = controllers[2].Slider.origins[1],
    Reverb.wet.rampTo(0, e),
    automate(controllers[3], 'x', - 10, e, 0),
    automate(controllers[3], 'y', 10000, e, 0),
    automate(controllers[1], 'y', - 10, e, 0),
    automate(controllers[6], 'y', 20, e, 0),
    automate(controllers[7], 'y', - 20, e, 0),
    automate(controllers[7], 'x', 4, e, 0),
    scene > 1 && automate(controllers[10], 'y', - 60, e, 0),
    scene = 2
  },
  function () {
    SynthSet(0);
    var e = 2.5,
    n = 1.1;
    colourTo(masterCol, - 15, - 35, - 37.5, 1, e),
    colourTo(highPass, 50, 45, 0, 0, e),
    colourTo(lowPass, - 255, 30, 50, 0, e),
    colourToColour(landCols[0], landColsLight[0], e),
    delayTo(rotateDest, 'x', 0, e, 0),
    delayTo(rotateDest, 'y', degToRad( - 8), e, 0);
    var o = new Point3D(controllers[0].Slider.origins[0].x + (controllers[0].ThreeDest.x - controllers[0].Slider.origins[1].x), controllers[0].Positions[1].y, controllers[0].Positions[1].z),
    t = new Point3D(controllers[2].Positions[0].x, controllers[2].Slider.origins[0].y + (controllers[2].ThreeDest.y - controllers[2].Slider.origins[1].y), controllers[2].Positions[0].z);
    positionTo(controllers[0], o, e * n, 0, 'expo'),
    positionTo(controllers[2], t, e * n, 0, 'expo'),
    positionTo(World3D, new Point3D(0, 0, 0), e, 0, 'quint'),
    controllers[0].Slider.origin = controllers[0].Slider.origins[0],
    controllers[2].Slider.origin = controllers[2].Slider.origins[0],
    automate(controllers[3], 'x', 0, e, 0),
    automate(controllers[3], 'y', 5750, e, 0),
    automate(controllers[1], 'y', 8, e, 0),
    automate(controllers[6], 'y', - 20, e, 0),
    automate(controllers[7], 'y', - 45, e, 0),
    automate(controllers[7], 'x', 4, e, 0),
    scene = 1
  },
  function () {
    3 > scene && SynthSet(1);
    var e = 2.5;
    colourTo(masterCol, - 50, - 40, - 10, 1, e),
    colourTo(highPass, - 20, - 5, 0, 0, e),
    colourTo(lowPass, 10, 0, 10, 0, e),
    colourToColour(landCols[0], landColsLight[0], e),
    delayTo(rotateDest, 'x', 0, e, 0),
    delayTo(rotateDest, 'y', 0, e, 0),
    delayTo(synthGain, 'x', 1.1, e, 0),
    positionTo(World3D, new Point3D( - 40, - 10, 0), e, 0, 'quint'),
    Reverb.wet.rampTo(0.2, e),
    3 > scene && (setValue(controllers[14], 'x', controllers[3].Slider.value.x), setValue(controllers[14], 'y', controllers[3].Slider.value.y), setPosition(controllers[14], 'x'), setPosition(controllers[14], 'y')),
    automate(controllers[14], 'x', 0, e, 0, !1),
    automate(controllers[14], 'y', 600, e, 0, !1),
    automate(controllers[2], 'y', 20, e, 0),
    automate(controllers[0], 'x', - 20, e, 0),
    automate(controllers[6], 'y', - 20, e, 0),
    automate(controllers[7], 'y', - 45, e, 0),
    automate(controllers[7], 'x', 4, e, 0),
    automate(controllers[10], 'x', 4.4, e, 0),
    automate(controllers[10], 'y', - 12, e, 0),
    automate(controllers[15], 'y', - 20, e, 0),
    automate(controllers[16], 'y', - 20, e, 0),
    scene = 3
  },
  function () {
    var e = 2.5;
    colourTo(masterCol, 35, 5, - 30, 1, e),
    colourTo(highPass, 0, - 5, - 15, 0, e),
    colourTo(lowPass, 10, 0, 10, 0, e),
    colourTo(landCols[0], 200, 200, 170, 0, e),
    delayTo(rotateDest, 'x', 0, e, 0),
    delayTo(rotateDest, 'y', 0, e, 0),
    delayTo(synthGain, 'x', 1.2, e, 0),
    positionTo(World3D, new Point3D( - 40, - 22, 0), e, 0, 'quint'),
    Reverb.wet.rampTo(0, e),
    automate(controllers[2], 'y', 15, e, 0),
    automate(controllers[14], 'x', 0, e, 0, !1),
    automate(controllers[14], 'y', 6000, e, 0, !1),
    automate(controllers[10], 'y', - 60, e, 0),
    automate(controllers[15], 'y', 22, e, 0),
    automate(controllers[16], 'y', - 15, e, 0),
    scene > 4 && (Player[0].start(), Player[1].start(), Player[2].start(), Player[3].start(), Player[4].start(), Player[5].start(), setTimeout(function () {
      Player[6].stop(),
      Player[7].stop(),
      Player[8].stop(),
      Player[9].stop(),
      Player[10].stop()
    }, 1000 * e), automate(controllers[18], 'y', - 20, e, 0), automate(controllers[19], 'y', - 20, e, 0), automate(controllers[20], 'y', 0, e, 0)),
    scene = 4
  },
  function () {
    var e = 2.5;
    colourTo(masterCol, 20, 10, 0, 1, e),
    colourTo(highPass, 40, 40, 20, 0, e),
    colourTo(lowPass, 10, - 30, 0, 0, e),
    colourTo(landCols[0], 200, 200, 170, 0, e),
    delayTo(rotateDest, 'x', 0, e, 0),
    delayTo(rotateDest, 'y', 0, e, 0),
    delayTo(synthGain, 'x', 1.1, e, 0),
    5 > scene && (Player[6].start(), Player[7].start(), Player[8].start(), Player[9].start(), Player[10].start(), setTimeout(function () {
      Player[0].stop(),
      Player[1].stop(),
      Player[2].stop(),
      Player[3].stop(),
      Player[4].stop(),
      Player[5].stop()
    }, 1000 * e)),
    positionTo(World3D, new Point3D(0, - 100, 0), e, 0, 'quint'),
    sunDest = 110,
    scene > 5 && (delayTo(passageAlpha, 'A', 0, 0.5 * e, 0), setValue(controllers[19], 'y', controllers[25].Slider.value.y), setPosition(controllers[19], 'y')),
    automate(controllers[14], 'x', - 10, e, 0, !1),
    automate(controllers[14], 'y', 8000, e, 0, !1),
    automate(controllers[2], 'y', - 20, e, 0),
    automate(controllers[10], 'y', - 60, e, 0),
    automate(controllers[15], 'y', - 20, e, 0),
    automate(controllers[16], 'y', - 20, e, 0),
    automate(controllers[18], 'y', 22, e, 0),
    automate(controllers[19], 'y', - 20, e, 0),
    automate(controllers[23], 'y', - 20, e, 0),
    automate(controllers[24], 'y', - 20, e, 0),
    automate(controllers[26], 'x', 2, e, 0),
    automate(controllers[26], 'y', - 45, e, 0),
    scene = 5
  },
  function () {
    var e = 2.5;
    colourTo(masterCol, - 60, - 50, - 30, 1, e),
    colourTo(highPass, - 20, 0, 0, 0, e),
    colourTo(lowPass, - 40, - 30, 20, 0, e),
    colourTo(landCols[0], 120, 130, 150, 1, e),
    scene > 6 && paletteTo(shardCols, shardColsDark, e),
    delayTo(rotateDest, 'x', 0, e, 0),
    delayTo(rotateDest, 'y', 0, e, 0),
    delayTo(passageAlpha, 'A', 100, e, 0),
    delayTo(floatSpeed, 'y', 1, e, 0),
    positionTo(World3D, new Point3D(0, - 200, 0), e, 0, 'quint'),
    sunDest = 110,
    6 > scene && (setValue(controllers[25], 'y', controllers[19].Slider.value.y), setPosition(controllers[25], 'y')),
    automate(controllers[14], 'x', - 10, e, 0, !1),
    automate(controllers[14], 'y', 8000, e, 0, !1),
    automate(controllers[18], 'y', - 20, e, 0, !1),
    automate(controllers[20], 'y', 0, e, 0),
    automate(controllers[23], 'y', 22, e, 0),
    automate(controllers[24], 'y', - 20, e, 0),
    automate(controllers[25], 'y', 22, e, 0),
    automate(controllers[29], 'y', - 18, e, 0),
    Player[10].volume.rampTo( - 20, e),
    scene = 6
  },
  function () {
    var e = 2.5;
    colourTo(masterCol, - 20, - 15, - 10, 1, e),
    colourTo(highPass, - 20, 0, 0, 0, e),
    colourTo(lowPass, - 40, - 30, 20, 0, e),
    colourTo(landCols[0], 20, 25, 30, 1, e),
    paletteTo(shardCols, shardColsLight, e),
    delayTo(rotateDest, 'x', 0, e, 0),
    delayTo(rotateDest, 'y', 0, e, 0),
    delayTo(passageAlpha, 'A', 30, e, 0),
    delayTo(floatSpeed, 'y', 0.1, e, 0),
    positionTo(World3D, new Point3D(0, - 220, 0), e, 0, 'quint'),
    automate(controllers[20], 'y', 0, e, 0),
    automate(controllers[23], 'y', - 20, e, 0),
    automate(controllers[24], 'y', - 20, e, 0),
    automate(controllers[25], 'y', - 20, e, 0),
    automate(controllers[26], 'y', - 45, e, 0),
    Player[10].volume.rampTo(20, e),
    scene = 7
  }
];
