db.heroes.insertOne({id:1, name:"Hulk"})

let alumnos=[
    {
        nombre:'Ricardo', apellido:'Tapia'
    },
    {
        nombre:'Romina', apellido:'Gaitan'
    },
    {
        nombre:'Cristina', apellido:'Vallejos'
    },
    {
        nombre:'Jimena', apellido:'Rodriguez'
    },
]

db.alumnos.insertMany([
    {
        nombre:'Ricardo', apellido:'Tapia'
    },
    {
        nombre:'Romina', apellido:'Gaitan'
    },
    {
        nombre:'Cristina', apellido:'Vallejos'
    },
    {
        nombre:'Jimena', apellido:'Rodriguez'
    },
])

db.alumnos.find()
db.alumnos.findOne()

db.alumnos.estimatedDocumentCount()
db.alumnos.countDocuments()

db.alumnos.find({nombre:"Romina"})

db.alumnos.insertMany([
    {
        nombre:'Ricardo', apellido:'Roldan'
    },
    {
        nombre:'Romina', apellido:'Lopez'
    }
])

db.alumnos.find({nombre:"Romina", apellido:"Lopez"})

let mascotas=[
    {
        nombre:'Azrael',
        especie:'gato',
        edad: 12
    },
    {
        nombre:'Cringer',
        especie: 'tigre',
        edad: 9
    },
    {
        nombre:'Suertudo',
        especie:'gato',
        edad:5
    }
]

db.mascotas.insertMany(mascotas)
db.mascotas.find({especie:"gato"})
db.mascotas.find({especie:"mono"})
db.mascotas.find({especie:"gato"}).count()
db.mascotas.countDocuments({especie:"gato"})
db.mascotas.countDocuments({})


let estudiantes=[
    {
        nombre:'Laura',
        apellido:'Perez',
        curso:'Programación Backend',
        edad:27,
        correo:'lperez@gmail.com',
        sexo:'F',
    },
    {
        nombre:'Ariel',
        apellido:'Ramirez',
        curso:'Programación Backend',
        edad:35,
        correo:'aremirez@gmail.com',
        sexo:'M',
    },
    {
        nombre:'Guillermo',
        apellido:'Morales',
        curso:'Programación Backend',
        edad:32,
        correo:'jmoralez@gmail.com',
        sexo:'M',
    },    {
        nombre:'Felipe',
        apellido:'Aguirre',
        curso:'Curso SQL',
        edad:29,
        correo:'faguirre@gmail.com',
        sexo:'M',
    },    {
        nombre:'Laura',
        apellido:'Esquivel',
        curso:'Calculo I',
        edad:19,
        correo:'lesquivel@gmail.com',
        sexo:'F',
    },
]

let estudiante={
    nombre:'Pablo', apellido:'Brown', curso:'Calculo I'
}

db.estudiantes.insertMany([
    {
        nombre:'Laura',
        apellido:'Perez',
        curso:'Programación Backend',
        edad:27,
        correo:'lperez@gmail.com',
        sexo:'F',
    },
    {
        nombre:'Ariel',
        apellido:'Ramirez',
        curso:'Programación Backend',
        edad:35,
        correo:'aremirez@gmail.com',
        sexo:'M',
    },
    {
        nombre:'Guillermo',
        apellido:'Morales',
        curso:'Programación Backend',
        edad:32,
        correo:'jmoralez@gmail.com',
        sexo:'M',
    },    {
        nombre:'Felipe',
        apellido:'Aguirre',
        curso:'Curso SQL',
        edad:29,
        correo:'faguirre@gmail.com',
        sexo:'M',
    },    {
        nombre:'Laura',
        apellido:'Esquivel',
        curso:'Calculo I',
        edad:19,
        correo:'lesquivel@gmail.com',
        sexo:'F',
    },
])

db.estudiantes.insertOne({
    nombre:'Pablo', apellido:'Brown', curso:'Calculo I'
})

db.estudiantes.find()
db.estudiantes.find({sexo:"M"})
db.estudiantes.find({}).count()
db.estudiantes.find({sexo:"F"}).count()


db.estudiantes.find({edad:{$gt:21}})
db.estudiantes.find({edad:{$gt:29}})
db.estudiantes.find({edad:{$gte:21}})
db.estudiantes.find({edad:{$lt:30}, nombre:"Laura"})

db.estudiantes.find({ $or:[{edad:{$lt:20}},{edad:{$gt:31}}] })
db.estudiantes.find({sexo:{$exists:true}})

db.estudiantes.find({nombre:{$in:["Laura", "Felipe", "Matias"]}})
db.estudiantes.find({nombre:{$nin:["Laura", "Felipe", "Matias"]}})


