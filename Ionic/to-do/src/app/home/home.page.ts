import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from './../add-new-task/add-new-task.page';
import { TodoServiceService } from './../todo-service.service';
import { UpdateTaskPage } from './../update-task/update-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList = [];

today: number = Date.now();
  constructor(public modalCtrl: ModalController, public todoService: TodoServiceService) {
    this.getAllTask();
  }
  async addNewTask(){
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage
    });
    modal.onDidDismiss().then(newTaskObj =>{
      // console.log(newTaskObj.data);
      // const selectedValues = newTaskObj.data;
      // this.todoList.push(newTaskObj.data);
      // console.log(this.todoList);
      this.getAllTask();
    });
    return await modal.present();
  }

  deleteItem(key: any){
    // this.todoList.splice(index,1);
   console.log(key);
   this.todoService.deleteTask(key);
   this.getAllTask();
  }

  getAllTask(){
    this.todoList = this.todoService.getAllTasks();
    // console.log(this.todoService.getAllTasks());
    console.log(this.todoList);
  }

  async update(selectedtask){
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedtask}
    });
    console.log(selectedtask);
    return await modal.present();
  }

}
