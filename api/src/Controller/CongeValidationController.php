<?php

namespace App\Controller;

use App\Entity\Conge;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Repository\UserRepository;
class CongeValidationController extends AbstractController
{
    /**
     * @var ManagerRegistry
     */
    protected ManagerRegistry $doctrine;
      /**
     * @var Security
     */
    protected Security $security;

    /**
     * @var EntityManagerInterface
     */
    protected EntityManagerInterface $entityManager;

    public function __construct(ManagerRegistry $doctrine, EntityManagerInterface $entityManager, Security $security)
    {
        $this->doctrine = $doctrine;
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    /**
     * @param int $id
     * @return JsonResponse
     * @throws NotFoundHttpException
     * @param Security $security
     */
    public function __invoke(int $id, UserRepository $userRepository): JsonResponse
    {
        $conge = $this->entityManager->getRepository(Conge::class)->find($id);

        $user = $this->security->getUser();
        $userId = $user->getId();

        $userRepository = $this->doctrine->getRepository(User::class);
        $user = $userRepository->find($userId);
        $userSolde = $user->getSolde();
        $congeDepartureDate = $conge->getDepartureDate();
        $congeReturnDate = $conge->getReturnDate();

        // calculate the difference between departure and return dates
        $interval = $congeDepartureDate->diff($congeReturnDate);
        $congeDuration = $interval->days;

        // subtract the duration of the conge from the user's solde
        $user->setSolde($userSolde - $congeDuration);

        if (!$conge) {
            throw new NotFoundHttpException('No conge found for id '.$id);
        }

        $conge->setValidation(true);

        $this->entityManager->persist($conge);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json([
            'message' => 'Conge successfully validated.',
        ]);
    }

}
