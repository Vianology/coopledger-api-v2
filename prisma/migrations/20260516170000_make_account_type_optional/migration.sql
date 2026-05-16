-- Rendre la colonne "type" optionnelle dans la table Account
ALTER TABLE "Account" ALTER COLUMN "type" DROP NOT NULL;