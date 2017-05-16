angular
    .module('addressbook')
    .controller('MainController', MainController);

function MainController ($scope) {

	// Controller initialization
	var vm = this,
		countId = parseInt(localStorage.getItem("countId")) || 0, // #todo mettere il localStorage se presente
		fn = {
			resetForm: function (form) {
				// Clean the object
				vm.form = {
					'id': countId,
					'name': "",
					'surname': "",
					'email': "",
					'location': ""
				};

				// Prepare next object
				countId += 1;

				// Save localstorage idcount
				localStorage.setItem("countId", countId);
			}
		};
	vm.mailPtr = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

	var countries = require('country-list')();
	console.log(countries);

	// Initialize form
	fn.resetForm();

	// Initialize addressBook
	vm.addressbook = JSON.parse(localStorage.getItem("addressbook")) || null;

	// Bindable functions
	vm.saveData = saveData;
	vm.editContact = editContact;
	vm.deleteContact = deleteContact;

	// Function to save the data in the form
	function saveData (form) {
		if (form.$valid) {
			if (!vm.addressbook)
				vm.addressbook = {};

			vm.addressbook[vm.form.id] = vm.form;
			fn.resetForm(form);

			// Save localstorage addressbook
			localStorage.setItem("addressbook", JSON.stringify(vm.addressbook));
		} else {
			console.log("Check and display error");
		}
		
	};

	// Function to edit a saved contact
	function editContact (ind) {
		vm.form = vm.addressbook[ind];

		// Save localstorage addressbook
		localStorage.setItem("addressbook", JSON.stringify(vm.addressbook));
	};

	// Function to delete a saved contact
	function deleteContact (ind) {
		delete vm.addressbook[ind];
		if (angular.equals({}, vm.addressbook))
			vm.addressbook = null;

		// Save localstorage addressbook
		localStorage.setItem("addressbook", JSON.stringify(vm.addressbook));
	};
}