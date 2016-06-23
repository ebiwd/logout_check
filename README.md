# logout_check module
A background JS-based check to see if user is still logged in, and warn the user if their session is invalid.

No dependencies.

## Installation
1. Place the logout_check folder in your drupal/modules folder (or if multisite and this
  module is meant to be available to just one site in drupal/sites/www.YOURSITE.com/modules)

2. Enable the logout_check module at administer > modules

3. Ensure the correct admin users have permissions to administer the logout_check module at
  administer > people > permissions

4. Set-up the module at administer > configure > people > logout_check

## to dos
- add a check to only do on foreground tab or on mouse move, maybe... because the user could logout and log back in and the session wouldn't match on form submit ...
- make a page that is lighter than /user/uid/edit (~20KB)
