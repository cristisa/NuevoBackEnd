<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\SignOut;



/**
 * @Route("/api", name="api_")
 */
 
class SignOutController extends AbstractController
{
    /**
    * @Route("/signout", name="signout_index", methods={"GET"})
    */
    public function index(ManagerRegistry $doctrine): Response
    {
        $fichajes = $doctrine
            ->getRepository(SignOut::class)
            ->findAll();
  
        $data = [];
  
        foreach ($fichajes as $fichaje) {
           $data[] = [
               'id' => $fichaje->getId(),
               'hourSignOut' => $fichaje->getHourSignOut(),
               'location' => $fichaje->getLocation(),
               'updated' => $fichaje->isUpdated(),
               'comment' => $fichaje->getComment(),
           ];
        }
  
  
        return $this->json($data);
    }
  
    /**
     * @Route("/signout", name="signout_new", methods={"POST"})
     */
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();
  
        $signout = new SignOut();
        $signout->setHourSignOut($request->request->get('hourSignout'));
        $signout->setLocation($request->request->get('location'));
        $signout->setUpdated($request->request->get('updated'));
        $signout->setComment($request->request->get('comment'));
        $entityManager->persist($signout);
        $entityManager->flush();
  
        return $this->json('Created new signout successfully with id ' . $signout->getId());
    }
  
    /**
     * @Route("/signout/{id}", name="signout_show", methods={"GET"})
     */
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $signout = $doctrine->getRepository(SignOut::class)->find($id);
  
        if (!$signout) {
  
            return $this->json('No signout found for id' . $id, 404);
        }
  
        $data =  [
            'id' => $signout->getId(),
            'hourSignOut' => $signout->getHourSignOut(),
            'location' => $signout->getLocation(),
            'updated' => $signout->isUpdated(),
            'comment' => $signout->getComment()
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/signout/{id}", name="signout_edit", methods={"PUT"})
     */
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $signout = $entityManager->getRepository(SignOut::class)->find($id);
  
        if (!$signout) {
            return $this->json('No signout found for id' . $id, 404);
        }
  
        $signout->setHourSignOut($request->request->get('hourSignOut'));
        $signout->setLocation($request->request->get('location'));
        $signout->setUpdated($request->request->get('updated'));
        $signout->setComment($request->request->get('comment'));
        $entityManager->flush();
  
        $data =  [
            'id' => $signout->getId(),
            'hourSignOut' => $signout->getHourSignOut(),
            'location' => $signout->getLocation(),
            'updated' => $signout->isUpdated(),
            'comment' => $signout->getComment(),
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/signout/{id}", name="signout_delete", methods={"DELETE"})
     */
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $signout = $entityManager->getRepository(Signout::class)->find($id);
  
        if (!$signout) {
            return $this->json('No signout found for id' . $id, 404);
        }
  
        $entityManager->remove($signout);
        $entityManager->flush();
  
        return $this->json('Deleted a signout successfully with id ' . $id);
    }
}

