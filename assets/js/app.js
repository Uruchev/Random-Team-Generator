// Random Team Generator – Vanilla JS
// Small, readable, mobile-first. Persists state and supports seeded shuffles.

const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

const els = {
  names:    $('#namesInput'),
  sample:   $('#sampleBtn'),
  clear:    $('#clearBtn'),
  paste:    $('#pasteBtn'),
  modeRadios: $$('input[name="mode"]'),
  sizeLbl:  $('#sizeLabel'),
  size:     $('#sizeInput'),
  countLbl: $('#countLabel'),
  count:    $('#countInput'),
  balance:  $('#balanceInput'),
  shuffle:  $('#shuffleInput'),
  seed:     $('#seedInput'),
  gen:      $('#generateBtn'),
  share:    $('#shareBtn'),
  copy:     $('#copyBtn'),
  results:  $('#results'),
  install:  $('#installBtn'),
};

const STORAGE_KEY = 'rtg:v1';

function saveState(){
  const mode = els.modeRadios.find(r=>r.checked)?.value || 'size';
  const data = {
    names: els.names.value,
    mode,
    size: parseInt(els.size.value||'3',10),
    count: parseInt(els.count.value||'3',10),
    balance: !!els.balance.checked,
    shuffle: !!els.shuffle.checked,
    seed: (els.seed.value||'').trim(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return;
    const s = JSON.parse(raw);
    els.names.value = s.names || '';
    els.size.value = s.size || 3;
    els.count.value = s.count || 3;
    els.balance.checked = !!s.balance;
    els.shuffle.checked = s.shuffle !== false;
    els.seed.value = s.seed || '';
    const m = s.mode === 'count' ? 'count' : 'size';
    els.modeRadios.forEach(r => r.checked = (r.value===m));
    applyMode(m);
  }catch{}
}

function applyMode(mode){
  if(mode==='count'){
    els.sizeLbl.classList.add('hidden');
    els.size.classList.add('hidden');
    els.countLbl.classList.remove('hidden');
    els.count.classList.remove('hidden');
  }else{
    els.sizeLbl.classList.remove('hidden');
    els.size.classList.remove('hidden');
    els.countLbl.classList.add('hidden');
    els.count.classList.add('hidden');
  }
}

function getNames(){
  return els.names.value
    .split(/\r?\n|,/) // allow commas or newlines
    .map(x => x.trim())
    .filter(Boolean);
}

// Seeded RNG (Mulberry32) for stable results when seed provided
function mulberry32(seed){
  let t = seed >>> 0;
  return function(){
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function strHash(str){
  let h=2166136261; // FNV-1a 32-bit
  for(let i=0;i<str.length;i++){
    h ^= str.charCodeAt(i);
    h += (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24);
  }
  return h>>>0;
}

function shuffle(arr, rng=Math.random){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(rng()* (i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

function dealIntoTeams(people, {mode, size, count, balance}){
  const n = people.length;
  if(n===0) return [];

  let teams = [];
  if(mode==='size'){
    const teamSize = Math.max(2, Math.min(99, size||3));
    const t = Math.max(1, Math.floor(n / teamSize) + (n % teamSize ? 1 : 0));
    teams = Array.from({length: t}, ()=>[]);
  }else{
    const t = Math.max(1, Math.min(50, count||3));
    teams = Array.from({length: t}, ()=>[]);
  }

  if(balance){
    // Round-robin dealing to keep sizes even
    let i=0;
    for(const p of people){
      teams[i%teams.length].push(p);
      i++;
    }
  }else{
    // Fill one team at a time
    const per = mode==='size' ? Math.max(2, size||3) : Math.ceil(people.length / teams.length);
    let idx=0;
    for(const team of teams){
      for(let k=0;k<per && idx<people.length;k++) team.push(people[idx++]);
    }
    // leftovers
    let t=0; while(idx<people.length){ teams[t++%teams.length].push(people[idx++]); }
  }

  return teams;
}

function renderTeams(teams){
  const wrap = document.createElement('div');
  wrap.className = 'teams';
  teams.forEach((team, i)=>{
    const card = document.createElement('div');
    card.className = 'team';
    const h = document.createElement('h3');
    h.textContent = `Team ${i+1} (${team.length})`;
    const ul = document.createElement('ul');
    team.forEach(name=>{
      const li = document.createElement('li');
      li.textContent = name;
      ul.appendChild(li);
    });
    card.append(h, ul);
    wrap.appendChild(card);
  });
  els.results.replaceChildren(wrap);
}

function teamsToText(teams){
  return teams.map((t,i)=>`Team ${i+1} (${t.length})\n` + t.map(n=>` - ${n}`).join('\n')).join('\n\n');
}

async function onGenerate(){
  const names = getNames();
  if(names.length<2){
    alert('Enter at least two names.');
    return;
  }
  const mode = els.modeRadios.find(r=>r.checked)?.value || 'size';
  const opts = {
    mode,
    size: parseInt(els.size.value||'3',10),
    count: parseInt(els.count.value||'3',10),
    balance: !!els.balance.checked
  };

  // RNG
  let rng = Math.random;
  const s = (els.seed.value||'').trim();
  if(s){ rng = mulberry32(strHash(s)); }
  const source = els.shuffle.checked ? shuffle(names, rng) : names.slice();

  const teams = dealIntoTeams(source, opts);
  renderTeams(teams);
  saveState();
  return teams;
}

async function onCopy(){
  const wrap = els.results.querySelector('.teams');
  if(!wrap){ alert('Nothing to copy yet.'); return; }
  const text = teamsToText(Array.from(wrap.querySelectorAll('.team')).map(team=>
    Array.from(team.querySelectorAll('li')).map(li=>li.textContent)
  ));
  try{
    await navigator.clipboard.writeText(text);
  }catch{
    // Fallback
    const t = document.createElement('textarea');
    t.value = text; document.body.appendChild(t); t.select();
    try{ document.execCommand('copy'); } finally { t.remove(); }
  }
}

async function onShare(){
  const wrap = els.results.querySelector('.teams');
  if(!wrap){ alert('Nothing to share yet.'); return; }
  const text = teamsToText(Array.from(wrap.querySelectorAll('.team')).map(team=>
    Array.from(team.querySelectorAll('li')).map(li=>li.textContent)
  ));
  if(navigator.share){
    try{ await navigator.share({ title:'Random Team Generator', text }); return; }catch{}
  }
  await onCopy();
}

// Install prompt
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e)=>{ e.preventDefault(); deferredPrompt = e; });
els.install.addEventListener('click', async ()=>{
  if(!deferredPrompt) { alert('Installation not available yet.'); return; }
  deferredPrompt.prompt();
  await deferredPrompt.userChoice; deferredPrompt = null;
});

function wireEvents(){
  els.sample.addEventListener('click', ()=>{
    els.names.value = 'Alice\nBob\nCharlie\nDana\nEve\nFrank\nGrace\nHank\nIvy\nJamal\nKira\nLiam';
    saveState();
  });
  els.clear.addEventListener('click', ()=>{ els.names.value=''; saveState(); els.results.replaceChildren(); });
  els.paste.addEventListener('click', async ()=>{ try{ els.names.value = await navigator.clipboard.readText(); }catch{} saveState(); });
  els.modeRadios.forEach(r=> r.addEventListener('change', ()=>{ applyMode(r.value); saveState(); }));
  [els.size,els.count,els.balance,els.shuffle,els.seed,els.names].forEach(el=> el.addEventListener('input', saveState));
  els.gen.addEventListener('click', onGenerate);
  els.copy.addEventListener('click', onCopy);
  els.share.addEventListener('click', onShare);
}

// Init
applyMode('size');
loadState();
wireEvents();