import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  // By not specifying a default model, we avoid requiring an API key on startup.
  // Flows that need a model will have to specify it explicitly.
});
