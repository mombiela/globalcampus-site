import { NamespaceRetriever, STXTParser, getUrlContent } from '../js/stxt-parser.min.js';
import { transform } from './transform.js';
import { makeNavigation } from './navigation.js';
import { getUrlFromHash } from './utils.js';

document.addEventListener("DOMContentLoaded", ContentLoaded);

async function ContentLoaded()
{
    // Escuchar los cambios en el hash de la URL
    window.addEventListener("hashchange", loadPage);

    // Cargar la página correcta al cargar la página inicial
    await loadPage();
} 

// Función para cargar la página correcta basada en el hash
async function loadPage() 
{
    await buildContentFromHash();
}

async function buildContentFromHash()
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
	const navigation = await makeNavigation(getHash(), parser, node);

	// Transform page
	transform(node, navigation);
	plantuml_runonce();
	
	// Insertamos en fuente
	$("#link_source_code").attr("href", stxtUrl);
	
	// Mathjax
	window["mathReload"]();
}

function getHash()
{
	let hash = window.location.hash || "#index";
	if (hash.endsWith("/")) hash = hash + "index";
	console.log("HASH = " + hash);
	return hash;
}


