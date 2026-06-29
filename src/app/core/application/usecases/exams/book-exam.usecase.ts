import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamsRepository } from '../../../domain/repositories/exams.repository';
import { BookExamRequest } from '../../../domain/models/career/book-exam.model';

@Injectable()
export class BookExamUseCase {
  private readonly repo = inject(ExamsRepository);
  execute(request: BookExamRequest): Observable<void> {
    return this.repo.bookExam(request);
  }
}
