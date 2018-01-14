var THREE = require('three');

function vector_arr(array_of_vector_two){
	return array_of_vector_two.map(x => new THREE.Vector2(x[0], x[1]))
}

var arr = vector_arr([[30, 10], [45, 0], [0, 0]])
var mountainShape = new THREE.Shape(arr);
var mountainGeometry = new THREE.ShapeGeometry(mountainShape);
var particleGeometry = new THREE.ShapeGeometry(new THREE.Shape(vector_arr([[0, 1], [5, 1], [5, 0], [0, 0]])));
var circleGeometry = new THREE.CircleGeometry(5, 5);
var treeGeometry = new THREE.ShapeGeometry(new THREE.Shape(vector_arr([[5, 30], [10, 0], [0, 0]])))
var diamondGeometry = new THREE.ShapeGeometry(new THREE.Shape(vector_arr([[10, 30], [20, 0], [10, -30], [0,0]])))
exports.mountainGeometry = mountainGeometry;
exports.particleGeometry = particleGeometry;
exports.circleGeometry = circleGeometry;
exports.treeGeometry = treeGeometry;
