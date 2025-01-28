# AKCSE-Client

## Getting Started

Create .env file

```bash
cp .env.sample .env
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn dev

# produciton
$ yarn build
$ yarn start

```

## Private Package Authentication Setup

This project depends on the private package `@dev-taeho/akbse_mb`, which is an SDK package from the backend. To ensure proper installation of dependencies, the following steps need to be followed:

1. **Get the npm auth token**: Contact the administrator to obtain the npm auth token required for accessing the private package.
2. **Set the npm auth token**: After obtaining the token, add it to your `.npmrc` file in the root directory. You can do this by adding the following lines:

   ```bash
   //npm.pkg.github.com/:_authToken=<auth_token>
   @dev-taeho:registry=https://npm.pkg.github.com
   ```

3. **Install dependencies**: Once the npm auth token is correctly set, you will be able to install the project's dependencies successfully using:

   ```
   npm install
   ```

- _NOTE: if the npm auth token is not set, the application will fail to install dependencies._

## deployment

- TBD
