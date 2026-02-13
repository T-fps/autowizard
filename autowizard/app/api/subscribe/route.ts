import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

interface Subscriber {
  email: string;
  source: 'quiz' | 'newsletter' | 'footer' | 'popup';
  quizAnswers?: Record<string, any>;
  recommendations?: string[];
  subscribedAt: string;
  ipCountry?: string;
}

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subscribers: Subscriber[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source, quizAnswers, recommendations } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    const subscribers = await getSubscribers();
    
    // Check if email already exists
    const existingIndex = subscribers.findIndex(s => s.email.toLowerCase() === email.toLowerCase());
    
    const newSubscriber: Subscriber = {
      email: email.toLowerCase(),
      source: source || 'newsletter',
      quizAnswers,
      recommendations,
      subscribedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      // Update existing subscriber with new data
      subscribers[existingIndex] = {
        ...subscribers[existingIndex],
        ...newSubscriber,
        subscribedAt: subscribers[existingIndex].subscribedAt, // Keep original date
      };
    } else {
      subscribers.push(newSubscriber);
    }

    await saveSubscribers(subscribers);

    return NextResponse.json({ 
      success: true, 
      message: 'Subscribed successfully',
      isNew: existingIndex < 0
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Simple auth check - in production use proper authentication
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const subscribers = await getSubscribers();
    return NextResponse.json({ 
      subscribers,
      total: subscribers.length,
      bySource: {
        quiz: subscribers.filter(s => s.source === 'quiz').length,
        newsletter: subscribers.filter(s => s.source === 'newsletter').length,
        footer: subscribers.filter(s => s.source === 'footer').length,
        popup: subscribers.filter(s => s.source === 'popup').length,
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
