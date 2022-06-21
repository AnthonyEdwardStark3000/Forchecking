import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(public modalCtrl: ModalController, public todoService: TodoServiceService) { }

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
      priority: this.taskPriority,
      itemCategory: this.taskCategory,
    });
    const uid = this.taskName + this.taskDate;

    if(uid){
      // console.log('Add item');
    this.todoService.addTask(uid, this.taskObject);
    }
    else{
    console.log('Can\'t save empty data');
    }
    this.dismiss();
  }

}
