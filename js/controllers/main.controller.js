angular
    .module('addressbook')
    .controller('MainController', MainController);

function MainController ($scope) {

	// Controller initialization
	var vm = this,
		countId = parseInt(localStorage.getItem("countId")) || 0,
		msg = {
			successSave: "The contact is saved to your addressbook",
			formError: "You have to fill every fields to save the contact",
			confirmDelete: "Are you sure to delete <name> <surname> from your addressbook?"
		},
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
			},
			alertMsg: function (msg, cb) {
				vm.alertMsg = msg;
				vm.show = true;
				vm.confirm = cb;
			},
			buildTxt: function (str, obj) {
				angular.forEach(obj, function (value, id) {
			 		str = str.replace(new RegExp('<' + id + '>', 'g'), value);
				});

				return str;
			}
		};
	vm.mailPtr = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
	vm.ordBy = "id";
	vm.asc = false;

	// var countries = require('country-list')();
	// console.log(countries);

	// Initialize form
	fn.resetForm();

	// Initialize addressBook
	vm.addressbook = JSON.parse(localStorage.getItem("addressbook")) || null;

	// Bindable functions
	vm.saveData = saveData;
	vm.editContact = editContact;
	vm.deleteContact = deleteContact;
	vm.changeFilter = changeFilter;
	vm.cancelEditing = cancelEditing;

	// Function to save the data in the form
	function saveData (form) {
		if (form.$valid) {
			if (!vm.addressbook)
				vm.addressbook = {};

			vm.addressbook[vm.form.id] = vm.form;
			fn.resetForm(form);

			vm.editing = false;

			// Save localstorage addressbook
			localStorage.setItem("addressbook", JSON.stringify(vm.addressbook));

			fn.alertMsg(msg.successSave);
		} else {
			fn.alertMsg(msg.formError);
		}
		
	};

	// Function to edit a saved contact
	function editContact (ind) {
		vm.form = angular.copy(vm.addressbook[ind]);
		vm.editing = true;

		// Save localstorage addressbook
		localStorage.setItem("addressbook", JSON.stringify(vm.addressbook));
	};

	// Function to delete a saved contact
	function deleteContact (ind) {
		var builConfirm = fn.buildTxt(msg.confirmDelete, {
			name: vm.addressbook[ind].name,
			surname: vm.addressbook[ind].surname
		});
		fn.alertMsg(builConfirm, function () {
			delete vm.addressbook[ind];
			if (angular.equals({}, vm.addressbook))
				vm.addressbook = null;

			// Save localstorage addressbook
			localStorage.setItem("addressbook", JSON.stringify(vm.addressbook));

			vm.show = false;
		});
	};

	// Function to change the order in the table
	function changeFilter (kind) {
		vm.asc = (vm.ordBy === kind) ? !vm.asc : false;
    	vm.ordBy = kind;
	};

	// Function that reset the form and give back the id there was
	function cancelEditing () {
		fn.resetForm();

		vm.editing = false;
	};
}