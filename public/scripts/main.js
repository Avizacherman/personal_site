//The purpose of this file is to provide a level of functionality to my personal website. The code is intentionally not DRY, but rather written as simple as possible. 

$(document).ready(function() {
	
	//preload animated GIFs
	var $ticTac = $('<img>').attr('src', 'img/tictactoe.gif').attr('id', 'ticTacImg').addClass('detail-pic');
	var $wiki = $('<img>').attr('src', 'img/wiki.gif').attr('id', 'wikiImg').addClass('detail-pic');
	var $jizo = $('<img>').attr('src', 'img/jizo.gif').attr('id', 'jizoImg').addClass('detail-pic');
	var $phoodography = $('<img>').attr('src', 'img/phoodography.gif').attr('id', 'phoodographyImg').addClass('detail-pic')

	var beer = 'img/beer.png'
	var boardGames = 'img/boardgames.png'
	var cooking = 'img/cooking.png'
	var exploring = 'img/explore.png'
	var ramen = 'img/ramen.png'

	var $holder = $('#image-holder');
	var $linker = $('#linker');

//Animated Gif Rotator
	var targetArray = [$ticTac, $wiki, $jizo, $phoodography];
	var hobbyArray = [beer, boardGames, cooking, exploring, ramen]

	var linkArray = ["http://avizacherman.github.io", "http://104.131.4.248:1337", "https://jizomap.herokuapp.com", "https://phoodography.herokuapp.com"]

	var hobbyItemArray = [$('#beer'), $('#board-games'), $('#cooking'), $('#exploring'), $('#ramen')]	
	var projectItemArray = [$('#ticTacToe'), $('#wiki'), $('#jizo'), $('#phoodography')];
	

	var projectIndex = 1;
	var hobbyIndex = 1;

	var hobbyRotation = setInterval(() => {
		$('#hobby-image').attr('src', hobbyArray[hobbyIndex])
			
			hobbyItemArray.forEach((item, index)=> {
			
			if(hobbyIndex === index){
				item.addClass('highlighted')
			} else {
				item.removeClass('highlighted')
			}
		})

			hobbyIndex++

		if(hobbyIndex === hobbyArray.length){
			hobbyIndex = 0
		}

	}, 3500)

	var projectRotation = setInterval(function(){
		$holder.children().first().remove()

		$holder.append(targetArray[projectIndex])
		$linker.attr('href', linkArray[projectIndex]).text(linkArray[projectIndex])
		projectItemArray.forEach((item, index)=> {
			if(projectIndex === index){
				item.addClass('highlighted')
			} else {
				item.removeClass('highlighted')
			}

		})
		projectIndex++

		if(projectIndex === targetArray.length){
			projectIndex = 0
		}
	}, 3500);

	
//Click events for animated GIFs
	$('#ticTacToe').click(function(e){
		e.stopPropagation()
		$holder.children().first().remove()
		$holder.append($ticTac)
		$linker.attr('href', linkArray[0]).text(linkArray[0])
		$('#projects').children().removeClass('highlighted')
		$(this).addClass('highlighted')
		clearInterval(projectRotation)
	})

	$('#wiki').click(function(e){
		e.stopPropagation()
		$holder.children().first().remove()
		$holder.append($wiki)
		$linker.attr('href', linkArray[1]).text(linkArray[1])
		$('#projects').children().removeClass('highlighted')
		$(this).addClass('highlighted')		
		clearInterval(projectRotation)
	})

		$('#jizo').click(function(e){
		e.stopPropagation()
		$holder.children().first().remove()
		$holder.append($jizo)
		$linker.attr('href', linkArray[2]).text(linkArray[2])
		$('#projects').children().removeClass('highlighted')		
		$(this).addClass('highlighted')
		clearInterval(projectRotation)
	})

	$('#phoodography').click(function(e){
		e.stopPropagation()
		$holder.children().first().remove()
		$holder.append($phoodography)
		$linker.attr('href', linkArray[3]).text(linkArray[3])
		$('#projects').children().removeClass('highlighted')		
		$(this).addClass('highlighted')
		clearInterval(projectRotation)
	})	

	$('#beer').click(function(e){
		e.stopPropagation()
		$('#hobby-image').attr('src', hobbyArray[0])
		$('#hobbies').children().removeClass('highlighted')
		$(this).addClass('highlighted')
		clearInterval(hobbyRotation)
	})	

	$('#board-games').click(function(e){
		e.stopPropagation()
		$('#hobby-image').attr('src', hobbyArray[1])
		$('#hobbies').children().removeClass('highlighted')
		$(this).addClass('highlighted')
		clearInterval(hobbyRotation)
	})	

	$('#cooking').click(function(e){
		e.stopPropagation()
		$('#hobby-image').attr('src', hobbyArray[2])
		$('#hobbies').children().removeClass('highlighted')
		$(this).addClass('highlighted')
		clearInterval(hobbyRotation)
	})			

	$('#exploring').click(function(e){
		e.stopPropagation()
		$('#hobby-image').attr('src', hobbyArray[3])
		$('#hobbies').children().removeClass('highlighted')
		$(this).addClass('highlighted')
		clearInterval(hobbyRotation)
	})	

	$('#ramen').click(function(e){
		e.stopPropagation()
		$('#hobby-image').attr('src', hobbyArray[4])
		$('#hobbies').children().removeClass('highlighted')
		$(this).addClass('highlighted')
		clearInterval(hobbyRotation)
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