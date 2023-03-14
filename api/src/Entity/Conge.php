<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CongeValidationController;
use App\Controller\CreateConge;
use App\Controller\GetConge;
use App\Controller\GetNotvalidCongeController;
use App\Controller\GetMyConge;
use App\Repository\CongeRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CongeRepository::class)]
#[ApiResource(
    collectionOperations:[
        'post' => [
            'controller' => CreateConge::class
        ],
        'get' => [
            'controller' => GetConge::class
        ],
        'getMyConge' => [
            'method' => 'GET',
            'controller' => GetMyConge::class,
            'path' => '/conges/myConges'
        ],
        'getnotvalidconge' => [
            'method' => 'GET',
            "security" => "is_granted('ROLE_ADMIN')",
            'controller' => GetNotvalidCongeController::class,
            'path' => '/conges/not_valid'
        ],

    ],
    itemOperations:[
        
        'conge_validate' => [
            'method' => 'PUT',
            "security" => "is_granted('ROLE_ADMIN')",
            'controller' => CongeValidationController::class,
            'path' => '/conges/valid/{id}'
        ],
        'put' => [

        ],
        'delete' => [
            "security" => "object.getuser() == user"
        ],
        'get' => []
    ],
    denormalizationContext: ['groups' => ['conge:write']],
    normalizationContext: ['groups' => ['conge:read']],
)]
class Conge
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["conge:read"])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(["conge:read", "conge:write"])]
    private ?\DateTimeInterface $departureDate = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(["conge:read", "conge:write"])]
    private ?\DateTimeInterface $returnDate = null;


    #[ORM\ManyToOne(inversedBy: 'conges')]
    #[Groups(["conge:read", "conge:write"])]
    private ?User $user =null;

    #[ORM\ManyToOne (targetEntity: Type::class, inversedBy: 'conges')]
    #[Groups(["conge:read", "conge:write"])]
    private ?type $type = null;

    #[ORM\Column(nullable: false)]
    #[Groups(["conge:read", "conge:write"])]
    private ?bool $validation = false;




    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->types = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDepartureDate(): ?\DateTimeInterface
    {
        return $this->departureDate;
    }

    public function setDepartureDate(\DateTimeInterface $departureDate): self
    {
        $this->departureDate = $departureDate;

        return $this;
    }

    public function getReturnDate(): ?\DateTimeInterface
    {
        return $this->returnDate;
    }

    public function setReturnDate(\DateTimeInterface $returnDate): self
    {
        $this->returnDate = $returnDate;

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

    public function getType(): ?type
    {
        return $this->type;
    }

    public function setType(?type $type): self
    {
        $this->type = $type;

        return $this;
    }


    public function addType(Type $type): self
    {
        if (!$this->types->contains($type)) {
            $this->types->add($type);
            $type->setConge($this);
        }

        return $this;
    }

    public function removeType(Type $type): self
    {
        if ($this->types->removeElement($type)) {
            // set the owning side to null (unless already changed)
            if ($type->getConge() === $this) {
                $type->setConge(null);
            }
        }

        return $this;
    }

    public function getValidation(): ?bool
    {
        return $this->validation;
    }

    public function setValidation(?bool $validation): self
    {
        $this->validation = $validation;

        return $this;
    }


}
