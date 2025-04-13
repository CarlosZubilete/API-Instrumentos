Link bootstrap studio, gratis
WebFLow -> noCode
http.cat -> estados
excalidraw:com -> dibujar

**Apis**/

- _¿Qué cosa necesitamos para poder comunicarnos entre sistemas?_

  - Todas las cosas que vamos a usar , necesitamos una _Interfaz_,
    [forma en que el receptor nos entenderá]

  _Sistemas_

  - Un sistema, un conjunto de elementos que estan interactuando entre ellos
    por un objetivo/fin en comun

**Comunicación**

- _Entre dos SISTEMAS HUMANOS_

  - Procolo : Idioma
  - Interfaz: 5 sentidos

- _Entre Sistema HUMANO Y INFORMATICO_

  - Protocolo:
  - Interfaz
    - GUI -> Grafic use interface
      - es un entorno _visual_ que permite a los usuarios interactuar con dispositivos electrónicos
      - mouse, teclado, botones, menu desplegables.
    - CLI -> comand line interfaces. (git, node)
      - su entrono es a travez de _lineas texto_ .
      - La termina es la herramienta donde ejecutas linea de comando
    - VUI -> voice user interface.
      - su entorno es a travez de _vos_
      - Alexa, SIRI, voiceCopailot

_Entre dos SISTEMAS INFORMATICOS_

- Interfaz

  - API. Aplication Programing Interface
    - conjunto de funcionalidades que un sistema expone para que otro sistema utilice.
      para que se pueden comunicar (a travez de programación).
  - _Problema_ -> protocolo
    - Si estan en distintos lenguajes, no se pueden comunicar.
  - _¿Qué es un driver?_ (es una librería)

    - 1. Si nosotros queremos leer, escribir o abrir un documento.
         tenemos que comunicarnos con el S.O.No podemos. No hablamos binario.
    - 2. Nos comunicamos con Node.
    - 3. Node,que su lenguaje de programación es JavaScript se comunica con el Sistema Operativo
    - 4. El lenguaje de programación del
         indice de la API del Sistema Operativo, es en C++.
    - 5. Driver:
      - Es una Libreria.
      - es software que se encarga de comunicar a los dos Sistemas Informatico.
      - Esta programado en el lenguaje de programacion de donde vamos a sacar la información y
        saber interpretar el lenguaje a donde enviara dicha informacion
      - Es el que va a entender el prococolo
      - NODE Y NUESTRO S.O , se comucican directamente, pero NODE utliziza el driver para
        'traducir o enviarle' información'.

  - _Otro Problema_
    - Si no hay driver, no me puedo comunicar con la app.
    - Enpezaron a dividir el front con el back - Empi
    - Aprece los _ServicioWeb_

**Servicios Web**(año 2000)

- Una aplicación que estaba en un serividor y que utilizaba el protocolo web (HTTP)
- Todos los lenguajes de Programación conocen en protocolo HTTP.
  - índice de API de Windows
  - API de linux
  - API de Web
- Ahora el _Driver_ es el HTTP.
- Aparece la aplicación como servicio SAAS

**SAAS** -> _Software as a Service_

- Se le dice a una Aplicación como servicio que
  Expone una serie de funcionalidades, para que otras apps lo consuman.
  Protocolo : HTTP
- Cuando tenes una applicación/sistema/software , pensanda unicamente como servicio.
- No tiene interfaz grafica.
  Como por ejemplo: Uber tiene dos aplicaciones (pasajeros y conductores),
  estos se conectan a servicios diferentes.
  Ambas tiene la parte de Front que le piden servicio al Back
  Siempre las aplicaciones del lado del cliente son más pequeñass.

**API WEB**

- Tipos de Apis:

  - Rest Full / APIS REST
    - Muy utilizada
  - SOAP
    - Poco utilizada. El gobierno lo utiliza , porque tiene una capa de seguridad.
  - GRAPH QL.
    - Mas popular SOAP
    - Para manjera muchos datos. La forma de comunicarte es como un SQL
    - Inventado por FaceBook.

