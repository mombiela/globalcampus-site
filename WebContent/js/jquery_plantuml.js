$(document).ready(function(){
   plantuml_runonce();
});

function plantuml_runonce() {
	$("img").each(function () {
		  var u1 = $(this).attr("src");
  		  if (u1!=null) return;
  		  var u2 = $(this).attr("uml");
  		  
	        // Codifica el texto del diagrama
    	    const encodedUml = plantumlEncoder.encode(u2);

        	// Genera la URL de la imagen del diagrama
        	const diagramUrl = `http://www.plantuml.com/plantuml/svg/${encodedUml}`;
        	
        	$(this).attr("src", diagramUrl);
	});
}
