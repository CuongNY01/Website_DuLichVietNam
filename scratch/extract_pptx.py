import zipfile
import re
import os

pptx_path = "d:/Demo_1_DATN_5525/Xây dựng Website đặt Tour du lịch Việt Nam.pptx.pptx"
output_path = "d:/Demo_1_DATN_5525/scratch/extracted_slides.txt"

if not os.path.exists(pptx_path):
    print(f"Error: {pptx_path} not found")
    exit(1)

with zipfile.ZipFile(pptx_path, 'r') as zip_ref:
    file_list = zip_ref.namelist()
    slide_files = [f for f in file_list if re.match(r'ppt/slides/slide\d+\.xml$', f)]
    # Sort them by slide number
    slide_files.sort(key=lambda f: int(re.search(r'\d+', f).group()))
    
    print(f"Found {len(slide_files)} slides in PPTX.")
    
    # Check for notes slides
    notes_files = [f for f in file_list if re.match(r'ppt/notesSlides/notesSlide\d+\.xml$', f)]
    notes_dict = {}
    for nf in notes_files:
        num = re.search(r'\d+', nf).group()
        notes_dict[num] = nf

    with open(output_path, 'w', encoding='utf-8') as out:
        for slide_file in slide_files:
            slide_num = re.search(r'\d+', slide_file).group()
            out.write(f"=========================================\n")
            out.write(f"=== SLIDE {slide_num} ===\n")
            out.write(f"=========================================\n")
            
            content = zip_ref.read(slide_file).decode('utf-8', errors='ignore')
            # Extract text within <a:t>...</a:t> tags
            texts = re.findall(r'<a:t[^>]*>(.*?)</a:t>', content)
            
            if texts:
                clean_texts = []
                for t in texts:
                    t = t.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
                    clean_texts.append(t)
                out.write("\n".join(clean_texts) + "\n\n")
            else:
                out.write("[No text found on this slide]\n\n")
                
            # If there are notes for this slide, extract them
            if slide_num in notes_dict:
                out.write(f"--- Speaker Notes (Slide {slide_num}) ---\n")
                notes_content = zip_ref.read(notes_dict[slide_num]).decode('utf-8', errors='ignore')
                notes_texts = re.findall(r'<a:t[^>]*>(.*?)</a:t>', notes_content)
                if notes_texts:
                    clean_notes = []
                    for nt in notes_texts:
                        nt = nt.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
                        clean_notes.append(nt)
                    out.write("\n".join(clean_notes) + "\n\n")
                else:
                    out.write("[No notes text]\n\n")

print(f"Extraction complete. Saved to {output_path}")
