import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoursesService } from 'src/app/core/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateComponent } from '../class/create/create.component';
import { EditComponent } from '../categories/edit/edit.component';
import { ClassService } from 'src/app/core/services/class.service';
import { DialogModule } from 'primeng/dialog';
import { FormCreatorComponent } from 'src/app/components/shared/form-creator/form-creator.component';
import { FormFieldSelectData, FormFieldType, FormModalField, FormModalOptions } from 'src/app/components/shared/form-creator/form-creator.model';
import { SoldierService } from 'src/app/core/services/soldier.service';
@Component({
  selector: 'app-class',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    CreateComponent,
    EditComponent,
    CardModule,DialogModule,FormCreatorComponent,
    ConfirmDialogModule,
    ToastModule,],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ClassComponent implements OnInit{
constructor(private classService:ClassService,
  private route: ActivatedRoute,
private soldierServices:SoldierService){
}
classType : FormFieldSelectData[] = [
  {label: 'تئوری', value: 'theory', icon: ''},
  {label: 'عملی', value: 'parctical', icon: ''},
  {label: 'کارگاه', value: 'workshop', icon: ''},
]
classes:any
private sub;
id: string;
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['postId'];

    });
    this.getclasess()
  }
  getclasess(){
    this.classService.getAll(this.id).subscribe({
      next: (resp:any) => {
          this.classes = resp
      }})
  }
  public formOptions: FormModalOptions = {
    doubleCheck: true,
    editable: true,
    loading: false,
  };
  visible: boolean;
  get imageUploaded(): boolean {
   // return !!this.addCoinFormGroup.value.image;
   return false
 }
 
 defaultValue: boolean = false;
 public formValues: any;
 classID:any
 editClass(classData){
  this.classID = classData._id
  this.visible = true
  this.formValues = {
    classType:classData.classType,
    capacity:classData.capacity,
    description:classData.description
  }
  this.defaultValue = true;
  
 }
 public formFeilds: FormModalField[] = [
  {
    type: FormFieldType.SELECT,
    name: 'classType',
    label: 'نوع کلاس',
    extraData: this.classType,
    value: '',
    validations: ['required',],
  },
   {
     type: FormFieldType.NUMBER,
     name: 'capacity',
     label: 'ظرفیت کلاس',
     value: '',
     validations: ['required'],
   },
   {
     type: FormFieldType.TEXT,
     name: 'description',
     label: 'توضیحات درباره کلاس',
     value: '',
     validations: ['required'],
   },
  
 ];
 
 submitform(form) {
  console.log(form);
  
   this.classService.update(this.classID, form).subscribe({next:(resp)=>{
     this.getclasess()
     this.visible =false
   }})
 }
 addSoldier(){
  this.soldierServices.getAll().subscribe({next:(resp)=>{
    
    
  }})
 }
}
