$(document).ready(function() {
	
	//preload animated GIFs
	var $ticTac = $('<img>').attr('src', 'img/tictactoe.gif').attr('id', 'ticTacImg')
	var $wiki = $('<img>').attr('src', 'img/wiki.gif').attr('id', 'wikiImg')
	var $jizo = $('<img>').attr('src', 'img/jizo.gif').attr('id', 'jizoImg')

	var $holder = $('#image-holder')
	

	$('.projectList').each(function(){
		$(this).on('mouseout', function(){
			$holder.hide()
		})
	})

	$('#ticTacToe').mouseover(function(e){
		e.stopPropagation()
		$holder.show()
		$holder.children().first().remove()
		$holder.append($ticTac)
	})

	$('#wiki').mouseover(function(e){
		e.stopPropagation()
		$holder.children().first().remove()
		$holder.show()
		$holder.append($wiki)
	})

		$('#jizo').mouseover(function(e){
		e.stopPropagation()
		$holder.show()
		$holder.children().first().remove()
		$holder.append($jizo)
	})

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

	//Direct link to modal
	if (window.location.hash === "#contact") {
		$('#contact-modal').modal('show');
	}

	$('#contact').click(function(e) {
		$('.contactForm').each(function() {
			$(this).val('');
		});
		$('#contact-modal').modal('show');
	})

	//submission form goes to AJAX route
	$('#contact-form').on('submit', function(e){
		e.preventDefault()
		if ($('#contact-form').form('validate form')){
				console.log('sup')
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
		window.location.hash = ""
		$('#contact-modal').modal('hide')

	}
	})

});