// @vitest-environment prisma

import i18next from "i18next";
import { beforeAll, describe, expect, test } from "vitest";

import PrismaBackend from "../src/index";

i18next.init();

describe("i18next Prisma Backend basic load", () => {
  let connector: typeof i18next.services.backendConnector;

  beforeAll(() => {
    connector = i18next.services.backendConnector;
    connector.backend = new PrismaBackend(i18next.services, {});
  });

  test("should load data", () => {
    connector.load(["en"], ["common"], (err) => {
      expect(err).toBe(null);
      expect(connector.store.getResourceBundle("en", "test")).to.eq({
        key: "passing"
      });
    });
  });
});
