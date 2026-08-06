import { AIFeature } from '../enums/ai-feature.enum';

export interface AIRequest<TPayload> {
  feature: AIFeature;
  payload: TPayload;
}