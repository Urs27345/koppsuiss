const KEY = 'salut_urs_data_v1';
const $ = id => document.getElementById(id);
const nowIso = () => new Date().toISOString();
const fmt = iso => new Date(iso).toLocaleString('de-DE');
const emptyDb = () => ({bp:[], glucose:[], weight:[], eye:[], meds:[]});
function loadDb(){try{return JSON.parse(localStorage.getItem(KEY)) || emptyDb()}catch(e){return emptyDb()}}
function saveDb(db){localStorage.setItem(KEY, JSON.stringify(db)); renderAll()}
function getSymptoms(){return [...document.querySelectorAll('.bpSymptom:checked')].map(x=>x.value)}
function resetInputs(ids){ids.forEach(id=>{const el=$(id); if(el) el.value=''})}
function uid(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {e.preventDefault(); deferredPrompt=e; $('installBtn').classList.remove('hidden')});
$('installBtn').onclick = async ()=>{ if(deferredPrompt){ deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; $('installBtn').classList.add('hidden') }};
if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js').catch(()=>{}) }

document.querySelectorAll('.tabs button').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));$(btn.dataset.tab).classList.add('active')});

let bpImageData = '';
$('bpPhoto').addEventListener('change', async e=>{
  const file = e.target.files[0]; if(!file) return;
  bpImageData = await resizeImage(file, 900, .72);
  $('bpPreview').src = bpImageData; $('bpPreview').classList.remove('hidden');
});
async function resizeImage(file, max=900, quality=.72){
  const bitmap = await createImageBitmap(file); const ratio = Math.min(max/bitmap.width, max/bitmap.height, 1);
  const canvas = document.createElement('canvas'); canvas.width = Math.round(bitmap.width*ratio); canvas.height = Math.round(bitmap.height*ratio);
  const ctx = canvas.getContext('2d'); ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);
  return canvas.toDataURL('image/jpeg', quality);
}
$('ocrBtn').onclick = async ()=>{
  if(!bpImageData){ alert('Bitte zuerst ein Foto aufnehmen.'); return; }
  if(!window.Tesseract){ alert('OCR-Bibliothek nicht geladen. Internetverbindung prüfen oder Werte manuell eintragen.'); return; }
  $('ocrStatus').textContent='Erkennung läuft...';
  try{
    const result = await Tesseract.recognize(bpImageData, 'eng', { logger:m=>{ if(m.status) $('ocrStatus').textContent=m.status }});
    const text = result.data.text || '';
    const nums = (text.match(/\b\d{2,3}\b/g)||[]).map(Number).filter(n=>n>=30 && n<=260);
    // Heuristik: systolisch meist größte Zahl, DIA 45-130, Puls 40-160.
    const sorted = [...nums].sort((a,b)=>b-a);
    let sys = sorted.find(n=>n>=90 && n<=240);
    let dia = nums.find(n=>n>=45 && n<=140 && n!==sys);
    let pulse = nums.reverse().find(n=>n>=40 && n<=160 && n!==sys && n!==dia);
    if(sys) $('sys').value=sys; if(dia) $('dia').value=dia; if(pulse) $('pulse').value=pulse;
    $('ocrStatus').textContent = nums.length ? 'Erkannt. Bitte Werte prüfen.' : 'Keine Werte erkannt. Bitte manuell eintragen.';
  } catch(e){ $('ocrStatus').textContent='OCR fehlgeschlagen. Bitte manuell eintragen.' }
};

