$(document).ready(function() {

	if (window.location.hash === "#contact") {
		$('#contact-modal').modal('show');
	}

	$('#contact').click(function(e) {
		$('.contactForm').each(function() {
			$(this).val('');
		});
		$('#contact-modal').modal('show');
	})

	$('#contact-form').on('keyup keypress', function(e) {
		var code = e.keyCode || e.which;

		if (code == 13) {
			e.preventDefault();


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
		$('#contact-modal').modal('hide');	
		}

	});

	$('#submit').on('click', function() {
		if($('#contact-form').valid()){
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
		$('#contact-modal').modal('hide');
		}	

	});
});