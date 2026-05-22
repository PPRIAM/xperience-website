import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Veuillez entrer un nom valide (2 caractères minimum).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Veuillez entrer une adresse email valide.' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
      },
    });

    return NextResponse.json(
      { success: true, data: reservation },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Reservation API Error:', error);
    
    // Check for Prisma unique constraint violation (P2002)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Tu es déjà inscrit(e) !' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors de la réservation.' },
      { status: 500 }
    );
  }
}
