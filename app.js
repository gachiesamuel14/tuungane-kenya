const COUNTIES = [
  { name: "Nairobi", lat: -1.2864, lng: 36.8172 },
  { name: "Mombasa", lat: -4.0435, lng: 39.6682 },
  { name: "Kisumu", lat: -0.0917, lng: 34.768 },
  { name: "Nakuru", lat: -0.3031, lng: 36.08 },
  { name: "Uasin Gishu", lat: 0.5143, lng: 35.2698 },
  { name: "Kiambu", lat: -1.1714, lng: 36.8356 },
  { name: "Nyeri", lat: -0.4371, lng: 36.958 },
  { name: "Machakos", lat: -1.5177, lng: 37.2634 },
  { name: "Kakamega", lat: 0.2827, lng: 34.7519 },
  { name: "Kilifi", lat: -3.5107, lng: 39.9093 }
];

const INTERESTS = ["Hiking", "Afrobeats", "Football", "Church", "Cooking", "Startups", "Travel", "Movies", "Gym", "Poetry"];
const TRIBES = ["Any", "Kikuyu", "Luo", "Luhya", "Kalenjin", "Kamba", "Kisii", "Meru", "Mijikenda", "Somali", "Other"];
const RELIGIONS = ["Any", "Christian", "Muslim", "Traditional", "Spiritual", "Prefer not to say"];
const MODES = ["Everyone", "Student", "Professional", "Church"];

const SEED = [
  { id: "p1", name: "Amina", age: 26, county: "Mombasa", town: "Nyali", mode: "Professional", tribe: "Mijikenda", religion: "Muslim", interests: ["Travel", "Cooking", "Afrobeats"], bio: "Coastal mornings, strong kahawa, and honest conversations.", lat: -4.03, lng: 39.71, hue: 12 },
  { id: "p2", name: "Brian", age: 29, county: "Nairobi", town: "Kilimani", mode: "Professional", tribe: "Kikuyu", religion: "Christian", interests: ["Startups", "Gym", "Movies"], bio: "Product designer. Weekends are for Karura and nyama.", lat: -1.292, lng: 36.787, hue: 150 },
  { id: "p3", name: "Faith", age: 24, county: "Kiambu", town: "Ruiru", mode: "Student", tribe: "Kikuyu", religion: "Christian", interests: ["Church", "Poetry", "Movies"], bio: "Campus life, choir, and someone who texts back.", lat: -1.148, lng: 36.96, hue: 32 },
  { id: "p4", name: "Odhiambo", age: 31, county: "Kisumu", town: "Milimani", mode: "Professional", tribe: "Luo", religion: "Christian", interests: ["Football", "Cooking", "Travel"], bio: "Lake views and long calls. I cook fish better than I dance.", lat: -0.102, lng: 34.756, hue: 200 },
  { id: "p5", name: "Chebet", age: 27, county: "Uasin Gishu", town: "Eldoret", mode: "Professional", tribe: "Kalenjin", religion: "Christian", interests: ["Hiking", "Gym", "Travel"], bio: "I run before work. Looking for someone who can keep up.", lat: 0.52, lng: 35.28, hue: 88 },
  { id: "p6", name: "Wanjiku", age: 23, county: "Nairobi", town: "Westlands", mode: "Student", tribe: "Kikuyu", religion: "Christian", interests: ["Afrobeats", "Poetry", "Movies"], bio: "Sheng optional. Kindness is not.", lat: -1.267, lng: 36.811, hue: 340 },
  { id: "p7", name: "Hassan", age: 33, county: "Nairobi", town: "Eastleigh", mode: "Professional", tribe: "Somali", religion: "Muslim", interests: ["Startups", "Travel", "Cooking"], bio: "Tea, business, and family first. Serious profiles only.", lat: -1.274, lng: 36.848, hue: 210 },
  { id: "p8", name: "Achieng", age: 28, county: "Nakuru", town: "Milimani", mode: "Church", tribe: "Luo", religion: "Christian", interests: ["Church", "Hiking", "Cooking"], bio: "Sunday service, then a walk around the lake.", lat: -0.29, lng: 36.07, hue: 18 },
  { id: "p9", name: "Mutiso", age: 30, county: "Machakos", town: "Machakos", mode: "Professional", tribe: "Kamba", religion: "Christian", interests: ["Football", "Movies", "Gym"], bio: "Engineer. I will drive to Nairobi for the right person.", lat: -1.52, lng: 37.26, hue: 260 },
  { id: "p10", name: "Njeri", age: 25, county: "Nyeri", town: "Nyeri", mode: "Church", tribe: "Kikuyu", religion: "Christian", interests: ["Church", "Poetry", "Hiking"], bio: "Quiet town, loud laugh. Looking for something steady.", lat: -0.437, lng: 36.96, hue: 42 },
  { id: "p11", name: "Linet", age: 22, county: "Kakamega", town: "Kakamega", mode: "Student", tribe: "Luhya", religion: "Christian", interests: ["Afrobeats", "Football", "Cooking"], bio: "Campus, chapati, and people who mean what they say.", lat: 0.282, lng: 34.75, hue: 300 },
  { id: "p12", name: "Salim", age: 34, county: "Kilifi", town: "Kilifi", mode: "Professional", tribe: "Mijikenda", religion: "Muslim", interests: ["Travel", "Cooking", "Movies"], bio: "Ocean person. Ask me about the best pilau in town.", lat: -3.63, lng: 39.85, hue: 175 }
];

