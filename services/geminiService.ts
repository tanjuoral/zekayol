
// Fixed: Using correct imports according to Google GenAI SDK guidelines
import { GoogleGenAI, Type } from "@google/genai";
import { Question, QuestionType, Difficulty, GradeLevel } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fixed: Upgraded to 'gemini-3-pro-preview' as this is a complex reasoning task (Math/Science question generation)
const modelName = 'gemini-3-pro-preview';

export const generateLessonContent = async (
  subjectName: string, 
  unitName: string, 
  topicName: string,
  difficulty: Difficulty = Difficulty.MEDIUM,
  grade: GradeLevel = 7,
  count: number = 5
): Promise<Question[]> => {
  const isLGS = grade === 8;
  const prompt = `
    Sen ${grade}. sınıf öğrencileri için eğlenceli, destekleyici bir öğretmensin.
    Ders: ${subjectName}
    Ünite: ${unitName}
    Konu: ${topicName}
    Zorluk Seviyesi: ${difficulty}
    Sınıf Seviyesi: ${grade}. Sınıf ${isLGS ? '(LGS Hazırlık)' : ''}

    Lütfen bu konuya, sınıf seviyesine ve seçilen zorluk seviyesine (${difficulty}) uygun tam olarak ${count} adet soru hazırla.
    ${isLGS ? '- 8. SINIF NOTU: Lütfen soruları LGS tarzında, beceri temelli (yeni nesil), grafik okuma veya mantık yürütme gerektirecek şekilde kurgula.' : ''}
    - "Kolay": Temel kavramlar, basit hatırlatmalar.
    - "Orta": Kavrama ve uygulama düzeyi.
    - "Zor": Analiz ve sentez gerektiren, düşündürücü sorular.
    - "Yazılıya Hazırım": Çok yönlü, müfredatın en zorlayıcı ve sınavda çıkabilecek kapsamlı soruları.

    Karışık olarak Çoktan Seçmeli (MULTIPLE_CHOICE) veya Doğru/Yanlış (TRUE_FALSE) kullan.
    Cevap şıklarını "options" dizisine koy.
    Doğru cevabı "correctAnswer" alanına koy.
  `;

  const questionSchema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            text: { type: Type.STRING },
            type: { type: Type.STRING, enum: [QuestionType.MULTIPLE_CHOICE, QuestionType.TRUE_FALSE] },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.STRING },
          },
          required: ["id", "text", "type", "options", "correctAnswer"]
        }
      }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionSchema,
        systemInstruction: `Sen MEB müfredatına hakim, ${grade}. sınıf öğrencileriyle dostane konuşan, LGS sınav sistemini bilen uzman bir yapay zeka öğretmenisin.`
      }
    });

    // Fixed: Accessed .text property directly (not as a method)
    const json = JSON.parse(response.text || '{"questions": []}');
    return json.questions;
  } catch (error) {
    console.error("Gemini Error Generating Questions:", error);
    return [
      {
        id: "fallback-1",
        text: `${topicName} konusu hakkında temel bir soru: Aşağıdakilerden hangisi doğrudur? (Yapay zeka yanıt veremedi)`,
        type: QuestionType.MULTIPLE_CHOICE,
        options: ["Seçenek A", "Seçenek B", "Seçenek C", "Seçenek D"],
        correctAnswer: "Seçenek A"
      }
    ];
  }
};

export const getMistakeExplanation = async (
  subjectName: string,
  topicName: string,
  questionText: string,
  userAnswer: string,
  correctAnswer: string
) => {
  const prompt = `
    Öğrenci 7/8. sınıfa gidiyor.
    Ders: ${subjectName}, Konu: ${topicName}
    Soru: "${questionText}"
    Öğrencinin Yanlış Cevabı: "${userAnswer}"
    Doğru Cevap: "${correctAnswer}"

    Lütfen öğrenciye nerede hata yaptığını, samimi ve motive edici bir dille anlat.
    Sanki bir abla/abi veya sevdiği bir öğretmen gibi konuş.
    Kısa tut (maksimum 3 cümle).
  `;

  const explanationSchema = {
    type: Type.OBJECT,
    properties: {
      encouragement: { type: Type.STRING, description: "Kısa motive edici bir giriş (ör: Ah, çok yaklaştın!)" },
      explanation: { type: Type.STRING, description: "Hatanın nedenini ve doğrusunu anlatan kısım." },
      tip: { type: Type.STRING, description: "Bir dahaki sefere hatırlaması için küçük bir ipucu." }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: explanationSchema
      }
    });
    
    // Fixed: Accessed .text property directly (not as a method)
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error Explanation:", error);
    return {
      encouragement: "Pes etmek yok!",
      explanation: `Doğru cevap ${correctAnswer} olmalıydı.`,
      tip: "Konuyu tekrar gözden geçirebilirsin."
    };
  }
};
