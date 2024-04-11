# SenaProjectAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

----------------------------------------------------------------------------------

# Pruebas Unitarias

npm install -g karma-cli
karma --version
ng generate config karma

`ng test`:
  # Este comando inicia la ejecución de las pruebas unitarias en tu proyecto Angular.
  # Angular CLI se encarga de configurar Karma y Jasmine automáticamente.

`--no-watch`:
  # Esta opción desactiva el modo de observación (watch mode).
  # En otras palabras, no estará pendiente de cambios en los archivos y no volverá a ejecutar las pruebas automáticamente cuando detecte modificaciones.
  # Esto es útil si solo deseas ejecutar las pruebas una vez y no necesitas que se actualicen continuamente.

`--no-progress`:
  # Esta opción desactiva la visualización del progreso en la consola durante la ejecución de las pruebas.
  # Sin esta opción, ejecutar una barra de progreso mientras las pruebas se ejecutan.

`--browsers=ChromeHeadless`:
  # Especificar el navegador en el que queremos ejecutar las pruebas.
  # En este caso, utilizará Google Chrome en modo headless (sin interfaz gráfica).
  # El modo headless permite ejecutar Chrome sin abrir una ventana del navegador, lo que es útil para pruebas automatizadas en entornos de CI/CD o servidores
