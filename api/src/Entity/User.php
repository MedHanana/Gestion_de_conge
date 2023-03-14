<?php

namespace App\Entity;
use DateTimeImmutable;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\ChangePasswordController;
use App\Controller\CreateUser;
use App\Controller\GetUser;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use App\Controller\GetMyProfileController;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    collectionOperations:[
        'post' => [
            'controller' => CreateUser::class,
            "security" => "is_granted('ROLE_ADMIN')",
        ],
        'forgotten_passsword' => [
            'method' => 'POST',
            'controller' => ForgetPasswordController::class,
            'path' => '/forget/password'
        ],
        
        'getMyProfile' => [
            'method' => 'GET',
            'controller' => GetMyProfileController::class,
            'path' => '/users/myProfile'
        ],

        'get' => [
            'controller' => GetUser::class
        ],


    ],
    itemOperations:[
        'put' => ["security" => "is_granted('ROLE_ADMIN') or (object == user and is_granted('ROLE_USER'))"],
        'delete' => ["security" => "is_granted('ROLE_ADMIN')"],
        'change_password' => [
            'method' => 'PATCH',
            'controller' => ChangePasswordController::class,
            'path' => 'change/password/{id}'
        ],

    
        'get' => [
        ],

    ],
    denormalizationContext: ['groups' => ['user:write']],
    normalizationContext: ['groups' => ['user:read']],
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    const ROLE_USER="ROLE_USER";
    const ROLE_ADMIN="ROLE_ADMIN";

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["user:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["user:read", "user:write"])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(["user:write"])]
    private ?string $password = null;


    #[ORM\Column(length: 255)]
    #[Groups(["user:read", "user:write"])]
    private ?string $adress = null;

    #[ORM\Column(length: 255)]

    #[Groups(["user:read", "user:write"])]
    private array $roles = [];

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(["user:read", "user:write"])]
    private ?string $email = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Conge::class)]
    #[Groups(["user:read", "user:write"])]
    private Collection $conges;

    #[ORM\Column(nullable: true)]
    #[Groups(["user:read", "user:write"])]
    private ?float $solde = null;

    #[ORM\Column(nullable: false)]
    private ?\DateTimeImmutable $createAt;

    #[ORM\Column(nullable: false)]
    private ?\DateTimeImmutable $updatedAt;



    public function __construct()
    {
 
        $this->conges = new ArrayCollection();
        $this->createAt = new DateTimeImmutable();
        $this->updatedAt = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(string $adress): self
    {
        $this->adress = $adress;

        return $this;
    }

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
     * @return Collection<int, Conge>
     */
    public function getConges(): Collection
    {
        return $this->conges;
    }

    public function addConge(Conge $conge): self
    {
        if (!$this->conges->contains($conge)) {
            $this->conges->add($conge);
            $conge->setUser($this);
        }

        return $this;
    }

    public function removeConge(Conge $conge): self
    {
        if ($this->conges->removeElement($conge)) {
            // set the owning side to null (unless already changed)
            if ($conge->getUser() === $this) {
                  $conge->setUser(null);
            }
        }

        return $this;
    }

    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    public function getSolde(): ?float
    {
        return $this->solde;
    }

    public function setSolde(?float $solde): self
    {
        $this->solde = $solde;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeImmutable
    {
        return $this->createAt;
    }

    public function setCreateAt(?\DateTimeImmutable $createAt): self
    {
        $this->createAt = $createAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    
}
