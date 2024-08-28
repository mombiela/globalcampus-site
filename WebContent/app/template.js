export const mainConent = `
	<div id="main_header" class="container-xxl">
		<div class="row">
			<div class="col-12 p-0">
				<h1 class="m-0 p-0" id="main_title"></h3>
			</div>
		</div>
		<div class="row">
			<div class="col-12 p-0">
				<h2 id="main_subtitle"></h2>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-end text-bottom" id="right_menu">
			</div>
		</div>
	</div>
	<div class="container-xxl p-1 px-3" id="top_bar">
		<div class="row">
			<div class="col-10">
				<span class="p-0 m-0" id="left_menu"></span>
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
			</div>
			<div class="col-12 col-lg-4 publi" id="div_publi">
			</div>
		</div>
	</div>
	<div class="container-xxl mt-3" id="footer">
		<div class="row">
			<footer id="main_footer"></footer>
		</div>
	</div>
`;

export const mainEditor = `
	<div id="editor_window" class="container-fluid">
		<div class="row">
			<div class="col-12 p-2">
				<textarea class="w-100" rows="25" id="editor_textarea"></textarea>
			</div>
		</div>
		<div class="row">
			<div class="col-3">
				<button id="btn_refresh">Refresh</button>
				<input type="checkbox" id="check_auto_refresh"> <span style="color:white;">Auto</span>
			</div>
			<div class="col-4 text-center">
				<button id="btn_copy_text">Copy Text</button>
				<button id="btn_reset_local">Reset LOCAL</button>
			</div>
			<div class="col-5 text-end">
				<button id="btn_min">MIN</button>
				<button id="btn_normal">NORMAL</button>
				<button id="btn_max">MAX</button>
				<button id="btn_close">CLOSE</button>
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

export const publi = `<h1>Advertisement</h1>
<p>This space is intended for advertising.</p>
<p>If you want to be one of our sponsors, <a href="#contact">contact us</a> and you can include links in this area.</p>
<p><strong>Thank you for collaborating!</strong></p>
<p>
	This portal was created thanks to the combination of two new technologies:
	<ul>
		<li><a href="https://semantictext.info">SemanticText</a>: Provides the core technology</li>
		<li><a href="https://globalcampus.site">GlobalCampus</a>: The first Meta Learning Portal</li>
	</ul>
</p>`

export const publi_es = `<h1>Publicidad</h1>
<p>Este espacio está destinado a publicidad.</p>
<p>Si quieres ser un patrocinador nuestro <a href="#contact">contacta con nosotros</a> y podrás incluir enlaces en esta zona.</p>
<p><strong>¡Gracias por colaborar!</strong></p>
<p>
	Esta portal está creado gracias a la unión de dos nuevas tecnologías:
	<ul>
		<li><a href="https://semantictext.info/es/">SemanticText</a>: Ofrece la tecnología base</li>
		<li><a href="https://globalcampus.site/#es/">GlobalCampus</a>: Primer Meta Portal de Aprendizaje</li>
	</ul>
</p>`

export const docError = `
<style type="text/css">
	body {text-align: center;}
	h1, h2 {font-size: 4em; font-family: monospace; color: rgb(57, 55, 163); margin: 0;}
	h2 {font-size: 2.5em;}
	p {margin-top: 1.5em;}
	a {
		color: rgb(255, 75, 156);
		font-size: 1.5em;
		text-decoration:underline;
	}
</style>
	<h1>500</h1>
	<h2 id="error_text"></h2>
	<p><a href="/">Click here to continue</a></p>
`
