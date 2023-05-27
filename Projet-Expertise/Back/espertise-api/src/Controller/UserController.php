<?php

namespace App\Controller;


use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use PHPMailer\PHPMailer\PHPMailer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;


/**
 * @Route("/api/user")
 * Manage entity user
 */
class UserController extends AbstractController
{

    private $em;
    private $serializer;

    public function __construct(EntityManagerInterface $entityManager , SerializerInterface $serializer)
    {
        $this->em = $entityManager;
        $this->serializer = $serializer;
        ini_set('memory_limit', '1500M');
    }

    /**
     * Login User
     * @Route("/login", name="user_login", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $message = '';
        $content = json_decode($request->getContent(), true);
        $user = $this->em->getRepository(User::class)->findOneBy(['login' => $content['login']]);
        if ($user) {
            if (!$user->getIsactivated()) {
                $message = "User Not Activated";
                $message = ['status' => $message ];
            } else {
                if ($user->getPassword() == $content['password']) {
                    $message = "LoginPasswordValid";
                    $message = ['status' => $message,'firstName' => $user->getFname(), 'lastName' => $user->getLname(), 'role' => $user->getRole() , 'id' => $user->getId()];
                } else {
                    $message = "PasswordInvalid";
                    $message = ['status' => $message ];
                }
            }

        } else {
            $message = ['status' => 'LoginInvalid' ];
        }
        return new JsonResponse($message, JsonResponse::HTTP_OK);
    }


    /**
     * Register User
     * @Route("/register", name="user_register", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $exUser = $this->em->getRepository(User::class)->findOneBy(['login' => $content['login']]);
        if (is_null($exUser)) {
            $user = new User();
            $user->setEmail($content['email'])
                ->setPassword($content['password'])
                ->
                setIsactivated($content['isactivated'])
                ->
                setFname($content['fname'])
                ->
                setLname($content['lname'])
                ->
                setLogin($content['login'])
                ->
                setRole($content['role']);
            $this->em->persist($user);
            $this->em->flush();
            $message = ['firstName' => $user->getFname(), 'lastName' => $user->getLname(), 'role' => $user->getRole()];
        } else {
            $message = 'user already exists';
            return new JsonResponse($message, 401);
        }

        return new JsonResponse($message, Response::HTTP_OK);
    }
    /**
     * creating list of Users
     * @Route("/create-list", name="user_list-create", methods={"POST"})
     * @return JsonResponse
     */
    public function create_list(): JsonResponse
    {
      for ($i=0; $i < 10; $i++) {

            $user = new User();
                 $user->setEmail("test".$i."@test.com")
                ->setPassword("test123456")
                ->
                setIsactivated(false)
                ->
                setFname('test'.$i)
                ->
                setLname('test'.$i)
                ->
                setLogin('test'.$i)
                ->
                setRole('user');
            $this->em->persist($user);
            $this->em->flush();
         }

        return new JsonResponse('CREATED', Response::HTTP_OK);
    }
     /**
     * Update User
     * @Route("/update", name="user_update", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $exUser = $this->em->getRepository(User::class)->findOneBy(['login' => $content['login']]);
       
            $exUser->setEmail($content['email'])
                ->setPassword($content['password'])
                ->
                setFname($content['fname'])
                ->
                setLname($content['lname'])
                ->
                setLogin($content['login']);
                
               
            $this->em->persist($exUser);
            $this->em->flush();
            $message = ['firstName' => $exUser->getFname(), 'lastName' => $exUser->getLname(), 'role' => $exUser->getRole()];

        return new JsonResponse($message, Response::HTTP_OK);
    }

    /**
     * @Route("/list", name="list_users", methods={"GET"})
     * @return JsonResponse
     */
    public function listUsers(): JsonResponse
    {

        $em = $this->getDoctrine()->getManager();
        $user = "'user'";
        $query = $em->createQuery(
            'SELECT c
    FROM App:User c WHERE c.role = '.$user
        );
        $users = $query->getArrayResult();

        return new JsonResponse($users);
    }

