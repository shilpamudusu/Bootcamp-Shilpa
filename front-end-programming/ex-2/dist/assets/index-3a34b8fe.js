(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const m=[{name:"Alice",age:25,job:"Developer"},{name:"Bob",age:30,job:"Designer"}],a=m,d=document.createElement("table"),u=Object.keys(a[0]),p=d.createTHead(),y=p.insertRow();u.forEach(t=>{const r=document.createElement("th");r.innerText=t;let o=!0;r.onclick=()=>{a.sort((s,e)=>s[t]<e[t]?o?-1:1:s[t]>e[t]?o?1:-1:0),o=!o,f()},y.appendChild(r)});const c=d.createTBody(),f=()=>{c.innerHTML="",a.forEach(t=>{const r=c.insertRow();u.forEach(o=>{const s=r.insertCell();s.innerText=t[o].toString()})})},i=document.createElement("input");i.placeholder="Filter rows...";i.oninput=()=>{const t=i.value.toLowerCase();c.querySelectorAll("tr").forEach(o=>{const s=Array.from(o.cells).some(e=>e.innerText.toLowerCase().includes(t));o.style.display=s?"":"none"})};c.addEventListener("mouseover",t=>{if(t.target instanceof HTMLTableCellElement){const r=t.target.parentElement;r.style.backgroundColor="lightblue"}});c.addEventListener("mouseout",t=>{if(t.target instanceof HTMLTableCellElement){const r=t.target.parentElement;r.style.backgroundColor=""}});document.body.appendChild(i);f();document.body.appendChild(d);