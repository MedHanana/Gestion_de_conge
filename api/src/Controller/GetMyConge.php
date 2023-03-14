<?php

namespace App\Controller;

use App\Entity\Conge;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class GetMyConge extends AbstractController
{
    private ManagerRegistry $doctrine;

    /**
     * @var Security
     */
    protected Security $security;

    /**
     * GetMyConge constructor.
     * @param ManagerRegistry $doctrine
     * @param Security $security
     */
    public function __construct(ManagerRegistry $doctrine, Security $security)
    {
        $this->doctrine = $doctrine;
        $this->security = $security;
    }

    public function __invoke()
    {
        $conges = $this->doctrine
            ->getManager('default')
            ->getRepository(Conge::class)
            ->findBy([
                'user' => $this->security->getUser()
            ]);

        return $conges;
    }
}
