<?php

namespace App\DataFixtures;

use App\Entity\SignIn;
use App\Entity\SignOut;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    // /**
    //  * @var \Faker\Factory
    //  */
    // private $faker;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
        //$this->faker = Faker\Factory::create();
    }

    public function load(ObjectManager $manager): void
    {
        $this->loadUser($manager);
        $this->loadSignIn($manager);
        $this->loadSignOut($manager);

    }

    public function loadSignIn(ObjectManager $manager): void
    {
        $user = $this->getReference('user_admin');
        $signin = new SignIn();
        $signin->setHourSignIn(new \DateTime('@'.strtotime('now')));
       //$signin->setHourSignIn(new \DateTime('2022-10-09 18:00:00'));
        $signin->setLocation('Madrid');
        $signin->setUpdated(0);
        $signin->setComment("Primer Fichaje");
        $signin->setUser($user);
        
        $manager->persist($signin);

        $signin = new SignIn();
        $signin->setHourSignIn(new \DateTime('2022-11-09 08:00:00'));
        $signin->setLocation('Barcelona');
        $signin->setUpdated(1);
        $signin->setComment("Segundo Fichaje");
        $signin->setUser($user);

        $manager->persist($signin);

        // for ($i = 0; $i < 20; $i++) {
        //     $signin = new SignIn();
        //     $signin->setHourSignIn($this->faker->dateTime);
        //     $signin->setLocation($this->faker->realText(30));
        //     $signin->setUpdated($this->faker->boolean(1));
        //     $signin->setComment($this->faker->realText(30));
        //     $signin->setUser($user);

        //     $manager->persist($signin);
        // }
        $manager->flush();
    }

    public function loadSignOut(ObjectManager $manager): void
    {
        $user = $this->getReference('user_admin');

        $signout = new SignOut();
        $signout->setHourSignOut(new \DateTime('2022-11-09 18:00:00'));
        $signout->setLocation('Madrid');
        $signout->setUpdated(0);
        $signout->setComment("Primer Fichaje Salida");
        $signout->setUser($user);

        $manager->persist($signout);

        $signout = new SignOut();
        $signout->setHourSignOut(new \DateTime('2022-11-09 19:00:00'));
        $signout->setLocation('Madrid');
        $signout->setUpdated(1);
        $signout->setComment("Segundo Fichaje Salida");
        $signout->setUser($user);

        $manager->persist($signout);
        
        $manager->flush();
    }

    public function loadUser(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail('cristina_sa@yahoo.coom');
        $user->setRoles(['ROLE_ADMIN']);
       // $user->setPassword(hash('md5','1234'));
       $user->setPassword($this->passwordEncoder->encodePassword($user,'1234'));

        $manager->persist($user);

        $user = new User();
        $user->setEmail('isabel@yahoo.coom');
        $user->setRoles(['ROLE_ADMIN']);

        $user->setPassword($this->passwordEncoder->encodePassword($user,'1234'));
        
        $this->addReference('user_admin', $user);

        $manager->persist($user);
        
        $manager->flush();
    }
}
