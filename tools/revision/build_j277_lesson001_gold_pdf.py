#!/usr/bin/env python3
"""Reproduce the approved four-A4-page J277 Lesson 001 booklet from Lesson 002's print master.
Lesson sequencing comes from the online lesson; the 128–1 place-value method and
the 47-denary check follow J277 Paper 1 V4 revision guide pages 89–90.
Only printed PDF assets are changed: never modify classroom lesson or Catch up.
"""
from pathlib import Path
import fitz

ROOT=Path(__file__).resolve().parents[2]
MASTER=ROOT/"offline/booklets/j277/J277_Lesson_002_Gold_Standard_4_Page.pdf"
OUTPUT=ROOT/"offline/booklets/j277/J277_Lesson_001_Gold_Standard_4_Page.pdf"
INK=(.10,.24,.27); BLUE=(.30,.57,.73); GREY=(.39,.46,.48)
RULE=(.74,.81,.81); PALE=(.935,.960,.961); TINT=(.94,.975,.96)
EDGE=(.71,.79,.81); WHITE=(1,1,1)

def box(p,x,y,w,h,fill=None,stroke=None,width=.65):
    p.draw_rect(fitz.Rect(x,y,x+w,y+h),color=stroke,fill=fill,width=width)

def line(p,x,y,x2=None,colour=RULE,width=.55):
    p.draw_line((x,y),(x2 if x2 is not None else 546,y),color=colour,width=width)

def text(p,s,x,y,size=8.7,bold=False,maxw=None,lead=1.38):
    font="hebo" if bold else "helv"
    parts=[]
    for part in str(s).split("\n"):
        if maxw:
            linebuf=""
            for word in part.split():
                trial=(linebuf+" "+word).strip()
                if linebuf and fitz.get_text_length(trial,fontname=font,fontsize=size)>maxw:
                    parts.append(linebuf);linebuf=word
                else:linebuf=trial
            parts.append(linebuf)
        else:parts.append(part)
    for part in parts:
        if part:p.insert_text((x,y),part,fontsize=size,fontname=font,color=INK)
        y+=size*lead
    return y

def section(p,s,y):
    box(p,45,y-9,2.2,15,BLUE)
    text(p,s,53,y+1,10.4,True)

def rules(p,y,n,step=16):
    for i in range(n):line(p,45,y+i*step)

def panel(p,x,y,w,h,shade=PALE,stroke=EDGE):
    box(p,x,y,w,h,shade,stroke)

def binary_row(p,y,pattern=None,blank=False,title="Eight-bit place values"):
    values=[128,64,32,16,8,4,2,1]
    cw=501/8
    text(p,title,45,y-3,8,True)
    y+=4
    for i,v in enumerate(values):
        x=45+i*cw
        box(p,x,y,cw,25,PALE if i%2==0 else TINT,EDGE,.45)
        tx=str(v)
        text(p,tx,x+cw/2-fitz.get_text_length(tx,fontname="hebo",fontsize=8)/2,y+10,8,True)
        if blank:
            p.draw_line((x+cw*.30,y+20),(x+cw*.70,y+20),color=GREY,width=.7)
        else:text(p,str(pattern)[i],x+cw/2-2.5,y+21,8.8,True)

def tick(p,x,y):
    box(p,x,y,7,7,WHITE,GREY,.65)

def answer(p,label,value,y):
    text(p,label,53,y+9,8.1,True)
    text(p,value,130,y+9,8.1,maxw=400)
    tick(p,533,y+2)
    line(p,51,y+16,545,(.88,.91,.91),.5)
    return y+16

def prepare(p):
    # Keep the original Lesson 002 approved header, pen icons and five-stage footer.
    # The old lesson's text must be removed, not obscured by a white overlay.
    p.add_redact_annot(fitz.Rect(40,54,573,782),fill=WHITE)
    p.add_redact_annot(fitz.Rect(488,16,574,32),fill=WHITE)
    p.apply_redactions(images=0,graphics=0,text=0)
    text(p,"LESSON 001",496,26,8.0,True)

