import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      select: { id: true, name: true, slug: true, order: true },
    });
    return Response.json({ items: categories });
  } catch (err: unknown) {
    const error = err as Error;
    return new Response(
      JSON.stringify({ error: 'Failed to fetch categories', detail: error?.message }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
