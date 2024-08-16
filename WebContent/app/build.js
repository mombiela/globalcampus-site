import { NamespaceRetriever, STXTParser, getUrlContent } from '../js/stxt-parser.min.js';
import { transform } from './transform.js';
import { getDefaultValues } from './default.js';
import { getUrlFromHash, getHash } from './utils.js';

export async function buildContentFromHashUrl()
{
    const content = $("#content");
    content.empty();
	try
	{
	    const hash = getHash();
		let stxtUrl = getUrlFromHash(hash);
		let contentFromUrl = await getUrlContent(stxtUrl);
		await buildContent(contentFromUrl, stxtUrl);
	}
	catch(exception)
	{
		console.log("Error: " + exception);
		content.append($("<pre>").text("Page definition not valid: " + exception));
	}
}
export async function buildContentFromString(str)
{
    const content = $("#content");
    content.empty();
	try
	{
	    const hash = getHash();
		let stxtUrl = getUrlFromHash(hash);
		await buildContent(str, stxtUrl);
	}
	catch(exception)
	{
		console.log("Error: " + exception);
		content.append($("<pre>").text("Page definition not valid: " + exception));
	}
}

export async function buildContent(content, stxtUrl)
{
	let grammar = await getUrlContent("/namespace.stxt");
	
	// Final
    const namespaceRetriever = new NamespaceRetriever();
	await namespaceRetriever.addGrammarDefinition(grammar);
	
	const parser = new STXTParser(namespaceRetriever);
	const node = (await parser.parse(content))[0];
	
	// Make navigation
	const defaultValues = await getDefaultValues(getHash(), parser, node);

	// Transform page
	transform(node, defaultValues);
	plantuml_runonce();

	// Insertamos en fuente
	$("#link_source_code").attr("href", stxtUrl);
	
	// Insertamos editor
	let hash = getHash();
	$("#link_editor").attr("href", "/edit.html" + hash);

	// Fix de url's relatvias
	fixUrlsRelativas();
	
	// Mathjax
	window["mathReload"]();
}

function fixUrlsRelativas()
{
	$('a').each(function() {
        var href = $(this).attr('href');

        // Verifica si la URL no empieza por "http://", "https://", o "/"
        if (href 
        	&& !href.startsWith('http://') 
        	&& !href.startsWith('https://') 
        	&& !href.startsWith('mailto:') 
        	&& !href.startsWith('/') 
        	&& !href.startsWith('#') 
        	&& !href.startsWith('.')) 
        {
			
            // Obtener la URL actual
            var currentUrl = window.location.href;
            let i = currentUrl.lastIndexOf("/");
            if (i != -1)
            {
	            // Concatena la URL actual con el href relativo
	            var newUrl = currentUrl.substring(0,i+1) + href;
	
	            // Actualiza el atributo href con la nueva URL
	            $(this).attr('href', newUrl);
			}
        }
    });
}

