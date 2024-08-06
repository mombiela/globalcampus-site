import { mainEditor } from './template.js';

$(document).ready(function(){
	initEditor();
});

function initEditor()
{
	$("#editor").html(mainEditor);
}
