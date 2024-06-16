import type { ModalContent } from '@/interfaces/modalServices.interface'
import { Subject, Observable } from 'rxjs'

class ModalService {
  private modalSubject = new Subject<ModalContent | null>()

  get modal$(): Observable<ModalContent | null> {
    return this.modalSubject.asObservable()
  }

  openModal(content: ModalContent): void {
    this.modalSubject.next(content)
  }

  closeModal(): void {
    this.modalSubject.next(null)
  }
}

export const modalService = new ModalService()