const KEY = "tuungane-v1";
const state = load();
let screen = state.session ? "discover" : "home";
let toast = "";
let chatWith = null;
let geo = null;

function load() {
  const saved = JSON.parse(localStorage.getItem(KEY) || "null");
  if (saved) return saved;
  return {
    session: null,
    users: [],
    likes: {},
    passes: {},
    matches: [],
    messages: {},
    reports: [],
    blocks: {},
    notifications: []
  };
}
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function me() { return state.users.find((u) => u.id === state.session) || null; }
function km(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)));
}
function countyOf(name) { return COUNTIES.find((c) => c.name === name) || COUNTIES[0]; }
function origin() {
  const user = me();
  if (geo) return geo;
  if (user) return countyOf(user.county);
  return COUNTIES[0];
}
function people() {
  const user = me();
  const filters = user?.filters || { county: "Any", distance: 150, minAge: 18, maxAge: 45, tribe: "Any", religion: "Any", mode: "Everyone", interest: "Any" };
  const here = origin();
  return SEED.filter((p) => {
    if ((state.blocks[user?.id] || []).includes(p.id)) return false;
    if ((state.passes[user?.id] || []).includes(p.id)) return false;
    if ((state.likes[user?.id] || []).includes(p.id)) return false;
    const dist = km(here, p);
    p.distance = dist;
    if (p.age < filters.minAge || p.age > filters.maxAge) return false;
    if (filters.county !== "Any" && p.county !== filters.county) return false;
    if (dist > Number(filters.distance)) return false;
    if (filters.tribe !== "Any" && p.tribe !== filters.tribe) return false;
    if (filters.religion !== "Any" && p.religion !== filters.religion) return false;
    if (filters.mode !== "Everyone" && p.mode !== filters.mode) return false;
    if (filters.interest !== "Any" && !p.interests.includes(filters.interest)) return false;
    return true;
  }).sort((a, b) => a.distance - b.distance);
}
function notify(text) {
  if (!state.session) return;
  state.notifications.unshift({ id: Date.now(), text, at: new Date().toLocaleString() });
  save();
}
function showToast(text) { toast = text; render(); setTimeout(() => { toast = ""; render(); }, 2400); }

