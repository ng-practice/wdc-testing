// package.json
// "@angular-builders/jest": "8.2.0",
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';
import { Book } from '../shared/book';
import { BookDataService } from '../shared/book-data.service';
import { BookListComponent } from './book-list.component';
// npm i -D ts-mockito

const books: Book[] = [{ id: 1 } as any, { id: 2 } as any, { id: 3 } as any];

describe('<book-list>', () => {
  let fixture: ComponentFixture<BookListComponent>;
  let bookService: BookDataService;

  beforeEach(() => {
    bookService = mock(BookDataService);
    when(bookService.getBooks()).thenReturn(of(books));
    // when(bookService.createBook(anything())).thenReturn(of(books));
    // when(bookService.createBook()).thenReturn(of(books));

    TestBed.configureTestingModule({
      // import { RouterTestingModule }
      //   from '@angular/router/testing';
      // import { MatListModule }
      //   from '@angular/material/list';
      imports: [MatListModule, RouterTestingModule],
      // import { NO_ERRORS_SCHEMA } from '@angular/core';
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BookListComponent],
      providers: [
        {
          provide: BookDataService,
          useFactory() {
            return instance(bookService);
          }
        }
      ]
    });

    fixture = TestBed.createComponent(BookListComponent);
    fixture.detectChanges();
  });

  describe('When book list is shown', () => {
    it('displays 3 books', () => {
      // import { By } from '@angular/platform-browser';
      const books = fixture.debugElement.queryAll(
        By.css('[data-testid=book-single]')
      );

      expect(books.length).toBe(3);
    });

    it('calls service once', () => {
      verify(bookService.getBooks()).once();
    });
  });
});
