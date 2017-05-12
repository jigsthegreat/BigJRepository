// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better
// to create separate JavaScript files as needed.
//
//= require bower_components/angular/angular.js

//= require jquery
//= require_tree app
//= require_self
//= require bower_components/ng-file-upload/ng-file-upload-shim.min.js
//= require bower_components/ng-file-upload/ng-file-upload.min.js
//= require bower_components/angular-smart-table/dist/smart-table.min.js
//= require bower_components/angular-animate/angular-animate.min.js
//= require bower_components/bootstrap/dist/js/bootstrap.min.js
//= require bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js
//= require bower_components/angular-resource/angular-resource.js
//= require bower_components/angular-ui-router/release/angular-ui-router.min.js
//= require bower_components/jquery/dist/jquery.min.js
//= require bower_components/angular-xeditable/dist/js/xeditable.js
//= require bower_components/satellizer/satellizer.js
//= require bower_components/gm.typeaheadDropdown-master/dist/gm.typeaheadDropdown.min.js
//= require bower_components/angular-bootstrap-datetimepicker/node_modules/moment/moment.js
//= require bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js
//= require bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js
//= require bower_components/angularjs-toaster/toaster.js
//= require bower_components/angular-bootstrap-confirm/dist/angular-bootstrap-confirm.min.js
//= require bower_components/angular-sanitize/angular-sanitize.min.js
//= require bower_components/bootstrap-daterangepicker/daterangepicker.js
//= require bower_components/angular-daterangepicker/js/angular-daterangepicker.js
//= require bower_components/checklist-model/checklist-model.js

if (typeof jQuery !== 'undefined') {
	(function($) {
		$('#spinner').ajaxStart(function() {
			$(this).fadeIn();
		}).ajaxStop(function() {
			$(this).fadeOut();
		});
	})(jQuery);
}
