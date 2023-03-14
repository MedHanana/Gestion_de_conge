<?php

namespace App\Controller;

use App\Entity\Conge;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetConge extends AbstractController
{
    private ManagerRegistry $doctrine;

    /**
     * GetConge constructor.
     * @param ManagerRegistry $doctrine
     */
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    public function __invoke()
    {
        $conges = $this->doctrine
            ->getManager('default')
            ->getRepository(Conge::class)
            ->findAll();

        return $conges;
    }
}
