const fs = require('fs');
let code = fs.readFileSync('/Users/pagnreach/Sites/pagnreach.github.io/generate-japan-trip.js', 'utf8');

const target = '<!-- DETAILED MODE: Basecamp & Hotel -->';
const battlecardHtml = [
  '${d.hasDisneyBattlecard ? `',
  '          <!-- DISNEYSEA BATTLECARD -->',
  '          <div class="section-box detail-section" style="border: 2px solid #8b5cf6; background: linear-gradient(180deg, #f5f3ff 0%, #ffffff 100%);">',
  '            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">',
  '              <span style="font-size:0.98rem; font-weight:800; color:#5b21b6;">🏰 DisneySea Master Game Plan (Follow Step-by-Step)</span>',
  '              <span style="font-size:0.7rem; font-weight:700; background:#7c3aed; color:white; padding:3px 8px; border-radius:12px; letter-spacing:0.5px;">CRITICAL TIMING</span>',
  '            </div>',
  '            ',
  '            <div style="font-size:0.83rem; line-height:1.5; color:#374151;">',
  '              <div style="margin-bottom:10px; padding:10px 12px; background:white; border-radius:10px; border:1px solid #ddd6fe;">',
  '                <strong style="color:#7c3aed; font-size:0.86rem;">📱 Step 0 (Before You Leave Ginza):</strong><br>',
  '                Make sure the <strong>Tokyo Disney Resort App</strong> is installed on your iPhone, both tickets for Reach & Muypor are linked into the SAME account (Group feature), and your credit card is saved.',
  '              </div>',
  '',
  '              <div style="margin-bottom:10px; padding:10px 12px; background:#fff7ed; border-radius:10px; border:1px solid #fed7aa;">',
  '                <strong style="color:#c2410c; font-size:0.86rem;">🚨 Step 1 (08:45 AM - The Exact Second Your Ticket Scans):</strong><br>',
  '                • <strong>Buy DPA #1 (~2,000 JPY):</strong> Tap <em>Disney Premier Access</em> ➔ Choose <strong>Frozen Ever After</strong> (Fantasy Springs). <em>Sells out in 20–30 mins!</em><br>',
  '                • <strong>Claim Free Standby Pass #1:</strong> Immediately tap <em>Standby Pass</em> ➔ Choose <strong>Rapunzel\\'s Lantern Festival</strong> or <strong>Peter Pan</strong>.<br>',
  '                • <strong>SET AN IPHONE ALARM FOR 60 MINUTES (09:45 AM)!</strong>',
  '              </div>',
  '',
  '              <div style="margin-bottom:10px; padding:10px 12px; background:#eff6ff; border-radius:10px; border:1px solid #bfdbfe;">',
  '                <strong style="color:#1d4ed8; font-size:0.86rem;">⏰ Step 2 (09:45 AM - When Alarm Rings):</strong><br>',
  '                Your 60-min DPA cooldown has ended! Open app ➔ tap <em>Disney Premier Access</em> ➔ <strong>Buy DPA #2:</strong> Choose <strong>Soaring: Fantastic Flight</strong> (~2,000 JPY) OR reserved viewing area for <strong>\\'Believe! Sea of Dreams\\'</strong> night show.',
  '              </div>',
  '',
  '              <div style="margin-bottom:10px; padding:10px 12px; background:#f0fdf4; border-radius:10px; border:1px solid #bbf7d0;">',
  '                <strong style="color:#15803d; font-size:0.86rem;">🍜 Step 3 (11:30 AM - Lunch Without Queues):</strong><br>',
  '                Do NOT wait in 45-min lines! Tap <strong>\\'Disney Mobile Order\\'</strong> in the app ➔ choose <em>Vulcania Restaurant</em> (inside Mount Prometheus volcano) or <em>The Snuggly Duckling</em> (in Fantasy Springs) ➔ pick your pickup window.',
  '              </div>',
  '',
  '              <div style="padding:10px 12px; background:#faf5ff; border-radius:10px; border:1px solid #e9d5ff;">',
  '                <strong style="color:#6b21a8; font-size:0.86rem;">✨ Step 4 (07:15 PM - Night Spectacular):</strong><br>',
  '                Head to Mediterranean Harbor for <strong>\\'Believe! Sea of Dreams\\'</strong> (Starts 7:30 PM). If you bought DPA, enter your reserved viewing area.',
  '              </div>',
  '            </div>',
  '          </div>',
  '` : \'\'}',
  '',
  '          <!-- DETAILED MODE: Basecamp & Hotel -->'
].join('\n');

code = code.replace(target, battlecardHtml);
fs.writeFileSync('/Users/pagnreach/Sites/pagnreach.github.io/generate-japan-trip.js', code, 'utf8');
console.log('Successfully injected battlecard template!');
