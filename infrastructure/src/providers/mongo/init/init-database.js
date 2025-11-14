print('=== Initializing Tennis Players Database ===');
db = db.getSiblingDB('tennis-players');

print('Creating collections...');

db.createCollection('players', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['id', 'firstname', 'lastname', 'shortname', 'sex', 'picture', 'country', 'data'],
      properties: {
        id: {
          bsonType: 'string',
          description: 'Player ID must be a string'
        },
        firstname: {
          bsonType: 'string',
          description: 'First name must be a string'
        },
        lastname: {
          bsonType: 'string',
          description: 'Last name must be a string'
        },
        shortname: {
          bsonType: 'string',
          description: 'Short name must be a string'
        },
        sex: {
          enum: ['M', 'F'],
          description: 'Sex must be either M or F'
        },
        picture: {
          bsonType: 'string',
          description: 'Picture URL must be a string'
        },
        country: {
          bsonType: 'object',
          required: ['picture', 'code'],
          properties: {
            picture: {
              bsonType: 'string',
              description: 'Country picture URL'
            },
            code: {
              bsonType: 'string',
              description: 'Country code'
            }
          }
        },
        data: {
          bsonType: 'object',
          required: ['rank', 'points', 'weight', 'height', 'age', 'last'],
          properties: {
            rank: {
              bsonType: 'int',
              description: 'Player rank'
            },
            points: {
              bsonType: 'int',
              description: 'Player points'
            },
            weight: {
              bsonType: 'int',
              description: 'Player weight in grams'
            },
            height: {
              bsonType: 'int',
              description: 'Player height in cm'
            },
            age: {
              bsonType: 'int',
              description: 'Player age'
            },
            last: {
              bsonType: 'array',
              items: {
                bsonType: 'int'
              },
              description: 'Last matches results'
            }
          }
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation date'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Last update date'
        }
      }
    }
  }
});

print('Creating indexes...');
db.players.createIndex({ "id": 1 }, { unique: true });
db.players.createIndex({ "shortname": 1 }, { unique: true });
db.players.createIndex({ "lastname": 1, "firstname": 1 });
db.players.createIndex({ "sex": 1 });
db.players.createIndex({ "data.rank": 1 });
db.players.createIndex({ "country.code": 1 });


print('=== Database initialized successfully ===');
print('Players collection created with ' + db.players.countDocuments() + ' sample players');
