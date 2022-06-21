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
    console.log(value);
  }
  updateTask(){}

  async deleteTask(key){
  await this.storage.remove(key);
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
