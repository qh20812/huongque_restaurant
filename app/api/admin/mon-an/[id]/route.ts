import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    
    if (isNaN(id)) {
      return new Response(
        JSON.stringify({ error: 'Invalid dish ID' }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const dish = await prisma.dish.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!dish) {
      return new Response(
        JSON.stringify({ error: 'Dish not found' }), 
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return Response.json({
      success: true,
      data: {
        id: dish.id,
        name: dish.name,
        slug: dish.slug,
        description: dish.description,
        imageUrl: dish.imageUrl,
        categoryId: dish.categoryId,
        isActive: dish.isActive,
        category: dish.category ? {
          id: dish.category.id,
          name: dish.category.name,
          slug: dish.category.slug,
        } : null,
        createdAt: dish.createdAt,
        updatedAt: dish.updatedAt,
      }
    });
  } catch (err: unknown) {
    const error = err as Error;
    return new Response(
      JSON.stringify({ error: 'Failed to fetch dish', detail: error?.message }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    
    if (isNaN(id)) {
      return new Response(
        JSON.stringify({ error: 'Invalid dish ID' }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const body = await req.json();
    const { name, slug, description, categoryId, imageUrl, isActive } = body;

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (categoryId !== undefined) updateData.categoryId = Number(categoryId);
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    const dish = await prisma.dish.update({
      where: { id },
      data: updateData,
      include: { category: true },
    });

    return Response.json({
      success: true,
      dish: {
        id: dish.id,
        name: dish.name,
        slug: dish.slug,
        description: dish.description,
        imageUrl: dish.imageUrl,
        isActive: dish.isActive,
        category: dish.category ? {
          id: dish.category.id,
          name: dish.category.name,
          slug: dish.category.slug,
        } : null,
      },
    });
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    if (error.code === 'P2002') {
      return new Response(
        JSON.stringify({ error: 'Dish with this slug already exists' }), 
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    if (error.code === 'P2025') {
      return new Response(
        JSON.stringify({ error: 'Dish not found' }), 
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    return new Response(
      JSON.stringify({ error: 'Failed to update dish', detail: error?.message }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    
    if (isNaN(id)) {
      return new Response(
        JSON.stringify({ error: 'Invalid dish ID' }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    await prisma.dish.delete({
      where: { id },
    });

    return Response.json({ success: true, message: 'Dish deleted successfully' });
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    if (error.code === 'P2025') {
      return new Response(
        JSON.stringify({ error: 'Dish not found' }), 
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    return new Response(
      JSON.stringify({ error: 'Failed to delete dish', detail: error?.message }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
