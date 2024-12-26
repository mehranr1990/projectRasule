import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {debounceTime, distinctUntilChanged, Subject, Subscription, switchMap} from "rxjs";

@Component({
  selector: 'search-box',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  @Input('placeholder') placeholder: string = 'جستجو';

  searchTextValue: Subject<string> = new Subject<string>();
  searchBoxSubscription!: Subscription;
  @Output('onSearch') onSearch: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchBoxSubscription = this.searchTextValue.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchValue: string) => {
        this.loading.flag = false;
        this.onSearch.emit(searchValue);
        return searchValue;
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.searchBoxSubscription.unsubscribe();
  }

  onSearchTextChange(searchValue: Event) {
    this.loading.flag = true;
    this.searchTextValue.next((<HTMLInputElement>searchValue.target).value);
  }

  // -------------------------------------------
  // ----------------- Loading -----------------
  // -------------------------------------------
  loading = {
    flag: false,
  }
}
