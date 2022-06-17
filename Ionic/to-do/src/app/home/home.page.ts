import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from './../add-new-task/add-new-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList = [];

today: number = Date.now();
  constructor(public modalCtrl: ModalController) {}
  async addNewTask(){
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage
    });
    modal.onDidDismiss().then(newTaskObj =>{
      console.log(newTaskObj.data);
      // const selectedValues = newTaskObj.data;
      this.todoList.push(newTaskObj.data);
      console.log(this.todoList);
    });
    return await modal.present();
  }

  deleteItem(index){
    this.todoList.splice(index,1);
  }

}
