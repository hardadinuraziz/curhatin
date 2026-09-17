import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitAssessmentDto, ReviewAssessmentDto } from './assessment.dto';
import { Role } from '@prisma/client';

export interface Dass21ScoreResult {
  depression: { score: number; level: string };
  anxiety: { score: number; level: string };
  stress: { score: number; level: string };
  crisisFlag: boolean;
  disclaimer: string;
  recommendation: {
    serviceType: 'PSIKOLOG' | 'TEMAN_CERITA' | 'SELF_CARE';
    explanation: string;
    crisisHotline?: string;
  };
}

@Injectable()
export class AssessmentService {
  constructor(private prisma: PrismaService) {}

  private calculateDass21(answers: { questionIndex: number; score: number }[]): Dass21ScoreResult {
    // DASS-21 question index mapping (1-indexed standard, 0-indexed in array)
    // Depression: Q3, 5, 10, 13, 16, 17, 21
    // Anxiety: Q2, 4, 7, 9, 15, 19, 20
    // Stress: Q1, 6, 8, 11, 12, 14, 18
    const depIndices = [2, 4, 9, 12, 15, 16, 20];
    const anxIndices = [1, 3, 6, 8, 14, 18, 19];
    const strIndices = [0, 5, 7, 10, 11, 13, 17];

    let depRaw = 0;
    let anxRaw = 0;
    let strRaw = 0;
    let crisisTrigger = false;

    answers.forEach((ans) => {
      if (depIndices.includes(ans.questionIndex)) depRaw += ans.score;
      if (anxIndices.includes(ans.questionIndex)) anxRaw += ans.score;
      if (strIndices.includes(ans.questionIndex)) strRaw += ans.score;

      // Question 21 (index 20) relates to feeling life was not worthwhile
      if (ans.questionIndex === 20 && ans.score >= 2) {
        crisisTrigger = true;
      }
    });

    // DASS-21 standard doubles raw score to compare with 42-item scale
    const depScore = depRaw * 2;
    const anxScore = anxRaw * 2;
    const strScore = strRaw * 2;

    const getDepLevel = (s: number) => {
      if (s <= 9) return 'Normal';
      if (s <= 13) return 'Ringan (Mild)';
      if (s <= 20) return 'Sedang (Moderate)';
      if (s <= 27) return 'Parah (Severe)';
      return 'Sangat Parah (Extremely Severe)';
    };

    const getAnxLevel = (s: number) => {
      if (s <= 7) return 'Normal';
      if (s <= 9) return 'Ringan (Mild)';
      if (s <= 14) return 'Sedang (Moderate)';
      if (s <= 19) return 'Parah (Severe)';
      return 'Sangat Parah (Extremely Severe)';
    };

    const getStrLevel = (s: number) => {
      if (s <= 14) return 'Normal';
      if (s <= 18) return 'Ringan (Mild)';
      if (s <= 25) return 'Sedang (Moderate)';
      if (s <= 33) return 'Parah (Severe)';
      return 'Sangat Parah (Extremely Severe)';
    };

    const depLevel = getDepLevel(depScore);
    const anxLevel = getAnxLevel(anxScore);
    const strLevel = getStrLevel(strScore);

    const isSevere =
      depScore >= 21 || anxScore >= 15 || strScore >= 26 || crisisTrigger;
    const isModerate = depScore >= 10 || anxScore >= 8 || strScore >= 15;

    let serviceType: 'PSIKOLOG' | 'TEMAN_CERITA' | 'SELF_CARE' = 'SELF_CARE';
    let explanation = 'Tingkat stres dan kecemasan Anda berada pada rentang normal. Praktikkan self-care dan mindfulness sehari-hari.';

    if (isSevere) {
      serviceType = 'PSIKOLOG';
      explanation = 'Hasil skrining mengindikasikan tingkat ketidaknyamanan emosional yang tinggi. Kami menyarankan untuk melakukan sesi konsultasi privat dengan Psikolog Klinis terverifikasi.';
    } else if (isModerate) {
      serviceType = 'TEMAN_CERITA';
      explanation = 'Terdapat indikasi beban emosional ringan hingga sedang. Berbicara dengan Teman Cerita dapat membantu meringankan perasaan dan menemukan perspektif baru.';
    }

    return {
      depression: { score: depScore, level: depLevel },
      anxiety: { score: anxScore, level: anxLevel },
      stress: { score: strScore, level: strLevel },
      crisisFlag: isSevere && crisisTrigger,
      disclaimer: 'PERHATIAN: Hasil asesmen ini bersifat skrining awal dan TIDAK menggantikan diagnosis klinis psikologis resmi.',
      recommendation: {
        serviceType,
        explanation,
        crisisHotline: crisisTrigger ? 'Layanan Darurat Krisis Jiwa: Hotline 119 ext 8 (Sejiwa) / 021-500-454' : undefined,
      },
    };
  }

  async submit(userId: string, dto: SubmitAssessmentDto) {
    const scoredResult = this.calculateDass21(dto.answers);

    // Save strictly as an independent assessment record
    // Assessment does NOT automatically book or create a counseling record!
    const record = await this.prisma.assessment.create({
      data: {
        userId,
        type: dto.type,
        answers: dto.answers as any,
        results: scoredResult as any,
        crisisFlag: scoredResult.crisisFlag,
      },
    });

    return {
      id: record.id,
      createdAt: record.createdAt,
      type: record.type,
      results: scoredResult,
    };
  }

  async findUserAssessments(userId: string) {
    return this.prisma.assessment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(user: { id: string; role: Role }) {
    return this.prisma.assessment.findMany({
      include: {
        user: { select: { id: true, email: true, profile: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const assessment = await this.prisma.assessment.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, profile: true } },
      },
    });
    if (!assessment) throw new NotFoundException('Assessment not found');
    return assessment;
  }

  async review(id: string, reviewerId: string, dto: ReviewAssessmentDto) {
    const assessment = await this.prisma.assessment.findUnique({ where: { id } });
    if (!assessment) throw new NotFoundException('Assessment not found');

    return this.prisma.assessment.update({
      where: { id },
      data: {
        reviewedAt: new Date(),
        reviewedBy: reviewerId,
        staffNotes: dto.reviewNotes,
      },
    });
  }
}
