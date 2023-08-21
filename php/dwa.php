<?php
require_once("BD.php");

// dwa será una extensión de la clase BD, la cual a su vez es una extensión de PDO
class dwa extends BD {
	public function __construct(){
		// Indico el servidor, la BD, el usuario y la contraseña para la conexión
		try { parent::__construct("localhost", "dwa", "root", ""); }
		catch (Exception $e) { $this->ok = false; }
	}

	/* Cada método representa una posible consulta que se puede hacer a la BD.
	Por motivos de seguridad y eficiencia, lo mejor es dejar cada consulta
	en un procedimiento almacenado y así, si no existe un método que se 
	corresponda con alguno de nuestros procedimientos, no se podrá ejecutar,
	con lo cual, garantizamos que solo se realizarán sobre la BD las 
	operaciones permitidas. */

	public function ALTAS($datos){
		
		return "CALL ALTAS('$datos->id', '$datos->nombre', '$datos->nacionalidad', '$datos->edad');";
	}

	public function BAJAS($datos){
		return "CALL BAJAS('$datos->id');";
	}

	public function CAMBIOS($datos){
		return "CALL CAMBIOS('$datos->id', '$datos->nombre', '$datos->nacionalidad', '$datos->edad');";
	}

	public function CONSULTAS(){
		return "CALL CONSULTAS();";
	}

	public function CONSULTAS_NOMBRE($datos){
		return "CALL CONSULTAS_NOMBRE('$datos->nombre');";
	}

	public function CONSULTAS_SIGUIENTE($datos){
		return "CALL CONSULTAS_SIGUIENTE('$datos->id');";
	}

	public function CONSULTAS_ANTERIOR($datos){
		return "CALL CONSULTAS_ANTERIOR('$datos->id');";
	}


}
?>