function signup(form) {
  const data = Object.fromEntries(new FormData(form));
  if (!data.adult) return showToast("You must be 18 or older.");
  if (state.users.some((u) => u.email === data.email)) return showToast("That email is already registered on this device.");
  const county = countyOf(data.county);
  const user = {
    id: "u" + Date.now(),
    name: data.name,
    email: data.email,
    password: data.password,
    age: Number(data.age),
    county: data.county,
    town: data.town,
    mode: data.mode,
    tribe: data.tribe,
    religion: data.religion,
    interests: data.interests.split(",").map((s) => s.trim()).filter(Boolean),
    bio: data.bio,
    photo: "",
    lat: county.lat,
    lng: county.lng,
    premium: false,
    filters: { county: "Any", distance: 80, minAge: 18, maxAge: 40, tribe: "Any", religion: "Any", mode: "Everyone", interest: "Any" }
  };
  state.users.push(user);
  state.session = user.id;
  state.likes[user.id] = [];
  state.passes[user.id] = [];
  state.blocks[user.id] = [];
  save();
  notify("Profile created. Allow location for closer matches.");
  screen = "discover";
  askLocation();
  render();
}
function login(form) {
  const data = Object.fromEntries(new FormData(form));
  const user = state.users.find((u) => u.email === data.email && u.password === data.password);
  if (!user) return showToast("No match for that email and password on this device.");
  state.session = user.id;
  save();
  screen = "discover";
  askLocation();
  render();
}
function askLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition((pos) => {
    geo = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    const user = me();
    if (user) { user.lat = geo.lat; user.lng = geo.lng; save(); }
    showToast("Location on. Distances are from where you are.");
  }, () => showToast("Location denied. Using your county centre instead."));
}
function like(person) {
  const user = me();
  state.likes[user.id] = state.likes[user.id] || [];
  state.likes[user.id].push(person.id);
  const mutual = person.id.charCodeAt(1) % 2 === 1;
  if (mutual) {
    state.matches.push({ id: "m" + Date.now(), userId: user.id, personId: person.id });
    notify("It's a match with " + person.name + ".");
    showToast("Matched with " + person.name);
  } else showToast("Liked " + person.name);
  save();
  render();
}
function pass(person) {
  const user = me();
  state.passes[user.id] = state.passes[user.id] || [];
  state.passes[user.id].push(person.id);
  save();
  render();
}
function sendMessage(form) {
  const text = new FormData(form).get("text").trim();
  if (!text || !chatWith) return;
  const key = state.session + ":" + chatWith;
  state.messages[key] = state.messages[key] || [];
  state.messages[key].push({ from: "me", text, at: new Date().toLocaleTimeString() });
  const person = SEED.find((p) => p.id === chatWith);
  state.messages[key].push({ from: "them", text: "Sawa " + (me()?.name || "") + ", hiyo ni poa. Tell me more.", at: new Date().toLocaleTimeString() });
  notify(person.name + " replied.");
  save();
  form.reset();
  render();
}
function report(personId, reason) {
  state.reports.push({ id: Date.now(), by: state.session, personId, reason, at: new Date().toISOString() });
  state.blocks[state.session] = state.blocks[state.session] || [];
  state.blocks[state.session].push(personId);
  save();
  showToast("Report saved on this device and profile blocked.");
  screen = "discover";
}

