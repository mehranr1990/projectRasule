import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {SearchBoxComponent} from '../../../components/inputs/search-box/search-box.component';
import {FormCreatorComponent} from '../../../components/shared/form-creator/form-creator.component';
import {
  FormFieldSelectData,
  FormFieldType,
  FormModalField,
  FormModalOptions,
} from '../../../components/shared/form-creator/form-creator.model';
import {InputMaskModule} from 'primeng/inputmask';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {PrimengEditorComponent} from '../../../components/primeng-editor/primeng-editor.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DefaultService} from './core/default.service';
import {ICustomer} from './core/IDefault';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ITrade, TradeType} from './core/ITrade';
import {BehaviorSubject, lastValueFrom, Observable, switchMap, tap} from 'rxjs';
import {itemSelectButton, TradTypeList} from './core/ITradeDto';
import {PaginatorComponent} from 'src/app/components/shared/table/paginator/paginator.component';
import {EmptyMessageComponent} from 'src/app/components/shared/table/empty-message/empty-message.component';
import {OperationComponent} from 'src/app/components/shared/table/operation/operation.component';
import {CurrencyService} from "./core/currency.service";

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    SearchBoxComponent,
    FormCreatorComponent,
    InputMaskModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    PrimengEditorComponent,
    TableModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    SplitButtonModule,
    TooltipModule,
    OverlayPanelModule,
    PaginatorComponent,
    EmptyMessageComponent,
    OperationComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  customers: ICustomer[] = [];
  visible: boolean = false;
  headerDialog: string = '';

  constructor(
    private readonly _servDefault: DefaultService,
    private readonly currencyService: CurrencyService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
  }

  // --------------------------------------------
  // -------------- Initial Form ----------------
  // --------------------------------------------
  public formFields: FormModalField[] = [];

  async initialForm() {
    try {
      const customerList = await lastValueFrom(this._servDefault.getAll());
      const currencyList = await lastValueFrom(this.currencyService.getAll());

      this.formFields = [
        {
          type: FormFieldType.TEXT,
          name: 'fullname',
          label: 'نام و نام خانوادگی',
          value: '',
          validations: ['required'],
        },
        {
          type: FormFieldType.TEXT,
          name: 'mobile',
          label: 'موبایل',
          value: '',
          validations: ['required'],
          mask: '0000 000 0000',
          ltr: true,
          suffix: 'تومان',
          command: (event) => {
            // console.log('log from mobile command : ', event);
          },
        },
        {
          type: FormFieldType.TEXTAREA,
          name: 'description',
          label: 'توضیحات',
          value: '',
          validations: ['required'],
        },
        {
          type: FormFieldType.SELECT,
          name: 'selectTest',
          label: 'نوع',
          value: '',
          validations: ['required'],
          extraData: TradTypeList,
          command: (event) => {
            // console.log('log from select list : ', event);
          },
        },
        {
          type: FormFieldType.SELECT,
          name: 'selectTest2',
          label: 'نوع',
          value: '',
          validations: ['required'],
          extraData: TradTypeList,
          command: (event) => {
            // console.log('log from select list : ', event);
          },
          extraOption: {filter: true},
        },
        {
          type: FormFieldType.AUTOCOMPLETE,
          name: 'customerId',
          label: 'مشتریان',
          value: '',
          validations: ['required'],
          extraDataComplete: customerList.map(item => ({label: item.fullname, value: item.id.toString()})),
          extraOption: {filterBy: 'label'},
          command: (event, field) => {
            this.filterCustomer(event, field)
          }
        },
        {
          type: FormFieldType.AUTOCOMPLETE,
          name: 'currencyId',
          label: 'ارزها',
          value: '',
          validations: ['required'],
          extraDataComplete: currencyList.map(item => ({label: item.fullname, value: item.id.toString()})),
          extraOption: {filterBy: 'label'},
          command: (event, field) => {
            this.filterCustomer(event, field)
          }
        },
        {
          type: FormFieldType.DATE,
          name: 'date',
          label: 'تاریخ',
          value: '',
          validations: ['required'],
          ltr: true,
          command: (event, field) => {
            field!.value = event.gregorian
          },
        },
        // {
        //   type: FormFieldType.SELECT_BUTTON,
        //   name: 'item',
        //   label: '',
        //   value: 'sell',
        //   validations: [''],
        //   extraData: itemSelectButton,
        // },
        // {
        //   type: FormFieldType.PASSWORD,
        //   name: 'pass',
        //   label: 'رمز عبور',
        //   value: '',
        //   validations: ['required'],
        // },
      ];
    } catch (e) {
      console.log(e);
    }
  }

  public formValues;

  public formOptions: FormModalOptions = {
    editable: false,
    loading: false,
    doubleCheck: true,
    label: 'مشتری',
  };

  // --------------------------------------------
  // ---------------- Get All -------------------
  // --------------------------------------------
  // getAllCustomers() {
  //   this._servDefault.getAll().subscribe({
  //     next: (customers) => {
  //       this.customers = customers;
  //     },
  //   });
  // }

  defaultLoading: boolean = true;

  _defaultConfig: BehaviorSubject<any> = new BehaviorSubject({
    page: 1,
    limit: 10,
    search: '',
  });

  get meta() {
    return this._servDefault.meta;
  }

  getAllDefault$: Observable<any> = this._defaultConfig.pipe(
    switchMap((config) => {
      return this._servDefault.getAll(config.page, config.limit, config.search).pipe(
        tap({
          complete: () => {
            this.defaultLoading = false
          }
        })
      );
    })
  );

  reloadDefault() {
    this.defaultLoading = true;
    this._defaultConfig.next({
      page: this._defaultConfig.getValue().page,
      limit: this._defaultConfig.getValue().limit,
      search: this._defaultConfig.getValue().search
    });
  }

  onPageChange(event) {
    // const pyload = {
    //   page: event.page + 1,
    //   limit: event.rows,
    //   search: '',
    // };
    // this._transactionsConfig.next(pyload);
    this._defaultConfig.next(event);
  }

  // ------------------------------------------
  // ------------- Search Section -------------
  // ------------------------------------------
  onSearch(searchTerm) {
    this._defaultConfig.next({
      page: 1,
      limit: 25,
      search: searchTerm,
    });
    // console.log(searchTerm);
  }

  // --------------------------------------------
  // --------------- Create Form ----------------
  // --------------------------------------------
  async startCreateCustomer() {
    this.formOptions.editable = false;
    this.formValues = [];
    this.headerDialog = 'ایجاد مشتری';
    await this.initialForm();
    // this.getAllCustomers();
    this.visible = true;
  }

  submitCustomers(form) {
    this.formOptions.loading = true;
    this._servDefault.create(form).subscribe({
      next: (customers) => {
        this.formOptions.loading = false;
        this.reloadDefault();
        this.visible = false;
      },
      error: (err) => {
        this.formOptions.loading = false;
      },
    });
  }

  // --------------------------------------------
  // ---------------- Edit Form -----------------
  // --------------------------------------------
  async startEditingCustomer(customer: ICustomer) {
    // this.formValues = customer;
    this.formValues = {
      fullname: customer.fullname,
      mobile: customer.mobile,
      description: TradeType.BUY,
    };
    this.formOptions.editable = true;
    this.headerDialog = `ویرایش مشتری ${customer.fullname}`;
    await this.initialForm();
    this.visible = true;
  }

  submitEditCustomers(form) {
    this.formOptions.loading = true;
    this._servDefault.update(this.formValues.id, form).subscribe({
      next: (customers) => {
        this.formOptions.loading = false;
        this.reloadDefault();
        this.visible = false;
      },
      error(err) {
      },
    });
  }

  // --------------------------------------------
  // --------------- Delete Form ----------------
  // --------------------------------------------
  deleteCustomer(event: Event, customer: ICustomer) {
    console.log(event);
    console.log(customer);

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'آیا از حذف این آیتم مطمئن هستید؟',
      header: 'اخطار',
      icon: 'fa-regular fa-circle-exclamation text-amber-500',
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: 'تایید',
      acceptButtonStyleClass: "bg-sky-700 text-sky-100",
      rejectLabel: 'رد',
      rejectButtonStyleClass: "text-slate-500 pe-5",
      accept: () => {
        this._servDefault.delete(customer.id).subscribe({
          next: (resp) => {
            this.reloadDefault()
            this.messageService.add({
              severity: 'success',
              summary: 'حذف',
              detail: `مشتری ${customer.fullname} با موفقیت حذف شد `
            });
          },
          error(err) {
          },
        })
      },
    });
  }


  filterCustomer(event, field) {
    let query = event.query;
    this._servDefault.getAll(1, 5, query).subscribe({
      next: (customers) => {
        field.extraDataComplete = customers.map(item => ({label: item.fullname, value: item.id.toString()}));
      }
    })
  }

  listCustomer: FormFieldSelectData[] = []

  /*getAllCustomers() {
    this._servDefault.getAll().subscribe({
      next: async (customers) => {
        this.listCustomer = customers.map(item => ({label: item.fullname, value: item.id.toString()}));
        this.formFields = [
          ...this.formFields,
          {
            type: FormFieldType.AUTOCOMPLETE,
            name: 'customerId',
            label: 'مشتریان',
            value: '',
            validations: ['required'],
            extraDataComplete: customers.map(item => ({label: item.fullname, value: item.id.toString()})),
            extraOption: {filterBy: 'label'},
            command: (event, field) => {
              this.filterCustomer(event, field)
            }
          },
        ];
        // this.initialForm(this.listCustomer)
      }
    })
  }*/

  paginate(e) {
    console.log(e);
  }
}
