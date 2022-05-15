FROM node:12.14-alpine as builder

WORKDIR /login-frontend

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Build the project
RUN npm run build

FROM nginx:alpine as production-build
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /login-frontend/dist /usr/share/nginx/html

EXPOSE 8000
