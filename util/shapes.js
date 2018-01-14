var THREE = require('three');

function vector_arr(array_of_vector_two){
	return array_of_vector_two.map(x => new THREE.Vector2(x[0], x[1]))
}

var arr = vector_arr([[30, 10], [45, 0], [0, 0]])
var mountainShape = new THREE.Shape(arr);
var mountainGeometry = new THREE.ShapeGeometry(mountainShape);
var particleGeometry = new THREE.TetrahedronGeometry(2, 0);
var circleGeometry = new THREE.CircleGeometry(5, 5);
exports.mountainGeometry = mountainGeometry;
exports.particleGeometry = particleGeometry;
exports.circleGeometry = circleGeometry;
