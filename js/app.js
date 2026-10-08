// Ideas: n=name, c=estimated cost for two (PHP), p=place (c=CDO, m=Misamis Oriental outside CDO, a=any), t=time (s=short, l=long), s=setting (i=indoor, o=outdoor)
// ALL entries are unverified placeholders. Check each place and price before publishing.
const A=[
{n:"Sunset walk at Gaston Park and Divisoria",c:0,p:"c",t:"s",s:"o",d:"Golden hour in the city center. Go around 4:30 to 5:30pm."},
{n:"Museo de Oro at Xavier University",c:100,p:"c",t:"s",s:"i",d:"A quiet, cheap indoor date full of local history."},
{n:"Sunset drive along Macajalar Bay",c:150,p:"c",t:"s",s:"o",d:"Windows down, playlist on, no destination pressure."},
{n:"Bookstore and cafe browse",c:200,p:"c",t:"s",s:"i",d:"Pick a book for each other, then talk about why."},
{n:"Mapawa Nature Park picnic walk",c:200,p:"c",t:"l",s:"o",d:"Greenery and fresh air. Bring baon and water."},
{n:"Mall stroll and arcade games",c:300,p:"c",t:"s",s:"i",d:"Rain-proof. Loser of the arcade game pays for dessert."},
{n:"Movie date",c:500,p:"c",t:"s",s:"i",d:"Take turns choosing the movie, no complaining."},
{n:"Macahambus Adventure Park",c:800,p:"c",t:"l",s:"o",d:"Cave, gorge, and zipline for the adventurous pair."},
{n:"White water rafting on the Cagayan River",c:2500,p:"c",t:"l",s:"o",d:"A splurge date you will both talk about for months."},
{n:"Coastal drive to Initao",c:300,p:"m",t:"l",s:"o",d:"A half-day drive out of the city with stops along the shore."},
{n:"Beach day in Opol",c:600,p:"m",t:"l",s:"o",d:"Swim, nap, repeat. Bring sunscreen."},
{n:"Gingoog Bay day trip",c:1000,p:"m",t:"l",s:"o",d:"A longer trip east. Leave early and plan the ride home."},
{n:"Camiguin day trip via Balingoan port",c:2500,p:"m",t:"l",s:"o",d:"Ferry ride, island time, and a full day away together."},
{n:"Backyard camp night",c:300,p:"a",t:"n",s:"o",d:"Pitch a tent at home or on a safe rooftop, string some lights, and stay up talking."},
{n:"Beach camp night in Opol or Initao",c:1200,p:"m",t:"n",s:"o",d:"Camp near the shore for sunset, a campfire, and stars. Check the spot's camping rules first."},
{n:"Campsite night in the hills near CDO",c:1500,p:"m",t:"n",s:"o",d:"Cool air, a tent, and a sunrise view. Ask the campsite about fees, water, and safety."},
{n:"Glamping or cabin stay",c:3000,p:"m",t:"n",s:"o",d:"The camping feel with a real bed. A good splurge for an anniversary."}
];
const F=[
{n:"Picnic with baon",c:150,p:"a",s:"o",k:2,d:"Pack sandwiches or ulam from home and eat somewhere with a view."},
{n:"Street food crawl",c:200,p:"c",s:"o",d:"Fishball, kwek-kwek, barbecue. Set a shared budget and share everything."},
{n:"Turo-turo lunch together",c:200,p:"c",s:"i",d:"Simple, filling, and cheap. Try one dish neither of you has had."},
{n:"Cook together at home",c:400,p:"a",s:"i",d:"Pick one recipe, shop together, and split the tasks."},
{n:"Coffee and dessert",c:350,p:"c",s:"i",d:"Slow it down with a drink and one shared dessert."},
{n:"Roadside lunch along the way",c:350,p:"m",s:"o",d:"Stop at a local eatery on the road. Ask the locals what to order."},
{n:"Beachfront lunch",c:800,p:"m",s:"o",d:"Grilled fish and rice with your feet near the sand."},
{n:"Seafood grill dinner by the bay",c:900,p:"c",s:"o",d:"Open-air dinner with grilled seafood, best enjoyed after sunset."},
{n:"Sit-down dinner at a nice restaurant",c:1500,p:"c",s:"i",d:"Dress up a little and put the phones away."},
{n:"Celebration dinner",c:2500,p:"c",s:"i",d:"For anniversaries and big moments."},
{n:"Noodles and hot choco under the stars",c:200,p:"a",s:"o",k:1,d:"Simple camp food. Bring a small stove or buy at the campsite."},
{n:"Campfire cookout",c:600,p:"a",s:"o",k:1,d:"Grill hotdogs, corn, or fish and finish with marshmallows. Never leave the fire unattended."},
{n:"Grilled seafood by the shore",c:1000,p:"m",s:"o",k:2,d:"Buy fresh catch nearby and grill it at your beach campsite."}
];
const Q=["What small thing do I do that always makes your day better?","If we could teleport anywhere in the Philippines right now, where would we go?","What is the funniest thing that has happened to us?","What was your first impression of me?","Which song instantly puts you in a good mood?","What place in CDO have you never been to but want to try with me?","If we won one million pesos tomorrow, what is the first thing we do?","What is something you are proud of that you rarely talk about?","What do you need more of from me lately?","What is a dream you have not told many people?","When do you feel most loved?","What is a memory of us that you replay in your head?","What did your family do that you would want to keep doing in ours?","What is one thing you want us to try this year?","Would you rather have free taho for life or free halo-halo for life?","If our relationship were a movie, what genre would it be?","What is your go-to karaoke song, and will you sing it for me right now?","What habit of mine secretly annoys you but you also find cute?","Where do you see us in five years?","What is one thing I do that you hope I never stop doing?"];
const PL={c:"Inside CDO",m:"Misamis Oriental, outside CDO",a:"Anywhere"};
const BL={300:"Up to ₱300",800:"Up to ₱800",1500:"Up to ₱1,500",5000:"Splurge, ₱1,500 and up"};
const S={view:"home",p:"c",b:800,t:"a",s:"a",act:null,food:null,gen:false,q:[],qi:0,from:"random"};
let SITE="";try{if(location.hostname.endsWith("github.io"))SITE=location.hostname+location.pathname.replace(/index\.html$/,"").replace(/\/$/,"")}catch(e){}
const OWNER_PIN="change-me";
const CONTACT_EMAIL="your-email@example.com";
const app=document.getElementById("app");
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const peso=n=>"₱"+n.toLocaleString("en-PH");
const ok=(x,f)=>(f.p=="a"||x.p==f.p||x.p=="a")&&(f.t=="a"||!x.t||x.t==f.t||(f.t=="l"&&x.t=="n"))&&(f.s=="a"||x.s==f.s);
function opts(L,f,cap){
 for(const g of [f,{...f,s:"a"},{...f,s:"a",t:"a"}]){const r=L.filter(x=>ok(x,g)&&x.c<=cap);if(r.length)return r}
 return [];
}
const aPool=()=>{const r=opts(A,S,Math.max(S.b-150,0));return r.length?r:opts(A,S,S.b)};
const fPool=()=>opts(S.act&&S.act.t=="n"?F.filter(x=>x.k):F.filter(x=>!x.k||x.k==2),{p:S.p,t:"a",s:S.s},S.act?Math.max(S.b-S.act.c,150):S.b);
const total=()=>(S.act?S.act.c:0)+(S.food?S.food.c:0);
const CH={p:{c:"Inside CDO",m:"Outside CDO",a:"Anywhere"},b:{300:"₱300",800:"₱800",1500:"₱1,500",5000:"Splurge"},t:{a:"Any length",s:"2 hours",l:"Half day or more",n:"Overnight"},s:{a:"Either",i:"Indoor",o:"Outdoor"}};
function sel(label,key){return `<fieldset><legend>${label}</legend><div class="chips">`+Object.entries(CH[key]).map(([v,t])=>`<button type="button" class="chip" aria-pressed="${String(S[key])==v}" onclick="setf('${key}','${v}')">${t}</button>`).join("")+`</div></fieldset>`}
function filters(){
 const cu=S.view=="custom";
 return `<a class="back" href="#home">Back</a>
 <div class="steps"><span class="on">1 Choose</span><span${cu||S.gen?' class="on"':""}>2 Your plan</span><span>3 Kit</span></div>
 <h2>${cu?"Build your own date":"Surprise us"}</h2>
 <p class="mute">${cu?"Set the basics, then pick each part yourself.":"Tell us the basics and we choose the rest."}</p>
 ${sel("Where","p")}${sel("Budget for two","b")}${sel("How long","t")}${sel("Setting","s")}`
 +(cu?"":`<button class="go" onclick="gen()">Plan my date</button>`);
}
function slot(label,key,pool,item){
 const cu=S.view=="custom",L=key=="act"?A:F;
 return `<div class="card"><div class="lab">${label}</div>`
 +(cu?`<select aria-label="${label}" onchange="pick('${key}',this.value)"><option value="">Choose one</option>${pool.map(x=>`<option value="${L.indexOf(x)}"${item&&item.n==x.n?" selected":""}>${x.n}, about ${peso(x.c)}</option>`).join("")}</select>`:"")
 +(item?`<h3>${item.n}</h3><p>${item.d}</p><p class="tag">About ${peso(item.c)} for two. ${PL[item.p]}.</p>`:"")
 +`<button class="ghost" onclick="shuffle('${key}')">${cu?"Surprise me":"Try another"}</button></div>`;
}
function plan(){
 const ap=aPool();
 if(!ap.length)return `<div class="card"><p>Nothing fits that combination yet. Try a bigger budget or set the place to Anywhere.</p></div>`;
 const t=total(),bl=S.b>=5000?"your splurge budget":"your "+peso(S.b)+" budget",over=t>S.b?" That is a bit over, so try another pick.":"";
 return `<h2 style="margin-top:22px">Your date</h2>`+slot("Activity","act",ap,S.act)+slot("Food","food",fPool(),S.food)
 +(t?`<div class="total">About ${peso(t)} of ${bl}.${over}</div>`:"")
 +`<p class="note">Ideas and prices are rough estimates and may have changed. Check opening hours and costs before you go.</p>`
 +`<p class="brandline">♥ Date Compass${SITE?" "+SITE:""}</p><div class="bar">`+(S.view=="random"?`<button class="ghost" onclick="gen()">New plan</button>`:"")+`<button onclick="startQ()">10 questions</button><button class="ghost" onclick="startKit()">Kit card</button><button class="ghost" id="cp" onclick="copyPlan()">Copy</button></div>`;
}
function home(){
 const ic={a:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',b:'<path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/>',c:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'};
 const cir=(k,c,t,d)=>`<div class="cir ${c}"><div><svg viewBox="0 0 24 24">${ic[k]}</svg><b>${t}</b><span>${d}</span></div></div>`;
 return `<div class="hero2"><i class="c1"></i><i class="c2"></i><i class="c3"></i>
 <div class="txt"><h1>Find your best date spot</h1>
 <p class="lead2">Pick a place and a budget in Cagayan de Oro and Misamis Oriental. Get a full date plan and 10 questions to make it special.</p>
 <a class="cta" href="#custom">Create your date spot</a><a class="cta cta2" href="#random">Surprise me</a></div>
 <div class="phones"><div class="ph p1"><div class="pn"></div><div class="pl">Your date</div><div class="pt"><small>Activity</small><b>Sunset walk at Gaston Park</b></div><div class="pt"><small>Food</small><b>Street food crawl</b></div><div class="pc">Start the questions</div></div>
 <div class="ph p2"><div class="pn"></div><div class="pl">Question 4 of 10</div><div class="pq">What do you need more of from me lately?</div><div class="pc">Next question</div></div></div></div>
 <section class="hiw"><div class="hiwt"><h2>How it works</h2><p class="mute">Choose your basics, get a full plan, then print the kit with 10 questions to talk about. No more running out of ideas.</p></div>
 <div class="circles">${cir("a","ca","Pick the basics","Place and budget")}${cir("b","cb","Get your plan","Activity and food")}${cir("c","cc","Print the kit","With 10 questions")}</div></section>
 <p class="note">Version 1. All ideas are placeholders that still need checking.</p>`;
}
function qview(){
 const i=S.qi,n=S.q.length;
 if(i>=n)return `<div class="q">That was the last one. Hope the date goes well.</div><a class="back" href="#${S.from}">Back to your plan</a>`;
 return `<a class="back" href="#${S.from}">Back to your plan</a><div class="q"><div class="cnt">Question ${i+1} of ${n}</div>${S.q[i]}<div class="brand">Date Compass${SITE?" "+SITE:""}</div></div>
 <button class="ghost" onclick="qn(-1)"${i?"":" disabled"}>Previous</button><button onclick="qn(1)">${i==n-1?"Finish":"Next question"}</button>`;
}
const newCode=()=>"DC-"+Math.random().toString(36).slice(2,6).toUpperCase();
function toggleSurp(){S.surp=!S.surp;render()}
function startKit(){S.from=S.view;S.code=newCode();go("kit")}
function kitview(){
 if(!S.code)S.code=newCode();
 return `<a class="back" href="#${S.from}">Back to your plan</a><h2>Your kit card</h2>
 <p class="mute">This is the front of the printed card. The voucher is a sample so partner shops can see how it will look.</p>
 <div class="kit${S.surp?" sealed":""}"><div class="kh">Our date</div>${S.surp?'<div class="seal">Sealed surprise. Open on the date.</div>':""}
 <div class="kr"><span>Activity</span><b>${S.act?S.act.n:"To be decided"}</b></div>
 <div class="kr"><span>Food</span><b>${S.food?S.food.n:"To be decided"}</b></div>
 <div class="vou"><span class="tag">Partner voucher</span><b>Show this card at [Partner name]</b><p>[Offer, for example a free drink with any meal]</p><span class="tag">Valid until [date]. One voucher per card.</span><div class="code">Card code: ${S.code}</div></div>
 <div class="kf">Planned with Date Compass. The 10 question cards come in the same kit.</div></div>
 <button class="ghost" onclick="toggleSurp()">${S.surp?"Show the plan":"Make it a surprise"}</button><button id="ob" onclick="orderMsg()">Order this kit</button>${S.owner?'<button class="ghost" onclick="try{print()}catch(e){}">Owner: print kit card</button><button class="ghost" onclick="go(\'cards\')">Owner: question cards</button>':""}
 <p class="note">We print and prepare every kit ourselves. Tap Order, then paste the message to [your Facebook page link]. Your 10 question cards come in the kit.</p>`;
}
function contact(){
 return `<a class="back" href="#home">Back</a><h2>Contact us</h2>
 <p class="mute">Questions, kit orders, or a shop that wants a voucher on the cards? Send a message and we will reply by email.</p>
 <div class="tiles"><div><b>1</b> Tell us what you need</div><div><b>2</b> We reply by email</div><div><b>3</b> Order your kit</div></div>
 <div class="panel"><label>Full name<input id="cn" autocomplete="name"></label>
 <label>Email address<input id="ce" type="email" autocomplete="email"></label>
 <label>Mobile number (optional)<input id="ct" type="tel" autocomplete="tel"></label>
 <label>What do you need help with?<select id="cs"><option>Order a kit</option><option>Question about a plan</option><option>Shop or partner voucher</option><option>Something else</option></select></label>
 <label>Message<textarea id="cm" rows="6"></textarea></label>
 <p id="cerr" class="err" role="alert"></p>
 <button onclick="sendMail()">Send message</button><div id="cfb"></div></div>`;
}
async function sendMail(){
 const g=id=>document.getElementById(id).value.trim();
 const n=g("cn"),e=g("ce"),m=g("cm"),tel=g("ct"),topic=document.getElementById("cs").value,er=document.getElementById("cerr");
 if(!n||!/^S+@S+.S+$/.test(e)||!m){er.textContent="Please add your name, a valid email address, and a message.";return}
 er.textContent="";
 const body=`Name: ${n}\nEmail: ${e}\nMobile: ${tel||"not given"}\nTopic: ${topic}\n\n${m}`;
 const a=document.createElement("a");a.href="mailto:"+CONTACT_EMAIL+"?subject="+encodeURIComponent("Date Compass: "+topic)+"&body="+encodeURIComponent(body);
 document.body.appendChild(a);a.click();a.remove();
 document.getElementById("cfb").innerHTML=`<p class="note">If your email app did not open, copy this message and send it to <b>${CONTACT_EMAIL}</b>.</p><textarea id="cc" rows="6" readonly>${body.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</textarea><button class="ghost" id="cb" onclick="copyMail()">Copy message</button>`;
}
async function copyMail(){const b=document.getElementById("cb");try{await navigator.clipboard.writeText(document.getElementById("cc").value);b.textContent="Copied"}catch(e){b.textContent="Select the text and copy it"}}
function about(){
 return `<a class="back" href="#home">Back</a><h2>About Date Compass</h2>
 <p class="mute">Date Compass helps couples in Cagayan de Oro and Misamis Oriental stop asking "what do we do?" and start enjoying the date.</p>
 <section class="panel"><h3>Why it exists</h3><p>Planning dates gets tiring. This planner is built around places and budgets in the CDO area, and every plan comes with 10 questions so the conversation is as good as the outing.</p></section>
 <section class="panel"><h3>How the kit works</h3><p>Build a plan or let us surprise you, for free. Then order the printed kit: your plan on a card, 10 question cards, and a voucher from a local spot. Choose the surprise version to give it as a gift.</p></section>
 <h3 style="margin-top:22px">Questions</h3>
 <details><summary>Do I have to buy anything?</summary><p>No. Planning is free. The printed kit is optional.</p></details>
 <details><summary>Are the prices exact?</summary><p>No. They are estimates and may have changed, so check before you go.</p></details>
 <details><summary>How do I order a kit?</summary><p>[Add your ordering steps here, for example: message our Facebook page with your plan.]</p></details>
 <details><summary>Where can I pick up or get delivery?</summary><p>[Add your pickup area and delivery options here.]</p></details>
 <section class="panel"><h3>Contact</h3><p>Questions, kit orders, or a shop that wants a voucher on the cards? <a href="#contact">Send us a message</a>.</p></section>`;
}
async function orderMsg(){
 const t=`Kit order
Activity: ${S.act?S.act.n:"to be decided"}
Food: ${S.food?S.food.n:"to be decided"}
Surprise version: ${S.surp?"yes":"no"}
Card code: ${S.code}
Name:
Pickup or delivery:
Contact number:`;
 const b=document.getElementById("ob");
 try{await navigator.clipboard.writeText(t);b.textContent="Copied. Paste it in Messenger"}catch(e){b.textContent="Could not copy, screenshot this page"}
}
function cardsview(){
 if(S.q.length<10)S.q=[...Q].sort(()=>Math.random()-.5).slice(0,10);
 return `<a class="back" href="#kit">Back to kit card</a><div class="cardsheet">${S.q.map((t,i)=>`<div class="q"><div class="cnt">${i+1} of 10</div>${t}<div class="brand">Date Compass</div></div>`).join("")}</div><button onclick="try{print()}catch(e){}">Owner: print question cards</button>`;
}
function render(){app.className=S.view=='home'?'wide':'';
 const cur=(S.view=='q'||S.view=='kit')?S.from:S.view;
 document.querySelectorAll('header.site nav a').forEach(a=>{if(a.getAttribute('href')=='#'+cur)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 const v=S.view;
 app.innerHTML=v=="home"?home():v=="about"?about():v=="contact"?contact():v=="cards"?cardsview():v=="q"?qview():v=="kit"?kitview():filters()+((v=="custom"||S.gen)?plan():"");
}
function setf(k,v){
 S[k]=k=="b"?+v:v;
 if(S.view=="random")S.gen=false;
 else{ if(S.act&&!aPool().includes(S.act))S.act=null; if(S.food&&!fPool().includes(S.food))S.food=null }
 render();
}
function gen(){
 const ap=aPool();S.act=ap.length?rnd(ap):null;
 const fp=fPool();S.food=fp.length?rnd(fp):null;S.gen=true;render();
}
function pick(k,i){const L=k=="act"?A:F;S[k]=i===""?null:L[+i];render()}
function shuffle(k){
 const pool=k=="act"?aPool():fPool(),cur=S[k],alt=pool.filter(x=>x!=cur);
 const c=alt.length?rnd(alt):cur;
 if(c){S[k]=c;
  if(k=="act"&&S.view=="random"&&S.food&&S.food.c>Math.max(S.b-c.c,150)){const fp=fPool();if(fp.length)S.food=rnd(fp)}}
 render();
}
function startQ(){S.from=S.view;S.q=[...Q].sort(()=>Math.random()-.5).slice(0,10);S.qi=0;go("q")}
function qn(d){S.qi=Math.max(0,S.qi+d);render();scrollTo(0,0)}
async function copyPlan(){
 const t=`Date plan for us
Activity: ${S.act?S.act.n:"to be decided"}
Food: ${S.food?S.food.n:"to be decided"}
Estimated total: about ${peso(total())}
Planned with Date Compass${SITE?" "+SITE:""}`;
 const b=document.getElementById("cp");
 try{await navigator.clipboard.writeText(t);b.textContent="Copied"}catch(e){b.textContent="Could not copy, try a screenshot"}
}
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
let IO=null;
function reveal(){
 if(RM||!("IntersectionObserver" in window))return;
 if(IO)IO.disconnect();
 IO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;t.classList.add("in");IO.unobserve(t);setTimeout(()=>{t.classList.add("done");t.style.transitionDelay=""},1000)}}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
 document.querySelectorAll("#app .hiw,#app .cir,#app .panel,#app details,#app .card,#app .total,#app .big").forEach((el,i)=>{el.classList.add("rv");el.style.transitionDelay=(i%4)*70+"ms";IO.observe(el)});
}
addEventListener("scroll",()=>{const h=document.querySelector("header.site");if(h)h.classList.toggle("sc",scrollY>8)},{passive:true});
function go(h){try{history.pushState(null,"","#"+h)}catch(e){}route(h)}
document.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||e.metaKey||e.ctrlKey)return;e.preventDefault();go(a.getAttribute("href").slice(1)||"home")});
addEventListener("popstate",()=>route());
function route(hh){
 const h=hh||location.hash.slice(1)||"home";
 if((h=="custom"||h=="random")&&S.view=="home"){S.act=S.food=null;S.gen=false}
 if(h=="owner"){const pin=prompt("Owner PIN");if(pin===OWNER_PIN){S.owner=true;document.body.classList.add("owner")}go("home");return}
 if(h=="cards"&&!S.owner){go("home");return}
 if(h=="q"&&!S.q.length){go("home");return}
 if(h=="kit"&&!S.act&&!S.food){go("home");return}
 S.view=h;render();scrollTo(0,0);
 app.classList.remove('enter');void app.offsetWidth;app.classList.add('enter');reveal();
}
addEventListener("hashchange",route);
document.getElementById("yr").textContent=new Date().getFullYear();
route();