$('saveBp').onclick = ()=>{
  const sys=Number($('sys').value), dia=Number($('dia').value), pulse=Number($('pulse').value);
  if(!sys || !dia || !pulse){ alert('SYS, DIA und Puls eingeben.'); return; }
  const db=loadDb(); db.bp.unshift({id:uid(), date:nowIso(), sys,dia,pulse, medTiming:$('medTiming').value, med:$('bpMed').value, arm:$('arm').value, situation:$('situation').value, symptoms:getSymptoms(), note:$('bpNote').value, photo:bpImageData}); saveDb(db);
  resetInputs(['sys','dia','pulse','bpMed','bpNote']); document.querySelectorAll('.bpSymptom').forEach(x=>x.checked=false); bpImageData=''; $('bpPreview').classList.add('hidden'); $('ocrStatus').textContent='';
};
$('saveGlucose').onclick=()=>{const v=Number($('glucoseValue').value); if(!v){alert('Blutzuckerwert eingeben.');return} const db=loadDb(); db.glucose.unshift({id:uid(),date:nowIso(),value:v,context:$('glucoseContext').value,note:$('glucoseNote').value}); saveDb(db); resetInputs(['glucoseValue','glucoseNote'])};
$('saveWeight').onclick=()=>{const v=Number($('weightValue').value); if(!v){alert('Gewicht eingeben.');return} const db=loadDb(); db.weight.unshift({id:uid(),date:nowIso(),weight:v,waist:$('waistValue').value,note:$('weightNote').value}); saveDb(db); resetInputs(['weightValue','waistValue','weightNote'])};
$('saveEye').onclick=()=>{const db=loadDb(); db.eye.unshift({id:uid(),date:nowIso(),iodOd:$('iodOd').value,iodOs:$('iodOs').value,vision:$('vision').value,eyeDrops:$('eyeDrops').value,taken:$('eyeDropsTaken').value,note:$('eyeNote').value}); saveDb(db); resetInputs(['iodOd','iodOs','vision','eyeDrops','eyeNote'])};
$('saveMed').onclick=()=>{if(!$('medName').value.trim()){alert('Medikamentenname eingeben.');return} const db=loadDb(); db.meds.unshift({id:uid(),date:nowIso(),name:$('medName').value,category:$('medCategory').value,dose:$('medDose').value,time:$('medTime').value,note:$('medNote').value}); saveDb(db); resetInputs(['medName','medDose','medTime','medNote'])};

