require('dotenv').config()
//const katex = require('katex')
//const texme = require('./nbtexme')
const texme = require('texme')
//import texme from 'texme'



function parentdir(url) {
	url = url.split("").reverse().join("")
	url = url.substring(url.indexOf('/'))
	url = url.split("").reverse().join("")
	return url
}

function filename(url) {
	url = url.split("").reverse().join("")
	url = url.substring(0, url.indexOf('/'))
	url = url.split("").reverse().join("")

	// remove file extension
	url = url.substring(0, url.indexOf('.'))
	return url
}


export default async function handler(req, res) {
	try {
		var { url } = req.query
		var access_token = process.env.GH_PA_TOKEN
		
		const settings = {
			method: 'GET',
			headers: {'Authorization': "token "+access_token, cache: "force-cache"},
		}
			
		var response = await fetch(url, settings)
		var content = await response.text() //response.data

		var user = "amshenoy"
		var branch = "master"
		var repo = url.match(new RegExp("/"+user+"/" + "(.*)" + "/"+branch+"/"))[1]
		//var localpath = url.match(new RegExp("/"+branch+"/" + "(.*)" + "/"+assets))
		var localpath = url.split("/"+branch+"/")[1]
		var folderpath = localpath.split("/")[0]
		//console.log(localpath)
		var asset_url = "https://github.com/"+user+"/"+repo+"/raw/"+branch+"/"+folderpath+"/assets"
		//var asset_url = parentdir(url)+'assets'
		//console.log(asset_url)
		content = content.split('/assets').join(asset_url)
		
		var html = texme.render(content);
		//res.render("viewer", {content:html});
		res.status(200).json({content: html})	

	} catch(error) {
		console.error(error)
		res.status(404).send('Not found')
	}

}