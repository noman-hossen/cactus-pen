import { jsPDF } from 'jspdf'

// Example: import serif font as base64
// You can generate this via tools like:
// https://rawgit.com/MrRio/jsPDF/master/fontconverter/fontconverter.html
import TimesNewRoman from './fonts/TimesNewRoman.base64.js'

export function generatePDF(content, metadata) {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  })

  // ---------- Fonts ----------
  doc.addFileToVFS('Times.ttf', TimesNewRoman)
  doc.addFont('Times.ttf', 'Times', 'normal')
  doc.setFont('Times', 'normal')

  // ---------- Layout constants ----------
  const PAGE_WIDTH = 210
  const MARGIN_X = 25
  const START_Y = 30
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2

  // ---------- Header (very minimal) ----------
  doc.setFontSize(10)
  doc.setTextColor(120)
  doc.text('Cactus-Pen', MARGIN_X, 15)

  // ---------- Title (Topic) ----------
  doc.setFontSize(20)
  doc.setTextColor(0)
  doc.text(
    metadata.topic || 'Untitled Topic',
    PAGE_WIDTH / 2,
    START_Y,
    { align: 'center' }
  )

  // ---------- Body paragraph ----------
  doc.setFontSize(12)
  doc.setTextColor(20)

  const paragraphY = START_Y + 15
  const lineHeight = 7.2 // textbook-like spacing

  const lines = doc.splitTextToSize(content.trim(), CONTENT_WIDTH)

  doc.text(lines, MARGIN_X, paragraphY, {
    maxWidth: CONTENT_WIDTH,
    lineHeightFactor: lineHeight / 12,
    align: 'justify',
  })

  // ---------- Bottom metadata card ----------
  const cardY = 265
  doc.setFillColor(245, 247, 246)
  doc.roundedRect(MARGIN_X, cardY, CONTENT_WIDTH, 18, 3, 3, 'F')

  doc.setFontSize(9)
  doc.setTextColor(90)

  doc.text(
    `Generated on ${new Date(
      metadata.timestamp || Date.now()
    ).toLocaleDateString()}`,
    MARGIN_X + 4,
    cardY + 7
  )

  doc.text(
    `Tone: ${metadata.tone || 'Academic'} • Difficulty: ${
      metadata.difficulty || 'Medium'
    }`,
    MARGIN_X + 4,
    cardY + 13
  )

  return doc
}

export function downloadPDF(
  content,
  metadata,
  filename = 'cactus-pen'
) {
  const doc = generatePDF(content, metadata)
  doc.save(`${filename}-${Date.now()}.pdf`)
}
