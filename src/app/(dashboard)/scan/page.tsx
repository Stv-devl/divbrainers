'use client';

import React from 'react';
import ScanForm from '@/components/scan/scanRequest/ScanForm';

/* 
Story : 
- 1ère page un text area ou l'on copie l'offre d'emplois + on doit valider quand on valide pn peut supprimer les mots clefs non pertinant => serveur action
- on a unform pout upload note cv 
- quand text area + cv ok on peut envoyer 
loading processing 
- 2eme page feedback
*/

//-----page-front-end-----//
/*voir image*/

//-----page-back-end-----//
// serveur action traitement du text area
// serveur action récuperer les skills et les affichés
// serveur action supprimer les skills selectionné
// route :  cv-processing
//dans cette route on parse le pdf + on recupere le texte brute
// on compare avec les skills
//on prepare un feedback avec IA
//serveur action pour afficher le feedback avec ID

const Page = () => {
  return (
    <div>
      <ScanForm />;
    </div>
  );
};

export default Page;
