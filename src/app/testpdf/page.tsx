"use client"

import { generatePdf } from "@/lib/actions"

export default function TestPdfPage() {
  const handleDownload = async () => {
    const base64 = await generatePdf()

    // Convert base64 → Uint8Array
    const binary = atob(base64)
    const len = binary.length
    const buffer = new Uint8Array(len)

    for (let i = 0; i < len; i++) {
      buffer[i] = binary.charCodeAt(i)
    }

    // Create Blob and download
    const blob = new Blob([buffer], { type: "application/pdf" })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "test-report.pdf"
    a.click()

    window.URL.revokeObjectURL(url)
  }

  return (
    <div style={{ padding: 40 }}>
      <button onClick={handleDownload}>Download Test PDF</button>
    </div>
  )
}