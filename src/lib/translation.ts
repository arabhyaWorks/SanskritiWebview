import axios from 'axios';

const BHASHINI_API_URL = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline';
const BHASHINI_API_KEY = 'sk0Y4-IrxVJSOmP2V7umwEeUnxyWqCbvHSK4LzLRaAQ7yz4-_p6Mez3WTjD8-Bl0';

const languageMap: Record<string, string> = {
  'hi': 'hi',
  'mr': 'mr',
  'bn': 'bn',
  'te': 'te',
  'ta': 'ta',
  'en': 'en',
  'ml': 'ml',
  'gu': 'gu',
  'kn': 'kn',
  'or': 'or',
  'as': 'as',
  'pa': 'pa',
  'sa': 'sa'
};

interface TranslationConfig {
  sourceLanguage: string;
  targetLanguage: string;
}

export async function translateText(text: string, config: TranslationConfig): Promise<string> {
  try {
    const targetLang = languageMap[config.targetLanguage];
    
    if (!text.trim() || !targetLang || config.sourceLanguage === config.targetLanguage) {
      return text;
    }

    const reqObj = {
      pipelineTasks: [
        {
          taskType: 'translation',
          config: {
            language: {
              sourceLanguage: config.sourceLanguage,
              targetLanguage: targetLang,
            },
            serviceId: 'ai4bharat/indictrans-v2-all-gpu--t4',
          },
        },
      ],
      inputData: {
        input: [{ source: text }],
      },
    };

    const response = await axios.post(BHASHINI_API_URL, reqObj, {
      headers: {
        Authorization: BHASHINI_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const translatedText = response?.data?.pipelineResponse?.[0]?.output?.[0]?.target;
    if (translatedText) {
      return translatedText;
    }

    console.error('No translated text found in response');
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}