from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfbase.pdfmetrics import stringWidth
from pathlib import Path

OUT=Path("lessons/year8/year8-lesson-upload/Y8-L01-print.pdf")
OUT.parent.mkdir(parents=True, exist_ok=True)
W,H=A4
GREEN=HexColor("#0b5a45")
DARK=HexColor("#173c33")
MUTED=HexColor("#5f6d68")
PALE=HexColor("#edf5f2")
CREAM=HexColor("#fff8e8")
LINE=HexColor("#cbdad4")

def wrap(c,text,font,size,maxw):
    words=text.split()
    lines=[]; cur=""
    for word in words:
        test=(cur+" "+word).strip()
        if stringWidth(test,font,size)<=maxw:
            cur=test
        else:
            if cur: lines.append(cur)
            cur=word
    if cur: lines.append(cur)
    return lines

def text(c,x,y,text,font="Helvetica",size=10,leading=13,maxw=None,color=DARK):
    c.setFillColor(color); c.setFont(font,size)
    lines=wrap(c,text,font,size,maxw) if maxw else [text]
    for line in lines:
        c.drawString(x,y,line); y-=leading
    return y

def header(c,page,title,sub):
    c.setFillColor(GREEN); c.rect(0,H-52,W,52,fill=1,stroke=0)
    c.setFillColor(HexColor("#ffffff")); c.setFont("Helvetica-Bold",12)
    c.drawString(40,H-32,"YEAR 8 COMPUTING · L01")
    c.setFont("Helvetica",9); c.drawRightString(W-40,H-31,f"Page {page} of 4")
    c.setFillColor(DARK); c.setFont("Helvetica-Bold",26); c.drawString(40,H-95,title)
    c.setFillColor(MUTED); c.setFont("Helvetica",11); c.drawString(40,H-114,sub)

def line_answer(c,x,y,w,h=22):
    c.setStrokeColor(HexColor("#98ada5")); c.line(x,y-h,x+w,y-h)

def box(c,x,y,w,h,fill=PALE,stroke=LINE,r=10):
    c.setFillColor(fill); c.setStrokeColor(stroke); c.roundRect(x,y-h,w,h,r,fill=1,stroke=1)

def section_title(c,x,y,t):
    c.setFillColor(GREEN); c.setFont("Helvetica-Bold",14); c.drawString(x,y,t)

c=canvas.Canvas(str(OUT), pagesize=A4)
c.setTitle("Year 8 Computing - Lesson 1 - Welcome Back - Paper Booklet")

# PAGE 1
header(c,1,"Welcome Back","Do Now · Expectations · SLANT")
box(c,40,H-135,W-80,42)
c.setFillColor(DARK); c.setFont("Helvetica-Bold",10); c.drawString(52,H-160,"Name:")
c.setStrokeColor(LINE); c.line(100,H-162,292,H-162)
c.drawString(315,H-160,"Class:"); c.line(355,H-162,W-52,H-162)
section_title(c,40,H-195,"DO NOW · 5 MINUTES")
qs=[
"What does the L in SLANT stand for?",
"Give one way we show respect for the classroom environment.",
"Where should new pages go in your green Computing folder?",
"What should you do if a school website is blocked but you think it should be available?"
]
y=H-220
for i,q in enumerate(qs,1):
    y=text(c,40,y,f"{i}. {q}","Helvetica-Bold",10.5,13,W-80)
    line_answer(c,52,y+7,W-104); y-=28
box(c,40,y-2,W-80,160)
section_title(c,52,y-24,"COMPUTING EXPECTATIONS")
y2=y-48
items=[
("1 · Respect for others","SLANT when the teacher is speaking. Listen when others contribute. Support the learning of others."),
("2 · Respect for the classroom","Leave desks as you found them. Keep food and drink away from desks. Follow the Acceptable Use Agreement."),
("3 · Respect for learning","Be ready to answer questions and complete tasks. Computing work should usually be presented clearly and carefully. Work hard even when it is difficult.")
]
for h,t in items:
    c.setFillColor(GREEN); c.setFont("Helvetica-Bold",10); c.drawString(54,y2,h)
    y2=text(c,54,y2-14,t,"Helvetica",9.2,11,W-108); y2-=7
box(c,40,164,W-80,82,fill=CREAM)
section_title(c,52,140,"SLANT")
letters=[("S","Sit up"),("L","Listen carefully"),("A","Ask and answer"),("N","Never interrupt"),("T","Track the speaker")]
xx=64
for l,lab in letters:
    c.setFillColor(GREEN); c.circle(xx,105,12,fill=1,stroke=0)
    c.setFillColor(HexColor("#ffffff")); c.setFont("Helvetica-Bold",10); c.drawCentredString(xx,101,l)
    c.setFillColor(DARK); c.setFont("Helvetica-Bold",7.5); c.drawCentredString(xx,80,lab); xx+=102
c.setFillColor(MUTED); c.setFont("Helvetica",8); c.drawString(40,25,"RHSC Computing · Welcome Back")
c.drawRightString(W-40,25,"4 A4 pages · suitable for A3 booklet printing")
c.showPage()

# PAGE 2
header(c,2,"Organisation","Folder · presentation · safe use")
section_title(c,40,H-150,"YOUR FOLDER")
y=H-175
tasks=[
"Complete the front page with your name, class and previous test scores.",
"Review the Acceptable Use Agreement.",
"Add your school email, username and printer code to your planner."
]
for i,t in enumerate(tasks,1):
    c.setStrokeColor(GREEN); c.rect(42,y-4,12,12,fill=0,stroke=1)
    y=text(c,64,y,f"{i}. {t}","Helvetica-Bold",10.2,13,W-108); y-=16
