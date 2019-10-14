// package.json
// "@angular-builders/jest": "8.2.0",
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BookDataService } from '../shared/book-data.service';
import { BookListComponent } from './book-list.component';

describe('<book-list>', () => {
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookListComponent],
      providers: [
        {
          provide: BookDataService,
          useFactory() {
            return {
              getBooks: () => of([{}, {}, {}])
            };
          }
        }
      ]
    });

    fixture = TestBed.createComponent(BookListComponent);
    fixture.detectChanges();
  });

  describe('When book list is shown', () => {
    it('displays 3 books', () => {});
  });
});
