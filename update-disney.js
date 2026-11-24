const fs = require('fs');

let code = fs.readFileSync('/Users/pagnreach/Sites/pagnreach.github.io/generate-japan-trip.js', 'utf8');

// Find day-10 in tripData
const d10Search = 'id: "day-10",';
const d10Idx = code.indexOf(d10Search);

if (d10Idx === -1) {
  console.error("Day 10 not found!");
  process.exit(1);
}

// Let's replace Day 10's summaryHighlights and timeline with the crystal clear battlecard
const newDay10Data = `id: "day-10",
      dayNum: 10,
      dateStr: "Dec 7",
      fullDate: "2026-12-07",
      weekday: "Monday",
      city: "tokyo",
      cityLabel: "Tokyo DisneySea",
      theme: "World's #1 Disney Park, Fantasy Springs, Mount Prometheus & Harbor Spectacle",
      weather: "7°C–13°C • Coastal Breeze • Dress warmly in layers!",
      steps: "24,000 steps • High excitement magical day",
      hasDisneyBattlecard: true,
      summaryHighlights: [
        { time: "08:15 AM", text: "Arrive at DisneySea entrance gates & line up before park opens", mapQuery: "Tokyo DisneySea" },
        { time: "08:45 AM", text: "🚨 <strong>STEP 1 (At Turnstile):</strong> Buy DPA for <em>Frozen Ever After</em> + Grab Free Standby Pass for <em>Rapunzel</em> + Set 60-min alarm!", mapQuery: "Fantasy Springs Tokyo DisneySea" },
        { time: "09:45 AM", text: "⏰ <strong>STEP 2 (Alarm Rings):</strong> DPA cooldown over! Buy DPA for <em>Soaring: Fantastic Flight</em> (~2,000 JPY)", mapQuery: "Soaring Fantastic Flight Tokyo DisneySea" },
        { time: "11:30 AM", text: "📱 <strong>STEP 3 (Lunch):</strong> Use <em>Disney Mobile Order</em> in the app (skip food queues!)", mapQuery: "Vulcania Restaurant Tokyo DisneySea" },
        { time: "01:30 PM", text: "Enter Fantasy Springs at your designated window & ride Frozen/Rapunzel", mapQuery: "Fantasy Springs Tokyo DisneySea" },
        { time: "07:15 PM", text: "✨ <strong>STEP 4 (Night Show):</strong> Mediterranean Harbor for <em>'Believe! Sea of Dreams'</em> (Starts 7:30 PM)", mapQuery: "Mediterranean Harbor Tokyo DisneySea" }
      ],
      hotel: {
        name: "The Royal Park Canvas Ginza Corridor",
        mapQuery: "The Royal Park Canvas Ginza Corridor, 6-2-11 Ginza, Chuo-ku, Tokyo",
        nights: "Night 4 of 4 (Final Night in Japan)",
        addressEn: "6-2-11 Ginza, Chuo-ku, Tokyo",
        addressJp: "東京都中央区銀座6-2-11",
        access: "Ginza Corridor",
        phone: "+81-3-68379111",
        taxiNote: "銀座コリドー街 (ザ ロイヤルパーク キャンバス) までお願いします"
      },
      timeline: [
        {
          time: "07:15",
          title: "Depart Ginza to Tokyo DisneySea",
          badge: "Transit",
          mapQuery: "Tokyo DisneySea Station",
          desc: "Take Tokyo Metro Hibiya Line from Ginza to Hatchobori (5 mins), transfer to JR Keiyo Line direct to Maihama Station (15 mins). Ride the Disney Resort Line monorail to Tokyo DisneySea Station."
        },
        {
          time: "08:15",
          title: "Arrive at Entrance Gates & Line Up",
          badge: "Theme Park",
          mapQuery: "Tokyo DisneySea",
          desc: "Queue early at the entrance. Security checks start early, and Tokyo DisneySea often opens turnstiles 15–30 minutes before the official 9:00 AM posted time!"
        },
        {
          time: "08:45",
          title: "🚨 MINUTE 0: Scan Tickets & App Blitz (CRITICAL)",
          badge: "Highlight",
          mapQuery: "Fantasy Springs Tokyo DisneySea",
          desc: "<strong>DO THESE 3 THINGS THE SECOND YOUR TICKET SCANS:</strong><br>1️⃣ <strong>Buy DPA #1 (Paid ~2,000 JPY):</strong> Open App > tap <em>Disney Premier Access</em> > select <strong>Frozen Ever After</strong> (Fantasy Springs). Sells out within 20–30 mins!<br>2️⃣ <strong>Claim Free Standby Pass #1:</strong> Immediately tap <em>Standby Pass</em> > select <strong>Rapunzel's Lantern Festival</strong> or <strong>Peter Pan's Never Land Adventure</strong>.<br>3️⃣ <strong>Set iPhone Alarm for 60 Minutes (09:45 AM):</strong> This is your DPA cooldown timer!"
        },
        {
          time: "09:00",
          title: "Rope Drop Sprint: Mysterious Island & Tower of Terror",
          badge: "Rides",
          mapQuery: "Journey to the Center of the Earth Tokyo DisneySea",
          desc: "While everyone else is looking at their phones, walk briskly to <em>Journey to the Center of the Earth</em> inside Mount Prometheus or <em>Tower of Terror</em> in American Waterfront. Standby lines are shortest right now (15–20 mins)!"
        },
        {
          time: "09:45",
          title: "⏰ 60-MIN ALARM: Buy DPA #2 (Soaring or Night Show)",
          badge: "Highlight",
          mapQuery: "Soaring Fantastic Flight Tokyo DisneySea",
          desc: "Your 60-minute DPA cooldown has ended!<br>• Open App > tap <em>Disney Premier Access</em>.<br>• <strong>Buy DPA #2:</strong> Choose <strong>Soaring: Fantastic Flight</strong> (~2,000 JPY) OR the reserved viewing area for <strong>'Believe! Sea of Dreams'</strong> night show."
        },
        {
          time: "10:45",
          title: "⏰ Standby Pass Cooldown (120 Mins from Entry)",
          badge: "Highlight",
          mapQuery: "Fantasy Springs Tokyo DisneySea",
          desc: "Your 2-hour free Standby Pass cooldown has now expired! Open app and check if any free Standby Passes remain for <em>Peter Pan</em> or <em>Fairy Tinker Bell's Busy Buggies</em>."
        },
        {
          time: "11:30",
          title: "📱 LUNCH: Disney Mobile Order (Skip the Food Lines)",
          badge: "Food",
          mapQuery: "Vulcania Restaurant Tokyo DisneySea",
          desc: "<strong>DO NOT wait in 45-minute restaurant queues!</strong><br>• Open App > tap <strong>'Disney Mobile Order'</strong>.<br>• Choose <em>Vulcania Restaurant</em> (steaming dim sum & noodles inside the geothermal volcanic cave) or <em>The Snuggly Duckling</em> (inside Fantasy Springs if you have entry).<br>• Select your pickup time (e.g. 12:15–12:30). When your time arrives, tap 'I am here' and collect your hot food immediately at the mobile order counter!"
        },
        {
          time: "13:30",
          title: "Enter Fantasy Springs (Your Designated Window)",
          badge: "Highlight",
          mapQuery: "Fantasy Springs Tokyo DisneySea",
          desc: "Head to the grand fantasy entrance portal between Lost River Delta and Arabian Coast. Scan your DPA or Standby Pass QR to enter the magical $2 Billion kingdom! Experience <em>Frozen Ever After</em> boat ride and sing 'Let It Go' in Elsa's ice palace."
        },
        {
          time: "15:30",
          title: "American Waterfront & Broadway Highlights",
          badge: "Rides",
          mapQuery: "Tower of Terror Tokyo DisneySea",
          desc: "Walk along the New York harbor promenade. Ride <em>Tower of Terror</em> or <em>Toy Story Mania</em>. Grab a hot snack (Green Alien Mochi or Sea Salt Ice Cream)."
        },
        {
          time: "17:00",
          title: "Venetian Gondolas Twilight Cruise",
          badge: "Romantic",
          mapQuery: "Venetian Gondolas Tokyo DisneySea",
          desc: "Board a hand-crafted wooden gondola through the canals of Venice as the sun sets and gas lanterns illuminate the stone bridges. The gondolier sings romantic Italian serenades!"
        },
        {
          time: "19:15",
          title: "✨ 'Believe! Sea of Dreams' Night Spectacular (7:30 PM)",
          badge: "Show",
          mapQuery: "Mediterranean Harbor Tokyo DisneySea",
          desc: "Arrive at Mediterranean Harbor by 7:15 PM (or your DPA reserved viewing spot). The show begins at 7:30 PM: massive floating LED towers, laser projections mapped across Mount Prometheus and Hotel MiraCosta, fire, water screens, and fireworks. One of the greatest theme park spectacles in the world!"
        },
        {
          time: "21:30",
          title: "Monorail & Train Back to Ginza Hotel",
          badge: "Rest",
          mapQuery: "The Royal Park Canvas Ginza Corridor, 6-2-11 Ginza, Chuo-ku, Tokyo",
          desc: "Hop on the Disney Resort Line monorail back to Maihama Station, JR train back to Ginza. Pack suitcases tonight for flight home tomorrow!"
        }
      ],
      food: {
        lunch: {
          title: "Vulcania Restaurant (Inside Mount Prometheus)",
          mapQuery: "Vulcania Restaurant Tokyo DisneySea",
          desc: "Use Disney Mobile Order! Chinese fried chicken, dim sum, and fried rice in a geothermal volcanic cavern."
        },
        dinner: {
          title: "Ristorante di Canaletto (Venetian Canal)",
          mapQuery: "Ristorante di Canaletto Tokyo DisneySea",
          desc: "Wood-fired stone oven pizzas and pasta right beside the Venetian canal."
        },
        snack: {
          title: "Green Alien Mochi (Toy Story)",
          mapQuery: "Tokyo DisneySea",
          desc: "Chilled chewy mochi dumplings filled with chocolate, strawberry, and custard cream."
        }
      },
      photoSpots: [
        { title: "Mount Prometheus volcano across Mediterranean Harbor", mapQuery: "Mount Prometheus Tokyo DisneySea" },
        { title: "Venetian Gondola passing under stone bridges at twilight", mapQuery: "Venetian Gondolas Tokyo DisneySea" },
        { title: "Rapunzel's Tower and lantern lake inside Fantasy Springs", mapQuery: "Fantasy Springs Tokyo DisneySea" }
      ],
      proTip: "DisneySea is on Tokyo Bay and gets quite windy and chilly after sunset in December. Pack your warm coat, gloves, and a scarf. Bring a fully charged power bank because you will use the Disney App all day!"`;

const d11Search = 'id: "day-11",';
const d11Idx = code.indexOf(d11Search);

code = code.slice(0, d10Idx) + newDay10Data + ',\n    {\n      ' + code.slice(d11Idx);

fs.writeFileSync('/Users/pagnreach/Sites/pagnreach.github.io/generate-japan-trip.js', code, 'utf8');
console.log('Successfully updated Day 10 with DisneySea Battlecard data');
