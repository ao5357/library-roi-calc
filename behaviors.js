(function($){
$.fn.calcROI = function(){  
	return this.each(function(){
		var $this = $(this);
		var roiTotal = 0; // Grand total
		$this.find("tbody tr").each(function(i){
			var obj = $(this);
			var outVal = 0; // Row total
			var firstInput = obj.find("td:first input");
			if(firstInput.attr("type") == "number" || firstInput.attr("type") == "text"){
				var inVal = new String(firstInput.val());
				inVal = inVal.replace(/[^0-9]/g,''); // remove non-numeric characters before evaluating
				if(inVal !== ''){
					var outVal = eval(inVal + firstInput.attr("data-roi-formula"));
					}
				}
			else if(firstInput.attr("type") == "checkbox"){
				if(firstInput.filter("input:checked").length == 1){
					var outVal = eval(1 + firstInput.attr("data-roi-formula"));
					}
				}
			// Further else ifs for validation based on other input types can go here
			outVal = parseFloat(outVal).toFixed(2);
			obj.find("td:last input").val(outVal);
			roiTotal += parseFloat(outVal);
			});
		$this.find("input[disabled]:last").val(roiTotal.toFixed(2));
		});
	};
})(jQuery);

$(document).ready(function(){
$("#calculator tbody tr").find("td:eq(1) label").each(function(){
	var label = $(this);
	if(label.siblings("p.roi-explanation").length == 1){
		label.addClass('helptext').click(function(e){ // Toggle help text
			var helptext = label.siblings("p.roi-explanation");
			if(helptext.css("display") == "none"){
				helptext.show("slow");
				}
			else{
				helptext.hide("slow");
				}
			var labelFor = label.attr("for");
			$("#" + labelFor).focus().select();
			e.preventDefault();
			}).attr("title","Click to toggle explanatory text");
		}
	else{
		label.css({'padding-left':'19px'});
		}
	});
$(".calculator").submit(function(){ // calculate when someone hits 'Enter' and make sure the form doesn't actually submit
	$(this).calcROI();
	return false;
	});
$(".calculator").on("change keyup","input",function(e){
	$(this).parents(".calculator").calcROI();
	});
$(".calculator").calcROI(); // Calculate on page load just in case
});