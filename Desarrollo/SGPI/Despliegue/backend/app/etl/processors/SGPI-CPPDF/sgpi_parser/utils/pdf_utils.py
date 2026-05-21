import fitz  # PyMuPDF
import pdfplumber
from typing import List, Dict, Any, Generator, Tuple

def get_fitz_doc(pdf_path: str) -> fitz.Document:
    """Abre un documento PDF usando PyMuPDF."""
    return fitz.open(pdf_path)

def get_plumber_doc(pdf_path: str) -> pdfplumber.PDF:
    """Abre un documento PDF usando pdfplumber."""
    return pdfplumber.open(pdf_path)

def extract_raw_text_fitz(pdf_path: str) -> str:
    """Extrae todo el texto plano de un PDF rápidamente usando PyMuPDF."""
    text = ""
    with get_fitz_doc(pdf_path) as doc:
        for page in doc:
            text += page.get_text() + "\n"
    return text

def iter_pages_text_fitz(pdf_path: str) -> Generator[Tuple[int, str], None, None]:
    """Itera sobre las páginas del PDF extrayendo el número de página (1-indexed) y su texto."""
    with get_fitz_doc(pdf_path) as doc:
        for page_num, page in enumerate(doc, 1):
            yield page_num, page.get_text()

def extract_tables_plumber(pdf_path: str, page_num: int) -> List[List[List[str]]]:
    """
    Extrae tablas de una página específica (1-indexed) usando pdfplumber.
    Retorna una lista de tablas, donde cada tabla es una lista de filas, y cada fila es una lista de strings.
    """
    tables = []
    with get_plumber_doc(pdf_path) as pdf:
        if 1 <= page_num <= len(pdf.pages):
            page = pdf.pages[page_num - 1]
            extracted = page.extract_tables()
            for t in extracted:
                # Filtrar celdas None y limpiar strings
                cleaned_table = []
                for row in t:
                    cleaned_row = [str(cell).strip() if cell is not None else "" for cell in row]
                    # Solo agregar si al menos una celda de la fila tiene contenido
                    if any(cleaned_row):
                        cleaned_table.append(cleaned_row)
                if cleaned_table:
                    tables.append(cleaned_table)
    return tables

def get_pdf_page_count(pdf_path: str) -> int:
    """Retorna la cantidad de páginas del PDF."""
    with get_fitz_doc(pdf_path) as doc:
        return len(doc)
