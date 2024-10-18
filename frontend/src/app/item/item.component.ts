import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent implements OnInit {
  items: any[] = [];
  newItem = { name: '', description: '' }
  
  constructor(private itemService: ItemService){}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe(data => {
      this.items = data
    })
  }

  addItem() {
    this.itemService.addItem(this.newItem).subscribe(item => {
      this.items.push(item);
      this.newItem = { name: '', description: '' }
    })
  }

  deleteItem(id: string) {
    this.itemService.deleteItem(id).subscribe(() => {
      this.items.filter((item) => item._id !== id);
    })
  }
}
