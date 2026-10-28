import fitz, os, re, io, hashlib, json
from PIL import Image, ImageDraw, ImageFont
ROOT=os.environ.get('J277_PDF_ROOT','/mnt/data')
FILES=[('J277_Paper_1_DIGITAL_STUDENT_REVIEW_V3_UNPUBLISHED.pdf','J277_Paper_1_Colour_V4_REVIEW.pdf'),('J277_Paper1_Print_V3.pdf','J277_Paper_1_Print_V4_REVIEW.pdf')]
# Replacement copies remove editor/source commentary rather than dilute original visual analogies.
REPLACE={
2:[('Select a topic to jump directly to its theory and original visual explanations.','Select a topic to find diagrams, clear explanations and practice questions.')],
3:[('The original extended-paper practice is retained after the revised topics.','Synoptic practice follows the topic-by-topic revision sections.'),('Original Synoptic Practice A: questions','Synoptic Practice A: questions'),('Original Synoptic Practice A: answers and misconceptions','Synoptic Practice A: answers and misconceptions'),('Original Synoptic Practice B: questions (source labels it Exam Paper 2)','Synoptic Practice B: questions'),('Original Synoptic Practice B: answers and misconceptions','Synoptic Practice B: answers and misconceptions'),('This is an unpublished review candidate.','Use these final practice sets to test knowledge across several topics. Check the answers after completing each set.')],
26:[('Attempt the original questions without seeing the answers.','Attempt these questions before checking the answers.')],
27:[('Attempt the original questions without seeing the answers.','Attempt these questions before checking the answers.')],
28:[('Attempt the original questions without seeing the answers.','Attempt these questions before checking the answers.')],
29:[('Attempt the original questions without seeing the answers.','Attempt these questions before checking the answers.')],
33:[('Fridge-freezer: monitor temperature and control cooling. The "wash cycles" label is incorrect.','A fridge-freezer controller monitors the temperature and switches cooling on when needed.')],
39:[('Attempt the original questions without seeing their answers.','Attempt all questions before looking at the answers.')],
52:[('Follow the original second-room analogy, then write the computer-science explanation.','Use the second-room analogy, then write the computer-science explanation.')],
59:[('Same artwork as the published J277 guide.','Use the diagrams to compare optical, magnetic and solid-state storage.'),('Exam accuracy: the artwork has inconsistent reliability/portability labels.','Devices vary in reliability and portability. For exam answers, compare capacity, speed, cost, durability, reliability and portability.')],
65:[('Marks are shown for each original question.','Marks are shown for each question.')],
66:[('Marks are shown for each original question.','Marks are shown for each question.')],
67:[('Marks are shown for each original question.','Marks are shown for each question.')],
71:[('Artwork correction: the original LEGO picture repeats','Use the LEGO blocks to picture the increasing size of each unit. The next page shows the exact conversions.')],
75:[('Artwork note: a source graphic uses the words','Use the correct exam terms: sample rate is samples per second and bit depth is bits per sample.')],
81:[('Each original question retains its mark allocation.','Each question shows its mark allocation.')],
82:[('Each original question retains its mark allocation.','Each question shows its mark allocation.')],
83:[('Each original question retains its mark allocation.','Each question shows its mark allocation.')],
88:[('The original visual methods are preserved.','Use the diagrams to practise data-storage conversions.'),('Original 8-bit number-line teaching diagram','The eight-bit place-value number line')],
90:[('47 = 00101111.  The original number-line picture','47 = 00101111. Each 1 means that place value is included in the total.')],
91:[('The original 8–4–2–1 nibble method and colour-code analogy.','Use the 8–4–2–1 nibble method to link binary, hexadecimal and colour codes.'),('Original visual from the guide:','Split the eight bits into two nibbles:'),('Keep the original Photoshop analogy','Remember the colour-code analogy')],
92:[('Source correction','Check your hexadecimal conversion'),('Some captions in the original hex examples','Convert each nibble carefully, then check your answer using denary place values.')],
93:[('An OCR-required method missing from the original 1.2.4 worked sequence.','Use column addition, carry bits and the eight-bit limit to check each result.')],
94:[('Preserving the source left/right shift illustration.','Shifting binary digits changes their place values.'),('Original binary-shift illustration from the published guide','A left shift moves digits towards higher place values.')],
95:[('Using the original annotated character-code diagram.','Use the annotated diagram to understand character encoding.')],
97:[('Preserving the original black-and-white pixel-grid pictures.','Use the pixel grids to understand resolution and colour depth.'),('Original bitmap colour-depth diagrams from the published guide','These grids show pixels represented using different bit depths.')],
98:[('The original student-friendly metadata illustration is retained.','Use the examples to identify metadata stored with files.'),('Original metadata diagram from the published guide','Metadata can describe image, audio and video file properties.')],
99:[('Original analogue and digital sound diagrams retained.','Compare the analogue and sampled sound waveforms.'),('Original waveform and sampling illustrations from the published guide','These waveform diagrams help distinguish samples and bit depth.')],
103:[('The following 15 questions are the original','Attempt all 15 questions first. Each question has its own mark allocation.')],
104:[('Original exam questions','Practice questions')],
107:[('These five supplementary questions address specification points not fully practised in the original question set.','These five additional questions practise binary addition, shifts and other specification requirements.')],
108:[('Original questions: model answers','Practice questions: model answers'),('Indicative marking points, aligned to the original 15 questions.','Indicative marking points for the 15 practice questions.')],
111:[('The original visual analogy comes first.','Start with the visual analogy.' )],
113:[('IMPORTANT CORRECTION TO THE ORIGINAL QUICK COMPARISON','CHECK THE DIFFERENCE BETWEEN LOSSY AND LOSSLESS')],
123:[('Start with the original road comparison.','Use the road comparison to distinguish networks and their connections.'),('THE ORIGINAL ROAD IDEA','THE ROAD ANALOGY')],
124:[('These four cartoons are cropped directly from the original 94-page guide.','Each cartoon represents a different network idea. Identify what each illustrates.')],
126:[('Network hardware · the original cartoons','Network hardware · illustrated')],
127:[('These original pictures show an Internet collection, clients, servers, DNS and service delivery.','Use the diagrams to identify connected networks, clients, servers and DNS.')],
129:[('Star and mesh · original diagrams','Star and mesh network topologies')],
151:[('Use the original postal analogy,','Use the postal analogy,')],
162:[('Exam accuracy: Original answer is over-absolute about deletion:','Exam accuracy: POP3 generally downloads messages; deletion depends on configuration.')],
166:[('The artwork repeats SQL injection at the bottom;','The six examples above show different threats. Explain each attack by describing its mechanism and possible effect.')],
255:[('Source correction:','Remember:')],
}

