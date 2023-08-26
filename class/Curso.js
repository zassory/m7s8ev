const {
    pool
} = require("../dataBase");

module.exports = class Curso {

    constructor(titulo,descripcion){
        this._titulo = titulo;
        this._descripcion = descripcion;
    }

    get titulo(){
        return this._titulo;
    }

    set titulo(titulo){
        this._titulo = titulo;
    }

    get descripcion(){
        return this._descripcion;
    }

    set descripcion(descripcion){
        this._descripcion = descripcion;
    }

    //Insert del curso
    insertar(){
        const that = this;
        const sql = "INSERT INTO cursos (titulo,descripcion) VALUES($1,$2) RETURNING id_curso";

        console.log(`Vamos a insertar el curso ${that.titulo}`);

        return new Promise((resolve)=> {
            pool.query(sql,[that.titulo,that.descripcion], (err,res) => {
                if(err){
                    console.error(err);
                    return;
                }
                console.log(`Curso con id: ${res.rows[0].id_curso} agregado correctamente`);
                resolve(that);
            });
        })
    }

}