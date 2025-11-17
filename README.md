# Tennis-players

### Application de joueurs de tennis.

Cette application permets de retourner tous les joueurs de tennis disponible dans la base de donnée, de retourner un joueur spécifique et d'ajoutet un joueur de tennis.
Elle permets aussi le calcul de statistiques : 
- Pays qui a le plus grand ratio de parties gagnées

- IMC moyen de tous les joueurs

- La médiane de la taille des joueurs

### Pour tester l'application en local : 
---

=> git clone https://github.com/Liliane99/Tennis-players.git

=> docker compose up --build

=> Munissez-vous d'un postman ou faire des curl sur l'api afin de la requêter

Curl Get http://localhost:3000/players/

Curl Get http://localhost:3000/players/:id

Curl Post http://localhost:3000/players/

Curl Get http://localhost:3000/players/statistics

### Pour tester l'application en production 
---

Curl Get URL en production : https://tennis-players-production.up.railway.app

Curl Get https://tennis-players-production.up.railway.app/players/

Curl Get https://tennis-players-production.up.railway.app/players/:id

Curl Post https://tennis-players-production.up.railway.app/players/

Body : 
```
{
    "firstname": "",
    "lastname": "", 
    "shortname": "",
    "sex": "M",
    "picture": "https://example.com/federer.jpg",
    "country": {
      "picture": "https://example.com/switzerland.png",
      "code": ""
    },
    "data": {
      "rank": ,
      "points": ,
      "weight": ,
      "height": ,
      "age": ,
      "last": [, , , , ]
    }
  }
  ```

Curl Get https://tennis-players-production.up.railway.app/players/statistics


### Architecture en DDD 
---

___ Domain 

___ Application

___ Infrastrcture

