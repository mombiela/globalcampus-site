export const mainConent = `
	<div id="main_header" class="container-xxl">
		<div class="row">
			<div class="col-12 p-0">
				<h1 class="m-0 p-0" id="main_title"></h3>
			</div>
		</div>
		<div class="row">
			<div class="col-6 p-0">
				<h2><a href="/">GlobalCampus.site</a> & <a href="https://semantictext.info">SemanticText</a></h2>
			</div>
			<div class="col-6 text-end text-bottom">
				Nuestro Objetivo | Contactar | Condiciones 
			</div>
		</div>
	</div>
	<div class="container-xxl p-1 px-3" id="top_bar">
		<div class="row">
			<div class="col-10">
				<span class="p-0 m-0" id="hilo_ariadna">INDEX: DOC NAME!!</span>
			</div>
			<div class="col-2 text-end">
				<span class="p-0 m-0" id="source_page">
					<a id="link_editor" href="" title="Edit page local navigator">&#128221;</a>
					<a id="link_source_code" href="" target="_blank" title="Source STxT">&#128270;</a>
				</span>
			</div>
		</div>
	</div>
	<div class="container-xxl" id="main_content">
		<div class="row">
			<div class="col-12 col-lg-8">
				<div id="nav1" class="navigation"></div>
				<div id="inner_content"></div>
				<div id="nav2" class="navigation"></div>
			</div>
			<div class="col-12 col-lg-4 publi">
				<p>
					Aquí va la publicidad.<br>
					Aquí va la publicidad.<br>
					Aquí va la publicidad.<br>
					Aquí va la publicidad.<br>
					Aquí va la publicidad.<br>
				</p>
			</div>
		</div>
	</div>
	<div class="container-xxl mt-3" id="footer">
		<div class="row">
			<footer>
				<p>&copy; 2024 - Este obra está bajo una <a style="text-decoration:underline" rel="license" href="https://raw.githubusercontent.com/mombiela/semantic-web-builder/master/LICENSE">Licencia MIT</a>.</p>
			</footer>
		</div>
	</div>
`;

export const mainEditor = `
	<div id="editor_window" class="container-fluid">
		<div class="row">
			<div class="col-12 p-2">
				<textarea class="w-100" rows="20" id="editor_textarea"></textarea>
			</div>
		</div>
		<div class="row">
			<div class="col-3">
				<button>Refresh</button>
				<input type="checkbox"> <span style="color:white;">Auto</span>
			</div>
			<div class="col-5 text-center">
				<button>Copy Text</button>
				<button>Reset LOCAL</button>
			</div>
			<div class="col-4 text-end">
				<button>MIN</button>
				<button>MAX</button>
				<button>NORMAL</button>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
			</div>
		</div>
	</div>
`;

export const docTemplate = `Document (globalcampus.site/namespace.stxt): Insert a name

	Header:	This is a header
	Subheader: This is a subheader
	
	Content:
		This is a content, **wiki format!!**
`;




