# landing-page

This is the first page which is shown when the user visits the website.

For now, it only contains a link to the login page.

## Development
> Beginning of additions (that work)
### Getting started

Clone the repository
```sh
git clone https://github.com/Gamify-IT/landing-page.git
```

Install the dependencies
```sh
npm install
```

### Compile and Hot-Reload for Development
To run the project locally with your IDE feature and have all necessary dependencies running,
start the dependencies via docker:
```sh
docker compose -f docker-compose-dev.yaml up
```
Then start the frontend with:
```sh
npm run serve
```
You can now access the game at [localhost](http://localhost).

### Build your local changes as a docker container
To build and run your local changes as a docker container use:
```sh
docker compose up --build
```
You can remove the container with:

```sh
docker compose down
```

> End of additions


#### Important links
- Landing page: <http://localhost/>
- Keycloak admin console: <http://localhost/keycloak/admin/master/console/>
- Account page for Gamify-IT users (you can manually log in and out here): <http://localhost/keycloak/realms/Gamify-IT/account/#/>

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
