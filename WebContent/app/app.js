import { getUrlContent } from '../js/Utils.js';
import { STXTParser } from '../js/STXTParser.js';
import { NamespaceRetriever } from '../js/NamespaceRetriever.js';
import { transform } from './transform.js';
import { makeNavigation } from './navigation.js';
import { esDominioValido, getUrlFromHash } from './utils.js';

document.addEventListener("DOMContentLoaded", ContentLoaded);

let grammar1 = `Namespace: www.cursos.com/tema.stxt
	Tema:
		h1: (?)
		h2: (*)
		h3: (*)
		text: (*) TEXT
		code: (*) TEXT
		plantuml: (*) TEXT
		assert: (*) TEXT
		alert: (*) TEXT`;
		
let grammar2 = `Namespace: www.cursos.com/index.stxt
	Index:
		title: (1)
		part: (+)
			tema: (+)`;

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
		const isDir = hash.endsWith("/");
		
		// Obtenemos content
		let stxtUrl = getUrlFromHash(hash);
		let contentFromUrl = await getUrlContent(stxtUrl + "?ts=" + new Date().getTime());
		
		// Final
	    const namespaceRetriever = new NamespaceRetriever();
		await namespaceRetriever.addGrammarDefinition(grammar1);
		await namespaceRetriever.addGrammarDefinition(grammar2);
		const parser = new STXTParser(namespaceRetriever);
		const node = (await parser.parse(contentFromUrl))[0];
		
		// Make navigation
		const navigation = await makeNavigation(isDir, hash, parser);

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

