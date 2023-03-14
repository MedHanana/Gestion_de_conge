<?php

namespace App\Controller;

use App\Entity\User;
use App\Event\ForgottenPasswordEvent;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class ForgetPasswordController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    protected EntityManagerInterface $doctrine;

    /**
     * @var EventDispatcherInterface
     */
    private EventDispatcherInterface $dispatcher;

    /**
     * @var RequestStack
     */
    private RequestStack $requestStack;

    /**
     * LoginUser constructor.
     * @param ManagerRegistry $doctrine
     * @param EventDispatcherInterface $dispatcher
     * @param RequestStack $requestStack
     */
    public function __construct(
        ManagerRegistry $doctrine,
        EventDispatcherInterface $dispatcher,
        RequestStack $requestStack
    ) {
        $this->doctrine = $doctrine;
        $this->dispatcher = $dispatcher;
        $this->requestStack = $requestStack;
    }

    public function __invoke($data)
    {
        $user = $this
            ->doctrine
            ->getManager('default')
            ->getRepository(User::class)
            ->findOneBy(['email' => $data->getEmail()])
        ;
        if (!$user) {
            return $this->json(["user not found"]);
        }
        $event = new ForgottenPasswordEvent($user);
        $this->dispatcher->dispatch($event, ForgottenPasswordEvent::NAME);

        return $this->json(["email send !"]);
    }
}
