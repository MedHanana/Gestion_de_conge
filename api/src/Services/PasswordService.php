<?php

namespace App\Services;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class PasswordService
{
    /**
     * @var PasswordService
     */
    private PasswordService|UserPasswordHasherInterface $userPasswordEncoder;

    /**
     * @param UserPasswordHasherInterface $userPasswordEncoder
     */
    public function __construct(UserPasswordHasherInterface $userPasswordEncoder)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    /**
     * @param object $entity
     * @param string $password
     * @return string
     */
    public function encode(object $entity, string $password): string
    {
        return $this->userPasswordEncoder->hashPassword($entity, $password);
    }

    /**
     * @param string $password
     * @return bool
     */
    public function isFormatRequired(string $password): bool
    {
        return (bool) preg_match('#(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)#', $password);
    }

    /**
     * @param object $entity
     * @param string $password
     * @return bool
     */
    public function isValid(object $entity, string $password): bool
    {
        return $this->userPasswordEncoder->isPasswordValid($entity, $password);
    }
}
