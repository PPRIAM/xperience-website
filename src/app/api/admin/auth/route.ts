import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    const adminCode = process.env.ADMIN_ACCESS_CODE || 'xperience2026';

    if (code === adminCode) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_token', code, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      return response;
    }

    return NextResponse.json(
      { success: false, error: "Code d'accès incorrect !" },
      { status: 401 }
    );
  } catch (error) {
    console.error('Admin Auth Error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors de la connexion.' },
      { status: 500 }
    );
  }
}
