<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221109082643 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE schedule CHANGE vacation_start_date vacation_start_date DATE DEFAULT NULL, CHANGE vacation_end_date vacation_end_date DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE sign_in ADD user_id INT DEFAULT NULL, CHANGE hour_sign_in hour_sign_in DATE DEFAULT NULL, CHANGE location location VARCHAR(255) DEFAULT NULL, CHANGE comment comment VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE sign_in ADD CONSTRAINT FK_E629950BA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_E629950BA76ED395 ON sign_in (user_id)');
        $this->addSql('ALTER TABLE sign_out CHANGE hour_sign_out hour_sign_out DATE DEFAULT NULL, CHANGE location location VARCHAR(255) DEFAULT NULL, CHANGE comment comment VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL');
        $this->addSql('ALTER TABLE messenger_messages CHANGE delivered_at delivered_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE messenger_messages CHANGE delivered_at delivered_at DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE schedule CHANGE vacation_start_date vacation_start_date DATE DEFAULT \'NULL\', CHANGE vacation_end_date vacation_end_date DATE DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE sign_in DROP FOREIGN KEY FK_E629950BA76ED395');
        $this->addSql('DROP INDEX IDX_E629950BA76ED395 ON sign_in');
        $this->addSql('ALTER TABLE sign_in DROP user_id, CHANGE hour_sign_in hour_sign_in DATE DEFAULT \'NULL\', CHANGE location location VARCHAR(255) DEFAULT \'NULL\', CHANGE comment comment VARCHAR(255) DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE sign_out CHANGE hour_sign_out hour_sign_out DATE DEFAULT \'NULL\', CHANGE location location VARCHAR(255) DEFAULT \'NULL\', CHANGE comment comment VARCHAR(255) DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_bin`');
    }
}
