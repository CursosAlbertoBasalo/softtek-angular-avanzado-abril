# Curso Avanzado Angular

## Configuracion Typescript

### Alias para rutas de importación

Se puede establecer un alias acortado para rutas de importación en ``tsconfig.json``

Dentro de ``compilerOptions`` con la clave ``paths``
```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2017",
    "module": "es2020",
    "lib": [
      "es2020",
      "dom"
    ],
    "paths": {
      "@stk/services/*": [
        "./src/app/core/api/services/*",
      ],
      "@stk/models/*": [
        "./src/app/core/api/models/*",
      ],
      "@stk/shared/*": [
        "./src/app/shared/*",
      ],
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```
## Crear sufijos para nombrar componentes

En el archivo ``.eslintrc.json`` podemos indicar que sufijos podemos usar para el nombre de archivos y clases a la hora de crearlos con el CLI:

dentro de ``overrides -> rules``
```json
      "@angular-eslint/component-class-suffix": [
          "error",
          {
            "suffixes": [
              "Component",
              "List",
              "Form",
              "Page",
              "Widget"
            ]
          }
        ]
```

a la hora de crear un componente mediante CLI podemos seleccionar que tipo de sufijo usando ``--type``

```bash
ng generate component modules/public/components/agencies --type List --module public
```

## Componentes

**Definicion**
https://ngchallenges.gitbook.io/project/componentes

### Componentes contenedores vs Componentes de presentación

Los componentes contenedores serán los encargados de la lógica y obtención de los datos para servirlos a los componentes de presentación. Para reducir el boilerplate de cada componente contenedor se podrá usar un servicio que se encargué de llamadas y lógica con los datos a modo de fachada y siguiendo el principio de separación de responsabilidades. Los componentes contenedores también pueden ser llamados ``views`` o ``pages``. Dentro de una jerarquia serán los padres de componentes de presentación.

Ejemplo:

En modules tenemos un modulo para login compuesto por un componente contenedor llamado login-page que servirá para mostrar un componente de presentación llamado login-form. login-form lo único que hará será mostrar el formulario de login, mostrar mensajes de error de validación y emitir los datos de login recogidos del usuario hacía el componente contenedor. El componente contenedor será el encargado de las llamadas y de redireccionar al usuario. Podrá emplear un servicio para reducir su complejidad.
```
|-- app
     |-- modules
        |-- login
           |-- components
              |-- [+] login-form
           |-- pages
              |-- [+] login-page
           |-- [+] services
           |-- login-routing.module.ts
           |-- login.module.ts
       |-- public
           |-- [+] components
           |-- [+] pages
           |-- [+] services
           |-- home-routing.module.ts
           |-- home.module.ts
     |-- core
       |-- [+] authentication
       |-- [+] guards
       |-- [+] interceptors
       |-- [+] mocks
       |-- [+] services
       |-- core.module.ts
       |-- ensureModuleLoadedOnceGuard.ts
       |-- logger.service.ts
     |
     |-- shared
          |-- [+] components
          |-- [+] directives
          |-- [+] pipes
          |-- [+] models
     |
     |-- [+] configs
|-- assets
     |-- scss
          |-- [+] partials
          |-- _base.scss
          |-- styles.scss
```

Los componentes de presentación recibirán los datos mediante ``@Input()`` y también podrán emitir datos hacia el componente contenedor mediante ``@Output()``


### ng-template, ng-container y ng-content

#### ng-template

ng-template es un elemento de plantilla que Angular usa con directivas estructurales (*ngIf, *ngFor, [ngSwitch] y directivas personalizadas). Estos elementos de plantilla solo funcionan en presencia de directivas estructurales, que nos ayudan a definir una plantilla que no representa nada por sí misma, sino que los representa condicionalmente al DOM. Nos ayuda a crear plantillas dinámicas que se pueden personalizar y configurar.
  
 ```html
<div> 
   Ng-template Content 
   <div *ngIf="condition; else showNgTemplateContent"> 
      content 1
   </div>
</div>
 
<ng-template #showNgTemplateContent> 
   content 2
</ng-template>
 ```
  
En el ejemplo anterior, si la condición en directiva ``*ngIf`` es true o no undefined, mostraremos "content 1", de lo contrario, mostraremos el contenido de la plantilla ``ng-template`` con referencia ``#showNgTemplateContent`` y mostrará "content 2".

#### ng-container

