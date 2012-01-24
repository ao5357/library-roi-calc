/* Library ROI Calculator is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License [ http://creativecommons.org/licenses/by-sa/3.0/ ] */
(function($){
$.fn.calcROI = function(){ // requires rather specific conditions
	return this.each(function(){
		var $this = $(this);
		var roiTotal = 0; // Grand total
		$this.find("tbody tr").each(function(i){
			var obj = $(this);var inVal = 0;var outVal = 0;
			var input = obj.find("input");
			if(input.attr("type") == "number" || input.attr("type") == "text"){
				inVal = new String(input.val());
				inVal = inVal.replace(/[^0-9]/g,''); // remove non-numeric characters before evaluating
				inVal = (inVal.length >= 1) ? inVal : 0;
				}
			else if(input.attr("type") == "checkbox" && input.filter("input:checked").length == 1){
				inVal = 1;
				}
			// Further else ifs for validation based on other input types can go here
			var formula = (input.attr("data-roi-formula")) ? input.attr("data-roi-formula") : '';
			outVal = eval(inVal + formula);
			outVal = parseFloat(outVal).toFixed(2);
			obj.find("output").text("$" + outVal);
			roiTotal += parseFloat(outVal);
			});
		$this.find("tfoot output").text("$" + roiTotal.toFixed(2));
		});
	};
})(jQuery);

document.createElement("output"); // shiv for IE8-; Before jQ traverses the DOM
$(document).ready(function(){ // bind events
$(".calculator").calcROI().find("tbody tr").find("label").each(function(){
	var label = $(this);
	if(label.siblings(".roi-explanation").length >= 1){
		label.siblings(".roi-explanation").hide();
		label.addClass('helptext').attr("title","Click to toggle explanatory text").click(function(e){
			label.siblings(".roi-explanation").slideToggle("slow");
			$("#" + label.attr("for")).focus().select();
			e.preventDefault();
			});
		}
	});
$(".calculator").submit(function(){
	$(this).calcROI();
	return false;
	});
$(".calculator").on("change keyup input","input",function(e){
	$(this).parents(".calculator").calcROI();
	});
});