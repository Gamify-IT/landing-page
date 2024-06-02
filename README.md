# landing-page

This is the first page which is shown when the user visits the website.

For now, it only contains a link to the login page.

## Development

### With live rebuild

```bash
# Start database, login-backend and reverse-proxy in background
docker-compose -f docker-compose-dev.yaml up --detach

# Build project with hot-reload
npm run serve

# When you are down: shut down the database, backend, proxy, etc.
docker-compose -f docker-compose.dev.yml down
```

You can now see the whole build on <http://localhost>.

#### Important links
- Landing page: <http://localhost/>
- Keycloak admin console: <http://localhost/keycloak/admin/master/console/>
- Account page for Gamify-IT users (you can manually log in and out here): <http://localhost/keycloak/realms/Gamify-IT/account/#/>

### From Docker build

```bash
# Build the project as a Docker image.
# Start the landing-page, keycloak, database and reverse-proxy
docker-compose up --build
```

#### Run with Docker-compose

Start all dependencies with our docker-compose files.
Check the [manual for docker-compose](https://github.com/Gamify-IT/docs/blob/main/dev-manuals/languages/docker/docker-compose.md).

To run the main branch with minimal dependencies use the `docker-compose.yaml` file.\
To run the latest changes on any other branch than `main` use the `docker-compose-dev.yaml` file.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
