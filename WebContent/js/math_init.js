MathJax = {
  loader: {load: ['input/tex', 'input/asciimath', 'output/chtml']},
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  },
  asciimath: {
    delimiters: [['`', '`']]
  }
};
function mathReload()
{
	try
	{
		console.log("Cargando math....");
		MathJax.typeset();
		console.log("Math OK");
	}
	catch (e)
	{
		console.log(e);
	}
}
