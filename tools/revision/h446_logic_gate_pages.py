"""Draw the two Lesson 026-aligned guide pages with native PDF gate diagrams."""
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
import io

def build(w,h):
 for name,file in [('Body','DejaVuSans.ttf'),('Bold','DejaVuSans-Bold.ttf'),('Mono','DejaVuSansMono.ttf')]:pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+file))
 buf=io.BytesIO();c=canvas.Canvas(buf,pagesize=(w,h));ink=HexColor('#173f4a');blue=HexColor('#327b99');pale=HexColor('#eef5f7')
 def text(x,y,s,font='Body',size=9.5):c.setFillColor(ink);c.setFont(font,size);c.drawString(x,y,s)
 def lines(y,items,leading=15):
  for s in items:text(46,y,s);y-=leading
  return y
 def header(title,spec,number):
  c.setFillColor(blue);c.rect(0,h-27,w,10,fill=1,stroke=0);text(42,h-52,'OCR H446 / PAPER 1 / '+spec,size=9);text(42,h-82,title,'Bold',21);text(42,43,'Revisit Lesson 026: New Learning and I Do.',size=8);text(w-63,31,str(number),size=8)
 def gate(x,y,kind):
  # Standard distinctive outline; input wires left, output Q right.
  c.setStrokeColor(ink);c.setLineWidth(1.3);p=c.beginPath()
  if kind=='NOT':
   p.moveTo(x,y-16);p.lineTo(x,y+16);p.lineTo(x+36,y);p.close();c.drawPath(p);c.circle(x+40,y,4,stroke=1,fill=0);c.line(x-21,y,x,y);c.line(x+44,y,x+67,y);text(x-32,y-3,'A',size=9)
  else:
   if kind=='AND':
    p.moveTo(x,y-17);p.lineTo(x,y+17);p.lineTo(x+20,y+17);p.curveTo(x+36,y+17,x+49,y+10,x+49,y);p.curveTo(x+49,y-10,x+36,y-17,x+20,y-17);p.close()
   else:
    p.moveTo(x,y-17);p.curveTo(x+22,y-17,x+36,y-11,x+49,y);p.curveTo(x+36,y+11,x+22,y+17,x,y+17);p.curveTo(x+12,y+6,x+12,y-6,x,y-17);p.close()
   c.drawPath(p)
   if kind=='XOR':
    q=c.beginPath();q.moveTo(x-6,y-17);q.curveTo(x+6,y-6,x+6,y+6,x-6,y+17);c.drawPath(q)
   for dy,label in [(9,'A'),(-9,'B')]:
    c.line(x-21,y+dy,x+(0 if kind=='AND' else 6),y+dy);text(x-32,y+dy-3,label,size=9)
   c.line(x+49,y,x+67,y)
  text(x+72,y-3,'Q',size=9)
 header('Logic gates: recognise the rule','1.4.3(d)',214)
 lines(h-110,['Inputs and outputs use 1 = true / on and 0 = false / off.', 'Read from inputs on the left to output Q on the right.'])
 for idx,(kind,rule,expr) in enumerate([('AND','Both inputs must be 1.','Q = A AND B'),('OR','At least one input must be 1.','Q = A OR B'),('NOT','Reverse one input.','Q = NOT A'),('XOR','Exactly one input must be 1.','Q = A XOR B')]):
  y=h-185-idx*82;c.setFillColor(pale);c.roundRect(42,y-33,w-84,72,4,fill=1,stroke=0);text(54,y+20,kind,'Bold',11);gate(126,y,kind);text(275,y+9,rule,size=9.5);text(275,y-12,expr,'Mono',10)
 y=h-532;text(42,y,'TRUTH TABLES / List every input combination','Bold',11);y-=27
 heads=['A','B','AND','OR','XOR'];xs=[58,115,192,280,370]
 for x,label in zip(xs,heads):text(x,y,label,'Bold',10)
 for j,(a,b) in enumerate([(0,0),(0,1),(1,0),(1,1)]):
  yy=y-24-j*23
  for x,v in zip(xs,[a,b,a&b,a|b,a^b]):text(x,yy,str(v),'Mono',11)
 text(449,y,'A   NOT A','Bold',10);text(449,y-24,'0     1','Mono',11);text(449,y-47,'1     0','Mono',11)
 y-=128;lines(y,['Two inputs give 2² = 4 rows; one input gives 2¹ = 2 rows.', 'OR includes the case 1 OR 1 = 1. XOR gives 1 XOR 1 = 0.', 'NOT has one input; the small output circle means inversion.', 'Symbol shorthand: AND = ∧, OR = ∨, NOT = ¬, XOR = ⊻.'])
 c.showPage()
 header('From a problem to a truth table','1.4.3(a), (d)',215)
 y=h-112;text(42,y,'I DO / Secure door access - Lesson 026 model','Bold',11);y-=23
 y=lines(y,['A door unlocks when a valid card OR a correct PIN is used, but only when', 'the building is open and lockdown is not active.', 'Name inputs: A = valid card; B = correct PIN; C = open; D = lockdown.', 'Name output: Q = door unlocks.'])
 y-=10;text(42,y,'BUILD THE EXPRESSION IN CHUNKS','Bold',10);y-=22
 y=lines(y,['1. Alternatives: A OR B. Both may be true, so use OR rather than XOR.', '2. Required condition: AND C. Exception: AND (NOT D).', '3. Combine: Q = (A OR B) AND C AND (NOT D).', 'Gate plan: OR(A, B), then AND with C; invert D; final AND gives Q.'])
 y-=12;text(42,y,'CHECK ALL 16 ROWS / Use intermediate columns','Bold',10);y-=24
 xs=[53,93,133,173,235,338,460];heads=['A','B','C','D','A OR B','NOT D','Q']
 c.setFillColor(pale);c.rect(42,y-6,w-84,23,fill=1,stroke=0)
 for x,label in zip(xs,heads):text(x,y,label,'Bold',9.5)
 y-=21
 outputs=[]
 for i in range(16):
  a,b1,c1,d=[(i>>k)&1 for k in [3,2,1,0]];v=(a|b1)&c1&(1-d);outputs.append(v)
  for x,n in zip(xs,[a,b1,c1,d,a|b1,1-d,v]):text(x,y,str(n),'Mono',10)
  y-=17
 y-=8;y=lines(y,['Example row 0110: A OR B = 1, C = 1, NOT D = 1, so Q = 1.', 'Example row 1111: lockdown is active, so NOT D = 0 and Q = 0.'])
 y-=10;text(42,y,'WE DO / A different three-input problem','Bold',10);y-=23
 y=lines(y,['A warning W is on when temperature is high (T) OR smoke is detected (S),', 'provided maintenance mode (M) is not active. Write W and test T=0, S=1, M=0.', 'Check after trying: W = (T OR S) AND (NOT M); the stated input gives W = 1.', 'A complete table would need 2³ = 8 rows. Write T OR S and NOT M first.'])
 assert y>57,y
 c.save();assert outputs==[0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0]
 return buf.getvalue()
