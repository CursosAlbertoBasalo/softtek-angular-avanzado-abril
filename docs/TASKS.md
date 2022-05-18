# Ejercicio propuesto

> Una web para reservas de viajes espaciales (Astro Bookings)

## 0. Estructura y configuración de la aplicación

- [x] Mostrar un listado de las agencias de viajes colaboradoras
- [x] Mostrar un listado de los viajes disponibles

## 1. Componentes para presentación de información

- [x] Mostrar un mensaje mientras se está cargando la información
- [x] Mostrar un mensaje de error cuando no puede cargar la información
- [x] Mostrar un mensaje de advertencia cuando no hay datos disponibles
- [x] Mostrar los datos en modo lista
- [x] Transformar los enumerados en iconos

## 2. Rutas, datos y control de accesos

- [x] Una página para la gestión de agencias espaciales
- [x] Resolver los datos antes de entrar en la página
- [x] Una página para el alta de una nueva agencia
- [x] Proteger la entrada a la página de usuarios no autorizados
- [x] Redirigir a los no autenticados a la página de login
- [x] Redirigir tras el login a la página de inicio
- [x] Proteger la salida para datos no guardados
- [x] Mostrar viajes anidados para una agencia
- [x] Mostrar un panel auxiliar en el footer para indicar la lección actual

## 3. Formularios y validación

- [x] Formulario de registro de usuario
- [x] Validaciones de campos obligatorios
- [x] Validaciones asíncrona de email
- [x] Validaciones duplicada de contraseña
- [x] Usar componente email común (CVA)
- [x] Usar componente genérico como template (CVA)
- [x] Re utilización de lógica de formularios

## 4. Inyección de dependencias

- [x] Servicio pesado para cálculos de precios
- [x] Servicios para mostrar pesos en distintos sistemas de medidas
- [x] Servicio de Logging
- [x] Provider as a resolver para un componente

## 5. RxJS y HTTP

- [x] Caché de llamadas HTTP (filter, tap)
- [x] Gestión de estado de las comunicaciones HTTP (para usar más adelante con un store)
- [x] Control de errores de las comunicaciones HTTP (retryWhen, catchError, mergeMap)
- [x] Obtener lista de viajes de la agencia activa (switchMap vs mergeMap)
- [x] Obtener total de plazas ofertadas por todas las agencias (forkJoin)
- [x] Un buscador de vuelos (fromEvent, debounceTime, distinctUntilChanged)
- [x] Compartir resultados asíncronos (share, shareReplay)

## 6. Redux

- [x] Un Store reactivo para comunicar datos entre elementos desacoplados
- [ ] Uso para el estado de las llamadas HTTP
