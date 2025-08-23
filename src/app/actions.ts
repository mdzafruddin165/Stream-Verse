'use server';

import {
  getPersonalizedRecommendations,
  type PersonalizedRecommendationsInput,
} from '@/ai/flows/personalized-recommendations';
import { z } from 'zod';

const recommendationSchema = z.object({
  viewingHistory: z.string().min(1, 'Please enter at least one title.'),
  preferences: z.string().min(1, 'Please describe your preferences.'),
});

interface FormState {
  message: string;
  recommendations: string[];
  errors?: {
    viewingHistory?: string[];
    preferences?: string[];
  };
}

export async function generateRecommendationsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = recommendationSchema.safeParse({
      viewingHistory: formData.get('viewingHistory'),
      preferences: formData.get('preferences'),
    });

    if (!validatedFields.success) {
      return {
        message: 'Invalid input. Please check the errors below.',
        recommendations: [],
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { viewingHistory, preferences } = validatedFields.data;

    const input: PersonalizedRecommendationsInput = {
      viewingHistory: viewingHistory.split(',').map((item) => item.trim()).filter(Boolean),
      preferences,
      numberOfRecommendations: 5,
    };

    const result = await getPersonalizedRecommendations(input);

    return {
      message: 'Success! Here are your recommendations.',
      recommendations: result.recommendations,
      errors: {},
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An AI-powered error occurred. Please try again.',
      recommendations: [],
      errors: {},
    };
  }
}