function topbar() {
  const user = me();
  const notes = (state.notifications || []).length;
  return `<header class="topbar">
    <div class="brand"><span class="mark"></span> Tuungane</div>
    <nav class="nav">
      ${user ? `
        <button class="${screen === "discover" ? "active" : ""}" data-go="discover">Discover</button>
        <button class="${screen === "matches" ? "active" : ""}" data-go="matches">Matches</button>
        <button class="${screen === "chat" ? "active" : ""}" data-go="chat">Chat</button>
        <button class="${screen === "notes" ? "active" : ""}" data-go="notes">Alerts ${notes ? `<span class="badge">${notes}</span>` : ""}</button>
        <button class="${screen === "profile" ? "active" : ""}" data-go="profile">Profile</button>
        <button class="${screen === "premium" ? "active" : ""}" data-go="premium">Premium</button>
        <button data-logout>Log out</button>` : `
        <button data-go="home">Home</button>
        <button data-go="login">Log in</button>
        <button class="solid" data-go="signup">Join</button>`}
    </nav>
  </header>`;
}
function home() {
  return `<section class="hero">
    <div>
      <div class="kicker">Kenya · location-based matchmaking</div>
      <h1>Meet someone close enough to actually meet.</h1>
      <p class="lede">Tuungane matches people by distance, county, age, interests, and lifestyle — from Nairobi to the Coast. Student, professional, or church mode.</p>
      <div class="pills"><span class="pill">GPS or county</span><span class="pill">M-Pesa premium (demo)</span><span class="pill">18+ only</span><span class="pill">Report & block</span></div>
      <div class="form-actions"><button class="solid" data-go="signup">Create a profile</button><button class="ghost" data-go="login">I already joined</button></div>
    </div>
    <div class="card-stack">
      <div class="preview"><strong>Chebet, 27</strong>Eldoret · 4 km in demo</div>
      <div class="preview front"><strong>Amina, 26</strong>Nyali · likes cooking</div>
    </div>
  </section>
  <section class="grid3 section">
    <article class="panel"><h3>Near you</h3><p class="note">The app asks for location, then ranks people with a haversine distance. Deny GPS and it falls back to your county centre.</p></article>
    <article class="panel"><h3>Your filters</h3><p class="note">County, kilometres, age, tribe, religion, mode, and interests. Filters stay on this device with your profile.</p></article>
    <article class="panel"><h3>Safety first</h3><p class="note">Report and block are built in. Meet in public. This prototype stores data only in your browser.</p></article>
  </section>`;
}
function auth(mode) {
  const counties = COUNTIES.map((c) => `<option>${c.name}</option>`).join("");
  if (mode === "login") {
    return `<section class="panel" style="max-width:480px;margin:28px auto"><h2>Welcome back</h2>
      <form id="login">
        <label>Email</label><input name="email" type="email" required />
        <label>Password</label><input name="password" type="password" required />
        <div class="form-actions"><button class="solid" type="submit">Log in</button></div>
        <p class="note">Accounts in this demo live in local storage, not on a server.</p>
      </form></section>`;
  }
  return `<section class="panel" style="max-width:720px;margin:28px auto"><h2>Create your profile</h2>
    <form id="signup">
      <div class="grid2">
        <div><label>Name</label><input name="name" required /></div>
        <div><label>Age</label><input name="age" type="number" min="18" max="80" value="24" required /></div>
        <div><label>Email</label><input name="email" type="email" required /></div>
        <div><label>Password</label><input name="password" type="password" minlength="6" required /></div>
        <div><label>County</label><select name="county">${counties}</select></div>
        <div><label>Town</label><input name="town" placeholder="Kilimani, Nyali, Milimani" required /></div>
        <div><label>Mode</label><select name="mode">${MODES.filter(m => m !== "Everyone").map(m => `<option>${m}</option>`).join("")}</select></div>
        <div><label>Tribe</label><select name="tribe">${TRIBES.filter(t => t !== "Any").map(t => `<option>${t}</option>`).join("")}</select></div>
        <div><label>Religion</label><select name="religion">${RELIGIONS.filter(t => t !== "Any").map(t => `<option>${t}</option>`).join("")}</select></div>
        <div><label>Interests</label><input name="interests" placeholder="Hiking, Afrobeats, Church" /></div>
      </div>
      <label>Bio</label><textarea name="bio" rows="3" required placeholder="What should someone nearby know?"></textarea>
      <label><input type="checkbox" name="adult" style="width:auto" /> I am 18 or older</label>
      <div class="form-actions"><button class="solid" type="submit">Start matching</button></div>
    </form></section>`;
}
function discover() {
  const user = me();
  const list = people();
  const person = list[0];
  const f = user.filters;
  const options = (arr, current) => arr.map((item) => `<option ${item === current ? "selected" : ""}>${item}</option>`).join("");
  return `<section class="discover">
    <form class="panel" id="filters">
      <h3>Filters</h3>
      <label>County</label><select name="county">${options(["Any", ...COUNTIES.map(c => c.name)], f.county)}</select>
      <label>Max distance (km)</label><input name="distance" type="number" min="5" max="800" value="${f.distance}" />
      <label>Min age</label><input name="minAge" type="number" min="18" value="${f.minAge}" />
      <label>Max age</label><input name="maxAge" type="number" value="${f.maxAge}" />
      <label>Tribe</label><select name="tribe">${options(TRIBES, f.tribe)}</select>
      <label>Religion</label><select name="religion">${options(RELIGIONS, f.religion)}</select>
      <label>Mode</label><select name="mode">${options(MODES, f.mode)}</select>
      <label>Interest</label><select name="interest">${options(["Any", ...INTERESTS], f.interest)}</select>
      <div class="form-actions"><button class="solid" type="submit">Apply</button><button type="button" class="ghost" id="locate">Use my GPS</button></div>
      <p class="note">${geo ? "Using your GPS." : "Using " + user.county + " until you allow location."}</p>
    </form>
    <div>
      ${person ? `<article class="person" style="background-image:linear-gradient(180deg,rgba(20,12,8,.05),rgba(20,12,8,.78)),linear-gradient(145deg,hsl(${person.hue} 62% 42%),hsl(${person.hue + 30} 40% 24%))">
        <div class="chips">${person.interests.map(i => `<span class="chip">${i}</span>`).join("")}</div>
        <h2 style="color:#fff;font-size:40px">${person.name}, ${person.age}</h2>
        <div class="meta">${person.town}, ${person.county} · ${person.distance} km · ${person.mode}</div>
        <p>${person.bio}</p>
        <div class="meta">${person.tribe} · ${person.religion}</div>
      </article>
      <div class="actions">
        <button class="pass" data-pass="${person.id}">✕</button>
        <button class="ghost" data-report="${person.id}">Report</button>
        <button class="like" data-like="${person.id}">♥</button>
      </div>` : `<div class="panel"><h2>No one in this radius</h2><p class="note">Widen the distance, switch county to Any, or reset filters.</p></div>`}
    </div>
  </section>`;
}
function matches() {
  const mine = state.matches.filter(m => m.userId === state.session);
  if (!mine.length) return `<section class="panel"><h2>No matches yet</h2><p class="note">Like a few nearby profiles. Mutual likes open chat.</p></section>`;
  return `<section class="panel"><h2>Matches</h2>${mine.map(m => {
    const p = SEED.find(x => x.id === m.personId);
    return `<div class="list-item"><strong>${p.name}</strong> · ${p.town}<div class="form-actions"><button class="solid" data-chat="${p.id}">Chat</button><button data-report="${p.id}">Report</button></div></div>`;
  }).join("")}</section>`;
}
function chat() {
  const mine = state.matches.filter(m => m.userId === state.session);
  const current = SEED.find(p => p.id === chatWith) || SEED.find(p => p.id === mine[0]?.personId);
  if (current) chatWith = current.id;
  const thread = (state.messages[state.session + ":" + chatWith] || []);
  return `<section class="app-layout">
    <aside class="panel side">${mine.map(m => {
      const p = SEED.find(x => x.id === m.personId);
      return `<button class="${p.id === chatWith ? "active" : ""}" data-chat="${p.id}">${p.name}</button>`;
    }).join("") || "<p class='note'>Match first.</p>"}</aside>
    <div class="panel">
      ${current ? `<h2>${current.name}</h2><p class="note">${current.town}, ${current.county}</p>
        <div>${thread.map(msg => `<div class="msg ${msg.from === "me" ? "mine" : "theirs"}">${msg.text}<div class="note">${msg.at}</div></div>`).join("") || "<p class='note'>Say habari.</p>"}</div>
        <form id="chat"><label>Message</label><input name="text" required placeholder="Habari, uko free weekend?" />
        <div class="form-actions"><button class="solid">Send</button></div></form>` : "<p>No chat yet.</p>"}
    </div>
  </section>`;
}
function notes() {
  const items = state.notifications || [];
  return `<section class="panel"><h2>Notifications</h2>${items.map(n => `<div class="list-item"><strong>${n.text}</strong><div class="note">${n.at}</div></div>`).join("") || "<p class='note'>Nothing yet.</p>"}</section>`;
}
function profile() {
  const user = me();
  return `<section class="panel" style="max-width:720px"><h2>${user.name}</h2>
    <p class="note">${user.town}, ${user.county} · ${user.mode} · ${user.premium ? "Premium" : "Free"}</p>
    <form id="photo">
      <label>Photo</label><input name="photo" type="file" accept="image/*" />
      ${user.photo ? `<img alt="Your photo" src="${user.photo}" style="width:160px;height:160px;object-fit:cover;border-radius:18px;margin-top:10px" />` : "<p class='note'>No photo yet. It stays on this device.</p>"}
    </form>
    <p>${user.bio}</p>
    <div class="chips">${user.interests.map(i => `<span class="pill">${i}</span>`).join("")}</div>
  </section>`;
}
function premium() {
  const user = me();
  return `<section class="panel" style="max-width:640px"><h2>Tuungane Plus</h2>
    <p>See who liked you, wider radius, and a verified badge. KES 499 / month.</p>
    <ul><li>Unlimited likes</li><li>County spotlight</li><li>Read receipts in chat</li></ul>
    ${user.premium ? "<p class='note'>Premium is active on this demo profile.</p>" : `<form id="mpesa">
      <label>M-Pesa number</label><input name="phone" placeholder="07xx xxx xxx" required />
      <p class="note">Demo checkout only. No STK push is sent and no money moves.</p>
      <div class="form-actions"><button class="solid green" type="submit">Pay with M-Pesa (demo)</button></div>
    </form>`}
  </section>`;
}
function reportScreen() {
  const person = SEED.find(p => p.id === screen.split(":")[1]);
  if (!person) return "";
  return `<section class="panel" style="max-width:560px"><h2>Report ${person.name}</h2>
    <form id="report">
      <label>Reason</label>
      <select name="reason"><option>Fake profile</option><option>Harassment</option><option>Spam</option><option>Underage suspicion</option><option>Something else</option></select>
      <div class="form-actions"><button class="solid red" type="submit">Submit and block</button></div>
    </form></section>`;
}