def get_font(size=20,bold=False):
    paths=['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf','/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf']
    for p in paths:
        if os.path.isfile(p):return ImageFont.truetype(p,size)
    return ImageFont.load_default()

def whiteout(draw,rect,color=(255,255,255)):
    draw.rectangle(rect,fill=color)

def patch_picture(img, page_n):
    im=img.convert('RGB');d=ImageDraw.Draw(im)
    if page_n==33:
        # Only correct the fridge/freezer caption, retaining the rest of the kitchen drawing.
        whiteout(d,(420,857,680,908))
        d.text((428,863),'Controls cooling',font=get_font(23),fill=(0,0,0))
        d.text((443,890),'and temperature',font=get_font(20),fill=(0,0,0))
    if page_n==71:
        # Recompose the LEGO analogy from seven *original* illustration crops.
        # No source unit labels are reproduced. This avoids white-patch artefacts,
        # restores the missing terabyte row and the mislabeled petabyte.
        from PIL import ImageOps
        source=im.copy()
        clean=Image.new('RGB',(887,1330),'white')
        dd=ImageDraw.Draw(clean)
        dd.rounded_rectangle((18,20,870,104),radius=20,fill=(70,70,70))
        dd.text((145,42),'Data Units - LEGO Analogy',font=get_font(37,True),fill='white')
        crops=[(64,134,226,232),(56,258,248,359),(39,390,228,514),(20,532,232,661),(18,697,237,836),(18,864,237,994),(10,1154,390,1298)]
        rows=[
            ('BIT','1 bit = 0 or 1','A single binary digit'),
            ('BYTE','1 byte = 8 bits','Eight binary digits'),
            ('KILOBYTE (KB)','1 KB = 1,000 B','A small text file'),
            ('MEGABYTE (MB)','1 MB = 1,000 KB','An image or audio file'),
            ('GIGABYTE (GB)','1 GB = 1,000 MB','Large videos or games'),
            ('TERABYTE (TB)','1 TB = 1,000 GB','Drives and backups'),
            ('PETABYTE (PB)','1 PB = 1,000 TB','Large data collections')]
        for i,(crop,(label,conversion,example)) in enumerate(zip(crops,rows)):
            y=121+i*156
            dd.rounded_rectangle((22,y,865,y+145),radius=15,fill=(249,249,249) if i%2==0 else (239,239,239),outline=(179,179,179),width=2)
            piece=source.crop(crop)
            piece.thumbnail((205,130),Image.Resampling.LANCZOS)
            cx=36+(210-piece.width)//2;cy=y+(145-piece.height)//2
            clean.paste(piece,(cx,cy))
            dd.text((265,y+25),label,font=get_font(25,True),fill=(20,20,20))
            dd.text((265,y+80),conversion,font=get_font(24,True),fill=(50,50,50))
            dd.text((562,y+65),example,font=get_font(20),fill=(50,50,50))
        dd.text((30,1244),'From bytes onwards: 1,000 of each unit makes the next larger unit.',font=get_font(21),fill=(40,40,40))
        dd.text((30,1275),'Bit to byte is different: eight bits make one byte.',font=get_font(20),fill=(40,40,40))
        return clean
    if page_n==166:
        # Six legitimate threats are arranged in the three rows above. Remove the false seventh,
        # repeated SQL injection card and redundant second caption below it.
        whiteout(d,(47,1093,856,1326))
        d.rounded_rectangle((62,1114,836,1307),radius=18,outline=(50,50,50),width=3,fill=(245,245,245))
        d.text((86,1135),'EXAM ANSWER CHECKLIST',font=get_font(25,True),fill=(20,20,20))
        d.text((86,1176),'1. Name the threat accurately.',font=get_font(22),fill=(30,30,30))
        d.text((86,1209),'2. Explain how the attack works.',font=get_font(22),fill=(30,30,30))
        d.text((86,1242),'3. Explain its purpose or likely effect.',font=get_font(22),fill=(30,30,30))
    return im

