class index_ui {
	constructor(reset = false) {
		if(reset) {
			// Obtengo los acceso a los elementos de mi página
			this.form = document.querySelector("form")

			this.enviar = document.querySelector("#enviar")
			this.bajas = document.querySelector("#bajas")
			this.cambios = document.querySelector("#cambios")

			this.consultaGeneral = document.querySelector("#consultaGeneral")
			this.consultaNombre = document.querySelector("#consultaNombre")
			this.consultas_anterior = document.querySelector("#anterior")
			this.consultas_siguiente = document.querySelector("#siguiente")

			this.contenedor = document.querySelector("#contenedor")
			this.select = document.querySelector("#select")

			this.id = document.querySelector("#id")
			this.nombre = document.querySelector("#nombre")
			this.nacionalidad = document.querySelector("#nacionalidad")
			this.edad = document.querySelector("#edad")
			this.data = document.querySelector("#data")

			// Fijo eventos
			this.enviar.addEventListener("click", this.enviar_clickAltas)
			this.bajas.addEventListener("click", this.enviar_clickBajas)
			this.cambios.addEventListener("click", this.enviar_clickCambios)
			this.consultaGeneral.addEventListener("click", this.enviar_clickConsultasGenerales)
			this.consultaNombre.addEventListener("click", this.consultas_nombre_click)
			this.consultas_anterior.addEventListener("click", this.consultas_anterior_click)
			this.consultas_siguiente.addEventListener("click", this.consultas_siguiente_click)
			this.select.addEventListener('change', this.seleccionar_click)
		
		}
	}

		enviar_clickAltas(e) {
			e.preventDefault() // Detengo evento
			let datos = UI.recuperar("ALTAS")
			datos.servicio = "ID" // Este botón solicita el servicio de ALTAS
			self.ALTAS_resultado(datos) // Validará el controlador
		}

		enviar_clickBajas(e) {
			e.preventDefault() // Detengo evento
			let datos = UI.recuperar("BAJAS")
			datos.servicio = "BAJAS" // Este botón solicita el servicio de BAJAS
			self.BAJAS_resultado(datos) // Validará el controlador
		}

		enviar_clickCambios(e) {
			e.preventDefault() // Detengo evento
			let datos = UI.recuperar("CAMBIOS")
			datos.servicio = "CAMBIOS" // Este botón solicita el servicio de CAMBIOS
			self.CAMBIOS_resultado(datos) // Validará el controlador
		}

		enviar_clickConsultasGenerales(e) {
			e.preventDefault() // Detengo evento
			let datos = UI.recuperar()
			datos.servicio = "CONSULTAS" // Este botón solicita el servicio de Consultas Generales
			self.CONSULTAS_resultado(datos) // Validará el controlador
		}

		consultas_nombre_click(e){
			e.preventDefault() // Detengo evento
			let datos = UI.recuperar("CONSULTAS_NOMBRE")
			datos.servicio = "CONSULTAS_NOMBRE" // Este botón solicita el servicio de Consultas por nombre
			self.CONSULTAS_NOMBRE_resultado(datos) // Validará el controlador
		}

		consultas_anterior_click(e){
			e.preventDefault() // Detengo evento
			let datos = UI.recuperar("CONSULTAS_ANTERIOR")
			datos.servicio = "CONSULTAS_ANTERIOR" // Este botón solicita el servicio de consulta anterior
			self.CONSULTAS_ANTERIOR_resultado(datos) // Validará el controlador
		}
	
		consultas_siguiente_click(e){
			e.preventDefault() // Detengo evento
			let datos = UI.recuperar("CONSULTAS_SIGUIENTE")
			datos.servicio = "CONSULTAS_SIGUIENTE" // Este botón solicita el servicio de consulta siguiente
			self.CONSULTAS_SIGUIENTE_resultado(datos) // Validará el controlador
		}
	
		mostrarConsulta(data){
			if(Array.isArray(data)){
				let texto = "";
				for (const datos of data){
					texto += datos.nombre + " " + datos.nacionalidad + " " + datos.edad  + "\n";
				}
				this.contenedor.value = texto
			}else{
				this.actualizar(data)
				this.contenedor.value = data.nombre + " " + data.nacionalidad + " " + data.edad
			}
		}

		mostrarConsulta_nombre(data){
			this.select.innerHTML = ""
			let option = document.createElement("option");
			option.innerText = "Se identificaron coincidencias"
			this.select.appendChild(option)
			if(Array.isArray(data)){
				for (const datos of data){
					let option = document.createElement("option");
					option.setAttribute("value", datos.id);
					option.innerText = datos.nombre + " " + datos.nacionalidad + " " + datos.edad
					this.select.appendChild(option)
				}
			}else{
				this.actualizar(data)
				this.contenedor.value = data.nombre + " " + data.nacionalidad + " " + data.edad
			}
		}

		seleccionar_click(e){
			let target = e.target
			document.querySelector("#id").value = target[target.selectedIndex].value
			document.querySelector("#contenedor").value  = target[target.selectedIndex].text
		}

	recuperar(servicio) {
		let datos = {}
	
		if (servicio == "ALTAS" || servicio == "CAMBIOS") {
			datos.id = UI.id.value,
			datos.nombre = UI.nombre.value,
			datos.nacionalidad = UI.nacionalidad.value,
			datos.edad = UI.edad.value
		} 
		else if (servicio == "BAJAS" || servicio == "CONSULTAS_ANTERIOR" || servicio == "CONSULTAS_SIGUIENTE") {
			datos.id = UI.id.value
		} 
		else if (servicio == "CONSULTAS_NOMBRE") {
			datos.nombre = UI.nombre.value
		}

		return datos
	}

	actualizar(data){
		this.id.value= data.id
		this.nombre.value = data.nombre
		this.nacionalidad.value = data.nacionalidad
		this.edad.value = data.edad
	}

	limpiar(){
		UI.id.value = ""
		UI.nombre.value = ""
		UI.nacionalidad.value = ""
		UI.edad.value  = ""
		UI.contenedor.value = ""
	}
}