// ===== Tara-Go! Mobile Prototype =====
(function () {
  "use strict";

  // Screen definitions
  const screens = [
    {
      id: "login", name: "Login",
      desc: "Welcome screen where users log in with their phone number or create a new account.",
      components: ["Phone Input", "Password Input", "Login Button", "Register Link"],
      interactions: ["Login → Home Screen", "Register → Registration Screen"],
      flow: ["Login", "Register", "Home"]
    },
    {
      id: "register", name: "User Registration",
      desc: "New users fill in personal details, accept terms, and create their Tara-Go! account.",
      components: ["First Name", "Last Name", "Phone Input", "Terms Checkbox", "Register Button"],
      interactions: ["Register → Choose Journey", "Back → Login"],
      flow: ["Login", "Register", "Choose Journey"]
    },
    {
      id: "select-role", name: "Choose Journey",
      desc: "Users select if they are a driver or a commuter to personalize their experience.",
      components: ["Driver Button", "Commuter Button", "Back Button"],
      interactions: ["Driver → Vehicle Profiling", "Commuter → Home Screen"],
      flow: ["Register", "Choose Journey", "Vehicle Profiling"]
    },
    {
      id: "home", name: "Home",
      desc: "Main dashboard showing a greeting, registered vehicles, and quick actions.",
      components: ["Greeting Header", "Vehicle Cards", "Bottom Tab Bar"],
      interactions: ["Vehicle Card → Vehicle Detail", "Tab → Navigate Sections"],
      flow: ["Home", "Routes", "Community", "Ranking"]
    },
    {
      id: "vehicle", name: "Vehicle Profiling",
      desc: "Users register their vehicle by selecting the type and entering details like plate number.",
      components: ["Vehicle Type Select", "Smoke Emission Input", "Plate Number", "Submit Button"],
      interactions: ["Submit → Home Screen", "Back → Registration"],
      flow: ["Register", "Vehicle Profiling", "Home"]
    },
    {
      id: "routes", name: "Routes (Planner)",
      desc: "Interactive map showing route options with categories like Home, Work, and saved locations.",
      components: ["Map View", "Route Tabs", "Route Options", "Bottom Tab Bar"],
      interactions: ["Route Option → Navigation"],
      flow: ["Planner", "Routes", "Navigation"]
    },
    {
      id: "routes-nav", name: "Navigation (RTDD)",
      desc: "Real-time turn-by-turn navigation with estimated time, distance, and route visualization.",
      components: ["Direction Banner", "Map View", "ETA Footer", "Action Buttons"],
      interactions: ["Report → Report Problem", "End → Planner"],
      flow: ["Planner", "Navigation", "Arrived"]
    },
    {
      id: "routes-report", name: "Report Problem",
      desc: "Report road issues during navigation such as hazards, closures, or accidents.",
      components: ["Direction Banner", "Map View", "Report Button", "ETA Footer"],
      interactions: ["Report → Submit Issue", "Continue → Navigation"],
      flow: ["Navigation", "Report", "Continue"]
    },
    {
      id: "community", name: "Community Feed",
      desc: "Browse community posts showing road conditions, incidents, and neighborhood reports.",
      components: ["Post Cards", "Image Preview", "Like/Comment/Share", "Bottom Tab Bar"],
      interactions: ["Post → Detail View", "Report → Incident Report"],
      flow: ["Home", "Community", "Report Incident"]
    },
    {
      id: "community-report", name: "Report Incident",
      desc: "Submit a community incident report with photo upload, incident type, location, and description.",
      components: ["Image Upload", "Incident Type Select", "Location Select", "Description", "Submit Button"],
      interactions: ["Submit → Community Feed", "Back → Community"],
      flow: ["Community", "Report Incident", "Feed"]
    },
    {
      id: "ranking", name: "Community Leaderboard",
      desc: "Leaderboard showing the top users with the most points.",
      components: ["Top Contributors List"],
      interactions: ["Back → Home"],
      flow: ["Home", "Community Leaderboard"]
    },
    {
      id: "my-points", name: "My Points",
      desc: "Dashboard showing the user's accumulated points, upcoming rewards, and recent contribution history.",
      components: ["Total Points", "Next Reward", "Contribution History"],
      interactions: ["Back → Home"],
      flow: ["Home", "My Points"]
    },
    {
      id: "notif-passable", name: "Notification (Passable)",
      desc: "Push notification banner alerting that a road incident exists but the road is still passable.",
      components: ["Push Banner", "App Icon", "Notification Text"],
      interactions: ["Tap → Alert Passable"],
      flow: ["Lock Screen", "Notification", "Alert"]
    },
    {
      id: "alert-passable", name: "Alert — Passable",
      desc: "Full-screen alert dialog confirming the road is passable despite a reported incident.",
      components: ["Alert Icon", "Title", "Message", "Noted Button"],
      interactions: ["Noted → Home"],
      flow: ["Notification", "Alert", "Home"]
    },
    {
      id: "notif-danger", name: "Notification (Danger)",
      desc: "Push notification banner warning that a road is NOT passable due to an incident.",
      components: ["Push Banner", "App Icon", "Warning Text"],
      interactions: ["Tap → Alert Danger"],
      flow: ["Lock Screen", "Notification", "Alert"]
    },
    {
      id: "alert-danger", name: "Alert — Danger",
      desc: "Full-screen alert warning the road is not passable and the user should find an alternate route.",
      components: ["Alert Icon", "Title", "Warning Message", "Noted Button"],
      interactions: ["Noted → Home"],
      flow: ["Notification", "Alert", "Home"]
    },
    {
      id: "notif-htd", name: "Heavy Traffic (HTD)",
      desc: "Heavy traffic detected ahead. User can choose to reroute or wait in traffic.",
      components: ["Traffic Card", "Reroute Option", "Wait Option"],
      interactions: ["Reroute → Routes", "Wait → Navigation"],
      flow: ["Navigation", "HTD Alert", "Reroute / Wait"]
    },
    {
      id: "planner", name: "Planner",
      desc: "Quick travel check with live route conditions, ETA estimates, and commute costs.",
      components: ["Quick Travel Check", "Categorized Dashboard", "From/To Inputs", "Live Routes", "AI Tips"],
      interactions: ["Check Conditions → Travel Conditions", "Route → Navigation"],
      flow: ["Home", "Planner", "Travel Conditions"]
    },
    {
      id: "travel-conditions", name: "Travel Conditions",
      desc: "Shows the estimated time and fastest route per transport category after checking conditions.",
      components: ["Header", "Transport List (Car, Train, Bike, Walk)"],
      interactions: ["Transport Option → Navigation", "Back → Planner"],
      flow: ["Planner", "Travel Conditions", "Navigation"]
    },
    {
      id: "safe-zones-list", name: "Safe Zones List",
      desc: "Comprehensive list of nearby safe zones for parking or resting.",
      components: ["Header", "Safe Zone List", "Location Item"],
      interactions: ["Location → Navigation", "Back → Planner"],
      flow: ["Planner", "Safe Zones List", "Navigation"]
    },
    {
      id: "ai-chat", name: "AI Chat",
      desc: "Tara-Go! AI Assistant - AI chatbot for route advice, traffic updates, and commute planning.",
      components: ["Chat Header", "Suggested Topics", "Message Input", "Send Button"],
      interactions: ["Topic → Chat Response", "Send → AI Reply"],
      flow: ["Home", "AI Chat", "Response"]
    },
    {
      id: "profile", name: "Profile",
      desc: "User profile showing registered vehicles, favorite locations, and account details.",
      components: ["Profile Header", "Vehicle List", "Favorite Locations", "Add Vehicle"],
      interactions: ["Add Vehicle → Vehicle Form", "Edit Location → Map"],
      flow: ["Home", "Profile", "Settings"]
    },
    {
      id: "my-reports", name: "My Contributions",
      desc: "User's records of incidents they have reported to the community.",
      components: ["Header", "Incident List", "Status Filters"],
      interactions: ["Back → Home"],
      flow: ["Home", "Side Menu", "My Contributions"]
    },
    {
      id: "app-report", name: "Report Problem",
      desc: "Screen for users to report bugs or app issues.",
      components: ["Issue Type Select", "Description Textarea", "Screenshot Upload", "Submit Button"],
      interactions: ["Submit → Home"],
      flow: ["Home", "Side Menu", "Report Problem"]
    },
    {
      id: "report-success", name: "Report Success",
      desc: "Confirmation screen showing the report was successfully submitted.",
      components: ["Check Icon", "Success Message", "Subtext"],
      interactions: ["Auto Redirect → Home"],
      flow: ["Report", "Success", "Home"]
    },
    {
      id: "verification", name: "Verification",
      desc: "Verify your account by uploading an ID and doing a live selfie verification.",
      components: ["ID Upload", "Live Selfie", "Submit Button"],
      interactions: ["Submit → Home"],
      flow: ["Home", "Side Menu", "Verification"]
    },
    {
      id: "notifications", name: "Notification Center",
      desc: "Central hub for all alerts, warnings, and system notifications.",
      components: ["Notification List", "Filter Tabs"],
      interactions: ["Tap → Notification Detail"],
      flow: ["Home", "Notifications", "Detail"]
    }
  ];

  // HTML generators for each screen
  const screenHTML = {
    login: () => `
      <div class="m-screen" style="background:linear-gradient(180deg,#f0fdfa 0%,#fff 40%)">
        <div class="login-welcome">
          <h1>Hello, Welcome!</h1>
          <p>Let's get you moving</p>
        </div>
        <div class="login-phone-row">
          <div class="login-country">+63</div>
          <input type="tel" class="m-input login-phone-input" placeholder="Phone number">
        </div>
        <div class="m-input-group">
          <input type="password" class="m-input" placeholder="Password">
        </div>
        <div style="margin: 10px 24px 20px; padding: 10px; border: 1px solid #d3d3d3; border-radius: 4px; background: #fafafa; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="checkbox" style="width: 24px; height: 24px; cursor: pointer;">
            <span style="font-size: 0.85rem; color: #333; font-family: sans-serif;">I'm not a robot</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <i class="fas fa-sync" style="font-size: 1.5rem; color: #1a73e8; margin-bottom: 2px;"></i>
            <span style="font-size: 0.55rem; color: #555; font-family: sans-serif;">reCAPTCHA</span>
          </div>
        </div>
        <button class="m-btn m-btn-dark" onclick="navigateTo('home')">Login</button>
        <div class="m-divider"></div>
        <p class="m-text-sm m-text-center">Don't have a Tara-Go! account yet?</p>
        <button class="m-btn m-btn-outline" onclick="navigateTo('register')">Create an account</button>
        <div style="display:flex; justify-content:center; gap:40px; margin-top:30px; margin-bottom:20px; color:var(--text3); font-size:0.75rem;">
          <button style="background:none; border:none; color:inherit; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:6px;"><i class="fas fa-circle-info" style="font-size:1.2rem;"></i><span>About</span></button>
          <button style="background:none; border:none; color:inherit; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:6px;"><i class="fas fa-circle-question" style="font-size:1.2rem;"></i><span>Help</span></button>
        </div>
      </div>`,

    register: () => `
      <div class="m-screen" style="background:#fff">
        <div class="register-header">
          <h1 style="font-family:var(--font-display)">Tara-Go!..</h1>
          <p>Let's Get Started!</p>
        </div>
        <div class="m-input-group"><label class="m-input-label">First Name</label><input class="m-input" placeholder="Juan"></div>
        <div class="m-input-group"><label class="m-input-label">Last Name</label><input class="m-input" placeholder="Dela Cruz"></div>
        <div class="m-input-group"><label class="m-input-label">Phone Number</label>
          <div style="display:flex;gap:8px"><div class="login-country" style="padding:14px 10px">+63</div><input class="m-input" placeholder="9XX XXX XXXX" style="flex:1"></div>
        </div>

        <div class="m-divider"></div>
        <p class="register-terms">By creating a Tara-Go! account, you agree to the <a href="#">Terms and Conditions</a> and <a href="#">Community Rules</a>.</p>
        <button class="m-btn m-btn-dark" onclick="navigateTo('select-role')">Create Account</button>
        <div class="m-divider"></div>
        <p class="m-text-sm m-text-center" style="margin-bottom:8px; color:#666;">Already have a Tara-Go! account?</p>
        <button class="m-btn m-btn-outline" onclick="navigateTo('login')">Log In</button>
      </div>`,

    "select-role": () => `
      <div class="m-screen" style="background:#fafafa; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px; text-align:center; position:relative;">
        <button class="m-back" onclick="navigateTo('register')" style="position:absolute; top:20px; left:20px;"><i class="fas fa-chevron-left"></i> Back</button>
        <div style="font-size:3.5rem; color:var(--accent); margin-bottom:20px; margin-top:20px;"><i class="fas fa-route"></i></div>
        <h2 style="font-family:var(--font-display); font-size:1.6rem; color:#111; margin-bottom:8px;">Choose your journey</h2>
        <p style="color:#555; font-size:.9rem; margin-bottom:40px; line-height:1.4;">Select how you typically travel so we can personalize your Tara-Go! experience.</p>
        
        <button class="m-btn m-btn-primary" style="margin-bottom:16px; padding:16px; font-size:1.1rem; display:flex; align-items:center; justify-content:center; gap:12px; box-shadow:0 8px 16px rgba(20,184,166,0.2); width:100%; border-radius:12px;" onclick="navigateTo('vehicle')">
          <i class="fas fa-car" style="font-size:1.2rem;"></i> I am a Driver
        </button>
        
        <button class="m-btn m-btn-outline" style="padding:16px; font-size:1.1rem; display:flex; align-items:center; justify-content:center; gap:12px; color:#555; border-color:#ccc; width:100%; border-radius:12px;" onclick="navigateTo('home')">
          <i class="fas fa-bus" style="font-size:1.2rem;"></i> I am a Commuter
        </button>
      </div>`,

    home: () => {
      const users = [
        { name: "Maria Santos", score: 2450 },
        { name: "Juan Cruz", score: 2180 },
        { name: "Ana Reyes", score: 1920 }
      ];
      const posClass = (i) => i === 0 ? "gold" : i === 1 ? "silver" : "bronze";
      
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      // Sync date and time to PH time (Asia/Manila)
      const phTimeString = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
      const phDate = new Date(phTimeString);
      const currentDay = days[phDate.getDay()];
      const hour = phDate.getHours();
      let greeting = "Good evening";
      if (hour < 12) greeting = "Good morning";
      else if (hour < 18) greeting = "Good afternoon";

      let codingDigits = "None";
      if (currentDay === "Monday") codingDigits = "1 & 2";
      else if (currentDay === "Tuesday") codingDigits = "3 & 4";
      else if (currentDay === "Wednesday") codingDigits = "5 & 6";
      else if (currentDay === "Thursday") codingDigits = "7 & 8";
      else if (currentDay === "Friday") codingDigits = "9 & 0";

      return `
      <div class="m-screen" style="background:#fafafa;position:relative;height:100%;overflow:hidden;display:flex;flex-direction:column;">
        <div style="flex-shrink:0;position:relative;z-index:10;background:#fafafa;">
          <div class="home-greeting" style="background:linear-gradient(135deg,var(--accent),var(--accent2));padding-bottom:20px;display:flex;align-items:flex-start;gap:12px;margin-top:-54px;padding-top:70px;padding-left:16px;padding-right:16px;color:#fff;border-radius:0 0 20px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
            <button onclick="document.getElementById('mSideMenu').classList.add('open')" style="background:none;border:none;font-size:1.4rem;color:#fff;cursor:pointer;padding:4px"><i class="fas fa-bars"></i></button>
            <div style="flex:1">
              <span class="greeting-sub" style="color:rgba(255,255,255,0.8)">Tara-Go!</span>
              <h1 style="margin-top:0;color:#fff">${greeting}, User!</h1>
            </div>
            <button onclick="navigateTo('notifications')" style="background:none;border:none;font-size:1.4rem;color:#fff;cursor:pointer;padding:4px;margin-top:4px"><i class="fas fa-bell"></i></button>
          </div>
        </div>
        
        <div style="flex:1;overflow-y:auto;padding-bottom:100px;scrollbar-width:none;">
          <div class="gray-container" style="margin:16px; padding:16px; border-radius:12px; display:flex; align-items:flex-start; gap:12px; background: ${codingDigits !== "None" ? 'rgba(239, 68, 68, 0.05)' : 'rgba(20, 184, 166, 0.05)'}; border: 1px solid ${codingDigits !== "None" ? '#fca5a5' : '#99f6e4'};">
            <div style="font-size:1.8rem; color:${codingDigits !== "None" ? '#ef4444' : 'var(--accent)'}; margin-top:4px;"><i class="fas fa-car-on"></i></div>
            <div style="flex:1;">
              <h4 style="margin:0; font-size:.95rem; color:#111;">Number Coding Scheme</h4>
              <p style="margin:4px 0 0; font-size:.8rem; color:#444;">Today is <strong>${currentDay}</strong>. ${codingDigits !== "None" ? `Vehicles with plates ending in <strong style="color:#ef4444; font-size:.9rem;">${codingDigits}</strong> are coded today.` : '<strong>Coding is suspended today.</strong>'}</p>
              ${codingDigits !== "None" ? `<div style="margin-top:10px; font-size:.7rem; color:#555; background:rgba(0,0,0,0.04); padding:10px; border-radius:8px;"><strong>Hours:</strong> 7AM-10AM, 5PM-8PM (Window: 10AM-5PM)<br><strong>Exempted:</strong> Hybrid/Electric, Motorcycles, PUVs.<br><span style="color:#ef4444; font-style:italic;">*Note: Makati has no window hours (7AM-7PM).</span></div>` : ''}
            </div>
          </div>

        <div style="padding:16px 20px 8px;font-size:.7rem;font-weight:700;color:#888;letter-spacing:1.5px;text-transform:uppercase;display:flex;justify-content:space-between;align-items:center">
          <span>Top Contributors</span>
          <span style="color:var(--accent);cursor:pointer;text-transform:none;letter-spacing:0" onclick="navigateTo('ranking')">View All</span>
        </div>
        <div class="ranking-list" style="padding:0 16px;margin-bottom:16px">
          ${users.map((u, i) => `
            <div class="ranking-item gray-container" style="padding:10px;margin-bottom:6px">
              <div class="ranking-pos ${posClass(i)}" style="width:24px;height:24px;font-size:.7rem">${i + 1}</div>
              <div class="ranking-info" style="margin-left:10px"><h4>${u.name}</h4></div>
              <div class="ranking-score" style="font-size:.75rem">${u.score.toLocaleString()} pts</div>
            </div>
          `).join("")}
        </div>

        <div style="padding:8px 20px 8px;font-size:.7rem;font-weight:700;color:#888;letter-spacing:1.5px;text-transform:uppercase">Community Feed</div>
        ${window.communityPosts ? window.communityPosts.slice(0,2).map(p => `
        <div class="community-post gray-container">
          <img src="${p.img}" alt="Community Post" class="community-post-img">
          <div class="community-post-body">
            <div class="community-post-title">${p.title}</div>
            <div class="community-post-meta">Posted by ${p.author} • ${p.time}</div>
            <div class="community-post-actions">
              <button class="community-action"><i class="far fa-heart"></i> ${p.likes}</button>
              <button class="community-action"><i class="far fa-comment"></i> ${p.comments}</button>
              <button class="community-action"><i class="far fa-share-from-square"></i></button>
            </div>
          </div>
        </div>
        `).join("") : ''}
        </div>
      </div>`;
    },

    vehicle: () => `
      <div class="m-screen" style="background:#fff">
        <button class="m-back" onclick="navigateTo('select-role')"><i class="fas fa-chevron-left"></i> Back</button>
        <div class="vehicle-title"><h2>Vehicle Profiling</h2></div>
        <div class="m-input-group"><label class="m-input-label">Type</label><select class="m-select"><option>Type of Vehicle</option><option>Electric/Hybrid</option><option>Motorcycle</option><option>Sedan</option><option>SUV</option><option>Truck</option></select></div>
        <div class="m-input-group"><label class="m-input-label">Plate Number</label><input class="m-input" placeholder="ABC 1234"></div>
        <div style="height:40px"></div>
        <button class="m-btn m-btn-outline" style="border-style:dashed">+ Add another vehicle</button>
        <div style="flex:1"></div>
        <button class="m-btn m-btn-primary" onclick="navigateTo('home')">Save</button>
      </div>`,

    routes: () => `
      <div class="m-screen" style="background:#f5f7f5;height:100%;overflow:hidden;display:flex;flex-direction:column;position:relative">
        <div style="flex-shrink:0;position:relative;z-index:10">
          <div style="background:linear-gradient(135deg,var(--accent),var(--accent2));padding-bottom:30px;display:flex;align-items:flex-start;gap:12px;margin-top:-54px;padding-top:70px;padding-left:16px;padding-right:16px;color:#fff;border-radius:0 0 20px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
            <button onclick="navigateTo('planner')" style="background:none;border:none;font-size:1.4rem;color:#fff;cursor:pointer;padding:4px"><i class="fas fa-arrow-left"></i></button>
            <div style="flex:1">
              <span class="greeting-sub" style="color:rgba(255,255,255,0.8)">Tara-Go!..</span>
              <h1 style="margin-top:0;color:#fff">Routes</h1>
            </div>
            <button style="background:none;border:none;font-size:1.4rem;color:#fff;cursor:pointer;padding:4px;margin-top:4px" onclick="navigateTo('routes-search')"><i class="fas fa-magnifying-glass"></i></button>
          </div>
          <div class="routes-tabs gray-container" style="margin:-20px 16px 8px;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,0.05);position:relative;z-index:20;">
            <button class="routes-tab active" style="background:transparent!important">Home</button>
            <button class="routes-tab" style="background:transparent!important">Work</button>
          </div>
          <div class="routes-map">
            <img src="assets/map.png" alt="Map">
            <div class="map-pin user"></div>
            <div class="map-pin dest"></div>
          </div>
        </div>
        <div style="flex:1;overflow-y:auto;padding-bottom:100px;scrollbar-width:none;">
          <div class="route-options" style="padding:16px;">
            <div class="route-option gray-container" onclick="navigateTo('routes-nav')" style="margin-bottom:12px">
              <div class="route-option-icon"><i class="fas fa-road"></i></div>
              <div class="route-option-info"><h4>EDSA - Stuyversant</h4><p>Via main road • 10.1 km</p></div>
              <span class="route-option-time">25 min</span>
            </div>
            <div class="route-option gray-container" onclick="navigateTo('routes-nav')">
              <div class="route-option-icon"><i class="fas fa-road"></i></div>
              <div class="route-option-info"><h4>C5 - Lafayette Ave</h4><p>Via alternate • 12.3 km</p></div>
              <span class="route-option-time">32 min</span>
            </div>
          </div>
        </div>
      </div>`,

    "routes-search": () => ``,

    "routes-nav": () => `
      <div class="m-screen" style="background:#fff;padding-bottom:0;display:flex;flex-direction:column;height:100%;">
        <div style="background:linear-gradient(135deg,var(--accent),var(--accent2));padding-bottom:20px;margin-top:-54px;padding-top:70px;padding-left:16px;color:#fff;border-radius:0 0 20px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.05);position:relative;z-index:20;">
          <div style="display:flex;align-items:center;">
            <i class="fas fa-arrow-left" style="cursor:pointer;font-size:1.4rem" onclick="navigateTo('planner')"></i>
            <h2 style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;color:#fff;margin:0;margin-left:12px;">Navigation</h2>
          </div>
        </div>
        <div class="nav-direction" style="margin-top:-16px;position:relative;z-index:10;border-radius:0 0 20px 20px;padding-top:24px;">
          <div class="nav-arrow"><i class="fas fa-arrow-up"></i></div>
          <div class="nav-text"><h3>67 m</h3><p>Lorem Ipsum Street</p></div>
          <div class="nav-badge">Next ›</div>
        </div>
        <div class="nav-map" style="flex:1;height:auto;position:relative;overflow:hidden">
          <img src="assets/map.png" alt="Navigation Map" style="width:100%;height:calc(100% + 80px);margin-top:-80px;object-fit:cover;">
          <div class="map-pin user" style="top:60%;left:40%"></div>
          <div class="map-pin dest" style="top:25%;right:20%"></div>
          <div style="position:absolute; top:35%; left:66%; width:6px; height:80px; background:#ef4444; border-radius:3px; box-shadow:0 0 8px rgba(239,68,68,0.6); transform:translate(-50%, -50%)"></div>
          <div style="position:absolute; top:50%; left:32%; width:80px; height:6px; background:#f59e0b; border-radius:3px; box-shadow:0 0 8px rgba(245,158,11,0.6); transform:translate(-50%, -50%)"></div>
          <div style="position:absolute; top:63%; left:41%; width:24px; height:24px; background:#9333ea; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.8rem; box-shadow:0 2px 8px rgba(0,0,0,0.3); border:2px solid #fff; transform:translate(-50%, -50%)"><i class="fas fa-road-spikes"></i></div>
          <div style="position:absolute; top:78.5%; left:41%; width:24px; height:24px; background:#3b82f6; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.8rem; box-shadow:0 2px 8px rgba(0,0,0,0.3); border:2px solid #fff; transform:translate(-50%, -50%)"><i class="fas fa-water"></i></div>
          <div style="position:absolute; top:25%; left:66%; width:24px; height:24px; background:#eab308; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.8rem; box-shadow:0 2px 8px rgba(0,0,0,0.3); border:2px solid #fff; transform:translate(-50%, -50%)"><i class="fas fa-truck-medical"></i></div>
          <div style="position:absolute; top:50%; left:80%; display:flex; flex-direction:column; align-items:center; transform:translate(-50%, -50%)">
            <div style="background:#333; color:#fff; padding:2px 4px; border-radius:4px; font-size:.5rem; margin-bottom:2px; font-weight:bold; white-space:nowrap"><i class="fas fa-times" style="color:#ef4444; margin-right:4px"></i>Road Closed<i class="fas fa-times" style="color:#ef4444; margin-left:4px"></i></div>
            <div style="width:24px; height:24px; background:#444; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.8rem; box-shadow:0 2px 8px rgba(0,0,0,0.3); border:2px solid #fff"><i class="fas fa-trowel-bricks"></i></div>
          </div>
          <div class="nav-footer gray-container" style="position:absolute;bottom:0;left:0;right:0;padding:20px;padding-bottom:30px;border-radius:20px 20px 0 0;box-shadow:0 -4px 12px rgba(0,0,0,0.1);z-index:10;display:flex;justify-content:space-between;align-items:center;">
            <div class="nav-eta" style="color:#111">
              <h3 style="margin:0;font-size:1.4rem;font-weight:700">67 min</h3>
              <p style="margin:4px 0 0;font-size:.8rem;color:#888">67 km • 10:51</p>
            </div>
            <div class="nav-actions" style="display:flex;gap:12px;">
              <button class="nav-action-btn" style="width:40px;height:40px;border-radius:12px;border:1.5px solid #ddd;background:#fff;color:#555;font-size:1.1rem;cursor:pointer" onclick="navigateTo('routes-report')"><i class="fas fa-flag"></i></button>
              <button class="nav-action-btn" style="width:40px;height:40px;border-radius:12px;border:1.5px solid #ddd;background:#fff;color:#555;font-size:1.1rem;cursor:pointer"><i class="fas fa-volume-high"></i></button>
              <button class="nav-action-btn" style="width:40px;height:40px;border-radius:12px;border:1.5px solid #ddd;background:#fff;color:#555;font-size:1.1rem;cursor:pointer" onclick="navigateTo('planner')"><i class="fas fa-times"></i></button>
            </div>
          </div>
        </div>
      </div>`,

    "routes-report": () => `
      <div class="m-screen" style="background:#fff;padding-bottom:0;display:flex;flex-direction:column;height:100%;">
        <div style="background:linear-gradient(135deg,var(--accent),var(--accent2));padding-bottom:20px;margin-top:-54px;padding-top:70px;padding-left:16px;color:#fff;border-radius:0 0 20px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.05);position:relative;z-index:20;">
          <div style="display:flex;align-items:center;">
            <i class="fas fa-arrow-left" style="cursor:pointer;font-size:1.4rem" onclick="navigateTo('routes-nav')"></i>
            <h2 style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;color:#fff;margin:0;margin-left:12px;">Navigation</h2>
          </div>
        </div>
        <div class="nav-direction" style="margin-top:-16px;position:relative;z-index:10;border-radius:0 0 20px 20px;padding-top:24px;">
          <div class="nav-arrow"><i class="fas fa-arrow-up"></i></div>
          <div class="nav-text"><h3>67 m</h3><p>Lorem Ipsum Street</p></div>
          <div class="nav-badge">Next ›</div>
        </div>
        <div class="nav-map" style="flex:1;height:auto;position:relative;overflow:hidden">
          <img src="assets/map.png" alt="Navigation Map" style="width:100%;height:calc(100% + 80px);margin-top:-80px;object-fit:cover;">
          <div class="map-pin user" style="top:60%;left:40%"></div>
          <div class="map-pin dest" style="top:25%;right:20%"></div>
          <div style="position:absolute; top:35%; left:66%; width:6px; height:80px; background:#ef4444; border-radius:3px; box-shadow:0 0 8px rgba(239,68,68,0.6); transform:translate(-50%, -50%)"></div>
          <div style="position:absolute; top:50%; left:32%; width:80px; height:6px; background:#f59e0b; border-radius:3px; box-shadow:0 0 8px rgba(245,158,11,0.6); transform:translate(-50%, -50%)"></div>
          <div style="position:absolute; top:63%; left:41%; width:24px; height:24px; background:#9333ea; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.8rem; box-shadow:0 2px 8px rgba(0,0,0,0.3); border:2px solid #fff; transform:translate(-50%, -50%)"><i class="fas fa-road-spikes"></i></div>
          <div style="position:absolute; top:78.5%; left:41%; width:24px; height:24px; background:#3b82f6; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.8rem; box-shadow:0 2px 8px rgba(0,0,0,0.3); border:2px solid #fff; transform:translate(-50%, -50%)"><i class="fas fa-water"></i></div>
          <div style="position:absolute; top:25%; left:66%; width:24px; height:24px; background:#eab308; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.8rem; box-shadow:0 2px 8px rgba(0,0,0,0.3); border:2px solid #fff; transform:translate(-50%, -50%)"><i class="fas fa-truck-medical"></i></div>
          <div style="position:absolute; top:50%; left:80%; display:flex; flex-direction:column; align-items:center; transform:translate(-50%, -50%)">
            <div style="background:#333; color:#fff; padding:2px 4px; border-radius:4px; font-size:.5rem; margin-bottom:2px; font-weight:bold; white-space:nowrap"><i class="fas fa-times" style="color:#ef4444; margin-right:4px"></i>Road Closed<i class="fas fa-times" style="color:#ef4444; margin-left:4px"></i></div>
            <div style="width:24px; height:24px; background:#444; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.8rem; box-shadow:0 2px 8px rgba(0,0,0,0.3); border:2px solid #fff"><i class="fas fa-trowel-bricks"></i></div>
          </div>
          
          <div class="nav-footer" style="position:absolute;bottom:0;left:0;right:0;padding:20px;padding-bottom:30px;border-radius:20px 20px 0 0;box-shadow:0 -4px 12px rgba(0,0,0,0.1);z-index:10;display:flex;flex-direction:column;gap:10px;align-items:stretch;background:#fff">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div class="nav-eta" style="color:#111">
                <h3 style="margin:0;font-size:1.4rem;font-weight:700">67 min</h3>
                <p style="margin:4px 0 0;font-size:.8rem;color:#888">67 km • 10:51</p>
              </div>
              <div class="nav-actions" style="display:flex;gap:12px;">
                <button class="nav-action-btn" style="width:40px;height:40px;border-radius:12px;border:1.5px solid #ddd;background:#fff;color:#555;font-size:1.1rem;cursor:pointer"><i class="fas fa-flag"></i></button>
                <button class="nav-action-btn" style="width:40px;height:40px;border-radius:12px;border:1.5px solid #ddd;background:#fff;color:#555;font-size:1.1rem;cursor:pointer"><i class="fas fa-volume-high"></i></button>
                <button class="nav-action-btn" style="width:40px;height:40px;border-radius:12px;border:1.5px solid #ddd;background:#fff;color:#555;font-size:1.1rem;cursor:pointer"><i class="fas fa-magnifying-glass"></i></button>
              </div>
            </div>
            <div class="slideup-panel" style="margin:0 -20px -30px;padding:16px 20px 20px;background:#fff;border-radius:20px 20px 0 0;box-shadow:0 -4px 12px rgba(0,0,0,0.05);">
              <div class="slideup-handle"></div>
              <div class="slideup-title">Report problem</div>
              <textarea class="m-input" placeholder="Describe the problem..." style="width:100%;height:80px;resize:none;margin:12px 0 16px;padding:12px;border-radius:12px;border:1.5px solid #eee;font-family:inherit;font-size:.85rem;background:#fafafa;box-sizing:border-box"></textarea>
              <div style="display:flex;gap:12px;">
                <button class="m-btn gray-container hover-green" style="margin:0;flex:1;border:1.5px solid transparent;color:#111;transition:all 0.2s" onclick="navigateTo('routes-nav')">Exit</button>
                <button class="m-btn m-btn-primary" style="margin:0;flex:2" onclick="navigateTo('routes-nav')">Send report</button>
              </div>
            </div>
          </div>
        </div>
      </div>`,

    community: () => `
      <div class="m-screen" style="background:#fafafa">
        <div class="community-header"><h2>Community</h2><button style="background:none;border:none;font-size:1.1rem;color:var(--accent);cursor:pointer" onclick="navigateTo('community-report')"><i class="fas fa-plus-circle"></i></button></div>
        ${window.communityPosts ? window.communityPosts.map(p => `
        <div class="community-post">
          <img src="${p.img}" alt="Community Post" class="community-post-img">
          <div class="community-post-body">
            <div class="community-post-title">${p.title}</div>
            <div class="community-post-meta">Posted by ${p.author} • ${p.time}</div>
            <div class="community-post-actions">
              <button class="community-action"><i class="far fa-heart"></i> ${p.likes}</button>
              <button class="community-action"><i class="far fa-comment"></i> ${p.comments}</button>
              <button class="community-action"><i class="far fa-share-from-square"></i></button>
            </div>
          </div>
        </div>
        `).join("") : ''}
      </div>`,

    "community-report": () => `
      <div class="m-screen" style="background:#fff">
        <button class="m-back" onclick="navigateTo('home')"><i class="fas fa-chevron-left"></i> Back</button>
        <div style="padding:0 24px"><h2 style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;color:#111">Community</h2></div>
        <div class="report-upload"><i class="fas fa-cloud-arrow-up"></i><span>Upload Image</span></div>
        <div class="m-input-group"><label class="m-input-label">Incident</label><select id="incidentType" class="m-select" onchange="document.getElementById('customIncidentGroup').style.display = this.value === 'Custom' ? 'block' : 'none'"><option>Type of Incident</option><option>Pothole</option><option>Flood</option><option>Accident</option><option>Road Block</option><option>Custom</option></select></div>
        <div id="customIncidentGroup" class="m-input-group" style="display:none; margin-top:-10px;"><input id="customIncidentText" class="m-input" placeholder="Specify custom incident type..."></div>
        <div class="m-input-group"><label class="m-input-label">Location</label><select id="incidentLoc" class="m-select"><option>Current Location</option><option>Custom Location</option></select></div>
        <div class="m-input-group"><label class="m-input-label">Description</label><textarea class="m-input" rows="4" placeholder="Describe the incident..." style="resize:none"></textarea></div>
        <button class="m-btn m-btn-primary" onclick="submitReport()">Submit</button>
      </div>`,

    "report-success": () => {
      setTimeout(() => { if(currentIndex === screens.findIndex(s=>s.id==="report-success")) navigateTo('home'); }, 3000);
      return `
      <div class="m-screen" style="background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;">
        <div style="width:100px;height:100px;background:rgba(20,184,166,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:3rem;margin-bottom:24px;box-shadow:0 0 30px rgba(20,184,166,0.2)">
          <i class="fas fa-check"></i>
        </div>
        <h2 style="font-family:var(--font-display);font-size:1.8rem;color:#111;margin-bottom:12px;line-height:1.2">Your report has been submitted!</h2>
        <p style="color:#666;font-size:1rem;line-height:1.5;margin-bottom:40px">Thanks for contributing to the Tara-Go! community. Your report helps keep everyone safe on the road.</p>
        <button class="m-btn m-btn-outline" style="width:100%;max-width:200px" onclick="navigateTo('home')">Back to Home</button>
      </div>`;
    },

    "my-reports": () => `
      <div class="m-screen" style="background:#fafafa;display:flex;flex-direction:column;height:100%;">
        <div style="flex-shrink:0;">
          <button class="m-back" onclick="navigateTo('home')" style="border:none;background:transparent;padding:16px 24px;font-size:.9rem;color:#555;cursor:pointer"><i class="fas fa-chevron-left" style="margin-right:8px"></i> Back</button>
          <div style="padding:0 24px 16px;display:flex;justify-content:space-between;align-items:center;">
            <h2 style="font-family:var(--font-display);margin:0;font-size:1.3rem;font-weight:700;color:#111">My Contributions</h2>
            <div style="position:relative;">
              <i class="fas fa-filter" style="cursor:pointer;color:var(--accent);font-size:1.1rem" onclick="document.getElementById('contrib-filter').style.display = document.getElementById('contrib-filter').style.display === 'none' ? 'block' : 'none'"></i>
              <div id="contrib-filter" style="display:none;position:absolute;top:100%;right:0;background:#fff;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.1);padding:8px 0;min-width:140px;z-index:50;margin-top:10px;color:#333;">
                <div style="padding:10px 16px;font-size:.85rem;cursor:pointer;border-bottom:1px solid #f0f0f0">By Date</div>
                <div style="padding:10px 16px;font-size:.85rem;cursor:pointer;border-bottom:1px solid #f0f0f0">Resolved</div>
                <div style="padding:10px 16px;font-size:.85rem;cursor:pointer;border-bottom:1px solid #f0f0f0">Pending</div>
                <div style="padding:10px 16px;font-size:.85rem;cursor:pointer">Denied</div>
              </div>
            </div>
          </div>
        </div>
        <div style="flex:1;overflow-y:auto;padding-bottom:100px;">
        <div class="gray-container hover-green" style="margin:0 16px 12px;padding:16px;border-radius:12px;border:1.5px solid transparent;cursor:pointer;transition:all 0.2s">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:.7rem;font-weight:700;color:var(--accent);text-transform:uppercase">Resolved</span>
            <span style="font-size:.7rem;color:#888">Oct 12, 2024</span>
          </div>
          <h4 style="margin:0 0 4px;font-size:.9rem;color:#111">Severe Flooding</h4>
          <p style="margin:0;font-size:.8rem;color:#666">Reported knee-deep flood at Taft Avenue. 20 commuters verified.</p>
        </div>
        
        <div class="gray-container hover-green" style="margin:0 16px 12px;padding:16px;border-radius:12px;border:1.5px solid transparent;cursor:pointer;transition:all 0.2s">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:.7rem;font-weight:700;color:#f59e0b;text-transform:uppercase">Pending Review</span>
            <span style="font-size:.7rem;color:#888">Oct 14, 2024</span>
          </div>
          <h4 style="margin:0 0 4px;font-size:.9rem;color:#111">Road Collision</h4>
          <p style="margin:0;font-size:.8rem;color:#666">Two-vehicle collision blocking the left lane on EDSA Ayala Southbound.</p>
        </div>
        
        <div class="gray-container hover-green" style="margin:0 16px 12px;padding:16px;border-radius:12px;border:1.5px solid transparent;cursor:pointer;transition:all 0.2s">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:.7rem;font-weight:700;color:var(--accent);text-transform:uppercase">Resolved</span>
            <span style="font-size:.7rem;color:#888">Oct 10, 2024</span>
          </div>
          <h4 style="margin:0 0 4px;font-size:.9rem;color:#111">Road Hazard</h4>
          <p style="margin:0;font-size:.8rem;color:#666">Deep pothole reported near the overpass. City engineers notified.</p>
        </div>
        </div>
      </div>`,

    notifications: () => `
      <div class="m-screen" style="background:#f5f7f5;height:100%;display:flex;flex-direction:column">
        <div style="flex-shrink:0">
          <div style="background:linear-gradient(135deg,var(--accent),var(--accent2));padding-bottom:30px;display:flex;align-items:flex-start;gap:12px;margin-top:-54px;padding-top:70px;padding-left:16px;padding-right:16px;color:#fff;border-radius:0 0 20px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
            <button onclick="navigateTo('home')" style="background:none;border:none;font-size:1.4rem;color:#fff;cursor:pointer;padding:4px"><i class="fas fa-arrow-left"></i></button>
            <div style="flex:1">
              <span class="greeting-sub" style="color:rgba(255,255,255,0.8)">Tara-Go!..</span>
              <h1 style="margin-top:0;color:#fff;font-size:1.5rem">Notification Center</h1>
            </div>
            <div style="background:rgba(255,255,255,0.2);padding:6px 10px;border-radius:12px;font-size:.7rem;font-weight:600;cursor:pointer;margin-top:6px;transition:background 0.2s" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">Mark all as Read</div>
          </div>
        </div>
        <div style="flex:1;overflow-y:auto;padding-bottom:100px;scrollbar-width:none;padding-top:16px;">
        <div style="padding:0 16px; display:flex; flex-direction:column; gap:10px; margin-bottom: 20px;">
          <div class="gray-container hover-green" style="padding:14px; border-radius:12px; display:flex; gap:12px; align-items:center; cursor:pointer; transition:all 0.2s;" onclick="navigateTo('notif-passable')">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(20,184,166,.2); color:var(--accent); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:1.1rem;"><i class="fas fa-bell"></i></div>
            <div style="flex:1"><h4 style="margin:0; font-size:.9rem; color:#111">Road Incident Ahead</h4><p style="margin:2px 0 0; font-size:.75rem; color:#666">Road remains passable. Tap to view.</p></div>
            <div style="color:#aaa; font-size:0.7rem;">Now</div>
          </div>
          
          <div class="gray-container hover-green" style="padding:14px; border-radius:12px; display:flex; gap:12px; align-items:center; cursor:pointer; transition:all 0.2s;" onclick="navigateTo('notif-danger')">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(239,68,68,.2); color:#ef4444; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:1.1rem;"><i class="fas fa-bell"></i></div>
            <div style="flex:1"><h4 style="margin:0; font-size:.9rem; color:#111">Road Not Passable</h4><p style="margin:2px 0 0; font-size:.75rem; color:#666">Avoid Taft Ave due to flood.</p></div>
            <div style="color:#aaa; font-size:0.7rem;">2m ago</div>
          </div>

          <div class="gray-container hover-green" style="padding:14px; border-radius:12px; display:flex; gap:12px; align-items:center; cursor:pointer; transition:all 0.2s;" onclick="navigateTo('notif-htd')">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(245,158,11,.2); color:#f59e0b; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:1.1rem;"><i class="fas fa-traffic-light"></i></div>
            <div style="flex:1"><h4 style="margin:0; font-size:.9rem; color:#111">Heavy Traffic Detected</h4><p style="margin:2px 0 0; font-size:.75rem; color:#666">Expect delays on current route.</p></div>
            <div style="color:#aaa; font-size:0.7rem;">15m ago</div>
          </div>
          
          <div class="gray-container hover-green" style="padding:14px; border-radius:12px; display:flex; gap:12px; align-items:center; cursor:pointer; transition:all 0.2s;" onclick="navigateTo('alert-passable')">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(20,184,166,.2); color:var(--accent); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:1.1rem;"><i class="fas fa-circle-check"></i></div>
            <div style="flex:1"><h4 style="margin:0; font-size:.9rem; color:#111">Alert: Passable</h4><p style="margin:2px 0 0; font-size:.75rem; color:#666">Community verified road is clear.</p></div>
            <div style="color:#aaa; font-size:0.7rem;">1h ago</div>
          </div>

          <div class="gray-container hover-green" style="padding:14px; border-radius:12px; display:flex; gap:12px; align-items:center; cursor:pointer; transition:all 0.2s;" onclick="navigateTo('alert-danger')">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(239,68,68,.2); color:#ef4444; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:1.1rem;"><i class="fas fa-circle-exclamation"></i></div>
            <div style="flex:1"><h4 style="margin:0; font-size:.9rem; color:#111">Alert: Danger</h4><p style="margin:2px 0 0; font-size:.75rem; color:#666">Hazard verified by users.</p></div>
            <div style="color:#aaa; font-size:0.7rem;">2h ago</div>
          </div>
        </div>
        </div>
      </div>`,

    "app-report": () => `
      <div class="m-screen" style="background:#fff">
        <button class="m-back" onclick="navigateTo('home')"><i class="fas fa-chevron-left"></i> Back</button>
        <div style="padding:0 24px"><h2 style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;color:#111">Report App Issue</h2></div>
        <p style="padding:0 24px;font-size:.85rem;color:#666;margin-bottom:20px">Found a bug or incorrect routing? Let us know so we can fix it.</p>
        
        <div class="m-input-group"><label class="m-input-label">Issue Type</label><select class="m-select"><option>App Crashing / Freezing</option><option>Map / Routing Error</option><option>Account Issue</option><option>Other Bug</option></select></div>
        <div class="m-input-group"><label class="m-input-label">Description</label><textarea class="m-input" rows="5" placeholder="Please describe the issue in detail..." style="resize:none"></textarea></div>
        
        <div class="report-upload" style="margin-top:0"><i class="fas fa-camera"></i><span>Attach Screenshot (Optional)</span></div>
        <div style="padding:10px 24px"><button class="m-btn m-btn-primary" onclick="navigateTo('home')">Submit Feedback</button></div>
      </div>`,

    verification: () => `
      <div class="m-screen" style="background:#fff">
        <button class="m-back" onclick="navigateTo('home')"><i class="fas fa-chevron-left"></i> Back</button>
        <div style="padding:0 24px"><h2 style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;color:#111">Account Verification</h2></div>
        <p style="padding:0 24px;font-size:.85rem;color:#666;margin-bottom:20px">Please verify your identity to unlock all Tara-Go! features.</p>
        
        <div style="padding:0 24px; font-size:0.85rem; font-weight:600; color:#333; margin-bottom:8px;">1. Upload Valid ID</div>
        <div class="report-upload" style="margin: 0 24px 20px; height: 120px;">
          <i class="fas fa-id-card"></i><span>Tap to upload front of ID</span>
        </div>
        
        <div style="padding:0 24px; font-size:0.85rem; font-weight:600; color:#333; margin-bottom:8px;">2. Live Selfie Verification</div>
        <div class="report-upload" style="margin: 0 24px 20px; height: 120px;">
          <i class="fas fa-camera"></i><span>Tap to take a selfie</span>
        </div>
        
        <div style="padding:10px 24px"><button class="m-btn m-btn-primary" onclick="navigateTo('home')">Submit for Review</button></div>
      </div>`,

    ranking: () => {
      const users = [
        { name: "Maria Santos", score: 2450 },
        { name: "Juan Cruz", score: 2180 },
        { name: "Ana Reyes", score: 1920 },
        { name: "Mark Lim", score: 1850 },
        { name: "Sarah Lee", score: 1720 },
        { name: "David Tan", score: 1640 },
        { name: "Pedro Gomez", score: 1510 },
        { name: "You", score: 500 }
      ];
      const posClass = (i) => i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "";

      return `
      <div class="m-screen" style="background:#f5f7f5;height:100%;overflow:hidden;display:flex;flex-direction:column;position:relative">
        <div style="flex-shrink:0;position:relative;z-index:10">
          <div style="margin-top:-54px;padding-top:70px;padding-bottom:20px;padding-left:20px;padding-right:20px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border-radius:0 0 24px 24px;box-shadow:0 4px 15px rgba(0,0,0,0.1)">
            <div style="font-size:1.2rem;font-weight:700;margin-bottom:16px;display:flex;align-items:center"><i class="fas fa-arrow-left" style="cursor:pointer;margin-right:12px;font-size:1.4rem" onclick="navigateTo('home')"></i> Community Leaderboard</div>
            <p style="font-size:.85rem;opacity:0.9;margin:0;">See who is helping the community the most.</p>
          </div>
        </div>
        
        <div style="flex:1;overflow-y:auto;padding:20px;padding-bottom:100px;scrollbar-width:none">
          <div class="ranking-list">
            ${users.map((u, i) => `
              <div class="ranking-item gray-container" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;background:${u.name === 'You' ? 'rgba(20, 184, 166, 0.1)' : '#fff'};border:${u.name === 'You' ? '2px solid var(--accent)' : 'none'};box-shadow:0 4px 10px rgba(0,0,0,0.02)">
                <div class="ranking-pos ${posClass(i)}" style="width:30px;height:30px;font-size:.9rem;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-right:12px;font-weight:700;${i>2 && u.name !== 'You' ? 'background:#f0f0f0;color:#888;' : ''}${u.name === 'You' ? 'background:var(--accent);color:#fff;' : ''}">${u.name === 'You' ? '42' : i + 1}</div>
                <div class="ranking-info" style="flex:1">
                  <h4 style="margin:0;font-size:1rem;color:#111">${u.name}</h4>
                  ${i < 3 ? '<span style="font-size:.7rem;color:var(--accent2);font-weight:600"><i class="fas fa-medal"></i> Top Contributor</span>' : ''}
                </div>
                <div class="ranking-score" style="font-size:.9rem;font-weight:800;color:var(--accent)">${u.score.toLocaleString()} <span style="font-size:.7rem;color:#888;font-weight:600">pts</span></div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>`;
    },

    "my-points": () => `
      <div class="m-screen" style="background:#fff;height:100%;overflow:hidden;display:flex;flex-direction:column;position:relative">
        <div style="flex-shrink:0;position:relative;z-index:10">
          <div style="margin-top:-54px;padding-top:70px;padding-bottom:60px;padding-left:20px;padding-right:20px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border-radius:0 0 24px 24px;text-align:center;box-shadow:0 4px 15px rgba(0,0,0,0.1)">
            <div style="font-size:1.2rem;font-weight:700;margin-bottom:16px;text-align:left;display:flex;align-items:center"><i class="fas fa-arrow-left" style="cursor:pointer;margin-right:12px;font-size:1.4rem" onclick="navigateTo('home')"></i> My Points</div>
            <div style="width:80px;height:80px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:2.5rem;color:#fcd34d;box-shadow:0 0 20px rgba(252,211,77,0.4)">
              <i class="fas fa-star"></i>
            </div>
            <div style="font-size:2.5rem;font-weight:800;letter-spacing:-1px;font-family:var(--font-display)">500</div>
            <div style="font-size:.85rem;opacity:0.9">Total Points Accumulated</div>
          </div>
          
          <div style="padding:0 20px;margin-top:-45px;position:relative;z-index:2">
            <div class="gray-container" style="border-radius:16px;padding:16px;box-shadow:0 4px 15px rgba(0,0,0,0.05)">
               <div style="font-size:.75rem;color:#555;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center">
                 <span>Redeem Rewards</span>
               </div>
               <div style="display:flex;justify-content:space-between;gap:8px">
                  <div class="reward-btn white-card" style="flex:1;text-align:center;padding:12px 4px;border-radius:12px;cursor:pointer">
                     <i class="fas fa-mobile-screen-button" style="color:var(--blue);font-size:1.4rem;margin-bottom:8px"></i>
                     <div style="font-size:.7rem;font-weight:700;color:#111">Mobile Load</div>
                     <div style="font-size:.6rem;color:var(--accent2);margin-top:4px;font-weight:700">See Offers <i class="fas fa-arrow-right"></i></div>
                  </div>
                  <div class="reward-btn white-card" style="flex:1;text-align:center;padding:12px 4px;border-radius:12px;cursor:pointer">
                     <i class="fas fa-car" style="color:#d97706;font-size:1.4rem;margin-bottom:8px"></i>
                     <div style="font-size:.7rem;font-weight:700;color:#111">TNVS Promo</div>
                     <div style="font-size:.6rem;color:var(--accent2);margin-top:4px;font-weight:700">See Offers <i class="fas fa-arrow-right"></i></div>
                  </div>
                  <div class="reward-btn white-card" style="flex:1;text-align:center;padding:12px 4px;border-radius:12px;cursor:pointer">
                     <i class="fas fa-credit-card" style="color:#16a34a;font-size:1.4rem;margin-bottom:8px"></i>
                     <div style="font-size:.7rem;font-weight:700;color:#111">Beep Load</div>
                     <div style="font-size:.6rem;color:var(--accent2);margin-top:4px;font-weight:700">See Offers <i class="fas fa-arrow-right"></i></div>
                  </div>
               </div>
            </div>
          </div>
          
          <div style="padding:0 20px;margin-top:20px;margin-bottom:4px">
            <h3 style="font-size:.85rem;color:#555;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0">Recent Contributions</h3>
          </div>
        </div>
        
        <div style="flex:1;overflow-y:auto;padding:8px 20px 100px;scrollbar-width:none">
          <div class="ranking-item gray-container" style="padding:12px;border-radius:12px;display:flex;align-items:center;margin-bottom:10px">
             <div style="width:40px;height:40px;border-radius:50%;background:rgba(2,132,199,0.1);color:#0284c7;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;margin-right:12px"><i class="fas fa-car-burst"></i></div>
             <div style="flex:1">
               <div style="font-weight:600;font-size:.9rem;color:#111">Reported Heavy Traffic</div>
               <div style="font-size:.75rem;color:#555;margin-top:2px">EDSA - Today, 8:42 AM</div>
             </div>
             <div style="font-weight:800;color:var(--accent);font-size:1rem">+20</div>
          </div>
          
          <div class="ranking-item gray-container" style="padding:12px;border-radius:12px;display:flex;align-items:center;margin-bottom:10px">
             <div style="width:40px;height:40px;border-radius:50%;background:rgba(22,163,74,0.1);color:#16a34a;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;margin-right:12px"><i class="fas fa-check-circle"></i></div>
             <div style="flex:1">
               <div style="font-weight:600;font-size:.9rem;color:#111">Verified Hazard</div>
               <div style="font-size:.75rem;color:#555;margin-top:2px">C5 Road - Yesterday</div>
             </div>
             <div style="font-weight:800;color:var(--accent);font-size:1rem">+10</div>
          </div>

          <div class="ranking-item gray-container" style="padding:12px;border-radius:12px;display:flex;align-items:center;margin-bottom:10px">
             <div style="width:40px;height:40px;border-radius:50%;background:rgba(217,119,6,0.1);color:#d97706;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;margin-right:12px"><i class="fas fa-triangle-exclamation"></i></div>
             <div style="flex:1">
               <div style="font-weight:600;font-size:.9rem;color:#111">Reported Flood</div>
               <div style="font-size:.75rem;color:#555;margin-top:2px">Taft Ave - Oct 12</div>
             </div>
             <div style="font-weight:800;color:var(--accent);font-size:1rem">+20</div>
          </div>
        </div>
      </div>`,

    "notif-passable": () => `
      <div class="notif-screen">
        <div class="notif-statusbar"><span>9:41</span><div class="status-icons"><i class="fas fa-signal"></i><i class="fas fa-wifi"></i><i class="fas fa-battery-full"></i></div></div>
        <div class="notif-banner passable">
          <div class="notif-banner-icon passable"><i class="fas fa-road"></i></div>
          <div class="notif-banner-text" onclick="navigateTo('alert-passable')" style="cursor:pointer">
            <h4>Tara-Go! – Road Passable</h4>
            <p>Going to work? There's an incident but pas...</p>
          </div>
        </div>
        <div class="notif-body"></div>
      </div>`,

    "alert-passable": () => `
      <div class="alert-screen">
        <div class="alert-statusbar"><span>9:41</span><div class="status-icons"><i class="fas fa-signal"></i><i class="fas fa-wifi"></i><i class="fas fa-battery-full"></i></div></div>
        <div class="alert-body">
          <div class="alert-dialog passable">
            <div class="alert-dialog-icon passable"><i class="fas fa-circle-check"></i></div>
            <h3>Tara-Go! – Road Passable</h3>
            <p>Going to work? There's an incident to your usual route but the road is passable.</p>
            <div style="display:flex;gap:10px;margin-top:20px">
              <button class="alert-dialog-btn" style="flex:1;background:#f5f5f5;color:#666" onclick="navigateTo('home')">Dismiss</button>
              <button class="alert-dialog-btn passable" style="flex:1" onclick="navigateTo('notif-htd')">Show Traffic</button>
            </div>
          </div>
        </div>
      </div>`,

    "notif-danger": () => `
      <div class="notif-screen">
        <div class="notif-statusbar"><span>9:41</span><div class="status-icons"><i class="fas fa-signal"></i><i class="fas fa-wifi"></i><i class="fas fa-battery-full"></i></div></div>
        <div class="notif-banner danger">
          <div class="notif-banner-icon danger"><i class="fas fa-triangle-exclamation"></i></div>
          <div class="notif-banner-text" onclick="navigateTo('alert-danger')" style="cursor:pointer">
            <h4>Tara-Go! – Road Danger</h4>
            <p>Going to work? There's an incident and it is...</p>
          </div>
        </div>
        <div class="notif-body"></div>
      </div>`,

    "alert-danger": () => `
      <div class="alert-screen">
        <div class="alert-statusbar"><span>9:41</span><div class="status-icons"><i class="fas fa-signal"></i><i class="fas fa-wifi"></i><i class="fas fa-battery-full"></i></div></div>
        <div class="alert-body">
          <div class="alert-dialog danger">
            <div class="alert-dialog-icon danger"><i class="fas fa-circle-exclamation"></i></div>
            <h3>Tara-Go! – Road Danger</h3>
            <p>Going to work? There's an incident to your usual route and the road is not passable.</p>
            <div style="display:flex;gap:10px;margin-top:20px">
              <button class="alert-dialog-btn" style="flex:1;background:#f5f5f5;color:#666" onclick="navigateTo('home')">Dismiss</button>
              <button class="alert-dialog-btn danger" style="flex:1" onclick="navigateTo('notif-htd')">Show Traffic</button>
            </div>
          </div>
        </div>
      </div>`,

    "notif-htd": () => `
      <div class="htd-screen">
        <div class="htd-statusbar"><span>9:41</span><div class="status-icons"><i class="fas fa-signal"></i><i class="fas fa-wifi"></i><i class="fas fa-battery-full"></i></div></div>
        <div class="htd-card">
          <h2>Heavy Lorem Ipsum Ahead</h2>
        </div>
        <div class="htd-options">
          <div class="htd-option" onclick="navigateTo('routes')"><div class="htd-option-icon"><i class="fas fa-route"></i></div><div class="htd-option-text">Reroute via (Open...)</div></div>
          <div class="htd-option" onclick="navigateTo('routes-nav')"><div class="htd-option-icon"><i class="fas fa-clock"></i></div><div class="htd-option-text">Wait in traffic</div></div>
        </div>
      </div>`,

    "safe-zones-list": () => `
      <div class="m-screen" style="background:#f5f7f5;height:100%;display:flex;flex-direction:column;position:relative">
        <div style="flex-shrink:0;position:relative;z-index:10">
          <div style="background:linear-gradient(135deg,var(--accent),var(--accent2));padding-bottom:30px;display:flex;align-items:flex-start;gap:12px;margin-top:-54px;padding-top:70px;padding-left:16px;padding-right:16px;color:#fff;border-radius:0 0 20px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
            <button onclick="navigateTo('planner')" style="background:none;border:none;font-size:1.4rem;color:#fff;cursor:pointer;padding:4px"><i class="fas fa-arrow-left"></i></button>
            <div style="flex:1">
              <span class="greeting-sub" style="color:rgba(255,255,255,0.8)">Nearby (within 1km)</span>
              <h1 style="margin-top:0;color:#fff;font-size:1.4rem">All Safe Zones</h1>
            </div>
          </div>
        </div>
        
        <div style="flex:1;overflow-y:auto;padding:20px;padding-bottom:100px;scrollbar-width:none">
          <div style="font-size:.75rem;font-weight:700;color:#888;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px">Parking Locations</div>
          
          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:rgba(20,184,166,0.1);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;flex-shrink:0"><i class="fas fa-square-parking"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">SM Megamall</h4>
                <span style="font-weight:800;color:#111;font-size:.9rem">50 m</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">Guarded • P50 Flat Rate</p>
            </div>
          </div>

          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:rgba(20,184,166,0.1);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;flex-shrink:0"><i class="fas fa-square-parking"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">Greenfield District</h4>
                <span style="font-weight:800;color:#111;font-size:.9rem">120 m</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">Open Air • Well-lit</p>
            </div>
          </div>
          
          <div style="font-size:.75rem;font-weight:700;color:#888;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px;margin-top:24px">Safe Tambayan / Rest Areas</div>
          
          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:rgba(217,119,6,0.1);color:#d97706;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;flex-shrink:0"><i class="fas fa-store"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">7/11 EDSA Boni</h4>
                <span style="font-weight:800;color:#111;font-size:.9rem">80 m</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">24/7 • CCTV Equipped</p>
            </div>
          </div>
          
          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:rgba(217,119,6,0.1);color:#d97706;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;flex-shrink:0"><i class="fas fa-mug-hot"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">Starbucks Reserve</h4>
                <span style="font-weight:800;color:#111;font-size:.9rem">150 m</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">Closes at 12AM • Indoor</p>
            </div>
          </div>

          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:rgba(217,119,6,0.1);color:#d97706;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;flex-shrink:0"><i class="fas fa-building-shield"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">Barangay Hall Sec. 2</h4>
                <span style="font-weight:800;color:#111;font-size:.9rem">210 m</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">24/7 Security • Public Restroom</p>
            </div>
          </div>
        </div>
      </div>`,

    "travel-conditions": () => {
      window.state = window.state || {};
      const activeTab = window.state.travelTab || 'car';
      
      const tabs = [
        { id: 'car', icon: 'fa-car', label: 'Car' },
        { id: 'train', icon: 'fa-train', label: 'Train' },
        { id: 'bike', icon: 'fa-motorcycle', label: 'Bike' },
        { id: 'walk', icon: 'fa-person-walking', label: 'Walk' }
      ];

      const renderTab = (tab) => {
        const isActive = activeTab === tab.id;
        const style = isActive 
          ? 'padding:8px 14px;border-radius:20px;background:#fff;color:var(--accent);font-weight:700;font-size:.85rem;display:flex;align-items:center;gap:6px;border:2px solid var(--accent);box-shadow:0 4px 10px rgba(20,184,166,0.1);flex-shrink:0;cursor:pointer'
          : 'padding:9px 15px;border-radius:20px;background:#fff;color:#555;font-weight:600;font-size:.85rem;display:flex;align-items:center;gap:6px;border:1px solid #ddd;flex-shrink:0;cursor:pointer;transition:all 0.2s';
        const hoverClass = isActive ? '' : 'hover-green';
        return `<div class="${hoverClass}" style="${style}" onclick="window.state.travelTab='${tab.id}';navigateTo('travel-conditions', false)"><i class="fas ${tab.icon}"></i> ${tab.label}</div>`;
      };

      const routesData = {
        car: `
          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:#fff;color:#555;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05);flex-shrink:0"><i class="fas fa-route"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">Via EDSA</h4>
                <span style="font-weight:800;color:#111;font-size:1.1rem">25 min</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">Fastest Route • Moderate Traffic • 10.1 km</p>
            </div>
          </div>
          
          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:#fff;color:#555;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05);flex-shrink:0"><i class="fas fa-route"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">Via C5 Road</h4>
                <span style="font-weight:800;color:#111;font-size:1.1rem">32 min</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">Alternate • Heavy Traffic • 12.3 km</p>
            </div>
          </div>

          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:#fff;color:#555;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05);flex-shrink:0"><i class="fas fa-route"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">Via Skyway</h4>
                <span style="font-weight:800;color:#111;font-size:1.1rem">18 min</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">Toll Required (₱150) • Clear • 11.5 km</p>
            </div>
          </div>`,
        train: `
          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:#fff;color:#555;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05);flex-shrink:0"><i class="fas fa-train-subway"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">MRT-3 to Ayala</h4>
                <span style="font-weight:800;color:#111;font-size:1.1rem">35 min</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">Fastest • High Crowds • Includes 10m walk</p>
            </div>
          </div>
          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:#fff;color:#555;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05);flex-shrink:0"><i class="fas fa-bus"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">EDSA Carousel Bus</h4>
                <span style="font-weight:800;color:#111;font-size:1.1rem">50 min</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">Moderate Crowds • ₱35 Fare</p>
            </div>
          </div>`,
        bike: `
          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:#fff;color:#555;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05);flex-shrink:0"><i class="fas fa-motorcycle"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">Via Service Road</h4>
                <span style="font-weight:800;color:#111;font-size:1.1rem">28 min</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">Bike Lane Available • 9.8 km</p>
            </div>
          </div>
          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:#fff;color:#555;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05);flex-shrink:0"><i class="fas fa-motorcycle"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">Inner Streets</h4>
                <span style="font-weight:800;color:#111;font-size:1.1rem">34 min</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">Safer • Mixed Traffic • 11.2 km</p>
            </div>
          </div>`,
        walk: `
          <div class="gray-container hover-green" style="padding:16px;border-radius:16px;margin-bottom:12px;display:flex;align-items:center;border:1px solid transparent;cursor:pointer;transition:all 0.2s" onclick="navigateTo('routes-nav')">
            <div style="width:44px;height:44px;border-radius:12px;background:#fff;color:#555;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-right:16px;box-shadow:0 2px 8px rgba(0,0,0,0.05);flex-shrink:0"><i class="fas fa-person-walking"></i></div>
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <h4 style="margin:0;font-size:1.05rem;color:#111">Direct Path</h4>
                <span style="font-weight:800;color:#111;font-size:1.1rem">1h 45m</span>
              </div>
              <p style="margin:0;font-size:.8rem;color:#555">Good weather • Flat terrain • 8.5 km</p>
            </div>
          </div>`
      };

      return `
      <div class="m-screen" style="background:#f5f7f5;height:100%;display:flex;flex-direction:column;position:relative">
        <div style="flex-shrink:0;position:relative;z-index:10">
          <div style="background:linear-gradient(135deg,var(--accent),var(--accent2));padding-bottom:30px;display:flex;align-items:flex-start;gap:12px;margin-top:-54px;padding-top:70px;padding-left:16px;padding-right:16px;color:#fff;border-radius:0 0 20px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
            <button onclick="navigateTo('planner')" style="background:none;border:none;font-size:1.4rem;color:#fff;cursor:pointer;padding:4px"><i class="fas fa-arrow-left"></i></button>
            <div style="flex:1">
              <span class="greeting-sub" style="color:rgba(255,255,255,0.8)">Manila → Makati</span>
              <h1 style="margin-top:0;color:#fff;font-size:1.4rem">Travel Options</h1>
            </div>
          </div>
        </div>
        
        <div style="flex:1;overflow-y:auto;padding-top:20px;padding-bottom:100px;scrollbar-width:none">
          <div style="display:flex;gap:8px;padding:0 20px;margin-bottom:20px;overflow-x:auto;scrollbar-width:none;">
            ${tabs.map(renderTab).join('')}
          </div>
          
          <div style="padding:0 20px;font-size:.75rem;font-weight:700;color:#888;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px">Alternative Routes (${tabs.find(t => t.id === activeTab).label})</div>
          
          <div style="padding:0 20px">
            ${routesData[activeTab]}
          </div>
        </div>
      </div>`;
    },

    planner: () => `
      <div class="m-screen" style="background:#f5f7f5;height:100%;overflow:hidden;display:flex;flex-direction:column;position:relative">
        <div style="flex-shrink:0;position:relative;z-index:10">
          <div style="background:linear-gradient(135deg,var(--accent),var(--accent2));padding-bottom:30px;display:flex;align-items:flex-start;gap:12px;margin-top:-54px;padding-top:70px;padding-left:16px;color:#fff;border-radius:0 0 20px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
            <div style="flex:1">
              <span class="greeting-sub" style="color:rgba(255,255,255,0.8)">Tara-Go!..</span>
              <h1 style="margin-top:0;color:#fff">Planner</h1>
            </div>
          </div>
          <div class="gray-container" style="margin:-20px 16px 8px;padding:18px;border-radius:16px;position:relative;z-index:15;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
            <div style="font-size:.7rem;font-weight:700;color:var(--accent2);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px">Quick Travel Check</div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px"><input class="m-input" placeholder="From..." style="flex:1;padding:10px 12px;font-size:.82rem"><button style="background:none;border:none;color:var(--accent);cursor:pointer;padding:4px;font-size:1rem;" title="Swap Locations"><i class="fas fa-right-left"></i></button><input class="m-input" placeholder="To..." style="flex:1;padding:10px 12px;font-size:.82rem"></div>
            <button class="m-btn m-btn-primary" style="margin:0;width:100%;padding:12px;font-size:.85rem" onclick="navigateTo('travel-conditions')">Check Conditions <i class="fas fa-magnifying-glass" style="margin-left:4px"></i></button>
          </div>
          <div style="padding:16px 20px 8px;font-size:.7rem;font-weight:700;color:#888;letter-spacing:1.5px;text-transform:uppercase;margin-top:0px;">Smart Commute Dashboard</div>
          <div style="display:flex;gap:10px;padding:0 16px;overflow-x:auto;scrollbar-width:none">
            <div class="gray-container hover-green" style="min-width:120px;padding:12px;border-radius:12px;display:flex;flex-direction:column;align-items:center;text-align:center;border:1.5px solid transparent">
              <div style="color:var(--accent2);font-size:1.5rem;margin-bottom:6px"><i class="fas fa-cloud-sun"></i></div>
              <div style="font-size:.8rem;font-weight:700;color:#111">Partly Cloudy</div>
              <div style="font-size:.65rem;color:#888">No rain expected</div>
            </div>
            <div class="gray-container hover-green" style="min-width:120px;padding:12px;border-radius:12px;display:flex;flex-direction:column;align-items:center;text-align:center;border:1.5px solid transparent">
              <div style="color:#f59e0b;font-size:1.5rem;margin-bottom:6px"><i class="fas fa-triangle-exclamation"></i></div>
              <div style="font-size:.8rem;font-weight:700;color:#111">2 Incidents</div>
              <div style="font-size:.65rem;color:#888">Near your routes</div>
            </div>
            <div class="gray-container hover-green" style="min-width:120px;padding:12px;border-radius:12px;display:flex;flex-direction:column;align-items:center;text-align:center;border:1.5px solid transparent">
              <div style="color:var(--accent);font-size:1.5rem;margin-bottom:6px"><i class="fas fa-car-side"></i></div>
              <div style="font-size:.8rem;font-weight:700;color:#111">Sedan Cleared</div>
              <div style="font-size:.65rem;color:#888">No deep floods</div>
            </div>
          </div>
          <div style="padding:16px 20px 8px;font-size:.7rem;font-weight:700;color:#888;letter-spacing:1.5px;text-transform:uppercase;display:flex;justify-content:space-between;align-items:center">
            <span>Safe Zones (50m-100m)</span>
            <span style="color:var(--accent);cursor:pointer;text-transform:none;font-weight:600" onclick="navigateTo('safe-zones-list')">See all <i class="fas fa-chevron-right" style="font-size:.6rem;margin-left:2px"></i></span>
          </div>
          <div style="display:flex;gap:10px;padding:0 16px;overflow-x:auto;scrollbar-width:none">
            <div class="gray-container hover-green" style="min-width:160px;padding:12px;border-radius:12px;border:1.5px solid #14b8a6;background:rgba(20,184,166,0.05);display:flex;align-items:center;gap:10px">
               <div style="color:var(--accent);font-size:1.5rem;width:30px;text-align:center"><i class="fas fa-square-parking"></i></div>
               <div>
                 <div style="font-size:.8rem;font-weight:700;color:#111">SM Megamall</div>
                 <div style="font-size:.6rem;color:#666">50m • Safe Parking</div>
               </div>
            </div>
            <div class="gray-container hover-green" style="min-width:160px;padding:12px;border-radius:12px;border:1px solid #ddd;display:flex;align-items:center;gap:10px">
               <div style="color:#d97706;font-size:1.5rem;width:30px;text-align:center"><i class="fas fa-store"></i></div>
               <div>
                 <div style="font-size:.8rem;font-weight:700;color:#111">7/11 EDSA</div>
                 <div style="font-size:.6rem;color:#666">80m • Safe Tambayan</div>
               </div>
            </div>
          </div>
          <div style="padding:16px 20px 8px;font-size:.7rem;font-weight:700;color:#888;letter-spacing:1.5px;text-transform:uppercase">Top Live Routes</div>
        </div>
        <div style="flex:1;overflow-y:auto;padding-bottom:100px;scrollbar-width:none;">
          <div class="route-options" style="padding:0 16px">
          <div class="route-option gray-container hover-green" onclick="navigateTo('routes-nav')" style="border:1.5px solid transparent">
            <div class="route-option-icon"><i class="fas fa-road"></i></div>
            <div class="route-option-info"><h4>Manila → Makati</h4><p>Via main road • 10.1 km</p></div>
            <span class="route-option-time">45 min</span>
          </div>
          <div class="route-option gray-container hover-green" onclick="navigateTo('routes-nav')" style="border:1.5px solid transparent">
            <div class="route-option-icon"><i class="fas fa-road"></i></div>
            <div class="route-option-info"><h4>QC → Ortigas</h4><p>Via alternate • 12.3 km</p></div>
            <span class="route-option-time">1h 10m</span>
          </div>
        </div>
        <button class="m-btn m-btn-outline gray-container hover-green" style="margin:16px 24px;width:calc(100% - 48px);border:1.5px solid transparent" onclick="navigateTo('routes')">
          <i class="fas fa-map" style="margin-right:8px;color:var(--accent)"></i> Open Full Map
        </button>
        </div>
      </div>`,

    "ai-chat": () => `
      <div class="m-screen" style="background:#f5f7f5;height:100%;display:flex;flex-direction:column">
        <div style="flex-shrink:0">
          <div style="background:linear-gradient(135deg,var(--accent),var(--accent2));padding-bottom:30px;display:flex;align-items:flex-start;gap:12px;margin-top:-54px;padding-top:70px;padding-left:16px;color:#fff;border-radius:0 0 20px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
            <div style="width:40px;height:40px;border-radius:50%;background:#fff;border:2px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:1rem;box-shadow:0 2px 8px rgba(0,0,0,0.1);flex-shrink:0"><i class="fas fa-robot"></i></div>
            <div style="flex:1">
              <span class="greeting-sub" style="color:rgba(255,255,255,0.8)">Tara-Go!..</span>
              <h1 style="margin-top:0;color:#fff">AI Assistant</h1>
            </div>
          </div>
        </div>
        <div style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">
        <div style="padding:0 20px;text-align:center;margin-top:16px">
          <div style="font-size:.65rem;font-weight:700;color:var(--accent2);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px">Suggested Topics</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center">
            <span class="gray-container hover-green" style="padding:8px 14px;border-radius:20px;border:1.5px solid transparent;font-size:.75rem;cursor:pointer;transition:all 0.2s;color:#111">Passable Taft for Sedan?</span>
            <span class="gray-container hover-green" style="padding:8px 14px;border-radius:20px;border:1.5px solid transparent;font-size:.75rem;cursor:pointer;transition:all 0.2s;color:#111">Pasig Ferry status</span>
            <span class="gray-container hover-green" style="padding:8px 14px;border-radius:20px;border:1.5px solid transparent;font-size:.75rem;cursor:pointer;transition:all 0.2s;color:#111">MRT-3 waiting time</span>
            <span class="gray-container hover-green" style="padding:8px 14px;border-radius:20px;border:1.5px solid transparent;font-size:.75rem;cursor:pointer;transition:all 0.2s;color:#111">Best route to Makati</span>
          </div>
        </div>
        </div>
        <div style="padding:16px 20px 0;display:flex;flex-direction:column;align-items:center;">
          <div style="font-size:.75rem;color:#888;margin-bottom:10px">Need more help?</div>
          <button class="m-btn gray-container hover-green" style="margin:0;padding:10px 20px;border-radius:20px;font-size:.8rem;border:1.5px solid transparent;width:auto;color:#111;transition:all 0.2s">
            <i class="fas fa-headset" style="margin-right:6px"></i> Contact Human Support
          </button>
        </div>
        <div style="padding:12px 16px;display:flex;align-items:center;gap:8px;">
          <button style="width:36px;height:36px;border-radius:50%;border:1.5px solid #ddd;background:#fff;color:#888;cursor:pointer;display:flex;align-items:center;justify-content:center"><i class="fas fa-plus"></i></button>
          <input class="m-input" placeholder="Type a message..." style="flex:1;padding:10px 14px;border-radius:20px;font-size:.85rem">
          <button style="width:36px;height:36px;border-radius:50%;border:none;background:var(--accent);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>`,

    profile: () => `
      <div class="m-screen" style="background:#f5f7f5;height:100%;display:flex;flex-direction:column;padding-bottom:100px;">
        <div style="flex-shrink:0">
          <div style="background:linear-gradient(135deg,var(--accent),var(--accent2));padding-bottom:30px;display:flex;align-items:flex-start;gap:12px;margin-top:-54px;padding-top:70px;padding-left:16px;color:#fff;border-radius:0 0 20px 20px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
            <div style="flex:1">
              <span class="greeting-sub" style="color:rgba(255,255,255,0.8)">Tara-Go!..</span>
              <h1 style="margin-top:0;color:#fff">Profile</h1>
            </div>
          </div>
        </div>
        <div style="flex-shrink:0;padding:0 20px;margin-top:12px">
          <div style="width:60px;height:60px;border-radius:50%;background:#fff;border:3px solid #fff;display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:#ccc;box-shadow:0 2px 10px rgba(0,0,0,.1);position:relative;z-index:10">
            <i class="fas fa-user"></i>
            <div style="position:absolute;bottom:-4px;right:-4px;width:20px;height:20px;background:var(--accent);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.6rem;border:2px solid #fff;cursor:pointer"><i class="fas fa-pencil"></i></div>
          </div>
          <h2 style="font-family:var(--font-display);font-size:1.2rem;font-weight:700;color:#111;margin-top:8px">John Dela Cruz</h2>
          <p style="font-size:.75rem;color:#888">Premium Commuter • Member since 2024</p>
        </div>
        <div style="flex-shrink:0;padding:20px 20px 8px;display:flex;align-items:center">
          <span style="font-size:.7rem;font-weight:700;color:#888;letter-spacing:1.5px;text-transform:uppercase">My Points</span>
        </div>
        <div style="padding:0 16px 12px;">
          <div class="gray-container hover-green" style="padding:14px 16px;border-radius:12px;border:1.5px solid transparent;display:flex;align-items:center;gap:12px;transition:all 0.2s;cursor:pointer;" onclick="navigateTo('my-points')">
            <div style="width:36px;height:36px;border-radius:50%;background:rgba(252,211,77,0.2);display:flex;align-items:center;justify-content:center;color:#f59e0b;font-size:1.1rem;"><i class="fas fa-star"></i></div>
            <div style="flex:1"><div style="font-size:.9rem;font-weight:700;color:#111">500 pts</div><div style="font-size:.7rem;color:#888">Total Points Accumulated</div></div>
            <i class="fas fa-chevron-right" style="color:#ccc;font-size:.8rem"></i>
          </div>
        </div>
        <div style="flex-shrink:0;padding:8px 20px 8px;display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:.7rem;font-weight:700;color:#888;letter-spacing:1.5px;text-transform:uppercase">Registered Vehicles</span>
          <span style="font-size:.75rem;color:var(--accent);cursor:pointer" onclick="navigateTo('vehicle')">Change Profiling</span>
        </div>
        <div style="flex:1;overflow-y:auto;scrollbar-width:none;display:flex;flex-direction:column;min-height:0;">
          <div style="margin:0 16px 8px;padding:14px 16px;border-radius:12px;border:1.5px solid transparent;display:flex;align-items:center;gap:12px;transition:all 0.2s;cursor:pointer;flex-shrink:0;" class="gray-container hover-green">
            <div style="width:32px;height:32px;border-radius:8px;background:rgba(20,184,166,0.15);display:flex;align-items:center;justify-content:center;color:var(--accent2)"><i class="fas fa-car"></i></div>
            <div style="flex:1"><div style="font-size:.85rem;font-weight:600;color:#111">Daily Commuter</div><div style="font-size:.7rem;color:#999">Sedan • 150mm Clearance</div></div>
            <span style="font-size:.7rem;color:#888;font-style:italic">ABC 1234</span>
          </div>
          <div style="margin:0 16px 8px;padding:14px 16px;border-radius:12px;border:1.5px solid transparent;display:flex;align-items:center;gap:12px;transition:all 0.2s;cursor:pointer;flex-shrink:0;" class="gray-container hover-green">
            <div style="width:32px;height:32px;border-radius:8px;background:rgba(20,184,166,0.15);display:flex;align-items:center;justify-content:center;color:var(--accent2)"><i class="fas fa-truck-monster"></i></div>
            <div style="flex:1"><div style="font-size:.85rem;font-weight:600;color:#111">Weekend Explorer</div><div style="font-size:.7rem;color:#999">SUV • 220mm Clearance</div></div>
            <span style="font-size:.7rem;color:#888;font-style:italic">XYZ 7890</span>
          </div>
          <div style="text-align:center;padding:8px;font-size:.8rem;color:var(--accent2);cursor:pointer;flex-shrink:0;" onclick="navigateTo('vehicle')">+ Add New Vehicle</div>
        </div>
        <div style="flex-shrink:0;padding:16px 20px 8px;font-size:.7rem;font-weight:700;color:#888;letter-spacing:1.5px;text-transform:uppercase">Favorite Locations</div>
        <div style="flex:1;overflow-y:auto;scrollbar-width:none;display:flex;flex-direction:column;min-height:0;">
          <div style="margin:0 16px 8px;padding:14px 16px;border-radius:12px;border:1.5px solid transparent;display:flex;align-items:center;gap:12px;transition:all 0.2s;cursor:pointer;flex-shrink:0;" class="gray-container hover-green">
            <div style="width:32px;height:32px;border-radius:8px;background:rgba(20,184,166,0.15);display:flex;align-items:center;justify-content:center;color:var(--accent2)"><i class="fas fa-location-dot"></i></div>
            <div><div style="font-size:.85rem;font-weight:600;color:#111">Home</div><div style="font-size:.7rem;color:var(--accent2)">Taft Ave, Manila</div></div>
          </div>
          <div style="margin:0 16px 8px;padding:14px 16px;border-radius:12px;border:1.5px solid transparent;display:flex;align-items:center;gap:12px;transition:all 0.2s;cursor:pointer;flex-shrink:0;" class="gray-container hover-green">
            <div style="width:32px;height:32px;border-radius:8px;background:rgba(20,184,166,0.15);display:flex;align-items:center;justify-content:center;color:#888"><i class="fas fa-location-dot"></i></div>
            <div><div style="font-size:.85rem;font-weight:600;color:#111">Work</div><div style="font-size:.7rem;color:var(--accent2)">Ayala Ave, Makati</div></div>
          </div>
        </div>
      </div>`
  };

  function tabBar(active) {
    const tabs = [
      { id: "home", icon: "fa-house", label: "Home" },
      { id: "planner", icon: "fa-paper-plane", label: "Planner" },
      { id: "ai-chat", icon: "fa-comment-dots", label: "AI Chat" },
      { id: "profile", icon: "fa-user", label: "Profile" }
    ];
    let actualActive = active;
    if (["ranking", "community", "routes"].includes(active)) actualActive = "home";
    if (active === "routes") actualActive = "planner";
    return `<div class="m-tab-bar">${tabs.map(t =>
      `<button class="m-tab ${t.id === actualActive ? 'active' : ''}" onclick="navigateTo('${t.id}')"><i class="fas ${t.icon}"></i><span>${t.label}</span></button>`
    ).join("")}</div>`;
  }

  // State
  let currentIndex = 0;
  
  window.communityPosts = window.communityPosts || [
    { title: "Clean road improvements on Main St", author: "@user123", time: "2h ago", likes: 24, comments: 8, img: "assets/community1.png" },
    { title: "Pothole reported on Elm Avenue", author: "@driver456", time: "5h ago", likes: 41, comments: 15, img: "assets/community2.png" }
  ];

  window.submitReport = function() {
    const typeEl = document.getElementById("incidentType");
    const locEl = document.getElementById("incidentLoc");
    if (!typeEl || !locEl) return navigateTo('community');
    
    let type = typeEl.value;
    const loc = locEl.value;
    
    if (type === "Custom") {
      const customTypeEl = document.getElementById("customIncidentText");
      if (customTypeEl && customTypeEl.value.trim() !== "") {
        type = customTypeEl.value.trim();
      } else {
        type = "Custom Incident";
      }
    }

    const finalType = type === "Type of Incident" ? "Incident" : type;
    const finalLoc = loc === "Current Location" ? "Current Location" : loc;
    
    window.communityPosts.unshift({
      title: `${finalType} at ${finalLoc}`,
      author: "@you",
      time: "Just now",
      likes: 0,
      comments: 0,
      img: "assets/community2.png"
    });
    navigateTo('report-success');
  };

  // DOM refs
  const phoneScreen = document.getElementById("phoneScreen");
  const stageTitle = document.getElementById("stageTitle");
  const screenCounter = document.getElementById("screenCounter");
  const infoName = document.getElementById("infoName");
  const infoDesc = document.getElementById("infoDesc");
  const flowDiagram = document.getElementById("flowDiagram");
  const componentList = document.getElementById("componentList");
  const interactionList = document.getElementById("interactionList");
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");

  function updateFixedUI(screenId) {
    const mainTabs = ["home", "planner", "ai-chat", "profile", "routes", "community", "ranking", "my-reports", "app-report"];
    const tabBarContainer = document.getElementById("tabBarContainer");
    const fabContainer = document.getElementById("fabContainer");
    
    if (tabBarContainer) {
      if (mainTabs.includes(screenId)) {
        tabBarContainer.innerHTML = tabBar(screenId);
        tabBarContainer.style.display = "block";
      } else {
        tabBarContainer.style.display = "none";
      }
    }
    
    if (fabContainer) {
      if (screenId === "home" || screenId === "community" || screenId === "ranking") {
        fabContainer.innerHTML = `
          <button class="fab" onclick="navigateTo('community-report')">
            <i class="fas fa-plus"></i><span class="fab-text">Contribute</span>
          </button>
        `;
        fabContainer.style.display = "block";
      } else {
        fabContainer.style.display = "none";
      }
    }
  }

  function renderScreen(index, animate = true) {
    const s = screens[index];
    currentIndex = index;

    // Render phone content
    if (animate) {
      phoneScreen.style.opacity = "0";
      phoneScreen.style.transform = "translateX(20px)";
      setTimeout(() => {
        phoneScreen.innerHTML = screenHTML[s.id]();
        updateFixedUI(s.id);
        phoneScreen.scrollTop = 0;
        phoneScreen.style.transition = "opacity .3s,transform .3s";
        phoneScreen.style.opacity = "1";
        phoneScreen.style.transform = "translateX(0)";
      }, 150);
    } else {
      phoneScreen.innerHTML = screenHTML[s.id]();
      updateFixedUI(s.id);
      phoneScreen.scrollTop = 0;
    }

    // Update header
    stageTitle.textContent = s.name;
    screenCounter.textContent = `${index + 1} / ${screens.length}`;

    // Update info panel
    infoName.textContent = s.name;
    infoDesc.textContent = s.desc;
    flowDiagram.innerHTML = s.flow.map((f, i) =>
      `<div class="flow-item ${i === 0 ? 'active' : ''}">${f}</div>${i < s.flow.length - 1 ? '<div class="flow-arrow"><i class="fas fa-arrow-right"></i></div>' : ''}`
    ).join("");
    componentList.innerHTML = s.components.map(c =>
      `<div class="component-chip"><i class="fas fa-cube"></i> ${c}</div>`
    ).join("");
    interactionList.innerHTML = s.interactions.map(i =>
      `<div class="interaction-item"><i class="fas fa-arrow-right"></i><span>${i}</span></div>`
    ).join("");

    // Update nav
    document.querySelectorAll(".nav-item").forEach(n => {
      n.classList.toggle("active", n.dataset.screen === s.id);
    });
  }

  // Navigation
  window.navigateTo = function (id, animate = true) {
    const idx = screens.findIndex(s => s.id === id);
    if (idx !== -1) renderScreen(idx, animate);
  };

  // Nav buttons
  document.getElementById("prevScreen").addEventListener("click", () => {
    renderScreen((currentIndex - 1 + screens.length) % screens.length);
  });
  document.getElementById("nextScreen").addEventListener("click", () => {
    renderScreen((currentIndex + 1) % screens.length);
  });

  // Sidebar nav
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.screen;
      const idx = screens.findIndex(s => s.id === id);
      if (idx !== -1) renderScreen(idx);
      sidebar.classList.remove("open");
    });
  });

  // Sidebar toggle (mobile)
  sidebarToggle.addEventListener("click", () => sidebar.classList.toggle("open"));

  // Keyboard nav
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") renderScreen((currentIndex - 1 + screens.length) % screens.length);
    if (e.key === "ArrowRight") renderScreen((currentIndex + 1) % screens.length);
  });

  // Update time
  function updateTime() {
    const now = new Date();
    document.getElementById("statusTime").textContent =
      now.toLocaleTimeString("en-US", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit", hour12: true });
  }
  updateTime();
  setInterval(updateTime, 30000);

  // Tab interactivity within screens
  document.addEventListener("click", (e) => {
    const tab = e.target.closest(".routes-tab,.ranking-tab");
    if (tab) {
      tab.parentElement.querySelectorAll(tab.className.split(" ")[0] === "routes-tab" ? ".routes-tab" : ".ranking-tab")
        .forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    }
  });

  // Init
  renderScreen(0, false);
})();
