<?php

namespace App\Controller;

use App\Entity\Conge;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Security;

class GetNotvalidCongeController extends AbstractController
{
    private ManagerRegistry $doctrine;


    /**
     * GetNotvalidConge constructor.
     * @param ManagerRegistry $doctrine
     
     */
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
        
    }

    public function __invoke(): JsonResponse
    {
        $conges = $this->doctrine
            ->getManager('default')
            ->getRepository(Conge::class)
            ->findBy([
                'validation' => false
            ]);

        return $this->json($conges);

    }
}
