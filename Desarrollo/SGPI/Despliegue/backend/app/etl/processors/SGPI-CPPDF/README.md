# Guía de Uso: CLI Parser de PDFs Adaptativo (sgpi-parser)

Bienvenido a la guía de uso oficial de **sgpi-parser**, una herramienta CLI moderna escrita en **Python 3.13** para la extracción local, offline y altamente adaptativa de información estructurada a partir de documentos en formato PDF emitidos por el Sistema de Gestión de Proyectos de Investigación (SGPI) de la FISI-UNMSM.

---

## 1. Descripción General

`sgpi-parser` resuelve el desafío de estructurar datos de documentos académicos que sufren constantes variaciones de formato año tras año (tales como **Cronogramas**, **Resultados de Concursos** y **Resoluciones Rectorales con Anexos**).

### Características Clave:
* **100% Local y Offline:** No requiere conexiones a Internet, procesamiento en la nube ni llamadas a APIs comerciales de Inteligencia Artificial para la extracción productiva.
* **Extracción Híbrida de Tablas de Alta Fidelidad:** Combina la detección geométrica de celdas de `pdfplumber` con el motor avanzado de decodificación tipográfica de `PyMuPDF (fitz)` para neutralizar ruidos, capas de texto invisibles y caracteres intercalados.
* **Formatos de Salida Premium:**
  * **JSON Estructurado:** Con tipos de datos validados estrictamente mediante `Pydantic` (ideal para canalizaciones y API endpoints).
  * **Excel Premium:** Con diseño corporativo sofisticado en paleta Slate-Blue & Teal, formato numérico de moneda peruana (`S/.`), auto-ajuste inteligente del ancho de columnas y separación lógica multitesta para anexos complejos.
* **Intérprete Inteligente de Fechas:** Transforma rangos complejos en español (ej. `"del 20 al 27 de noviembre 2025"`) a fechas estandarizadas `YYYY-MM-DD`.

---

## 2. Requisitos del Sistema e Instalación

### Requisitos:
* **Python 3.13** o superior.
* Las siguientes dependencias de Python (se instalan mediante `pip`):
  * `fitz` (PyMuPDF) - Extracción de texto de alta precisión.
  * `pdfplumber` - Detección geométrica de estructuras de tablas.
  * `openpyxl` - Creación y formateo premium de libros Excel.
  * `typer` - Construcción del CLI interactivo.
  * `pydantic` - Validación de esquemas y modelos de datos.

### Instalación Paso a Paso:

1. **Clonar o ubicarse en el directorio del proyecto:**
   ```bash
   cd c:\Users\marec\Desktop\parser
   ```

2. **Crear y activar un entorno virtual (Recomendado):**
   ```bash
   # En Windows Powershell
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   
   # En CMD clásico
   python -m venv .venv
   .venv\Scripts\activate.bat
   ```

3. **Instalar dependencias necesarias:**
   ```bash
   pip install pymupdf pdfplumber openpyxl typer pydantic python-dotenv
   ```

4. **Configurar el entorno de desarrollo (Opcional - Solo para validación con IA):**
   Si desea realizar pruebas comparativas contra la API de Gemini, cree un archivo `.env` en la raíz del proyecto con su clave:
   ```env
   GEMINI_API_KEY=su_clave_api_aqui
   ```

---

## 3. Uso del CLI: Comando `parse`

El comando principal `parse` es el encargado de procesar un PDF y exportar los datos al formato deseado.

### Sintaxis General:
```bash
python sgpi_parser/main.py parse [RUTA_PDF] [OPCIONES]
```

### Opciones Disponibles:
* `-f, --format [json|excel]`: Formato de salida. Por defecto es `json`.
* `-o, --output RUTA`: Ruta del archivo de destino donde se guardarán los datos extraídos (ej. `outputs/mi_reporte.xlsx`).
* `-q, --quiet`: Ejecución silenciosa. Suprime los mensajes informativos en consola y únicamente imprime el JSON final a `stdout` (útil para canalizaciones de comandos con `|` o integración con otros lenguajes de programación).
* `-c, --category [resolucion|cronograma|resultados]`: Fuerza una categoría específica de extracción omitiendo la auto-detección semántica del parser.
* `-y, --year ENTERO`: Fuerza un año académico específico (ej. `2026`).

---

### Ejemplos Prácticos de Uso:

#### Ejemplo A: Extracción rápida de Resultados a JSON (Consola)
Parsea el PDF de resultados y muestra la estructura JSON validada directamente en el terminal:
```bash
python sgpi_parser/main.py parse pdfs/2026/resultados/resultados.pdf -f json
```

#### Ejemplo B: Guardar Resultados en un Archivo JSON
```bash
python sgpi_parser/main.py parse pdfs/2026/resultados/resultados.pdf -f json -o outputs/resultados_aprobados.json
```

#### Ejemplo C: Canalización a un Procesador de JSON (Modo Silencioso)
Mediante la opción `-q` o `--quiet`, el comando no emite textos de diagnóstico, permitiendo canalizaciones puras (por ejemplo, usando `jq` en bash o guardando en base de datos):
```bash
python sgpi_parser/main.py parse pdfs/2026/resultados/resultados.pdf -f json --quiet | jq ".metadata"
```