def page_one(p):
    text(p,"Binary and Denary",45,75,15.4,True)
    for name,x,length in [("Name",45,125),("Class",194,72),("Date",300,69),("Time",403,64),("Teacher",490,76)]:
        text(p,name,x,99,8.1,True)
        line(p,x+len(name)*5.1+5,99,x+length)
    section(p,"Recall from earlier Computing",125)
    text(p,"Answer all four questions in BLACK PEN before reading the explanations.",45,146,8.3)
    text(p,"1. Which two digits are used in binary?",45,166,9.1);rules(p,184,2)
    text(p,"2. How many bits make one byte? Circle one answer: 4 / 8 / 16 / 32",45,225,8.85);rules(p,244,1)
    text(p,"3. Calculate 2 to the power of 4. Show your working.",45,278,8.85);rules(p,296,2)
    text(p,"4. Four ON/OFF switches: how many combinations are possible? Explain.",45,344,8.75);rules(p,364,3)
    section(p,"Today's objectives",426)
    panel(p,45,451,500,47)
    text(p,"Use 8-bit place values; convert binary to denary and back; explain why",54,469,8.8)
    text(p,"unsigned eight-bit numbers range from 0 to 255.",54,483,8.8)
    section(p,"Key vocabulary - read, cover, recall",520)
    entries=[("binary","Base 2: uses 0 and 1"),("denary","Base 10: uses digits 0-9"),
             ("bit","One binary digit"),("byte","Eight bits"),
             ("place value","Value from digit position"),("most significant bit","Highest-value bit on the left")]
    for i,(word,definition) in enumerate(entries):
        col,row=i%2,i//2
        x,y=45+255*col,543+37*row
        panel(p,x,y,245,33,TINT,None)
        text(p,word,x+9,y+12,8.4,True)
        text(p,definition,x+9,y+25,7.8)
    text(p,"Write: In your own words, explain what a byte is.",45,682,8.6,True)
    rules(p,700,3,17)

def page_two(p):
    text(p,"Learn & follow",45,76,15.2,True)
    section(p,"Binary place values",99)
    text(p,"Computers represent data using two states: 0 and 1. In binary, each column",45,126,9)
    text(p,"has double the value of the column on its right.",45,140,9)
    binary_row(p,159,"00000000")
    panel(p,45,205,501,36)
    text(p,"Eight bits give 256 patterns (2 to the power of 8). The unsigned",54,221,8.7)
    text(p,"range is 0-255 because counting starts at zero.",54,234,8.7)
    section(p,"I Do - Binary to denary",266)
    text(p,"Convert 11001010 into denary. Add the place values where the bit is 1.",45,290,8.9)
    binary_row(p,311,"11001010",title="Worked example")
    text(p,"128 + 64 + 8 + 2 = 202",45,359,9.3,True)
    section(p,"I Do - Denary to binary",389)
    text(p,"Convert denary 74 into eight-bit binary. Select 64 + 8 + 2.",45,413,8.9)
    binary_row(p,433,"01001010",title="Worked example")
    text(p,"74 = 01001010. Always include all eight bits, including leading zeros.",45,483,8.75)
    section(p,"We Do - Guided practice",515)
    text(p,"Convert 178 to unsigned eight-bit binary, starting with 128.",45,539,8.9)
    binary_row(p,556,blank=True,title="Complete the eight-bit chart")
    text(p,"178 = 128 + __________ + __________ + __________",45,614,8.9)
    text(p,"Eight-bit answer:",45,643,8.9,True);rules(p,658,2,19)
    text(p,"Check: Does your answer use exactly eight digits?",45,712,8.8)
    text(p,"Guide check: 47 = 32 + 8 + 4 + 2 + 1, so 47 = 00101111 in binary.",45,739,8.4)

def page_three(p):
    text(p,"Think & write",45,76,15.2,True)
    section(p,"Code First - Predict > Write > Test > Improve",101)
    text(p,"Start on paper. A print(...) instruction displays the calculated result.",45,126,8.8)
    text(p,"Predict: What would print(8 + 2 + 1) display?",45,150,8.7);rules(p,166,1)
    text(p,"Write: Write a print(...) instruction to display denary 10 (binary 1010).",45,190,8.7);rules(p,206,1)
    text(p,"Test and improve: Change the code below so it displays denary 9 (binary 1001).",45,231,8.7)
    panel(p,45,242,501,34)
    text(p,"value = 8 + 2 + 1",57,255,8.9,True)
    text(p,"print(value)",57,269,8.9,True);rules(p,293,1)
    section(p,"You Do - Independent practice",319)
    text(p,"1. Convert 01101001 to denary. Show your addition.",45,345,8.9);rules(p,365,2)
    text(p,"2. Convert 191 to unsigned eight-bit binary. Show the place values.",45,419,8.8);rules(p,438,2)
    text(p,"3. Someone claims 154 = 10011001. Convert their answer to denary,",45,486,8.75)
    text(p,"   explain their mistake and write the correct eight-bit binary for 154.",45,499,8.75);rules(p,517,3)
    text(p,"Thinking: Create an eight-bit number between 150 and 180",45,581,8.7)
    text(p,"(excluding both limits) with exactly four 1s. Explain your place values.",45,594,8.7);rules(p,612,2)
    section(p,"Exit Ticket - True or False?",657)
    for question,y in [("1. The largest unsigned eight-bit number is 256.",683),
                       ("2. A 1 bit contributes its place value to the total.",706),
                       ("3. print(8 + 2) would display 10.",729)]:
        text(p,question,45,y,8.4)
        tick(p,495,y-7);text(p,"T",505,y,7.8,True)
        tick(p,528,y-7);text(p,"F",538,y,7.8,True)

