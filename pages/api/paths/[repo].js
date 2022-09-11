require('dotenv').config()

// Put the following in a config file
const repos = ["1b-eng-notes", "2a-eng-notes"]
const username = "amshenoy"
const access_token = process.env.GH_PA_TOKEN
const branch = "master"
const viewer_url = "viewer?url="
//const viewer_url = "https://eng-notes.amshenoy1.repl.co/file?url="

function get_folder_path(repo_path){
	var folders = repo_path.split("/")
	var repo_name = folders.shift() // remove repo name (first item) from folders
	var folder_path = folders.join("/")
	return folder_path
}

function get_raw_url(repo_path, filename, repo){
	var folder_path = get_folder_path(repo_path)
	var raw_url = "https://raw.githubusercontent.com/"+username+"/"+repo+"/"+branch+"/"+folder_path+"/"+filename
	return raw_url
}

function get_url(repo_path, filename, type, repo){
	folder_path = get_folder_path(repo_path)
	file_url = "https://github.com/"+username+"/"+repo+"/"+type+"/"+branch+"/"+folder_path+"/"+filename
	return file_url
}


async function scan(tree_sha, dir, repo){

	var files = []
	// /repos/:owner/:repo/git/trees/:tree_sha
	var url = "https://api.github.com/repos/"+username+"/"+repo+"/git/trees/"+tree_sha

	const settings = {
		method: 'GET',
		headers: {'Authorization': "token "+access_token, cache: "force-cache"}
	}

	const fetched = await fetch(url, settings)
	const data = await fetched.json()
	var tree = data["tree"];
	
	// Is there actually such a folder/file?
	//if(file_exists($dir)){
		for (var f of tree) {
			if(f["type"]=="tree") {
				// The path is a folder
				var foldername = f["path"]
				var new_dir = dir+'/'+foldername
				var new_tree_sha = f["sha"]
				var items = await scan(new_tree_sha, new_dir, repo) // Recursively get the contents of the folder
				var newfile = {"name": foldername, "type": "folder", "path": new_dir, "items": items}
			} else {
				// It is a file
				var filename = f["path"];
				var type = f["type"];
				var newfile = {"name": filename, "type": "file",
					"path": viewer_url+encodeURI(get_raw_url(dir, filename, repo)),
					"size": f["size"] // Gets the size of this file
				};
			}
			files.push(newfile)
		}
	//}
	return files
}




export default async function handler(req, res) {

	const { repo } = req.query

	// Note raw url for a private repo cannot be accessed without access_token
	// The viewer server must have explicit access to the private repo (ie. access_token) to allow this url to be viewable.
	console.log(repo)
	if (repos.indexOf(repo) == -1){
		throw new Error(JSON.stringify({message: 'Repo not found!'}))
	}
	
	if (req.method === 'GET') {
		
		const settings = {
			method: 'GET',
			headers: {'Authorization': "token "+access_token, cache: "force-cache"},
		}
	  
		// const paramsObj = req.query
		// var queryParams = Object.keys(paramsObj).map(key => `${key}=${encodeURIComponent(paramsObj[key])}`).join('&')

		const fetched = await fetch("https://api.github.com/repos/"+username+"/"+repo+"/branches/"+branch, settings)
		const json_a = await fetched.json()
		const tree_sha = json_a["commit"]["sha"]

		var response = await scan(tree_sha, repo, repo)

		var path_data = {"name": repo, "type": "folder", "path": repo, "items": response}
		
		res.status(200).json(path_data)
	}
}
