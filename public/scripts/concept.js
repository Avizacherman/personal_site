'use strict';

function checkAvailability(date, availability) {
	var available = false;

	for (var range in availability) {
		if (date > new Date(availability[range][0]) && date < new Date(availability[range][1])) {
			$('#availability').text('Yes').addClass('yes').removeClass('no');
			available = true;
			break;
		}
	}
	if (!available) {
		$('#availability').text('No').addClass('no').removeClass('yes');
	}
}

$(document).ready(function () {
	$.get('/lineup').done(function (data) {
		console.log(data);
		$('#name').text(data.name);
		checkAvailability(new Date(), data.availability);
		$('#check-date').on('click', function () {
			if ($('#date').val() != "") {
				var date = new Date($('#date').val());
				checkAvailability(date, data.availability);
			}
		});
	});
});
//# sourceMappingURL=concept.es6.js.map

//# sourceMappingURL=concept.js.map