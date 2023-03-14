<?php

namespace App\Controller;

use App\Entity\Type;
use Doctrine\Persistence\ManagerRegistry;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GetTypeCongeController extends AbstractController
{
    private  ManagerRegistry $doctrine;
    /**
     * GetType constructor
     * @param ManagerRegistry $doctrine
     */
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    public function __invoke(){
        $types = $this->doctrine
            ->getManager('default')
            ->getRepository(Type::class)
            ->findAll();
        return $types;
    }
}
