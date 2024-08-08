import { mainEditor, docTemplate } from './template.js';
import { getUrlFromHash, getHash } from './utils.js';
import { getUrlContent } from '../js/stxt-parser.min.js';
import { buildContentFromString } from './build.js';

document.addEventListener("DOMContentLoaded", ContentLoaded);

let lastVal = "";
const DISABLE_AUTOREFRESH = "DISABLE_AUTOREFRESH";

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
    await initEditor();
}

async function initEditor()
{
	$("#editor").html(mainEditor);
	
	let contentText = docTemplate; // Template
	
   	const hash = getHash();
	let stxtUrl = getUrlFromHash(hash);
	try
	{
		contentText = await getUrlContent(stxtUrl);
	}
	catch(e)
	{
		console.log("Error loading content from: " + stxtUrl);		
	}
	
	let localContent = localStorage.getItem(hash);
	if (localContent && localContent.length>0) contentText = localContent; 

	updateContent(contentText);
	$("#editor_textarea").val(contentText);
    $("#editor_textarea").keydown(keyDownText);
    $("#editor_textarea").on('click keyup', keyUpText);    
    
	$("#btn_refresh").click(makeRefresh);
	$("#btn_copy_text").click(makeCopyText);
	$("#btn_reset_local").click(makeResetLocal);
	$("#btn_min").click(makeMin);
	$("#btn_max").click(makeMax);
	$("#btn_normal").click(makeNormal).hide();
	$("#btn_close").click(makeClose);
	
	// Auto Refresh storage
	if(!localStorage.getItem(DISABLE_AUTOREFRESH)) $("#check_auto_refresh").attr("checked","true");
	$("#check_auto_refresh").click(updateAutoRefreshStorage);
	
}

async function updateContent(value)
{
	if (!value) value = $("#editor_textarea").val();
	
	if (lastVal != value)
	{
		lastVal = value;
		updateLocalStorage(value);
    	await buildContentFromString(value);
    	
		$("#link_editor").remove();
		$("#link_source_code").remove();
    }
}

function updateLocalStorage(value)
{
	const hash = getHash();
	localStorage.setItem(hash, value);
}

async function keyUpText(e) 
{
	if(!$('#check_auto_refresh').is(':checked')) return;
	
    if (e.type === 'click' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Home' || e.key === 'End') 
    {
		updateContent($(this).val());
    }
}

function keyDownText(e)
{
    if (e.key === 'Tab') {
        e.preventDefault();
        
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // Set the value of the textarea to: text before caret + tab + text after caret
        $(this).val($(this).val().substring(0, start) + "\t" + $(this).val().substring(end));

        // Put the caret at the right position again (after the tab)
        this.selectionStart = this.selectionEnd = start + 1;
    } else if (e.key === 'Enter') {
        e.preventDefault();

        var start = this.selectionStart;
        var end = this.selectionEnd;

        // Get the current value of the textarea
        var value = $(this).val();

        // Get the start of the current line
        var lineStart = value.lastIndexOf('\n', start - 1) + 1;
        
        // Get the text of the current line
        var currentLine = value.substring(lineStart, start);
        
        // Match leading tabs/spaces
        var leadingWhitespace = currentLine.match(/^[\t ]*/)[0];

        // Set the value of the textarea to: text before caret + newline + leading whitespace + text after caret
        var newValue = value.substring(0, start) + "\n" + leadingWhitespace + value.substring(end);

        $(this).val(newValue);

        // Put the caret at the right position again (after the newline and leading whitespace)
        this.selectionStart = this.selectionEnd = start + 1 + leadingWhitespace.length;
    }
}

// -------------
// Buttons click
// -------------

function makeRefresh (){
	updateContent();
}

function makeCopyText (){
	navigator.clipboard.writeText($("#editor_textarea").val());
	alert("Copied!");
}

function makeResetLocal (){
	const hash = getHash();
	if (confirm("Reset local values?"))
	{
		localStorage.removeItem(hash);		
		window.location.href = "/" + hash;
	}
}

function makeMin (){
	$("#editor").addClass("min").removeClass("max");
	$("#btn_min").hide();
	$("#btn_max").show();
	$("#btn_normal").show();
	
}

function makeMax (){
	$("#editor").addClass("max").removeClass("min");
	$("#btn_min").show();
	$("#btn_max").hide();
	$("#btn_normal").show();
}

function makeNormal (){
	$("#editor").removeClass("max").removeClass("min");
	$("#btn_min").show();
	$("#btn_max").show();
	$("#btn_normal").hide();
}

function makeClose () {
	updateContent();
	const hash = getHash();
	window.location.href = "/" + hash;
}

function updateAutoRefreshStorage() {
	if(!$('#check_auto_refresh').is(':checked'))
	{
		localStorage.setItem(DISABLE_AUTOREFRESH, "true");
	}
	else
	{
		localStorage.removeItem(DISABLE_AUTOREFRESH);
	}
}




