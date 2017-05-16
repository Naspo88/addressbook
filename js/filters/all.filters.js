angular
    .module('addressbook')
    .filter('toArray', toArray);

function toArray () {
	return function(obj) {
        var result = [];
        angular.forEach(obj, function(val, key) {
            result.push(val);
        });
        return result;
    };
};