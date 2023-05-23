<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\UserRepository ;
use Doctrine\ORM\EntityManagerInterface;


class LoginController extends AbstractController
{
    private UserRepository $userRepository ;
    private EntityManagerInterface $em ;
    public function __construct(UserRepository $userRepository, 
    EntityManagerInterface $em )
    {
        $this->userRepository = $userRepository ;
        $this->em = $em ;
    }

    
    /**
     * @Route ("/auth", name="auth", methods={"POST"})
     */
    public function auth( Request $request )
    {
        
       // $this->apiAuthenticator->authenticate($request);
       return $this->json([
        'message' => 'Welcome to your new controller!',
        'path' => 'src/Controller/LoginController.php',
    ]);
    
    }
    #[Route('/login', name: 'app_login')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/LoginController.php',
        ]);
    }

    
}
