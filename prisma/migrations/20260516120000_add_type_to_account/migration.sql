-- Ajout de la colonne "type" à la table account
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "type" TEXT NOT NULL DEFAULT '';
