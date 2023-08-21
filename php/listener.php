<?php
	header('Content-Type: text/html; charset=UTF-8');
	spl_autoload_register(function ($class){
		if(file_exists("$class.php"))
			require_once("$class.php");
	});

	class listener {
		public function __construct($data){
			$data = json_decode(($data["data"])); //Convierto a objeto PHP
			if(property_exists($data, 'servicio')){ // Verifico que venga un servicio indicado
				$servicio = $data->servicio;
				if(method_exists($this, $servicio)) // Verifico si existe el servicio (método)
					$this->$servicio($data); // Ejecución dinámica de métodos
				else echo "listener - Servicio no reconocido: " . $servicio;
			}
		}

		private function ID($data) {
			$data->id = "ID" . $this->timeSpan();
			echo json_encode($data);
		}

			// Una firma única basada en el tiempo
			private function timeSpan() {
				date_default_timezone_set("America/Mexico_City");
				$fecha = localtime(time(), true);

				$o = new stdClass();
				$o->dia = str_pad(strval($fecha["tm_mday"]),2,"0", STR_PAD_LEFT);
				$o->mes = str_pad(strval(++$fecha["tm_mon"]),2,"0", STR_PAD_LEFT);
				$o->anio = strval(1900 + $fecha["tm_year"]);
				$o->hora = str_pad(strval($fecha["tm_hour"]),2,"0", STR_PAD_LEFT);
				$o->minutos = str_pad(strval($fecha["tm_min"]),2,"0", STR_PAD_LEFT);
				$o->segundos = str_pad(strval($fecha["tm_sec"]),2,"0", STR_PAD_LEFT);
				$o->milisegundos = str_pad(strval(rand(1,999)),3,"0", STR_PAD_LEFT);
				return $o->anio . $o->mes . $o->dia . $o->hora . $o->minutos . $o->segundos . $o->milisegundos;
			}

		private function ALTAS($data) {
			echo json_encode((new dwa())->CONSULTAR($data->servicio, $data));
		}

		private function BAJAS($data) {
			echo json_encode((new dwa())->CONSULTAR($data->servicio, $data));
			//json_encode($data);
		}

		private function CAMBIOS($data) {
			echo json_encode((new dwa())->CONSULTAR($data->servicio, $data));
			//json_encode($data);
		}


		private function CONSULTAS_NOMBRE($data) {
			echo json_encode((new dwa())->CONSULTAR($data->servicio, $data));
			//json_encode($data);
		}

		private function CONSULTAS($data) {
			echo json_encode((new dwa())->CONSULTAR($data->servicio, $data));
			//json_encode($data);
		}


		private function CONSULTAS_ANTERIOR($data) {
			echo json_encode((new dwa())->CONSULTAR($data->servicio, $data));
		}

		private function CONSULTAS_SIGUIENTE($data) {
			echo json_encode((new dwa())->CONSULTAR($data->servicio, $data));
		}

		

	}
	if (count($_POST)) new listener($_POST);
?>