def image_patch(doc,page_n):
    p=doc[page_n-1];blocks=[b for b in p.get_text('dict')['blocks'] if b['type']==1]
    if not blocks:raise RuntimeError(f'No image at {page_n}')
    # target main large image
    b=max(blocks,key=lambda b:(b['bbox'][2]-b['bbox'][0])*(b['bbox'][3]-b['bbox'][1]))
    image=Image.open(io.BytesIO(b['image']));mod=patch_picture(image,page_n)
    png=io.BytesIO();mod.save(png,format='PNG')
    rect=fitz.Rect(b['bbox'])
    p.insert_image(rect,stream=png.getvalue(),overlay=True,keep_proportion=False)
    return len(b['image'])

# Replacement: remove a complete text block, reflow student-facing text inside the same footprint.
def replace_blocks(doc, page_n, repls):
    p=doc[page_n-1];blocks=[b for b in p.get_text('dict')['blocks'] if b['type']==0]
    targets=[]
    for old,new in repls:
        found=[b for b in blocks if old.casefold() in ' '.join(' '.join(s['text'] for s in line['spans']) for line in b['lines']).casefold()]
        if not found:raise RuntimeError(f'Page {page_n} missing block: {old}')
        if len(found)!=1:raise RuntimeError(f'Page {page_n} multiple blocks: {old}')
        b=found[0];src=' '.join(' '.join(s['text'] for s in line['spans']) for line in b['lines'])
        # If intro chunk was deliberately abbreviated, reconstruct replacement as full block.
        full=new
        if page_n in [26,27,28,29] and old.startswith('Attempt'):full='Attempt these questions before checking the answers. Write enough for the marks shown.'
        if page_n==3 and 'unpublished review' in old:full=new
        if page_n==33:full=new
        if page_n==59 and old.startswith('Same artwork'):full='Use the diagrams to compare optical, magnetic and solid-state storage. The devices shown are examples, not a fixed ranking chart.'
        if page_n==59 and old.startswith('Exam accuracy'):full=new
        if page_n==71 and old.startswith('Artwork correction'):full=new
        if page_n==75:full=new
        if page_n==86:full=new
        if page_n==88 and old.startswith('Original 8-bit'):full=new
        if page_n==90:full=new
        if page_n==91 and old.startswith('Original visual'):full='Split 11111110 into 1111 (F) and 1110 (E).'
        if page_n==92 and old.startswith('Some captions'):full=new
        if page_n==93:full=new
        if page_n==94 and old.startswith('Original binary'):full='The empty positions created by a logical shift are filled with zero.'
        if page_n==97 and old.startswith('Original bitmap'):full=new
        if page_n==98 and old.startswith('Original metadata'):full=new
        if page_n==99 and old.startswith('Original waveform'):full=new
        if page_n==103:full='Attempt all 15 questions. Keep the answers separate until you have finished.'
        if page_n==107:full='These five additional questions practise specification content not covered by the preceding 15 questions.'
        if page_n==111 and old.startswith('The original'):full='Begin with the visual analogy, then use the technical explanation in an OCR exam answer.'
        if page_n==162:full='POP3 downloads messages from a server. Whether they remain on the server depends on settings.'
        if page_n==166:full='The illustration shows six different threats. For each one, explain how it works and what effect it may have.'
        if page_n==3 and old.startswith('Original Synoptic'):
            # TOC has standalone page number in same block: preserve last standalone integer.
            mm=re.search(r'\b(\d{3})\s*$',src)
            if mm:full=full+'   '+mm.group(1)
        # Some blocks contain continuation content; avoid losing it.
        if page_n==88 and old.startswith('The original'):
            full='Use the place-value diagrams to learn the conversion methods before attempting exam questions.'
        if page_n==92 and old=='Source correction':full='Check your method'
        if page_n==255:full=src.replace('Source correction:','Remember:')
        spans=[s for l in b['lines'] for s in l['spans']]
        size=max(6.7,min(12.5,spans[0]['size'] if spans else 9))
        is_bold=bool(spans and ('bold' in spans[0]['font'].lower()))
        rect=fitz.Rect(b['bbox']);
        # allow modest growth into whitespace; avoid crossing adjacent blocks
        rect.x0-=.25;rect.x1+=1;rect.y0-=.7;rect.y1+=max(2.0,size*.8)
        # Sample a neighbouring background pixel so pale green/blue panels stay intact.
        pix=p.get_pixmap(matrix=fitz.Matrix(1,1),alpha=False)
        xx=max(1,min(pix.width-2,int(rect.x0-4)))
        yy=max(1,min(pix.height-2,int((rect.y0+rect.y1)/2)))
        rgb=pix.pixel(xx,yy)[:3]
        bg=tuple(v/255.0 for v in rgb)
        targets.append((rect,full,size,is_bold,bg))
    for rect,_,_,_,bg in targets:p.add_redact_annot(rect,fill=bg)
    p.apply_redactions(images=0, graphics=0)
    for rect,full,size,bold,bg in targets:
        font='hebo' if bold else 'helv'
        # Calculate and progressively decrease font size until it fits.
        grow=fitz.Rect(rect.x0,rect.y0,rect.x1,rect.y1+2)
        ok=False
        for fs in [size,size*.95,size*.9,size*.85,size*.8,size*.75,size*.7,6.0]:
            if p.insert_textbox(grow,full,fontsize=fs,fontname=font,color=TEXT_COLOUR,lineheight=1.2,overlay=True)>=-0.01:
                ok=True;break
        if not ok:raise RuntimeError(f'Cannot fit text on page {page_n}: {full[:40]}')
    return len(targets)

