# Command Line Interface

```bash
################################################################################
# 0️⃣ - Initialize the project
################################################################################

# Install the CLI
npm i -g @angular/cli
# and create a new project with minimal boilerplate
ng new softtek-angular-avanzado-abril --inline-style --prefix stk --routing true --skip-tests --style css
# ... or execute from the internet
npx ng new softtek-angular-avanzado-abril --inline-style --prefix stk --routing true --skip-tests --style css

# Add prettier and eslint to the project
ng add @angular-eslint/schematics
npm install prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev
npm run lint

## Add auxiliary dependencies (CSS framework and API server)
#===============================================================

npm i @picocss/pico
# :root { --spacing: 0.6rem; } on styles.css
npm install -D json-server json-server-auth
# database folder with routes an db json files

# Start the application and the API server
npm start
npm run api

## Clear initial component and styles
#====================================

# Create a Core module for header and footer components
ng g m core --module app.module.ts
ng g c core/components/header --export true
ng g c core/components/footer --export true

# Create Api folder with models and services
ng g s api/services/agencies
ng g interface api/models/agency --type interface
ng g enum api/models/agencyRange --type enum
ng g enum api/models/agencyStatus --type enum
ng g s api/services/trips
ng g interface api/models/trip --type interface
ng g enum api/models/tripKind --type enum
ng g enum api/models/tripStatus --type enum

# Create Shared module for components, directives and pipes
ng g m shared
ng g c shared/components/preview --export true
ng g c shared/components/loading --export true
ng g c shared/components/error --export true
ng g c shared/components/empty --export true
ng g c shared/components/refresh --export true

# Create Home module for home page
ng g m home --module app.module.ts --route 'home'
ng g s home/home

################################################################################
# 1️⃣ - Components
################################################################################

## Functional Presentational components
#====================================
# Container and templates as a presentational components
ng g c home/agencies --type list
ng g c home/trips --type list

ng g c shared/components/asyncWrapper --export true


## Async wrapper
#===============

# Responsible of async data loading, error detection and template rendering
# TemplateRef as input parameter
# Data$ as input parameter, with get set methods
# Container with templateOutlet and templateContext

# Pipes
#======
ng g p shared/pipes/agencyRange --export true


################################################################################
# 2️⃣ - Router
################################################################################

# Create module for the agencies page
ng g m agencies --module app.module.ts --route 'agencies'
# Resolver to get agencies before page load
# Use RxJs pipes to catch errors
ng g r agencies/agencies

# Create module for new agency page
ng g m agencies/new --module agencies.module --route 'new'

# Can Load guard to prevent loading data before page load
#=========================================================

# Protect against unauthorized access, prevent downloading the lazy module
# Register the guard on the router with the loadChildren function
# Redirect user to login, but with returnUrl as a parameter
ng g guard core/authenticated --implements CanLoad

# Create a login page
# Return to url after login
ng g m auth/login --module app.module --route 'login'

# Can Activate and Can Deactivate guards
#=======================================

# Protects against data needed (activate) or not saved (deactivate)
# Register the guard where the component is used
ng g guard agencies/new/new --implements CanActivate --implements CanDeactivate
# Delegate responsibility to the component and a dialog
ng g c shared/components/deactivation --type dialog --export true


# Nested routes
#=======================================

# agencies/:agencyID -> trips
ng g m agencies/trips --module agencies-routing.module --route ':id'
# Move to children route at agencies-routing module
# Add router outlet to the parent component (AgenciesComponent)
# snapshot versus observable

# Auxiliary routes
#=======================================

ng g c core/components/infoAux --export true
# Add an auxiliary outlet at footer
# Use auxiliary routes at header
# Configure auxiliary outlets at main router

################################################################################
# 3️⃣ - Forms
################################################################################

ng g m auth/register --module app.module --route 'register'
# Reactive form with validators
ng g c auth/register/register --type form

## Validations
#============

# Custom and form validators
ng g s shared/controls/validators

# Async validator for email
ng g interface core/api/models/user --type interface
ng g s core/api/services/users
ng g s auth/register/userValidators

```
