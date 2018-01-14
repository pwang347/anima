var THREE = require('three');
var defaultMaterial = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	shading: THREE.FlatShading
});

var mountainMaterial = new THREE.MeshPhongMaterial({
	color: 0x90CEB9,
	shading: THREE.FlatShading
});

var textMaterial = new THREE.MeshPhongMaterial({
	color: 0x000000,
	shading: THREE.FlatShading
});

exports.defaultMaterial = defaultMaterial;
