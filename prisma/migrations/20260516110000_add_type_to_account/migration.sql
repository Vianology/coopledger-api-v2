-- Ajouter la colonne "type" à la table account si elle n'existe pas
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "type" TEXT NOT NULL DEFAULT '';
