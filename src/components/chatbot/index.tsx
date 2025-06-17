import React, { useState, useRef } from 'react';
import { Mic, MicOff, Volume2, Copy, RotateCcw } from 'lucide-react';

interface LanguageOption {
  code: string;
  label: string;
  serviceId: string;
}

interface BhashiniResponse {
  pipelineResponse: Array<{
    output: Array<{
      source: string;
      isIntermediate?: boolean;
    }>;
  }>;
}

const languageOptions: LanguageOption[] = [
  {
    code: "en",
    label: "English",
    serviceId: "ai4bharat/whisper-medium-en--gpu--t4",
  },
  {
    code: "hi",
    label: "Hindi",
    serviceId: "ai4bharat/conformer-hi-gpu--t4",
  },
];

const RestASRPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(languageOptions[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const authToken = "G1PL5w8C4R-YZHUK3JuNGbNZzLPwaNrhxjmGOtfuUQahFpdyfURwbsgyVYNx5vc-";

  const transcribeAudio = async (base64Audio: string, lang: string, serviceId: string) => {
    setIsTranscribing(true);
    setError(null);

    try {
      const clean = base64Audio.split("base64,")[1] || base64Audio;

      const response = await fetch(
        "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            Authorization: authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pipelineTasks: [
              {
                taskType: "asr",
                config: {
                  language: { sourceLanguage: lang },
                  serviceId,
                  audioFormat: "webm",
                  samplingRate: 16000,
                  preProcessors: ["vad"],
                  postProcessors: ["itn", "punctuation"],
                },
              },
            ],
            inputData: { audio: [{ audioContent: clean }] },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: BhashiniResponse = await response.json();
      const text = data.pipelineResponse?.[0]?.output?.[0]?.source?.trim();
      
      if (!text) {
        throw new Error("No transcription received from the API");
      }

      setTranscribedText(text);
    } catch (e: any) {
      console.error("Transcription error:", e);
      setError(e?.message ?? "ASR failed. Please try again.");
    } finally {
      setIsTranscribing(false);
    }
  };

  const startRecording = async () => {
    try {
      setError(null);
      setRecordingDuration(0);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        }
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        
        reader.onloadend = () => {
          if (reader.result) {
            transcribeAudio(
              reader.result as string,
              selectedLanguage.code,
              selectedLanguage.serviceId
            );
          }
        };
        
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (e: any) {
      setError("Microphone access denied. Please allow microphone access and try again.");
      console.error("Recording error:", e);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const clearTranscription = () => {
    setTranscribedText("");
    setError(null);
    setRecordingDuration(0);
  };

  const copyToClipboard = async () => {
    if (transcribedText) {
      try {
        await navigator.clipboard.writeText(transcribedText);
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Voice Transcription
          </h1>
          <p className="text-gray-600">
            Record your voice and get instant transcription using REST API
          </p>
        </div>

        {/* Language Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Language
          </label>
          <select
            value={selectedLanguage.code}
            onChange={(e) => {
              const lang = languageOptions.find(opt => opt.code === e.target.value);
              if (lang) setSelectedLanguage(lang);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isRecording || isTranscribing}
          >
            {languageOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Recording Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col items-center">
            {/* Recording Button */}
            <div className="relative mb-4">
              <button
                onClick={toggleRecording}
                disabled={isTranscribing}
                className={`relative flex items-center justify-center w-20 h-20 rounded-full focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  isRecording 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                    : isTranscribing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
                }`}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
              >
                {isTranscribing ? (
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : isRecording ? (
                  <div className="w-6 h-6 bg-white rounded-sm" />
                ) : (
                  <Mic size={32} />
                )}
              </button>
              
              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse border-4 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>

            {/* Status Text */}
            <div className="text-center">
              {isTranscribing && (
                <p className="text-indigo-600 font-medium">
                  Transcribing audio...
                </p>
              )}
              {isRecording && (
                <div className="text-red-600 font-medium">
                  <p>Recording... {formatDuration(recordingDuration)}</p>
                  <p className="text-sm text-gray-500 mt-1">Click to stop</p>
                </div>
              )}
              {!isRecording && !isTranscribing && (
                <p className="text-gray-600">
                  Click to start recording
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transcription Result */}
        {transcribedText && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Transcription Result
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Copy size={16} className="mr-1" />
                  Copy
                </button>
                <button
                  onClick={clearTranscription}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <RotateCcw size={16} className="mr-1" />
                  Clear
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-md p-4 min-h-[100px]">
              <p className="text-gray-900 whitespace-pre-wrap">
                {transcribedText}
              </p>
            </div>
            
            <div className="mt-3 text-sm text-gray-500">
              Language: {selectedLanguage.label}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <Volume2 className="h-5 w-5 text-blue-400 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                How to use
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ol className="list-decimal list-inside space-y-1">
                  <li>Select your preferred language</li>
                  <li>Click the microphone button to start recording</li>
                  <li>Speak clearly into your microphone</li>
                  <li>Click the stop button when finished</li>
                  <li>Wait for the transcription to appear</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestASRPage;