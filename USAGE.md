# Excel Comparison Tool - Usage Guide

## Quick Start

### Option 1: Direct Open (No Server Required)
```bash
# Just double-click index.html or:
open index.html
```

✅ **Now works without a server!** The Web Worker issue has been fixed.

### Option 2: Local Server (Optional)
```bash
# Python
python3 -m http.server 8000

# Node.js
npx http-server

# Then open: http://localhost:8000
```

## How to Use

1. **Upload Files**: Drag & drop or click to select two Excel files
2. **Select Sheets**: Choose which sheet to compare from each file
3. **Compare**: Click "Compare Sheets" button
4. **View Results**: See side-by-side Excel-like grids with color-coded differences
5. **Load More**: Click to see additional rows (if > 1,000 rows)
6. **Export**: Download results as Excel file

## Color Coding

- **Yellow** = Modified cell (value changed)
- **Green** = Added cell (only in compared file)
- **Red** = Removed cell (only in original file)

## Performance

- **Small files** (< 100 rows): Instant
- **Medium files** (100-1,000 rows): 1-2 seconds
- **Large files** (1,000-10,000 rows): 3-5 seconds
- **Very large files** (10,000-20,000+ rows): 8-15 seconds

All with **responsive UI** throughout!

## Features

✅ 100% client-side (no server needed)
✅ Works offline  
✅ Position-based comparison (row + column index)  
✅ Excel-like grid view  
✅ Side-by-side & merged views  
✅ Tooltips with change details  
✅ Export to Excel  
✅ Optimized for large files (20K+ rows)  
✅ Progress tracking  

## Tips for Best Performance

1. **Large Files**: First 1,000 rows display instantly, use "Load More" for the rest
2. **Export**: Always includes full data regardless of display limit
3. **Progress**: Watch the progress indicator for large files
4. **Browser**: Chrome/Edge recommended for best performance

Enjoy fast, accurate Excel comparisons!
