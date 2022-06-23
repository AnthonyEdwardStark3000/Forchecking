import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TodoServiceService } from './../todo-service.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task;
  categories =[];
  categorySelectedCategory;

  newTaskObj = {};
  itemName;
  itemDueDate;
  itemPriority;
  itemCategory;

  constructor(public modalCtrl: ModalController, public todoService: TodoServiceService, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.categories.push('work');
    this.categories.push('personal');
    console.log(this.task);

    this.itemName = this.task.value.itemName;
    this.itemDueDate = this.task.value.dueDate;
    this.itemPriority = this.task.value.priority;
    this.categorySelectedCategory = this.task.value.itemCategory;

    console.log(this.task);
  }
  selectCategory(index){
    this.categorySelectedCategory = this.categories[index];
    console.log(this.categorySelectedCategory);
  }

  async dismiss(){
    await this.modalCtrl.dismiss();
  }

  async update(){
    this.newTaskObj = ({
      itemName: this.itemName,
      dueDate: this.itemDueDate,
      priority: this.itemPriority,
      itemCategory:this.categorySelectedCategory
    });
    console.log('After update');
    console.log(this.newTaskObj);
    const uid = this.task.key;
    await this.todoService.updateTask(uid,this.newTaskObj);
    this.toastCtrl.create({
      message: 'Task has been updated Successfully ! ',
      duration: 1000,
      animated: false,
      position:'top'
    }).then(res=> res.present());
    this.dismiss();
  }
}
