import { NamespaceRetriever, STXTParser, getUrlContent } from '../js/stxt-parser.min.js';
import { transform, fixUrlsRelativas } from './transform.js';
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

