import { mainEditor } from './template.js';
import { getUrlFromHash, getHash } from './utils.js';
import { getUrlContent } from '../js/stxt-parser.min.js';

$(document).ready(function(){
	initEditor();
});


async function initEditor()
{
	$("#editor").html(mainEditor);
	
    const hash = getHash();
	let stxtUrl = getUrlFromHash(hash);
	let contentFromUrl = await getUrlContent(stxtUrl);

	$("#editor_textarea").val(contentFromUrl);

    $('#editor_textarea').keydown(function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
                    
	        var start = this.selectionStart;
    	    var end = this.selectionEnd;

            // Set the value of the textarea to: text before caret + tab + text after caret
            $(this).val($(this).val().substring(0, start) + "\t" + $(this).val().substring(end));

            // Put the caret at the right position again (after the tab)
            this.selectionStart = this.selectionEnd = start + 1;
        } else if (e.key === 'Enter') {
            e.preventDefault();

            var start = this.selectionStart;
            var end = this.selectionEnd;

            // Get the current value of the textarea
            var value = $(this).val();

            // Get the start of the current line
            var lineStart = value.lastIndexOf('\n', start - 1) + 1;
                    
            // Get the text of the current line
            var currentLine = value.substring(lineStart, start);
                    
            // Match leading tabs/spaces
            var leadingTabs = currentLine.match(/^\t*/)[0];

            // Set the value of the textarea to: text before caret + newline + leading tabs + text after caret
            var newValue = value.substring(0, start) + "\n" + leadingTabs + value.substring(end);

            $(this).val(newValue);

            // Put the caret at the right position again (after the newline and leading tabs)
            this.selectionStart = this.selectionEnd = start + 1 + leadingTabs.length;
        }
    });	
}

