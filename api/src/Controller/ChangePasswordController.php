<?php

namespace App\Controller;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use App\Services\PasswordService;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RequestStack;

class ChangePasswordController extends AbstractController
{
       /**
     * @var ManagerRegistry
     */
    protected ManagerRegistry $doctrine;

    /**
     * @var RequestStack
     */
    private RequestStack $requestStack;

    /**
     * @var PasswordService
     * 
     *     
*/
    protected PasswordService $passwordService;

     /**
     * ChangePassword constructor.
     * @param ManagerRegistry $doctrine
     * @param RequestStack $requestStack
     * @param PasswordService $passwordServices
     */
    public function __construct(ManagerRegistry $doctrine, RequestStack $requestStack, PasswordService $passwordServices) {
        $this->doctrine = $doctrine;
        $this->requestStack = $requestStack;
        $this->passwordService = $passwordServices;
    }
    public function __invoke($data)
    {
        $user = $data;
        $password = $this->passwordService->encode($user, $user->getPassword());
        $user->setPassword($password);
        $this->doctrine
            ->getManager('default')
            ->persist($user)
        ;
        $this->doctrine
            ->getManager('default')
            ->flush()
        ;
        return $user;
    }
    
}
