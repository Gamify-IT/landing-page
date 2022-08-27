# landing-page

This is the first page which is shown when the user visits the website.

For now, it only contains a link to the login page.

## Development

### With live rebuild

```bash
# Start database, login-backend and reverse-proxy in background
docker-compose -f docker-compose.dev.yml up --detach

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
