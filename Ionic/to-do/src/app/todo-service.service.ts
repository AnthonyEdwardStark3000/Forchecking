import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private storage: Storage) {
    this.init();
   }

  addTask(key, value){
    this.storage.set(key, value);
  }
  updateTask(){}
  deleteTask(){}
  getAllTasks(){}

  async init(){
    await this.storage.create();
  }
}
