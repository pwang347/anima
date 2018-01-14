var THREE = require('three');
var defaultMaterial = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	shading: THREE.FlatShading
});

var mountainMaterial = new THREE.MeshBasicMaterial({
	color: 0x4eee94,
	shading: THREE.FlatShading
});
var mountainMaterial2 = new THREE.MeshBasicMaterial({
	color: 0x856864,
	shading: THREE.FlatShading
});

var textMaterial = new THREE.MeshBasicMaterial({
	color: 0x4CA6FF,
	shading: THREE.FlatShading
});

var particleMaterial = new THREE.MeshBasicMaterial({
	color: 0xfaf7e5,
	shading: THREE.FlatShading
});

exports.defaultMaterial = defaultMaterial;
exports.mountainMaterial = mountainMaterial;
exports.mountainMaterial2 = mountainMaterial2;
exports.textMaterial = textMaterial;
exports.particleMaterial = particleMaterial;