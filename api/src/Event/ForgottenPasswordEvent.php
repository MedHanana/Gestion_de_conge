<?php

namespace App\Event;

use App\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class ForgottenPasswordEvent extends Event
{
    public const NAME = 'user.forgotten';

    /**
     * @var User
     */
    protected $user;

    /**
     * ForgottenPasswordEvent constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }
}
