# MOUSIKĒ · Encuesta del I Festival de Arte Rosalista
IED Los Rosales · Lunes 26 de octubre de 2026

## Archivos
- index.html: página principal.
- style.css: diseño adaptable a celular y computador.
- app.js: preguntas, navegación, validación y envío.
- config.js: única configuración del sitio.
- Code.gs: receptor para Google Apps Script.

No requiere instalar librerías ni compilar. Mantén los cuatro archivos de la página en la misma carpeta.

## 1. Crear la hoja de respuestas
1. En Google Drive crea una hoja de cálculo NUEVA: “MOUSIKĒ — Evaluación 2026”.
2. En esa hoja abre **Extensiones > Apps Script**.
3. Reemplaza el contenido del archivo Code.gs por el Code.gs de este paquete.
4. Guarda el proyecto con el nombre “MOUSIKĒ — Encuesta”.
5. En el selector de funciones elige **prepararHoja** y pulsa **Ejecutar**.
6. Autoriza el acceso solicitado por Google después de revisar los permisos.
7. Regresa a la hoja: debe existir la pestaña **Respuestas**, con 19 columnas y encabezados.

Usa un proyecto dedicado a esta encuesta. No pegues este código sobre un proyecto que ya recibe otras encuestas. La hoja permanece privada; los asistentes no necesitan acceso a ella. No habilites su publicación en la web.

## 2. Publicar el receptor
1. En Apps Script: **Implementar > Nueva implementación**.
2. Selecciona tipo **Aplicación web**.
3. **Ejecutar como:** Tú (propietario).
4. **Quién tiene acceso:** Cualquier usuario (incluye personas sin iniciar sesión).
5. Pulsa **Implementar** y copia la **URL de la aplicación web** terminada en **/exec**.
6. Abre esa URL en otra pestaña: debe devolver JSON con service MOUSIKE-2026 y ready true.

Si tu cuenta institucional no permite “Cualquier usuario”, pide al administrador que revise esa restricción o utiliza una cuenta que permita recibir respuestas públicas. La aplicación solo recibe y agrega evaluaciones; no ofrece un método para leer las respuestas.

## 3. Conectar el formulario
Abre config.js y sustituye la cadena vacía por la URL copiada:

window.MOUSIKE_CONFIG = Object.freeze({
  endpoint: "https://script.google.com/macros/s/TU_IMPLEMENTACION/exec"
});

Conserva las comillas y pega la URL completa /exec, no /dev ni la URL del editor.
No debes poner el ID de la hoja en GitHub ni claves de acceso.

## 4. Subir a GitHub Pages
Opción A: repositorio nuevo “mousike-2026”.
1. Sube index.html, style.css, app.js y config.js a la raíz del repositorio.
2. Settings > Pages > Deploy from a branch > main > / (root) > Save.
3. Espera a que GitHub muestre el enlace del sitio publicado.

Opción B: tu repositorio existente encuestas-tareas.
1. Crea una carpeta mousike y sube dentro los mismos cuatro archivos.
2. Conserva los archivos de las encuestas existentes.
3. Si Pages ya está habilitado desde main / (root), el formulario estará en la ruta /mousike/.
4. Usa el enlace de GitHub Pages, no la vista de index.html dentro de github.com.

Code.gs y este instructivo pueden conservarse fuera de GitHub: se usan para configurar el receptor, no para mostrar la página.

## 5. Verificar antes de compartir
1. Abre el sitio publicado en una ventana privada o de incógnito.
2. Confirma que ya NO aparece el aviso “Vista previa”.
3. Prueba avanzar sin contestar una pregunta obligatoria: debe solicitar la respuesta.
4. Comprueba el límite de tres partes favoritas.
5. Diligencia una evaluación identificable como prueba escribiendo PRUEBA en el comentario.
6. Pulsa Enviar mi evaluación y espera el agradecimiento.
7. Abre la pestaña Respuestas: confirma que se agregó una fila con los valores elegidos.
8. Elimina esa fila de prueba desde la hoja.
9. Prueba también desde un celular. Comparte el enlace solo después de verificar la fila.

La recepción real depende de tu implementación de Apps Script. Este paquete no incluye una implementación ya publicada y no se ha probado contra tu cuenta.

## Funcionamiento
- Encuesta en cuatro pasos, con las 10 preguntas propuestas.
- Preguntas 1, 3, 4, 5, 6 y 8 obligatorias. Institución, favoritos y comentarios opcionales.
- Escalas numéricas de 1 a 5; “No puedo valorarlo” se guarda como texto y no como cero.
- No solicita ni guarda nombre, correo, teléfono, cuenta Google o IP en la hoja.
- Los proveedores de alojamiento y Google pueden conservar sus propios registros técnicos.
- No se cargan analíticas, fuentes remotas ni bibliotecas de terceros.
- Los comentarios tienen máximo 500 caracteres y protección frente a fórmulas de hoja de cálculo.
- Fecha/hora del servidor en zona America/Bogota.
- Un identificador aleatorio por envío evita duplicados en reintentos de la misma respuesta.
- No guarda borradores en el dispositivo. Recargar la página borra lo diligenciado.
- Si hay un fallo de red, conserva lo escrito en pantalla. Solo muestra agradecimiento tras recibir confirmación del servidor.
- Sin URL configurada se muestra un aviso de vista previa y se desactiva Enviar.
- El receptor público no exige inicio de sesión ni verifica identidad: no garantiza una sola respuesta por persona ni evita por completo el spam.

## Si cambias Code.gs después de publicarlo
Implementar > Administrar implementaciones > Editar > Nueva versión > Implementar.
Si editas la misma implementación, su URL normalmente se conserva. Si creas otra, actualiza config.js.

## Problemas frecuentes
- ready false: ejecuta prepararHoja desde el editor del proyecto vinculado a la hoja.
- No aparece una fila: revisa permisos de la aplicación web y la URL /exec.
- Hay error de confirmación: verifica la hoja antes de reintentar; el identificador del envío evita duplicados en la misma página.
- Google muestra HTML o inicio de sesión en vez de JSON: la implementación no admite acceso anónimo o estás usando /dev.
- No carga el diseño: style.css y app.js deben estar en la misma carpeta que index.html.
- Cambiaste las preguntas: actualiza también la validación y los encabezados en Code.gs. No reordenes las columnas de Respuestas mientras está activa.

## Estado de entrega
Página y receptor preparados para instalar. No se ha publicado en GitHub ni creado una hoja en Google Drive.

