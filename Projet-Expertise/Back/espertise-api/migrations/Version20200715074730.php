<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200715074730 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestation ADD expert_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FADC5568CE4 FOREIGN KEY (expert_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_51C88FADC5568CE4 ON prestation (expert_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestation DROP FOREIGN KEY FK_51C88FADC5568CE4');
        $this->addSql('DROP INDEX IDX_51C88FADC5568CE4 ON prestation');
        $this->addSql('ALTER TABLE prestation DROP expert_id');
    }
}
