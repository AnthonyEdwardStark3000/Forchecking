import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private storage: Storage, public toastCtrl: ToastController) {
    this.init();
   }

  addTask(key, value){
    this.storage.set(key, value);
    console.log(value);
  }
  updateTask(key, newValue){
    this.storage.set(key, newValue);
    this.getAllTasks();
    // console.log(newValue);
  }

  async deleteTask(key){
  await this.storage.remove(key);
  this.toastCtrl.create({
    message: 'Task has been removed',
    duration: 1000,
    animated: false,

  }).then(res=> res.present());
  }

  getAllTasks(){
    const tasks: any = [];
    this.storage.forEach((key, value, index) =>{
      tasks.push({key: value, value: key});
      console.log(value);
    });
    return tasks;
  }

  async init(){
    await this.storage.create();
  }
}
