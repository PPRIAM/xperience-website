import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('admin_token')?.value;
    const adminCode = process.env.ADMIN_ACCESS_CODE || 'xperience2026';

    if (!adminToken || adminToken !== adminCode) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const reservations = await prisma.reservation.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ success: true, data: reservations });
  } catch (error) {
    console.error('Fetch Reservations Error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des réservations.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('admin_token')?.value;
    const adminCode = process.env.ADMIN_ACCESS_CODE || 'xperience2026';

    if (!adminToken || adminToken !== adminCode) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Identifiant de réservation manquant.' },
        { status: 400 }
      );
    }

    await prisma.reservation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Réservation supprimée avec succès.' });
  } catch (error) {
    console.error('Delete Reservation Error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression de la réservation.' },
      { status: 500 }
    );
  }
}
