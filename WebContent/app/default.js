import { getUrlContent } from '../js/stxt-parser.min.js';
import { getUrlFromHash } from './utils.js';

const DEFAULT_DOC = "_default";

export async function getDefaultValues(hash, parser, mainNode) 
{
	let result = {};
	try
	{
		const indexNode = await getDefaultNode(hash, parser);

		// -----------------------
		// Title, subtitle, footer
		// -----------------------
		
		let title = indexNode.getChild("title");
		if (title)	result['title'] = title.getText();
		
		let  subtitle = indexNode.getChild("subtitle");
		if (subtitle) result['subtitle'] = subtitle.getText();
		
		let footer =  indexNode.getChild("footer");
		if (footer) result['footer'] = footer.getText();
		
		let leftMenu = indexNode.getChild("left menu");
		if (leftMenu) result['leftMenu']  = leftMenu.getText();
		
		let rightMenu = indexNode.getChild("right menu");
		if (rightMenu) result['rightMenu'] = rightMenu.getText();
		
		let displaySrc = indexNode.getChild("display src");
		if (!displaySrc || displaySrc.getText() == "true") result.displaySrc = true;
		
		let displayEdit = indexNode.getChild("display edit");
		if (!displayEdit || displayEdit.getText() == "true") result.displayEdit = true;
		
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