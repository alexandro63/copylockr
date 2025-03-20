# CopyLockr 🔒
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


CopyLockr es una librería poderosa para proteger el contenido de tu sitio web contra copias no autorizadas, clics derechos y accesos a herramientas de desarrollo. Con una configuración sencilla mediante un objeto, podrás integrar y personalizar la protección de manera rápida y eficaz.

## Características ✨

- **Bloqueo del menú contextual:** Previene el uso del clic derecho.
- **Prevención de copiar/pegar/cortar:** Desactiva la copia de contenido.
- **Bloqueo de arrastrar elementos:** Impide mover elementos de la página.
- **Deshabilitación de selección de texto:** Evita la selección de contenido.
- **Protección contra DevTools:** Dificulta el acceso a herramientas de desarrollo.
- **Estilos CSS protegidos:** Aplica estilos para prevenir la selección y manipulación.
- **Observador de cambios en el DOM:** Monitorea modificaciones en la estructura.
- **Sistema de contraseña:** Permite desactivar la protección mediante contraseña.
- **Callbacks personalizados:** Ejecuta funciones al bloquear eventos.
- **Modo debug:** Activa el logging en consola para facilitar la depuración.
- **Soporte UMD/AMD/CommonJS:** Compatible con diversos entornos de módulos.

## Configuración 🔧

Puedes configurar CopyLockr declarando un objeto con las opciones deseadas. La siguiente tabla detalla cada parámetro configurable:

| Parámetro           | Tipo     | Por Defecto | Descripción                                        |
| ------------------- | -------- | ----------- | -------------------------------------------------- |
| disableContextMenu  | boolean  | true        | Bloquea el menú contextual (clic derecho).         |
| disableCopy         | boolean  | true        | Desactiva la copia de contenido.                   |
| disableCut          | boolean  | true        | Previene el corte de contenido.                    |
| disableDrag         | boolean  | true        | Impide arrastrar elementos.                        |
| disableSelect       | boolean  | true        | Deshabilita la selección de texto.                 |
| disableDevTools     | boolean  | true        | Bloquea accesos directos a DevTools.               |
| password            | string   | null        | Contraseña para desactivar la protección.          |
| customStyles        | boolean  | true        | Aplica estilos CSS anti-selección.                 |
| debug               | boolean  | false       | Habilita el logging en consola para depuración.    |
| onBlock             | function | null        | Callback que se ejecuta al bloquear un evento.     |

## Instalación 📦

### Usando CDN

Agrega el siguiente script en el HTML de tu proyecto:

```html
<script src="https://cdn.jsdelivr.net/npm/copylockr@2.0/dist/copylockr.min.js"></script>
```

### Usando NPM

Instálalo mediante NPM con el siguiente comando:

npm install copylockr

### Impórtalo en tu proyecto

Para CommonJS:

```javascript
const CopyLockr = require('copylockr');
```

O usando ES Modules:

```javascript
import CopyLockr from 'copylockr';
```

### Uso 🚀
Configura y activa CopyLockr con tus ajustes personalizados. Por ejemplo:

```javascript
// Configuración personalizada
CopyLockr.config = {
  disableContextMenu: true,
  disableCopy: true,
  disableCut: true,
  disableDrag: true,
  disableSelect: true,
  disableDevTools: true,
  password: 'miContraseñaSecreta',
  customStyles: true,
  debug: false,
  onBlock: function(event) {
    console.log('Acción bloqueada:', event.type);
  }
};

// Activa la protección
CopyLockr.enable();
```