def page_four(p):
    text(p,"Review & improve",45,76,15.2,True)
    text(p,"GREEN PEN: Check pages 1-3. Tick correct answers. For an error, read the",45,99,8.4)
    text(p,"model answer and complete 'Try the question again' at the bottom.",45,112,8.4)
    section(p,"Page 1 - Do Now",136)
    y=158
    for k,v in [("Q1","0 and 1"),("Q2","8 bits in one byte"),
                ("Q3","16 (2 x 2 x 2 x 2)"),("Q4","16 combinations: 2 x 2 x 2 x 2")]: y=answer(p,k,v,y)
    section(p,"Page 1 - Vocabulary",243)
    y=264
    for k,v in [("Binary","Base-2 number system: digits 0 and 1"),
                ("Denary","Base-10 system: digits 0-9"),("Bit","One binary digit"),
                ("Byte","Eight bits"),("Place value","A digit's value depends on its position"),
                ("MSB","Highest-value bit on the left")]: y=answer(p,k,v,y)
    section(p,"Page 2 - We Do",380)
    y=403
    for k,v in [("178","128 + 32 + 16 + 2 = 178"),("Answer","10110010")]: y=answer(p,k,v,y)
    section(p,"Page 3 - Code First",447)
    y=471
    for k,v in [("Predict","11"),("Write","print(8 + 2) displays 10"),
                ("Improve","value = 8 + 1; print(value) displays 9")]: y=answer(p,k,v,y)
    section(p,"Page 3 - You Do / Exit Ticket",541)
    y=560
    for k,v in [("Q1","01101001 = 64 + 32 + 8 + 1 = 105"),
                ("Q2","191 = 128 + 32 + 16 + 8 + 4 + 2 + 1 = 10111111"),
                ("Q3","10011001 = 153; 154 is 10011010"),
                ("Thinking","Example: 10101010 = 170, with exactly four 1s"),
                ("Exit","False; True; True")]: y=answer(p,k,v,y)
    section(p,"Try the question again",668)
    text(p,"Choose one answer to improve. All correct? Choose the hardest.",45,691,8.6)
    text(p,"Copy the whole question:",45,710,8.3,True);rules(p,725,1)
    text(p,"Write a new answer in GREEN PEN. Show working if needed:",45,750,8.3,True);rules(p,763,1)

def main():
    assert MASTER.is_file(),"Approved Lesson 002 PDF is missing"
    d=fitz.open(MASTER)
    assert len(d)==4,"Master must have four A4 pages"
    for page,build in zip(d,[page_one,page_two,page_three,page_four]):
        prepare(page);build(page)
    d.set_metadata({"title":"J277 Lesson 001 - Binary and Denary - Gold Standard Printable Booklet",
                    "subject":"Four-page independently accessible printable lesson",
                    "creator":"RHS Learning Hub print standard"})
    OUTPUT.parent.mkdir(parents=True,exist_ok=True)
    d.save(OUTPUT,garbage=4,deflate=True)
    d.close()
    with fitz.open(OUTPUT) as result:
        assert len(result)==4
        pages=[p.get_text() for p in result]
        assert all(round(p.rect.width)==595 and round(p.rect.height)==842 for p in result)
        assert all("LESSON 001" in t and "BLACK PEN" in t and "GREEN PEN" in t
                   and "Review & Improve" in t for t in pages)
        assert "Binary and Denary" in pages[0] and "47 = 00101111" in pages[1]
        assert "Code First" in pages[2] and "Try the question again" in pages[3]
        assert all("LESSON 002" not in t and "Binary Addition and Shifts" not in t for t in pages)
    print("PASS: Lesson 001, approved layout, four A4 pages, model answers and writing space:",OUTPUT)

if __name__=="__main__":main()
