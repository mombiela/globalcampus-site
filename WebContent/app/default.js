import { getUrlContent } from '../js/stxt-parser.min.js';
import { getUrlFromHash } from './utils.js';

const DEFAULT_DOC = "_default";

export async function getDefaultValues(hash, parser, mainNode) 
{
	let result = {};
	try
	{
		const indexNode = await getDefaultNode(hash, parser);

		// -----
		// Title
		// -----
		
		let title = indexNode.getChild("title").getText();
		if (title)	result['title'] = title;		
		
		// ------------
		// Hilo Ariadna
		// ------------
		
		let hiloAriadna = [];
		let menu = indexNode.getChild("left menu");
		if (menu != null)
		{
			let links = menu.getChildsByName("link");
			console.log("LINKS: " + links);
			for (let i = 0; i<links.length; i++)
			{
				let link = links[i];
				hiloAriadna.push({url: link.getTextSufix(), descrip: link.getTextCentral()});
			}
		}
		
		result["hilo_ariadna"] = hiloAriadna;
		
		// -----------
		// NEXT y PREV
		// -----------
		
		let navigation = mainNode.getChild("navigation");
		if (navigation)		
		{
			let prevNode = navigation.getChild("previous");
			let nextNode = navigation.getChild("next");
			
			if (prevNode)	result.prev = {url:prevNode.getTextSufix(), descrip: prevNode.getTextCentral()};
			if (nextNode)	result.next = {url:nextNode.getTextSufix(), descrip: nextNode.getTextCentral()};
		}
		
	}
	catch (e)
	{
		console.log(e);
	}
	return result;
}

async function getDefaultNode(hash, parser)
{
	console.log("**** NAVIGATION: " + hash);
	let i = hash.lastIndexOf("/");
	let currentDoc = hash.substring(i+1);
	let hashIndex = hash.substring(0, i) + "/" + DEFAULT_DOC;
	let last = hash.substring(0,i+1);
	if (hash.endsWith("/"))
	{
	 	hashIndex = hash + DEFAULT_DOC;
	 	currentDoc = last;	
	}
	
	if (i == -1) hashIndex = "#" + DEFAULT_DOC; // Hack para página incicial

	console.log("CurrentDoc: " + currentDoc);
	console.log("hashIndex: " + hashIndex);
	let hashIndexUrl = getUrlFromHash(hashIndex);
	console.log("hashIndexUrl: " + hashIndexUrl);

	let indexDoc = await getUrlContent(hashIndexUrl);
	const indexNode = (await parser.parse(indexDoc))[0];
	console.log(indexNode.toString());
	return indexNode;
}