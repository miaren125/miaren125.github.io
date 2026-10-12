/* ====== TODO EL CONTENIDO VIVE AQUÍ (edita solo este archivo) ====== */
const CONTACT = {
  linkedin: "https://www.linkedin.com/in/mia-v-3894b1377",
  github: "https://github.com/miaren125",
  email: "miareneevalenzuelaye@gmail.com"
};

const I18N = {
  es: {
    "nav.home":"Home","nav.about":"About","nav.projects":"Proyectos","nav.contact":"Contacto",
    "hero.hello":"¡Hola! soy:","hero.role":"Ingeniera en Sistemas de la Información",
    "about.title":"Descripción","about.who":"¡Hola! Soy estudiante de Ingeniería en Sistemas de la Información con una gran pasión por el desarrollo de videojuegos. Me he dedicado a programar mecánicas, diseñar lógicas de juego y crear experiencias interactivas. Disfruto mucho resolver problemas técnicos y darle vida a ideas creativas a través del código, asegurándome de que cada proyecto no solo funcione bien, sino que sea divertido de jugar.","about.cv":"CV descargable",
    "skills.title":"Habilidades","skills.hard":"Hard skills","skills.soft":"Soft skills",
    "edu.title":"Educación","aspire.title":"Puestos a los que aspiro",
    "tabs.art":"Arte","card.details":"Detalles","type.repo":"Repositorio","type.game":"Videojuego","type.blog":"Blog",
    "m.what":"¿Qué es y en qué participé?","m.tech":"Tecnologías","m.feat":"Key features","m.repo":"Ver repositorio",
    "m.desc":"Descripción","m.req":"Requerimientos del cliente","m.design":"¿Cómo se diseñó la solución?",
    "m.impl":"¿Cómo se implementó la solución?","m.result":"¿Cuál fue el resultado?",
    "contact.thanks":"Gracias por querer contactarme. Placeholder: escribe aquí un mensaje corto."
  },
  en: {
    "nav.home":"Home","nav.about":"About","nav.projects":"Projects","nav.contact":"Contact",
    "hero.hello":"Hi! I'm:","hero.role":"Information Systems Engineer",
    "about.title":"About me","about.who":"Hi! I'm an Information Systems Engineering student with a big passion for video game development. I've dedicated myself to programming mechanics, designing game logic and creating interactive experiences. I really enjoy solving technical problems and bringing creative ideas to life through code, making sure every project not only works well but is also fun to play.","about.cv":"Download CV",
    "skills.title":"Skills","skills.hard":"Hard skills","skills.soft":"Soft skills",
    "edu.title":"Education","aspire.title":"Positions I aim for",
    "tabs.art":"Art","card.details":"Details","type.repo":"Repository","type.game":"Video game","type.blog":"Blog",
    "m.what":"What is it and what did I do?","m.tech":"Technologies","m.feat":"Key features","m.repo":"View repository",
    "m.desc":"Description","m.req":"Client requirements","m.design":"How was the solution designed?",
    "m.impl":"How was it implemented?","m.result":"What was the result?",
    "contact.thanks":"Thanks for wanting to reach out. Placeholder: write a short message here."
  }
};

/* level = porcentaje de la barra (idiomas: A1=17, A2=33, B1=50, B2=67, C1=83, C2=100) */
const HARD_SKILLS = [
  {name:{es:"C#",en:"C#"}, level:80},
  {name:{es:"Java",en:"Java"}, level:90},
  {name:{es:"Unity",en:"Unity"}, level:85},
  {name:{es:"Unreal Engine",en:"Unreal Engine"}, level:50},
  {name:{es:"Git / GitHub",en:"Git / GitHub"}, level:80},
  {name:{es:"Desarrollo de mecánicas (Gameplay)",en:"Gameplay mechanics development"}, level:80},
  {name:{es:"Inglés · C1",en:"English · C1"}, level:83},
  {name:{es:"Japonés · A2",en:"Japanese · A2"}, level:33}
];
const SOFT_SKILLS = {
  es:["Trabajo en equipo","Comunicación","Adaptabilidad","Creatividad","Resolución de problemas","Organización"],
  en:["Teamwork","Communication","Adaptability","Creativity","Problem solving","Organization"]
};
const EDUCATION = {
  es:[{title:"Ingeniería en Sistemas de la Información",place:"Universidad de Sonora",years:"2024 – Hasta la fecha"}],
  en:[{title:"Information Systems Engineering",place:"Universidad de Sonora",years:"2024 – Present"}]
};
const ASPIRE = {
  es:["Game Developer","Gameplay Programmer","Level Designer","QA Tester"],
  en:["Game Developer","Gameplay Programmer","Level Designer","QA Tester"]
};

/* type: "game" = etiqueta de la tarjeta. repo: pon aquí el link de GitHub (si lo dejas vacío, el botón no aparece). */
const PROJECTS = [
  {id:"p1",category:"tech",kind:"repo",type:"game",cover:"assets/img/imagenesProyectos/portadaPP.png",
   name:{es:"Party Problems",en:"Party Problems"},
   what:{es:"Un juego enfocado en la agilidad de las operaciones aritméticas, con una jugabilidad rápida y divertida. En este proyecto participé como programadora, encargándome de todo el desarrollo dentro de Unity, así como de su programación.",
         en:"A game focused on quick arithmetic skills, with fast and fun gameplay. In this project I worked as a programmer, taking care of all the development inside Unity as well as its programming."},
   tech:["Unity","C#"],
   features:{es:["Desarrollo de lógicas para minijuegos rápidos.","Programación de controles y físicas de los personajes."],
             en:["Logic development for fast minigames.","Programming of character controls and physics."]},
   photos:["assets/img/imagenesProyectos/partyproblemsNivelSuma.png","assets/img/imagenesProyectos/partyproblemsNivelResta.png","assets/img/imagenesProyectos/partyproblemsNivelMultiplicación.png","assets/img/imagenesProyectos/partyproblemsNivelDivision.png","assets/img/imagenesProyectos/partyproblemsNivelRectaNumerica.png"],
   repo:"https://github.com/eloadev/partyProblemsDEMO"},
  {id:"p2",category:"tech",kind:"repo",type:"game",cover:"assets/img/imagenesProyectos/portadaWeavy.png",
   name:{es:"Weavy",en:"Weavy"},
   what:{es:"Juego enfocado en la concientización sobre la contaminación de los mares, que además busca que los niños se muevan gracias a la integración de motion tracking. Mi rol principal en este proyecto fue desarrollar los niveles principales dentro de Unity y la lógica del motion tracking, junto con la proyección que se utilizó en la presentación del proyecto, así como el arte dentro del juego.",
         en:"A game focused on raising awareness about ocean pollution that also gets kids moving thanks to motion tracking integration. My main role in this project was developing the main levels in Unity and the motion tracking logic, along with the projection used in the project presentation and the in-game art."},
   tech:["Unity","C#","Python","MediaPipe","Krita"],
   features:{es:["Programación del sistema de motion tracking.","Implementación del arte con sprites y UI."],
             en:["Programming of the motion tracking system.","Implementation of the art with sprites and UI."]},
   photos:["assets/img/imagenesProyectos/escondidasMaritimas.png","assets/img/imagenesProyectos/guiaAlasTortugas.png","assets/img/imagenesProyectos/MegaLñimpieza.png","assets/img/imagenesProyectos/Tiburón en Camino.png"],
   repo:"https://github.com/eloadev/weavyDemo"}
];