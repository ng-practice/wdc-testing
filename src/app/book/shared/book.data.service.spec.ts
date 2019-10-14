import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BookDataService } from './book-data.service';

describe('Service: book-data', () => {
  let httpMock: HttpTestingController;
  let service: BookDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookDataService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(BookDataService);
  });

  describe('When the call fails', () => {
    it('yields an error', done => {
      service.getBooks().subscribe(booksFromMockAPI => {
        expect(booksFromMockAPI).toBe([{} as any]);
        done();
      });

      httpMock.expectOne('http://localhost:4730/books').flush([]);
      httpMock.verify();
    });
  });
});
