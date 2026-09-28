from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfbase.pdfmetrics import stringWidth
from pathlib import Path

OUT=Path("lessons/year8/year8-lesson-upload/Y8-L04-print.pdf")
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
    c.setFillColor(HexColor("#ffffff")); c.setFont("Helvetica-Bold",12); c.drawString(40,H-32,"YEAR 8 COMPUTING · L04")
    c.setFont("Helvetica",9); c.drawRightString(W-40,H-31,f"Page {page} of 4")
    c.setFillColor(DARK); c.setFont("Helvetica-Bold",25); c.drawString(40,H-94,title)
    c.setFillColor(MUTED); c.setFont("Helvetica",10.5); c.drawString(40,H-113,sub)

def section(c,x,y,t):
    c.setFillColor(GREEN); c.setFont("Helvetica-Bold",14); c.drawString(x,y,t)

def lines(c,x,y,w,n=1,gap=24):
    c.setStrokeColor(HexColor("#9eafa8"))
    for i in range(n): c.line(x,y-i*gap,x+w,y-i*gap)

c=canvas.Canvas(str(OUT),pagesize=A4)
c.setTitle("Year 8 Computing - L04 - The CPU - Paper Booklet")

# PAGE 1
header(c,1,"The CPU","8.1.3 · Do Now · Objectives")
box(c,40,H-138,W-80,42)
c.setFillColor(DARK); c.setFont("Helvetica-Bold",10); c.drawString(52,H-162,"Name:")
c.setStrokeColor(LINE); c.line(100,H-164,292,H-164); c.drawString(315,H-162,"Class:"); c.line(355,H-164,W-52,H-164)

section(c,40,H-198,"DO NOW · 5 MINUTES")
qs=[
"1. True or false: RAM stores start-up programs.",
"2. What does the subject line mean in an email?",
"3. Which memory stores data and programs currently running?",
"4. Which memory stores a program to start up the computer?"
]
y=H-222
for q in qs:
    y=text(c,40,y,q,"Helvetica-Bold",10,13,W-80)
    lines(c,52,y+5,W-104,1)
    y-=28

box(c,40,y-2,W-80,160)
section(c,52,y-25,"LESSON OBJECTIVES")
objs=[
"Name the parts of the CPU using the acronyms.",
"Describe the ways you can increase the performance of the CPU.",
"Explain why each method of CPU performance makes the CPU quicker."
]
yy=y-50
for i,o in enumerate(objs,1):
    c.setFillColor(GREEN); c.circle(58,yy+4,10,fill=1,stroke=0)
    c.setFillColor(HexColor("#ffffff")); c.setFont("Helvetica-Bold",8); c.drawCentredString(58,yy+1,str(i))
    yy=text(c,77,yy+7,o,"Helvetica",9.5,12,W-128); yy-=10

box(c,40,150,W-80,78,fill=CREAM)
section(c,52,128,"KEY WORDS")
text(c,52,108,"CPU · CU · ALU · Cache · Cores · Clock Speed · Cycles · Hertz · Instructions","Helvetica-Bold",9.3,12,W-104)
c.setFillColor(MUTED); c.setFont("Helvetica",8); c.drawString(40,25,"RHSC Computing · The CPU")
c.drawRightString(W-40,25,"4 A4 pages · suitable for A3 booklet printing")
c.showPage()

# PAGE 2
header(c,2,"CPU Knowledge","Fetch · Decode · Execute · Components")
section(c,40,H-150,"CENTRAL PROCESSING UNIT")
text(c,40,H-174,"Instructions and data are processed by the CPU. CPU is an acronym for Central Processing Unit.","Helvetica-Bold",10,13,W-80)

section(c,40,H-225,"FETCH–DECODE–EXECUTE")
bw=(W-104)/3
for i,(lab,desc) in enumerate([
("1 · FETCH","Fetch instructions from memory."),
("2 · DECODE","Decode the instruction."),
("3 · EXECUTE","Execute the instruction.")
]):
    x=40+i*(bw+12)
    box(c,x,H-245,bw,92)
    c.setFillColor(GREEN); c.setFont("Helvetica-Bold",11); c.drawCentredString(x+bw/2,H-272,lab)
    text(c,x+10,H-295,desc,"Helvetica",9.2,11,bw-20)

