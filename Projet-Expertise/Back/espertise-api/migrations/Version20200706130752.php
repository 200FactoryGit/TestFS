<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200706130752 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestation DROP INDEX UNIQ_51C88FAD19EB6921, ADD INDEX IDX_51C88FAD19EB6921 (client_id)');
        $this->addSql('ALTER TABLE prestation DROP INDEX UNIQ_51C88FAD9DDF9A9E, ADD INDEX IDX_51C88FAD9DDF9A9E (branche_id)');
        $this->addSql('ALTER TABLE prestation DROP INDEX UNIQ_51C88FADC54C8C93, ADD INDEX IDX_51C88FADC54C8C93 (type_id)');
        $this->addSql('ALTER TABLE prestation CHANGE type_id type_id INT DEFAULT NULL, CHANGE client_id client_id INT DEFAULT NULL, CHANGE branche_id branche_id INT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestation DROP INDEX IDX_51C88FAD9DDF9A9E, ADD UNIQUE INDEX UNIQ_51C88FAD9DDF9A9E (branche_id)');
        $this->addSql('ALTER TABLE prestation DROP INDEX IDX_51C88FADC54C8C93, ADD UNIQUE INDEX UNIQ_51C88FADC54C8C93 (type_id)');
        $this->addSql('ALTER TABLE prestation DROP INDEX IDX_51C88FAD19EB6921, ADD UNIQUE INDEX UNIQ_51C88FAD19EB6921 (client_id)');
        $this->addSql('ALTER TABLE prestation CHANGE branche_id branche_id INT NOT NULL, CHANGE type_id type_id INT NOT NULL, CHANGE client_id client_id INT NOT NULL');
    }
}
