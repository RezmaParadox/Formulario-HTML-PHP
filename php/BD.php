<?php
class BD extends PDO {
	/* Este atributo servirá como bandera que indicará si la conexión se realizó exitósamente o 
	falló. Por defecto asumimos que todo saldrá bien. */
	public $ok = true;

	/* Valiéndose del constructor de PDO, este constructor se encargará de la conexión con la BD 
	teniendo en cuenta los valores pasados como argumentos. */
	public function __construct($Servidor, $BD, $Usuario = "", $Password = ""){
		try {
			// Solicito a PDO que conecte con la BD indicada, con los datos indicados
			parent::__construct('mysql:host=' . $Servidor . ';dbname=' . $BD, $Usuario, $Password);
			$this->exec("SET NAMES 'utf8'");  // Para el manejo de los acentos y demás
		} catch (Exception $e) { $this->ok = false; }
	}

	/*
	Este método verifica que el servicio solicitado sea legítimo. Para esto, comprueba
	que exista un método llamado exactamente como el servicio solicitado. Si no existiera
	el método correspondiente, se entiende que no es una solicitud legal y entonces
	se devolverá un texto al cliente, informando de lo ocurrido */
	public function CONSULTAR($consulta, $datos){
		if(method_exists($this, $consulta)){ // Aquí se verifica la existencia del método
			$query = $this->$consulta($datos); // Así se ejecutan métodos de forma dinámica
			$res = $this->query($query); // Aquí se ejecuta la consulta sobre la BD
			return $res ? $this->getData($res) : []; // Aquí se devuelven los datos
		}
		else echo get_class($this) . " - Servicio solicitado no reconocido";
	}

/* 
Este método devuelve un array de objetos o un objeto, dependiendo del número
de filas que la consulta haya emitido. Cada fila será un objeto que se guardará
en el array. */ 
protected function getData($data) {
	$registros = []; // Este será mi array de objetos (un objeto por fila)

	if($data->setFetchMode(PDO::FETCH_ASSOC)){ // Verifico que la consulta haya producido datos
		while($fila = $data->fetch()){ // Aquí recorro el dato crudo que me devolvió la consulta
			/* A continuación, creo el objeto correspondiente a la fila. Inicialmente el objeto
			no tiene atributos, no obstante, cada campo de la fila, pasará a ser un atributo del
			objeto. */
			$registro = new stdClass(); // Se crea un objeto vacío para la fila
			foreach ($fila as $campo => $valor) // Recorro la lista de campos de la fila
				// Así se crean atributos de clase de forma dinámica. 
				// Se creará un atributo por cada campo que haya emitido la consulta
				$registro->{$campo} = $this->getValor($valor);
			array_push($registros, $registro); // Meto el objeto al array de filas
		}
	}
	/* Si solo tenemos un objeto en el array, entonces se devolverá un solo objeto, en caso
	contrario se devolverá el array de objetos.
	Si el array está vacío, se devolverá así como está y esto indicará que la consulta
	no emitió resultados. */
	return count($registros) == 1 ? $registros[0] : $registros;
}

/* Cada campo, de cada fila que emitió la consulta, se encuentra en estado crudo
(generalmente en modo texto).
El siguiente método se encarga de hacer la conversión del campo a un dato PHP.
Realiza un análisis de los datos para determinar el tipo de dato que corresponde y
entonces devuelve el valor del campo ya convertido en un dato PHP en su tipo de dato
correspondiente */
protected function getValor($valor){
	if(preg_match('/^[0]+[1-9][0-9]*$/', $valor)) return strval($valor);
	elseif(is_numeric($valor)) return $this->esFlotante($valor) ? floatval($valor) : intval($valor);
	elseif(is_string($valor) && ($valor == "true" || $valor == "false")) return $valor == "true" ? true : false;
	elseif(is_string($valor)) return strval($valor);
	elseif(is_bool($valor)) return boolval($valor);
}

	// Este método se usa para determinar si el dato numérico es un número real o no 
	protected function esFlotante($valor){
		return preg_match("/^[-]*[0-9]*+\.[0-9]*$/", $valor);
	}
}
?>