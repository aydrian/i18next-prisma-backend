import { PrismaClient } from "@prisma/client";
import type {
  BackendModule,
  InitOptions,
  ModuleType,
  MultiReadCallback,
  ReadCallback,
  Services
} from "i18next";

export type BackendOptions = {
  client?: PrismaClient;
};

// Provided interface doesn't include a callback for create
interface FixedBackendModule<TOptions = object>
  extends Omit<BackendModule<TOptions>, "create"> {
  create?(
    languages: readonly string[],
    namespace: string,
    key: string,
    fallbackValue: string,
    callback: ReadCallback
  ): void;
}

class Backend implements FixedBackendModule<BackendOptions> {
  static type: ModuleType = "backend";
  type: "backend";

  MODNAME: string;
  client?: PrismaClient;

  constructor(
    services: Services,
    backendOptions: BackendOptions,
    i18nextOptions: InitOptions = {}
  ) {
    this.MODNAME = "i18next-prisma-backend";
    this.init(services, backendOptions, i18nextOptions);
  }

  getClient() {
    return this.client || new PrismaClient();
  }

  init(
    _services: Services,
    backendOptions: BackendOptions,
    _i18nextOptions: InitOptions
  ) {
    this.client = backendOptions?.client;
  }

  read(language: string, namespace: string, callback: ReadCallback) {
    this.readTranslations(language, namespace)
      .then((resources) => callback(null, resources))
      .catch((err) => {
        return callback(err, null);
      });
  }

  private async readTranslations(language: string, namespace: string) {
    const client = this.getClient();
    const result = await client.i18n.findMany({
      select: { translation: true, key: true },
      where: { language, namespace }
    });
    const resources = result.reduce((obj, { translation, key }) => {
      return {
        ...obj,
        [key]: translation
      };
    }, {});
    return resources;
  }

  readMulti(
    _languages: readonly string[],
    _namespaces: readonly string[],
    callback: MultiReadCallback
  ) {
    /* return multiple resources - useful eg. for bundling loading in one xhr request */
    return callback(new Error("Not Implemented Yet"), null);
  }

  create(
    _languages: readonly string[],
    _namespace: string,
    _key: string,
    _fallbackValue: string,
    callback: ReadCallback
  ) {
    /* save the missing translation */
    return callback(new Error("Not Implemented Yet"), null);
  }
}

export default Backend;
