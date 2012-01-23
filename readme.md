#Library ROI Calculator

##Background
The calculator worksheet [started as a downloadable spreadsheet](http://www.maine.gov/msl/services/value.xls), originally provided by the [Massachusetts Library Association](http://mla.memberlodge.org/). The spreadsheet was [adapted for the web by Brian Herzog at Chelmsford Public Library](http://www.chelmsfordlibrary.org/library_info/calculator.html). This version of the calculator was adapted from [Maine State Library](http://www.maine.gov/msl/services/customcal.htm) for [Canton Public Library](https://www.cantonpl.org/donate) by [Brad Czerniak](https://github.com/ao5357).

##License
Library ROI Calculator is licensed under <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">a Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.

##Easy HTML Customization
In index.html, you will see table rows that look like:

```	<tr>
		<td><input data-roi-formula="* 30" type="number" value="0" min="0" step="1" id="compclass" name="compclass" /></td>
		<td><label for="compclass">Computer Classes Attended</label>
			<p class="roi-explanation">This paragraph explains the associated formula.</p></td>
		<td><label for="compclassResult">$<input type="text" value="0.00" id="compclassResult" disabled="disabled" /></label></td>
	</tr>
```

In the first cell is an input. For the script to work properly, the input MUST have a data-roi-formula attribute with an evaluatable formula within. Formulas can be sophisticated JavaScript expressions if desired, but will usually just be "* DD" where DD is the number to multiply by. The asterisk indicates multiplication. Checkbox inputs evaluate the right side of the formula with a left side of 1.

The input's type can be number, text, or checkbox per the included script. For a checkbox, remove the value, min, and step attributes (see the first two rows of the example file). A number type input will display as a text input in browsers that have not yet implemented HTML5 inputs. In webkit and other fancy browsers, the experience is progressively-enhanced.

In the second table cell is a label. The label's 'for' attribute should match the first cell's input id attribute for accessibility purposes. The label describes the activity, resource, or service the patron consumed. Use clear language to describe it.

The second part of the second cell is a paragraph (classed "roi-explanation") for the section's help text. If you do not wish a particular section to have help text, just delete the entire paragraph, including opening and closing tags.

The last cell contains the result section. In the example, all results follow with a common-sense naming convention. This could help keep your implementation's markup clean and accessible.

You can add or subtract rows as much as you wish, as long as you keep the last (grand total) row. As long as your HTML follows the convention of the demo, everything should JUST WORK.

Please note that this version of the calculator uses HTML5 data attributes to store critical information. As such, your site should use the HTML5 doctype if validation is a concern.
	```<!DOCTYPE html>```

##CSS Customization
Only some of the CSS styles.css is strictly necessary, and is included in the second half of the file.

##JavaScript Customization
In order to provide a speedy experience and minimize the download size of the calculator, the HTML file links to the the most recent minimized jQuery 1 branch point release hosted by on Google's CDN. You may wish to self-host your own version of jQuery. The calculator now relies on jQuery 1.7 or greater, but only for the ```.on()``` method, so if you use a lower version of jQ you should be able to adapt the event to ```.bind()```.

The JavaScript uses a jQuery method for calculating totals, so any form on a page classed "calculator" with a semantically-correct table of the same basic structure as the provided example will work. You can even have multiple calculators per page! [Note: if you intend to load forms into the DOM after page load, you will have to augment the event bindings to bubble from a reasonable container selector]

##Accessibility
This form provides a11y features for various circumstances.

In the case of users with JavaScript disabled, a ```<noscript>``` tag provides some textual support. Likewise, the hidden help text is hidden using JavaScript, so those elements will appear if JS is turned off.

The HTML semantics likewise provide accessibility help. The results of calculations are put in ```<output>``` elements, though the WAI-ARIA liveregion state is not augmented at this time. Each row only has one input, so tab order does not require overrides.

A per-site accessibility improvement for non-JavaScript users is post-form processing on the server side. Since different server environments use different scripting languages, this (not required) step is left as an exercise to the kit user.