import"./Header.astro_astro_type_script_index_0_lang.OYAkgUOq.js";import"https://cdn.jsdelivr.net/npm/sweetalert2@11";document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("form"),c=document.getElementById("name"),t=document.getElementById("email"),l=document.getElementById("message"),s=document.getElementById("result");function o(){const r=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,e=document.querySelector(".error-txt.email");t&&!t.value.match(r)?(t.classList.add("error"),t.parentElement?.classList.add("error"),t.value!==""?e&&(e.innerText="Introduce una dirección de correo válida"):e&&(e.innerText="El email no puede estar en blanco")):(t?.classList.remove("error"),t?.parentElement?.classList.remove("error"))}function i(){const r=document.querySelectorAll(".item");for(const e of r)e.value==""&&(e.classList.add("error"),e.parentElement?.classList.add("error")),r[1].value!=""&&o(),r[1].addEventListener("keyup",()=>{o()}),e.addEventListener("keyup",()=>{e.value!=""?(e.classList.add("correct"),e.parentElement?.classList.add("correct"),e.classList.remove("error"),e.parentElement?.classList.remove("error")):(e.classList.add("error"),e.parentElement?.classList.add("error"),e.classList.remove("correct"),e.parentElement?.classList.remove("correct"))})}a?.addEventListener("submit",r=>{if(r.preventDefault(),i(),!c.classList.contains("error")&&!t.classList.contains("error")&&!l.classList.contains("error")){const e=new FormData(a),m=Object.fromEntries(e),d=JSON.stringify(m);fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:d}).then(async n=>{const u=await n.json();n.status===200?(s.className="success",s.innerText="¡Tu mensaje fue enviado correctamente!"):(console.log(n),s.className="error",s.innerText=u.message||"Hubo un error al enviar tu mensaje")}).catch(n=>{console.log(n),s.className="error",s.innerText="Tu mensaje falló a la hora de enviarse"}).then(function(){a.reset(),setTimeout(()=>{s.style.display="none"},3e3)}),a.reset()}})});