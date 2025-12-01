import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const setMenuId = Number(id);
    if (isNaN(setMenuId)) {
      return new Response(JSON.stringify({ error: 'Invalid set menu ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const setMenu = await prisma.setMenu.findUnique({
      where: { id: setMenuId },
      include: {
        sections: {
          orderBy: { order: 'asc' },
          include: {
            items: {
              orderBy: { order: 'asc' },
              include: { dish: true },
            },
          },
        },
      },
    });

    if (!setMenu) {
      return new Response(JSON.stringify({ error: 'Set menu not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return Response.json({ success: true, data: setMenu });
  } catch (err) {
    const error = err as Error;
    return new Response(
      JSON.stringify({ error: 'Failed to fetch set menu', detail: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const setMenuId = Number(id);
    if (isNaN(setMenuId)) {
      return new Response(JSON.stringify({ error: 'Invalid set menu ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { name, slug, description, price, servesMin, servesMax, isActive } = body;

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = String(name).trim();
    if (slug !== undefined) updateData.slug = String(slug).trim();
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price != null ? Number(price) : null;
    if (servesMin !== undefined) updateData.servesMin = servesMin != null ? Number(servesMin) : null;
    if (servesMax !== undefined) updateData.servesMax = servesMax != null ? Number(servesMax) : null;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    const updated = await prisma.setMenu.update({
      where: { id: setMenuId },
      data: updateData,
    });

    return Response.json({ success: true, data: updated });
  } catch (err) {
    const error = err as { code?: string; message?: string };
    if (error.code === 'P2002') {
      return new Response(
        JSON.stringify({ error: 'Set menu with this slug already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (error.code === 'P2025') {
      return new Response(
        JSON.stringify({ error: 'Set menu not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ error: 'Failed to update set menu', detail: error?.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const setMenuId = Number(id);
    if (isNaN(setMenuId)) {
      return new Response(JSON.stringify({ error: 'Invalid set menu ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.setMenu.delete({ where: { id: setMenuId } });

    return Response.json({ success: true, message: 'Set menu deleted successfully' });
  } catch (err) {
    const error = err as { code?: string; message?: string };
    if (error.code === 'P2025') {
      return new Response(
        JSON.stringify({ error: 'Set menu not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ error: 'Failed to delete set menu', detail: error?.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