box(c,40,y,W-80,205)
section_title(c,52,y-24,"PRESENTATION OF WORK")
yy=y-48
groups=[
("Green folder",["Complete the cover page at the front.","Keep pages in chronological order - new work at the back."]),
("Do Nows & assessments",["Write in black or blue ink; mark in coloured pen.","Use your best handwriting; cross out mistakes with one line.","Keep pages neat and write in full sentences."]),
("Paper / Class Notebook",["Paper: title and date; underline headings; label diagrams.","Notebook: date each row; black font; purple marking; organise headings/lists; crop screenshots neatly."])
]
for title,bullets in groups:
    c.setFillColor(GREEN); c.setFont("Helvetica-Bold",10); c.drawString(54,yy,title); yy-=14
    for b in bullets:
        yy=text(c,66,yy,"• "+b,"Helvetica",8.8,10,W-122); yy-=3
    yy-=4
section_title(c,40,250,"FILTERING & MONITORING")
box(c,40,232,245,120); box(c,310,232,245,120)
c.setFillColor(GREEN); c.setFont("Helvetica-Bold",11); c.drawString(52,210,"Filtering")
text(c,52,194,"The school may block websites it thinks are inappropriate. If you think a site should or should not be blocked, tell a teacher.","Helvetica",9,11,220)
c.setFillColor(GREEN); c.setFont("Helvetica-Bold",11); c.drawString(322,210,"Monitoring")
text(c,322,194,"Staff can see activity on school systems, including screens, internet history, files and emails. School systems should be used for schoolwork.","Helvetica",9,11,220)
box(c,40,96,W-80,58,fill=CREAM)
text(c,52,78,"Password reminder: the lesson states that passwords must have 10 characters and should not need changing all year.","Helvetica-Bold",9.2,12,W-104)
c.showPage()

# PAGE 3
header(c,3,"Digital Setup","Account details · OneDrive · email · homework")
section_title(c,40,H-150,"WORK THROUGH THESE IN ORDER")
items=[
("1","Log in."),
("2","Find 'My Account Information'. Record your username, school email and printer code in your planner."),
("3","Create Year 8 → Computing in OneDrive."),
("4","Tidy your school email: delete what you do not need, unsubscribe where appropriate, and move useful emails into folders."),
("5","Check homework on Arbor and Wayground."),
("6","Complete the '8.0 Welcome Back' Wayground quiz. Class code: D331678."),
("7","Add a screenshot of your work to Class Notebook.")
]
y=H-178
for n,t in items:
    c.setFillColor(GREEN); c.circle(52,y+3,11,fill=1,stroke=0)
    c.setFillColor(HexColor("#ffffff")); c.setFont("Helvetica-Bold",9); c.drawCentredString(52,y,n)
    y=text(c,72,y+6,t,"Helvetica-Bold" if n in ["1","7"] else "Helvetica",9.7,12,W-112); y-=18
section_title(c,40,310,"EMAIL CHECK")
box(c,40,292,W-80,150)
prompts=[
"An old email you no longer need → __________________________",
"A website you should not have joined keeps emailing → __________________________",
"An important school email you want to keep → __________________________"
]
yy=266
for p in prompts:
    yy=text(c,52,yy,p,"Helvetica",10,13,W-104); yy-=18
box(c,40,110,W-80,70,fill=CREAM)
c.setFillColor(GREEN); c.setFont("Helvetica-Bold",12); c.drawString(52,88,"WAYGROUND")
c.setFillColor(DARK); c.setFont("Courier-Bold",18); c.drawString(52,62,"D331678")
text(c,190,87,"Homework is set twice a half term and appears on Arbor and Wayground.","Helvetica",9.5,12,345)
c.showPage()

# PAGE 4
header(c,4,"Check & Reflect","Safe choices · evidence · exit")
section_title(c,40,H-150,"QUICK CHECK")
qs=[
("1. A school website is blocked but should be available.","Tell a teacher / Try to bypass the block"),
("2. An old email is no longer needed.","Delete it / Leave it in the inbox"),
("3. A website you should not have joined keeps emailing.","Keep receiving it / Unsubscribe"),
("4. An email is useful and you want to keep it.","Delete it / Put it in a folder")
]
y=H-178
for q,opts in qs:
    y=text(c,40,y,q,"Helvetica-Bold",10,12,W-80)
    y=text(c,52,y-2,"Circle: "+opts,"Helvetica",9.5,12,W-104)
    y-=20
section_title(c,40,390,"EVIDENCE")
box(c,40,372,W-80,65)
text(c,52,346,"Add a screenshot of your work to your Class Notebook.","Helvetica-Bold",10.5,13,W-104)
text(c,52,327,"What does your screenshot show? ______________________________________________","Helvetica",9.5,12,W-104)
section_title(c,40,275,"EXIT REFLECTION")
box(c,40,257,W-80,132)
text(c,52,232,"Tick one:   □ Ready     □ Nearly there     □ Need help","Helvetica-Bold",10.5,13,W-104)
text(c,52,205,"One thing I completed successfully today:","Helvetica-Bold",9.5,12,W-104)
line_answer(c,52,196,W-104); line_answer(c,52,171,W-104)
text(c,52,140,"One thing I still need to finish or ask for help with:","Helvetica-Bold",9.5,12,W-104)
line_answer(c,52,131,W-104); line_answer(c,52,106,W-104)
c.setFillColor(MUTED); c.setFont("Helvetica",8); c.drawString(40,25,"RHSC Computing · Welcome Back")
c.drawRightString(W-40,25,"Print double-sided on A3 and fold to make an A4 booklet")
c.save()
print(OUT)
