Pull repo a type `npm run dev` to start server


Add code below to packages\developer-console\index.js after line.innerHTML = \`...\` in maut_mautilus-sdk. Run `npm pack` in packages\developer-console and install this package with npm in bigscreen project.
`
	fetch('http://192.168.0.10:3000/log', {
			method: 'POST',
			  headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({logInfo : timeInfo + logInfo})
		}).then(r => {

		}).catch(e => {
			
		})
`