function render() {
  const user = me();
  let body = home();
  if (screen === "login") body = auth("login");
  if (screen === "signup") body = auth("signup");
  if (user && screen === "discover") body = discover();
  if (user && screen === "matches") body = matches();
  if (user && screen === "chat") body = chat();
  if (user && screen === "notes") body = notes();
  if (user && screen === "profile") body = profile();
  if (user && screen === "premium") body = premium();
  if (user && screen.startsWith("report:")) body = reportScreen();
  document.getElementById("app").innerHTML = `<div class="shell">${topbar()}${body}</div>${toast ? `<div class="toast">${toast}</div>` : ""}`;
  bind();
}
function bind() {
  document.querySelectorAll("[data-go]").forEach(btn => btn.onclick = () => { screen = btn.dataset.go; render(); });
  document.querySelectorAll("[data-logout]").forEach(btn => btn.onclick = () => { state.session = null; save(); screen = "home"; render(); });
  const signupForm = document.getElementById("signup");
  if (signupForm) signupForm.onsubmit = (e) => { e.preventDefault(); signup(signupForm); };
  const loginForm = document.getElementById("login");
  if (loginForm) loginForm.onsubmit = (e) => { e.preventDefault(); login(loginForm); };
  const filters = document.getElementById("filters");
  if (filters) filters.onsubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(filters));
    me().filters = { ...me().filters, ...data, distance: Number(data.distance), minAge: Number(data.minAge), maxAge: Number(data.maxAge) };
    save();
    render();
  };
  const locate = document.getElementById("locate");
  if (locate) locate.onclick = askLocation;
  document.querySelectorAll("[data-like]").forEach(btn => btn.onclick = () => like(SEED.find(p => p.id === btn.dataset.like)));
  document.querySelectorAll("[data-pass]").forEach(btn => btn.onclick = () => pass(SEED.find(p => p.id === btn.dataset.pass)));
  document.querySelectorAll("[data-chat]").forEach(btn => btn.onclick = () => { chatWith = btn.dataset.chat; screen = "chat"; render(); });
  document.querySelectorAll("[data-report]").forEach(btn => btn.onclick = () => { screen = "report:" + btn.dataset.report; render(); });
  const chatForm = document.getElementById("chat");
  if (chatForm) chatForm.onsubmit = (e) => { e.preventDefault(); sendMessage(chatForm); };
  const reportForm = document.getElementById("report");
  if (reportForm) reportForm.onsubmit = (e) => { e.preventDefault(); report(screen.split(":")[1], new FormData(reportForm).get("reason")); };
  const photo = document.getElementById("photo");
  if (photo) photo.photo.onchange = () => {
    const file = photo.photo.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { me().photo = reader.result; save(); render(); };
    reader.readAsDataURL(file);
  };
  const mpesa = document.getElementById("mpesa");
  if (mpesa) mpesa.onsubmit = (e) => {
    e.preventDefault();
    me().premium = true;
    notify("Premium demo activated. No M-Pesa charge was made.");
    save();
    showToast("Demo premium on. No payment was taken.");
  };
}
render();
