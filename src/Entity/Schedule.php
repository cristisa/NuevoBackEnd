<?php

namespace App\Entity;

use App\Repository\ScheduleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;




#[ORM\Entity(repositoryClass: ScheduleRepository::class)]
#[ApiResource( operations: [
    new Get(),
    new Put(),
    new Delete(),
    //new Get(name: 'weather', uriTemplate: '/places/{id}/weather', controller: GetWeather::class),
    new GetCollection(),
    new Post(),
])]
class Schedule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $vacationDays = null;

    #[ORM\Column(nullable: true)]
    private ?int $hoursWeek = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $vacationStartDate = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $vacationEndDate = null;

    #[ORM\OneToOne(inversedBy: 'schedule', cascade: ['persist', 'remove'])]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVacationDays(): ?int
    {
        return $this->vacationDays;
    }

    public function setVacationDays(?int $vacationDays): self
    {
        $this->vacationDays = $vacationDays;

        return $this;
    }

    public function getHoursWeek(): ?int
    {
        return $this->hoursWeek;
    }

    public function setHoursWeek(?int $hoursWeek): self
    {
        $this->hoursWeek = $hoursWeek;

        return $this;
    }

    public function getVacationStartDate(): ?\DateTimeInterface
    {
        return $this->vacationStartDate;
    }

    public function setVacationStartDate(?\DateTimeInterface $vacationStartDate): self
    {
        $this->vacationStartDate = $vacationStartDate;

        return $this;
    }

    public function getVacationEndDate(): ?\DateTimeInterface
    {
        return $this->vacationEndDate;
    }

    public function setVacationEndDate(?\DateTimeInterface $vacationEndDate): self
    {
        $this->vacationEndDate = $vacationEndDate;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
