const {
    pool
} = require("../dataBase");

module.exports = class Estudiante {

    constructor(nombres,apellidos,edad,nro_identificacion){
        this._nombres = nombres;
        this._apellidos = apellidos;
        this._edad = edad;
        this._nro_identificacion = nro_identificacion;
    }

    get nombres(){
        return this._nombres;
    }

    set nombres(nombres){
        this._nombres = nombres;
    }

    get apellidos(){
        return this._apellidos;
    }

    set apellidos(apellidos){
        this._apellidos = apellidos;
    }

    get edad(){
        return this._edad;
    }

    set edad(edad){
        this._edad = edad;
    }

    get nro_identificacion(){
        return this._nro_identificacion;
    }

    set nro_identificacion(nro_identificacion){
        this._nro_identificacion = nro_identificacion;
    }

    //Insert del curso
    insertar(){
        const that = this;
        const sql = "INSERT INTO estudiantes (nombres,apellidos,edad,nro_identificacion) VALUES($1,$2,$3,$4) RETURNING id_estudiante";

        console.log(`Vamos a insertar el estudiante ${that.nombres}`);

        return new Promise((resolve)=> {
            pool.query(sql,[that.nombres,that.apellidos,that.edad,that.nro_identificacion], (err,res) => {
                if(err){
                    console.error(err);
                    return;
                }
                console.log(`Estudiante con id: ${res.rows[0].id_estudiante} agregado correctamente`);
                resolve(that);
            });
        })
    }

    static actualizar(nombres,id_estudiante){
        const that = this;
        const sql = "UPDATE estudiantes SET nombres = $1 WHERE id_estudiante = $2";

        console.log(`Vamos a editar el estudiante ${that.nombres}`);

        return new Promise((resolve)=> {
            pool.query(sql,[nombres,id_estudiante], (err,resultRow)=> {
                if(err){
                    console.error(err);
                }
                console.log(`Editado correctamente`);
                resolve(that);
            })
        })

    }    

    static Find(id_estudiante){
        const sql = `SELECT * FROM estudiantes WHERE id_estudiante = $1 LIMIT 1`;
        console.log(`Consultando el usuario con id: ${id_estudiante}...`);

        return new Promise((resolve) => {
            pool.query(sql,[id_estudiante], function(err,resultRow){
                if(err){
                    console.error(err);
                }                
                console.log(`...encontrado ${JSON.stringify(resultRow.rows)} ...!`);
                const estudiante = 
                new Estudiante(
                    resultRow.rows.nombres,
                    resultRow.rows.apellidos,
                    resultRow.rows.edad,
                    resultRow.rows.nro_identificacion
                );
                resolve(estudiante);
                return estudiante;
            });
        })
    }

}