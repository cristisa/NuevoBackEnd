<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource( operations: [
    new Get(),
    new Put(),
    new Delete(),
    //new Get(name: 'weather', uriTemplate: '/places/{id}/weather', controller: GetWeather::class),
    new GetCollection(),
    new Post(),
])]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: SignIn::class)]
    private Collection $signIns;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: SignOut::class)]
    private Collection $signOuts;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    private ?Schedule $schedule = null;

    public function __construct()
    {
        $this->signIns = new ArrayCollection();
        $this->signOuts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, SignIn>
     */
    public function getSignIns(): Collection
    {
        return $this->signIns;
    }

    public function addSignIn(SignIn $signIn): self
    {
        if (!$this->signIns->contains($signIn)) {
            $this->signIns->add($signIn);
            $signIn->setUser($this);
        }

        return $this;
    }

    public function removeSignIn(SignIn $signIn): self
    {
        if ($this->signIns->removeElement($signIn)) {
            // set the owning side to null (unless already changed)
            if ($signIn->getUser() === $this) {
                $signIn->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, SignOut>
     */
    public function getSignOuts(): Collection
    {
        return $this->signOuts;
    }

    public function addSignOut(SignOut $signOut): self
    {
        if (!$this->signOuts->contains($signOut)) {
            $this->signOuts->add($signOut);
            $signOut->setUser($this);
        }

        return $this;
    }

    public function removeSignOut(SignOut $signOut): self
    {
        if ($this->signOuts->removeElement($signOut)) {
            // set the owning side to null (unless already changed)
            if ($signOut->getUser() === $this) {
                $signOut->setUser(null);
            }
        }

        return $this;
    }

    public function getSchedule(): ?Schedule
    {
        return $this->schedule;
    }

    public function setSchedule(?Schedule $schedule): self
    {
        // unset the owning side of the relation if necessary
        if ($schedule === null && $this->schedule !== null) {
            $this->schedule->setUser(null);
        }

        // set the owning side of the relation if necessary
        if ($schedule !== null && $schedule->getUser() !== $this) {
            $schedule->setUser($this);
        }

        $this->schedule = $schedule;

        return $this;
    }
}