- _Caracteristicas de las APIS REST_

  - Mismos creador de protocolo HTTP
  - Reglas en un HTTP:

    - _URL_ : UNIFORME RESOURCE LOCATION
      - dirección de un recurso en internet, como una página web, un archivo o una image.
      - En donde se encuentran las cosas.
      - http://localhost:9000/css/style.css
        1. http -> protocolo
        2. //localhost -> en nuestra computadora.
        3. :9000 -> número de puerto.
        4. /css/style.css -> URL
        - En donde se encuentra el recurso que queremos consumir.
    - _Body_: Contenido.
      - Cual es el contenido de ese recurso.
    - _Status_ :
      - El estado de la petición
      - 100 -> problemas que están pasando con el protocolo
      - 200 -> Todo ok, pero hay un mensaje.
      - 300 -> El recurso que solicitamos exite, pero no esta en otro lado
        - Relacionadas con el ridereccionamiento.
      - 400 -> El recurso no exite o paso algo.
      - 500 -> Errores internos del servidor
      - https://http.cat/ -> para mas estados.
        - 102 -> processing
    - _Verbos_:
      - GET / POST / PUT / PATCH / DELETE

  - _API REST utiliza los mismas reglas_
    - _URI_ -> UNIFORM RESOURCE IDENTIFICATION
      - Los recursos son ENTIDADES
        - /clientes
        - /clientes/1
        - /clientes/1/compras/compras
        - NOS RETORNA LA INFORMACIO DE LA COMPRA DEL CLIENTE 1.
      - Nunca, jamas vamos a tener una _ACCIÓN_, son solo dadas por los verbos
    - _BODY -> JSON o XML_
    - _STATE_
      - Esta dado por el HTTP status code
    - Las acciones estan dadas por los _verbos http_
      - **GET**: obtiene un recurso.
      - **POST**: crea un recurso.
      - **PUT**: reemplaza un recurso. // no es lo mismo que actualizar
      - **PATCH**: acualiza un recurso.
        - No es lo mismo que remplazar (PUT)
        - Acualiza un campo determinado
      - **DELETE**: elimina un recurso.

**LO PASAMOS A NODE**

1. Creamos un proyecto con express.

- No olvider agregar el "type:module"
- dev: "node --watch app.js"

2. Creamos la variable -> const app = express();
3. Creamos el puerto -> app.listen()

_Creamos el recurso_

1. Creamos un archivo que contenga una array de objetos de variable instrumentos.
2. Solicitamos un listado del recurso que creamos

- Cuando entremos en http://localhost:9000/instrumentos . Me mostrará la lista.

```
  app.get('/instrumentos' , (req, res) => {
    res.json('Array de instrumentos') // obtenemos el array en formato json.
  })
```

3. Solicitamos un elemento en particular.

- Necesitaremos que es segundo argumento de la URI , sea una variable
- _Params_: es todo lo que enviamos por URL, en este caso es URI, (IDENTIDAD)
  - const {idInstrumento} = req.params -> retorna un string
  - const idInstrumento = req.params.idInstrumentos -> retorna un string

```
  app.get('/instrumentos/:idIstrumentos' , (req, res) => {
    const idInstrumento = req.body.id; // -> PREGUNTAR AL PROFE
    const {idInstrumento} = req.params // o  const idInstrumento = req.params[idInstrumentos]

    const {idInstrumento} = req.params
    // leemos el archivo y buscamos el id ....
    const nuevoArray = array.find ((idInstumento) => array.id === Number(idInstumento)  )


    // si exite el instrumento -> res.json(instumento)
    // si no exite -> res.status(400).json({mensaje: "no encontrado"})

  })

  // **IN** _es una palabra reservada_
```

5. Vamos a crear un nuevo objeto para el array con un _POST_.

- Necesitamos el post -> app.post
- Necesitamos el recurso que vamos a crear.
  ```
    app.pos('/url') // al la url le vamos agregar un objeto.
  ```
  - Get y Post , tiene la misma URI, lo que los diferencia es la acción.
    - En una obtenemos y en la otra agregamos.
  - Información que nos llegará , por el objeto _body_
  - Para hacer un post necesitamos una _libreria_
- Necesitamos crear el objeto
- Asignar la informacion mediante: req.body.propiedad
- Agregamos el instrumento nuevo a la lista del array en formato json
  - res.status(201).json({msg: "Se creo el objeto #id"})

6. _RAPID API_ (Librería)

- Es una aplicación que nos permite consumir apis
- Crear un proyecto en _RapidApi_

  - Creamos un nuevo proyecto
    - 1. Request +
    - 2. GET | URL | SEND
    - 3. BODY
    - 4. JSON
    - 5. El objeto que queremos agregar
  - Una vez configurado , enviamos
    - en el http://locarlhost/ ERROR -> no se puede leer atributo.
    - Necesitamos una funcion de _middleware_
  -

  ```
    // Si el body nos retoran en url encouded, ahora lo interpreta.
    // analiza datos codificados en URL de formularios
    app.use(express.urlencoded({extended:true}))

    // Si el body es un json, lo comvierte a objeto de JavaScript
    // analizar y procesar solicitudes entrantes en formato JSON
    app.use(express.json())
  ```

**NUMBER**

- NUMBER(string) -> comvierte un string a un entero.

- _Eliminación logíca_, si queremos dar de baja logícamente , usamos _PATCH_

**CHAT**

Preguntas:

- Qué diferencia hay entre POST Y PATCH ,

  - **GET**: obtiene un recurso.
  - **POST**: crea un recurso.
  - **PUT**: reemplaza un recurso. // no es lo mismo que actualizar
  - **PATCH**: acualiza un recurso.
    - No es lo mismo que remplazar (PUT)
    - Acualiza un campo determinado
  - **DELETE**: elimina un recurso.

  Es decir porque no puedo hacer un POST -> '/instrumentos/:idInstrumentos'
  Así tambien estoy creando un 'creando' un 'recurso' nuevo basando por el ID.

  - writeFile , que retorna ?
