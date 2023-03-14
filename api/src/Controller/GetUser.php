<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GetUser extends AbstractController
{
    private ManagerRegistry $doctrine;

    /**
     * GetUser constructor.
     * @param ManagerRegistry $doctrine
     */
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    public function __invoke()
    {
        $users = $this->doctrine
            ->getManager('default')
            ->getRepository(User::class)
            ->findAll();

        return $users;
    }
}
