import { mainConent } from './template.js';
import { LineSplitter } from '../js/stxt-parser.min.js';
import { purify, purifySimple, mixUrlAndHash, getHash } from './utils.js';
import {publi, publi_es} from './template.js';

const SAFE_HTML = ["#github/mombiela/", "#semantictext.info/"];

export function transform(node, defaultValues) 
{
    const content = $("#content");

	// Primera parte del contenido	
	content.append(mainConent);
	
	// Inner Content
	const innerContent = $("#inner_content");
	
	// Insertamos nombre
	$("<h1 class='title'>").text(node.getText()).appendTo(innerContent);

	// Insertamos childs
	const childs = node.getChilds();
	for(let i = 0; i<childs.length; i++)
	{
		let child = childs[i];
		renderChild(child, innerContent);
	}
	
	// Insertamos default values
	insertDefaultValues(defaultValues);
}

function renderChild(child, parent)
{
	const name = child.getName();
	const text = child.getText();
	const childs = child.getChilds();
	
	if(name == "header")
	{
		$("<h1>").text(text).appendTo(parent);
	}
	else if(name == "subheader")
	{
		$("<h2>").text(text).appendTo(parent);
	}
	else if(name == "content")
	{
		$("<div>").html(purify(marked.parse(text))).appendTo(parent);
	}
	else if(name == "math")
	{
		$("<div class='math'>").text(text).appendTo(parent);
	}
	else if(name == "alert")
	{
		$("<div class='alerta'>").html(purify(marked.parse(text))).appendTo(parent);
	}
	else if(name == "assert")
	{
		$("<div class='assert'>").html(purify(marked.parse(text))).appendTo(parent);
	}
	else if(name == "preamble")
	{
		$("<div class='preamble'>").html(purify(marked.parse(text))).appendTo(parent);
	}
	else if(name == "code")
	{
		makeCode(text, parent);
	}
	else if(name == "plantuml")
	{
		$("<img>").attr("uml", text).appendTo(parent);
	}
	else if (name == "section")
	{
		$("<h1>").text(text).appendTo(parent);
		
		// Childs
		let ul = $("<ul>").appendTo(parent);
		for(let i = 0; i<childs.length; i++)
		{
			let ch = renderTema(childs[i]);
			ch.appendTo(ul);
		}		
	}
	else if(name == "menu" || name=="title" || name == "metadata" || name == "navigation" || name == "default")
	{
		// No hacemos nada
	}
	else if(name=="html" && isSafeHtml())
	{
		$(text).appendTo(parent);
	}
	else
	{
		$("<pre>").text(child.toString()).appendTo(parent);
	}
}

function isSafeHtml()
{
	const hash = getHash();
	let index = hash.indexOf("/");
	if (index == -1) return true;
	for (let i = 0; i<SAFE_HTML.length; i++)
	{
		if (hash.startsWith(SAFE_HTML[i])) return true;
	}
	return false;
}

function renderTema(child)
{
	let href = window.location.href;
	let i = href.lastIndexOf("/");
	href = href.substring(0,i+1);
	let text = child.getText();
	let lineSplitter = LineSplitter.split(text);
	let url = lineSplitter.prefix;
	let descrip = lineSplitter.centralText;
	let link = $("<a>").attr("href",href + url).text(descrip);
	let li = $("<li>").append(link);
	return li;
}

function makeCode(text, parent)
{
	/*
    String all = "<div style='position:relative'><a class='copy_button' href='#' onclick='navigator.clipboard.writeText(decodeURIComponent(escape(atob(\"" 
            + new String(Base64.encodeBase64(replaceWithEmpty(input).getBytes("UTF-8"))) + "\"))));alert(\"�Copiado!\");return false;'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\" class=\"icon-sm\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z\" clip-rule=\"evenodd\"></path></svg></a>";
    
    return all + "<pre class='code'>" + replaceWithStrong(StringEscapeUtils.escapeHtml4(input)) + "</pre></div>";
	*/
	
	let div = $("<div style='position:relative'>").appendTo(parent);
	let a   = $("<a class='copy_button' href='#'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\" class=\"icon-sm\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z\" clip-rule=\"evenodd\"></path></svg></a>")
				.appendTo(div).click(function(ev){
					ev.preventDefault();
					navigator.clipboard.writeText(replaceWithEmpty(text));
					alert("¡Copiado!");
					});
	let pre = $("<pre class='code'>").text(text).appendTo(div);
	let html = replaceWithStrong(pre.html());
	pre.html(html);
}

function replaceWithStrong(text) {
    if (text === null) return "";
    return text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong>$1</strong>");
}

function replaceWithEmpty(text) {
    if (text === null) return "";
    return text.replace(/\*\*\*(.*?)\*\*\*/g, "$1");
}

/* ********** */
/* Navegaci�n */
/* ********** */

function insertDefaultValues(defaultValues)
{
	// Next y prev
	if (defaultValues.next || defaultValues.prev)
	{
		const navDiv = $("<div class='row avigation'></div>").appendTo("#nav1");
		const prev = $("<div class='col-6'>").appendTo(navDiv);
		const next = $("<div class='col-6 text-end'>").appendTo(navDiv);

		if (defaultValues.prev)
		{
			let a = $("<a>").attr("href", defaultValues.prev.url).text(defaultValues.prev.descrip).appendTo(prev);	
			a.html("&#x25C4; " + a.html());
		}
		if (defaultValues.next)
		{
		 	let a = $("<a>").attr("href", defaultValues.next.url).text(defaultValues.next.descrip).appendTo(next); 	
			a.html(a.html() + " &#x25BA;");
		}
		
		navDiv.clone().appendTo("#nav2");
	}
	
	// Title, subtitle, footer
	if (defaultValues.title)	$("#main_title").text(defaultValues.title);
	else						$("#main_title").text("GlobalCampus.site");
	
	if (defaultValues.subtitle) $("#main_subtitle").html(purifySimple(marked.parse(defaultValues.subtitle)));
	else 						$("#main_subtitle").hide();
	
	if (defaultValues.footer) 	$("#main_footer").html(purify(marked.parse(defaultValues.footer)));
	else 						$("#main_footer").hide();
	
	if (defaultValues.leftMenu)	$("#left_menu").html(purifySimple(marked.parse(defaultValues.leftMenu)));
	else $("#left_menu").html("&nbsp;");
	
	if (defaultValues.rightMenu) $("#right_menu").html(purifySimple(marked.parse(defaultValues.rightMenu)));
	else $("#right_menu").html("&nbsp;");
	
	if (!defaultValues.displaySrc) $("#link_source_code").hide();
	if (!defaultValues.displayEdit) $("#link_editor").hide();
	
	if (defaultValues.lang && defaultValues.lang == "es") $("#div_publi").html(publi_es);
	else $("#div_publi").html(publi);
}

export function fixUrlsRelativas()
{
	$('a').each(function() {
        let href = $(this).attr('href');
        let text = $(this).text();
		let newUrl = mixUrlAndHash(href, text);
        $(this).attr('href', newUrl);
    });
}


