'use strict';

function checkAvailability(date, availability) {
	var available = false;

	for (var range in availability) {
		if (date > new Date(availability[range].begin) && date < new Date(availability[range].end)) {
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

//# sourceMappingURL=concept.js.map