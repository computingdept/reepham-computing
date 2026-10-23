"""Native PDF worked stack and count-based circular-queue algorithms."""
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
import io

def build(w,h):
 for name,file in [('Body','DejaVuSans.ttf'),('Bold','DejaVuSans-Bold.ttf'),('Mono','DejaVuSansMono.ttf')]:pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+file))
 b=io.BytesIO();c=canvas.Canvas(b,pagesize=(w,h));ink=HexColor('#173f4a');blue=HexColor('#327b99');pale=HexColor('#eef5f7')
 def text(x,y,s,font='Body',size=9.3):c.setFillColor(ink);c.setFont(font,size);c.drawString(x,y,s)
 def lines(y,items,leading=15):
  for s in items:text(46,y,s);y-=leading
  return y
 def code(x,y,s):
  for line in s.splitlines():text(x,y,line,'Mono',8.8);y-=14
  return y
 def header(title,page,reference):
  c.setFillColor(blue);c.rect(0,h-27,w,10,fill=1,stroke=0);text(42,h-52,'OCR H446 / PAPER 2 / 2.3.1(e)',size=9);text(42,h-82,title,'Bold',21);text(42,43,reference,size=8);text(w-63,31,str(page),size=8)
 def table(y,heads,rows,xs,leading=24):
  c.setFillColor(pale);c.rect(42,y-6,w-84,23,fill=1,stroke=0)
  for x,s in zip(xs,heads):text(x,y,s,'Bold',9)
  for row in rows:
   y-=leading
   for x,s in zip(xs,row):text(x,y,str(s),'Mono',9)
  return y
 header('Stack algorithms: push and pop',121,'Lessons 020 and 049 / array pointers and LIFO behaviour')
 y=h-112;y=lines(y,['LIFO: the most recently pushed remaining item is removed first.', 'Convention: stack[0..capacity-1]; top is the last occupied index.', 'Initially top = -1. Empty: top = -1. Full: top = capacity - 1.'])
 y-=12;text(42,y,'WRITE THE ALGORITHM / Check before accessing the array','Bold',10);y-=23
 left='''procedure push(value)
  if top == capacity - 1 then
    error("overflow")
  else
    top = top + 1
    stack[top] = value
  endif
endprocedure'''
 right='''function pop()
  if top == -1 then
    error("underflow")
  else
    result = stack[top]
    top = top - 1
    return result
  endif
endfunction'''
 a=code(48,y,left);z=code(310,y,right);y=min(a,z)-10
 y=lines(y,['Algorithmic pseudocode: error reports failure and stops that operation.', 'State variables are shared by these operations. A failed operation changes no state.', 'Peek: after the empty check, return stack[top] without changing top.'],leading=14)
 y-=18;text(42,y,'I DO / Trace a stack of capacity 3','Bold',10);y-=25
 y=table(y,['Operation','top','Returned','Logical contents: bottom to top'],[('initial',-1,'-','empty'),('push(4)',0,'-','4'),('push(9)',1,'-','4, 9'),('pop()',0,9,'4'),('push(7)',1,'-','4, 7'),('peek()',1,7,'4, 7')],[50,190,265,355])
 y-=24;y=lines(y,['Pop reads the old top before decrementing it. Do not decrement first.', 'Removed values may remain physically in the array, but are outside the active stack.', 'Push and pop are O(1) for this fixed-capacity representation; no items are shifted.'])
 y-=14;text(42,y,'WE DO / Try the next operations','Bold',10);y-=23
 y=lines(y,['Continue with push(2), then push(6), then pop(). Give the state after each.', 'Check: push(2) gives top = 2 and contents 4, 7, 2. push(6) reports overflow;', 'the state stays unchanged. pop() returns 2, leaving top = 1 and contents 4, 7.', 'Empty pop/peek reports underflow. Handling these cases prevents invalid access.'])
 assert y>55,y;c.showPage()
 header('Queue algorithms: reuse the slots',122,'Lessons 020 and 050 / FIFO; extension from linear to circular indexing')
 y=h-112;y=lines(y,['FIFO: enqueue adds at the rear; dequeue removes from the front.', 'Lesson 020 starts with a linear queue. This circular version reuses freed slots.', 'Convention: front = oldest index; rear = newest index; count = occupied slots.', 'Initially front = 0, rear = -1, count = 0. Empty: count = 0; full: count = capacity.'])
 y-=12;text(42,y,'COUNT-BASED CIRCULAR QUEUE / capacity must be positive','Bold',10);y-=23
 left='''procedure enqueue(value)
  if count == capacity then
    error("overflow")
  else
    rear = (rear + 1) MOD capacity
    queue[rear] = value
    count = count + 1
  endif
endprocedure'''
 right='''function dequeue()
  if count == 0 then
    error("underflow")
  else
    result = queue[front]
    front = (front + 1) MOD capacity
    count = count - 1
    return result
  endif
endfunction'''
 a=code(48,y,left);z=code(310,y,right);y=min(a,z)-10
 y=lines(y,['Algorithmic pseudocode: shared state; error stops the operation without changing it.', 'Peek: after the empty check, return queue[front] without changing front or count.'],leading=14)
 y-=16;text(42,y,'I DO / Capacity 3: watch rear wrap from 2 to 0','Bold',10);y-=25
 y=table(y,['Operation','front','rear','count','Returned','FIFO order'],[('initial',0,-1,0,'-','empty'),('enqueue(A)',0,0,1,'-','A'),('enqueue(B)',0,1,2,'-','A, B'),('dequeue()',1,1,1,'A','B'),('enqueue(C)',1,2,2,'-','B, C'),('enqueue(D)',1,0,3,'-','B, C, D')],[49,197,259,314,375,463],leading=22)
 y-=24;y=lines(y,['Now queue[0]=D, queue[1]=B, queue[2]=C. Physical array order is not FIFO order.', 'front=1 identifies B as next; rear=0 identifies D as newest. The queue is full.', 'No shifting or resizing: each operation is O(1). MOD performs wraparound.'])
 y-=13;text(42,y,'WE DO / Continue from the full queue','Bold',10);y-=23
 y=lines(y,['Try enqueue(E); then dequeue(); then enqueue(E) again. Track all three counters.', 'Check: first enqueue reports overflow. Dequeue returns B: front=2, rear=0, count=2.', 'Next enqueue stores E at index 1: front=2, rear=1, count=3; FIFO order is C, D, E.', 'Use the stated convention: other valid queues use different rear/empty rules.'])
 assert y>55,y;c.save()
 # Execute independent state traces, including failure paths and wraparound.
 stack=[];capacity=3
 stack.append(4);stack.append(9);assert stack.pop()==9;stack.append(7);assert stack[-1]==7
 stack.append(2);before=stack.copy();assert len(stack)==capacity;assert stack==before;assert stack.pop()==2
 q=[None]*3;front=0;rear=-1;count=0
 def enqueue(v):
  nonlocal rear,count
  if count==3:return False
  rear=(rear+1)%3;q[rear]=v;count+=1;return True
 def dequeue():
  nonlocal front,count
  if count==0:return None
  v=q[front];front=(front+1)%3;count-=1;return v
 assert enqueue('A') and enqueue('B');assert dequeue()=='A';assert enqueue('C') and enqueue('D');assert (q,front,rear,count)==(['D','B','C'],1,0,3)
 assert not enqueue('E');assert dequeue()=='B';assert enqueue('E');assert (front,rear,count)==(2,1,3);assert [dequeue(),dequeue(),dequeue(),dequeue()]==['C','D','E',None]
 return b.getvalue()
