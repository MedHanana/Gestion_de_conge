<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class GetMyProfileController extends AbstractController
{
    private ManagerRegistry $doctrine;

    /**
     * @var Security
     */
    protected Security $security;

    /**
     * GetMyProfile constructor.
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
        return $this->security->getUser();
    }
}
