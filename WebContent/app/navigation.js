import { LineSplitter, getUrlContent } from '../js/stxt-parser.min.js';
import { getUrlFromHash } from './utils.js';

export async function makeNavigation(hash, parser, mainNode) 
{
	let result = {};
	try
	{
		console.log("**** NAVIGATION: " + hash);
		let i = hash.lastIndexOf("/");
		let currentDoc = hash.substring(i+1);
		let hashIndex = hash.substring(0, i) + "/index";
		let last = hash.substring(0,i+1);
		if (hash.endsWith("/"))
		{
		 	hashIndex = hash + "index"; // Índex!!
		 	currentDoc = last;	
		}
		
		if (i == -1) hashIndex = "#index"; // Hack para página incicial
	
		console.log("CurrentDoc: " + currentDoc);
		console.log("hashIndex: " + hashIndex);
		let hashIndexUrl = getUrlFromHash(hashIndex);
		console.log("hashIndexUrl: " + hashIndexUrl);
	
		let indexDoc = await getUrlContent(hashIndexUrl);
		const indexNode = (await parser.parse(indexDoc))[0];
		console.log(indexNode.toString());
		
		let hashParts = hashIndex.split("/");
		console.log("HashParts: " + hashParts);

		// -----
		// Title
		// -----
		
		try
		{
			result['title'] = indexNode.getChild("title").getText();
		}
		catch(e)
		{
		}
		
		// ------------
		// Hilo Ariadna
		// ------------
		
		let hiloAriadna = [];
		try
		{
			let menu = mainNode.getChild("menu");
			if (menu == null) menu = indexNode.getChild("menu");
			if (menu != null)
			{
				let links = menu.getChildsByName("link");
				console.log("LINKS: " + links);
				for (let i = 0; i<links.length; i++)
				{
					let link = links[i];
					hiloAriadna.push({url: link.getTextPrefix(), descrip: link.getTextCentral()});
				}
			}
		}
		catch (e)
		{
			console.log(e);
		}
		
		result["hilo_ariadna"] = hiloAriadna;
		
		// -----------
		// NEXT y PREV
		// -----------
		
		let allDocs = [];
		let parts = indexNode.getChildsByName("section");
		for (let i = 0; i<parts.length; i++)
		{
			let temas = parts[i].getChildsByName("link");
			for (let j = 0; j<temas.length; j++)
			{
				let tema = temas[j];
				allDocs.push(tema);
			}
		}
		
		let lastPart = currentDoc;
		console.log("LAST PART = " + lastPart);
		for (let i = 0; i<allDocs.length; i++)
		{
			let tema = allDocs[i];
			let temaUrl = LineSplitter.split(tema.getText()).prefix;
			if (temaUrl == lastPart)
			{
				console.log("TEMA! = " + tema + " -> " + last + lastPart);

				if (i>0)
				{
					tema = allDocs[i-1];
					temaUrl = LineSplitter.split(tema.getText()).prefix;
					let temaDesc = LineSplitter.split(tema.getText()).centralText;
					result.prev = {url:last + temaUrl, descrip: temaDesc};
				}
				if (i<allDocs.length-1)
				{
					tema = allDocs[i+1];
					temaUrl = LineSplitter.split(tema.getText()).prefix;
					let temaDesc = LineSplitter.split(tema.getText()).centralText;
					result.next = {url:last + temaUrl, descrip: temaDesc};
				}
			}
		}				
		
	}
	catch (e)
	{
		console.log(e);
	}
	return result;
}