# Remove recurring legacy production labels while retaining every question and mark.
LABEL_REWRITES=[
 (r"\bORIGINAL Q(?=\d)","EXAM Q"),
 (r"\bORIGINAL (?=\d+\s*·)","EXAM "),
 (r"\bOriginal questions\b","Practice questions"),
 (r"\bOriginal question\b","Practice question"),
 (r"\bOriginal 6-mark scenario\b","Six-mark scenario"),
 (r"\bOriginal analogy\b","Teaching analogy"),
 (r"\boriginal analogies\b","teaching analogies"),
 (r"\bORIGINAL MODEL\b","WORKED MODEL"),
 (r"\bOriginal phone-to-OS comparison\b","Phone-to-OS comparison"),
 (r"\bORIGINAL EXTENDED-RESPONSE SCENARIO\b","EXTENDED-RESPONSE SCENARIO"),
 (r"\bADDITIONAL ORIGINAL-SOURCE EXTENSION\b","EXTENSION QUESTION"),
 (r"\bORIGINAL VISUAL ANALOGY\b","VISUAL ANALOGY"),
 (r"\bOriginal exam questions\b","Practice questions"),
 (r"\bSource labels it Exam Paper 2\b",""),
 (r"Yellow strokes match the original shared lesson SVG highlighter;","Yellow highlighting indicates key terms;"),
 (r"Each highlighted word uses the original three SVG yellow lesson strokes with their exact colours and translucencies\.","Yellow highlighting identifies the key terms to use in exam answers."),
 (r"Original social-media model from the guide,","Study this model of a social-media answer,"),
 (r"Original questions and mark values are unchanged\.","Marks are shown with each practice question."),
 (r"\bOriginal 8-bit number-line\b","8-bit number-line"),
 (r"as in the original question","as stated in the question"),
]
def normalize_student_labels(doc):
    count=0
    for i,p in enumerate(doc):
        candidates=[]
        pix=None
        for b in p.get_text('dict')['blocks']:
            if b['type']!=0:continue
            raw=' '.join(' '.join(span['text'] for span in line['spans']) for line in b['lines'])
            revised=raw
            for pattern,replacement in LABEL_REWRITES:
                revised=re.sub(pattern,replacement,revised,flags=re.I)
            if revised==raw:continue
            spans=[span for line in b['lines'] for span in line['spans']]
            size=min(12.5,max(5.8,spans[0]['size']))
            bold=bool(spans and 'bold' in spans[0]['font'].lower())
            rect=fitz.Rect(b['bbox']);rect.x0-=.3;rect.x1+=1.5;rect.y0-=.7;rect.y1+=max(2,size*.8)
            if pix is None:pix=p.get_pixmap(matrix=fitz.Matrix(1,1),alpha=False)
            x=max(1,min(pix.width-2,int(rect.x0-4)));y=max(1,min(pix.height-2,int((rect.y0+rect.y1)/2)))
            bg=tuple(v/255 for v in pix.pixel(x,y)[:3])
            candidates.append((rect,revised,size,bold,bg))
        if not candidates:continue
        for rect,_,_,_,bg in candidates:p.add_redact_annot(rect,fill=bg)
        p.apply_redactions(images=0,graphics=0)
        for rect,revised,size,bold,bg in candidates:
            area=fitz.Rect(rect.x0,rect.y0,rect.x1,rect.y1+2)
            for z in [size,size*.95,size*.9,size*.85,size*.8,size*.75,5.8]:
                rc=p.insert_textbox(area,revised,fontsize=z,fontname='hebo' if bold else 'helv',color=TEXT_COLOUR,lineheight=1.2,overlay=True)
                if rc>=-0.01:break
            else:raise RuntimeError(f'Cannot fit normalised text on page {i+1}: {revised[:70]}')
        count+=len(candidates)
    return count

