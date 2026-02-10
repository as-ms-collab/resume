// Theme toggle with persistence
const root = document.documentElement;
const THEME_KEY = 'resume-theme';
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem(THEME_KEY);
root.setAttribute('data-theme', savedTheme || (prefersDark ? 'dark' : 'light'));

document.getElementById('themeBtn').addEventListener('click', () => {
  const next = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
});

// One-click PDF via html2pdf.js with fixed margins & filename
function generatePDF() {
  const element = document.getElementById('resumeRoot');
  const opt = {
    filename: 'Abhisek_Sau_Resume.pdf',
    margin: [0.5, 0.5, 0.5, 0.5], // inches: top, right, bottom, left
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  if (window.html2pdf) {
    window.html2pdf().set(opt).from(element).save();
  } else {
    // Fallback keeps styling via native print
    window.print();
  }
}

document.getElementById('pdfBtn').addEventListener('click', generatePDF);
document.getElementById('downloadCta')?.addEventListener('click', (e) => { e.preventDefault(); generatePDF(); });
