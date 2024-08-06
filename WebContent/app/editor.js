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
	
	
}
