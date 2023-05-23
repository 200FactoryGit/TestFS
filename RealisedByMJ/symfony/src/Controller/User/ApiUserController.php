<?php
namespace App\Controller\User ;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Repository\UserRepository ;
use Doctrine\ORM\EntityManagerInterface;
use Faker;
class ApiUserController extends AbstractController
{

    private EntityManagerInterface $em ;
    public function __construct(EntityManagerInterface $em )
    {
        $this->em = $em;
    }
    /**
     * @Route ("/api/user/create", name= "create_user", methods={"POST"})
     */
    public function createUser(Request $request, UserPasswordHasherInterface $paswordHasher, UserRepository $userRepository)
    {
        $faker = Faker\Factory::create('fr_FR');
        $localUser = new User() ; 
        if ($userRepository->findOneBy(["email"=>"test@test.com"])=== null )
        {
            $localUser->setEmail("test@test.com");
            $hashedPassword = $paswordHasher->hashPassword($localUser,"test");
            $localUser->setPassword($hashedPassword);
            $localUser->setRoles(array('ROLE_USER'));
            $this->em->persist($localUser);
        }
        for($i=0 ; $i<10 ; ++$i)
        {
            $user = new User() ; 
            $user->setEmail($faker->email);
            $hashedPassword = $paswordHasher->hashPassword($user,$faker->password);
            $user->setPassword($hashedPassword);
            $user->setRoles(array('ROLE_USER'));
            $this->em->persist($user);
        }
        $this->em->flush();
        return $this->json(['status'=>'201' ],Response::HTTP_CREATED);
        
    }
     /**
     * @Route ("/api/user/all", name= "list_user", methods={"GET"})
     */
    public function getAll(UserRepository $userRepository) : Response
    {
        $res = [] ;  
        $users = $userRepository->findAll();
        foreach($users as $user)
        {
            array_push($res,
            array("userId"=> $user->getId(),
                    "username"=> $user->getEmail(),
                    "roles"=>$user->getRoles(),
                    "identifier"=>$user->getUserIdentifier(),
                    "password"=>$user->getPassword()
                ));
        }
        return new JsonResponse($res,Response::HTTP_OK);
    }

  
     /**
     * @Route ("api/user/{id}/edit ", name= "edit_user", methods={"PUT"})
     */
    public function editUseer( Request $request ,UserPasswordHasherInterface $hashpassword, UserRepository $userRepository, $id) : Response
    {
        $dataUser = $request->query->getContent();
        if(empty($dataUser)){
            $dataUser =  json_decode($request->getContent(), true); 
        }        
        $user = $userRepository->findOneBy(['id'=> $id]);
        if (isset($dataUser['Email'])){
            $user->setEmail($dataUser['Email']);
        }
        if (isset($dataUser['password'])){
            $pswd = $hashpassword->hashPassword($user, $dataUser['password']);
            $user->setPassword($pswd);
        }
        $this->em->persist($user);
        $this->em->flush();

        return new JsonResponse('User updated successfully',Response::HTTP_OK);
    }

    /**
     * @Route("/api/user/{id}/delete", name="remove_task")
     */

    public function removeUser(UserRepository $userRepository, $id): Response
    {
        $user = $userRepository->findOneBy(['id'=> $id]);
        $this->em->remove($user);
        $this->em->flush();
        

        return new JsonResponse('User deleted successfully',Response::HTTP_OK);
    }
}