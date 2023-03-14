<?php

namespace App\Entity;
use ApiPlatform\Core\Annotation\ApiResource;

use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\CreateTypeController;
use App\Controller\GetTypeCongeController;
use App\Repository\TypeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TypeRepository::class)]
#[ApiResource(
    collectionOperations: [
        'post' => [
            'controller' => CreateTypeController::class
        ],
        'get' => [
                'controller' => GetTypeCongeController::class
            ],
    ],

    denormalizationContext: ['groups' => ['type:write']],
    normalizationContext: ['groups' => ['type:read']],
    )]
class Type
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["type:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["type:read", "type:write"])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'type', targetEntity: Conge::class)]
    private Collection $conges;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

}