ng-container es una directiva extremadamente simple que permite agrupar elementos en una plantilla que no interfiere con los estilos o el diseño porque Angular no lo incluye en el DOM. Esto es útil si no desea ningún div adicional en DOM.

A la hora de cargar una plantilla con ng-template es más correcto cargarla con ng-container:

```html
<div> 
   Ng-template Content 
   <ng-container *ngIf="condition; else showNgTemplateContent"> 
      content 1
   </ng-container>
</div>
 
<ng-template #showNgTemplateContent> 
   content 2
</ng-template>
```

En el ejemplo anterior, si la condición en directiva ``*ngIf`` es true o no undefined, mostraremos "content 1", de lo contrario, mostraremos el contenido de la plantilla ``ng-template`` con referencia ``#showNgTemplateContent`` y mostrará "content 2".

Otro Ejemplo usando atributo ``[ngTemplateOutlet]`` que permite indicar la referencia a una plantilla:

```html
<ng-container [ngTemplateOutlet]="showNgTemplateContent">
</ng-container>

<ng-template #showNgTemplateContent> 
   content 2
</ng-template>
```

Si se desea cargar una plantilla u otra de manera condicional en un ng-container podemos usar la directiva ``*ngTemplateOutlet``

```html
<ng-container *ngTemplateOutlet="showTemplate === 1 ? showNgTemplateContent1 : showNgTemplateContent2">
</ng-container>

<ng-template #showNgTemplateContent1> 
  content 1 
</ng-template>

<ng-template #showNgTemplateContent2> 
  content 2 
</ng-template>
```
También se puede mandar datos a la plantilla que se quiere cargar de varias maneras:

Usando ``[ngTemplateOutletContext]`` en ng-container:

```html
<ng-container [ngTemplateOutlet]="showNgTemplateContent3"
              [ngTemplateOutletContext]="{ $implicit: dataTest }">
</ng-container>

<ng-template #showNgTemplateContent3 let-data> 
   content 3 : {{ data }}
</ng-template>
```
``$implicit`` sirve para mandar el valor del dato sin indicar un nombre de variable. En la plantilla se podrá asignar cualquier nombre al valor recibido usando la nomenclatura ``let-nombreVar``.

Otra manera sería indicando también el nombre de la variable y su valor desde ng-container:

```html
<ng-container [ngTemplateOutlet]="showNgTemplateContent4"
              [ngTemplateOutletContext]="{ name: dataTest }">
</ng-container>

<ng-template #showNgTemplateContent4 let-data="name"> 
   content 4 : {{ data }}
</ng-template>
```
En este caso no se usa ``$implicit`` en ng-container y en su lugar se indica un nombre de variable. En el ng-template habrá que asignar en ``let-variable`` a que variable hace referencia.

Usando ``*ngTemplateOutlet`` en ng-container sería muy similar:

```html
<ng-container *ngTemplateOutlet="showNgTemplateContent5 ; context: { $implicit: dataTest } ">
</ng-container>

<ng-template #showNgTemplateContent5 let-data> 
   content 5 : {{ data }}
</ng-template>
```

```html
<ng-container *ngTemplateOutlet="showNgTemplateContent6 ; context: { name: dataTest } ">
</ng-container>

<ng-template #showNgTemplateContent6 let-data="name"> 
   content 6 : {{ data }}
</ng-template>
```

```html
<ng-container *ngTemplateOutlet="showTemplate === 1 ? showNgTemplateContent7 : showNgTemplateContent8 ; context: { $implicit: dataTest }">
</ng-container>

<ng-template #showNgTemplateContent7 let-data> 
  content 7 : {{ data }}
</ng-template>

<ng-template #showNgTemplateContent8 let-data> 
  content 8 : {{ data }}
</ng-template>
```

#### ng-content

ng-content se utiliza para **proyectar contenido en otros componentes**. Utiliza la etiqueta ``<ng-content></ng-content>`` como marcador de posición para ese contenido dinámico, luego, cuando se analiza la plantilla, Angular reemplazará esa etiqueta de marcador de posición con su contenido.

Por ejemplo, se tiene dos componentes, uno como parent y otro como child. Se desea mostrar algunos datos en el componente child que provengan desde el componente parent.

parent.component.html
```html
<p>Parent Component</p>
<app-child>
  <div>Child Component content details</div>
</app-child>
```
dentro del selector del componente child se indica una serie de contenidos que se desea que se proyecten en el componente child

child.component.html
```html
<p>Child Component</p>
<ng-content></ng-content>
```
en ng-content se proyectara el contenido indicado en el componente parent.

