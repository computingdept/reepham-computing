/* Legacy compatibility. The single source of truth is exam-practice.json.
   Use optional-worksheet.html for printable questions and Lesson 029 for TV. */
fetch('exam-practice.json',{cache:'no-cache'}).then(r=>r.json()).then(data=>{window.RHSCExamPractice=data;}).catch(()=>{});
