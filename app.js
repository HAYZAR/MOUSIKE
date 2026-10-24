"use strict";
const roles=["Estudiante del público","Estudiante artista o participante","Docente o directivo docente","Familiar o acudiente","Artista o invitado","Otro"];
const institutions=["IED Los Rosales","IED Sarid Arteta de Vásquez","IED Juan Acosta Solera","IED Marco Fidel Suárez","IED Santa Bernardita","IED Buenos Aires","IED San Gabriel","IED N. Abello","Otra","No aplica"];
const attendance=["Todo o casi todo","Aproximadamente la mitad","Solo algunas presentaciones"];
const favorites=["Interpretaciones vocales e instrumentales","Orquestas y agrupaciones musicales","Danzas folclóricas","Danzas contemporáneas, pop y K-pop","Recitales de poesía","Disertación sobre el arte de escribir bien","Presentación de la revista Ficciones poéticas","Otra"];
const qualities=[["organizacion","Organización general del evento"],["informacion","Información y orientación para los asistentes"],["tiempos","Desarrollo del programa y manejo de los tiempos"],["sonido","Calidad del sonido"],["comodidad","Comodidad del lugar"],["variedad","Variedad de las presentaciones artísticas"]];
const goals=[["talento","El festival permitió reconocer el talento artístico de los estudiantes"],["integracion","El encuentro favoreció la integración entre las instituciones educativas"],["interes","Las presentaciones despertaron mi interés por la música, la danza o la poesía"]];
const titles=["Tu participación","La experiencia","El arte nos une","Tu voz, el siguiente paso"];
const $=id=>document.getElementById(id);
const optional='<span class="optional"> · Opcional</span>';
function choices(name,title,values,required=true,type="radio"){return '<fieldset class="question"><legend>'+title+(required?' *':optional)+'</legend><div class="choices">'+values.map((v,i)=>'<label class="choice"><input type="'+type+'" name="'+name+'" value="'+v+'" '+(required?'required':'')+'><span>'+v+'</span></label>').join("")+'</div></fieldset>';}
function rating(name,title,low,high,na=true){return '<fieldset class="question"><legend>'+title+' *</legend><div class="rating">'+[1,2,3,4,5].map(n=>'<label><input required type="radio" name="'+name+'" value="'+n+'" aria-label="'+n+' de 5"><span>'+n+'</span></label>').join("")+(na?'<label class="na"><input required type="radio" name="'+name+'" value="NA"><span>No puedo valorarlo</span></label>':'')+'</div><div class="scalehelp"><span>1 · '+low+'</span><span>5 · '+high+'</span></div></fieldset>';}
$("steps").innerHTML=[
'<section class="step"><h3>Primero, un poco de contexto.</h3><p>Así podremos comprender mejor cada experiencia.</p>'+choices("rol","1. ¿Cómo participaste en el festival?",roles)+'<div class="question"><label for="institucion">2. ¿A qué institución perteneces o acompañas?'+optional+'</label><select name="institucion" id="institucion"><option value="">Selecciona una opción</option>'+institutions.map(x=>'<option>'+x+'</option>').join("")+'</select></div>'+choices("asistencia","3. ¿Cuánto del evento pudiste presenciar?",attendance)+'</section>',
'<section class="step" hidden><h3>¿Cómo viviste el festival?</h3><p>Valora solo lo que pudiste experimentar.</p><p class="scale-guide">Satisfacción: 1 Muy insatisfecho/a · 2 Insatisfecho/a · 3 Ni satisfecho/a ni insatisfecho/a · 4 Satisfecho/a · 5 Muy satisfecho/a.</p>'+rating("satisfaccion","4. En general, ¿qué tan satisfecho/a quedaste con el festival?","Muy insatisfecho/a","Muy satisfecho/a",false)+'<p class="scale-guide"><strong>5. Valora estos aspectos:</strong><br>1 Muy malo · 2 Malo · 3 Regular · 4 Bueno · 5 Excelente.</p>'+qualities.map(([k,t])=>rating(k,t,"Muy malo","Excelente")).join("")+'</section>',
'<section class="step" hidden><h3>El arte que nos conecta.</h3><p>Queremos saber qué dejó este encuentro en ti.</p><p class="scale-guide"><strong>6. ¿Qué tanto se logró lo siguiente?</strong><br>1 Nada · 2 Poco · 3 Algo · 4 Bastante · 5 Mucho.</p>'+goals.map(([k,t])=>rating(k,t,"Nada","Mucho")).join("")+choices("favoritos","7. ¿Qué partes del programa disfrutaste más? (Máximo tres)",favorites,false,"checkbox")+'<p id="favoriteHelp" class="small" aria-live="polite">0 de 3 seleccionadas</p></section>',
'<section class="step" hidden><h3>Imaginemos el próximo encuentro.</h3><p>Tus ideas nos ayudan a mejorar.</p>'+choices("volver","8. ¿Te gustaría asistir a una próxima edición?",["Sí","Tal vez","No"])+[["destacado","9. ¿Qué momento, presentación o experiencia destacarías y por qué?"],["mejoras","10. ¿Qué deberíamos mejorar o incluir en una próxima edición?"]].map(([k,t])=>'<div class="question"><label for="'+k+'">'+t+optional+'</label><textarea id="'+k+'" name="'+k+'" maxlength="500" placeholder="Comparte tu opinión, sin incluir datos personales."></textarea><span class="counter" id="'+k+'Count">0 / 500</span></div>').join("")+'</section>'
].join("");
const steps=Array.from(document.querySelectorAll(".step"));
let current=0, sending=false, requestId=null;
const endpoint=window.MOUSIKE_CONFIG?.endpoint||"";
const connected=/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint);
$("setup").hidden=connected;
function showError(msg){$("error").textContent=msg;$("error").hidden=false;}
function showStep(){steps.forEach((s,i)=>s.hidden=i!==current);$("stepText").textContent=String(current+1).padStart(2,"0")+" / 04 · "+titles[current];$("progressText").textContent=Math.round(current/4*100)+" %";$("progress").style.width=(current/4*100)+"%";$("back").hidden=current===0;$("next").hidden=current===3;$("send").hidden=current!==3;$("send").disabled=!connected;$("error").hidden=true;}
function validStep(){for(const el of steps[current].querySelectorAll("input,select,textarea")){if(!el.checkValidity()){el.reportValidity();return false;}}return true;}
function move(delta){if(sending)return;if(delta>0&&!validStep())return;current+=delta;showStep();$("encuesta").scrollIntoView({behavior:"auto",block:"start"});}
$("next").addEventListener("click",()=>move(1));$("back").addEventListener("click",()=>move(-1));
document.querySelectorAll('input[name="favoritos"]').forEach(input=>input.addEventListener("change",()=>{const selected=document.querySelectorAll('input[name="favoritos"]:checked');if(selected.length>3){input.checked=false;showError("Puedes elegir hasta tres partes del programa.");}else $("error").hidden=true;$("favoriteHelp").textContent=document.querySelectorAll('input[name="favoritos"]:checked').length+" de 3 seleccionadas";}));
["destacado","mejoras"].forEach(k=>$(k).addEventListener("input",()=>$(k+"Count").textContent=$(k).value.length+" / 500"));
$("surveyForm").addEventListener("submit",async event=>{
 event.preventDefault();if(sending||!connected)return;
 for(let i=0;i<steps.length;i++){current=i;if(!validStep()){showStep();validStep();return;}}
 current=3;
 const form=new FormData($("surveyForm"));const answers={};
 for(const [k,v] of form.entries())if(k!=="favoritos")answers[k]=v;
 answers.favoritos=form.getAll("favoritos");
 requestId ||= crypto.randomUUID();
 const payload={version:1,event:"mousike-2026",id:requestId,answers};
 sending=true;$("send").disabled=true;$("back").disabled=true;$("send").textContent="Enviando…";$("error").hidden=true;
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),30000);
 try{
  const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload),signal:controller.signal,redirect:"follow",credentials:"omit"});
  if(!response.ok)throw new Error("http");
  const result=await response.json();
  if(result.ok!==true||result.id!==requestId)throw new Error("not-confirmed");
  $("formView").hidden=true;$("setup").hidden=true;$("thanks").hidden=false;$("thanks").focus();$("thanks").scrollIntoView({block:"center"});
 }catch(error){showError("No pudimos confirmar la recepción. Tus respuestas siguen en pantalla. Revisa tu conexión y vuelve a enviar; el reintento evita duplicar el registro.");}
 finally{clearTimeout(timer);sending=false;$("send").disabled=false;$("back").disabled=false;$("send").textContent="Enviar mi evaluación →";}
});
$("again").addEventListener("click",()=>{requestId=null;$("surveyForm").reset();["destacado","mejoras"].forEach(k=>$(k+"Count").textContent="0 / 500");$("favoriteHelp").textContent="0 de 3 seleccionadas";current=0;$("thanks").hidden=true;$("formView").hidden=false;showStep();$("encuesta").scrollIntoView({block:"start"});});
showStep();

