import p01 from "./p01.jpg";
import p02 from "./p02.jpg";
import p03 from "./p03.jpg";
import p04 from "./p04.jpg";
import p05 from "./p05.jpg";
import p06 from "./p06.jpg";
import p07 from "./p07.jpg";
import p08 from "./p08.jpg";
import p09 from "./p09.jpg";
import p10 from "./p10.jpg";
import p11 from "./p11.jpg";
import p12 from "./p12.jpg";
import p13 from "./p13.jpg";
import p14 from "./p14.jpg";
import p15 from "./p15.jpg";
import p16 from "./p16.jpg";
import p17 from "./p17.jpg";
import p18 from "./p18.jpg";
import p19 from "./p19.jpg";
import p20 from "./p20.jpg";
import p21 from "./p21.jpg";
import p22 from "./p22.jpg";
import p23 from "./p23.jpg";
import p24 from "./p24.jpg";
import p25 from "./p25.jpg";
import p26 from "./p26.jpg";
import p27 from "./p27.jpg";
import p28 from "./p28.jpg";
import p29 from "./p29.jpg";
import p30 from "./p30.jpg";
import p31 from "./p31.jpg";
import p32 from "./p32.jpg";
import p33 from "./p33.jpg";
import p34 from "./p34.jpg";
import p35 from "./p35.jpg";
import p36 from "./p36.jpg";

export const PROFILE_PHOTOS = [
  p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12,
  p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24,
  p25, p26, p27, p28, p29, p30, p31, p32, p33, p34, p35, p36,
];

/**
 * Identité humaine attachée à chaque photo : prénom (Bénin / Afrique de l'Ouest),
 * âge et mot de sagesse — pour personnaliser chaque vignette du Mur des
 * consultations. Ordre strictement aligné sur PROFILE_PHOTOS.
 */
export interface Profile {
  index: number;       // 1-based, matches p01..p36
  firstName: string;
  age: number;
  wisdom: string;      // "mot de sagesse" - une phrase courte
  archetype: string;   // courte description du profil (rôle/posture)
}

