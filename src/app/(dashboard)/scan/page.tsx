'use client';

import React from 'react';
import ScanForm from '@/components/scan/scanRequest/ScanForm';

/* 
Story : 
- 1ère page un text area ou l'on copie l'offre d'emplois + on doit valider quand on valide pn peut supprimer les mots clefs non pertinant => serveur action
- on a un form pout upload note cv 
- quand text area + cv ok on peut envoyer 
loading processing 
- 2eme page feedback
*/

//-----page-front-end-----//
/*
1ère page : 
dépot d'offre d'emplois 
- un text area pour copier et coller l'offre d'emplois
- un bouton pour valider
- quand valider on appel le serveur action qui récupère les skills
- on affiche les skills
- l'utilisateur peut supprimer les skills non pertiant
dépot de cv : 
- l'utilsateur doit uploader son cv (2 pages max, 5mb, pdf
- plus tard ajouter un dragAndDrop
Validation : 
- si l'offre d'emplois a été collé et correspond au shema zod
- si le CV à bien été uploader 
- on envoit les données à la route resume-processing (POST dans service)
2ème page : 
- On récupère le feedback générer dans la route resume-processing et on le met en forme. 
- Utiliser librairie de graphique 
resultat en sortie : 
1. Vérifier si le cv est bien structuré :
- L'utilisateur a bien écrit l'intitulé du poste 
- L'intitulé correspond à l'offre d'emplois
- L'utilisateur a bien fais un texte de présentation 
2. Vérifier la correspondance des skills : Note de correspondance + graphique
3. Vérifier la correspondance de l'expérience et des études
4. Proposition d'amélioration du cv =>a voir plus tard mais par exmple amélioration du texte de présentation.


//-----page-back-end-----//
=>serveur action traitement du text area =>  récuperer les skills
=>serveur action pour récuperer les skills

////route :  resume-processing/////

=> on récupère mots clefs + offre d'emplois + CV 
//Travail sur CV PDF 
=> on parse le CV en pdf et on récupère le texte brute:
- on prompt pour que l'ia récupère dans un tableau json : adresse, téléphone position rechercher, années d'experiences (pour cette position), niveau d'étude...
- on vérifies que les informations importantes sont bien dans CV (adresse, téléphone position, expérience, étude, description de l'utilisateur ) => on retourne les infos utiles pour le feedback en boolean par exemple.
- on vérifie si les skills demandés sont bien dans le CV => on retourne un score d'équivalence

On prompt les données récuperées et on demande un feedback, on sort un tableau json qui sera utilisé dans le front pour l'afficher

*/

const Page = () => {
  return (
    <div>
      <ScanForm />;
    </div>
  );
};

export default Page;
