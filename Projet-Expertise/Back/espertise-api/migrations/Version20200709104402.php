<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200709104402 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE representant ADD prestation_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE representant ADD CONSTRAINT FK_80D5DBC99E45C554 FOREIGN KEY (prestation_id) REFERENCES prestation (id)');
        $this->addSql('CREATE INDEX IDX_80D5DBC99E45C554 ON representant (prestation_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE representant DROP FOREIGN KEY FK_80D5DBC99E45C554');
        $this->addSql('DROP INDEX IDX_80D5DBC99E45C554 ON representant');
        $this->addSql('ALTER TABLE representant DROP prestation_id');
    }
}