function del(type,id){const db=loadDb(); db[type]=db[type].filter(x=>x.id!==id); saveDb(db)}
window.del=del;
function table(rows, headers, mapper, type){ if(!rows.length) return '<p class="muted">Keine Daten.</p>'; return '<div class="table-wrap"><table><thead><tr>'+headers.map(h=>`<th>${h}</th>`).join('')+'<th></th></tr></thead><tbody>'+rows.map(r=>'<tr>'+mapper(r).map(c=>`<td>${c??''}</td>`).join('')+`<td><button onclick="del('${type}','${r.id}')">Löschen</button></td></tr>`).join('')+'</tbody></table></div>' }
function renderAll(){ const db=loadDb();
  const last=db.bp[0]; $('lastBp').innerHTML=last?`${last.sys}/${last.dia} mmHg, Puls ${last.pulse}<br><span class="muted">${fmt(last.date)}</span>`:'Noch keine Messung';
  const since=Date.now()-7*864e5; const bp7=db.bp.filter(x=>new Date(x.date).getTime()>=since); if(bp7.length){const a=bp7.reduce((s,x)=>({sys:s.sys+x.sys,dia:s.dia+x.dia,pulse:s.pulse+x.pulse}),{sys:0,dia:0,pulse:0}); $('avg7').textContent=`${Math.round(a.sys/bp7.length)}/${Math.round(a.dia/bp7.length)} mmHg, Puls ${Math.round(a.pulse/bp7.length)}`;} else $('avg7').textContent='Noch keine Daten';
  $('lastGlucose').innerHTML=db.glucose[0]?`${db.glucose[0].value} mg/dL (${db.glucose[0].context})<br><span class="muted">${fmt(db.glucose[0].date)}</span>`:'Noch keine Messung';
  $('lastWeight').innerHTML=db.weight[0]?`${db.weight[0].weight} kg<br><span class="muted">${fmt(db.weight[0].date)}</span>`:'Noch keine Messung';
  $('bpTable').innerHTML=table(db.bp,['Datum','SYS/DIA','Puls','Tablette','Situation','Symptome','Notiz'],r=>[fmt(r.date),warnBp(r),r.pulse,r.medTiming+(r.med?'<br>'+esc(r.med):''),r.situation,esc((r.symptoms||[]).join(', ')),esc(r.note)],'bp');
  $('glucoseTable').innerHTML=table(db.glucose,['Datum','Wert','Zeitpunkt','Notiz'],r=>[fmt(r.date),r.value+' mg/dL',r.context,esc(r.note)],'glucose');
  $('weightTable').innerHTML=table(db.weight,['Datum','Gewicht','Bauchumfang','Notiz'],r=>[fmt(r.date),r.weight+' kg',r.waist? r.waist+' cm':'',esc(r.note)],'weight');
  $('eyeTable').innerHTML=table(db.eye,['Datum','IOD OD','IOD OS','Visus','Tropfen','Notiz'],r=>[fmt(r.date),r.iodOd,r.iodOs,esc(r.vision),esc(r.eyeDrops)+' '+esc(r.taken),esc(r.note)],'eye');
  $('medTable').innerHTML=table(db.meds,['Datum','Name','Kategorie','Dosis','Uhrzeit','Notiz'],r=>[fmt(r.date),esc(r.name),r.category,esc(r.dose),r.time,esc(r.note)],'meds');
  drawChart(db.bp.slice().reverse().slice(-30));
}
function esc(s=''){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
function warnBp(r){let cls=(r.sys>=180||r.dia>=120)?'danger':''; return `<span class="${cls}">${r.sys}/${r.dia}</span>`}
function drawChart(data){ const el=$('chart'); if(data.length<2){el.innerHTML='<p class="muted">Mindestens zwei Blutdruckmessungen für Diagramm nötig.</p>'; return}
  const w=900,h=260,p=34; const vals=data.flatMap(d=>[d.sys,d.dia]); const min=Math.max(40,Math.min(...vals)-10), max=Math.max(...vals)+10; const x=i=>p+i*(w-2*p)/(data.length-1); const y=v=>h-p-(v-min)*(h-2*p)/(max-min); const path=key=>data.map((d,i)=>(i?'L':'M')+x(i)+','+y(d[key])).join(' ');
  el.innerHTML=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Blutdruckverlauf"><line x1="${p}" y1="${h-p}" x2="${w-p}" y2="${h-p}" stroke="#cbd5e1"/><line x1="${p}" y1="${p}" x2="${p}" y2="${h-p}" stroke="#cbd5e1"/><path d="${path('sys')}" fill="none" stroke="#0f766e" stroke-width="4"/><path d="${path('dia')}" fill="none" stroke="#2563eb" stroke-width="4"/><text x="${p}" y="20" fill="#0f766e">SYS</text><text x="${p+50}" y="20" fill="#2563eb">DIA</text></svg>`}

$('exportCsv').onclick=()=>{const db=loadDb(); const rows=[['Datum','SYS','DIA','Puls','Tablette','Medikament','Arm','Situation','Symptome','Notiz'],...db.bp.map(r=>[fmt(r.date),r.sys,r.dia,r.pulse,r.medTiming,r.med,r.arm,r.situation,(r.symptoms||[]).join('|'),r.note])]; download('salut_urs_blutdruck.csv', rows.map(r=>r.map(csv).join(';')).join('\n'),'text/csv')};
$('backupJson').onclick=()=>download('salut_urs_backup.json', JSON.stringify(loadDb(),null,2),'application/json');
function csv(x){return '"'+String(x??'').replace(/"/g,'""')+'"'}
function download(name, content, type){const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([content],{type})); a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
$('printDe').onclick=()=>{makeReport('de'); window.print()}; $('printEs').onclick=()=>{makeReport('es'); window.print()};
function makeReport(lang){ const db=loadDb(); const title=lang==='es'?'Informe de salud - Salut Urs':'Gesundheitsbericht - Salut Urs'; const bpRows=db.bp.slice(0,60); const avg=bpRows.length?`${Math.round(bpRows.reduce((a,b)=>a+b.sys,0)/bpRows.length)}/${Math.round(bpRows.reduce((a,b)=>a+b.dia,0)/bpRows.length)} mmHg`:lang==='es'?'Sin datos':'Keine Daten';
  $('reportOutput').innerHTML=`<h1>${title}</h1><p><b>${lang==='es'?'Fecha':'Datum'}:</b> ${new Date().toLocaleDateString(lang==='es'?'es-BO':'de-DE')}</p><p><b>${lang==='es'?'Promedio de presión arterial':'Blutdruckdurchschnitt'}:</b> ${avg}</p><h2>${lang==='es'?'Mediciones de presión arterial':'Blutdruckmessungen'}</h2>`+table(bpRows,['Datum','SYS/DIA','Puls','Tablette','Situation','Symptome','Notiz'],r=>[fmt(r.date),`${r.sys}/${r.dia}`,r.pulse,esc(r.medTiming+' '+(r.med||'')),esc(r.situation),esc((r.symptoms||[]).join(', ')),esc(r.note)],'noop');
}
renderAll();
