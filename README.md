# Pokemon API Test

### Setting up the project for the first time

When starting out with the project, first build the api container with the following command:

```
docker-compose build
```

After this, run the setup with:

```
docker-compose up -d
```

When the setup is running, go into the running poke_api container with the following command:

```
docker exec -it poke_api sh
```

When inside the running container, install the npm packages with:

```
npm install
```

When this is done exit the container and restart the poke_api container so the nestjs service can launch properly.
This can be done with:

```
docker-compose restart
```
