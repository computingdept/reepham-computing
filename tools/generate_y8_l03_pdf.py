from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfbase.pdfmetrics import stringWidth
from pathlib import Path

OUT=Path("lessons/year8/year8-lesson-upload/Y8-L03-print.pdf")
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
    c.setFillColor(HexColor("#ffffff")); c.setFont("Helvetica-Bold",12); c.drawString(40,H-32,"YEAR 8 COMPUTING · L03")
    c.setFont("Helvetica",9); c.drawRightString(W-40,H-31,f"Page {page} of 4")
    c.setFillColor(DARK); c.setFont("Helvetica-Bold",25); c.drawString(40,H-94,title)
    c.setFillColor(MUTED); c.setFont("Helvetica",10.5); c.drawString(40,H-113,sub)

def section(c,x,y,t):
    c.setFillColor(GREEN); c.setFont("Helvetica-Bold",14); c.drawString(x,y,t)

def lines(c,x,y,w,n=1,gap=24):
    c.setStrokeColor(HexColor("#9eafa8"))
    for i in range(n): c.line(x,y-i*gap,x+w,y-i*gap)

c=canvas.Canvas(str(OUT),pagesize=A4)
c.setTitle("Year 8 Computing - L03 - RAM and ROM - Paper Booklet")

# PAGE 1
header(c,1,"RAM & ROM","8.1 Lesson 2 · Do Now · Objectives")
box(c,40,H-138,W-80,42)
c.setFillColor(DARK); c.setFont("Helvetica-Bold",10); c.drawString(52,H-162,"Name:")
c.setStrokeColor(LINE); c.line(100,H-164,292,H-164); c.drawString(315,H-162,"Class:"); c.line(355,H-164,W-52,H-164)
section(c,40,H-198,"DO NOW · 5 MINUTES")
qs=[
"1. What type of software was ALICE?",
"2. Classify a keyboard: input, storage or output?",
"3. Classify a hard drive: input, storage or output?",
"4. Classify a speaker: input, storage or output?"
]
y=H-222
for q in qs:
    y=text(c,40,y,q,"Helvetica-Bold",10,13,W-80); lines(c,52,y+5,W-104,1); y-=28
box(c,40,y-2,W-80,158)
section(c,52,y-25,"LESSON OBJECTIVES")
objs=[
"Identify the key features of RAM and ROM and their role in the computer system.",
"Explain the difference between the purpose of RAM and ROM.",
"Explain what reading and writing from memory means and how it is used."
]
yy=y-50
for i,o in enumerate(objs,1):
    c.setFillColor(GREEN); c.circle(58,yy+4,10,fill=1,stroke=0)
    c.setFillColor(HexColor("#ffffff")); c.setFont("Helvetica-Bold",8); c.drawCentredString(58,yy+1,str(i))
    yy=text(c,77,yy+7,o,"Helvetica",9.5,12,W-128); yy-=10
box(c,40,148,W-80,78,fill=CREAM)
section(c,52,126,"KEY TERMS")
text(c,52,106,"Random Access Memory · Read Only Memory · Volatile · Read from / Write to","Helvetica-Bold",9.5,12,W-104)
c.setFillColor(MUTED); c.setFont("Helvetica",8); c.drawString(40,25,"RHSC Computing · RAM & ROM")
c.drawRightString(W-40,25,"4 A4 pages · suitable for A3 booklet printing")
c.showPage()

# PAGE 2
header(c,2,"Key Knowledge","RAM · ROM · volatility · read/write")
section(c,40,H-150,"RAM")
box(c,40,H-170,W-80,145)
text(c,52,H-196,"Random Access Memory stores the data and programs that you are currently running.","Helvetica-Bold",10,13,W-104)
text(c,52,H-228,"RAM is used to hold:","Helvetica-Bold",9.5,12,W-104)
text(c,68,H-246,"• The Operating System","Helvetica",9.5,12,W-130)
text(c,68,H-264,"• Open Documents","Helvetica",9.5,12,W-130)
text(c,68,H-282,"• Running Programs","Helvetica",9.5,12,W-130)
text(c,52,H-307,"Source table: RAM is volatile; data is wiped when it loses power; RAM is read & write.","Helvetica",9.2,12,W-104)

section(c,40,480,"ROM")
box(c,40,462,W-80,125)
text(c,52,436,"Read Only Memory stores a program which takes the computer through all the steps to start up the computer.","Helvetica-Bold",10,13,W-104)
text(c,52,388,"Source table: ROM is non-volatile; data is not lost; ROM is read only.","Helvetica",9.5,12,W-104)

