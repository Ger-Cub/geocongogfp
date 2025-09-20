export interface FormationData {
  formation_id: string;
  user_id: string;
  titre: string;
  description_courte: string;
  contexte_utilisateur: {
    objectif: string;
    niveau: string;
    motivation: string;
    secteur_vise: string;
    date_debut: string;
    duree_jours: number;
    minutes_par_jour: number;
  };
  competences_ciblees: string[];
  generation: {
    timestamp: string;
    model: string;
  };
  programme: Module[];
  planning_journalier: PlanJournalier[];
  evaluation: {
    structure: { type: string; poids_total: number }[];
    calcul_notes: { exemple: string };
    seuils_mentions: Record<string, number>;
  };
  suivi_progression: {
    scores: any[];
    etat_global: string;
  };
  certificat: {
    template_id: string;
    titre_certificat: string;
    champs: {
      nom_participant: string;
      formation: string;
      date_debut: string;
      date_fin: string;
      score_final: number | null;
      mention: string | null;
    };
    telechargement_url: string | null;
  };
  meta: {
    lang: string;
    visibility: string;
    tags: string[];
  };
}

export interface Module {
  module_id: string;
  titre: string;
  resume: string;
  estimation_minutes: number;
  lecons: Lecon[];
  quiz: Quiz;
}

export interface Lecon {
  lecon_id: string;
  titre: string;
  contenu_resume: string;
  estimated_minutes: number;
  references: Reference[];
}

export interface Reference {
  document_id: string;
  titre: string;
  page_start: number;
  page_end: number;
}

export interface Quiz {
  quiz_id: string;
  titre: string;
  questions: Question[];
  poids: number;
}

export interface Question {
  q_id: string;
  texte: string;
  options: string[];
  correct_option_index: number;
  explication: string;
}

export interface PlanJournalier {
  jour: number;
  date: string;
  minutes_total: number;
  activites: Activite[];
}

export interface Activite {
  type: string;
  ref?: string;
  titre?: string;
  minutes: number;
}

