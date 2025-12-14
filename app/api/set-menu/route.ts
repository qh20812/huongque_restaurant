import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    // Fetch active set menus with all related data
    const setMenus = await prisma.setMenu.findMany({
      where: {
        isActive: true,
      },
      include: {
        sections: {
          orderBy: {
            order: 'asc',
          },
          include: {
            items: {
              orderBy: {
                order: 'asc',
              },
              include: {
                dish: {
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: setMenus,
    });
  } catch (error) {
    console.error('Error fetching set menus:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Không thể tải dữ liệu set menu',
      },
      { status: 500 }
    );
  }
}