export const PROFILES: Profile[] = [
  { index: 1,  firstName: "Kwesi",     age: 24, archetype: "Jeune apprenti",          wisdom: "Apprendre, c'est accepter de ne pas savoir." },
  { index: 2,  firstName: "Adjoa",     age: 32, archetype: "Tisserande",              wisdom: "Le fil patient finit par dessiner le motif." },
  { index: 3,  firstName: "Baba Issa", age: 70, archetype: "Sage du quartier",        wisdom: "Le vieil arbre n'a pas peur du vent : il a déjà plié." },
  { index: 4,  firstName: "Folake",    age: 28, archetype: "Photographe",             wisdom: "Voir vraiment, c'est aussi se laisser regarder." },
  { index: 5,  firstName: "Mensah",    age: 35, archetype: "Maître d'école",          wisdom: "Enseigner, c'est offrir une question, pas une réponse." },
  { index: 6,  firstName: "Mama Akoua", age: 62, archetype: "Doyenne du marché",      wisdom: "Ce qui est lent prend racine ; ce qui court s'épuise." },
  { index: 7,  firstName: "Naya",      age: 26, archetype: "Infirmière",              wisdom: "Veiller sur l'autre, c'est aussi veiller sur soi." },
  { index: 8,  firstName: "Kwame",     age: 39, archetype: "Chauffeur-philosophe",    wisdom: "Chaque virage demande qu'on ralentisse, pas qu'on s'arrête." },
  { index: 9,  firstName: "Sika",      age: 30, archetype: "Coiffeuse",               wisdom: "On ne tresse pas les cheveux d'un cœur en désordre." },
  { index: 10, firstName: "Yao",       age: 27, archetype: "Étudiant",                wisdom: "Le chemin se révèle au marcheur, jamais à l'attentiste." },
  { index: 11, firstName: "Efua",      age: 55, archetype: "Restauratrice",           wisdom: "Le repas qui guérit, c'est celui qu'on partage." },
  { index: 12, firstName: "Ifedola",   age: 25, archetype: "Coiffeuse-artiste",       wisdom: "Le geste répété devient une prière silencieuse." },
  { index: 13, firstName: "Mama Hounon", age: 78, archetype: "Doyenne du village", wisdom: "Le silence des anciens parle plus haut que les tambours." },
  { index: 14, firstName: "Sélim",     age: 22, archetype: "Apprenti musicien",    wisdom: "On ne compose pas la vie : on l'écoute." },
  { index: 15, firstName: "Zinsou",    age: 50, archetype: "Pêcheur du delta",     wisdom: "Quand l'eau monte, on ne lutte pas : on apprend à flotter." },
  { index: 16, firstName: "Ifeoma",    age: 28, archetype: "Sociologue",           wisdom: "Comprendre, c'est déjà commencer à pardonner." },
  { index: 17, firstName: "El Hadj Issa", age: 72, archetype: "Notable et conteur", wisdom: "Le passé n'est pas derrière nous, il marche à nos côtés." },
  { index: 18, firstName: "Selasi",    age: 17, archetype: "Lycéenne",             wisdom: "Avoir peur ne veut pas dire reculer." },
  { index: 19, firstName: "Akua",      age: 45, archetype: "Vendeuse au marché Dantokpa", wisdom: "Le rire est la monnaie qu'on ne perd jamais." },
  { index: 20, firstName: "Olamide",   age: 38, archetype: "Sculpteur sur bois",   wisdom: "Ce qu'on enlève au bois, le bois nous l'apprend." },
  { index: 21, firstName: "Zola",      age: 26, archetype: "Jeune mère",           wisdom: "Porter un enfant, c'est apprendre à porter le monde autrement." },
  { index: 22, firstName: "Demba",     age: 42, archetype: "Chercheuse universitaire", wisdom: "Une question bien posée vaut mille certitudes." },
  { index: 23, firstName: "Tariq",     age: 33, archetype: "Musicien jazz",        wisdom: "Le silence entre deux notes contient toute la chanson." },
  { index: 24, firstName: "Nâ Hounsi", age: 80, archetype: "Prêtresse vodoun",     wisdom: "Les esprits ne crient pas — ils attendent qu'on se taise." },
  { index: 25, firstName: "Ezéchiel",  age: 19, archetype: "Étudiant en droit",    wisdom: "La justice commence par la justesse de soi." },
  { index: 26, firstName: "Houénou",   age: 65, archetype: "Grand-mère gardienne", wisdom: "Ce qu'on garde dans la main se ferme ; ce qu'on ouvre, on le partage." },
  { index: 27, firstName: "Adjévi",    age: 55, archetype: "Notable Yoruba",       wisdom: "L'autorité véritable se courbe pour écouter." },
  { index: 28, firstName: "Folasade",  age: 24, archetype: "Athlète",              wisdom: "Le corps qui s'effondre enseigne ce que l'esprit refuse." },
  { index: 29, firstName: "Tchié",     age: 60, archetype: "Cultivateur",          wisdom: "La terre rend en saisons ce qu'on lui a donné en gestes." },
  { index: 30, firstName: "Nadège",    age: 35, archetype: "Avocate",              wisdom: "Plaider pour autrui m'a appris à me défendre moi-même." },
  { index: 31, firstName: "Kwabéna",   age: 12, archetype: "Écolier curieux",      wisdom: "Pourquoi est le mot le plus puissant que je connais." },
  { index: 32, firstName: "Yémissi",   age: 30, archetype: "Future maman",         wisdom: "Attendre, ce n'est pas perdre du temps : c'est lui en donner." },
  { index: 33, firstName: "Dada Houngan", age: 68, archetype: "Guérisseur traditionnel", wisdom: "On soigne l'autre avec ce qu'on s'est pardonné à soi." },
  { index: 34, firstName: "Mawunyo",   age: 40, archetype: "Couturière",           wisdom: "Les coutures qui tiennent sont celles qu'on a refaites." },
  { index: 35, firstName: "Sékou",     age: 29, archetype: "Photographe urbain",   wisdom: "Lever les yeux change ce qu'on croit voir." },
  { index: 36, firstName: "Da Avlékété", age: 85, archetype: "Conteuse des rivages", wisdom: "Rire fort, c'est aussi une façon d'avoir survécu." },
];

export const getProfileForIndex = (i: number): Profile =>
  PROFILES[i % PROFILES.length];
