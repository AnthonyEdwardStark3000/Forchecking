import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  categories = [];
  categorySelectedCategory;
  itemDueDate;
  itemPriority;
  itemName;

  constructor() { }

  ngOnInit() {
  }
  update(){};
  dismis(){};
  selectCategory(value){};
}