#### Ejemplo D: Generar Excel Premium para una Resolución Rectoral (Anexos de Integrantes)
Este comando generará un reporte de Excel de calidad corporativa con dos pestañas: una principal con los proyectos y presupuestos formateados en moneda `S/.`, y otra secundaria vinculada conteniendo a todos los miembros docentes, tesistas y colaboradores.
```bash
python sgpi_parser/main.py parse pdfs/2026/rr/RR_014353-2025-R.pdf -f excel -o outputs/reporte_resolucion_2026.xlsx
```

---

## 4. Estructura de Datos de Salida (Esquemas JSON)

El parser genera tres modelos estandarizados representados en los siguientes esquemas de salida:

### A. Categoría `cronograma`
```json
{
  "tipo_documento": "cronograma",
  "metadata": {
    "programa_nombre": "NOMBRE DEL PROGRAMA ACADÉMICO",
    "anio_academico": 2026
  },
  "actividades": [
    {
      "actividad": "Nombre de la Actividad",
      "dependencia_responsable": "Nombre de la Dependencia (si aplica)",
      "fecha_detalle": "Texto original de la fecha en el PDF",
      "fecha_inicio": "2025-11-19",
      "fecha_fin": "2025-11-27"
    }
  ]
}
```
> [!NOTE]
> Las fechas de inicio o fin se establecen automáticamente como `null` ante plazos abiertos (ej. `"Hasta el 9 de marzo"` establece `fecha_inicio = null` y `fecha_fin = "2026-03-09"`).

### B. Categoría `resultados`
```json
{
  "tipo_documento": "resultados",
  "metadata": {
    "programa_nombre": "NOMBRE DEL CONCURSO",
    "anio_academico": 2026
  },
  "proyectos_aprobados": [
    {
      "orden_merito": 1,
      "titulo": "TÍTULO COMPLETO DEL PROYECTO",
      "codigo_proyecto": "F2601XX (o null si no se especifica)",
      "nombre_gi": "NOMBRE DEL GRUPO DE INVESTIGACIÓN",
      "responsable": "APELLIDOS Y NOMBRES DEL DOCENTE",
      "facultad": "FACULTAD CORRESPONDIENTE",
      "puntaje": 94.5
    }
  ]
}
```

### C. Categoría `resolucion` (Resoluciones Rectorales)
```json
{
  "tipo_documento": "resolucion_rectoral",
  "metadata": {
    "numero_resolucion": "014353-2025-R",
    "anio_academico": 2026,
    "fecha_emision": "2025-11-14"
  },
  "proyectos": [
    {
      "codigo_proyecto": "B2602120",
      "titulo": "TÍTULO DE LA INVESTIGACIÓN",
      "facultad": "FISI (o correspondiente)",
      "nombre_gi": "GRUPO DE INVESTIGACIÓN",
      "presupuesto": 15000.0,
      "integrantes": [
        {
          "apellidos_nombres": "PÉREZ GÓMEZ, JUAN",
          "condicion": "MIEMBRO DOCENTE",
          "facultad": "FISI",
          "tipo_integrante": "Docente"
        }
      ]
    }
  ]
}
```

---

## 5. Uso del CLI: Comando `validate` (QA e Integridad)

El comando `validate` es una herramienta exclusiva para ingenieros y personal de control de calidad. Permite verificar la exactitud y robustez de los algoritmos heurísticos locales frente a una extracción generada mediante la API de Gemini (con Structured Outputs).

### Sintaxis:
```bash
python sgpi_parser/main.py validate [RUTA_PDF] --output-golden outputs/golden_cronograma.json
```

Este comando:
1. Envía el PDF a la API de Gemini (usando su API Key) para extraer la verdad de referencia (Golden Dataset).
2. Guarda opcionalmente dicho archivo de referencia en `--output-golden`.
3. Ejecuta el parser local heurístico en la misma máquina de manera offline.
4. Genera una auditoría en consola, comparando celda por celda campos de texto mediante similitud de Levenshtein y reportando la **Tasa de Exactitud Global** alcanzada.

---

## 6. Soporte y Solución de Problemas

### 1. Codificación en consolas de Windows (PowerShell/CMD)
Si al ejecutar en consolas antiguas de Windows visualiza caracteres corruptos en las salidas de consola informativas, fuerce el uso de codificación UTF-8 en su variable de entorno del terminal ejecutando:
* **En CMD:**
  ```cmd
  set PYTHONIOENCODING=utf-8
  ```
* **En PowerShell:**
  ```powershell
  $env:PYTHONIOENCODING="utf-8"
  ```

### 2. Tablas extensas o múltiples páginas
Los parsers locales están diseñados para iterar a través de todas las páginas del PDF. Si un documento posee múltiples páginas con la misma estructura de tabla, el parser continuará la extracción transparentemente acumulando los registros sin interrupción.
