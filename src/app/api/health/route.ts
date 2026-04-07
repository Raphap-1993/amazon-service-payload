import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({
    ok: true,
    service: 'amazon-service-payload',
    phase: 'bootstrap-tecnico',
  })
}

