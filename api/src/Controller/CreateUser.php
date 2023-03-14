<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class CreateUser extends AbstractController
{
    private ManagerRegistry $doctrine;

    /**
     * CreateUser constructor.
     * @param ManagerRegistry $doctrine
     */
    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    public function __invoke($data, UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository)
    {
        $user = $data;
        $userCredentials = $this->doctrine
            ->getManager('default')
            ->getRepository(User::class)
            ->findOneBy(['email' => $data->getEmail()]);
        if ($userCredentials) {
            throw new BadRequestException("email already exists");
        }
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $user->getPassword()
        );
        $user->setPassword($hashedPassword);
        $user->setRoles($user->getRoles());
        $user->setCreateAt($user->getCreateAt());
        $userRepository->add($user, true);

        return $user;
    }
}
