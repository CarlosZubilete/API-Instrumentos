- Como utilizar los json
- Como trabajar con los templates
- Como hacer una api rest

**Paquete de dependencias** _package.json_

```
{
  "name": "clase-3", // nombre del proyecto
  "version": "1.0.0", // version
  "description": "**Servidores Web**", // descripcion
  "main": "main.js", //
  "respository": {} // en que respositorio esta el protecto (git)
  "dependencies": {
    "express": "5.1.0"
  }
  "scripts": {
    "dev": "node practicaExpress.js "
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}
```

- _Dependecias_ los modulos de cual depende nuestro proyecto.
  - "express" : "^5.1.0"
    - ^ indica la version o superior , recomendable eliminarlo.
  - Si queremos otra version:
    - express : "4.21.2"
    - npm install // para actualizar la version.
- _Scripts_

  - Lineas de comandos , que indica al administrador de paquetes (npm) que ejecute

  - _"dev"_: "node practicaExpress.js "

    - Tradicional : node practicaExpress.js
    - Con scripts : npm run dev
      - dev indica el nombr del script
        - _nota_ , en PowerShell , me da un error, en gitbash funciona correcto.
    - a "node practicaExpress.js" le podemos enviar parametros

          - '--watch', si hay un cambio en el servicio , vuelte a levantar el sevicio, con los cambios inclusive. Es decir, va a estar escuchando si en el archivo que le indicamos , hay algun cambio.
            - "nombreScrip" : "node --watch practicaExpress.js
            - npm run nombreScrip

          ```
          /// Si hay un error , te lo dice por consola.
            app.listen(3000 , () => {
              console.log('Nos conectamos al puerto http:/localhost:3000');
              console.log('Un cambio para --watch');
            })
          ```

          - '--watch-path', la ruta especifica que queremos que escuche o que no queremos que escuche , por ejemplo los archivos json. Por ejmplo , si tu aplicacion modifica un archivo Json , nuestra app pensará que hay algun cambio.

  - _"start"_
  - _"build"_
  - _echo_ , es un print/cout de consola
    - "dev" : "echo \"Estoy esjecutando comando dev\" & node --watch practicaExpress.js",
    - Tabien lo podemos ejecutar directamento desde la consola.
      - Charly@DESKTOP-LFTFVP5 MINGW64 /d/BrianLara-NodeJs-2025/Clase-3
        $ echo "hola soy un comando de consola"
        hola soy un comando de consola

**JavaScriptObjectNotation**

- Texto plano.

  - _parse_ : Parsea un string de Json (texto plano) a objetos de Js.
    - JSON.parse(data.toString());

**readFile**

- Método resolve() , resuelve las rutas de path.
- Siempre te da la ruta del directorio de trabajo, en donde se esta ejecutando node.
- Siempre el resultado de la ruta , es de acuerdo al S.O
  - ./window/
  - .\ios\
- Siempre acalarar la extension en 'import nombre from documento.js'

**Creamos un servidos en Express**:

- Crear el servidor
- Crear un servidor Dinamico.
  - Al indicar la ruta del archivo usar resolve()
- Leer el archivo Json , necesitarás 'parsearlo'.

  - Guardarlo en una variable el array de objetos.
  - Declarar una variable contenedor
    - En esa variable vamos a concatenar a medida que recorrecomes el array
  - Le mostramos al ususario.

  _Pagina Dinamica:_

  ```
    import express from 'express';
    import fs from 'node:fs/promises'
    import path from 'node:path';

    const app = express();

    app.get('/productos', (req,res) => {
      fs.readFile(path.resolve('./data/products.json'))
        .then((data)=>{
          // Guardamos la lista de objetos en una variable.
          // JSON.parse, convierte una cadena de texto plano , en objetos de javascript
          const objectList = JSON.parse(data.toString())
          let container = '';

          for(let i = 0 ; i<objectList.length ; i++ ){
            container += `<li> ${objectList[i].name}</li>`
          }

          res.send(`<ul>${container}</ul>`);

        })
        .catch((err)=>{
          res.send(err.message);
        })
    })

    app.listen(9000, ()=>{
      console.log('Inicio del servidor en http://localhost:9000');
    })
  ```

  _Si agregamos más archivos, se actualiza_

**Agreamos a nuestra pag Templates**

- Usamos el EJS .
- Intalamos el ejs:
  - npm install ejs
  - agregado un depencia nueva en 'package.json'
  - Extension en vsco, ejs verificada.
- Creamos una carpeta views
  - Archivos que se carguen de forma dinamica.
    - por ejmplos: productos.ejs
- _Express_: en la ducmentacion nos enseña a agregar templates.
- Especificamos el motor
  - app.set('view engine', 'ejs');
- Especificamos la carpeta de las vistas. (Si esta en el root, no es necesario).
  - app.set('views', './views').
