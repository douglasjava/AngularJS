/**
*  Module
*
* Retorna Service de Contatos
*/
angular.module('listaTelefonica').factory('contatosAPI', function () {
	var _getContatos = function (){
		return 'http://localhost:8080/contatos';
	}
	return {
		getContatos: _getContatos,
	};

});
