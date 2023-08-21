class Ajax {
	constructor(listener) {
		this.listener = listener
	}

	post(datos = {}) {
		return new Promise((resolve, reject) => {
			if(!Object.entries(datos).length || !datos.hasOwnProperty("servicio"))
				reject(new Error("Datos inválidos para POST"))

			let xhttp = new XMLHttpRequest()
			const params = datos ? "data=" + JSON.stringify(datos) : ""
			
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200)
					resolve(this.responseText)
			}
			xhttp.open("POST", this.listener, true)
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
			xhttp.send(params)
		})
	}
}