# RNYD - Frontend Angular

Este es el frontend de la aplicación **RNYD**, hecho con Angular. Está dividido por módulos según los tipos de usuarios: visitantes, usuarios registrados y administradores. Consume una API en Spring Boot para mostrar información sobre suscripciones, dietas, entrenamientos y perfiles.
### Importante 
- Se necesita tener creado el usuario administrador (desde la aplicación Postman o desde la bbdd mediante SQL) para poder crear y asignar las rutinas
- Imprescindible antes de ejecutar el proyecto por terminal los comandos importantes de Angular (npm install -g @angular/cli  o npm install , ng serve, ) 
## Tecnologías usadas

- Angular 17
- TypeScript
- SCSS
- RxJS
- Angular Router
- Angular Material (solo algunos componentes)

## Estructura del proyecto

```
src/app/
-  account/         --> Vistas y componentes de usuario registrado
- admin/           --> Panel de administración (dietas, entrenamientos)
- auth/            --> Login y registro
- core/            --> Servicios, guards y lógica compartida
- guest/           --> Vistas públicas (home, resultados)
- hared/          --> Componentes reutilizables (header, botones, pipes)
app.module.ts    --> Módulo principal
app-routing.module.ts --> Rutas generales
```

## Cómo levantar el proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/rnyd-front.git
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Levanta el servidor:
   ```bash
   ng serve
   ```

4. Abre en el navegador:  
   `http://localhost:4200`

## Funcionalidades principales

### Visitantes (Guest)

- Ver página de inicio
- Comprobar resultado de suscripción (`/subscription-result`)

### Autenticación

- Registro de usuario
- Inicio de sesión
- Guards para proteger rutas privadas

### Usuario registrado

- Ver perfil y progreso
- Acceso a su dieta y entrenamiento personalizado

### Administrador

- Gestión de dietas
- Gestión de entrenamientos
- Panel de administración accesible solo con rol admin

## Notas

- Este proyecto depende del backend en Spring Boot.  
  Asegúrate de que esté levantado en el puerto correspondiente (`http://localhost:8080` por defecto).

