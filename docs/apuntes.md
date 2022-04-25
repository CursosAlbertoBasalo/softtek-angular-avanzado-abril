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


