<?php

namespace App\Controller;

use App\Entity\Type;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class CreateTypeController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    protected EntityManagerInterface $entityManager;
    /**
     * @var Security
     */
    protected Security $security;
    /**
     * create Type constructor
     * @param EntityManagerInterface $entityManager
     * @param Security $security
     */
    public function __construct(EntityManagerInterface $entityManager, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->security = $security;
    }
    /**
     * @param Type $data
     * @return JsonResponse
     */
    public function __invoke(Type $data): JsonResponse{
        $type = new Type();
        $type->setName($data->getName());
        $this->entityManager->persist($type);
        $this->entityManager->flush();
        return $this->json([]);
    }
}
