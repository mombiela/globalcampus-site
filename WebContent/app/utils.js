
const SAFE_URLS = ["https://semantictext.info","https://raw.githubusercontent.com/mombiela/","https://globalcampus.site","https://github.com/mombiela/"];

export function esDominioValido(dominio) 
{
    // Expresión regular para verificar nombres de dominio v�lidos
    const regexDominio = /^([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,6}$/;
    return regexDominio.test(dominio);
}

export function getUrlFromHash(hashIni)
{
	// Validamos que empieze por "#"
	let hash = hashIni;
	if (!hash.startsWith("#")) throw new Error("Page not valid");
	hash = hash.substring(1);
	
	// Is dir?
	const isDir = hash.endsWith("/");
	if (isDir) hash = hash.substring(0, hash.length -1);
	
	// Miramos si es local o remota y que tenga params v�lidos
	const hashParts = hash.split("/");
	
	// Miramos tamaño máximo
	if (hashParts.length > 8) throw new Error("Page definition not valid");
	
	// Miramos partes
	let stxtUrl = hashParts[0];
	let startIndex = 1;
	if (esDominioValido(stxtUrl))
	{
		stxtUrl = "https://" + stxtUrl;	
	}
	else if (hashParts.length >=3 && hashParts[0]=="github")
	{
		stxtUrl = "https://raw.githubusercontent.com/" + hashParts[1] + "/" + hashParts[2] + "/master";
		startIndex = 3;
	}
	else if (esNombrePaginaValido(stxtUrl))
	{
		stxtUrl = obtenerBaseURL() + "/" + stxtUrl;	
	}
	else
	{
		 throw new Error("Page definition not valid");			
	}
	
	// Miramos otras partes
	for (let i = startIndex; i<hashParts.length; i++)
	{
		if (hashParts[i].length == 0) throw new Exception();
		stxtUrl = stxtUrl + "/" + hashParts[i]; 
	}
	
	// Miramos final
	if (isDir)	stxtUrl += "/index.stxt";
	else     	stxtUrl += ".stxt";
	
	// Obtenemos content
	//console.log("URL = " + stxtUrl);
	return stxtUrl;
}

export function getHash()
{
	let hash = window.location.hash || "#index";
	if (hash.endsWith("/")) hash = hash + "index";
	//console.log("HASH = " + hash);
	return hash;
}

function obtenerBaseURL() {
    const url = window.location;
    return `${url.protocol}//${url.host}`;
}

function esNombrePaginaValido(pagina) 
{
    // Expresión regular para verificar p�gina v�lida
    const regexDominio = /^[a-zA-Z0-9-_]+$/;
    return regexDominio.test(pagina);
}

export function purify(rawHtml)
{
	// Configurar DOMPurify de manera restrictiva
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
    	USE_PROFILES: {html: true},
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre'],
        ALLOWED_ATTR: ['href', 'title'],
        FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'button', 'select', 'option'],
        FORBID_ATTR: ['style', 'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus']
    });
    return cleanHtml;      	
}

export function purifySimple(rawHtml)
{
	// Configurar DOMPurify de manera restrictiva
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
    	USE_PROFILES: {html: true},
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
        ALLOWED_ATTR: ['href', 'title'],
        FORBID_TAGS: ['p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'pre', 'style', 'script', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'button', 'select', 'option'],
        FORBID_ATTR: ['style', 'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus']
    });
    return cleanHtml;      	
}

export function mixUrlAndHash(href, text)
{
	try
	{
		if (!href || href=="") return href;
		
		if (href.startsWith('mailto:') || href.startsWith('#') || href.startsWith("/")) return href;
		
		if (href.startsWith('http://') || href.startsWith('https://'))
		{
			for (let i = 0; i<SAFE_URLS.length; i++)
			{
				if (href.startsWith(SAFE_URLS[i])) return href;
			}
			
			return "/redirect?url=" + encodeURIComponent(href) + "&descrip=" + encodeURIComponent(text); // ENCODE OK con advertencia
		} 
	
		let hash = getHash();
		hash = hash.substring(1);
		
		let hashParts = hash.split("/");
		hashParts.pop();
		
		let hrefParts = href.split("/");
		
		for (let i = 0; i<hrefParts.length; i++)
		{
			let part = hrefParts[i];
			if (part == "..") hashParts.pop();
			else if (part ==".") continue;
			else hashParts.push(part);
		}
		
		return "#" + hashParts.join('/');
	}
	catch (e)
	{
		console.log("Error href: ", e);
		return "#index"
	}	
	

    return href;
} 
