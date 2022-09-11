import Head from 'next/head'
// import Script from 'next/script'

// import dynamic from 'next/dynamic'
// const DynamicComponent = dynamic(() => import('../components/hello'))


function Page({ data }) {
  // Render data...

  return (
	<div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Catamaran|Didact+Gothic|Quattrocento+Sans|Work+Sans&display=swap" />
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"></script>

		<script type="text/x-mathjax-config" dangerouslySetInnerHTML={{__html: `
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
		  });
		`}} />
	  </Head>
	  
	  <style>{`
		body {
		  background: #223;
		}
		main {
		  font-family: 'Quattrocento Sans', sans-serif;
		  background: #fff;
		  /*margin: 1em auto;
		  max-width: 40em;
		  margin-left: auto;
		  margin-right: auto;*/
		  padding: 4em 5em;
		  margin: 50px auto;
		  box-shadow: .4em .4em .4em #222;
		  min-width: 42%;
		  width: 42%;
		  
		}
		h1, h2, h3, h4, h5, h6, h7 {
		  margin-top: 1.2em;
		  margin-bottom: 0.5em;
		}
		a:link, a:visited {
		  color: #03c;
		  text-decoration: none;
		}
		a:hover, a:active {
		  color: #03f;
		  text-decoration: underline;
		}
		img {
		  max-width: 100%;
		}
		blockquote {
		  border-left: medium solid #ccc;
		  margin-left: 0;
		  margin-right: 0;
		  padding: 0.5em;
		  background: #eee;
		}
		blockquote *:first-child {
		  margin-top: 0;
		}
		blockquote *:last-child {
		  margin-bottom: 0;
		}

		/* Device Specifics */

		@media (min-width: 720px) {
		  main {
			width: 50%;
			padding: 5em 6em;
		  }
		}
		@media (max-width: 720px) {
		  main {
			width: 85%;
			padding: 1em 2em;
			font-size: 0.7em;
		  }
		}
		img {
		  max-width: 80%;
		}
		`}</style>
        <main dangerouslySetInnerHTML={{ __html: data.content }}></main>
	</div>
  
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
// export const getServerSideProps = async () => {
  const { url } = context.query
  // Fetch data from external API
  const res = await fetch(`http:localhost:3000/api/file?url=${url}`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page
