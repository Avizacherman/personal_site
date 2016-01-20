//The purpose of this file is to provide a level of functionality to my personal website. The code is intentionally not DRY, but rather written as simple as possible.

'use strict';

$(document).ready(function () {

	var $holder = $('#image-holder');
	var $linker = $('#linker');

	//Form Validation
	$('#contact-form').form({
		on: 'submit',
		inline: true,
		fields: {
			from: {
				identifier: 'from',
				rules: [{
					type: 'empty',
					prompt: "Please enter your name"
				}]

			},
			fromEmail: {
				identifier: 'fromEmail',
				rules: [{
					type: 'empty',
					prompt: 'Please fill in this field'
				}, {
					type: 'email',
					prompt: 'Please enter a valid e-mail address'
				}]
			},
			subject: { identifier: 'subject',
				rules: [{
					type: 'empty',
					prompt: 'Please fill in this field'
				}]
			},
			content: {
				identifier: 'content',
				rules: [{
					type: 'empty',
					prompt: 'Please enter a message'
				}]
			}

		}
	});

	//Direct link to modal
	if (window.location.hash === "#contact") {
		$('#contact-modal').modal('show');
	}

	$('#contact').click(function (e) {
		$('.contactForm').each(function () {
			$(this).val('');
		});
		$('#contact-modal').modal('show');
	});

	//submission form goes to AJAX route
	$('#contact-form').on('submit', function (e) {
		e.preventDefault();
		if ($('#contact-form').form('validate form')) {
			console.log('sup');
			var params = {
				content: $('#content').val(),
				from: $('#from').val(),
				fromEmail: $('#fromEmail').val(),
				subject: $('#subject').val()
			};

			$.ajax({
				method: "POST",
				url: '/mail',
				data: params
			});
			window.location.hash = "";
			$('#contact-modal').modal('hide');
		}
	});

	function slideChange(slideOut, slideIn) {
		$('#' + slideOut).fadeOut('slow'); //sets outgoing slide to fade out
		$('#' + slideIn).fadeIn('slow'); //sets incoming slide to fade in
	}

	//DRY Set
	function slideShow() {
		//creates a series of three second intervals, staggered with slide changes
		var firstSlide = setTimeout(function () {
			slideChange('one', 'two');
		}, 3000);

		var secondSlide = setTimeout(function () {
			slideChange('two', 'three');
		}, 6000);

		var thirdSlide = setTimeout(function () {
			slideChange('three', 'four');
		}, 9000);

		var fourthSlide = setTimeout(function () {
			slideChange('four', 'five');
		}, 12000);

		var fifthSlide = setTimeout(function () {
			slideChange('five', 'one');
		}, 15000);
	}
	//initial set
	slideShow();
	//Repeating Set
	var slides = setInterval(function () {

		slideShow();
	}, 15000);
});
