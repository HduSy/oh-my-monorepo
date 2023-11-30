import { Injectable } from '@nestjs/common'

@Injectable()
export class StudentsService {
  imStudent(name?: string) {
    return `I m a student.` + (name ? ` My name is ${name}` : ``)
  }
  addAStudent(name: string) {
    return `Add a student, name is ${name}.`
  }
}
