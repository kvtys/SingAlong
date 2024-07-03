import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-2">
    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    <div className="h-4 bg-gray-700 rounded"></div>
    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
  </div>
);

const App = () => {
  const [koreanLyrics, setKoreanLyrics] = useState('');
  const [transliteration, setTransliteration] = useState('');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTransliterate = async () => {
    setIsLoading(true);
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/chat/completions';
  
    const prompt = `Given the following Korean lyrics:

    "${koreanLyrics}"
    
    Please provide:
    
    1. A clear English transliteration (romanization) of the Korean lyrics. Use standard romanization rules and separate each line.
    
    2. A natural English translation of the lyrics. Translate for meaning rather than literally, to capture the song's essence.
    
    Format your response like this:
    
    Transliteration:
    [Romanized lyrics, line by line]
    
    Translation:
    [English translation, line by line]
    
    Ensure the transliteration is easy to read and pronounce for non-Korean speakers, and the translation captures the song's meaning and emotion.`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
          n: 1,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

      const data = await response.json();
      const responseText = data.choices[0].message.content.trim();
      
      const [transliterationPart, translationPart] = responseText.split('Translation:');
      setTransliteration(transliterationPart.replace('Transliteration:', '').trim());
      setTranslation(translationPart.trim());
    } catch (error) {
      console.error("Error:", error);
      setTransliteration(`An error occurred. Details: ${error.message}`);
      setTranslation('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-Inter p-4`}>
      <h1 className={`text-6xl font-semibold mb-8 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>sing-along</h1>
      <div className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-4xl transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full md:w-1/2">
          <textarea
            className="w-full h-full p-4 bg-gray-800 rounded-lg font-semibold resize-none"
            value={koreanLyrics}
            onChange={(e) => setKoreanLyrics(e.target.value)}
            placeholder="Enter Korean lyrics here..."
          />
        </div>
        <button 
            onClick={handleTransliterate}
            className="mt-4 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            disabled={isLoading}
          >
            <ArrowRight size={24} />
          </button>
        <div className="w-full md:w-1/2 space-y-4">
          <div className="h-64 p-4 bg-gray-800 rounded-lg overflow-auto">
            <h2 className="text-xl font-bold mb-2">Transliteration:</h2>
            {isLoading ? <SkeletonLoader /> : (
              <pre className="whitespace-pre-wrap">{transliteration}</pre>
            )}
          </div>
          <div className="h-64 p-4 bg-gray-800 rounded-lg overflow-auto">
            <h2 className="text-xl font-bold mb-2">Translation:</h2>
            {isLoading ? <SkeletonLoader /> : (
              <pre className="whitespace-pre-wrap">{translation}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;