- En la linea de codigo donde atendemos la peticion 'app.get()':

  - Cuando leemos el archivo , y lo parseamos le vamos a pedir que 'renderice'

    - res.render() - (NOMBRE DE LA VISTA A RENDERIZAR EJS, {OBJETO QUE QUEREMOS QUE UTILICE PARA RENDERIZAR})
      _Padre.js_

      ```
        import express from 'express';
        import fs from 'node:fs/promises'
        import path from 'node:path';

        const app = express();
        app.set('view engine', 'ejs') // Especificamos el motor
        app.set('views', './views')// Especificamos la carpeta de las vistas

        app.get('/productos', (req,res) => {
          fs.readFile(path.resolve('./data/products.json'))
            .then((data)=>{
              const objectList = JSON.parse(data.toString())

              // nombre de la vista ejs, variable a renderizar.
              res.render('contacto',{objectList}) ;

            })
            .catch((err)=>{
              res.send(err.message);
            })
        })

        app.listen(9000, ()=>{
          console.log('Inicio del servidor en http://localhost:9000');
        })
      ```

    _archivo.ejs_

    ```
    <body>
      <h1> Documento EJS </h1>

      <ul>
        <% for(let i = 0 ; i<objectList.length ; i++) { %>
          <li>
            <h2><%= objectList[i].name %></h2>
          </li>
        <% } %>
      </ul>

    </body>
    ```

  - <% codigo JavaScript %>
  - <%= codigo %> , el '=' ejecuta el JavaScript y dibuja el HTML

**Agregar un producto**

- En la pag principal , agregamos un <a href='/rutaDelArchivo'/>

- Creamos la vista 'anotherFile.ejs'.
  - Preferentemente que esten dentro de la misma carpetas de las vistas:
    - app.set('views', './views').
- Creamos la petición:

  ```
  // Creamos un nueva peticion para agregar productos:
    app.get('/rutaDelArchivo', (req, res) => {
      res.render('addProducto', {});
    })
  ```

- Creamos un formulario par agregar producto .
  ```
    <form action="/rutaDelArchivo" method="POST">
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <label for="description">Descripción</label>
        <input type="text" id="description" name="description" required>
        <br>
        <button type="submit">Agregar</button>
      </form>
  ```
- _importante_ el atributo _name_: ya que nos va a pasar los valores de los imputs

  - Express utiliza los valores de los atributos 'name' para construir el objeto req.body

  \_<OBTENEMOS LOS VALORES DEL FORMULARIO/>>\_

  ```
    app.post('/agregarProductos', (req,res) =>{
      console.log('Obtuvimos el body');
      console.log(req.body); // IMPRIME UNDERFINE
      res.end(); // finalizacion.
    })
  ```

- _app.get()_, obteniendo
- _app.post()_, creando
- _resquest_ todos los datos que me envian desde el usuario.
- _response_ todo lo que queremos enviarle al usuario.
  - header ,
  - body , es el cuerpo del mensaje,
  - url, que ruta archivo queremos atender
- _body_ , es un objeto , no definido. - Tenemos que indicarle que hacer con esa información del
  **<metho='POST'>**
- _PRINT DE LA TERMINAL_

```
  Obtuvimos el body
  undefined
```

- cuando enviar informacion a travez de un formulario.Se envia en formato <urlencoded>. (codificado para viajar a travez de la url)

- Para poder codificarlo utilizamos:

```
    app.use(express.urlencoded({extended:true}))
```

_terminal_

```
  Obtuvimos el body
  undefined{name:valor, name:valor}
```

_1. Tenemos que indicarle a express que lo lea por urlencoded_
_2. Atenderlo por el metodo POST_
_No olvidar de la porpiedad name en los formularios_

**Agregarlo a nuestro archivo Json**

- Agregar el formato Json.
  - Remenber that body tiene los datos ingresado los trae 'request' a travez del 'body'
- Leer el archivo.
- Escribir el producto en el archivo.

- JSON.stringify() converir un objeto en Json

- res.redirec('/url') -> redirecciona hacia la url .

```
  /*
    * leer el archivo. Al ser asincronico utilizamos el 'await'
    * Guardar el retorno en una variable(array).
    * Crear un objeto Json.
    * Setear sus valores ingresado desde el usuario.
    * Pushearlo al array
    * Guardarlo en el sistema operativo
  */

  app.post('/agregarProductos', async (req,res) =>{

    console.log('Obtuvimos el body');

    const listaProductos = await getProductos();

    const producto = {
      name : req.body.name,
      description: req.body.description
    };

    listaProductos.push(producto);

    await saveProductos(listaProductos);

    res.redirect('/productos');
  })
```

- _Falta el id_

  - Leemos el archivo
  - Accedemos a su propiedad length.

```

```

- _Editar el producto_
  1. Crear la peticion app.get();
  2. Crear el archivo.ejs
  - Todo lo necesario para que el usuario modique el producto a travez del ID.
  - Buscamos ese archivo.
  3. Crear el metodo post ();
  4. Leer el archivo
  - Buscamos ese objeto
  - remplazamos los datos.
    - name, description , el id es el mismo.
  - guardamos el objeto.

```

```
