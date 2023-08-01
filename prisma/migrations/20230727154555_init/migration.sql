-- CreateTable
CREATE TABLE "i18n" (
    "namespace" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "translation" TEXT NOT NULL,

    PRIMARY KEY ("key", "language")
);

-- CreateIndex
CREATE INDEX "i18n_language_translation_idx" ON "i18n"("language", "translation");
