Ceci est un projet de Test afin de tester les compétences et les connaissances de base de candidats.

L'objectif est de développer un CRUD pour la gestion des utilisateurs sur le front et implémenter les roots coté back.
Dans la partie front il faut récupérer la liste des utilisateurs, les afficher dans un tableau, pourvoir séléctionner un utilisateur, evoyer les modifications au back,supprimer cet utilisateur 

les APIS disponibles : 

[POST]  /api/user/create : permet de créer 10 utilisateurs et l'utilisateur test dont le mot de passe est connu (voir section API)

[POST]  /api/login_check : authentification 

[GET]   /api/user/all => permet de récupérer la liste de tous les utilisateurs 


Les apis à développer (back-end) sont :

[PUT] /api/user/{id}/edit => permet d'éditer un utilisateur  
[DELETE] /api/user/{id}/delete permet de supprimer un utilisateur 

/!\ Pour les devs uniquement FRONT il faut considérer comme-ci les API put et delete sont developpées. 


0- Prerequis 
    
 Afin de bien installer l'environnement, il faut :

    0.1- Télécharger et installer sur votre machine docker desktop.Lien de téléchargement est : https://www.docker.com/products/docker-desktop/. Téléchargez et installez la version adéquate avec votre OS. 

    0.2 Télecharger et installer git 
    Lien de téléchargement pour windows :https://gitforwindows.org/

    0.3 Téléchargez Postman pour tester les APIs( optionnel)

1- Installation de l'environnement 

    1.1 cloner le projet en local 
    git clone https://github.com/200FactoryGit/FullStack.git
    1.2 builder le projet
    cd FullStack pour se mettre dans le dossier du projet  
    docker-compose up --build
    
1.bis- Attendez la finalisation de Build de tous le conteneurs 
    
    Il est possible que l'installation de l'environnement prenne quelques minutes. Il faut s'assurer que les deux contenuers php et front ont bien finalisé le lancement de toutes les commandes. Si le back n'est pas connecté (http://localhost:8080/ renvie 501 Bad getway) il faut démarrér le serveur symfony manuellement dans le conteneur php. Pour ce faire il faut ouvrir le terminal de ce conteneur (PHP) et taper la commande symfony server:start 
    

    En attendant la finalisation de l'installation il est possible de faire les étapes 2 et 5   

2- si dans votre arborescence de projet vous ne voyez pas le dossier jwt sous symfony/confing/jwt
    
    lancez ces commandes a la main une par une dans le terminal du conteneur php 

    - mkdir -p config/jwt
    - echo "test" > config/password.txt
    - openssl genrsa -passout file:config/password.txt -out config/jwt/private.pem -aes256 4096
    - openssl rsa -passin file:config/password.txt -pubout -in config/jwt/private.pem -out config/jwt/public.pem
    - chmod 755 -R config/jwt/*

3- Lancez le Front et le back 
    
    Le conteneur php contient l'environnement du back il est configuré sous l'url localhost:8080

    C'est la version 6.0.1 de symfony qui est installée 
    Le contenueur front contient l'environnement du front  il est configuré sous l'url localhost:4200

    C'est la version d'Angular 12 qui est installé avec la version 14 de Node 

3.bis- Lancez la migration afin de mettre à jour la base des données 
   
    3.bis.1
    php bin/console make:migration
    3.bis.2 
    php bin/console doctrine:migrations:migrate

5- Le dossier API contient Une collection POSTMAN qui permet de tester les APIs developpées ou a developper 
    
    5.1 CreateUsers 
        cette API permet de créer 11 utilisateurs :
        l'utilisateur test@test.com avec un mdp test et 10 autres utilisateurs créés par Faker 
    5.2 Login_check :
        Méthode d'authentification 
    5.3 all_users 
        Permet de lister les utilisateurs et renvoyer userId et username dans la même collection Json 
5.bis- Dans POSTMAN

    - Importez la collection enregistrée dans le dossier API 
    - Créez une varialble globale token.

6-Utilisez la route CreateUsers au moins une fois afin de créer des utilisateurs et utiliser le compte test@test.com avec le mdp test pour tester l'authentification

    L'utilisation de cette route est autorisée sans authentification avec la route login_check. Cependant, la route getUsers nécessite la récupération de Token. Ce token est retourné par une authentification correcte. Toutes les routes crées doivent être obligatoirement protegée a minima par ce Token.
