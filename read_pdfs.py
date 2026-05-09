import sys
try:
    from PyPDF2 import PdfReader
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
    from PyPDF2 import PdfReader

def read_pdf(file_path, out_file):
    out_file.write(f"--- Reading {file_path} ---\n")
    try:
        reader = PdfReader(file_path)
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            if text:
                out_file.write(f"Page {i+1}:\n{text}\n\n")
    except Exception as e:
        out_file.write(f"Error reading {file_path}: {e}\n")

with open("pdf_output.txt", "w", encoding="utf-8") as f:
    read_pdf("c:\\Users\\print\\OneDrive - MSFT\\Desktop\\3Syllables\\Mobility_Blueprint.pdf", f)
    read_pdf("c:\\Users\\print\\OneDrive - MSFT\\Desktop\\3Syllables\\Project.pdf", f)
