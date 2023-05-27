<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200720082944 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE decompte ADD prestation_id INT DEFAULT NULL, CHANGE montant montant DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE decompte ADD CONSTRAINT FK_9639E1A99E45C554 FOREIGN KEY (prestation_id) REFERENCES prestation (id)');
        $this->addSql('CREATE INDEX IDX_9639E1A99E45C554 ON decompte (prestation_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE decompte DROP FOREIGN KEY FK_9639E1A99E45C554');
        $this->addSql('DROP INDEX IDX_9639E1A99E45C554 ON decompte');
        $this->addSql('ALTER TABLE decompte DROP prestation_id, CHANGE montant montant INT NOT NULL');
    }
}
