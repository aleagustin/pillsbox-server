

[GET] https://pillsbox.herokuapp.com/user/:idUser/pillsbox

 :idUser => Es un parámetro de la URL => req.parmas

(Siendo req de tipo Request)

[GET] https://pillsbox.herokuapp.com/user/:idUser/pillsbox/:id?page=1&size=20

-  En este caso, tenemos dos parámetros en la URL:

    :idUser         => req.parmas
    :id
- También tenemos dos parámetros de consulta (vienen a continuación del símbolo de interrogación '?')

    page            => req.query['page']
    size            => req.query['size']

(Siendo req de tipo Request)


[POST] https://pillsbox.herokuapp.com/user/:idUser/pillsbox
this.router.post('/user/:idUser/pillsbox', [authJwt.verifyToken], pillsBoxController.save);

- Parámetros de la URL
    
    :idUser     => req.parmas

- El body de la request donde viene la información del a pillsbox que vamos a guardar en formato JSON.

    const { id, nombre }: any = req.body;      // Equivalente

    const id: number = req.body.id;
    const nombre: string = req.body.nombre;





FORMA DE GENERAR LAS RUTAS 
---------------------------

Es muy similar a la organización de una estructura de carpetas.



User

  Alejandro (:idUser)

        Pillsbox
 
            Tratamiento crónico   (:idPillsBox)

                    Medicine

                        XXXX            /user/:idUser/pillsbox/:idPillsBox/medicine     (recupera todas las medicinas asociadas al usuario y al pillsbox)


                                        /user/:idUser/pillsbox/:idPillsBox/medicine/:id (recuperar una medicina concreta)

                                        /user/:idUser/medicine/:id

            Tratamiento eventual


                    Medicine


                        YYYYY


  Pedro



    Pillsbox

            Tratamiento crónico

                        Medicine

                            XXXX



                Tratamiento eventual


                        Medicine


                            YYYYY
    