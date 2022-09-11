import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
		
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Catamaran|Didact+Gothic|Quattrocento+Sans|Work+Sans&display=swap" />
		<script type="text/javascript" strategy="defer" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"></script>
		<script type="text/x-mathjax-config" strategy="defer" dangerouslySetInnerHTML={{
			__html: `
			  MathJax.Hub.Config({
				//tex2jax: {
				//        // Enable $...$ as delimiter for inline math.
						//inlineMath: [ ["\\$", "\\$"], ["\\(", "\\)"] ],
						//displayMath: [ ["$$","$$"], ["\\[", "\\]"] ],
				//        inlineMath: [['$', '$'], ['\\(', '\\)']],
				//        //processEscapes: true
				//      },
				tex2jax: {
				  // Enable $...$ as delimiter for inline math.
				  //inlineMath: [['$', '$'], ['\\(', '\\)']],
				  inlineMath: [['$', '$']],
				  processEscapes: true
				},
				  TeX: {
					// Enable equation numbering.
					  equationNumbers: {
						autoNumber: 'AMS'
					},
					extensions: ["action.js", "autobold.js", "AMSmath.js", "AMSsymbols.js", "AMScd.js", "cancel.js", "mhchem.js", "mediawiki-texvc.js"],
				  },

				  // We typeset LaTeX ourselves with a MathJax.Hub.Queue call.
				  //skipStartupTypeset: true
			  })
			`
		}}></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}