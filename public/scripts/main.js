$(document).ready(function() {
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
			subject: 
			{ identifier: 'subject',
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
	})
	if (window.location.hash === "#contact") {
		$('#contact-modal').modal('show');
	}

	$('#contact').click(function(e) {
		$('.contactForm').each(function() {
			$(this).val('');
		});
		$('#contact-modal').modal('show');
	})

	$('#contact-form').form('onSuccess', function() {


		var params = {
			content: $('#content').val(),
			from: $('#from').val(),
			fromEmail: $('#fromEmail').val(),
			subject: $('#subject').val()
		}

		$.ajax({
			method: "POST",
			url: '/mail',
			data: params
		})

		$('#contact-modal').modal('hide')

	});

});