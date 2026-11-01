from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
import os, json
OUT='offline/booklets/h446'
os.makedirs(OUT,exist_ok=True)
pdfmetrics.registerFont(TTFont('Lato','/usr/share/fonts/truetype/lato/Lato-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LatoBold','/usr/share/fonts/truetype/lato/Lato-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Mono','/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
W,H=A4
INK=HexColor('#1B352E'); GREEN=HexColor('#0D624D'); BLUE=HexColor('#376B93'); GREY=HexColor('#557065'); LINE=HexColor('#C7D8CE'); PALE=HexColor('#F1F6F3')
M=48

def lines(c,y,n=4,x=M,width=W-2*M,spacing=21):
    c.setStrokeColor(LINE);c.setLineWidth(.55)
    for j in range(n):
        yy=y-j*spacing;c.line(x,yy,x+width,yy)
    return y-n*spacing-8

def paragraph(c,txt,y,fs=10.7,leading=15.5,x=M,maxw=W-2*M,font='Lato',color=INK):
    c.setFillColor(color);c.setFont(font,fs)
    for row in txt.split('\n'):
        if not row:
            y-=leading*.6;continue
        wrap=simpleSplit(row,font,fs,maxw)
        for line in wrap:
            c.drawString(x,y,line);y-=leading
    return y

def label(c,txt,y,x=M):
    c.setFont('LatoBold',9.3);c.setFillColor(BLUE);c.drawString(x,y,txt.upper());return y-18

def heading(c,txt,y,fs=14):
    c.setFont('LatoBold',fs);c.setFillColor(INK);c.drawString(M,y,txt);return y-21

def note(c,txt,y):
    wrap=simpleSplit(txt,'Lato',9.5,W-2*M-24)
    h=25+14*len(wrap)
    c.setFillColor(PALE);c.roundRect(M,y-h+12,W-2*M,h,7,stroke=0,fill=1)
    c.setFillColor(GREY);c.setFont('Lato',9.5)
    for row in wrap:
        c.drawString(M+12,y,row);y-=14
    return y-19

def question(c,y,num,title,body,work=3,marks=''):
    c.setFont('LatoBold',11.2);c.setFillColor(GREEN)
    tag=f'{num}. {title}' + (f'  [{marks} marks]' if marks else '')
    c.drawString(M,y,tag);y-=21
    y=paragraph(c,body,y,fs=10.5,leading=15.3)
    y-=17
    if work:y=lines(c,y,n=work,spacing=22)
    return y-9

def page(c,num,lesson,stage,title,blurb=''):
    c.setFillColor(GREEN);c.rect(0,H-12,W,12,fill=1,stroke=0)
    c.setFont('LatoBold',10);c.setFillColor(GREEN);c.drawString(M,H-38,'RHS COMPUTING')
    c.setFont('Lato',9);c.setFillColor(GREY);c.drawRightString(W-M,H-38,f'OCR H446  |  LESSON {lesson:03d}  |  PRINT DRAFT')
    c.setStrokeColor(LINE);c.line(M,H-51,W-M,H-51)
    c.setFillColor(BLUE);c.setFont('LatoBold',9.4);c.drawString(M,H-79,stage.upper())
    c.setFillColor(INK);c.setFont('LatoBold',19);c.drawString(M,H-108,title)
    y=H-134
    if blurb:y=paragraph(c,blurb,y,fs=10,leading=14,color=GREY)-7
    c.setStrokeColor(LINE);c.line(M,49,W-M,49)
    c.setFillColor(GREY);c.setFont('Lato',8.5);c.drawString(M,33,'BLACK PEN: complete your work  |  GREEN PEN: check, correct and explain')
    c.drawRightString(W-M,33,f'{num} / 8')
    return y

def ensure(y,i):
    if y<58:raise ValueError(f'Page {i} overflows: y={y}')

def make(data):
    n=data['number'];f=f'{OUT}/H446_Lesson_{n:03d}_8PAGE_REVIEW_BW_A4.pdf';c=canvas.Canvas(f,pagesize=A4,pageCompression=1)
    c.setTitle(f'H446 Lesson {n:03d} - 8-page student print draft');c.setAuthor('RHS Computing')
    y=page(c,1,n,'Do Now - Recall',data['title'], 'Answer all four retrieval questions from previous lessons. Use black pen.')
    c.setFont('Lato',9.7);c.setFillColor(INK)
    c.drawString(M,y-2,'Name: ______________________________________   Class: __________   Date: __________');y-=36
    for i,(t,b) in enumerate(data['donow'],1):y=question(c,y,i,t,b,work=3)
    ensure(y,1);c.showPage()
    y=page(c,2,n,'Do Now - Check / Objectives', 'Correct and improve', 'Complete page 1 before looking at these model answers. Tick correct work in green; correct mistakes fully.')
    for i,(t,ans) in enumerate(data['answers'],1):
        y=label(c,f'{i}. {t}',y)
        y=paragraph(c,ans,y,fs=10.6,leading=15.5)-10
    y-=5;y=heading(c,'Today: you should be able to…',y,fs=12)
    for aim in data['objectives']:
        y=paragraph(c,'• '+aim,y,fs=10.1,leading=15)-2
    y-=5;y=heading(c,'Key vocabulary',y,fs=12)
    for term,meaning in data['vocab']:
        y=paragraph(c,term+' — '+meaning,y,fs=9.7,leading=14)-2
    y-=19;y=heading(c,'GREEN PEN - Improve one response',y,fs=12)
    y=paragraph(c,'Choose a Do Now answer you corrected. Explain the exact misconception and write a stronger answer below.',y,fs=10,leading=15)-10
    y=lines(c,y,5)
    ensure(y,2);c.showPage()
    y=page(c,3,n,'New Learning / I Do','Read and annotate','Read the explanations, underline important terminology and add your own examples.')
    for title,body in data['theory']:
        y=heading(c,title,y,fs=12.2);y=paragraph(c,body,y,fs=10.8,leading=16)-18
    y=note(c,data['theorynote'],y)
    y=heading(c,'Explain in your own words',y,fs=12)
    y=paragraph(c,data['theorytask'],y,fs=10.3,leading=16)-9
    y=lines(c,y,7)
    ensure(y,3);c.showPage()
    y=page(c,4,n,'I Do - Worked Example',data['example_title'],'Follow the complete worked example. Each step explains the reasoning, not just the result.')
    for ix,(name,work,reason) in enumerate(data['example'],1):
        y=label(c,f'Step {ix} · {name}',y)
        y=paragraph(c,work,y,fs=11.2,leading=17,font='Mono')-3
        y=paragraph(c,reason,y,fs=10,leading=15,color=GREY)-20
    y=note(c,data['example_check'],y)
    y=heading(c,'Now repeat the method independently',y,fs=11.6)
    y=paragraph(c,data['exampletask'],y,fs=10.3,leading=16)-12
    y=lines(c,y,7)
    ensure(y,4);c.showPage()
    y=page(c,5,n,'We Do - Guided Practice','Try, compare, improve','Attempt each task. Discuss the method before checking with your teacher; show working, not only final answers.')
    for i,(t,b) in enumerate(data['guided'],1):y=question(c,y,i,t,b,work=5)
    ensure(y,5);c.showPage()
    y=page(c,6,n,'You Do - Exam Practice','Independent questions · Part 1','Use examination-style working. Do not look at model answers while you attempt these tasks.')
    for i,(t,b,m) in enumerate(data['exam'][:2],1):y=question(c,y,i,t,b,work=9,marks=m)
    ensure(y,6);c.showPage()
    y=page(c,7,n,'You Do - Exam Practice','Independent questions · Part 2','Read the command words carefully. Where asked to explain, give the reason and use the correct technical language.')
    for i,(t,b,m) in enumerate(data['exam'][2:],3):y=question(c,y,i,t,b,work=4,marks=m)
    ensure(y,7);c.showPage()
    y=page(c,8,n,'Exit Ticket / Reflection','Check your understanding','Write T or F and justify any false statement. Show your teacher your answers before checking.')
    for i,(t,b) in enumerate(data['exit'],1):y=question(c,y,i,t,b,work=2)
    y-=6;y=heading(c,'Self-assessment',y,fs=12)
    y=paragraph(c,'Circle one:  Confident   /   Nearly there   /   Need more help',y,fs=10.5,leading=18)-10
    y=heading(c,'GREEN PEN - Correct and explain',y,fs=12)
    y=paragraph(c,'Choose one error from your work. Rewrite the correct method and explain why your first answer was incorrect.',y,fs=10,leading=15)-10
    y=lines(c,y,5)
    ensure(y,8);c.showPage();c.save()
    return f

L2={
'number':2,'title':'Signed integers and binary arithmetic',
'donow':[
 ('Choose a type','State the most suitable data type for a count of passengers and for whether a door is open.'),
 ('Keep leading zeros','A room identifier is "0037". Choose its data type and justify why integer is unsuitable.'),
 ('Read an unsigned byte','Convert 10100110 (base 2) to denary. Show your place-value sum.'),
 ('Can it fit?','Write 200 in unsigned eight-bit binary. Explain why 300 will not fit in eight bits.')],
'answers':[
 ('Choose a type','Integer for the passenger count; Boolean for whether a door is open.'),
 ('Keep leading zeros','String. An integer would remove the leading zeros, changing the identifier.'),
 ('Read an unsigned byte','128 + 32 + 4 + 2 = 166.'),
 ('Can it fit?','200 = 11001000. An eight-bit unsigned integer ranges from 0 to 255, so 300 cannot fit.')],
'objectives':['Represent positive and negative integers using sign magnitude and two’s complement.','Add and subtract fixed-width signed binary integers.','Identify overflow and justify the range of a signed representation.'],
'vocab':[('Sign magnitude','Sign bit followed by the magnitude.'),('Two’s complement','Signed representation with a negative most significant place value.'),('Overflow','A mathematical result lies outside the representable range.'),('Negation','Changing a number to its additive inverse.')],
'theory':[
 ('Two signed representations','In eight-bit sign magnitude, the leftmost bit indicates the sign: 0 positive; 1 negative. The other seven bits show magnitude. For example, 10000101 represents -5. Sign magnitude has two representations of zero.'),
 ('Two’s-complement place values','Eight-bit two’s complement has weights -128, 64, 32, 16, 8, 4, 2, 1. The pattern 11111011 gives -128 + 64 + 32 + 16 + 8 + 2 + 1 = -5. The range is -128 to +127.'),
 ('Negation and subtraction','To negate an eight-bit number, invert every bit and add one. To calculate A - B, add A to the two’s complement of B, keeping the width fixed.'),
 ('Carry is not the same as signed overflow','For signed eight-bit addition, an out-of-range mathematical result causes signed overflow. Two positive values producing a negative stored result (or vice versa) indicates overflow.')],
'theorynote':'Always state whether a bit pattern is unsigned, sign magnitude or two’s complement before interpreting it.',
'theorytask':'Compare 10000101 as an eight-bit sign-magnitude value and as an eight-bit two’s-complement value. Explain why the values differ.',
'exampletask':'Repeat the representation method for -21 in both eight-bit sign magnitude and eight-bit two’s complement. Show the check.',
'example_title':'Represent -13 in two ways',
'example':[
 ('Start with positive 13','00001101','13 = 8 + 4 + 1. Write the fixed-width positive value first.'),
 ('Sign magnitude','10001101','Change the sign bit to 1; preserve the seven-bit magnitude.'),
 ('Invert bits','11110010','Invert every bit of the positive eight-bit pattern.'),
 ('Add one','11110011','The two’s-complement representation of -13 is 11110011.')],
'example_check':'Check: -128 + 64 + 32 + 16 + 2 + 1 = -13. Both representations encode the same value using different rules.',
'guided':[
 ('Interpret a negative value','Convert 11100110 from eight-bit two’s complement to denary. Use signed place values.'),
 ('Add signed binary numbers','Calculate 00010111 + 00010011. Give the eight-bit result and explain whether signed overflow occurs.'),
 ('Subtract using negation','Calculate 12 - 19 using eight-bit two’s complement. Show the negation of 19 and the addition.')],
'exam':[
 ('Two representations','Represent -37 in (a) sign magnitude [2] and (b) two’s complement [2]. Show the positive binary value and the method for each.','4'),
 ('Interpret the same pattern','Determine the denary value of 10010110 interpreted as (a) unsigned [2], (b) sign magnitude [2] and (c) two’s complement [2]. Show working.','6'),
 ('Signed addition','Add 00101101 and 00011011 as two’s-complement integers. Show working, stored result, denary value and whether overflow occurs.','4'),
 ('Subtraction','Calculate 18 - 29 using eight-bit two’s complement. Show +29, -29, the addition and signed denary result.','5'),
 ('Explain overflow','01110000 + 00100000 are added as eight-bit two’s-complement values. State their denary values and stored result. Explain overflow and give the minimum signed bit width needed for the correct total.','5')],
'exit':[
 ('Range','In eight-bit two’s complement the signed range is -128 to +127.'),
 ('Carry and overflow','A carry out of the leftmost bit always means signed overflow.'),
 ('Negation','Two’s complement negation in a fixed width uses invert-all-bits, then add one.')]
}
L4={
'number':4,'title':'Denary to floating point',
'donow':[
 ('Choose a type','Which data type is suitable for a measured temperature of 12.75 degrees Celsius?'),
 ('Convert hexadecimal','Convert 3C (base 16) to eight-bit binary and denary.'),
 ('Two’s complement','Represent -26 as an eight-bit two’s-complement integer. Show your method.'),
 ('Explain a fixed-width shift','Logically shift 10110000 one place left in an unsigned byte. Give the stored result and explain why the value is not simply doubled.')],
'answers':[
 ('Choose a type','Real / floating point, because the value has a fractional part.'),
 ('Convert hexadecimal','3C = 00111100 (binary) = 60 (denary).'),
 ('Two’s complement','+26 = 00011010; invert to 11100101; add one: 11100110.'),
 ('Explain a fixed-width shift','01100000 (= 96). The leading 1 is discarded; 176 x 2 exceeds the unsigned-byte maximum of 255.')],
'objectives':['Convert denary values, including fractions, to binary.','Represent normalised floating-point values with an eight-bit two’s-complement mantissa and a four-bit two’s-complement exponent.','Normalise a mantissa without altering the represented value.'],
'vocab':[('Mantissa','Signed fractional field holding significant binary digits.'),('Exponent','Signed power of two scaling the mantissa.'),('Normalisation','Shifting redundant leading sign bits away while preserving the value.'),('Precision','Detail that can be stored in significant bits.'),('Range','Span of representable values.')],
'theory':[
 ('Binary fractions','Binary places after the point are 1/2, 1/4, 1/8, 1/16 and so on. Example: 6.5 is 110.1 in binary; 0.375 is 0.011.'),
 ('Our OCR teaching format','The value is stored as an eight-bit two’s-complement mantissa and a four-bit two’s-complement exponent. Value = mantissa x 2^exponent. The binary point is immediately after the mantissa sign bit. No biased exponent is used.'),
 ('Normalised patterns','A positive normalised nonzero mantissa begins 01. A negative normalised mantissa begins 10. Shift left to remove repeated leading sign bits and decrease the exponent by the number of shifts.'),
 ('Precision versus range','More mantissa bits improve precision. More exponent bits extend range. Zero uses all-zero fields as a special case.')],
'theorynote':'For this lesson: mantissa bits have weights -1, 1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128. Exponent bits have weights -8, 4, 2, 1.',
'theorytask':'Explain why a positive normalised mantissa starts with 01. Then describe what must happen to the exponent if the mantissa shifts left.',
'exampletask':'Repeat the method for +5.5, using an eight-bit two’s-complement mantissa and a four-bit two’s-complement exponent.',
'example_title':'Represent +6.5 in normalised form',
'example':[
 ('Convert to binary','6.5 = 110.1 (base 2)','The whole part is 110; the half is the fractional bit .1.'),
 ('Move the binary point','110.1 = 0.1101 x 2^3','Shift three places to the left to form a normalised positive fraction.'),
 ('Write the mantissa','01101000','The eight-bit fraction 0.1101 is padded with zeros on the right.'),
 ('Write exponent','0011','The four-bit two’s-complement exponent for +3 is 0011.')],
'example_check':'Stored pair: 01101000 0011. Check: mantissa 0.8125 x 2^3 = 0.8125 x 8 = 6.5.',
'guided':[
 ('Convert a small fraction','Represent +0.15625 using the eight-bit mantissa / four-bit exponent format. Show the binary fraction, normalisation and two fields.'),
 ('Negative value','Represent -6.5 in normalised floating-point form. Start from the positive representation, then negate the mantissa.'),
 ('Normalise a pattern','Normalise 00011010 0101 by shifting the mantissa and adjusting the exponent. Check that the value is preserved.')],
'exam':[
 ('Positive conversions','Represent (a) 10.5 and (b) 0.375 in normalised floating-point form using eight-bit mantissa and four-bit exponent. Show working and fields.','4'),
 ('Negative conversions','Represent (a) -10.5 and (b) -0.375 in the same format. Show binary conversion, mantissa negation and final fields.','6'),
 ('Normalise fields','Write 00001011 0111 in normalised floating-point form. Show each shift and exponent adjustment. Adapted from OCR June 2024 Q4(d).','4'),
 ('Diagnose the mistake','A pupil changes 00101000 0011 into 01010000 0011 and calls it normalisation. Explain why its value changed, correct the exponent and give the correct pattern.','4'),
 ('Boundary value','Represent -0.5 in normalised form with an eight-bit two’s-complement mantissa and four-bit two’s-complement exponent.','2')],
'exit':[
 ('Precision','Increasing the number of mantissa bits can improve floating-point precision.'),
 ('Normalisation','Left-shifting the mantissa while leaving the exponent unchanged always preserves value.'),
 ('Patterns','A normalised nonzero negative two’s-complement mantissa begins with 10.')]
}
if __name__=='__main__':
    from pypdf import PdfReader
    result=[]
    for data in [L2,L4]:
        path=make(data);rd=PdfReader(path)
        result.append({'path':path,'pages':len(rd.pages),'bytes':os.path.getsize(path),'per_page_text':[len(p.extract_text()) for p in rd.pages]})
    print(json.dumps(result,indent=2))
