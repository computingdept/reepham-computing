#!/usr/bin/env python3
"""Publish more original-SVG H446 print drafts in batches of five.

Uses the already working pilot renderer; skips a lesson safely on conversion
error, retaining its existing Print link. No standalone audit artifacts.
Never modifies classroom lessons, revision guides or central navigation.
"""
import argparse,sys,json
from pathlib import Path
import fitz

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sys.path.insert(0,str(HERE))
import publish_h446_visual_pilot as pilot
from render_pdf import impose_a3

def publish(nums):
    catfile=ROOT/'offline/booklets/catalogue.json'
    cat=json.loads(catfile.read_text(encoding='utf-8'))
    passed=[];deferred=[]
    for start in range(0,len(nums),5):
        group=nums[start:start+5]
        print("GROUP",','.join(f'{n:03d}' for n in group),flush=True)
        for n in group:
            old=cat['lessons']['h446'].get(str(n))
            if not old or not old.get('print_bw'):
                deferred.append({'lesson':n,'reason':'No existing source Print PDF'});continue
            if old.get('status','').startswith('visual_pilot'):
                print(' KEEP',n,'already illustrated');continue
            pilot.SELECT[n]=None
            outputs={}
            created=[]
            try:
                figures=pilot.source_diagrams(n)
                if not figures:raise ValueError('No source SVG diagrams in printed phases')
                for mode in ('bw','colour'):
                    f,pages,extra,quality=pilot.compose(n,mode,old,figures)
                    a3=pilot.OUT/f'H446_Lesson_{n:03d}_VISUAL_PILOT_{mode.upper()}_A3_Booklet.pdf'
                    created.extend((f,a3))
                    spreads=impose_a3(f,a3)
                    expected=((pages+3)//4)*2
                    if spreads!=expected:raise ValueError('A3 imposition mismatch')
                    with fitz.open(f) as pdf:
                        if len(pdf)!=pages:raise ValueError('A4 page mismatch')
                        if sum(len(p.get_images(full=True)) for p in pdf)<len(figures):
                            raise ValueError('Source diagrams not embedded')
                    outputs[mode]={'a4':f,'a3':a3,'pages':pages,'spreads':spreads}
                if outputs['bw']['pages']!=outputs['colour']['pages']:
                    raise ValueError('Colour and BW page counts differ')
                entry=dict(old)
                entry.update({
                    'print_bw':outputs['bw']['a4'].relative_to(ROOT).as_posix(),
                    'learn_colour':outputs['colour']['a4'].relative_to(ROOT).as_posix(),
                    'booklet_bw':outputs['bw']['a3'].relative_to(ROOT).as_posix(),
                    'booklet_colour':outputs['colour']['a3'].relative_to(ROOT).as_posix(),
                    'a4_pages':outputs['bw']['pages'],
                    'a3_spreads':outputs['bw']['spreads'],
                    'status':'visual_draft_needs_teacher_review',
                    'teacher_approved':False,
                    'warnings':list(dict.fromkeys([
                      w for w in old.get('warnings',[]) if 'not embedded' not in w.lower()]+[
                      'Source SVG diagrams restored beside the relevant teaching phase',
                      'Teacher to confirm diagram accuracy, print readability and OCR examples before classroom delivery']))
                })
                cat['lessons']['h446'][str(n)]=entry
                passed.append({'lesson':n,'pages':entry['a4_pages'],'figures':len(figures)})
                print(' PASS',n,'pages',entry['a4_pages'],'figures',len(figures),flush=True)
            except Exception as exc:
                for f in created:
                    if f.is_file():f.unlink()
                reason=type(exc).__name__+': '+str(exc)
                deferred.append({'lesson':n,'reason':reason})
                print(' DEFER',n,reason,flush=True)
    catfile.write_text(json.dumps(cat,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    print('PUBLISHED',json.dumps(passed))
    print('DEFERRED',json.dumps(deferred))
    return passed,deferred

if __name__=='__main__':
    ap=argparse.ArgumentParser()
    ap.add_argument('lessons',type=int,nargs='+')
    args=ap.parse_args()
    publish(args.lessons)
