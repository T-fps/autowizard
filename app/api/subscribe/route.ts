import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Subscriber {
  email: string;
  source: string;
  subscribedAt: string;
  vehicle?: string;
  estimate?: number;
  quizAnswers?: any;
  recommendations?: any;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    // Create data directory and file if they don't exist
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, '[]');
  }
}

async function getSubscribers(): Promise<Subscriber[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

async function saveSubscribers(subscribers: Subscriber[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source, vehicle, estimate, quizAnswers, recommendations } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    const subscribers = await getSubscribers();
    
    // Check if email already exists
    const existingIndex = subscribers.findIndex(s => s.email.toLowerCase() === email.toLowerCase());
    
    const subscriber: Subscriber = {
      email: email.toLowerCase(),
      source: source || 'unknown',
      subscribedAt: new Date().toISOString(),
      ...(vehicle && { vehicle }),
      ...(estimate && { estimate }),
      ...(quizAnswers && { quizAnswers }),
      ...(recommendations && { recommendations }),
    };

    if (existingIndex >= 0) {
      // Update existing subscriber with new data
      subscribers[existingIndex] = {
        ...subscribers[existingIndex],
        ...subscriber,
        subscribedAt: subscribers[existingIndex].subscribedAt, // Keep original date
      };
    } else {
      subscribers.push(subscriber);
    }

    await saveSubscribers(subscribers);

    return NextResponse.json({ 
      success: true, 
      message: existingIndex >= 0 ? 'Subscription updated' : 'Successfully subscribed'
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await getSubscribers();
    return NextResponse.json({ 
      count: subscribers.length,
      // Don't expose emails in GET - just count
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