section(c,40,450,"CPU COMPONENTS")
components=[
("CU · Control Unit","Controls the movement of data around your CPU during the fetch-decode-execute cycle."),
("ALU · Arithmetic Logic Unit","Carries out all the calculations in the CPU."),
("Cache","Stores currently used data. It is closer to the CPU so instructions can be fetched faster.")
]
y=424
for title,desc in components:
    box(c,40,y,W-80,92)
    c.setFillColor(GREEN); c.setFont("Helvetica-Bold",10.5); c.drawString(52,y-24,title)
    text(c,52,y-44,desc,"Helvetica",9.2,11,W-104)
    y-=106

c.showPage()

# PAGE 3
header(c,3,"Task 1","Recreate and label the CPU")
section(c,40,H-150,"RECREATE THE CPU PICTURE")
text(c,40,H-174,"Use the original slide as your reference. Draw or recreate the CPU and label CU, ALU and Cache.","Helvetica",10,13,W-80)
box(c,40,H-208,W-80,330,fill=HexColor("#ffffff"))
c.setFillColor(MUTED); c.setFont("Helvetica",10); c.drawCentredString(W/2,H-360,"Draw / recreate the CPU diagram here")
c.setFont("Helvetica",8.5); c.drawCentredString(W/2,H-378,"Label: CU · ALU · Cache")

box(c,40,252,W-80,118,fill=CREAM)
section(c,52,228,"EXTENSION")
text(c,52,206,"Add a short description of each part.","Helvetica-Bold",9.5,12,W-104)
text(c,52,184,"CU: ______________________________________________________________","Helvetica",9,11,W-104)
text(c,52,160,"ALU: _____________________________________________________________","Helvetica",9,11,W-104)
text(c,52,136,"Cache: __________________________________________________________","Helvetica",9,11,W-104)
c.setFillColor(MUTED); c.setFont("Helvetica",8); c.drawString(40,25,"Use the original PowerPoint / slide preview for the source diagram.")
c.showPage()

# PAGE 4
header(c,4,"CPU Performance","Cores · Cache · Clock Speed · Exit")
section(c,40,H-150,"A BETTER PERFORMING CPU WILL…")
perf=[
("MORE CORES","Process instructions at the same time as each other."),
("BIGGER CACHE","Store more data to be fetched quickly."),
("FASTER CLOCK SPEED","Complete more fetch-decode-execute cycles every second.")
]
y=H-176
for title,desc in perf:
    box(c,40,y,W-80,86)
    c.setFillColor(GREEN); c.setFont("Helvetica-Bold",10.5); c.drawString(52,y-24,title)
    text(c,52,y-45,desc,"Helvetica",9.4,11,W-104)
    y-=99

box(c,40,360,W-80,93,fill=CREAM)
section(c,52,336,"KEY PHRASES")
text(c,52,314,"at the same time · quick access · cycles per second","Helvetica-Bold",9.5,12,W-104)
text(c,52,289,"Clock Speed: how many instructions the CPU runs each second.","Helvetica",9.2,12,W-104)

section(c,40,238,"SILENT WORKING · 10 MINUTES")
text(c,40,216,"Explain why each factor makes the CPU quicker.","Helvetica-Bold",9.5,12,W-80)
text(c,40,193,"More cores:","Helvetica-Bold",9.3,12,W-80); lines(c,40,177,W-80,2,22)
text(c,40,127,"Bigger cache:","Helvetica-Bold",9.3,12,W-80); lines(c,40,111,W-80,1,22)
text(c,300,127,"Faster clock speed:","Helvetica-Bold",9.3,12,250); lines(c,300,111,255,1,22)

c.setFillColor(MUTED); c.setFont("Helvetica",8); c.drawString(40,25,"Print double-sided on A3 and fold to make an A4 booklet")
c.drawRightString(W-40,25,"Source lesson: 8.1.3 · The CPU")
c.save()
print(OUT)
