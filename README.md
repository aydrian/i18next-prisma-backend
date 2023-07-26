# i18next Prisma backend plugin

[![npm](https://badgen.net/npm/v/i18next-prisma-backend?color=red)](https://www.npmjs.com/package/i18next-prisma-backend)
[![license](https://badgen.net/github/license/aydrian/i18next-prisma-backend?color=green)](https://github.com/aydrian/i18next-prisma-backend/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A backend plugin for [i18next](https://www.i18next.com/) that supports using [Prisma](https://www.prisma.io/) to load resources from the data source specified in the `schema.prisma` configuration file.

## Getting Started

### Install packages

This package expects the Prisma Client as a peer dependency.

npm

```shell
npm install @prisma/client i18next-prisma-backend
```

yarn

```shell
yarn add @prisma/client i18next-prisma-backend
```

### Update your Schema

Update your `schema.prisma` files to include the following model with a minimum of the following fields:

```
model i18n {
  namespace   String
  language    String
  key         String
  translation String

  @@id([key, language])
  @@index([language, translation])
}
```

You may use `@@map` and `@map` to specify the underlying database table and field names respectively. The plugin will expect this model to exist.

Apply the schema changes to your database.

## Usage

This library supports ESM and CommonJS.

ESM

```javascript
import i18next from "i18next";
import Backend from "i18next-prisma-backend";

i18next.use(Backend).init({
  // Backend Options
  backend: options
});
```

CommonJS

```javascript
const i18next = require("i18next");
const Backend = require("i18next-prisma-backend");

i18next.use(Backend).init({
  // Backend Options
  backend: options
});
```

## Backend Options

```javascript
{
  // Optional: If you have an existing client instance,
  // you can specifiy it here. Otherwise a new instance
  // will be instanciated.
  client: prisma; // PrismaClient() instance
}
```

## 📝 License

Copyright © 2023 [Aydrian Howard](https://itsaydrian.com). <br />
This project is [MIT](./LICENSE) licensed.