TEXT_COLOUR=(.08,.19,.19)
reports=[]
for filename,outname in FILES:
    TEXT_COLOUR=(.075,.075,.075) if 'Print_' in filename else (.08,.19,.19)
    inp=os.path.join(ROOT,filename);out=os.path.join(ROOT,outname)
    doc=fitz.open(inp);toc=doc.get_toc();linkcount=sum(len(p.get_links()) for p in doc)
    nrep=0
    for pg,rep in REPLACE.items():nrep+=replace_blocks(doc,pg,rep)
    nrep+=normalize_student_labels(doc)
    for pg in [33,71,166]:image_patch(doc,pg)
    # Redaction can delete overlapping PDF link annotations. Recreate missing
    # source links by their destination to restore all 20 TOC links.
    source=fitz.open(inp)
    for i in range(len(doc)):
        a=source[i].get_links();b=doc[i].get_links()
        present={(round(x['from'].x0,1),round(x['from'].y0,1),x.get('page')) for x in b}
        for link in a:
            identity=(round(link['from'].x0,1),round(link['from'].y0,1),link.get('page'))
            if identity not in present:
                insert={k:v for k,v in link.items() if k not in ['xref','id']}
                doc[i].insert_link(insert)
    source.close()
    assert len(doc)==291 and len(doc.get_toc())==len(toc) and sum(len(p.get_links()) for p in doc)==linkcount
    doc.set_metadata({**doc.metadata,'title':'OCR J277 Paper 1 - V4 Student Review','subject':'GCSE Computer Science Paper 1 - corrected review edition'})
    doc.save(out,garbage=4,deflate=True,clean=True)
    doc.close()
    check=fitz.open(out)
    reports.append({'name':outname,'pages':len(check),'bookmarks':len(check.get_toc()),'links':sum(len(p.get_links()) for p in check),'bytes':os.stat(out).st_size,'sha256':hashlib.sha256(open(out,'rb').read()).hexdigest(),'edited_text_blocks':nrep,'diagram_pages':[33,71,166]})
    check.close()
    print('CREATED',outname,'size',reports[-1]['bytes'],'text blocks',nrep, flush=True)
json.dump(reports,open(os.path.join(ROOT,'j277_v4_generation_report.json'),'w'),indent=2)
print(json.dumps(reports,indent=2))