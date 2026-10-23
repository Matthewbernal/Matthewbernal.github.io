// ---- highlight code blocks (fails gracefully offline) ----
try{ if(window.hljs){ hljs.highlightAll(); } }catch(e){}


// ---- mobile nav toggle ----
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
if(navToggle && navLinks){
  navToggle.addEventListener('click', function(){ navLinks.classList.toggle('open'); });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
  });
}

// ---- project data + modal ----
var PROJECTS = {
  'souls-like': {
    title: "Divine Redemption",
    tags: ["3D Action", "Unity / C#"],
    status: "In dev",
    lead: "A 3D practice project to learn the full pipeline, from the first hitbox to a complete experience.",
    sections: [
      { h: "What I worked on", ul: [
        "Creating 3D hitboxes",
        "Animations",
        "Importing 3D models",
        "A complete experience from start to finish, with three different levels",
        "Character transformations, managed by a state machine and a player controller"
      ] }
    ],
    note: "Footage and a playable build will come soon."
  },
  'mobile-racer': {
    title: "XiaoXiao Racing",
    tags: ["Arcade Racing", "Mobile"],
    status: "In dev",
    lead: "A touch-first arcade racer for short sessions, with drift feel, on-screen controls and tracks made for fast, thumb-friendly play.",
    sections: [
      { h: "Design focus", p: "Sessions start and end in under two minutes, so pacing, drift response and control layout are tuned for quick rounds." },
      { h: "What I'm testing", p: "Control feel comes first: steering sensitivity, drift assist and thumb placement. More tracks come after that." }
    ],
    note: "Early prototype. A mobile build and gameplay clips will come soon."
  },
  'fighting-game': {
    title: "2D Hitbox Studio",
    tags: ["2D Hitboxes", "Unity / C# / Photoshop"],
    status: "In dev",
    lead: "A 2D hitbox studio with a character selector and a dynamic player controller. It is also a hand-made practice project.",
    sections: [
      { h: "What it includes", ul: [
        "A hitbox studio for 2D characters",
        "A character selector",
        "A dynamic player controller"
      ] },
      { h: "Hand-made art", p: "Every animation in the game is hand-drawn. There is no asset that was not drawn or designed by hand." }
    ],
    note: "Footage and a downloadable build will come soon."
  },
  'driving-ai': {
    title: "Neural Network Driving AI",
    tags: ["Machine Learning", "Unity / C#"],
    status: "In dev",
    lead: "Cars that learn to drive. A neural network agent trains generation after generation to read the track ahead and stay on it.",
    sections: [
      { h: "Design focus", p: "The agent reads the track with forward-facing sensors and learns steering and throttle only from repeated attempts. There is no hand-written driving logic." },
      { h: "What I'm testing", p: "Right now I'm working on stable training and reward shaping, so agents improve every generation before I test them on harder tracks." }
    ],
    note: "Early prototype. Training footage and a build to watch the agents will come soon."
  },
  'enemy-ai-perception': {
    title: "Enemy AI: Perception & Behavior Trees",
    tags: ["Enemy AI", "Unreal Engine"],
    status: "In dev",
    lead: "Enemies driven by behavior trees that patrol, notice and react using Unreal's perception system. New behaviors can be added without messy Blueprints.",
    sections: [
      { h: "Design focus", p: "Enemies use the AI Perception component to sense sight and sound. That feeds a behavior tree with patrol, investigate and combat states, and each new behavior is its own branch." },
      { h: "What I'm testing", p: "The chain from patrol to alert to combat, keeping the tree easy to read as more enemy types are added." }
    ],
    note: "Early prototype. A playable build and gameplay clips will come soon."
  },
  'enemy-ai-locomotion': {
    title: "Enemy AI: Locomotion & Blend Spaces",
    tags: ["Animation Systems", "Unreal Engine"],
    status: "In dev",
    lead: "The animation side of the same enemies: Blend Spaces that mix idle, alert and combat movement into one smooth motion.",
    sections: [
      { h: "Design focus", p: "Idle, alert and combat locomotion are mixed through Blend Spaces, so changing state looks like one continuous movement and not a hard cut." },
      { h: "What I'm testing", p: "It is a companion to the perception and behavior tree system. Locomotion here is driven by the same AI state changes." }
    ],
    note: "Early prototype. Footage of the blended locomotion will come soon."
  }
};

