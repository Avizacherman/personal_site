//The purpose of this file is to provide a level of functionality to my personal website. The code is intentionally not DRY, but rather written as simple as possible. 

$(document).ready(function() {
	
	//preload animated GIFs
	var $ticTac = $('<img>').attr('src', 'img/tictactoe.gif').attr('id', 'ticTacImg');
	var $wiki = $('<img>').attr('src', 'img/wiki.gif').attr('id', 'wikiImg');
	var $jizo = $('<img>').attr('src', 'img/jizo.gif').attr('id', 'jizoImg');

	var $holder = $('#image-holder');


//Animated Gif Rotator
	var targetArray = [$ticTac, $wiki, $jizo];
	var itemArray = [$('#ticTacToe'), $('#wiki'), $('#jizo')];
	var itemIndex = 0;

	var projectRotation = setInterval(function(){
		$holder.show()
		$holder.html('')
		$holder.children().first().remove()
		$holder.append(targetArray[itemIndex])
		itemArray.forEach((item, index)=> {
			if(itemIndex === index){
				item.addClass('highlighted')
			} else {
				item.removeClass('highlighted')
			}

		})
		itemIndex++

		if(itemIndex === targetArray.length){
			itemIndex = 0
		}
	}, 3500);

	
//Click events for animated GIFs
	$('#ticTacToe').click(function(e){
		e.stopPropagation()
		$holder.show()
		$holder.html('')
		$holder.children().first().remove()
		$holder.append($ticTac)
	})

	$('#wiki').click(function(e){
		e.stopPropagation()
		$holder.children().first().remove()
		$holder.html('')
		$holder.show()
		$holder.append($wiki)
	})

		$('#jizo').click(function(e){
		e.stopPropagation()
		$holder.show()
		$holder.html('')
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


function slideChange(slideOut, slideIn){
	$('#' + slideOut).fadeOut('slow') 	//sets outgoing slide to fade out
	$('#' + slideIn).fadeIn('slow')  //sets incoming slide to fade in
}

//DRY Set
function slideShow(){  			//creates a series of three second intervals, staggered with slide changes
	var firstSlide = setTimeout(function(){
			slideChange('one', 'two') 
		}, 3000)

	var secondSlide = setTimeout(function(){
		slideChange('two', 'three')
		}, 6000);

	var thirdSlide = setTimeout(function(){
		slideChange('three', 'four')
		}, 9000);

	var fourthSlide = setTimeout(function(){
			slideChange('four', 'five')
		}, 12000)

	var fifthSlide = setTimeout(function(){
		slideChange('five', 'one')
		}, 15000);
	}
//initial set
slideShow()
//Repeating Set
var slides = setInterval(function(){
	
	slideShow()

}, 15000)

})