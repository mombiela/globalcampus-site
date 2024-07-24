import { getUrlContent } from '../js/Utils.js';
import { LineSplitter } from '../js/LineSplitter.js';
import { getUrlFromHash } from './utils.js';

export async function makeNavigation(hash, parser) 
{
	let result = {};
	try
	{
		let i = hash.lastIndexOf("/");
		let currentDoc = hash.substring(i+1);
		let hashIndex = hash.substring(0, i) + "/index";
		let last = hash.substring(0,i+1);
		if (hash.endsWith("/"))
		{
		 	hashIndex = hash + "index"; // Índex!!
		 	currentDoc = last;	
		}
	
		console.log("CurrentDoc: " + currentDoc);
		console.log("hashIndex: " + hashIndex);
		let hashIndexUrl = getUrlFromHash(hashIndex);
		console.log("hashIndexUrl: " + hashIndexUrl);
	
		let indexDoc = await getUrlContent(hashIndexUrl + "?ts=" + new Date().getTime());
		//console.log("DOC!!!!!!!!!!!!! " + indexDoc);
		const indexNode = (await parser.parse(indexDoc))[0];
		console.log(indexNode.toString());
		
		let hashParts = hashIndex.split("/");
		console.log("HashParts: " + hashParts);
		
		// Hilo Ariadna
		let hiloAriadna = [{url: last, descrip: indexNode.getChild("title").getText()}];
		result["hilo_ariadna"] = hiloAriadna;
		
		// -----------
		// NEXT y PREV
		// -----------
		
		let allDocs = [];
		let parts = indexNode.getChildsByName("part");
		for (let i = 0; i<parts.length; i++)
		{
			let temas = parts[i].getChildsByName("tema");
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

export async function makeOldNavigation(hash, parser) {
	let result = {};
	let isDir = hash.endsWith("/");
	if (isDir) hash = hash.substring(0, hash.length - 1);
	
	console.log("hash: " + hash);
	let hashParts = hash.split("/");
	console.log("hashParts: " + hashParts);
	
	let indexDocs = [];
	if (hashParts.length >= 1)
	{
		let page = "";
		for (let i = 0; i<hashParts.length; i++)
		{
			try
			{
				page = page + "/" + hashParts[i];
				console.log("BUSCAR: " + page + "/index.stxt");
				let stxtUrl = getUrlFromHash(page + "/index.stxt");
				console.log("BUSCAR URL COMPLETA: " + stxtUrl);
				let indexDoc = await getUrlContent(stxtUrl + "?ts=" + new Date().getTime());
				
				//console.log(indexDoc);
				const node = (await parser.parse(indexDoc))[0];
				indexDocs.push(node);
			}
			catch (e)
			{
				console.log("ERROR PAGE: " + page + "\n" + e);
			}
		}
	}

	// Hilo Ariadna
	let hiloAriadna = [{url: "#", descrip: "Global Campus"}];
	
	let last = "#";
	for (let i = 0; i<indexDocs.length; i++)
	{
		let node = indexDocs[i];
		let nextElem = {};
		last = last + hashParts[i] + "/";
		nextElem.url = last;
		nextElem.descrip = node.getChild("title").getText();
		hiloAriadna.push(nextElem);
	}	
	
	result["hilo_ariadna"] = hiloAriadna;

	// Previous y next
	if (!isDir && indexDocs.length>=1)
	{
		let lastDoc = indexDocs[indexDocs.length-1];
		let allDocs = [];
		
		let parts = lastDoc.getChildsByName("part");
		for (let i = 0; i<parts.length; i++)
		{
			let temas = parts[i].getChildsByName("tema");
			for (let j = 0; j<temas.length; j++)
			{
				let tema = temas[j];
				allDocs.push(tema);
			}
		}
		
		//console.log("LAST DOC: \n" + lastDoc);
		let lastPart = hashParts[hashParts.length-1];
		console.log("LAST PART = " + lastPart);
		for (let i = 0; i<allDocs.length; i++)
		{
			let tema = allDocs[i];
			let temaUrl = LineSplitter.split(tema.getText()).prefix;
			if (temaUrl == lastPart)
			{
				console.log("TEMA! = " + tema + " -> " + last + lastPart);
				
				if (i == 0)
				{
					result.prev = {url:last, descrip: "INDEX"};
				}
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

	
	return result;
}