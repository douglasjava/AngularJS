/**
*  Module
*
* Description
*/
angular.module('listaTelefonica').service('operadorasAPI', function () {
	this.getOperadoras = function () {
		return 'http://localhost:8080/operadora';
	};
});