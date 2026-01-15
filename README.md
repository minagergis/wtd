# 😎 WTD (What The Diff)

**You changed WHAT 😂?!**

A powerful, user-friendly tool for comparing Excel/CSV reports between systems. Perfect for QA validation during system migrations.

---

## 🎯 What is WTD?

WTD (What The Diff) is a client-side Excel comparison tool designed specifically for comparing trip reports and summary data between old and new systems. It highlights exactly what changed, what was added, and what was removed.

### Key Features

✅ **Smart Matching** - Compare by Unit Name alone (summary reports) or Unit + Date (trip reports)  
✅ **Large File Optimized** - Handles 20,000+ rows without freezing  
✅ **Visual Diff Display** - See old → new values with color-coded rows  
✅ **Diffs-Only Filter** - Focus only on changes  
✅ **100% Client-Side** - No server needed, works offline  
✅ **Excel Export** - Download comparison results

---

## 🚀 Quick Start

### Option 1: Direct Open (Recommended)
Simply **double-click `index.html`** - that's it! No installation, no server required.

### Option 2: Local Server (Optional)
```bash
# Python
python3 -m http.server 8000

# Node.js
npx http-server

# Then open: http://localhost:8000
```

---

## 📖 How to Use

### Step 1: Upload Your Files
- Drag & drop or click to select two Excel/CSV files
- **File 1**: Original system report (old)
- **File 2**: New system report (compared)

### Step 2: Configure Comparison

**Key Column** (Required): Column with unit/vehicle names (e.g., `A`)

**Date Column** (Optional):
- **Leave EMPTY** for summary reports (one row per unit)
- **Fill with column letter** (e.g., `B`) for trip reports (multiple trips per unit)

### Step 3: Select Sheets
Choose which sheet from each file to compare

### Step 4: Compare!
Click **"🔍 Compare Sheets"** and watch the magic happen ⌛

### Step 5: Review Results
- 🟢 **Green rows** = Added in new system
- 🔴 **Red rows** = Removed (only in old system)
- 🟡 **Yellow rows** = Changed data
- ⚪ **White rows** = Unchanged

### Step 6: Filter & Export
- Use **"🔍 Diffs Only"** to hide unchanged rows
- Click **"📥 Export to Excel"** to save results

---

## 💡 Use Cases

### Use Case 1: Summary Reports
**Scenario**: Each unit has ONE row with summary statistics

**Configuration**:
- Key Column: `A` (Unit Name)
- Date Column: *(leave empty)*

**Example**:
```
Unit    | Total Distance | Total Trips | Driver
Car-001 | 1500 km       | 25          | John
Car-002 | 2300 km       | 40          | Jane
```

### Use Case 2: Trip Reports
**Scenario**: Each unit has MULTIPLE trip rows

**Configuration**:
- Key Column: `A` (Unit Name)
- Date Column: `B` (Trip Date)

**Example**:
```
Unit    | Date       | Distance | Duration | Driver
Car-001 | 2024-01-01| 50 km   | 2h       | John
Car-001 | 2024-01-02| 75 km   | 3h       | John
Car-002 | 2024-01-01| 100 km  | 4h       | Jane
```

---

## 🎨 Understanding the Display

### Cell Format
Each cell shows the comparison in this format:

- **Unchanged**: `100` (plain text)
- **Changed**: `~~50~~ → 75` (strikethrough old, arrow, bold new)
- **Added**: `~~--~~ → 100` (from nothing to value)
- **Removed**: `~~100~~ → --` (from value to nothing)

### Row Colors
- 🟢 **Green** (#e8f5e9) = Entire row added
- 🔴 **Red** (#ffebee) = Entire row removed
- 🟡 **Yellow** (#fffde7) = Row exists in both but data changed
- ⚪ **White** = No changes

### Row Indicators
- **✓** Green = New trip/record
- **✗** Red = Removed trip/record
- **⚠** Yellow = Modified trip/record

---

## ⚡ Performance

| Rows  | Processing Time | UI State |
|-------|----------------|----------|
| <100  | < 1 second     | Instant |
| 1,000 | 1-2 seconds    | Responsive |
| 10,000| 3-5 seconds    | Live progress |
| 20,000+| 8-15 seconds  | Live progress |

**First 1,000 rows display instantly** - use "Load More" for additional rows

---

## 🔧 Technical Details

### Technologies
- **SheetJS (xlsx.js)** - Excel parsing
- **Web Workers** - Non-blocking comparison
- **Vanilla JavaScript** - No framework dependencies
- **100% Client-Side** - Privacy-friendly

### Optimizations
- Chunked rendering (50 rows/frame using `requestAnimationFrame`)
- Row limiting with progressive loading
- Lazy tooltip creation
- Background thread processing for large files

---

## 📊 Example Workflow

**System Migration QA Process:**

1. Export trip report from **Old System** → `old_trips.xlsx`
2. Export trip report from **New System** → `new_trips.xlsx`
3. Open WTD and upload both files
4. Configure: Key=`A` (Unit), Date=`B` (Date)
5. Click Compare
6. Review green/red/yellow rows for discrepancies
7. Use "Diffs Only" to focus on changes
8. Export results for team review

---

## 🐛 Troubleshooting

### Issue: Syntax Error on Page Load
**Solution**: Clear browser cache and refresh

### Issue: Wrong Rows Matched
**Solution**: Double-check Key Column and Date Column settings

### Issue: Missing Trips
**Solution**: Ensure Date Column is filled for trip-level reports

### Issue: Slow Performance
**Solution**: 
- Use "Diffs Only" filter
- Compare smaller date ranges if possible
- First 1,000 rows load instantly

---

## 📝 Tips & Best Practices

1. **Sort Both Files**: Ensure consistent row order before comparison
2. **Check Row Counts**: Green/red rows indicate total row differences
3. **Focus on Yellow**: Changed rows need most QA attention
4. **Export Early**: Save results before making new comparisons
5. **Use Tooltips**: Hover over cells for detailed change info

---

## 🎓 FAQ

**Q: Can I compare more than 2 files?**  
A: No, WTD compares exactly 2 files at a time.

**Q: Does it work offline?**  
A: Yes! 100% client-side, no internet needed.

**Q: Is my data uploaded anywhere?**  
A: No. Everything happens in your browser.

**Q: What file formats are supported?**  
A: `.xlsx`, `.xls`, `.csv`

**Q: Can I compare files with different columns?**  
A: Yes! It normalizes to the maximum column count.

**Q: How accurate is the comparison?**  
A: Cell-by-cell exact match. Very accurate.

---

## 📜 License & Credits

**Developed by**: The Monz 😎👌🔥  
**Copyright**: © 2026 WTD - All rights reserved

---

## 🆘 Support

For issues, questions, or feature requests, contact your QA team lead.

**Happy Diffing! 🎉**
