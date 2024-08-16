export const mainConent = `
	<div id="main_header" class="container-xxl">
		<div class="row">
			<div class="col-12 p-0">
				<h1 class="m-0 p-0" id="main_title"></h3>
			</div>
		</div>
		<div class="row">
			<div class="col-6 p-0">
				<h2 id="main_subtitle"></h2>
			</div>
			<div class="col-6 text-end text-bottom">
				<a href="/#objective">Nuestros Objetivos</a> | 
				<a href="/#contact">Contactar</a> | 
				<a href="/#conditions">Condiciones</a> 
			</div>
		</div>
	</div>
	<div class="container-xxl p-1 px-3" id="top_bar">
		<div class="row">
			<div class="col-10">
				<span class="p-0 m-0" id="hilo_ariadna"></span>
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
			<div class="col-12 col-lg-4 publi">
				<p>Este espacio está destinado a publicidad.</p>
				<p>Si quieres ser un patrocinador nuestro <a href="#contact">contacta con nosotros</a> y podrás incluir enlaces en esta zona.</p>
				<p><strong>¡Gracias por colaborar!</strong></p>
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
				<textarea class="w-100" rows="20" id="editor_textarea"></textarea>
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

