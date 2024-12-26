import {Component, EventEmitter, input, Input, OnInit, Output} from '@angular/core';
import {FormModalField, FormModalOptions} from "./form-creator.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CascadeSelectModule} from "primeng/cascadeselect";
import {DropdownModule} from "primeng/dropdown";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputMaskModule} from "primeng/inputmask";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToggleButtonModule} from "primeng/togglebutton";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";
import {FormErrorHandlerDirective} from "../../../core/directives/form-error-handler.directive";
import {QuillEditorComponent, QuillModule} from "ngx-quill";
import {lastValueFrom} from "rxjs";
import {ImageHandler, Options} from "ngx-quill-upload";
import {ApiService} from "../../../core/services/api.service";
import Quill from "quill";
import { NgxMaskDirective } from 'ngx-mask';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { ImageService } from 'src/app/core/services/image.service';

Quill.register('modules/imageHandler', ImageHandler);

@Component({
  selector: 'form-creator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CascadeSelectModule,
    DropdownModule,
    FloatLabelModule,
    InputMaskModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputSwitchModule,
    InputTextareaModule,
    ToggleButtonModule,
    InputTextModule,
    Button,
    FormErrorHandlerDirective,
    QuillModule,
    NgxMaskDirective,
    SelectButtonModule,
    PasswordModule,
    DividerModule,
    AutoCompleteModule,
    NgPersianDatepickerModule
  ],
  templateUrl: './form-creator.component.html',
  styleUrl: './form-creator.component.scss',
})
export class FormCreatorComponent implements OnInit {

  constructor(private readonly api: ApiService,
              private readonly formBuilder: FormBuilder,
            private imageService:ImageService) {
  }

  ngOnInit() {
    this.initialForm()
  }

  get formFields(): FormModalField[] {
    return this._formFields;
  }

  // --------------------------------------------
  // --------------- Input Form -----------------
  // --------------------------------------------
  @Input('type') type: 'dialog' | 'main' = 'dialog';

  @Input({ alias: 'fields', required: true }) _formFields: FormModalField[] = [];

  @Input('values') values: { [key: string]: string | number };

  @Input('options') options: FormModalOptions = {
    loading: false,
    doubleCheck: false,
    editable: false,
    label: 'اطلاعات',
  };

  // --------------------------------------------
  // -------------- Initial Form ----------------
  // --------------------------------------------
  initialForm() {
    // initialize form group by the given information
    let formGroup = {};

    // Hide Field In Form Edit
    if (this.options.editable) {
      this._formFields = this._formFields.filter((x) => x.showEdit !== false);
    }

    this._formFields.forEach((field) => {
      // check if field has validator
      let fieldValidators: ValidatorFn[] = [];
      if (field.validations && !this.options.editable) {
        field.validations.forEach((validation) => {
          if (validation === 'required')
            fieldValidators.push(Validators.required);
        });
      }
      // create form control field with given value and validators we received;
      if (this.values) {
        // console.log(field.name, this.values[field.name]);
        formGroup[field.name] = [
          this.values[field.name] || field.value,
          fieldValidators,
        ];
      } else {
        if(field.type == "switch"){
          formGroup[field.name] = [false, fieldValidators];
        } else{
          formGroup[field.name] = ['', fieldValidators];
        }
        // if (field.type == "switch") {
        //   formGroup[field.name] = [false, fieldValidators];
        // } else {
        //   formGroup[field.name] = ['', fieldValidators];
        // }
      }
    });
    this.dynamicFormGroup = this.formBuilder.group(formGroup);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['values']) {
  //     this.dynamicFormGroup?.patchValue(changes['values'].currentValue)
  //   }
  // }

  // --------------------------------------------
  // --------------  submit Form ----------------
  // --------------------------------------------
  dynamicFormGroup: FormGroup;

  @Output('submitForm') submitForm: EventEmitter<any> = new EventEmitter();

  @Output('submitEditForm') submitEditForm: EventEmitter<any> = new EventEmitter();

  submitFormGroup() {
    if (this.dynamicFormGroup.valid) {
      if (this.options.editable === true) {
        this.submitEditForm.emit(this.dynamicFormGroup.value);
      } else {
        this.submitForm.emit(this.dynamicFormGroup.value);
        this.resetFormGroup()
      }
    }
  }

  // --------------------------------------------
  // ---------------  reset Form ----------------
  // --------------------------------------------
  resetFormGroup() {
    this.options.loading = false;
    this.dynamicFormGroup.reset()
  }

  // ------------------------------------------
  // -------- Event Click Field Form  ---------
  // ------------------------------------------
  runCommand(field: FormModalField, event: any = '') {
    if (field.command) {
      field.command(event, field);
    }
  }

  // ------------------------------------------
  // --------- AutoComplet Load Data ----------
  // ------------------------------------------

  listAutoComplete: any
  onFocusAutoComplete(field: FormModalField, index) {
    if (field.extraDataComplete?.length > 3) {
      this.listAutoComplete = field.extraDataComplete
    }

    if(this.listAutoComplete.length > 0){
      index.suggestions =this.listAutoComplete
    }
    index.show()
  }
  onSelectAutoComplete(event, index) {
    index.overlayVisible = false
  }

  // ------------------------------------------
  // --------- Select Template Filter ---------
  // ------------------------------------------
  customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions) {
    options.filter!(event);
  }

  // ------------------------------------------
  // ------------- Editor Section -------------
  // ------------------------------------------
  editorModules = {
    imageHandler: {
      upload: (file) => {
        return new Promise(async (resolve, reject) => {
          const uploadData = new FormData();
          uploadData.append('file', file, file.name);
          try {
            const resp = await lastValueFrom(this.imageService.upload(uploadData));
            resolve(
              `http://192.168.103.13:8091/api/Image/Download/${resp.body}`
            );
          } catch (error) {
            console.error('Error:', error);
            reject('Upload failed');
          }
        });
      },
      accepts: ['png', 'jpg', 'jpeg', 'jfif'],
    } as Options,
  };

  activateRTL(editor: any) {
    editor.format('align', 'right');
    // editor.format('direction', 'rtl');
  }

}
