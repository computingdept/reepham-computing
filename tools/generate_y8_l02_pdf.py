from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfbase.pdfmetrics import stringWidth
from pathlib import Path

OUT=Path("lessons/year8/year8-lesson-upload/Y8-L02-print.pdf")
OUT.parent.mkdir(parents=True, exist_ok=True)
W,H=A4
GREEN=HexColor("#0b5a45"); DARK=HexColor("#173c33"); MUTED=HexColor("#5f6d68")
PALE=HexColor("#edf5f2"); CREAM=HexColor("#fff8e8"); LINE=HexColor("#cbdad4")

def wrap(text,font,size,maxw):
    words=text.split(); lines=[]; cur=""
    for word in words:
        test=(cur+" "+word).strip()
        if stringWidth(test,font,size)<=maxw: cur=test
        else:
            if cur: lines.append(cur)
            cur=word
    if cur: lines.append(cur)
    return lines

def text(c,x,y,s,font="Helvetica",size=10,leading=13,maxw=None,color=DARK):
    c.setFillColor(color); c.setFont(font,size)
    lines=wrap(s,font,size,maxw) if maxw else [s]
    for line in lines:
        c.drawString(x,y,line); y-=leading
    return y

def box(c,x,y,w,h,fill=PALE,stroke=LINE,r=10):
    c.setFillColor(fill); c.setStrokeColor(stroke); c.roundRect(x,y-h,w,h,r,fill=1,stroke=1)

def header(c,page,title,sub):
    c.setFillColor(GREEN); c.rect(0,H-52,W,52,fill=1,stroke=0)
    c.setFillColor(HexColor("#ffffff")); c.setFont("Helvetica-Bold",12); c.drawString(40,H-32,"YEAR 8 COMPUTING · L02")
    c.setFont("Helvetica",9); c.drawRightString(W-40,H-31,f"Page {page} of 4")
    c.setFillColor(DARK); c.setFont("Helvetica-Bold",25); c.drawString(40,H-94,title)
    c.setFillColor(MUTED); c.setFont("Helvetica",10.5); c.drawString(40,H-113,sub)

def section(c,x,y,t):
    c.setFillColor(GREEN); c.setFont("Helvetica-Bold",14); c.drawString(x,y,t)

def answer_lines(c,x,y,w,n=1,gap=24):
    c.setStrokeColor(HexColor("#9eafa8"))
    for i in range(n):
        c.line(x,y-i*gap,w+x,y-i*gap)

c=canvas.Canvas(str(OUT),pagesize=A4)
c.setTitle("Year 8 Computing - L02 - Computer Systems - Paper Booklet")

# PAGE 1
header(c,1,"Computer Systems","8.1 Lesson 1 · Do Now · Objectives")
box(c,40,H-138,W-80,42)
c.setFillColor(DARK); c.setFont("Helvetica-Bold",10); c.drawString(52,H-162,"Name:")
c.setStrokeColor(LINE); c.line(100,H-164,292,H-164); c.drawString(315,H-162,"Class:"); c.line(355,H-164,W-52,H-164)
section(c,40,H-198,"DO NOW · 5 MINUTES")
qs=[
"1. True or false: Binary is made up of two numbers, 0 and 1.",
"2. What does CPU stand for?",
"3. What should you do if something does not feel right online?",
"4. From home, where does the lesson say you should go first to access Teams?"
]
y=H-222
for q in qs:
    y=text(c,40,y,q,"Helvetica-Bold",10,13,W-80); answer_lines(c,52,y+5,W-104,1); y-=28

box(c,40,y-2,W-80,150)
section(c,52,y-25,"LESSON OBJECTIVES")
objs=[
"Classify devices as either input or output.",
"Explain the difference between an input/output device and a computer system.",
"Identify the inputs and outputs of large computer systems such as a self-checkout system."
]
yy=y-50
for i,o in enumerate(objs,1):
    c.setFillColor(GREEN); c.circle(58,yy+4,10,fill=1,stroke=0)
    c.setFillColor(HexColor("#ffffff")); c.setFont("Helvetica-Bold",8); c.drawCentredString(58,yy+1,str(i))
    yy=text(c,77,yy+7,o,"Helvetica",9.5,12,W-128); yy-=8

box(c,40,154,W-80,86,fill=CREAM)
section(c,52,132,"PRESENTATION REMINDER")
text(c,52,114,"Write in black or blue ink. Mark in coloured pen. Use your best handwriting. Cross out mistakes with one line. Use capital letters, punctuation and full sentences.","Helvetica",9,11,W-104)
c.setFillColor(MUTED); c.setFont("Helvetica",8); c.drawString(40,25,"RHSC Computing · Computer Systems")
c.drawRightString(W-40,25,"4 A4 pages · suitable for A3 booklet printing")
c.showPage()

