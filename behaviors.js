/* Library ROI Calculator [ https://github.com/ao5357/library-roi-calc ] is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License [ http://creativecommons.org/licenses/by-sa/3.0/ ] */
(function($){$.fn.calcROI = function(){ // requires rather specific conditions
	return this.each(function(){
		var $this = $(this), totalROI = 0;
		$this.find("tbody tr").each(function(i){
			var row = $(this), inVal = 0, outVal = 0;
			var input = row.find("input");
			if(input.attr("type") == "number" || input.attr("type") == "text"){
				inVal = new String(input.val()).replace(/[^0-9\.]/g,''); // remove non-numeric characters before evaluating
				inVal = (inVal.length >= 1) ? inVal : 0;
				}
			else if(input.attr("type") == "checkbox" && input.filter("input:checked").length == 1){
				inVal = 1;
				} // validate other input types in subsequent else ifs
			var formula = (input.attr("data-roi-formula")) ? input.attr("data-roi-formula") : '';
			outVal = eval(inVal + formula);
			outVal = parseFloat(outVal).toFixed(2);
			row.find("output").text("$" + outVal);
			totalROI += parseFloat(outVal);
			});
		$this.find("tfoot output").text("$" + totalROI.toFixed(2));
		});
};})(jQuery);

document.createElement("output"); // shiv for IE8-; Before jQ traverses the DOM
$(document).ready(function(){ // bind events
$(".calculator")
	.calcROI()
	.submit(function(){$(this).calcROI();return false;})
	.on("change keyup input","input",function(e){$(this).parents(".calculator").calcROI();})
	.find("tbody tr").find("label").each(function(){
		var label = $(this), formulaExplanation = label.siblings(".formula-explanation");
		if(formulaExplanation.length >= 1){
			formulaExplanation.hide();
			label.addClass('helptext').attr("title","Click to toggle explanatory text").click(function(e){
				formulaExplanation.slideToggle("slow");
				$("#" + label.attr("for")).focus().select();
				e.preventDefault();
				});
			}
		});
});