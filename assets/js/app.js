// Random Team Generator – Vanilla JS (no modules)
(function(){
  'use strict';

  function $(q, el){ return (el||document).querySelector(q); }
  function $$(q, el){ return Array.prototype.slice.call((el||document).querySelectorAll(q)); }

  var els = {
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
    install:  $('#installBtn')
  };

  var STORAGE_KEY = 'rtg:v2';

  function saveState(){
    try{
      var mode = els.modeRadios.filter(function(r){return r.checked;})[0];
      var data = {
        names: els.names && els.names.value || '',
        mode: mode ? mode.value : 'size',
        size: parseInt((els.size&&els.size.value)||'3',10),
        count: parseInt((els.count&&els.count.value)||'3',10),
        balance: !!(els.balance&&els.balance.checked),
        shuffle: !!(els.shuffle&&els.shuffle.checked),
        seed: (els.seed&&els.seed.value||'').trim()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }catch(e){}
  }

  function loadState(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return;
      var s = JSON.parse(raw);
      if(els.names) els.names.value = s.names || '';
      if(els.size) els.size.value = s.size || 3;
      if(els.count) els.count.value = s.count || 3;
      if(els.balance) els.balance.checked = !!s.balance;
      if(els.shuffle) els.shuffle.checked = s.shuffle !== false;
      if(els.seed) els.seed.value = s.seed || '';
      var m = s.mode === 'count' ? 'count' : 'size';
      els.modeRadios.forEach(function(r){ r.checked = (r.value===m); });
      applyMode(m);
    }catch(e){}
  }

  function applyMode(mode){
    var showCount = mode==='count';
    if(els.sizeLbl) els.sizeLbl.classList[showCount?'add':'remove']('hidden');
    if(els.size) els.size.classList[showCount?'add':'remove']('hidden');
    if(els.countLbl) els.countLbl.classList[showCount?'remove':'add']('hidden');
    if(els.count) els.count.classList[showCount?'remove':'add']('hidden');
  }

  function getNames(){
    var v = (els.names && els.names.value || '');
    return v.split(/\r?\n|,/).map(function(x){return x.trim();}).filter(Boolean);
  }

  function mulberry32(seed){
    var t = seed >>> 0;
    return function(){
      t += 0x6D2B79F5;
      var r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function strHash(str){
    var h=2166136261;
    for(var i=0;i<str.length;i++){
      h ^= str.charCodeAt(i);
      h += (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24);
    }
    return h>>>0;
  }

  function shuffle(arr, rng){
    var a = arr.slice();
    var rand = rng || Math.random;
    for(var i=a.length-1;i>0;i--){
      var j = Math.floor(rand()*(i+1));
      var tmp=a[i]; a[i]=a[j]; a[j]=tmp;
    }
    return a;
  }

  function dealIntoTeams(people, opts){
    var mode = opts.mode, size = opts.size, count = opts.count, balance = opts.balance;
    var n = people.length;
    if(n===0) return [];
    var teams = [];
    if(mode==='size'){
      var teamSize = Math.max(2, Math.min(99, size||3));
      var t = Math.max(1, Math.floor(n / teamSize) + (n % teamSize ? 1 : 0));
      for(var i=0;i<t;i++) teams.push([]);
    }else{
      var tc = Math.max(1, Math.min(50, count||3));
      for(var j=0;j<tc;j++) teams.push([]);
    }
    if(balance){
      var k=0; for(var p=0;p<people.length;p++){ teams[k%teams.length].push(people[p]); k++; }
    }else{
      var per = mode==='size' ? Math.max(2, size||3) : Math.ceil(people.length / teams.length);
      var idx=0;
      for(var g=0; g<teams.length; g++){
        for(var m=0;m<per && idx<people.length;m++) teams[g].push(people[idx++]);
      }
      var t2=0; while(idx<people.length){ teams[(t2++)%teams.length].push(people[idx++]); }
    }
    return teams;
  }

  function renderTeams(teams){
    var wrap = document.createElement('div'); wrap.className='teams';
    teams.forEach(function(team, i){
      var card=document.createElement('div'); card.className='team';
      var h=document.createElement('h3'); h.textContent='Team '+(i+1)+' ('+team.length+')';
      var ul=document.createElement('ul');
      team.forEach(function(name){ var li=document.createElement('li'); li.textContent=name; ul.appendChild(li); });
      card.appendChild(h); card.appendChild(ul); wrap.appendChild(card);
    });
    if(els.results){ els.results.textContent=''; els.results.appendChild(wrap); }
  }

  function teamsToText(teams){
    return teams.map(function(t,i){
      return 'Team '+(i+1)+' ('+t.length+')\n' + t.map(function(n){return ' - '+n;}).join('\n');
    }).join('\n\n');
  }

  function onGenerate(){
    var names = getNames();
    if(names.length<2){ alert('Enter at least two names.'); return; }
    var modeRadio = els.modeRadios.filter(function(r){return r.checked;})[0];
    var opts = {
      mode: (modeRadio?modeRadio.value:'size'),
      size: parseInt((els.size&&els.size.value)||'3',10),
      count: parseInt((els.count&&els.count.value)||'3',10),
      balance: !!(els.balance&&els.balance.checked)
    };
    var rng = Math.random;
    var sv = (els.seed&&els.seed.value||'').trim();
    if(sv){ rng = mulberry32(strHash(sv)); }
    var source = (els.shuffle&&els.shuffle.checked) ? shuffle(names, rng) : names.slice();
    var teams = dealIntoTeams(source, opts);
    renderTeams(teams);
    saveState();
    return teams;
  }

  function onCopy(){
    var wrap = els.results ? els.results.querySelector('.teams') : null;
    if(!wrap){ alert('Nothing to copy yet.'); return; }
    var teams = Array.prototype.map.call(wrap.querySelectorAll('.team'), function(team){
      return Array.prototype.map.call(team.querySelectorAll('li'), function(li){ return li.textContent; });
    });
    var text = teamsToText(teams);
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).catch(function(){});
    }else{
      var t=document.createElement('textarea'); t.value=text; document.body.appendChild(t); t.select();
      try{ document.execCommand('copy'); } finally { document.body.removeChild(t); }
    }
  }

  function onShare(){
    var wrap = els.results ? els.results.querySelector('.teams') : null;
    if(!wrap){ alert('Nothing to share yet.'); return; }
    var teams = Array.prototype.map.call(wrap.querySelectorAll('.team'), function(team){
      return Array.prototype.map.call(team.querySelectorAll('li'), function(li){ return li.textContent; });
    });
    var text = teamsToText(teams);
    if(navigator.share){ navigator.share({title:'Random Team Generator', text:text}).catch(function(){}); }
    else { onCopy(); }
  }

  // Install prompt guard
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function(e){ e.preventDefault(); deferredPrompt = e; });
  if(els.install){
    els.install.addEventListener('click', function(){
      if(!deferredPrompt){ alert('Installation not available yet.'); return; }
      deferredPrompt.prompt();
      if(deferredPrompt.userChoice) deferredPrompt.userChoice.finally(function(){ deferredPrompt=null; });
    });
  }

  function on(el, type, fn){ if(el) el.addEventListener(type, fn); }

  function wireEvents(){
    on(els.sample, 'click', function(){
      if(els.names) els.names.value = 'Alice\nBob\nCharlie\nDana\nEve\nFrank\nGrace\nHank\nIvy\nJamal\nKira\nLiam';
      saveState();
    });
    on(els.clear, 'click', function(){ if(els.names) els.names.value=''; saveState(); if(els.results) els.results.textContent=''; });
    on(els.paste, 'click', function(){
      if(!navigator.clipboard || !navigator.clipboard.readText){ return; }
      navigator.clipboard.readText().then(function(t){ if(els.names){ els.names.value=t; saveState(); } }).catch(function(){});
    });
    els.modeRadios.forEach(function(r){ r.addEventListener('change', function(){ applyMode(r.value); saveState(); }); });
    [els.size,els.count,els.balance,els.shuffle,els.seed,els.names].forEach(function(el){ if(el) el.addEventListener('input', saveState); });
    on(els.gen, 'click', onGenerate);
    on(els.copy, 'click', onCopy);
    on(els.share, 'click', onShare);
  }

  function init(){
    applyMode('size');
    loadState();
    if(els.names && !els.names.value.trim()){
      els.names.value = 'Alice\nBob\nCharlie\nDana\nEve\nFrank\nGrace\nHank';
    }
    wireEvents();
    if(getNames().length >= 2){ onGenerate(); }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();