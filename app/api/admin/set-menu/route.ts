import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Prisma } from '@prisma/client';

// GET /api/admin/set-menu?q=&status=&page=&pageSize=
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').trim();
    const status = (searchParams.get('status') || 'all').toLowerCase();
    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const pageSize = Math.min(50, Math.max(1, Number(searchParams.get('pageSize') || 20)));

    const where: Prisma.SetMenuWhereInput = {};
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { description: { contains: q } },
      ];
    }
    if (status === 'active') where.isActive = true;
    if (status === 'inactive') where.isActive = false;

    const [items, total] = await Promise.all([
      prisma.setMenu.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.setMenu.count({ where }),
    ]);

    return Response.json({ success: true, data: { items, total, page, pageSize } });
  } catch (err) {
    const error = err as Error;
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch set menus', detail: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// POST /api/admin/set-menu
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, description, price, servesMin, servesMax, isActive, sections } = body as {
      name: string;
      slug: string;
      description?: string | null;
      price: number;
      servesMin?: number | null;
      servesMax?: number | null;
      isActive?: boolean;
      sections?: Array<{
        name: string;
        order?: number;
        items?: Array<{ dishId: number; notes?: string | null; quantity?: number | null; order?: number }>;
      }>;
    };

    if (!name || !slug || typeof price !== 'number') {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields: name, slug, price' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const createData: Prisma.SetMenuCreateInput = {
      name: String(name).trim(),
      slug: String(slug).trim(),
      description: description ?? null,
      price: Number(price),
      servesMin: servesMin != null ? Number(servesMin) : null,
      servesMax: servesMax != null ? Number(servesMax) : null,
      isActive: isActive != null ? Boolean(isActive) : true,
    };

    if (Array.isArray(sections) && sections.length) {
      (createData as Prisma.SetMenuCreateInput).sections = {
        create: sections.map((s, idx) => ({
          name: s.name?.trim() || `Phần ${idx + 1}`,
          order: s.order != null ? Number(s.order) : idx + 1,
          ...(Array.isArray(s.items) && s.items.length
            ? {
                items: {
                  create: s.items
                    .filter((it) => typeof it.dishId === 'number' && !isNaN(it.dishId))
                    .map((it, jdx) => ({
                      dishId: Number(it.dishId),
                      notes: it.notes ?? null,
                      quantity: it.quantity != null ? Number(it.quantity) : null,
                      order: it.order != null ? Number(it.order) : jdx + 1,
                    })),
                },
              }
            : {}),
        })),
      };
    }

    const created = await prisma.setMenu.create({ data: createData });

    return Response.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    const error = err as { code?: string; message?: string };
    if (error.code === 'P2002') {
      return new Response(
        JSON.stringify({ success: false, error: 'Set menu with this slug already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to create set menu', detail: error?.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
