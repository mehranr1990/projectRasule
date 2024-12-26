import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<Model, CreateDTO> {

  protected constructor(protected readonly api: ApiService, CRUDMainUrl: string) {
    this.CRUDMainUrl = CRUDMainUrl;
  }

  protected CRUDMainUrl: string = '';

  /**
   * مپ کردن جواب دریافتی از سرور با توجه به کلید به خروجی متد با توجه به مقدار
   *
   * @protected
   */
  protected createMap: { [key: string]: string };
  protected createAndUpdateEnums: { [key: string]: { [key: string]: any } };

  /**
   * متد ساخت دیتای جدید و ارسال آن به سمت سرور و در صورت نیاز تبدیل جواب دریافتی از سرور با توجه به createMap
   *
   * @Payload CreateDTO
   */
  create(payload: CreateDTO): Observable<Model> {
    if (this.createAndUpdateEnums) {
      for (const enumProperty in this.createAndUpdateEnums) {
        // تبدیل buy به 0 بعنوان مثال
        payload[enumProperty] = this.createAndUpdateEnums[enumProperty][payload[enumProperty]];
      }
    }
    return this.api.post(this.CRUDMainUrl, payload)
      .pipe(
        map(createResp => {
          if (this.createMap) {
            const newModelOfResponse = {};
            for (const property in this.createMap) {
              newModelOfResponse[this.createMap[property]] = createResp[property];
            }
            return newModelOfResponse;
          } else {
            return createResp;
          }
        })
      );
  }

  /**
   * مپ کردن جواب دریافتی از سرور با توجه به کلید به خروجی متد با توجه به مقدار
   *
   * @protected
   */
  protected getAllMap: { [key: string]: string | any };
  protected getAllEnums: { [key: string]: { [key: string]: any } };

  /**
   * دریافت لیست دیتا از سمت سرور و در صورت نیاز تبدیل جواب دریافتی از سرور به مدل با توجه به getAllMap
   *
   * @Payload page number
   * @Payload limit number
   */
  public meta: { currentPage: number,itemCount:string,itemsPerPage:string,totalItems:number,totalPages:number } 

  getAll(page: number = 1, limit: number = 10, searchTerm: string = ''): Observable<Model[]> {
    return this.api.get(`${this.CRUDMainUrl}?page=${page}&limit=${limit}&q=${searchTerm}`)
      .pipe(
        tap(resp => {
          this.meta = resp.meta;
        }),
        map(resp => resp.items.map(user => {
          if (this.getAllMap) {
            const newModelOfResponse = {}
            for (const property in this.getAllMap) {
              newModelOfResponse[this.getAllMap[property]] = user[property];
              // console.log(property);
            }
            if (this.getAllEnums) {
              for (const enumProperty in this.getAllEnums) {
                newModelOfResponse[enumProperty] = this.getAllEnums[enumProperty][newModelOfResponse[enumProperty]];
              }
            }
            return newModelOfResponse;
          } else {
            return user;
          }
        }))
      );
  }

  /**
   * مپ کردن جواب دریافتی از سرور با توجه به کلید به خروجی متد با توجه به مقدار
   *
   * @protected
   */
  protected getMap: { [key: string]: string };
  protected getEnums: { [key: string]: { [key: string]: any } };

  /**
   * دریافت دیتا از سمت سرور و در صورت نیاز تبدیل جواب دریافتی از سرور به مدل با توجه به getMap
   *
   * @Payload id number | string
   */
  get(id: number | string): Observable<Model> {
    return this.api.get(this.CRUDMainUrl + '/' + id)
      .pipe(map(user => {
        if (this.getMap) {
          const newModelOfResponse = {};
          for (const property in this.getMap) {
            newModelOfResponse[this.getMap[property]] = user[property];
          }
          if (this.getEnums) {
            for (const enumProperty in this.getEnums) {
              // تنظیم عدد به متن قابل درک مثل تبدیل 0 به خرید
              newModelOfResponse[enumProperty] = this.getEnums[enumProperty][newModelOfResponse[enumProperty]];
            }
          }
          return newModelOfResponse;
        } else {
          return user;
        }
      }));
  }



  /**
   * آپدیت یک دیتا و ارسال آن به سمت سرور با توجه به مدل ساخت دیتا Partial<CreateDTO>
   *
   * @Payload id number | string
   * @Payload body Partial<CreateDTO>
   */
  update(id: number | string, body: Partial<CreateDTO>) {
    if (this.createAndUpdateEnums) {
      for (const enumProperty in this.createAndUpdateEnums) {
        // تبدیل buy به 0 بعنوان مثال
        body[enumProperty] = this.createAndUpdateEnums[enumProperty][body[enumProperty]];
      }
    }
    return this.api.put(this.CRUDMainUrl + '/' + id, body);
  }


  /**
   * حذف دیتا با توجه به آی دی ارسال شده و ارسال آن به سمت سرور جهت حذف رکورد
   *
   * @Payload id number | string
   */
  delete(id: number | string) {
    return this.api.delete(this.CRUDMainUrl + '/' + id);
  }

}
