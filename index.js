const { pool } = require("./dataBase");

const Curso = require("./class/Curso");
const Estudiante = require("./class/Estudiante");

(async () => {
    console.log("Ejecutando Script");
    //const curso = new Curso("Sql 1","Curso de base de datos con sql server");    

    //await curso.insertar();

    const estudiante = new Estudiante("Matilda","Bravo",8,2115545);
    await estudiante.insertar();

})()