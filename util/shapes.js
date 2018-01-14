var THREE = require('three');

function vector_arr(array_of_vector_two){
	return array_of_vector_two.map(x => new THREE.Vector2(x[0], x[1]))
}

var heartShape = new THREE.Shape();

var x = y = 0
heartShape.moveTo(5, 5 );
heartShape.bezierCurveTo(5, 5, 4, 0, 0, 0);
heartShape.bezierCurveTo(-6, 0, -6, 7, -6, 7);
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
var heartGeometry = new THREE.ShapeGeometry(heartShape);
var arr = vector_arr([[30, 10], [45, 0], [0, 0]])
var mountainShape = new THREE.Shape(arr);
var mountainGeometry = new THREE.ShapeGeometry(mountainShape);

exports.heartGeometry = heartGeometry;
exports.mountainGeometry = mountainGeometry;