db.heroes.drop()
db.heroes.insertMany([
    {
        id: 1,
        name: "Spider-Man",
        alias: "Peter Parker",
        powers: ["Wall-crawling", "Superhuman strength"],
        team: "Avengers",
        publisher: "Marvel",
        enemies: [
            { name: "Green Goblin", powers: ["Advanced technology", "Glider"] },
            { name: "Venom", powers: ["Symbiote bonding", "Superhuman strength"] },
            { name: "Doctor Octopus", powers: ["Mechanical arms", "Genius intellect"] },
            { name: "Sandman", powers: ["Shape-shifting sand body", "Superhuman strength"] }
        ]
    },
    {
        id: 2,
        name: "Superman",
        alias: "Clark Kent",
        powers: ["Superhuman strength", "Flight", "Heat vision"],
        team: "Justice League",
        publisher: "DC",
        enemies: [
            { name: "Lex Luthor", powers: ["Genius intellect", "Wealth"] },
            { name: "Doomsday", powers: ["Invulnerability", "Adaptive evolution"] },
            { name: "Brainiac", powers: ["Advanced technology", "Superhuman intellect"] },
            { name: "Darkseid", powers: ["Omega beams", "Superhuman strength"] }
        ]
    },
    {
        id: 3,
        name: "Iron Man",
        alias: "Tony Stark",
        powers: ["Powered armor", "Genius-level intellect", "Flight"],
        team: "Avengers",
        publisher: "Marvel",
        enemies: [
            { name: "Mandarin", powers: ["Rings of power", "Mystical abilities"] },
            { name: "Whiplash", powers: ["Whips with energy projection", "Engineering skills"] },
            { name: "Obadiah Stane", powers: ["Advanced technology", "Business acumen"] },
            { name: "Ultron", powers: ["Artificial intelligence", "Advanced weaponry"] }
        ]
    },
    {
        id: 4,
        name: "Wonder Woman",
        alias: "Diana Prince",
        powers: ["Superhuman strength", "Lasso of Truth"],
        team: "Justice League",
        publisher: "DC",
        enemies: [
            { name: "Ares", powers: ["God of War", "Immortality"] },
            { name: "Cheetah", powers: ["Enhanced strength", "Agility"] },
            { name: "Circe", powers: ["Magic spells", "Immortality"] },
            { name: "Darkseid", powers: ["Omega beams", "Superhuman strength"] }
        ]
    },
    {
        id: 5,
        name: "Black Widow",
        alias: "Natasha Romanoff",
        powers: ["Expert spy", "Skilled hand-to-hand combatant", "Weaponry"],
        team: "Avengers",
        publisher: "Marvel",
        enemies: [
            { name: "Taskmaster", powers: ["Photographic reflexes", "Martial arts skills"] },
            { name: "Red Guardian", powers: ["Enhanced strength", "Soviet super-soldier serum"] },
            { name: "Winter Soldier", powers: ["Bionic arm", "Assassin training"] }
        ]
    },
    {
        id: 6,
        name: "Batman",
        alias: "Bruce Wayne",
        powers: ["Intelligence", "Peak human physical condition", "Advanced technology", "Skilled hand-to-hand combatant"],
        team: "Justice League",
        publisher: "DC",
        enemies: [
            { name: "Joker", powers: ["Criminal mastermind", "Maniacal humor"] },
            { name: "Two-Face", powers: ["Dual personality", "Coin-based decisions"] },
            { name: "Penguin", powers: ["Criminal underworld connections", "Trick umbrellas"] },
            { name: "Ra's al Ghul", powers: ["Immortality", "Martial arts mastery"] }
        ]
    },
    {
        id: 7,
        name: "Aquaman",
        alias: "Arthur Curry",
        powers: ["Superhuman strength", "Hydrokinesis", "Telepathy with sea life"],
        team: "Justice League",
        publisher: "DC",
        enemies: [
            { name: "Black Manta", powers: ["Advanced technology", "Underwater combat skills"] },
            { name: "Ocean Master", powers: ["Control over sea and weather", "Trident mastery"] },
            { name: "King Shark", powers: ["Superhuman strength", "Shark-like attributes"] }
        ]
    },
    {
        id: 8,
        name: "Captain America",
        alias: "Steve Rogers",
        powers: ["Superhuman strength", "Enhanced agility", "Indomitable will"],
        team: "Avengers",
        publisher: "Marvel",
        enemies: [
            { name: "Red Skull", powers: ["Superhuman intellect", "Adversarial combat skills"] },
            { name: "Winter Soldier", powers: ["Bionic arm", "Assassin training"] },
            { name: "Crossbones", powers: ["Enhanced strength", "Expert combatant"] }
        ]
    },
    {
        id: 9,
        name: "Flash",
        alias: "Barry Allen",
        powers: ["Super speed", "Time travel", "Speed force manipulation"],
        team: "Justice League",
        publisher: "DC",
        enemies: [
            { name: "Reverse-Flash", powers: ["Speedster abilities", "Time manipulation"] },
            { name: "Zoom", powers: ["Temporal manipulation", "Speedster abilities"] },
            { name: "Captain Cold", powers: ["Cryogenic weaponry", "Cold generation"] },
            { name: "Gorilla Grodd", powers: ["Telepathy", "Enhanced intelligence"] }
        ]
    },
    {
        id: 10,
        name: "Black Panther",
        alias: "T'Challa",
        powers: ["Enhanced senses", "Vibranium suit", "Skilled warrior"],
        team: "Avengers",
        publisher: "Marvel",
        enemies: [
            { name: "Killmonger", powers: ["Enhanced strength", "Wakandan combat training"] },
            { name: "Man-Ape", powers: ["Enhanced strength", "Gorilla-like abilities"] },
            { name: "Klaw", powers: ["Sonic emitter", "Vibranium manipulation"] }
        ]
    },
    {
        id: 11,
        name: "Green Lantern",
        alias: "Hal Jordan",
        powers: ["Ring-generated constructs", "Flight", "Energy manipulation"],
        team: "Justice League",
        publisher: "DC",
        enemies: [
            { name: "Sinestro", powers: ["Yellow power ring", "Fear manipulation"] },
            { name: "Atrocitus", powers: ["Red power ring", "Rage empowerment"] },
            { name: "Parallax", powers: ["Fear embodiment", "Reality manipulation"] }
        ]
    },
    {
        id: 12,
        name: "Thor",
        alias: "Thor Odinson",
        powers: ["Mjolnir (hammer)", "Control over lightning", "Superhuman durability"],
        team: "Avengers",
        publisher: "Marvel",
        enemies: [
            { name: "Loki", powers: ["Trickery", "Sorcery", "Reality manipulation"] },
            { name: "Hela", powers: ["Death magic", "Immortality"] },
            { name: "Malekith", powers: ["Dark magic", "Reality manipulation"] },
            { name: "Surtur", powers: ["Fire manipulation", "Giant form"] }
        ]
    },
    {
        id: 13,
        name: "Batwoman",
        alias: "Kate Kane",
        powers: ["Martial arts", "Detective skills", "Advanced technology"],
        team: "Bat Family",
        publisher: "DC",
        enemies: [
            { name: "Alice", powers: ["Madness manipulation", "Martial arts"] },
            { name: "Mad Hatter", powers: ["Mind control technology", "Obsession with hats"] },
            { name: "The Many Arms of Death", powers: ["Assassin skills", "Mercenary group"] }
        ]
    },
    {
        id: 14,
        name: "Hulk",
        alias: "Bruce Banner",
        powers: ["Superhuman strength", "Invulnerability", "Regenerative healing"],
        team: "Avengers",
        publisher: "Marvel",
        enemies: [
            { name: "Abomination", powers: ["Enhanced strength", "Regeneration"] },
            { name: "The Leader", powers: ["Genius intellect", "Gamma radiation manipulation"] },
            { name: "Red Hulk", powers: ["Superhuman strength", "Heat manipulation", "Invulnerability"] }
        ]
    },
    {
        id: 15,
        name: "Zatanna",
        alias: "Zatanna Zatara",
        powers: ["Magic spells", "Sorcery", "Illusion manipulation"],
        team: "Justice League Dark",
        publisher: "DC",
        enemies: [
            { name: "Constantine", powers: ["Occult knowledge", "Hellblazer abilities"] },
            { name: "Nick Necro", powers: ["Dark magic", "Necromancy"] },
            { name: "Felix Faust", powers: ["Sorcery", "Dark rituals"] }
        ]
    },
    {
        id: 16,
        name: "Doctor Strange",
        alias: "Stephen Strange",
        powers: ["Mystic arts", "Reality manipulation", "Dimensional travel"],
        team: "Defenders",
        publisher: "Marvel",
        enemies: [
            { name: "Baron Mordo", powers: ["Sorcery", "Dark magic"] },
            { name: "Dormammu", powers: ["Dark dimension ruler", "Reality manipulation"] },
            { name: "Shuma-Gorath", powers: ["Chaos magic", "Reality warping"] }
        ]
    },
    {
        id: 17,
        name: "Green Arrow",
        alias: "Oliver Queen",
        powers: ["Archery skills", "Peak human physical condition", "Strategic mind"],
        team: "Justice League",
        publisher: "DC",
        enemies: [
            { name: "Deathstroke", powers: ["Enhanced strength", "Master tactician"] },
            { name: "Merlyn", powers: ["Expert marksman", "Assassin skills"] },
            { name: "Komodo", powers: ["Archery skills", "Biological enhancements"] }
        ]
    },
    {
        id: 18,
        name: "Scarlet Witch",
        alias: "Wanda Maximoff",
        powers: ["Reality manipulation", "Energy projection", "Telekinesis"],
        team: "Avengers",
        publisher: "Marvel",
        enemies: [
            { name: "Agatha Harkness", powers: ["Witchcraft", "Mentor to Scarlet Witch"] },
            { name: "Chthon", powers: ["Elder God", "Dark magic"] },
            { name: "Magneto", powers: ["Magnetism manipulation", "Master strategist"] }
        ]
    },
    {
        id: 19,
        name: "Martian Manhunter",
        alias: "J'onn J'onzz",
        powers: ["Shape-shifting", "Telepathy", "Super strength"],
        team: "Justice League",
        publisher: "DC",
        enemies: [
            { name: "Ma'alefa'ak", powers: ["Fire manipulation", "Mental abilities"] },
            { name: "White Martians", powers: ["Advanced shape-shifting", "Psychic powers"] },
            { name: "Fernus", powers: ["Fire manipulation", "Psychic powers"] }
        ]
    },
    {
        id: 20,
        name: "Deadpool",
        alias: "Wade Wilson",
        powers: ["Regenerative healing", "Expert marksman", "Fourth wall breaking"],
        team: "None",
        publisher: "Marvel",
        enemies: [
            { name: "Taskmaster", powers: ["Photographic reflexes", "Martial arts skills"] },
            { name: "Cable", powers: ["Telekinesis", "Time travel"] },
            { name: "Ajax", powers: ["Enhanced strength", "Regeneration"] }
        ]
    }
])

