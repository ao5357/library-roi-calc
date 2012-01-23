ROI Calculator Package [rev 11/11/2010]
[as adapted by Brad Czerniak (czerniakb@cantonpl.org) of Canton Public Library (http://www.cantonpl.org/)]

Background
The calculator worksheet is a downloadable spreadsheet [http://www.maine.gov/msl/services/value.xls], originally provided by the Massachusetts Library Association. The spreadsheet was adapted for the web by Brian Herzog at Chelmsford Public Library [http://www.chelmsfordlibrary.org/library_info/calculator.html]. This version of the calculator was adapted from the Maine State Library [http://www.maine.gov/msl/services/customcal.htm].


Easy HTML Customization
In 'index.html', you will see table rows that look like:
	<tr>
		<td><input data-roi-formula="* 30" type="number" value="0" min="0" step="1" id="compclass" name="compclass" /></td>
		<td><label for="compclass">Computer Classes Attended</label>
			<p class="roi-explanation">This paragraph explains the associated formula.</p></td>
		<td><label for="compclassResult">$<input type="text" value="0.00" id="compclassResult" disabled="disabled" /></label></td>
	</tr>
In the first cell is an input. For the script to work properly, the input MUST have a data-roi-formula attribute with an evaluatable formula within. Formulas can be sophisticated JavaScript expressions if desired, but will usually just be "* DD" where DD is the number to multiply by. The asterisk indicates multiplication. Checkbox inputs evaluate the right side of the formula with a left side of 1.

The input's type can be number, text, or checkbox per the included script. For a checkbox, remove the value, min, and step attributes (see the first two rows of the example file). A number type input will display as a text input in browsers that have not yet implemented HTML5 inputs. In webkit and other fancy browsers, the experience is progressively-enhanced.

In the second table cell is a label. The label's 'for' attribute should match the first cell's input id attribute for accessibility purposes. The label describes the activity, resource, or service the patron consumed. Use clear language to describe it.

The second part of the second cell is a paragraph (classed "roi-explanation") for the section's help text. If you do not wish a particular section to have help text, just delete the entire paragraph, including opening and closing tags.

The last cell contains the result section. In the example, all results follow with a common-sense naming convention. This could help keep your implementation's markup clean and accessible.

You can add or subtract rows as much as you wish, as long as you keep the last (grand total) row. As long as your HTML follows the convention of the demo, everything should JUST WORK.

Please note that this version of the calculator uses HTML5 data attributes to store critical information. As such, your site should use the HTML5 doctype if validation is a concern.
	<!DOCTYPE html>


CSS Customization
Only some of the CSS in css/roicalc.css is strictly necessary:
	.helptext{background:transparent url('../images/help.png') 0 1px no-repeat;cursor:pointer;padding-left:19px;}
	.roi-explanation{background:#ddd;border:1px solid #ccc;display:none;margin:0 5px 10px 5px;padding:5px;}
Even these can be customized if so desired. All other styles can be inherited from site styles.


JavaScript Customization
In order to provide a speedy experience and minimize the download size of the calculator, the HTML file links to the the jQuery 1.4.3 minimized file hosted by Google. You may wish to self-host your own version of jQuery. The calculator has been tested down to jQuery 1.2.6 and should work for any version greater than that.

The calculator-specific jQuery is fairly small (approx. 60 lines including brackets and white space) and has comments to clarify stuff.

If you wish to validate input from input types besides those listed above, you can add further conditionals where commented. If you do, please let me know (czerniakb@cantonpl.org) and we'll add it to the ZIP release!