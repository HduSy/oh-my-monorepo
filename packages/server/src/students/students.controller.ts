import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { StudentDto } from './students.dto'
import { StudentsService } from './students.service'

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  @Get('who-are-you')
  whoAreYou(@Query('name') name: string) {
    return this.studentsService.imStudent(name)
  }
  @Post('add')
  addOneStudent(@Body() student: StudentDto) {
    return this.studentsService.addAStudent(student.name)
  }
}