db.heroes.find({powers:{$size:2}})

db.heroes.find({powers:{$all:["Intelligence"]}})
// "Heat vision"
db.heroes.find({powers:{$all:["Flight"]}})
db.heroes.find({powers:{$all:["Flight","Heat vision"]}})

db.heroes.find({enemies:{$elemMatch: {name:"Zoom"}}})
db.heroes.find({enemies:{$elemMatch: {powers:{$size:3}}}})
db.heroes.find({enemies:{$elemMatch: {powers:{$size:3}, name:"Loki"}}})


db.heroes.distinct("name")
db.heroes.distinct("name", {publisher:"DC"})

db.heroes.find({"enemies.name":"Loki"})
db.heroes.find({"enemies.name":{$in:["Joker", "Magneto"]}})

db.heroes.find({name:/man/i})
db.heroes.find({"enemies.name":/red/i})
db.heroes.find({"enemies.name":{$regex: "red", $options:"i"}})


db.heroes.find({},{name:1, publisher:1})
db.heroes.find({},{enemies:0, id:0, powers:0, alias:0, team:0})
db.heroes.find({},{name:1, publisher:1, powers:0})  //error
db.heroes.find({},{name:0, publisher:0, powers:1})  //error
db.heroes.find({},{name:1, publisher:1, _id:0})
db.heroes.find({},{enemies:0, id:0, powers:0, alias:0, team:0, _id:0})

