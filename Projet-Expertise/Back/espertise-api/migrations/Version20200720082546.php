<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200720082546 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE decompte ADD quantite INT NOT NULL, ADD unite VARCHAR(255) NOT NULL, ADD classement VARCHAR(255) NOT NULL, ADD designation VARCHAR(255) NOT NULL, ADD total_demande DOUBLE PRECISION NOT NULL, ADD quantite_accorde INT NOT NULL, ADD total_accorde DOUBLE PRECISION NOT NULL, ADD rem DOUBLE PRECISION NOT NULL, ADD tva DOUBLE PRECISION NOT NULL, ADD vet DOUBLE PRECISION NOT NULL, ADD totaldemande_tot DOUBLE PRECISION NOT NULL, ADD rem_tot DOUBLE PRECISION NOT NULL, ADD vetuste_tot DOUBLE PRECISION NOT NULL, ADD net_acoorde_tot DOUBLE PRECISION NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE decompte DROP quantite, DROP unite, DROP classement, DROP designation, DROP total_demande, DROP quantite_accorde, DROP total_accorde, DROP rem, DROP tva, DROP vet, DROP totaldemande_tot, DROP rem_tot, DROP vetuste_tot, DROP net_acoorde_tot');
    }
}
