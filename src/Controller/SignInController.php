<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\SignIn;


/**
 * @Route("/api", name="api_")
 */
 
class SignInController extends AbstractController
{
    /**
    * @Route("/signin", name="signin_index", methods={"GET"})
    */
    public function index(ManagerRegistry $doctrine): Response
    {
        $fichajes = $doctrine
            ->getRepository(SignIn::class)
            ->findAll();
  
        $data = [];
  
        foreach ($fichajes as $fichaje) {
           $data[] = [
               'id' => $fichaje->getId(),
               'hourSignIn' => $fichaje->getHourSignIn(),
               'location' => $fichaje->getLocation(),
               'updated' => $fichaje->isUpdated(),
               'comment' => $fichaje->getComment(),
           ];
        }
  
  
        return $this->json($data);
    }
  
    /**
     * @Route("/signin", name="signin_new", methods={"POST"})
     */
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();
  
        $signin = new SignIn();
        $signin->setHourSignIn($request->request->get('hourSignIn'));
        $signin->setLocation($request->request->get('location'));
        $signin->setUpdated($request->request->get('updated'));
        $signin->setComment($request->request->get('comment'));
        $entityManager->persist($signin);
        $entityManager->flush();
  
        return $this->json('Created new signin successfully with id ' . $signin->getId());
    }
  
    /**
     * @Route("/signin/{id}", name="signin_show", methods={"GET"})
     */
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $signin = $doctrine->getRepository(SignIn::class)->find($id);
  
        if (!$signin) {
  
            return $this->json('No signin found for id' . $id, 404);
        }
  
        $data =  [
            'id' => $signin->getId(),
            'hourSignIn' => $signin->getHourSignIn(),
            'location' => $signin->getLocation(),
            'updated' => $signin->isUpdated(),
            'comment' => $signin->getComment()
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/signin/{id}", name="signin_edit", methods={"PUT"})
     */
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $signin = $entityManager->getRepository(SignIn::class)->find($id);
  
        if (!$signin) {
            return $this->json('No signin found for id' . $id, 404);
        }
  
        $signin->setHourSignIn($request->request->get('hourSignIn'));
        $signin->setLocation($request->request->get('location'));
        $signin->setUpdated($request->request->get('updated'));
        $signin->setComment($request->request->get('comment'));
        $entityManager->flush();
  
        $data =  [
            'id' => $signin->getId(),
            'hourSignIn' => $signin->getHourSignIn(),
            'location' => $signin->getLocation(),
            'updated' => $signin->isUpdated(),
            'comment' => $signin->getComment(),
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/signin/{id}", name="signin_delete", methods={"DELETE"})
     */
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $signin = $entityManager->getRepository(Signin::class)->find($id);
  
        if (!$signin) {
            return $this->json('No signin found for id' . $id, 404);
        }
  
        $entityManager->remove($signin);
        $entityManager->flush();
  
        return $this->json('Deleted a signin successfully with id ' . $id);
    }
}

