import { NextResponse } from 'next/server';
import { User } from '../../../models/User';

// This simulates a database
const users: User[] = [
  { id: 1, username: 'fisher123', email: 'fisher@example.com', isBanned: false, reports: 2 },
  { id: 2, username: 'angler456', email: 'angler@example.com', isBanned: true, reports: 5 },
  { id: 3, username: 'catchmaster', email: 'master@example.com', isBanned: false, reports: 0 },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function PUT(request: Request) {
  const data = await request.json();
  const user = users.find(u => u.id === data.id);
  
  if (user) {
    user.isBanned = data.isBanned;
    return NextResponse.json(user);
  }
  
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}