# PAGE 2
header(c,2,"Four Functions","Input · Processing · Output · Storage")
section(c,40,H-150,"ALL COMPUTER SYSTEMS DO THESE FOUR THINGS")
labels=[
("INPUT","Inputs allow the user to put data into a computer."),
("PROCESSING","The original lesson lists processing as one of the four functions."),
("OUTPUT","A computer will send data out to output devices."),
("STORAGE","Storage holds permanent data that will need to be used in the computer system.")
]
x1=40; y1=H-176; bw=(W-92)/2; bh=112
for idx,(lab,desc) in enumerate(labels):
    col=idx%2; row=idx//2; x=x1+col*(bw+12); y=y1-row*(bh+14)
    box(c,x,y,bw,bh)
    c.setFillColor(GREEN); c.setFont("Helvetica-Bold",12); c.drawString(x+12,y-24,lab)
    text(c,x+12,y-46,desc,"Helvetica",9.4,11,bw-24)

section(c,40,352,"WE DO · CLASSIFY")
text(c,40,330,"For each item, decide whether it is mainly input, output or storage.","Helvetica",9.5,12,W-80)
items=["Keyboard","Monitor","Microphone","Printer","USB drive","Hard drive"]
y=302
for i,it in enumerate(items,1):
    c.setFillColor(DARK); c.setFont("Helvetica-Bold",9.5); c.drawString(50,y,f"{i}. {it}")
    c.setFont("Helvetica",9); c.drawString(190,y,"Input / Output / Storage")
    c.setStrokeColor(LINE); c.line(330,y-2,W-50,y-2); y-=30
box(c,40,104,W-80,65,fill=CREAM)
text(c,52,83,"Flashback: some devices do all four functions. Other systems use peripherals connected to them.","Helvetica-Bold",9.3,12,W-104)
c.showPage()

# PAGE 3
header(c,3,"Explain & Observe","Class Notebook · Video notes")
section(c,40,H-150,"YOU DO · EXPLAIN")
text(c,40,H-174,"Explain the difference between input and output devices using paragraphs. Add examples of each type in your sentences or afterwards as bullet points / a table.","Helvetica",10,13,W-80)
c.setFillColor(GREEN); c.setFont("Helvetica-Bold",10); c.drawString(40,H-225,"My explanation:")
answer_lines(c,40,H-244,W-80,5,24)

box(c,40,H-390,W-80,88)
section(c,52,H-414,"CLASS NOTEBOOK PRESENTATION")
text(c,52,H-435,"Date each row. Write in black font. Mark in purple. Use bold or underlined titles/headings. Use subheadings or write the question in your answer.","Helvetica",9,11,W-104)

section(c,40,334,"VIDEO OBSERVATION")
text(c,40,312,"As you watch the video from the web lesson, note the input, output and storage devices you notice.","Helvetica",9.5,12,W-80)
cols=[("INPUT",40),("OUTPUT",220),("STORAGE",400)]
for lab,x in cols:
    box(c,x,284,155,175,fill=HexColor("#ffffff"))
    c.setFillColor(GREEN); c.setFont("Helvetica-Bold",10); c.drawCentredString(x+77.5,263,lab)
    c.setStrokeColor(LINE)
    for yy in [240,212,184,156,128]:
        c.line(x+12,yy,x+143,yy)
c.setFillColor(MUTED); c.setFont("Helvetica",8); c.drawString(40,86,"Video link is available in the web lesson and original PowerPoint.")
c.showPage()

# PAGE 4
header(c,4,"Build a System","Label · Challenge · Exit")
section(c,40,H-150,"TASK 3 · LABEL A COMPUTER SYSTEM")
text(c,40,H-174,"Add or draw a picture of a computer system and label it. Use red for inputs, blue for storage and green for outputs.","Helvetica",10,13,W-80)
box(c,40,H-205,W-80,245,fill=HexColor("#ffffff"))
c.setFillColor(MUTED); c.setFont("Helvetica",10); c.drawCentredString(W/2,H-325,"Draw / attach your system here")
c.setFont("Helvetica",8.5); c.drawCentredString(W/2,H-343,"Label inputs, outputs and storage")

box(c,40,338,W-80,88,fill=CREAM)
section(c,52,316,"CHALLENGE")
text(c,52,294,"Try a more complex system such as an ECG machine in a hospital, the inside of a car or the inside of a plane.","Helvetica",9.5,12,W-104)

section(c,40,220,"EXIT REFLECTION")
text(c,40,198,"Tick one:   □ Ready     □ Nearly there     □ Need help","Helvetica-Bold",10.5,13,W-80)
text(c,40,168,"One thing I can now identify or explain:","Helvetica-Bold",9.5,12,W-80)
answer_lines(c,40,151,W-80,2,24)
text(c,40,102,"One thing I still need help with:","Helvetica-Bold",9.5,12,W-80)
answer_lines(c,40,85,W-80,2,24)
c.setFillColor(MUTED); c.setFont("Helvetica",8); c.drawString(40,25,"Print double-sided on A3 and fold to make an A4 booklet")
c.drawRightString(W-40,25,"Source lesson: 8.1 Lesson 1 · Computer Systems")
c.save()
print(OUT)