db.heroes.find({},{name:1, publisher:1}).sort({name:-1})
db.heroes.find({},{name:1, publisher:1}).sort({publisher:-1, name:1})


db.heroes.find({},{name:1, _id:0}).sort({id:1, publisher:-1, name:1}).skip(5).limit(3)

db.estudiantes.insertMany([
    {
        nombre:'Rafael',
        apellido:'Perez',
        curso:'Programación Backend',
        edad:41,
        correo:'rperez@gmail.com',
        sexo:'M',
    },
    {
        nombre:'Patricia',
        apellido:'Rojas',
        curso:'Calculo I',
        edad:20,
        correo:'projas@gmail.com',
        sexo:'F',
    },
    {
        nombre:'Carolina',
        apellido:'Garcia',
        curso:'Diseño Grafico',
        edad:33,
        correo:'cgarcia@gmail.com',
        sexo:'F',
    },    {
        nombre:'Ruben',
        apellido:'Aguirre',
        curso:'Diseño Grafico',
        edad:36,
        correo:'raguirre@gmail.com',
        sexo:'M',
    },    {
        nombre:'Micaela',
        apellido:'Gork',
        curso:'Calculo I',
        edad:24,
        correo:'mgork@gmail.com',
        sexo:'F',
    },
])

db.estudiantes.insertOne({
    nombre:'Ramiro'
})

db.estudiantes.find({},{nombre:1, _id:0})
db.estudiantes.find({},{sexo:1, _id:0})
db.estudiantes.find({},{nombre:1, edad:1, _id:0}).sort({edad:-1})
db.estudiantes.find({edad:{$exists:true}},{nombre:1, edad:1, _id:0}).sort({edad:1}).limit(1)
db.estudiantes.find({edad:{$exists:true}},{nombre:1, edad:1, _id:0}).sort({edad:-1}).limit(1)
db.estudiantes.find({edad:{$exists:true}},{nombre:1, edad:1, _id:0}).sort({edad:1}).skip(1).limit(1)
