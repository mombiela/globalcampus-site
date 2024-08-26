import { getUrlContent } from '../js/stxt-parser.min.js';
import { getUrlFromHash } from './utils.js';

const DEFAULT_DOC = "_default";

export async function getDefaultValues(hash, parser, mainNode) 
{
	let result = {};
	try
	{
		const defaultNode = await getDefaultNode(hash, parser);
		const customDefault = mainNode.getChild("default");
		
		// -----------------------
		// Title, subtitle, footer
		// -----------------------
		
		addProperty(result, defaultNode, "title", "title");
		addProperty(result, customDefault, "title", "title");

		addProperty(result, defaultNode, "subtitle", "subtitle");
		addProperty(result, customDefault, "subtitle", "subtitle");

		addProperty(result, defaultNode, "footer", "footer");
		addProperty(result, customDefault, "footer", "footer");

		addProperty(result, defaultNode, "leftMenu", "left menu");
		addProperty(result, customDefault, "leftMenu", "left menu");

		addProperty(result, defaultNode, "rightMenu", "right menu");
		addProperty(result, customDefault, "rightMenu", "right menu");
		
		addProperty(result, defaultNode, "displaySrc", "display src");
		addProperty(result, customDefault, "displaySrc", "display src");
		
		addProperty(result, defaultNode, "displayEdit", "display edit");
		addProperty(result, customDefault, "displayEdit", "display edit");
		
		addProperty(result, defaultNode, "lang", "lang");
		addProperty(result, customDefault, "lang", "lang");

		result.displaySrc = result.displaySrc == "true";
		result.displayEdit = result.displayEdit == "true";
		
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

function addProperty(result, node, resultProp, nodeProp)
{
	if (!node) return;
	let  value = node.getChild(nodeProp);
	if (value) result[resultProp] = value.getText();
}

async function getDefaultNode(hash, parser)
{
	let i = hash.lastIndexOf("/");
	let hashIndex = hash.substring(0, i) + "/" + DEFAULT_DOC;
	let last = hash.substring(0,i+1);
	if (hash.endsWith("/"))
	{
	 	hashIndex = hash + DEFAULT_DOC;
	 	currentDoc = last;	
	}
	
	if (i == -1) hashIndex = "#" + DEFAULT_DOC; // Hack para página incicial

	let hashIndexUrl = getUrlFromHash(hashIndex);

	let indexDoc = await getUrlContent(hashIndexUrl);
	const indexNode = (await parser.parse(indexDoc))[0];
	return indexNode;
}