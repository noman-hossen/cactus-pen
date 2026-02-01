const API_URL = 'https://cactus-pen.onrender.com/api/generate'

export async function generateParagraph(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    throw new Error('Failed to generate content')
  }
  
  return await response.json()
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text)
}

export function downloadPDF(text, filename = 'cactuspen-output') {
  // PDF generation logic here (simplified)
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}