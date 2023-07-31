// @vitest-environment prisma

import i18next from "i18next";
import { beforeAll, describe, expect, test } from "vitest";

import PrismaBackend from "../src/index";

i18next.init();

describe("prisma backend", () => {
  let backend: PrismaBackend;

  beforeAll(() => {
    backend = new PrismaBackend(i18next.services, {});
  });

  describe("#read", () => {
    test("should read data", () => {
      backend.read("en", "test", (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual({
          key: "passing"
        });
      });
    });

    test("should return {} if not found", () => {
      backend.read("es", "test", (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual({});
      });
    });
  });

  describe("#readMulti", () => {
    test("should return Not Implemented Yet error", () => {
      backend.readMulti(["es"], ["test"], (err) => {
        expect(err).toBeInstanceOf(Error);
        expect((err as Error).message).toBe("Not Implemented Yet");
      });
    });
  });

  describe("#create", () => {
    test("should return Not Implemented Yet error", () => {
      backend.create(["es"], "test", "key", "hola", (err) => {
        expect(err).toBeInstanceOf(Error);
        expect((err as Error).message).toBe("Not Implemented Yet");
      });
    });
  });
});
