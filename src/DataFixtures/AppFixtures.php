<?php

namespace App\DataFixtures;

use App\Entity\SignIn;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $signin = new SignIn();
        $signin->setHourSignIn(new \DateTime('@'.strtotime('now')));
        $signin->setLocation('Madrid');
        $signin->setUpdated(0);
        $manager->persist($signin);

        $manager->flush();
    }
}