ng-content acepta un atributo ``select`` , que nos permite definir y seleccionar atributos a modo de filtro para los elementos que se vayan a proyectar. Ejemplo:

parent2.component.html
```html
<p>Parent2 Component</p>
<app-child2>
  <div question1>
    <label>Question1?</label>
    <input type="text" />
  </div>

  <div question2>
    <label>Question2?</label>
    <input type="text" />
  </div>

  <div question3>
    <label>Question3?</label>
    <input type="text" />
  </div>
</app-child2>
```
child2.component.html
```html
<p>child2 proyecta contenido filtrando elementos</p>
<ng-content select="[question1], [question3]"></ng-content>
```

En child2 solo se proyectarán los divs que contengan los atributos ``question1`` o ``question3``

https://stackblitz.com/edit/angular-ivy-bky1zq?file=src/app/app.component.html

## Angular Router

Con Angular Router podremos crear:
- Rutas a componentes contenedores
- Rutas en las que se pasan parámetros
- Subrutas en modulos y cargar modulos(con sus subrutas) dependiendo de la ruta mediante ``lazyloading``
- Proteger rutas con mediante ``Guards``
- Precargar datos de un servicio antes de cargar una ruta mediante ``Resolvers``

Además de esto, disponemos de mecanismos para hacer redirecciones y crear menus de navegación.

