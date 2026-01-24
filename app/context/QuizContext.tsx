"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface QuizContextType {
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  result: any;
  setResult: React.Dispatch<React.SetStateAction<any>>;
  testStep: number;
  setTestStep: React.Dispatch<React.SetStateAction<number>>;
  clearQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [testStep, setTestStep] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem('autowizard_answers');
    const savedResult = localStorage.getItem('autowizard_result');
    const savedStep = localStorage.getItem('autowizard_step');
    
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    if (savedResult) setResult(JSON.parse(savedResult));
    if (savedStep) setTestStep(parseInt(savedStep, 10));
    
    setIsHydrated(true);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('autowizard_answers', JSON.stringify(answers));
    }
  }, [answers, isHydrated]);

  useEffect(() => {
    if (isHydrated && result) {
      localStorage.setItem('autowizard_result', JSON.stringify(result));
    }
  }, [result, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('autowizard_step', testStep.toString());
    }
  }, [testStep, isHydrated]);

  const clearQuiz = () => {
    setAnswers({});
    setResult(null);
    setTestStep(0);
    localStorage.removeItem('autowizard_answers');
    localStorage.removeItem('autowizard_result');
    localStorage.removeItem('autowizard_step');
  };

  return (
    <QuizContext.Provider value={{ answers, setAnswers, result, setResult, testStep, setTestStep, clearQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
