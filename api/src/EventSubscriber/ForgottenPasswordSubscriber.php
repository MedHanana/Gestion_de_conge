<?php

namespace App\EventSubscriber;

use App\Event\ForgottenPasswordEvent;
use App\Services\PasswordService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;

use Twig\Error\SyntaxError;

final class ForgottenPasswordSubscriber implements EventSubscriberInterface
{
    /**
     * @var ManagerRegistry
     */
    private $doctrine;
    /**
     * @var Environment
     */
    protected $templating;

    /**
     * @var ParameterBagInterface
     */
    private ParameterBagInterface $parameterBag;

    private PasswordService $passwordServices;
    private Swift_Mailer $mailer;

    /**
     * UserMailSubscriber constructor.
     * @param Swift_Mailer $mailer
     * @param Environment $templating
     * @param ManagerRegistry $doctrine
     * @param ParameterBagInterface $parameterBag
     * @param PasswordService $passwordServices
     */
    public function __construct(
        
        Environment $templating,
        ManagerRegistry $doctrine,
        ParameterBagInterface $parameterBag,
        PasswordService $passwordServices
    ) {
        $this->mailer = $mailer;
        $this->templating = $templating;
        $this->doctrine = $doctrine;
        $this->passwordServices = $passwordServices;
        $this->parameterBag = $parameterBag;
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents(): array
    {
        return [
            ForgottenPasswordEvent::NAME => 'onForgottenPassword'
        ];
    }

    /**
     * @param ForgottenPasswordEvent $event
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function onForgottenPassword(ForgottenPasswordEvent $event): void
    {
        $user = $event->getUser();
        $changePasswordCode = bin2hex(random_bytes(64));
        $code = $this->passwordServices->encode($user, $changePasswordCode);
        $user->setPassword($code);
        $this
            ->doctrine
            ->getManager('default')
            ->persist($user)
        ;
        $this
            ->doctrine
            ->getManager('default')
            ->flush()
        ;
        $changePasswordLink = "http://localhost:4200/change-password/" . $user->getId();
        $from = 'pihabi3405@bymercy.com';
        $sender = 'norsys';

        $message = (new Swift_Message())
            ->setFrom($from, $sender)
            ->setTo($user->getEmail())
            ->setSubject('Changement de mot de passe')
            ->setBody(
                $this->templating->render(
                    'forget_password/index.html.twig',
                    [
                        'username' => $user->getName(),
                        'changePasswordLink' => $changePasswordLink
                    ]
                ),
                'text/html'
            )
        ;
        $this->mailer->send($message);
    }
}
