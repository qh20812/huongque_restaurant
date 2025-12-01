import { NextRequest } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const q = (searchParams.get('q') || '').trim();
    const categorySlug = (searchParams.get('category') || '').trim();
    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get('pageSize') || 20)));

    const where: any = {};

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (categorySlug && categorySlug !== 'tat-ca-danh-muc') {
      where.category = { slug: categorySlug };
    }

    const [total, items] = await Promise.all([
      prisma.dish.count({ where }),
      prisma.dish.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return Response.json({
      items: items.map((d) => ({
        id: d.id,
        name: d.name,
        slug: d.slug,
        description: d.description,
        imageUrl: d.imageUrl,
        price: d.price,
        isActive: d.isActive,
        category: d.category ? { 
          id: d.category.id, 
          name: d.category.name, 
          slug: d.category.slug 
        } : null,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      })),
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch dishes', detail: err?.message }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, description, categoryId, imageUrl, price, isActive } = body;

    if (!name || !slug || !categoryId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, slug, categoryId' }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const dish = await prisma.dish.create({
      data: {
        name,
        slug,
        description,
        categoryId: Number(categoryId),
        imageUrl,
        price: price ? Number(price) : null,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
      include: {
        category: true,
      },
    });

    return Response.json({
      success: true,
      dish: {
        id: dish.id,
        name: dish.name,
        slug: dish.slug,
        description: dish.description,
        imageUrl: dish.imageUrl,
        price: dish.price,
        isActive: dish.isActive,
        category: dish.category ? {
          id: dish.category.id,
          name: dish.category.name,
          slug: dish.category.slug,
        } : null,
      },
    });
  } catch (err: any) {
    if (err.code === 'P2002') {
      return new Response(
        JSON.stringify({ error: 'Dish with this slug already exists' }), 
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    return new Response(
      JSON.stringify({ error: 'Failed to create dish', detail: err?.message }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
