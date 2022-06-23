import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TodoServiceService } from './../todo-service.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {

  categories = ['Work','Personal','Self-Growth','Home'];

  taskName;
  taskDate;
  taskPriority;
  taskCategory;

  taskObject;

  constructor(public modalCtrl: ModalController, public todoService: TodoServiceService, private toastCtrl: ToastController) { }

  ngOnInit() {
  }


  async dismiss(){
    await this.modalCtrl.dismiss(this.taskObject);
  }

  selectedCategory(index){
    this.taskCategory = this.categories[index];
  }

  async addNewTask(){
    this.taskObject = ({
      itemName: this.taskName,
      dueDate: this.taskDate ===undefined? Date.now():this.taskDate,
      priority: this.taskPriority === undefined? 'medium': this.taskPriority,
      itemCategory: this.taskCategory,
    });
    const uid = this.taskName + this.taskDate;

    if(uid){
      // console.log('Add item');
    await this.todoService.addTask(uid, this.taskObject);
    }
    else{
    console.log('Can\'t save empty data');
    }
    this.dismiss();
    this.toastCtrl.create({
      message: 'Task Created Successfully ! ',
      duration: 1000,
      animated: false,
    }).then(res=> res.present());
  }

}