![nav-diagram](https://user-images.githubusercontent.com/5833528/165269470-67830b6a-cccb-43a5-bcaa-472ed05d98f7.png)

Mas info -> https://docs.angular.lat/tutorial/toh-pt5
            
Mas info -> https://soka.gitlab.io/angular/conceptos/routing/proyecto-basico-routing/proyecto-basico-routing/

Ejemplo simple de enrutador:
https://stackblitz.com/edit/angular-wtpscq?file=src%2Fapp%2Fapp-routing.module.ts

### LazyLoading

El ``Lazy Loading`` es un método para limitar los módulos que se cargan y solo cargar los que el usuario necesita actualmente. Esto puede mejorar el rendimiento de una aplicación y reducir el tamaño del paquete inicial.

Ejemplo:

En una aplicación angula primero creamos un nuevo módulo:

``ng generate module shop --route shop --module app.module``

Ahora vamos a crear 3 componentes dentro del módulo creado:

El primero será un componente cart:

``ng generate component shop/cart --module shop``

El segundo será un componente checkout:

``ng generate component shop/checkout --mpdule shop``

El tercero será un componente confirm:

``ng generate component shop/confirm --module shop``

Los tres componentes se ubicarán en el directorio shop.

En el enrutamiento principal, añadimos una ruta ``shop`` que cargue el modulo:

src/app/app-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'shop', 
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

A ``loadChildren`` se le pasa una función que retorna la importación dinámica del módulo solo cuando sea necesario, en este caso cuando se acceda a la ruta ``shop`` se cargará el modulo. La importación dinámica se basa en promesas y le da acceso al módulo.

Lo siguiente es configurar rutas específicas para el módulo específico ``shop``:

src/app/shop/shop-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'confirm', component: ConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
```

src/app/shop/shop.module.ts

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    ShopComponent,
    CartComponent,
    CheckoutComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
```

Ahora cuando se navegue a /shop, /shop/checkout o /shop/confirm y módulo shop se cargará, no antes.

https://stackblitz.com/edit/angular-lazy-loading-vha9is?file=src%2Fapp%2Fapp-routing.module.ts

### Route Resolvers

Angular Route Resolver se utiliza para obtener algunos datos antes de cargar una ruta. Se puede definir como un middleware para mejorar la experiencia del usuario mediante la carga de datos antes de que el usuario navegue a un componente en particular.

Este ejemplo está basado para entrar a una vista del perfil de un usuario, así que de esta forma quedaría el resolver.

```ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProfileResponse } from '@interfaces/profile-response.interface';
import { Observable } from 'rxjs';
import { UsersService } from '@services/users.service';

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<ProfileResponse> {

    constructor(private usersService: UsersService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ProfileResponse> {
        return this.usersService.findUser()
    }
}
```

Ahora, necesitamos ir al archivo de rutas de nuestra aplicación y aplicar el resolver en un componente o módulo lazy.

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileResolver } from '@resolvers/profile.resolver';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', loadChildren: () => import('../main/main.module').then(m => m.MainModule) },
      {
        path: 'profile',
        resolve: {
          profile: ProfileResolver // RESOLVER ESTA AQUÍ
        },
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
```

Si bien, el resolver se está aplicando sobre la ruta 'profile' y en esa ruta profile se está cargando un módulo de forma lazy.
También es posible aplicarlo sobre un componente y no en un módulo perezoso.

Ahora en el componente ya no necesitamos invocar el servicio para realizar la llamada, porque el resolver realizó esta llamada antes de entrar a la página, y para recuperar los datos retornados por el servidor se puede hacer de la siguiente manera.

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: ProfileResponse;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.currentUser = this.route.snapshot.data.profile;
  }
}
```
Algunas veces si la obtención de los datos mediante el resolver tarda unos segundos se puede mostrar un ``loading..`` con texto o un grafico animado, esto se puede implementar de varias maneras:

Con un loader simple en AppComponent:

app.component.html

```html
<div class="loader" *ngIf="isLoader">
  <div>Loading...</div>
</div>
<router-outlet></router-outlet>
```

app.component.ts

```ts
import { Component } from "@angular/core";
import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationEnd
} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  isLoader: boolean;

  constructor(private _router: Router) {}

  ngOnInit() {
    this.routerEvents();
  }

  routerEvents() {
    this._router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoader = true;
          break;
        }
        case event instanceof NavigationEnd: {
          this.isLoader = false;
          break;
        }
      }
    });
  }
}
```

Cuando comience la navegación, el valor de ``isLoader`` será true se mostrará el loader. Después de que el resolver termine su tarea de obtención de los datos, se ocultará el loader.

Otra forma sería usando un interceptor:

ejemplo con interceptor -> https://www.angulartip.com/caso-de-usos/interceptores/loading

más info -> https://www.pluralsight.com/guides/prefetching-data-for-an-angular-route

### Guards

Hay veces que queremos que determinadas áreas de nuestra aplicación web estén protegidas y solo puedan ser accedidas si el usuario ésta logueado (un panel de control por ejemplo) o incluso que solo puedan ser accedidas por determinados tipos de usuarios. 

Para conseguir esto con Angular se usan los ``guards``. Los Guards en Angular, son de alguna manera: middlewares que se ejecutan antes de cargar una ruta y determinan si se puede cargar dicha ruta o no.

Con su uso es posible estructurar el código de la aplicación de una manera más organizada y donde la lógica de la ruta está en la ruta en sí y la lógica de permisos y acceso a recursos se encuentra aislada.

Existen 4 tipos diferentes de Guards que son los siguientes:

- CanActivate : decide si se puede activar una ruta, esta protección no es la mejor para módulos lazy-loading, ya que esta protección siempre cargará el módulo en la memoria, incluso si el guard devolvió falso.
- CanLoad : decide si un módulo de una ruta se puede cargar. Esto resulta útil para los módulos lazy-loading. Ni siquiera se cargarán si el guard devuelve falso.
- CanActivateChild: Funciona de la misma manera que CanActivate, la única diferencia es que se utiliza para rutas hijas.
- CanDeactivate: Es lo opuesto a CanActivate, según una condición, nos permite salir de una ruta o una página. Se puede utilizar por ejemplo, cuando tenemos un formulario y queremos preguntar si desea descartar los cambios del mismo.

#### Implementación de guards

Con el CLI de angular podemos generar un guard usando el comando:

``ng g guard core/auth --implements CanActivate``

Los guards se implementan como si fuera un servicio, con el decorador ``@Inyectable``.

```ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, 
RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
```
En el método ``canActivate()`` se hace la comprobación. Si el usuario no está logueado lo llevamos a la página de login con router.navigate y devolvemos false. Si esta logueado, devolvemos true.

con ``canLoad()``

```ts
import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  canLoad(route: Route): boolean {

    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: route.path } });
    return false;
  }

}
```

Para que funcione, tenemos que importar el guard en el app.module.ts, en la sección providers en el caso de no haber indicado el parámetro providedIn:'root'

Para usar un guard en una ruta, lo importamos en el archivo de rutas y añadimos un campo a la ruta llamado canActivate con el guard que acabamos de crear:

``{ path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard] },``

con CanLoad

```ts
{
    path: 'dashboard',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
},
```
Si el Guard implementa varios métodos y se quieren aplicar en una misma ruta:

```ts
{
    path: '',
    canActivate: [NewGuard],
    component: NewComponent,
    canDeactivate: [NewGuard],
},
```

mas info:

https://levelup.gitconnected.com/route-guards-angular-1ea6e596ce65
https://www.angulartip.com/caso-de-usos/guards