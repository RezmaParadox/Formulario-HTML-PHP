class index {
	constructor(reset = false) {
		if(reset) {
			window.self = new index()
			window.UI = new index_ui(true)
			window.ajax = new Ajax("php/listener.php")
		}
	}

	validar(datos) {
		if(datos.nombre == "" || datos.nacionalidad == "" || datos.edad == "")
			alert("Error en los datos")
		else return true
		return false
	}

	// Calbacks
	async ALTAS_resultado(data) {
		if(self.validar(data)){
			let r = await ajax.post(data) 

			r = JSON.parse(r)
			r.servicio = "ALTAS"
			UI.actualizar(r)

			r = await ajax.post(r) 
			r = JSON.parse(r)
			const mensaje = r.resultado != 0 ? "Alta Completada" : "Alta Fallida"
			alert(mensaje)
		}
	}

	async BAJAS_resultado(data) {
		if(self.validar(data)){
			let r = await ajax.post(data) 
			r = JSON.parse(r)
			let mensaje 
			if( r.resultado != 0){
				mensaje = "Baja Completada"
				UI.select.options[UI.select.selectedIndex].remove()
			}else{
				mensaje = "No se encuentra el registro"
			}
			alert(mensaje)
			UI.limpiar()
		}
	}

	async CAMBIOS_resultado(data) {
		if(self.validar(data)){
			let r = await ajax.post(data) 
			r = JSON.parse(r)
			const mensaje = r.resultado != 0 ? "Cambios realizados" : "Cambios Fallidos"
			alert(mensaje)
			UI.clean()
		}
	}

	async CONSULTAS_resultado(data) {
		if(self.validar(data)){
			let r = await ajax.post(data) 
			r = JSON.parse(r)
			UI.limpiar()
			UI.mostrarConsulta(r)
		}
	}

	async CONSULTAS_NOMBRE_resultado(data) {
		if(self.validar(data)){
			let r = await ajax.post(data) 
			r = JSON.parse(r)
			if(r.resultado != 0){
				UI.mostrarConsulta_nombre(r)
			}else{
				UI.contenedor.value = ""
				UI.select.innerHTML = ""
				alert("No se encontraron coincidencias")
			}
		}
	}

	async CONSULTAS_SIGUIENTE_resultado(data) {
		if(self.validar(data)){
			let r = await ajax.post(data) 
			r = JSON.parse(r)
			if(r.resultado != 0){
				UI.mostrarConsulta(r)
			}else{
				alert("No existen más registros")
			}
		}
	}

	async CONSULTAS_ANTERIOR_resultado(data) {
		if(self.validar(data)){
			let r = await ajax.post(data) 
			r = JSON.parse(r)
			if(r.resultado != 0){
				UI.mostrarConsulta(r)
			}else{
				alert("No existen más registros")
			}
		}
	}
} 
window.onload = () => new index(true)