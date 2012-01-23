$(document).ready(function(){
/* Styling */
$("#totalResult").css({'color':'#000','text-align':'center'});

/* Functions */
function roicalculate(){
	var roiTotal = 0; // Grand total
	$("#calculator tbody tr").each(function(i){
		var outVal = 0; // Row total
		var obj = $(this);
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
	$("#totalResult").val(roiTotal.toFixed(2));
	}

/* Events */
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

$("#calculator").submit(function(){ // calculate when someone hits 'Enter' and make sure the form doesn't actually submit
	roicalculate();
	return false;
	});
$("input").change(function(){ // replace the onChange event attributes with bindings
	roicalculate();
	}).keyup(function(){ // use the keyup event to make the app more responsive
	roicalculate();
	});
roicalculate(); // Calculate on page load just in case
});