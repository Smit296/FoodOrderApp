// GET /api/menu - Fetch all menu items
import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';

export async function GET() {
  try {
    const items = DataStore.getMenuItems();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}
