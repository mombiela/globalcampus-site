import { NamespaceRetriever, getUrlContent,STXTParser } from '../js/stxt-parser.min.js';
import { transform } from './transform.js';
import { makeNavigation } from './navigation.js';
import { esDominioValido, getUrlFromHash } from './utils.js';

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
    const hash = window.location.hash || "#index";
    await buildContent(hash);
}

async function buildContent(hash)
{
    const content = $("#content");
    content.empty();
	try
	{
		let ts = "?ts=" + new Date().getTime();
		let grammar1 = await getUrlContent("/menu.stxt" + ts);
		let grammar2 = await getUrlContent("/module.stxt" + ts);
		let grammar3 = await getUrlContent("/unit.stxt" + ts);
		
		// Obtenemos content
		if (hash.endsWith("/")) hash = hash + "index";
		console.log("HASH = " + hash);
		let stxtUrl = getUrlFromHash(hash);
		let contentFromUrl = await getUrlContent(stxtUrl + ts);
		
		// Final
	    const namespaceRetriever = new NamespaceRetriever();
		await namespaceRetriever.addGrammarDefinition(grammar1);
		await namespaceRetriever.addGrammarDefinition(grammar2);
		await namespaceRetriever.addGrammarDefinition(grammar3);
		
		const parser = new STXTParser(namespaceRetriever);
		const node = (await parser.parse(contentFromUrl))[0];
		
		// Make navigation
		const navigation = await makeNavigation(hash, parser);

		// Transform page
		transform(hash, node, navigation);
		plantuml_runonce();
		
		// Insertamos en fuente
		$("#link_source_code").attr("href", stxtUrl);
	}
	catch(exception)
	{
		console.log("Error: " + exception);
		content.append($("<pre>").text("Page definition not valid: " + exception));
	}
}

