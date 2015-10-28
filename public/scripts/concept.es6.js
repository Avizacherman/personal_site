function checkAvailability(date, availability){
	var available = false

	for(var range in availability){
					if(date > new Date(availability[range][0]) && date < new Date(availability[range][1])){
						$('#availability').text('Yes').addClass('yes').removeClass('no')
						available = true
						break
					} 
				}
				if(!available) 
				{
					$('#availability').text('No').addClass('no').removeClass('yes')
				}
}

$(document).ready(()=>{
	$.get('/lineup')
		.done(data=>{
			$('#name').text(data.name)
			checkAvailability(new Date, data.availability)
			$('#check-date').on('click', ()=>{
				if($('#date').val() != ""){
					var date = new Date($('#date').val())
					checkAvailability(date, data.availability)
				}
			})
		})
			

})