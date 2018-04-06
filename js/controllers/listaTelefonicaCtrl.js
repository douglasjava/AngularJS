angular.module('listaTelefonica').controller('listaTelefonicaCtrl', ($scope, $http, contatosAPI, operadorasAPI) => {

			$scope.app = 'Lista Telefonica';

			$scope.contatos = [];
			$scope.operadoras = [];

			/**For versions up to Angular v.1.6*/
			let carregarContatos = function (){
				$http({
				  method: 'GET',
				  url: contatosAPI.getContatos()
				}).then(function successCallback(response) {
					$scope.contatos = response.data;					
				}, function errorCallback(response) {
					$scope.message = "Aconteceu um problema: " + response.status;
			    });
			};

			let carregarOperadoras = function (){
				$http({
					method: 'GET',
					url: operadorasAPI.getOperadoras()
				}).then(function successCallback(response){
					$scope.operadoras = response.data;
				}, function errorCallback(response){
					$scope.message = "Aconteceu um problema: " + response.status;
				});
			};



			/**
			The .success syntax was correct up to Angular v1.4.3.
			let carregarContatos = function () {
				$http.get("http://localhost:8080/contatos").success( () data ) => {
					$scope.contatos = data;
				}).error( (data, status) => {
					$scope.message = "Aconteceu um problema: " + data;
				});
			};
			

			let carregarOperadoras = function (){
				$http.get("http://localhost:8080/operadora").success( ( data ) => {
					$scope.operadors = data;
				}).error( (data, status) => {
					$scope.message = "Aconteceu um problema: " + data;
				});;
			};
			**/

			$scope.adicionarContato = function (contato) {
				//$scope.contatos.push({nome: $scope.nome, telefone: $scope.telefone}); // Forma ruim, quebra o mantra - devemos evitar ler o scope estando dentro do controle
				//$scope.contatos.push({nome: nome, telefone: telefone}); // Forma meidana. 
				$scope.contatos.push(angular.copy(contato));// melhor forma;
				delete $scope.contato;
				$scope.contatoForm.$setPristine();
			};


			/**Adcionando no Servidor utilizando post
			$scope.adicionarContato = function (contato) {
				$http.post("http://localhost:8080/contatos", contato).success( (data) => {
					delete $scope.contato;
					$scope.contatoForm.$setPristine();	
					carregarContatos();
				});
				
			};	
			**/

			$scope.apagarContatos = function (contatos) {
				$scope.contatos = contatos.filter(function (contato){ //Atribuir os não selecionados a lista 
					if(!contato.selecionado) return contato;
				});
			};
			$scope.isContatoSelecionado = function (contatos){
				return contatos.some(function(contato){
					return contato.selecionado;
				});
			};
			$scope.regexTelefone = new RegExp(/[0-9]{5}-[0-9]{4}$/);

			$scope.ordenarPor = function (campo){
				$scope.criterioDeOrdenacao = campo;
				$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
			}

			
			carregarContatos();
			carregarOperadoras();

		});