**Path**

- Lo podemos utilizar para trabajar con rutas dentro de nuestro sistema de archivos
- Lidiar con rutas en dos notaciones distintas y contruir rutas absolutas o relativas ficheros.

**Require de path**

- Para poder utilizar el modulo es necesario importarlo de manera explicita.
  Dos maneras equivalentes:

```
  const path = require('node:path');
  // otra manera:
  const path = require('path');
```

**Método basename()**

- Se encargará de usar el S.O donde se está ejecutando el código.

```
  path.basename('src/foo.js') // devuelve "foo.js"
```

- Windows , rutas con contrabarras

```
  path.win32.basename('src\\foo.js') // devuelve "foo.js"
```

- Linux o Mac, rutas con barras inclinadas normales

```
  path.posix.basename('src\\foo.js') // devuelve "src\foo.js"
```

**Método join()**

- Sirve para juntar partes de una ruta
- Node se encargará de hacerlo, respecto al sistema que estamos trabajando.
- Recibe un número indeterminado de argumentos, el número de partes de rutas que quieres concatenar.

```
  const ruta = path.join('foo','var','module.js');
  // retorna "foo\var\module.js".
```

- Un uso muy tipico es cuando juntamos el directorio actual, con una ruta
  que tengamos en el sistema.

```
  const ruta = path.join(__dirname,'modules','file.js');
```

- Retornará una ruta obsoluta del archibo "file.js" que está dentro de la carpeta
  "modules" que está en el directorio actual donde estamos trabajando.
  Ejemplo : "/Users/midesweb/manuales/node/modules/file.js"

- '\_\_dirname' es un variable, nos indica el nombre del directorio del módulo
  que se esta ejecutando.

**Método resolve()**

- Funciona de manera similar como el método join(), pero esta solamente genera rutas
  absolutas

**Propiedad path.sep()**