function openProject(id){
  var p = PROJECTS[id];
  if(!p) return;
  var body = document.getElementById('projectModalBody');
  var tagsHtml = p.tags.map(function(t){ var ic = /Unity/.test(t) ? '<svg class="ico-unity" aria-hidden="true"><use href="#ico-unity"/></svg>' : ''; return '<span class="tag">'+ic+t+'</span>'; }).join('');
  var sectionsHtml = p.sections.map(function(s){
    var inner = s.ul ? '<ul>'+s.ul.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>' : '<p>'+s.p+'</p>';
    return '<div class="pm-section"><h4>'+s.h+'</h4>'+inner+'</div>';
  }).join('');
  body.innerHTML =
    '<div class="tag-line">'+tagsHtml+'<span class="status-pill" style="margin-left:8px;">'+p.status+'</span></div>' +
    '<h3>'+p.title+'</h3>' +
    '<p class="pm-lead">'+p.lead+'</p>' +
    sectionsHtml +
    '<div class="pm-note"><b>Note:</b> '+p.note+'</div>';
  document.getElementById('projectOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeProject(){
  document.getElementById('projectOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ---- image lightbox ----
function openLightbox(imgEl){
  document.getElementById('lightboxImg').src = imgEl.src;
  document.getElementById('lightboxImg').alt = imgEl.alt;
  document.getElementById('lightboxOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  document.getElementById('lightboxOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){ closeProject(); closeLightbox(); }
});


// ---- video slots: lazy-load mp4 (with poster) or YouTube ids ----
var AE_VIDEOS = [];
function aeLoadVideo(el){
  if(el.dataset.loaded) return; el.dataset.loaded = '1';
  var stage = el.querySelector('.vid-stage');
  var yt = el.dataset.yt, src = el.dataset.src, title = el.dataset.title || 'Video';
  if(yt){
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + yt + '?rel=0';
    f.title = title; f.loading = 'lazy'; f.allowFullscreen = true;
    f.allow = 'accelerometer; encrypted-media; picture-in-picture; fullscreen';
    stage.appendChild(f); el.classList.add('ready'); return;
  }
  if(!src) return;
  var v = document.createElement('video');
  v.controls = true; v.preload = 'metadata'; v.setAttribute('playsinline','');
  if(el.dataset.poster) v.poster = el.dataset.poster;
  v.setAttribute('aria-label', title);
  v.addEventListener('loadeddata', function(){ el.classList.add('ready'); });
  v.addEventListener('loadedmetadata', function(){ el.classList.add('ready'); });
  v.addEventListener('error', function(){
    if(v.parentNode) v.parentNode.removeChild(v);
    el.classList.remove('ready');
    var t = el.querySelector('.vid-fallback .t'); if(t) t.textContent = 'Video not found. Check the media folder.';
  });
  v.addEventListener('play', function(){ AE_VIDEOS.forEach(function(o){ if(o!==v && !o.paused) o.pause(); }); });
  AE_VIDEOS.push(v);
  v.src = src;
  stage.appendChild(v);
  el._video = v;
}
(function(){
  var slots = document.querySelectorAll('.vid');
  if(!('IntersectionObserver' in window)){ slots.forEach(aeLoadVideo); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ aeLoadVideo(en.target); io.unobserve(en.target); } });
  }, {rootMargin:'400px'});
  slots.forEach(function(el){ io.observe(el); });
})();
// chapter buttons: jump the main video to a timestamp and bring it into view
document.addEventListener('click', function(e){
  var b = e.target.closest('.seek'); if(!b) return;
  var el = document.getElementById(b.dataset.target); if(!el) return;
  aeLoadVideo(el);
  var v = el._video, t = parseFloat(b.dataset.t) || 0;
  el.scrollIntoView({behavior:'smooth', block:'center'});
  function go(){ try{ v.currentTime = t; var p = v.play(); if(p && p.catch) p.catch(function(){}); }catch(err){} }
  if(v.readyState >= 1) go(); else v.addEventListener('loadedmetadata', go, {once:true});
});


// ---- reveal on scroll ----
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if(reduce){ els.forEach(function(e){e.classList.add('in');}); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, {threshold:0, rootMargin:'0px 0px -4% 0px'});
  els.forEach(function(e){ io.observe(e); });
})();
