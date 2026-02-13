const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';


export function getImageUrl(imagePath: string | null | undefined, folder: string): string {
    // If no image, return fallback
    if (!imagePath) {
        return '/noAvatar.png'
    }

    // If already a URL (starts with http/https), return as-is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
    }

    // If it's a public asset (starts with /), return as-is
    if (imagePath.startsWith('/')) {
        return imagePath
    }

    // Extract just the filename if it's a full Windows path
    // Example: "D:/zenith/backend/uploads/teachers/teacher_yo_20251210.jpg"
    // becomes: "teacher_yo_20251210.jpg"
    let filename = imagePath

    // Handle Windows paths
    if (imagePath.includes('\\') || imagePath.includes(':/')) {
        const parts = imagePath.split(/[/\\]/)
        filename = parts[parts.length - 1]
    }

    // Handle "uploads/teachers/filename.jpg" format
    if (imagePath.startsWith('uploads/')) {
        return `${BACKEND_URL}/${imagePath}`
    }

    // If it's just a filename, assume it's in the teachers folder
    // Adjust the path based on your backend structure
    return `${BACKEND_URL}/uploads/${folder}/${filename}`
}

/**
 * Gets teacher profile image URL
 */
export function getTeacherImageUrl(imagePath: string | null | undefined): string {
    if (!imagePath) return '/noAvatar.png'

    // If it's just a filename
    if (!imagePath.includes('/') && !imagePath.includes('\\')) {
        return `${BACKEND_URL}/uploads/images/teachers/${imagePath}`
    }

    return getImageUrl(imagePath, "teachers")
}

/**
 * Gets student profile image URL
 */
export function getStudentImageUrl(imagePath: string | null | undefined): string {
    if (!imagePath) return '/noAvatar.png'

    if (!imagePath.includes('/') && !imagePath.includes('\\')) {
        return `${BACKEND_URL}/uploads/images/students/${imagePath}`
    }

    return getImageUrl(imagePath, "students")
}

/**
 * Gets parent profile image URL
 */
export function getParentImageUrl(imagePath: string | null | undefined): string {
    if (!imagePath) return '/noAvatar.png'

    if (!imagePath.includes('/') && !imagePath.includes('\\')) {
        return `${BACKEND_URL}/uploads/images/parents/${imagePath}`
    }

    return getImageUrl(imagePath, "parents")
}

/**
 * Gets assignment PDF URL
 */
export function getAssignmentPdfUrl(pdfName: string | null | undefined): string {
    if (!pdfName) return ''

    // If already a URL (starts with http/https), return as-is
    if (pdfName.startsWith('http://') || pdfName.startsWith('https://')) {
        return pdfName
    }

    // If it's just a filename
    if (!pdfName.includes('/') && !pdfName.includes('\\')) {
        return `${BACKEND_URL}/uploads/pdfs/assignments/${pdfName}`
    }

    // Handle "uploads/pdfs/assignments/filename.pdf" format
    if (pdfName.startsWith('uploads/')) {
        return `${BACKEND_URL}/${pdfName}`
    }

    // Extract just the filename if it's a full Windows path
    let filename = pdfName
    if (pdfName.includes('\\') || pdfName.includes(':/')) {
        const parts = pdfName.split(/[/\\]/)
        filename = parts[parts.length - 1]
    }

    return `${BACKEND_URL}/uploads/pdfs/assignments/${filename}`
}

/**
 * Gets announcement PDF URL
 */
export function getAnnouncementPdfUrl(pdfName: string | null | undefined): string {
    if (!pdfName) return ''

    // If already a URL (starts with http/https), return as-is
    if (pdfName.startsWith('http://') || pdfName.startsWith('https://')) {
        return pdfName
    }

    // If it's just a filename
    if (!pdfName.includes('/') && !pdfName.includes('\\')) {
        return `${BACKEND_URL}/uploads/pdfs/announcements/${pdfName}`
    }

    // Handle "uploads/pdfs/announcements/filename.pdf" format
    if (pdfName.startsWith('uploads/')) {
        return `${BACKEND_URL}/${pdfName}`
    }

    // Extract just the filename if it's a full Windows path
    let filename = pdfName
    if (pdfName.includes('\\') || pdfName.includes(':/')) {
        const parts = pdfName.split(/[/\\]/)
        filename = parts[parts.length - 1]
    }

    return `${BACKEND_URL}/uploads/pdfs/announcements/${filename}`
}