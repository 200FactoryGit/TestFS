<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200703083335 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE branche (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE client (id INT AUTO_INCREMENT NOT NULL, identifiant VARCHAR(255) DEFAULT NULL, designation VARCHAR(255) DEFAULT NULL, adresse VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, telephone INT DEFAULT NULL, observation VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, prestation_id INT NOT NULL, path VARCHAR(255) DEFAULT NULL, INDEX IDX_C53D045F9E45C554 (prestation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE prestation (id INT AUTO_INCREMENT NOT NULL, type_id INT NOT NULL, client_id INT NOT NULL, branche_id INT NOT NULL, createdat DATETIME DEFAULT NULL, datedebutmission DATETIME DEFAULT NULL, assure VARCHAR(255) DEFAULT NULL, datesinistre DATETIME DEFAULT NULL, dateexpertise DATETIME DEFAULT NULL, gouvernorat VARCHAR(255) DEFAULT NULL, estimation VARCHAR(255) DEFAULT NULL, numeropolice VARCHAR(255) DEFAULT NULL, referencecompte VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_51C88FADC54C8C93 (type_id), UNIQUE INDEX UNIQ_51C88FAD19EB6921 (client_id), UNIQUE INDEX UNIQ_51C88FAD9DDF9A9E (branche_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE representant (id INT AUTO_INCREMENT NOT NULL, client_id INT DEFAULT NULL, nom VARCHAR(255) DEFAULT NULL, prenom VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, telephone INT DEFAULT NULL, qualite VARCHAR(255) DEFAULT NULL, departement VARCHAR(255) DEFAULT NULL, observation VARCHAR(255) DEFAULT NULL, INDEX IDX_80D5DBC919EB6921 (client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE type (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045F9E45C554 FOREIGN KEY (prestation_id) REFERENCES prestation (id)');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FADC54C8C93 FOREIGN KEY (type_id) REFERENCES type (id)');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FAD19EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FAD9DDF9A9E FOREIGN KEY (branche_id) REFERENCES branche (id)');
        $this->addSql('ALTER TABLE representant ADD CONSTRAINT FK_80D5DBC919EB6921 FOREIGN KEY (client_id) REFERENCES client (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FAD9DDF9A9E');
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FAD19EB6921');
        $this->addSql('ALTER TABLE representant DROP FOREIGN KEY FK_80D5DBC919EB6921');
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045F9E45C554');
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FADC54C8C93');
        $this->addSql('DROP TABLE branche');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE prestation');
        $this->addSql('DROP TABLE representant');
        $this->addSql('DROP TABLE type');
    }
}
