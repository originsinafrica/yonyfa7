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
 * Identité humaine attachée à chaque profil — 64 Béninois vivant au Bénin
 * ou dans la diaspora. Chaque profil a une fiche complète accessible depuis
 * la fiche du bokônon (page /profil/:id).
 *
 * `photoIndex` (0-based) renvoie vers PROFILE_PHOTOS — plusieurs profils
 * peuvent partager une même photo car nous avons 36 photos pour 64 profils.
 */
export interface Profile {
  id: string;            // slug stable pour l'URL /profil/:id
  index: number;         // 1-based, ordre canonique
  photoIndex: number;    // 0-based dans PROFILE_PHOTOS
  firstName: string;
  lastName: string;
  age: number;
  archetype: string;     // courte description du rôle / posture
  activity: string;      // métier / activité principale
  location: string;      // ville, pays (Bénin ou diaspora)
  bio: string;           // 2-4 phrases
  products: string[];    // produits ou services proposés
  projects: string[];    // besoins ou projets en cours
  email: string;         // pour le formulaire de contact (mailto)
  wisdom: string;        // mot de sagesse — utilisé sur le mur
}

const slug = (i: number, fn: string, ln: string) =>
  `${String(i).padStart(2, "0")}-${fn}-${ln}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const make = (
  index: number,
  photoIndex: number,
  firstName: string,
  lastName: string,
  age: number,
  archetype: string,
  activity: string,
  location: string,
  bio: string,
  products: string[],
  projects: string[],
  wisdom: string,
): Profile => ({
  id: slug(index, firstName, lastName),
  index,
  photoIndex,
  firstName,
  lastName,
  age,
  archetype,
  activity,
  location,
  bio,
  products,
  projects,
  email: `${slug(index, firstName, lastName)}@yonyfa.bj`,
  wisdom,
});

export const PROFILES: Profile[] = [
  // ── Cotonou & sud-Bénin ──────────────────────────────────────────────
  make(1, 0, "Kwesi", "Hounkpatin", 24, "Jeune apprenti", "Apprenti menuisier", "Cotonou, Bénin",
    "Né à Akpakpa, Kwesi apprend la menuiserie traditionnelle auprès de son oncle. Il rêve d'ouvrir un atelier qui mélange bois local et design contemporain.",
    ["Petits meubles sur commande", "Tabourets en iroko", "Réparation de mobilier"],
    ["Trouver un mentor designer", "Financer un premier établi pro"],
    "Apprendre, c'est accepter de ne pas savoir."),
  make(2, 1, "Adjoa", "Sodjinou", 32, "Tisserande", "Tisserande de pagnes Adinkra", "Abomey-Calavi, Bénin",
    "Adjoa tisse depuis l'enfance. Elle revisite les motifs traditionnels Fon et Adinkra pour une clientèle qui aime les pièces uniques.",
    ["Pagnes tissés main", "Écharpes en coton bio", "Ateliers d'initiation au tissage"],
    ["Exporter vers la diaspora", "Former 5 jeunes filles d'ici fin d'année"],
    "Le fil patient finit par dessiner le motif."),
  make(3, 2, "Baba Issa", "Adjovi", 70, "Sage du quartier", "Notable, médiateur communautaire", "Porto-Novo, Bénin",
    "Ancien instituteur, Baba Issa est aujourd'hui appelé pour apaiser les conflits familiaux du quartier. Il anime aussi un cercle de paroles le dimanche.",
    ["Médiation familiale", "Consultations de sagesse", "Récits oraux"],
    ["Transmettre ses contes par audio", "Trouver un jeune scribe pour ses mémoires"],
    "Le vieil arbre n'a pas peur du vent : il a déjà plié."),
  make(4, 3, "Folake", "Akplogan", 28, "Photographe", "Photographe documentaire", "Cotonou, Bénin",
    "Folake parcourt les marchés et villages pour documenter les gestes qui disparaissent. Ses tirages sont exposés à Lagos et Paris.",
    ["Tirages limités", "Reportages sur commande", "Portraits d'artisans"],
    ["Préparer une expo solo à Cotonou", "Publier un livre photo"],
    "Voir vraiment, c'est aussi se laisser regarder."),
  make(5, 4, "Mensah", "Vodounon", 35, "Maître d'école", "Instituteur à l'école publique", "Ouidah, Bénin",
    "Mensah enseigne en CM2 et anime un club de lecture. Il pense que la curiosité est la première compétence du XXIᵉ siècle.",
    ["Cours du soir", "Soutien scolaire", "Animation de clubs lecture"],
    ["Créer une mini-bibliothèque de quartier", "Trouver des livres jeunesse en français"],
    "Enseigner, c'est offrir une question, pas une réponse."),
  make(6, 5, "Mama Akoua", "Dossou", 62, "Doyenne du marché", "Vendeuse en gros au marché Dantokpa", "Cotonou, Bénin",
    "Mama Akoua tient son étal depuis 40 ans. Elle a vu trois générations de commerçantes passer et garde une mémoire fine des prix et des saisons.",
    ["Vente en gros de tissus", "Conseil aux jeunes vendeuses"],
    ["Ouvrir un compte mobile money pro", "Organiser une tontine numérique"],
    "Ce qui est lent prend racine ; ce qui court s'épuise."),
  make(7, 6, "Naya", "Tchégnon", 26, "Infirmière", "Infirmière en pédiatrie", "Parakou, Bénin",
    "Naya travaille de nuit au CHU de Parakou. Elle milite pour de meilleures conditions pour le personnel soignant féminin.",
    ["Ateliers premiers secours", "Conseils aux jeunes mamans"],
    ["Lever des fonds pour matériel pédiatrique", "Suivre une spécialisation néonatale"],
    "Veiller sur l'autre, c'est aussi veiller sur soi."),
  make(8, 7, "Kwame", "Aïzo", 39, "Chauffeur-philosophe", "Chauffeur VTC", "Cotonou, Bénin",
    "Kwame fait Cotonou-Sèmè en boucle. Il enregistre des podcasts entre deux courses et a déjà 2000 auditeurs sur WhatsApp.",
    ["Podcast hebdomadaire 'Au volant'", "Transport longue distance"],
    ["Acheter un meilleur micro", "Monétiser son podcast"],
    "Chaque virage demande qu'on ralentisse, pas qu'on s'arrête."),
  make(9, 8, "Sika", "Gbaguidi", 30, "Coiffeuse", "Coiffeuse à domicile", "Cotonou, Bénin",
    "Sika tresse, lisse et conseille. Sa clientèle vient surtout par bouche-à-oreille — elle veut maintenant ouvrir un vrai salon.",
    ["Tresses et locks", "Soins capillaires naturels", "Cours de coiffure"],
    ["Trouver un local à Akpakpa", "Lancer une marque de soins"],
    "On ne tresse pas les cheveux d'un cœur en désordre."),
  make(10, 9, "Yao", "Adégbola", 27, "Étudiant", "Étudiant en informatique", "Abomey-Calavi, Bénin",
    "Yao termine son master à l'UAC. Il bricole des bots WhatsApp pour des PME locales pendant ses temps libres.",
    ["Création de bots WhatsApp", "Sites vitrine", "Cours d'informatique"],
    ["Trouver un stage à l'étranger", "Lancer une mini-startup edtech"],
    "Le chemin se révèle au marcheur, jamais à l'attentiste."),
  make(11, 10, "Efua", "Hounyovi", 55, "Restauratrice", "Cheffe d'un maquis", "Cotonou, Bénin",
    "Efua tient 'Chez Efua', un maquis réputé pour son atassi et son poisson braisé. Elle forme aussi des jeunes femmes en cuisine.",
    ["Plats du jour à emporter", "Traiteur événementiel", "Formation cuisine béninoise"],
    ["Ouvrir un second maquis", "Publier un livre de recettes"],
    "Le repas qui guérit, c'est celui qu'on partage."),
  make(12, 11, "Ifedola", "Kpadonou", 25, "Coiffeuse-artiste", "Coiffeuse créatrice", "Porto-Novo, Bénin",
    "Ifedola fait du headwrap d'art : pièces sculpturales pour mariées et défilés. Elle a déjà collaboré avec deux stylistes lagosiens.",
    ["Headwraps sur mesure", "Coiffures de mariée", "Shootings mode"],
    ["Participer à la Lagos Fashion Week", "Créer une collection capsule"],
    "Le geste répété devient une prière silencieuse."),
  make(13, 12, "Mama Hounon", "Daagbo", 78, "Doyenne du village", "Gardienne d'un couvent vodoun", "Ouidah, Bénin",
    "Mama Hounon veille sur les rituels et les jeunes initiées. Sa parole est rare, donc précieuse.",
    ["Consultations spirituelles", "Cérémonies traditionnelles"],
    ["Transmettre les chants à la nouvelle génération"],
    "Le silence des anciens parle plus haut que les tambours."),
  make(14, 13, "Sélim", "Houessou", 22, "Apprenti musicien", "Étudiant et percussionniste", "Cotonou, Bénin",
    "Sélim joue du tama et du djembé. Il fusionne traditionnel et électro dans ses prods home-studio.",
    ["Sessions live", "Beats afro-électro à licencier"],
    ["Sortir un premier EP", "Trouver un label"],
    "On ne compose pas la vie : on l'écoute."),
  make(15, 14, "Zinsou", "Aguidi", 50, "Pêcheur du delta", "Pêcheur lagunaire", "Aguégués, Bénin",
    "Zinsou pêche depuis l'âge de 12 ans dans la lagune de Porto-Novo. Il connaît chaque courant comme sa poche.",
    ["Vente directe de poisson frais", "Visites guidées de la lagune"],
    ["Acheter une pirogue motorisée", "Initier ses neveux à l'éco-tourisme"],
    "Quand l'eau monte, on ne lutte pas : on apprend à flotter."),
  make(16, 15, "Ifeoma", "Tossou", 28, "Sociologue", "Chercheuse en sciences sociales", "Cotonou, Bénin",
    "Ifeoma travaille sur les transmissions matrilinéaires au sud-Bénin. Elle publie aussi sur un blog grand public.",
    ["Études qualitatives", "Conférences", "Articles vulgarisés"],
    ["Soutenir sa thèse", "Lancer un podcast académique"],
    "Comprendre, c'est déjà commencer à pardonner."),
  make(17, 16, "El Hadj Issa", "Bio Tchané", 72, "Notable et conteur", "Conteur, ancien greffier", "Parakou, Bénin",
    "El Hadj Issa raconte l'histoire de Parakou aux enfants des écoles. Sa voix grave fait partie du patrimoine local.",
    ["Veillées de contes", "Conseil aux familles"],
    ["Numériser ses cassettes audio"],
    "Le passé n'est pas derrière nous, il marche à nos côtés."),
  make(18, 17, "Selasi", "Mensah", 17, "Lycéenne", "Lycéenne en terminale", "Cotonou, Bénin",
    "Selasi prépare le bac C et anime un club d'éloquence. Elle veut devenir avocate des droits des enfants.",
    ["Tutorat en maths", "Coaching éloquence pour collégiens"],
    ["Décrocher une bourse pour le Maroc", "Monter un mini-tribunal scolaire"],
    "Avoir peur ne veut pas dire reculer."),
  make(19, 18, "Akua", "Zinsou", 45, "Vendeuse au marché", "Vendeuse de pagnes Dantokpa", "Cotonou, Bénin",
    "Akua connaît tous les imprimés Vlisco par cœur. Elle conseille mariées et stylistes avec finesse.",
    ["Pagnes Vlisco neufs", "Tissus rares", "Conseil mariage"],
    ["Numériser son catalogue sur WhatsApp Business"],
    "Le rire est la monnaie qu'on ne perd jamais."),
  make(20, 19, "Olamide", "Kakpo", 38, "Sculpteur sur bois", "Sculpteur traditionnel", "Abomey, Bénin",
    "Olamide perpétue la tradition des bas-reliefs d'Abomey. Ses pièces sont vendues à des collectionneurs.",
    ["Sculptures sur commande", "Bas-reliefs muraux", "Restauration"],
    ["Exposer en Europe", "Former un atelier de 3 apprentis"],
    "Ce qu'on enlève au bois, le bois nous l'apprend."),
  make(21, 20, "Zola", "Agbodjan", 26, "Jeune mère", "Mère au foyer et créatrice", "Cotonou, Bénin",
    "Zola crée des vêtements bébé en wax depuis la naissance de sa fille. Elle vend sur Instagram.",
    ["Vêtements bébé en wax", "Doudous personnalisés"],
    ["Trouver une couturière partenaire", "Ouvrir une boutique en ligne"],
    "Porter un enfant, c'est apprendre à porter le monde autrement."),
  make(22, 21, "Demba", "Lawani", 42, "Chercheuse universitaire", "Maître de conférences en histoire", "Abomey-Calavi, Bénin",
    "Demba enseigne l'histoire de l'Afrique précoloniale. Elle est aussi consultante pour les musées.",
    ["Conférences", "Visites guidées musées", "Conseil scientifique"],
    ["Co-écrire un manuel pour le secondaire"],
    "Une question bien posée vaut mille certitudes."),
  make(23, 22, "Tariq", "Adjévi", 33, "Musicien jazz", "Saxophoniste de jazz", "Cotonou, Bénin",
    "Tariq joue dans les hôtels de Cotonou et tourne en région. Il prépare un album fusion jazz-vodoun.",
    ["Concerts privés", "Cours de saxo", "Compositions sur mesure"],
    ["Enregistrer son album à Lagos"],
    "Le silence entre deux notes contient toute la chanson."),
  make(24, 23, "Nâ Hounsi", "Avlessi", 80, "Prêtresse vodoun", "Prêtresse vodoun Mami Wata", "Ouidah, Bénin",
    "Nâ Hounsi est consultée pour les questions de fertilité et d'eau. Elle ne reçoit que sur recommandation.",
    ["Consultations spirituelles", "Bénédictions de pirogues"],
    ["Transmettre à sa petite-fille"],
    "Les esprits ne crient pas — ils attendent qu'on se taise."),
  make(25, 24, "Ezéchiel", "Tognidé", 19, "Étudiant en droit", "Étudiant en L2 droit", "Abomey-Calavi, Bénin",
    "Ezéchiel veut devenir avocat pénaliste. Il fait du bénévolat dans une clinique juridique étudiante.",
    ["Aide à la rédaction de courriers", "Information juridique de base"],
    ["Décrocher un stage en cabinet"],
    "La justice commence par la justesse de soi."),
  make(26, 25, "Houénou", "Kpodar", 65, "Grand-mère gardienne", "Retraitée, gardienne d'enfants", "Porto-Novo, Bénin",
    "Houénou garde les petits-enfants du quartier après l'école. Elle leur apprend les chants en goun.",
    ["Garderie informelle", "Initiation à la langue goun"],
    ["Créer une vraie crèche de quartier"],
    "Ce qu'on garde dans la main se ferme ; ce qu'on ouvre, on le partage."),
  make(27, 26, "Adjévi", "Olatunji", 55, "Notable Yoruba", "Chef d'entreprise BTP", "Porto-Novo, Bénin",
    "Adjévi dirige une PME de construction de 40 salariés. Il siège aussi au conseil des notables yoruba de Porto-Novo.",
    ["Construction clé en main", "Rénovation patrimoniale"],
    ["Restaurer une maison afro-brésilienne historique"],
    "L'autorité véritable se courbe pour écouter."),
  make(28, 27, "Folasade", "Houedanou", 24, "Athlète", "Athlète judo, équipe nationale", "Cotonou, Bénin",
    "Folasade prépare les Jeux africains. Elle entraîne aussi des fillettes du quartier le week-end.",
    ["Cours de self-défense", "Coaching mental sportif"],
    ["Trouver un sponsor pour les Jeux", "Ouvrir un dojo de quartier"],
    "Le corps qui s'effondre enseigne ce que l'esprit refuse."),
  make(29, 28, "Tchié", "Gnonlonfoun", 60, "Cultivateur", "Cultivateur d'ananas", "Allada, Bénin",
    "Tchié exploite 4 hectares d'ananas pain de sucre. Il transforme aussi en jus en saison.",
    ["Ananas frais en gros", "Jus pasteurisé", "Visites de plantation"],
    ["Acheter une ligne de transformation", "Obtenir le label bio"],
    "La terre rend en saisons ce qu'on lui a donné en gestes."),
  make(30, 29, "Nadège", "Hountondji", 35, "Avocate", "Avocate au barreau de Cotonou", "Cotonou, Bénin",
    "Nadège est spécialisée en droit de la famille. Elle anime aussi un compte TikTok juridique très suivi.",
    ["Consultations juridiques", "Médiation familiale", "Formations entreprises"],
    ["Lancer une plateforme de conseil en ligne"],
    "Plaider pour autrui m'a appris à me défendre moi-même."),
  make(31, 30, "Kwabéna", "Adjanohoun", 12, "Écolier curieux", "Élève de 6ème", "Cotonou, Bénin",
    "Kwabéna démonte tout ce qu'il trouve. Il rêve de réparer les vélos du quartier dans son garage maison.",
    ["Réparation de vélos d'enfants"],
    ["Apprendre l'électronique de base"],
    "Pourquoi est le mot le plus puissant que je connais."),
  make(32, 31, "Yémissi", "Sodégla", 30, "Future maman", "Sage-femme libérale", "Cotonou, Bénin",
    "Yémissi accompagne les grossesses à domicile. Enceinte de son premier enfant, elle écrit un guide pratique.",
    ["Suivi prénatal à domicile", "Cours de préparation à l'accouchement"],
    ["Publier son guide", "Former 10 doulas"],
    "Attendre, ce n'est pas perdre du temps : c'est lui en donner."),
  make(33, 32, "Dada Houngan", "Kessilé", 68, "Guérisseur traditionnel", "Phytothérapeute", "Bohicon, Bénin",
    "Dada Houngan soigne avec les plantes. Il collabore avec un labo français pour étudier ses formules.",
    ["Consultations en phytothérapie", "Décoctions personnalisées"],
    ["Documenter ses recettes", "Protéger ses savoirs"],
    "On soigne l'autre avec ce qu'on s'est pardonné à soi."),
  make(34, 33, "Mawunyo", "Akakpo", 40, "Couturière", "Couturière sur mesure", "Cotonou, Bénin",
    "Mawunyo coud des tenues de cérémonie pour mariages. Elle a 4 apprenties dans son atelier.",
    ["Tenues de mariage", "Uniformes scolaires", "Retouches"],
    ["Ouvrir un showroom", "Lancer une marque prêt-à-porter"],
    "Les coutures qui tiennent sont celles qu'on a refaites."),
  make(35, 34, "Sékou", "Vinou", 29, "Photographe urbain", "Photographe street & mariage", "Cotonou, Bénin",
    "Sékou capte les mariages haut de gamme et fait du street photo le dimanche. Il veut publier un livre sur Cotonou by night.",
    ["Reportages mariage", "Shootings entreprise", "Tirages d'art"],
    ["Sortir un photobook", "Exposer à Lomé"],
    "Lever les yeux change ce qu'on croit voir."),
  make(36, 35, "Da Avlékété", "Mehou", 85, "Conteuse des rivages", "Conteuse traditionnelle", "Grand-Popo, Bénin",
    "Da Avlékété raconte les contes de la côte aux enfants et aux touristes curieux. Elle vit face à la mer.",
    ["Veillées contes", "Initiation à la cosmologie vodoun"],
    ["Enregistrer ses contes en mina et en français"],
    "Rire fort, c'est aussi une façon d'avoir survécu."),

  // ── Diaspora ────────────────────────────────────────────────────────
  make(37, 0, "Aïssatou", "Houngbédji", 31, "Designer UX", "UX designer freelance", "Paris, France",
    "Née à Cotonou, Aïssatou vit à Paris depuis 8 ans. Elle conçoit des apps mobiles pour des fintech ouest-africaines.",
    ["Audit UX", "Design d'app mobile", "Workshops design thinking"],
    ["Recruter une dev front à Cotonou", "Lancer un studio franco-béninois"],
    "Le bon design écoute avant de parler."),
  make(38, 5, "Espérance", "Codjia", 47, "Cheffe de cuisine", "Cheffe d'un restaurant béninois", "Bruxelles, Belgique",
    "Espérance dirige 'Yovo Doko', table béninoise de Matonge. Elle forme aussi des jeunes diaspora à la cuisine du sud-Bénin.",
    ["Repas sur place et à emporter", "Traiteur événementiel", "Cours de cuisine"],
    ["Ouvrir une seconde adresse", "Importer directement du Bénin"],
    "Nourrir, c'est rappeler à quelqu'un d'où il vient."),
  make(39, 9, "Junior", "Adjamossi", 29, "Développeur", "Ingénieur backend", "Montréal, Canada",
    "Junior travaille dans une scale-up de logistique. Il code aussi un outil open source pour les coopératives agricoles béninoises.",
    ["Mentorat code", "Audit d'API", "Développement Go/Rust"],
    ["Trouver des co-mainteneurs pour son projet open source"],
    "Le code propre, c'est de la politesse pour celui qui vient après."),
  make(40, 3, "Princess", "Quenum", 27, "Mannequin", "Mannequin et créatrice", "Londres, Royaume-Uni",
    "Princess défile pour des marques afro-londoniennes. Elle prépare sa propre ligne de bijoux inspirée d'Abomey.",
    ["Shootings éditoriaux", "Bijoux artisanaux", "Image de marque"],
    ["Lever des fonds pour sa première collection"],
    "Marcher, c'est déjà raconter quelque chose."),
  make(41, 22, "Romuald", "Tognigban", 36, "DJ & producteur", "DJ afro-house", "Berlin, Allemagne",
    "Romuald tourne en Europe et fait vibrer les clubs avec un son mêlant beats vodoun et house. Il a son propre label.",
    ["Sets DJ", "Productions sur mesure", "Mastering"],
    ["Signer 3 nouveaux artistes africains sur son label"],
    "Le rythme est une langue que tout le monde reconnaît."),
  make(42, 6, "Sandrine", "Hounkpevi", 34, "Sage-femme", "Sage-femme hospitalière", "Lyon, France",
    "Sandrine exerce dans une maternité lyonnaise. Elle rentre au Bénin chaque été pour former bénévolement des matrones.",
    ["Conseils périnataux à distance", "Formations sage-femmes"],
    ["Monter une ONG périnatale Bénin-France"],
    "Mettre au monde, c'est aussi se mettre au monde soi-même."),
  make(43, 7, "Boris", "Akovi", 41, "Entrepreneur", "Fondateur d'une fintech", "New York, USA",
    "Boris a fondé une startup de remittances vers l'Afrique de l'Ouest. Il lève sa série A.",
    ["Conseil aux fondateurs africains", "Mentorat YC"],
    ["Recruter une équipe à Cotonou", "Ouvrir un bureau à Lagos"],
    "Construire, c'est rendre possible ce que les autres pensaient interdit."),
  make(44, 1, "Adèle", "Tchibozo", 38, "Architecte", "Architecte d'intérieur", "Dakar, Sénégal",
    "Adèle conçoit des hôtels boutique entre Dakar et Cotonou. Elle aime mêler matériaux locaux et lignes contemporaines.",
    ["Architecture d'intérieur", "Direction artistique hôtellerie"],
    ["Ouvrir un studio à Cotonou en 2026"],
    "Habiter un lieu, c'est l'écouter avant de le transformer."),
  make(45, 11, "Murielle", "Soglo", 33, "Styliste", "Styliste fondatrice de marque", "Abidjan, Côte d'Ivoire",
    "Murielle a fondé 'AYO', marque de prêt-à-porter féminin entre Abidjan et Cotonou. Distribuée dans 6 pays.",
    ["Prêt-à-porter féminin", "Pièces sur mesure", "Conseil image"],
    ["Ouvrir une boutique à Cotonou", "Distribution en Europe"],
    "S'habiller, c'est se présenter au monde sans parler."),
  make(46, 18, "Fortunée", "Houénoussi", 52, "Importatrice", "Importatrice de cosmétiques naturels", "Lagos, Nigeria",
    "Fortunée importe karité et produits du Bénin pour les distribuer au Nigeria. Elle emploie 12 personnes.",
    ["Distribution gros cosmétiques bio", "White label"],
    ["Lancer sa propre marque", "Certifier sa chaîne d'approvisionnement"],
    "Le commerce honnête traverse toutes les frontières."),
  make(47, 8, "Eloïse", "Adjavon", 25, "Coiffeuse afro", "Salon de tresses", "Paris, France",
    "Eloïse a ouvert un petit salon de tresses à Château Rouge. Sa clientèle vient de toute l'Île-de-France.",
    ["Tresses africaines", "Locks", "Soins natural hair"],
    ["Lancer sa gamme de soins", "Ouvrir un 2ᵉ salon"],
    "Tresser, c'est ranger les pensées."),
  make(48, 23, "Mama Hounsa", "Zinsou", 71, "Doyenne diaspora", "Présidente d'association", "Bruxelles, Belgique",
    "Mama Hounsa préside l'association des Béninois de Belgique. Elle organise les rapatriements et soutient les nouveaux arrivants.",
    ["Médiation familiale diaspora", "Conseil aux nouveaux arrivants"],
    ["Lever des fonds pour un foyer béninois à Bruxelles"],
    "On ne quitte jamais vraiment son village, on l'emporte."),
  make(49, 13, "Hervé", "Padonou", 24, "Étudiant ingénieur", "Étudiant en aéronautique", "Toulouse, France",
    "Hervé prépare un master à l'ISAE. Il rêve de créer une compagnie aérienne régionale ouest-africaine.",
    ["Tutorat maths/physique"],
    ["Trouver un stage chez Airbus", "Construire son réseau diaspora ingénierie"],
    "Voler, c'est avoir compris qu'il faut épouser le vent."),
  make(50, 14, "Tobi", "Hountondji", 48, "Pasteur", "Pasteur d'une église évangélique", "Atlanta, USA",
    "Tobi est pasteur d'une congrégation béninoise à Atlanta. Il anime aussi une émission radio dominicale.",
    ["Accompagnement spirituel", "Conseil conjugal"],
    ["Construire un nouveau lieu de culte"],
    "Servir, c'est se laisser remplir par plus grand que soi."),
  make(51, 15, "Carine", "Fagbohoun", 30, "Journaliste", "Journaliste politique freelance", "Dakar, Sénégal",
    "Carine couvre l'Afrique de l'Ouest pour plusieurs médias internationaux. Elle a une newsletter de 8000 abonnés.",
    ["Articles à la commande", "Interviews vidéo", "Formation journalisme"],
    ["Lancer un podcast d'enquête", "Écrire un livre sur la jeunesse béninoise"],
    "Informer, c'est refuser que le silence devienne loi."),
  make(52, 16, "Joël", "Acapko", 56, "Médecin", "Médecin généraliste", "Paris, France",
    "Joël exerce en banlieue parisienne depuis 25 ans. Il rentre 2 fois par an opérer bénévolement à Parakou.",
    ["Téléconsultations diaspora", "Missions chirurgicales"],
    ["Équiper un dispensaire à Parakou"],
    "Soigner, c'est promettre de revenir."),
  make(53, 17, "Léa", "Agboton", 22, "Étudiante", "Étudiante en droit international", "Genève, Suisse",
    "Léa étudie à l'IHEID. Elle veut travailler dans une agence onusienne sur les questions migratoires.",
    ["Tutorat anglais", "Bénévolat associatif"],
    ["Décrocher un stage à l'OIM"],
    "Comprendre les frontières, c'est apprendre à les questionner."),
  make(54, 19, "Patrick", "Houéssou", 44, "Artiste plasticien", "Plasticien contemporain", "Berlin, Allemagne",
    "Patrick expose dans des galeries européennes. Son travail explore la mémoire de la traite et du vodoun.",
    ["Œuvres originales", "Commandes institutionnelles", "Résidences"],
    ["Préparer une biennale", "Ouvrir un atelier-résidence à Ouidah"],
    "Créer, c'est faire parler ce que l'histoire a tu."),
  make(55, 20, "Aurélie", "Dossouvi", 29, "Coach", "Coach en développement personnel", "Montréal, Canada",
    "Aurélie accompagne des femmes diaspora afro en transition pro. 1500 followers sur LinkedIn.",
    ["Coaching individuel", "Ateliers de groupe", "Conférences"],
    ["Lancer un programme premium", "Écrire son premier livre"],
    "Avancer, c'est d'abord arrêter de se mentir."),
  make(56, 21, "Jean-Luc", "Ahouangonou", 39, "Chef pâtissier", "Chef pâtissier", "Marseille, France",
    "Jean-Luc travaille dans un palace marseillais. Il revisite des desserts béninois (klui klui, dèguè).",
    ["Pâtisseries événementielles", "Cours particuliers", "Carte personnalisée"],
    ["Ouvrir sa pâtisserie à Cotonou"],
    "Le sucre demande la même précision que la vie."),
  make(57, 24, "Estelle", "Behanzin", 36, "RH", "Responsable RH grande distribution", "Londres, Royaume-Uni",
    "Estelle est DRH adjointe d'une enseigne britannique. Elle accompagne aussi des candidats africains à l'expatriation.",
    ["Coaching CV/entretien", "Conseil expatriation"],
    ["Créer un cabinet RH Bénin-UK"],
    "Recruter, c'est miser sur quelqu'un avant qu'il n'ait tout prouvé."),
  make(58, 25, "David", "Akpaki", 42, "Chef de projet ONG", "Chef de projet humanitaire", "Genève, Suisse",
    "David coordonne des projets eau et assainissement en Afrique de l'Ouest pour une grande ONG.",
    ["Conseil en gestion de projet humanitaire"],
    ["Monter une fondation béninoise indépendante"],
    "Aider, c'est aussi s'effacer pour que les locaux dirigent."),
  make(59, 26, "Ange", "Hountondji", 33, "Développeuse", "Data scientist", "Toronto, Canada",
    "Ange travaille dans une banque canadienne. Elle enseigne le Python en ligne aux étudiantes africaines.",
    ["Cours de Python/Data", "Mentorat carrière tech"],
    ["Lancer une école de code pour filles à Cotonou"],
    "Les chiffres ne mentent pas — ce sont les questions qui peuvent tromper."),
  make(60, 27, "Précieuse", "Adandé", 26, "Influenceuse", "Créatrice de contenu lifestyle", "Dubaï, EAU",
    "Précieuse partage son quotidien d'expatriée béninoise à Dubaï. 80k followers Instagram.",
    ["Placements de produits", "Brand content", "Événementiel"],
    ["Lancer sa marque de maillots de bain"],
    "Être vue ne suffit pas — il faut avoir quelque chose à dire."),
  make(61, 28, "Roméo", "Tchégnon", 51, "Chauffeur de taxi", "Chauffeur de taxi", "New York, USA",
    "Roméo conduit un yellow cab depuis 20 ans. Il connaît New York mieux que beaucoup de natifs.",
    ["Visites guidées non officielles", "Conseils aux nouveaux arrivants"],
    ["Économiser pour rentrer ouvrir une auto-école à Cotonou"],
    "Conduire, c'est rester calme quand tout le monde klaxonne."),
  make(62, 29, "Bernadette", "Hounsa", 58, "Aide-soignante", "Aide-soignante en EHPAD", "Bordeaux, France",
    "Bernadette accompagne les personnes âgées depuis 15 ans. Elle envoie chaque mois de l'argent à sa famille à Porto-Novo.",
    ["Garde à domicile occasionnelle"],
    ["Construire une maison de retraite digne au Bénin"],
    "Tenir la main de quelqu'un suffit parfois à tout changer."),
  make(63, 30, "Théo", "Adjanohoun", 16, "Lycéen diaspora", "Lycéen seconde", "Bruxelles, Belgique",
    "Théo est né à Bruxelles de parents béninois. Il anime un compte TikTok sur la culture béninoise pour les ados de la diaspora.",
    ["Création TikTok", "Collaborations marques jeunes"],
    ["Aller en colonie au Bénin l'été prochain"],
    "Être deux choses à la fois, c'est avoir deux maisons."),
  make(64, 31, "Marie-Claire", "Sodégla", 49, "Restauratrice", "Cheffe d'un restaurant africain", "Montréal, Canada",
    "Marie-Claire a quitté Cotonou il y a 20 ans. Son restaurant 'Akassa' est une institution montréalaise.",
    ["Restauration", "Catering", "Cours de cuisine"],
    ["Publier un livre de recettes Bénin-Québec"],
    "On cuisine pour ceux qu'on aime, même quand ils sont loin."),
];

export const getProfileForIndex = (i: number): Profile =>
  PROFILES[i % PROFILES.length];

export const getProfileById = (id: string): Profile | undefined =>
  PROFILES.find((p) => p.id === id);
