import { asyncScheduler, Observable, interval, Subscription } from 'rxjs';
import { Medicine } from '../models/medicine.model';
import { medicineDao } from '../dao/medicine.dao';
import { posologiaDao } from '../dao/posologiaToma.dao';
import { usuarioDao } from '../dao/usuario.dao';
import { Usuario } from '../models/usuario.model';
import { Posologia } from '../models/posologiaToma.model';
import { getProximaToma } from '../utils/posologia.util';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class PushJob {

    private api: AxiosInstance;
    private executing: boolean;
    private obs: Observable<number>;

    constructor() {
        this.executing = false;
        this.obs = interval(300000); // 5 MIN se emite un valor
        this.api = axios.create();
    }

    start() {
        this.obs.subscribe( async value => {
            this.sendNotificationPush();
        })

    }

    private async sendNotificationPush() {
        if(!this.executing) {
            this.executing = true;
            try {
                let fechaActual: Date = new Date();
                // Obtener medicaciones cuya fecha y hora de notificación sea anterior a la fecha y hora actual.POr que son las que me quedan por notificar
                let medicines: Medicine [] = await medicineDao.getMedicineByFechaNotificacion(fechaActual);
                for(let i=0; i<medicines.length; i++) {
                    // Actualizar fecha próx. notificación.
                    let usuarios: Usuario []= await usuarioDao.getUsuarioByMedicacionId(medicines[i].id);
                    let usuario: Usuario = usuarios[0];
                    let tomas: Posologia [] = await posologiaDao.getByMedicine(usuario.id, medicines[i].id, 0, 0);
                    let fechaProxNotificacion = getProximaToma(fechaActual, tomas);
                    medicineDao.actualizarFechaProxNotificacion(medicines[i].id, fechaProxNotificacion); // aca actualizo la fecha hora

                    // Enviar la notificación.
                    this.sendPushNotificationRequest(usuario, medicines[i]);
                }


                console.log("SendNotificationPush");
            } finally {
                this.executing = false;
            }
        }
    }

    private sendPushNotificationRequest(usuario: Usuario, medicine: Medicine) {
        console.log("PushJob.sendPushNotificationRequest() start");
        let body = {
            notification :{
              title:"PILLSBOX su recordatorio de medicación",
              body: medicine.nombreComercial,
              sound:"default",
              click_action:"FCM_PLUGIN_ACTIVITY",
              icon:"fcm_push_icon"
            },
            data:{
              medicacion: medicine
            },
              to:usuario.notificacionesToken,
              priority:"high",
              restricted_package_name:""
          };

        let config = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAXvUzvlE:APA91bG5xsYFuH0ZWrC_ns56qwU9gwcM3ZKxqGS_FZ-dEjErNxXFqYEbZSIe6ZfnM0LBnCQ-9e6Yp_J0z78R5nA08MCs23L5BaKT0oj85YH3IZjCwo33daIHFhVSfPjzEgHNIlNH5sui'
             }
           }

        this.api.post('https://fcm.googleapis.com/fcm/send', body, config).then( data => {
            console.log(data);
        }, (err) => console.log(err));
        
        console.log("PushJob.sendPushNotificationRequest() end");
    }

}

export const pushJob = new PushJob();
// DESCOMENTAR PARA EJECUTAR EN LOCAL
//pushJob.start();