    /**
     * @Route("/activate-user", name="activate_user", methods={"POST"})
     * @return JsonResponse
     */
    public function activateUser(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $User = $this->em->getRepository(User::class)->findOneBy(['id' => $content['id']]);
        $User  ->
            setIsactivated(true);
        $this->em->persist($User);
        $this->em->flush();

        $Users = $this->em->getRepository(User::class)->findby(['role' => 'user']);
        $encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);


        $data = $serializer->serialize($Users, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new JsonResponse($data,200,[],true);
    }
    /**
     * @Route("/desactivate-user", name="desactivate_user", methods={"POST"})
     * @return JsonResponse
     */
    public function desactivateUser(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $User = $this->em->getRepository(User::class)->findOneBy(['id' => $content['id']]);
        $User  ->
        setIsactivated(false);
        $this->em->persist($User);
        $this->em->flush();

        $Users = $this->em->getRepository(User::class)->findby(['role' => 'user']);
        $encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);


        $data = $serializer->serialize($Users, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new JsonResponse($data,200,[],true);
    }

    /**
     * @Route("/delete", name="delete_User", methods={"POST"})
     * @return JsonResponse
     */
    public function deleteUser(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $User = $this->em->getRepository(User::class)->findOneBy(['id' => $content['id']]);

        $this->em->remove($User);
        $this->em->flush();



        $User = $this->em->getRepository(User::class)->findAll();
        $encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);


        $data = $serializer->serialize($User, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new JsonResponse($data,200,[],true);
    }
    /**
     * forget password
     * @Route("/forgetpassword", name="user_mail_reset", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function forgetpassword(Request $request): JsonResponse
    {
        $message = '';
        $content = json_decode($request->getContent(), true);
        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $content['email']]);
        if ($user) {
            if (!$user->getIsactivated()) {
                $message = "User Not Activated";
                $message = ['status' => $message ];
            } else {

// send email to client
                $pass = $user->getPassword();
                $mail = new PHPMailer;
                $mail->IsSMTP();
                $mail->SMTPAuth = true;
                $mail->SMTPSecure = 'tls';
                $mail->Host = "smtp.gmail.com";
                $mail->Port = 587;


                $mail->isHTML(true);
// a remplacer 
                $mail->Username = 'jiji201802@gmail.com';
                $mail->Password = 'jiji@tunis2020';
                $mail->setFrom('no-replay@expertise.com');

                $mail->addAddress($content['email']);
                $mail->CharSet = "UTF-8";

                $mail->Body = "Voila votre mot de passe : $pass";
                $mail->send();
                $message = ['status' => 'MailSent' ];
            }

        } else {
            $message = ['status' => 'EmailInvalid' ];
        }
        return new JsonResponse($message, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/getById/{id}", name="getUserById", methods={"GET"})
     * @return JsonResponse
     */
    public function getById(User $id): JsonResponse
    {

        $User = $id;
        $encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);


        $data = $serializer->serialize($User, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new JsonResponse($data,200,[],true);
    }


    /**
     * Edit User
     * @Route("/changepassword", name="change_password", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function changepassword(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $exUser = $this->em->getRepository(User::class)->findOneBy(['password' => $content['ancienPassword']]);
        if (is_null($exUser)) {
            $message = 'Invalid Password';
            return new JsonResponse($message, 404);
        } else {
            $exUser->setPassword($content['nouvPassword']);
            $this->em->persist($exUser);
            $this->em->flush();
            $message = 'Password Changed';
            return new JsonResponse($message, 200);
        }

        return new JsonResponse($message, Response::HTTP_OK);
    }

    /**
     * @Route("/userprofile/{id}", name="userprofile", methods={"POST"})
     * @return JsonResponse
     */
    public function userprofile(Request $request,User $id): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $User = $id;
        $User->setEmail($content['email'])
            ->setLogin($content['username'])
            ->setLname($content['last_name'])
            ->setFname($content['first_name']);
        $this->em->persist($User);
        $this->em->flush();
        $encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);


        $data = $serializer->serialize($User, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new JsonResponse($data,200,[],true);
    }


}