export const formationSample: FormationData = {
  "formation_id": "f_20250921_001",
  "user_id": "u_06254474-2095-452e-8723-290fc885e723",
  "titre": "Initiation à la Géologie du Congo - Parcours Intensif",
  "description_courte": "Programme intensif personnalisé pour maîtriser les bases de la géologie du Congo en 7 jours, avec lectures ciblées, exercices et quiz quotidiens.",
  "contexte_utilisateur": {
    "objectif": "Préparer un entretien d'embauche en exploration minière",
    "niveau": "Intermédiaire",
    "motivation": "Rattraper des cours manqués et se préparer à un entretien",
    "secteur_vise": "Exploration minière",
    "date_debut": "2025-10-01",
    "duree_jours": 7,
    "minutes_par_jour": 90
  },
  "competences_ciblees": [
    "Interprétation de cartes géologiques",
    "Reconnaissance des formations stratiformes",
    "Lecture et synthèse de rapports géologiques"
  ],
  "generation": { "timestamp": "2025-09-21T12:00:00Z", "model": "gpt-4" },
  "programme": [
    {
      "module_id": "m1",
      "titre": "Introduction & Contexte géologique du Congo",
      "resume": "Connaissances de base sur la géologie régionale, provinces géologiques et cadres tectoniques pertinents pour l'exploration.",
      "estimation_minutes": 90,
      "lecons": [
        {
          "lecon_id": "m1_l1",
          "titre": "Cadre tectonique et provinces géologiques",
          "contenu_resume": "Vue d'ensemble des provinces géologiques du Congo, unités lithologiques principales et implications pour la minéralogie.",
          "estimated_minutes": 30,
          "references": [
            { "document_id": "doc_001", "titre": "Carte géologique régionale", "page_start": 1, "page_end": 6 },
            { "document_id": "doc_005", "titre": "Rapport synthèse UOB 2018", "page_start": 23, "page_end": 25 }
          ]
        },
        {
          "lecon_id": "m1_l2",
          "titre": "Terminologie et méthodes d'observation de terrain",
          "contenu_resume": "Principales méthodes de cartographie et d'observation en contexte de terrain, identification visuelle des lithologies.",
          "estimated_minutes": 30,
          "references": [
            { "document_id": "doc_023", "titre": "Guide d'observation de terrain", "page_start": 10, "page_end": 22 }
          ]
        },
        {
          "lecon_id": "m1_l3",
          "titre": "Synthèse: implications pour l'exploration",
          "contenu_resume": "Comment relier observations et cibles d'exploration.",
          "estimated_minutes": 30,
          "references": []
        }
      ],
      "quiz": {
        "quiz_id": "m1_q1",
        "titre": "Quiz module 1",
        "questions": [
          {
            "q_id": "m1_q1_q1",
            "texte": "Quelle province géologique est la plus susceptible d'héberger des stratiformes?",
            "options": ["Province A", "Province B", "Province C", "Province D"],
            "correct_option_index": 1,
            "explication": "La Province B présente des unités sédimentaires favorables aux stratiformes."
          },
          {
            "q_id": "m1_q1_q2",
            "texte": "Quel outil est essentiel pour la cartographie de terrain?",
            "options": ["Scanner laser", "Boussole géologique", "Spectromètre", "Drone"],
            "correct_option_index": 1,
            "explication": "La boussole géologique permet de mesurer l'orientation des plans et des plis."
          }
        ],
        "poids": 0.1
      }
    },
    {
      "module_id": "m2",
      "titre": "Formation et identification des minéralisations stratiformes",
      "resume": "Étude des environnements de dépôt et reconnaissance des textures et minéraux indicateurs.",
      "estimation_minutes": 120,
      "lecons": [
        {
          "lecon_id": "m2_l1",
          "titre": "Processus de dépôt des stratiformes",
          "contenu_resume": "Origines des stratiformes, indices géochimiques et minéralogiques.",
          "estimated_minutes": 40,
          "references": [
            { "document_id": "doc_045", "titre": "Étude minéralogique RD Congo", "page_start": 12, "page_end": 30 }
          ]
        },
        {
          "lecon_id": "m2_l2",
          "titre": "Reconnaissance des textures et des indices visuels",
          "contenu_resume": "Clés d'observation pour repérer des indices minéralogiques in situ.",
          "estimated_minutes": 40,
          "references": [
            { "document_id": "doc_045", "titre": "Étude minéralogique RD Congo", "page_start": 31, "page_end": 45 }
          ]
        },
        {
          "lecon_id": "m2_l3",
          "titre": "Exemples de cas locaux",
          "contenu_resume": "Analyse de cas concrets avec cartes et coupes.",
          "estimated_minutes": 40,
          "references": [
            { "document_id": "doc_007", "titre": "Cas d'étude: zone X", "page_start": 5, "page_end": 18 }
          ]
        }
      ],
      "quiz": {
        "quiz_id": "m2_q1",
        "titre": "Quiz module 2",
        "questions": [
          {
            "q_id": "m2_q1_q1",
            "texte": "Quel minéral indicateur est souvent associé aux stratiformes cuivreux?",
            "options": ["Quartz", "Chalcopyrite", "Calcite", "Olivine"],
            "correct_option_index": 1,
            "explication": "La chalcopyrite est un sulfure de cuivre courant dans ces environnements."
          }
        ],
        "poids": 0.15
      }
    }
  ],
  "planning_journalier": [
    {
      "jour": 1,
      "date": "2025-10-01",
      "minutes_total": 90,
      "activites": [
        { "type": "lecon", "ref": "m1_l1", "minutes": 30 },
        { "type": "lecon", "ref": "m1_l2", "minutes": 30 },
        { "type": "quiz", "ref": "m1_q1", "minutes": 30 }
      ]
    },
    {
      "jour": 2,
      "date": "2025-10-02",
      "minutes_total": 90,
      "activites": [
        { "type": "lecon", "ref": "m1_l3", "minutes": 30 },
        { "type": "lecon", "ref": "m2_l1", "minutes": 40 },
        { "type": "quiz", "ref": "m2_q1", "minutes": 20 }
      ]
    },
    {
      "jour": 3,
      "date": "2025-10-03",
      "minutes_total": 90,
      "activites": [
        { "type": "lecon", "ref": "m2_l2", "minutes": 40 },
        { "type": "lecon", "ref": "m2_l3", "minutes": 40 },
        { "type": "revision", "ref": "m1_summary", "minutes": 10 }
      ]
    },
    {
      "jour": 4,
      "date": "2025-10-04",
      "minutes_total": 90,
      "activites": [
        { "type": "atelier", "titre": "Interprétation carte", "minutes": 60 },
        { "type": "quiz", "ref": "m1_q1", "minutes": 30 }
      ]
    },
    {
      "jour": 5,
      "date": "2025-10-05",
      "minutes_total": 90,
      "activites": [
        { "type": "lecon", "ref": "m2_l1", "minutes": 40 },
        { "type": "atelier", "titre": "Exercice terrain simulé", "minutes": 50 }
      ]
    },
    {
      "jour": 6,
      "date": "2025-10-06",
      "minutes_total": 90,
      "activites": [
        { "type": "revision", "titre": "Synthèse modules 1-2", "minutes": 90 }
      ]
    },
    {
      "jour": 7,
      "date": "2025-10-07",
      "minutes_total": 90,
      "activites": [
        { "type": "test_final", "titre": "Test final: 30 questions", "minutes": 60 },
        { "type": "correction", "titre": "Correction & feedback", "minutes": 30 }
      ]
    }
  ],
  "evaluation": {
    "structure": [
      { "type": "quiz_module", "poids_total": 0.25 },
      { "type": "test_final", "poids_total": 0.50 },
      { "type": "participation_ateliers", "poids_total": 0.25 }
    ],
    "calcul_notes": {
      "exemple": "note_finale = 0.25 * moyenne(quizzes) + 0.50 * score_test_final + 0.25 * score_ateliers"
    },
    "seuils_mentions": {
      "Excellent": 85,
      "Bien": 70,
      "Passable": 50,
      "Insuffisant": 0
    }
  },
  "suivi_progression": {
    "scores": [],
    "etat_global": "non_demarree"
  },
  "certificat": {
    "template_id": "cert_geo_01",
    "titre_certificat": "Certificat de formation - GeoCongo AI",
    "champs": {
      "nom_participant": "Gerard Cubaka",
      "formation": "Initiation à la Géologie du Congo - Parcours Intensif",
      "date_debut": "2025-10-01",
      "date_fin": "2025-10-07",
      "score_final": null,
      "mention": null
    },
    "telechargement_url": null
  },
  "meta": { "lang": "fr", "visibility": "private", "tags": ["géologie", "stratiforme", "formation_personnalisée"] }
};