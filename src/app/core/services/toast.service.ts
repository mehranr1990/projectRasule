import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private readonly messageService: MessageService) {
  }

  success(head: string, body: string) {
    this.messageService.add({severity: "success", summary: head, detail: body, key: 'toasts', life: 6000});
  }


  info(head: string, body: string) {
    this.messageService.add({severity: "info", summary: head, detail: body, key: 'toasts', life: 6000});
  }


  warning(head: string, body: string) {
    this.messageService.add({severity: "warn", summary: head, detail: body, key: 'toasts', life: 6000});
  }


  error(head: string, body: string) {
    this.messageService.add({severity: "error", summary: head, detail: body, key: 'toasts', life: 6000});
  }




}
