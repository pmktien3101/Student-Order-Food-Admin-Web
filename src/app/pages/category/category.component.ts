import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  formData: any = { name: '', description: '' };
  isEdit: boolean = false;
  editId: string | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  onSubmit() {
    if (this.isEdit && this.editId) {
      this.categoryService.updateCategory(this.editId, this.formData).subscribe(() => {
        const idx = this.categories.findIndex(c => c.id === this.editId);
        if (idx > -1) {
          this.categories[idx] = { ...this.categories[idx], ...this.formData };
        }
        this.cancelEdit();
      });
    } else {
      this.categoryService.createCategory(this.formData).subscribe(res => {
        this.categories.push(res.data);
        this.formData = { name: '', description: '' };
      });
    }
  }

  deleteCategory(id: string) {
    if (confirm('Bạn có chắc muốn xóa danh mục này?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.categories = this.categories.filter(c => c.id !== id);
        if (this.isEdit && this.editId === id) this.cancelEdit();
      });
    }
  }

  editCategory(category: any) {
    this.isEdit = true;
    this.editId = category.id;
    this.formData = { name: category.name, description: category.description };
  }

  cancelEdit() {
    this.isEdit = false;
    this.editId = null;
    this.formData = { name: '', description: '' };
  }
}
