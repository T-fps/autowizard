import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

interface Subscriber {
  email: string;
  source: string;
  quizAnswers?: Record<string, any>;
  recommendations?: string[];
  subscribedAt: string;
}

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  // Simple auth check - in production use proper authentication
  const authHeader = request.headers.get('authorization');
  const adminKey = process.env.ADMIN_API_KEY || 'your-secret-key';
  
  if (authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const subscribers = await getSubscribers();
    
    // Create CSV content
    const headers = ['Email', 'Source', 'Subscribed At', 'Quiz Answers', 'Recommendations'];
    const rows = subscribers.map(sub => [
      sub.email,
      sub.source,
      sub.subscribedAt,
      sub.quizAnswers ? JSON.stringify(sub.quizAnswers) : '',
      sub.recommendations ? sub.recommendations.join('; ') : '',
    ]);
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="subscribers-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to export subscribers' }, { status: 500 });
  }
}
