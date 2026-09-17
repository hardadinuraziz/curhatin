import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { SubmitAssessmentDto, ReviewAssessmentDto } from './assessment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('assessments')
export class AssessmentController {
  constructor(private assessmentService: AssessmentService) {}

  @Post()
  async submit(@CurrentUser() user: any, @Body() dto: SubmitAssessmentDto) {
    return this.assessmentService.submit(user.id, dto);
  }

  @Get('my')
  async getMyAssessments(@CurrentUser() user: any) {
    return this.assessmentService.findUserAssessments(user.id);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN_OPERASIONAL, Role.PSIKOLOG)
  @Get()
  async getAllAssessments(@CurrentUser() user: any) {
    return this.assessmentService.findAll(user);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN_OPERASIONAL, Role.PSIKOLOG)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.assessmentService.findById(id);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN_OPERASIONAL, Role.PSIKOLOG)
  @Put(':id/review')
  async reviewAssessment(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: ReviewAssessmentDto,
  ) {
    return this.assessmentService.review(id, user.id, dto);
  }
}
