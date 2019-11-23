 var $navRange = $('.js-range');

 $navRange.each(function () {
 	var min = parseInt($(this).data('minValue') || 0),
 		max = parseInt($(this).data('maxValue') || 400),
 		currentMin = parseInt($(this).data('currentMinValue') || 0),
 		currentMax = parseInt($(this).data('currentMaxValue') || 0),
 		$inputMin = $(this).find('.range-widget-min'),
 		$inputMax = $(this).find('.range-widget-max'),
 		$slider = $(this).find('.range-widget__slider');


 	if ($inputMin.length && $inputMax.length && $slider.length) {
 		var inputs = [$inputMin[0], $inputMax[0]],
 			keypressSlider = $slider[0];

 		noUiSlider.create(keypressSlider, {
 			start: [currentMin, currentMax],
 			connect: true,
 			direction: 'ltr',
 			range: {
 				'min': min,
 				'max': max
 			}
 		});

 		keypressSlider.noUiSlider.on('update', function (values, handle) {
 			inputs[handle].value = parseInt(values[handle]);
 		});
 	}

 });
