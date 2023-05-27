Prerequis:
Angular CLI 9
Wamp
PHP 7.2
Composer 
Node JS 

Run server (api) with this command:
php -S localhost:8000 -t public/

Angular with : ng serve

Configuring DB :
php bin/console d:d:c
php bin/console d:s:u --force

Creeer un user de role admin dans la base des données puis vous lancer le script de creation de fakes users .
api/user/create-list [POST]