section(c,40,300,"FLASHBACK")
box(c,40,282,W-80,70,fill=CREAM)
text(c,52,258,"RAM and ROM are types of memory. The lesson states that the CPU fetches instructions directly from them.","Helvetica-Bold",9.5,12,W-104)

section(c,40,178,"QUICK RETRIEVAL")
pairs=[
("Which stores open documents and running programs?","________________"),
("Which stores a start-up program?","________________"),
("Which is volatile?","________________"),
("Which is read only?","________________")
]
yy=156
for q,a in pairs:
    c.setFillColor(DARK); c.setFont("Helvetica",9.2); c.drawString(48,yy,q)
    c.setStrokeColor(LINE); c.line(375,yy-2,W-48,yy-2); yy-=26
c.showPage()

# PAGE 3
header(c,3,"Compare RAM & ROM","Class Notebook task")
section(c,40,H-150,"COPY AND COMPLETE THIS TABLE")
text(c,40,H-174,"The original lesson asks you to complete this comparison in your Class Notebook.","Helvetica",9.5,12,W-80)

x=40; y=H-205; total=W-80; col1=180; col2=(total-col1)/2; rowh=[38,120,92,92]
# header row
c.setFillColor(PALE); c.setStrokeColor(LINE)
c.rect(x,y-rowh[0],total,rowh[0],fill=1,stroke=1)
c.line(x+col1,y-rowh[0],x+col1,y); c.line(x+col1+col2,y-rowh[0],x+col1+col2,y)
c.setFillColor(GREEN); c.setFont("Helvetica-Bold",11); c.drawCentredString(x+col1+col2/2,y-24,"ROM"); c.drawCentredString(x+col1+col2+col2/2,y-24,"RAM")
yy=y-rowh[0]
labels=["Why is it needed? What does it store?","Volatile or Non-Volatile?","Write / Read?"]
for idx,lab in enumerate(labels):
    h=rowh[idx+1]
    c.setFillColor(HexColor("#ffffff")); c.setStrokeColor(LINE); c.rect(x,yy-h,total,h,fill=1,stroke=1)
    c.line(x+col1,yy-h,x+col1,yy); c.line(x+col1+col2,yy-h,x+col1+col2,yy)
    text(c,x+10,yy-20,lab,"Helvetica-Bold",9.2,11,col1-20)
    for cx in [x+col1+12,x+col1+col2+12]:
        lines(c,cx,yy-28,col2-24,max(2,int((h-30)/24)),24)
    yy-=h

box(c,40,185,W-80,92,fill=CREAM)
section(c,52,162,"WHY USE A TABLE?")
text(c,52,142,"The source lesson says a table makes information easy to read and organised, shows a lot of information in a small area, and helps quickly compare similarities and differences.","Helvetica",9.2,12,W-104)
c.showPage()

# PAGE 4
header(c,4,"Challenge & Exit","Read from · Write to · Reflection")
section(c,40,H-150,"CHALLENGE")
text(c,40,H-174,"Below your table, explain what reading and writing from memory means and how it is used.","Helvetica-Bold",10,13,W-80)
box(c,40,H-205,W-80,136)
text(c,52,H-230,"Consider:","Helvetica-Bold",9.5,12,W-104)
prompts=[
"What data might we want to change?",
"Will reading change the data?",
"What happens when you write to something?",
"What could go wrong?"
]
yy=H-250
for p in prompts:
    yy=text(c,64,yy,"• "+p,"Helvetica",9.2,11,W-128); yy-=5
section(c,40,438,"MY EXPLANATION")
lines(c,40,416,W-80,6,24)

section(c,40,248,"EXIT REFLECTION")
text(c,40,226,"Tick one:   □ Ready     □ Nearly there     □ Need help","Helvetica-Bold",10.5,13,W-80)
text(c,40,194,"One difference between RAM and ROM:","Helvetica-Bold",9.5,12,W-80)
lines(c,40,177,W-80,2,24)
text(c,40,128,"One thing I still need help with:","Helvetica-Bold",9.5,12,W-80)
lines(c,40,111,W-80,2,24)
c.setFillColor(MUTED); c.setFont("Helvetica",8); c.drawString(40,25,"Print double-sided on A3 and fold to make an A4 booklet")
c.drawRightString(W-40,25,"Source lesson: 8.1 Lesson 2 · RAM & ROM")
c.save()
print(OUT)
