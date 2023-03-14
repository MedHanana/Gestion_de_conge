<?php

namespace App\Controller;

use App\Entity\Conge;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;

use \DateTime;
class CreateConge extends AbstractController
{
    /**
     * @var ManagerRegistry
     */
    protected ManagerRegistry $doctrine;

    /**
     * @var Security
     */
    protected Security $security;

    /**
     * CreateConge constructor.
     * @param ManagerRegistry $doctrine
     * @param Security $security
     */
    public function __construct(ManagerRegistry $doctrine, Security $security)
    {
        $this->doctrine = $doctrine;
        $this->security = $security;
    }

    /**
     * @param Conge $data
     * @return JsonResponse
     */
        public function __invoke(Conge $data): JsonResponse
        {
            $currentDate = new DateTime();
            $user = $this->security->getUser();
        if($data->getDepartureDate() < $currentDate) {
            return $this->json(['error' => 'Departure date cannot be in the past.']);
        }
    
    $congeExists = $this->doctrine->getRepository(Conge::class)->findBy([
        'user' => $user, 
    ]); 
 
  if ($congeExists !== null) {
  foreach($congeExists as $conge){
      $congeDepartureDate = $conge->getDepartureDate()->format('Y-m-d');
      
      $congeReturnDate = $conge->getReturnDate()->format('Y-m-d');
      $dataDepartureDate = $data->getDepartureDate()->format('Y-m-d');
      $dataReturnDate = $data->getReturnDate()->format('Y-m-d');

    
      if (($dataDepartureDate >= $congeDepartureDate && $dataDepartureDate <= $congeReturnDate) || 
      ($dataReturnDate >= $congeDepartureDate && $dataReturnDate <= $congeReturnDate)  ||
      ($dataDepartureDate <= $congeDepartureDate && $dataReturnDate >= $congeReturnDate)) {
          return $this->json(['message' => 'Conge already exists for this user between these dates']);
      }
    }
  }



$conge = new Conge();
$conge->setDepartureDate($data->getDepartureDate());
$conge->setReturnDate($data->getReturnDate());
$conge->setType($data->getType());
$conge->setUser($user);
$conge->setValidation($data->getValidation());
$this->doctrine->getManager('default')->persist($conge);
$this->doctrine->getManager('default')->flush();

dd($conge);

return $this->json([$validation = $conge->getValidation()]);
}

/**
     * @Route("/{id}/validate", name="conge_validate", methods={"PUT"})
     */

        }

