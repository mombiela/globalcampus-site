$(function() {
    initAll();
});


function initAll()
{
	console.log("Document ready!");
	
	const url = new URL(window.location.href);
	const params = new URLSearchParams(url.search);

	const paramUrl = params.get('url');
	const descripUrl = params.get('descrip');	
	
	console.log("paramUrl   = " + paramUrl);
	console.log("descripUrl = " + descripUrl);
	
	$("#url_redirect").attr("href", paramUrl).text(descripUrl);
}
