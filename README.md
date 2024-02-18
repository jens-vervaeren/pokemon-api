# Pokemon API Test

### Setting up the project for the first time

When starting out with the project, first build containers with the following command:

```
docker-compose build
```

Then create the .env.development file in the api folder with the following contents:

```
ENV=development
DATABASE_URL="postgresql://postgres@poke_api_postgres:5432/pokemon?schema=public"
POKEMON_API_BASE_URL="https://pokeapi.co/api/v2"
```

After this, run the setup with:

```
docker-compose up -d
```

When the setup is running, go into the running poke_api_postgres container with the following command:

```
docker exec -it poke_api_postgres sh
```

Check if the pokemon database exists and if not, create it

```
psql -U postgres
CREATE DATABASE pokemon; // only if it doesn't exist
```

Exit the postgres container and go into the running poke_api container with the following command:

```
docker exec -it poke_api sh
```

When inside the running container, install the npm packages and run the Prisma migrations

```
npm install
npm run prisma:migrate:dev
```

When this is done exit the container and restart the poke_api container so the nestjs service can launch properly.
This can be done with:

```
docker-compose restart
```

You should now be able to make requests against the api on http://localhost:3000

### Running commands

The projects has two CLI commands you can run inside of the poke_api container, one for importing pokemon from an external api and the other for importing from a file
The following commands can be run:

```
npm run run:command import-pokemon-from-api -- --input {idOrPokemonName}
npm run run:command import-pokemons-from-file -- --file {fileName}
```

For the import-pokemons-from-file command, the file has to be present in the seeds folder of the api
