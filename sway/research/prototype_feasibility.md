# Sway workshop prototype: technical feasibility and build plan

Prepared Wednesday 16 September 2026 for the Barcelona workshop (Saturday 10 and Sunday 11 October 2026).
Audience: Blake (product lead, non-engineer, building with AI-assisted "vibe coding") and Tory (sales lead).
Scope: one end-to-end journey only. Advocate builds a Locker (My 5: product, image, reason), opens a personal Sway Pass (QR), a recipient scans it on a phone and lands on a mobile recommendation page (product, who recommends, why, one dominant action, optional save by email), and the advocate then sees an observable outcome (scan count, city-level map dot, pending earning label).

## How to read the evidence in this document

- "Primary page fetched" means the page was read directly. Only developer.apple.com and the qrcode.react README on GitHub could be fetched from this environment.
- "Search snippet, primary page not fetched" means the claim comes from a search result summary and the vendor page itself was blocked. Treat prices and limits as "current as of mid-September 2026, re-check on the vendor page before paying".
- [UNVERIFIED] marks a claim I could not confirm from any source. [NEEDS SOURCE] marks a claim the founders should check on the vendor's own page before relying on it.
- Vendor pricing and credit systems in this category change monthly. Every price in this document should be treated as indicative until you see it on the checkout page.

## 0. Decisions at a glance

| Question | Decision | Why in one line |
|---|---|---|
| Build tool | Primary: Lovable (Pro plan) with your own Supabase project connected. Fallback: Bolt.new (Pro plan) connected to the same Supabase project. Last resort: static demo (existing clickable prototype plus a printed QR). | Lowest barrier for a non-engineer, public HTTPS URL on publish, built-in backend, chat-based iteration. Same Supabase database means the fallback does not lose your data. |
| Auth | Do not build sign-up or login. One seeded advocate ("Tori"), advocate pages behind an unguessable path. | Auth flows are the single most common time sink in weekend builds and the journey does not need them. |
| QR generation | Client-side library (qrcode.react, SVG) encoding a short URL with a pass code and optional recommendation slug. Fallback: api.qrserver.com image URL. | No account, no key, works offline in the page, error correction configurable. |
| Apple Wallet | Mock. Wallet-styled card plus a plain "Add to Apple Wallet (coming soon)" button that opens an explanation sheet. Do not use Apple's official badge artwork. | Real passes need the paid Apple Developer Program, a Pass Type ID, a signing certificate and PKCS #7 signing. Not a weekend job for a non-engineer. |
| Google Wallet | Mock in the same way. | Real passes need a Google Wallet Issuer account (starts in demo mode with "[TEST ONLY]" on passes), a Google Cloud service account and JWT signing. |
| Affiliate links | Mock. Our own `/go/<slug>` redirect that logs a click event then forwards to the retailer page. Store the affiliate parameter names in the data model for later. | No network approvals, no eligibility, no reversal handling can be done in a weekend. Real tags in a demo also risk policy breaches. |
| Product images | Seeded catalogue of 15 to 20 wellness products with images uploaded to Supabase Storage in prep, plus manual image URL entry for the live "add a product" moment. No OpenGraph scraping. | Scraping is blocked by many retailers and by browser CORS rules; hotlinked images break at the worst moment. |
| Geolocation | Mock-first: seeded events in several cities plus a default city ("Barcelona") for live scans. Optional stretch: best-effort server-side IP lookup. | Both demo phones will be in the same city anyway, so a real lookup adds little and can fail. |
| Data model | Six tables: users, products, locker_items, passes, recommendations, events. | Enough to make the attribution chain real (advocate, product, recommendation, recipient action) without inventing purchases. |
| Time | 7 hours hands-on across two days, 5 checkpoints, ordered cut list. | Protects the loop; polish is cut first. |

## 1. Tool choice

### 1.1 What the prototype actually needs from a tool

1. A public HTTPS URL that a phone on mobile data can open, within the first hour, and again after every change.
2. A database that survives page refreshes (events must persist so the advocate sees the outcome).
3. Mobile web output that looks good on a phone without extra work.
4. A way to add a QR code without wrestling with packages.
5. Chat-based iteration that a non-engineer can drive for seven hours without opening a terminal.
6. A way out if the tool goes down mid-workshop (code export and a portable database).

Native apps, app stores, and real wallet passes are not needed. The QR is scanned by the phone's built-in camera and opens a web page.

### 1.2 Comparison

| Criterion | Lovable | Bolt.new | Replit Agent | v0 by Vercel | Claude Code or Cursor + Next.js + Supabase + Vercel | Base44 |
|---|---|---|---|---|---|---|
| Speed to a shareable public URL | Fast. Every project gets a `yourapp.lovable.app` address on any plan; the Publish button deploys a snapshot with HTTPS (search snippet from docs.lovable.dev/features/publish and lovable.dev guide; primary page not fetched). | Fast. Deploys to Netlify "in clicks" (search snippet, superdesign.dev and taskade.com reviews). | Fast to a Replit-hosted URL; deployments are billed (static free, Autoscale from about $1/month plus usage per search snippet, nocode.mba). | Fast for the UI; one-click deploy to Vercel (search snippet, vercel.com/academy and ai.cc review). | Slower. Needs GitHub repo, Vercel project, environment variables, and a terminal. Realistic for a developer, risky for a non-engineer under time pressure. | Fast. Hosted app with built-in backend (search snippet, nocode.mba and flowstep.ai reviews). |
| Mobile web quality | Good. Generates React + Tailwind; mobile-first if you ask for it. | Good. Same stack family (React, Vite, Tailwind). | Good but layout quality depends on prompts. | Very good UI quality (shadcn/ui, Next.js). | As good as you prompt it to be. | Adequate; reviewers describe it as fine for MVPs (search snippet). |
| Built-in auth and database | Yes. Lovable Cloud (a managed Supabase backend: Postgres, auth, storage, edge functions) or connect your own Supabase project (search snippets, docs.lovable.dev/integrations/cloud and supabase.com/blog/lovable-cloud-launch). | Yes via Supabase integration, including connecting an existing Supabase project (search snippet, alternativeto.net news item). | Replit database and Replit Auth exist; PostgreSQL hosting and private deployments require the Pro tier per search snippet (nocode.mba). | Marketplace integrations for Supabase, Neon, Upstash (search snippet, vercel.com changelog). Reviewers say v0 still leans on external tools for backend logic (search snippet, nxcode.io). | Supabase directly. Full control, more setup. | Built in (database, auth, hosting) with no external services (search snippet). |
| Ease of adding QR | Ask for `qrcode.react`; Lovable installs npm packages on request. | Same. | Same. | Same. | Same. | Unknown package control; fallback to an image URL API [UNVERIFIED]. |
| Test on a phone over the internet | Publish, then open the URL on the phone. | Publish to Netlify, then open. Also offers Expo for native, not needed here. | Open the deployment URL. | Open the Vercel URL. | Open the Vercel URL after deploy. | Open the published URL. |
| Cost for one month | Free: 5 credits per day capped at 30 per month (search snippet, docs.lovable.dev/introduction/plans-and-credits). Pro about $25 per month for 200 credits (search snippets, lowcode.agency Sept 2026 guide and others). | Free: 300K tokens per day, 1M per month. Pro about $25 per month, 10M tokens (search snippets, superdesign.dev and taskade.com). | Core about $20 per month including usage credits, changed 25 February 2026 (search snippets, alternativeto.net and replit.com/blog/pro-plan). Agent billing is effort based, so hard to predict. | Free with $5 credits; Premium about $20 per month (search snippet, nxcode.io). | Claude Code Pro about $20 per month or Max $100 to $200; Cursor Pro about $20 (search snippets, finout.io and nocode.mba). Plus Supabase free tier and Vercel Hobby (personal, non-commercial) [NEEDS SOURCE for Vercel Hobby terms]. | From about $16 per month billed annually; two credit types, message credits and integration credits (search snippet, nocode.mba). |
| Iterative prompting | Strong; this is its core interaction. Reviewers consistently rank it first for non-technical founders (search snippets, productcompass.pm, rapidevelopers.com, lowcode.agency). | Strong; "fastest path from description to running prototype" but "expect to export when complexity grows" (search snippets). | Strong; long autonomous builds, but cost per iteration is variable. | Strong for UI; weaker for backend loops. | Strongest ceiling, but assumes terminal and Git comfort (search snippet, claudecodeformarketers.com). | Reported credit surprises when debugging (search snippet, nocode.mba). |
| Exit route if the tool is down | GitHub sync of the code; your own Supabase project is outside Lovable. | GitHub export; Supabase is outside Bolt. | Code lives in Replit; export possible. | GitHub integration added February 2026 (search snippet). | Code and data are already yours. | Weakest: reviewers flag lock-in (search snippet, opsily.com). |
| Reliability signals | Public status trackers list incidents on 4 and 5 September 2026 (Supabase project creation failures, partial editor outage) and several late August 2026 issues (search snippet, statusgator.com). | No specific incident data gathered [UNVERIFIED]. | No specific incident data gathered [UNVERIFIED]. | No specific incident data gathered [UNVERIFIED]. | Vercel and Supabase are mature; risk is in your own setup. | No specific incident data gathered [UNVERIFIED]. |

### 1.3 Recommendation

Primary: Lovable on the Pro plan, connected to your own Supabase project (free tier is enough), published to the `lovable.app` address.

Reasons:
1. It is the only option where a non-engineer can go from a blank project to a public phone-openable URL in under 30 minutes with a real database behind it, and keep iterating in plain English for seven hours.
2. Its Supabase integration means the data lives in a service you control. If Lovable has an outage (it has had several in the last month), the database and its rows are unaffected and a second tool can connect to the same project.
3. GitHub sync gives a code export after every checkpoint, which protects the two days of work.
4. Cost is a known quantity: 200 credits on Pro. A message that changes one screen typically costs one credit; a debugging loop can cost several. Budget for buying a top-up if the counter drops under 60 credits by the end of day one [credit consumption per message is a planning assumption, confirm on the Lovable plans page].

Why your own Supabase project rather than Lovable Cloud: Lovable Cloud is faster to start (no separate account), but it ties the database to the Lovable workspace. Connecting your own project costs about 20 minutes in prep and buys portability, the Supabase table editor for seeding and inspecting rows during the demo, and a clean fallback path. If the connection step fails twice in prep, switch to Lovable Cloud and accept the weaker fallback.

Fallback: Bolt.new on the Pro plan, connected to the same Supabase project, deployed to Netlify. It uses the same interaction model (chat to code), the same front-end stack family, and the same backend. Because the tables already exist, the fallback prompt is "connect to this Supabase project and build these screens against these tables", which is much faster than starting over.

Last resort (both tools unavailable, or the build is not working by the day two scope-cut checkpoint): demo the existing clickable prototype at `https://sway-alpha-0-prototype.vjbrillaud.chatgpt.site/` for the advocate side, and a single static recommendation page hosted anywhere (even a Lovable free project) with a printed QR for the recipient side. This proves the recipient experience even if the attribution loop is not live.

Not recommended for this workshop: Claude Code or Cursor with Next.js + Supabase + Vercel. It has the highest ceiling and Blake is evidently comfortable with Claude Code in a supported environment, but the failure modes (environment variables, build errors on deploy, Git conflicts) are the ones that consume hours when nobody in the room can read the stack trace. Keep it as the tool to graduate to after the workshop, when the exported code needs real work.

Not recommended: Base44 (lock-in, integration credits) and Replit (unpredictable effort-based billing and the Pro-tier gating of Postgres hosting per search snippets; confirm before dismissing if you already have a Replit account).

## 2. QR generation

### 2.1 Approach

Use a client-side library in the page. Ask the tool to install `qrcode.react` and render the `QRCodeSVG` component. From the library README (primary page fetched, github.com/zpao/qrcode.react): install is `npm install qrcode.react`; the library exports `QRCodeSVG` (recommended) and `QRCodeCanvas`; props include `value`, `size` (default 128 px), `level` (error correction L about 7%, M about 15%, Q about 25%, H about 30%, default L) and `imageSettings` for an embedded logo with `excavate` to clear modules behind it.

Settings for this prototype: `size` at least 240 px on screen, `level` M (or Q if you embed a small Sway mark), plain black on white, at least 16 px of white margin around it. Do not render the QR in dark mode with inverted colours; some phone cameras fail on inverted codes [UNVERIFIED as a general rule, but cheap to avoid].

Fallback if the package will not install: an image tag pointing at `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=<URL-encoded link>`. Search snippets describe it as free for reasonable usage with no API key (goqr.me/api, primary page not fetched). Trade-off: the pass code leaves your app to a third party and the QR fails if that service is down.

### 2.2 What the QR encodes

Keep the URL short so the QR stays sparse and scans fast at arm's length.

- Personal pass (no product chosen): `https://<app-domain>/p/<pass_code>` where `pass_code` is an 8-character random code stored in `passes.code`. This resolves to the advocate's Pass landing page (their My 5) and logs a `scan` event against the advocate.
- Product-specific recommendation (advocate featured a product from the Pass screen): `https://<app-domain>/r/<rec_slug>` where `rec_slug` is an 8-character code in `recommendations.slug`. This resolves straight to the single-product recommendation page and logs a `scan` event against the advocate, product and recommendation.

Do not put the advocate's raw user id or the product's database id in the URL. A code is shorter, unguessable enough for a demo, and lets you rotate or revoke a pass later. Add `?c=pass` only if you want the channel visible in the URL; otherwise infer channel from the route (`/p/` and `/r/` are Pass channels, a future `/l/` is the Sway Link channel).

Custom domain: not needed. The `lovable.app` address is fine for a QR. If you want a short domain later, buy it after the workshop.

## 3. Apple Wallet and Google Wallet

### 3.1 What Apple genuinely requires (primary pages fetched)

From "Building a Pass" (developer.apple.com/documentation/walletpasses/building-a-pass):
- "The pass you distribute to a user is a signed [bundle] that contains the JSON description of the pass, images, and optional localizations."
- Steps: "Create the source files for a pass. Create a pass type identifier. Generate a signing certificate. Create a digital signature for the pass. Create the signed bundle."
- "Create your pass type identifier in the Certificates, Identifiers & Profiles area of your Apple Developer account."
- "Signing a pass requires a signing certificate for the pass type identifier. Before you can generate a signing certificate you need a certificate signing request (CSR)."
- "Create a PKCS #7 detached signature for the manifest that uses the private key of the pass identifier signing certificate. Add the signature to the top level of the pass in a file called `signature`. Zip the resulting directory. Change the file extension of the resulting archive from `.zip` to `.pkpass`."
- The manifest is "a JSON object that contains a dictionary of the SHA1 hashes for each of the source files for the pass".

From the Pass object reference (developer.apple.com/documentation/walletpasses/pass), the required keys are `description`, `formatVersion` (must be `1`), `organizationName`, `passTypeIdentifier` ("The pass type identifier that's registered with Apple. The value needs to be the same as the distribution certificate that signs the pass."), `serialNumber`, and `teamIdentifier` ("The Team ID for the Apple Developer Program account that registered the pass type identifier.").

From the Apple Developer Program page (developer.apple.com/programs/, primary page fetched): "$99 annual membership". Enrolment approval is not instant; commonly reported as up to 48 hours and sometimes longer for identity checks [UNVERIFIED, support.apple.com blocked].

Search snippets add that the signature must include Apple's WWDR intermediate certificate (developer.apple.com/help/account/certificates/wwdr-intermediate-certificates, primary page not fetched).

Also relevant, from the "Add to Apple Wallet badge guidelines" page (developer.apple.com/wallet/add-to-apple-wallet-guidelines/, primary page fetched): "The badge should appear only in association with your Wallet-compatible pass" and "Be sure to use the badges provided by Apple. Do not create your own versions." So a mock must not use Apple's badge artwork.

### 3.2 What Google genuinely requires (search snippets, developers.google.com blocked)

- A Google Wallet API Issuer account created in the Google Wallet Business Console; "New accounts start in 'demo mode', allowing pass creation but limiting issuance to specific users until publishing access is enabled" and "Demo passes will have '[TEST ONLY]' in the title until you are granted publishing access" (snippets from developers.google.com/wallet/generic/getting-started/issuer-onboarding and .../overview/add-to-google-wallet-flow).
- To get publishing access you "must have created at least one Passes Class, and have a complete business profile" (snippet).
- Passes are issued by signing a JWT with a Google Cloud service account key registered in the console; the save link is `https://pay.google.com/gp/v/save/<signed JWT>` (snippets from developers.google.com/wallet/generic/use-cases/jwt and .../web).

Google's path is cheaper than Apple's (no annual fee reported) and does not need certificate signing, but it still needs a Google Cloud project, a service account key kept server-side, a JWT signing function, and a console approval to remove "[TEST ONLY]".

### 3.3 Should a two-day prototype attempt either?

No. Both require accounts, approvals and server-side signing that a non-engineer cannot debug in the room, and neither changes what the demo proves. The product model already says "Digital-wallet sophistication and NFC can come later" (03_PHASED_LAUNCH_PLAN) and lists "native wallet sophistication" as a later layer (00_SOURCE_OF_TRUTH).

If Blake wants to de-risk the real thing after the workshop, the cheapest experiment is Google Wallet in demo mode with a test user, then Apple with a Pass Type ID and a small signing script run by a developer.

### 3.4 Recommended mock

On the Sway Pass screen:
- A wallet-styled card: rounded rectangle, Sway colour band at the top, advocate name and avatar, a "Founding Member" line, the QR centred, a short line "Scan to see what Tori recommends".
- Two plain buttons in your own style: "Add to Apple Wallet (coming soon)" and "Add to Google Wallet (coming soon)". Tapping opens a sheet: "Wallet passes are coming. For now, show this screen or save it to your photos. Your Pass works the same way." Include a "Save as image" action if the tool can do it in one prompt; otherwise leave it as text.
- Do not use Apple's or Google's badge artwork or their exact button styling. The buttons must read as your own UI.

Demo script line: "The Pass will live in the phone's wallet. Today it lives on this screen; the scan and the attribution are what we are testing."

## 4. Affiliate links

### 4.1 How trackable links are formed (search snippets; vendor help pages blocked)

| Network | Parameter | Format and limits | Example |
|---|---|---|---|
| Amazon Associates | `tag=` | Your tracking ID (Associates ID) as a query parameter, format like `name-20` or `name-21`; up to 100 tracking IDs per account (snippets from affiliate-program.amazon.com help and azonpress.com). | `https://www.amazon.co.uk/dp/B0XXXXXXX?tag=swayuk-21` |
| Awin | `clickref=` | Up to 6 click references (`clickref` to `clickref6`), letters and numbers, up to 50 characters; only the first is passed to the advertiser landing page (snippets from help.awin.com and awin.com tips). | `https://www.awin1.com/cread.php?awinmid=<advertiser>&awinaffid=<publisher>&clickref=<advocate_code>&ued=<encoded product URL>` |
| impact.com | `subId1`, `subId2`, `subId3`, `SharedId` | Alphanumeric, up to 255 characters; SubIds appear only in partner reports, SharedId is visible to the brand too (snippets from help.impact.com). | `https://brand.pxf.io/c/<partner>/<ad>/<campaign>?subId1=<advocate_code>&subId2=<rec_slug>` |
| Rakuten Advertising | `u1=` | Alphanumeric, up to 72 characters, "member ID" style sub-tracking (snippets from pubhelp.rakutenadvertising.com). | `https://click.linksynergy.com/deeplink?id=<pub>&mid=<merchant>&u1=<advocate_code>&murl=<encoded product URL>` |

The pattern is the same everywhere: the network issues a link, and one free-text parameter carries your own identifier back in reporting. For Sway that identifier would be the advocate code plus the recommendation slug, which is exactly what the data model below stores.

### 4.2 Real parameters or a mock?

Mock. Build `/go/<rec_slug>`: a route that inserts a `click_out` event (advocate, product, recommendation, timestamp, city) and then redirects to `products.product_url` unchanged.

Why not real affiliate parameters in the workshop:
1. Approvals. Amazon Associates requires three qualifying sales within 180 days or the application is closed (snippets from affiliate-program.amazon.com help). Awin, impact.com and Rakuten require network sign-up and then per-advertiser programme approval, which takes days to weeks [timing UNVERIFIED but it is not same-day].
2. Eligibility. Most of the seeded products will not be commissionable through any programme you hold on 10 October. Showing a "pending earning" against a non-commissionable product would be fabricating the mechanism you are trying to prove.
3. Reversals and attribution windows. Real pending, confirmed and reversed states depend on network callbacks and return windows. None of that can be shown in a demo, so the label should be an honest placeholder.
4. Policy risk. Some networks restrict where links can appear (for example, Amazon's policies on offline use and on cloaking links are widely reported; the exact wording could not be fetched, [NEEDS SOURCE]). A printed QR that resolves to an Amazon tag in a demo room is not worth the question.
5. Demo integrity. If the retailer page is slow or blocks the in-app browser, the redirect still logged the click, so the advocate outcome shows even when the merchant side does not cooperate.

Design for later without building it now: keep `products.affiliate_network` (null for now), `products.affiliate_url_template` (null), and a note in the redirect code that says "if template exists, substitute `{advocate_code}` and `{rec_slug}` into the sub-id parameter and redirect there instead". That is a one-line change post-workshop once a programme is approved.

Labels to use on screen: "Earnings: 1 pending (affiliate eligibility not yet confirmed)". Never show a currency amount.

## 5. Product images

### 5.1 Options

| Option | Feasibility in the workshop | Verdict |
|---|---|---|
| OpenGraph or oEmbed scraping (paste a product URL, fetch `og:image`) | Must run server-side (browser CORS blocks direct fetches). Many retailers block automated fetches, use private `og:image` URLs, or return bot challenges; scraper packages exist (open-graph-scraper on npm) but failures are common (search snippets, github.com/mod-protocol/mod issue and npm). Adds an edge function and a debugging loop. | Defer. Do not build in the workshop. |
| Manual image URL entry | Trivial. One text field. Risk: hotlinked retailer images can 403 or change. | Include for the live "add a product" moment, with a placeholder image if the URL fails to load. |
| Seeded catalogue of 15 to 20 wellness products with images uploaded to your own storage | Done in prep. Zero risk during the demo. | Recommended as the primary source of products. |

### 5.2 Recommended approach

Seed 15 to 20 products in prep. For each: brand, product name, category, a short neutral description, product URL (retailer or brand page), image uploaded to a public Supabase Storage bucket (or Lovable's storage), and the public image URL stored in `products.image_url`. Upload rather than hotlink so nothing depends on a retailer's server during the demo.

Image rights: brand product photos are fine for a private, in-room demo. Do not publish the app link publicly with brand imagery, and swap to your own photos or licensed images before any external use.

Illustrative catalogue (examples only; Sway has no relationship with any of these brands; Tory should replace with the products she and Blake would genuinely put in a Locker):

1. HOKA Clifton (running shoe)
2. Oura Ring (sleep and recovery tracker)
3. LMNT (electrolyte drink mix)
4. Supergoop Unseen Sunscreen
5. Theragun Mini (massage device)
6. Garmin Forerunner (running watch)
7. Maurten Gel 100 (endurance fuel)
8. Stanley Quencher (water bottle)
9. Lululemon Align (leggings)
10. WHOOP (fitness band)
11. Manduka PRO (yoga mat)
12. Hyperice Normatec (recovery boots)
13. Ciele GOCap (running cap)
14. goodr sunglasses
15. On Cloudmonster (running shoe)
16. Vuori Sunday Performance Jogger
17. AG1 (greens powder)
18. Momentous Creatine
19. Bala Bangles (wearable weights)
20. Nike Pegasus (running shoe)

Items 1 to 5 mirror the example in the launch plan ("A runner might choose HOKA shoes, an Oura Ring, LMNT, Supergoop and a Theragun", 03_PHASED_LAUNCH_PLAN). The rest are placeholders.

Tori's My 5 for the demo: pick five from the list and write a one-sentence personal reason for each in prep (Tory's task). Reasons must sound like a person, not a product description. Example: "Only sunscreen I will actually wear on a long run."

## 6. Geolocation for the Trust map

### 6.1 Options

| Option | What it gives | Problems for the demo |
|---|---|---|
| IP lookup from the recipient page (ip-api.com) | City, region, country, lat, lon. Free for non-commercial use, about 45 requests per minute, but no HTTPS on the free endpoint (search snippet, dev.to comparison; ip-api.com blocked). | A page served over HTTPS cannot call an HTTP endpoint from the browser (mixed content). Must be called server-side. Mobile carrier IPs often resolve to the wrong city. |
| IP lookup (ipinfo.io) | Country only on the free "Lite" tier since 2025; city requires a paid plan (search snippet, botoi.com and dev.to). | Not useful for a city dot. |
| IP lookup (ipapi.co) | HTTPS, city level; free tier limits not confirmed here [UNVERIFIED]. | Unknown quota; a key may be required. |
| Hosting geolocation headers (Vercel `x-vercel-ip-city`, latitude, longitude) | Free on Vercel deployments; read in a function via `@vercel/functions` geolocation helper (search snippets, vercel.com/kb and docs, primary page not fetched). | Only if you host on Vercel. Lovable hosting and Netlify do not give you these headers in the same way [Netlify equivalents UNVERIFIED]. |
| Browser Geolocation API | Accurate coordinates. | Requires a permission prompt on the recipient page, which breaks "one dominant action". Needs reverse geocoding for a city name. |
| Mocked | Seeded events across several cities plus a default city for live scans. | Not "real", but honest if labelled. |

### 6.2 Recommended approach

Mock-first, with an optional best-effort lookup as a stretch.

1. Seed 6 to 10 historic events in `events` with cities and coordinates (for example London, Manchester, Bristol, Barcelona, Sydney, Melbourne) so the map has dots before the demo starts. Label the map "Demo data plus live scans".
2. For live scans, set `city` to a configured default ("Barcelona", 41.3874, 2.1686) from an app setting. The live dot appears where the room is, which is what the demo needs.
3. Stretch (only if all five checkpoints are met with time to spare): a Supabase Edge Function that calls ip-api.com over HTTP from the server, returns city and coordinates, and falls back to the default on any error or on a private address. Server-to-server HTTP avoids the mixed-content problem. Do not spend more than 30 minutes on this.

Map rendering: ask the tool for Leaflet with OpenStreetMap tiles (no API key). If the map component fails, fall back to a list "Scanned in Barcelona, 14:32" under a headline count. The list is the true fallback and should exist from the start.

Privacy posture in the product model is "approximate city-level influence" without exposing exact location (02_PRODUCT_MODEL). City plus rounded coordinates honours that.

## 7. Data model

Minimal tables for Supabase (Postgres). Keep names exactly as below so the build brief, the fallback tool and the seed file all agree.

```
users
  id            uuid primary key default gen_random_uuid()
  handle        text unique not null          -- "tori"
  display_name  text not null
  avatar_url    text
  home_city     text
  created_at    timestamptz default now()

products
  id                     uuid primary key default gen_random_uuid()
  brand                  text not null
  name                   text not null
  category               text                  -- running, recovery, skincare, nutrition, apparel, wearables
  image_url              text not null
  product_url            text not null         -- retailer or brand page (plain, no affiliate params)
  merchant_domain        text
  affiliate_network      text                  -- null in prototype; later: amazon | awin | impact | rakuten
  affiliate_url_template text                  -- null in prototype
  is_seeded              boolean default true
  created_at             timestamptz default now()

locker_items
  id          uuid primary key default gen_random_uuid()
  user_id     uuid references users(id) not null
  product_id  uuid references products(id) not null
  reason      text not null                    -- max 140 characters
  is_my5      boolean default false
  position    int                              -- 1 to 5 for My 5
  created_at  timestamptz default now()
  unique (user_id, product_id)

passes
  id          uuid primary key default gen_random_uuid()
  user_id     uuid references users(id) not null
  code        text unique not null             -- 8 chars, e.g. "k3r9vq2m"
  kind        text default 'personal'          -- personal | product
  status      text default 'active'
  created_at  timestamptz default now()

recommendations
  id              uuid primary key default gen_random_uuid()
  user_id         uuid references users(id) not null
  product_id      uuid references products(id) not null
  locker_item_id  uuid references locker_items(id)
  pass_id         uuid references passes(id)  -- which Pass started it, null for a shared link
  slug            text unique not null         -- 8 chars
  reason_snapshot text                         -- the reason as shown at the time
  channel         text default 'pass'          -- pass | link
  created_at      timestamptz default now()

events
  id                 uuid primary key default gen_random_uuid()
  type               text not null              -- scan | view | click_out | save_email | claim
  user_id            uuid references users(id)  -- the advocate
  product_id         uuid references products(id)
  recommendation_id  uuid references recommendations(id)
  pass_id            uuid references passes(id)
  recipient_email    text                       -- only for save_email
  city               text
  country            text
  lat                double precision
  lng                double precision
  user_agent         text
  referrer           text
  is_demo_seed       boolean default false      -- true for the seeded history
  created_at         timestamptz default now()
```

Derived, not stored: scan count = count of `scan` events for the advocate; click count = `click_out`; saves = `save_email`; "pending earnings" = count of `click_out` events, displayed as "N pending (eligibility not yet confirmed)". No purchase table, no commission amounts. This matches "Do not infer a purchase from a click" (02_PRODUCT_MODEL).

Access rules for the prototype: allow anonymous read on `users`, `products`, `locker_items`, `passes`, `recommendations`; allow anonymous insert on `events`, `locker_items`, `recommendations`. Tell the tool this explicitly; AI builders default to row-level security that silently blocks inserts and you then spend an hour wondering why the scan count is zero. This is acceptable for a private demo with no real personal data. Do not collect real recipient emails during the workshop; use a test address.

## 8. Technical readiness checklist before Friday 9 October

All items are Blake's unless marked. Times are hands-on estimates. Do them in the order shown. Every item has a "done when" so it can be ticked.

### Window 1: by Sunday 27 September (about 2 hours 15 minutes)

| # | Task | Time | Done when | Fallback |
|---|---|---|---|---|
| 1 | Create accounts: Lovable (upgrade to Pro), Supabase, GitHub (personal, not employer), Bolt.new (free is fine for now). Use a personal email, not a work one. | 30 min | You can log in to all four. | If Lovable Pro checkout fails, stay on free for the hello-world and upgrade by 4 October. |
| 2 | Create a Supabase project named `sway-proto`. Note the project URL and anon key location (Settings, API). | 10 min | Project shows "Active". | None needed. |
| 3 | In Lovable, create project `sway-proto`, connect the Supabase project via the Supabase integration, enable GitHub sync to a private repo. | 25 min | Lovable shows the Supabase project as connected and a repo exists on GitHub. | If the Supabase connection fails twice, use Lovable Cloud instead and note that the Bolt fallback will need its own tables. |
| 4 | Hello-world with QR: prompt "Create a mobile-first page at /hello that says 'Sway hello' with the current time, and a page at /qr that shows a QR code (qrcode.react, SVG, 240px) encoding the public URL of /hello. Insert one row into a table called `hello_events` each time /hello loads and show the count on the page." Publish. | 30 min | Scanning the QR on the published /qr page with an iPhone camera and an Android camera opens /hello on mobile data (Wi-Fi off), and the count increases on refresh. | If the count does not increase, the insert is blocked by row-level security; prompt "allow anonymous inserts on hello_events". If QR will not render, use the api.qrserver.com image fallback. |
| 5 | Screen-to-screen test: show /qr on your laptop and on your phone; scan each from the other phone. Note how far away and how bright it needs to be. | 10 min | Both scans succeed within 5 seconds. | Increase QR size to 300 px; raise screen brightness. |
| 6 | Print the /qr page (one A4) as a paper backup. Put it in your travel folder. | 5 min | Paper QR scans. | None needed. |
| 7 | Tory: confirm she can open the published URL on her phone and scan the QR from Blake's phone. | 5 min (Tory) | She reports "opened". | Send her the URL by message as a fallback. |

Note: Supabase free projects pause after about seven days without database activity (search snippets, supabase.com/pricing not fetched). The hello-world count on step 4 keeps it active only if someone loads the page. Item 13 below handles this.

### Window 2: by Sunday 4 October (about 2 hours 30 minutes)

| # | Task | Time | Done when | Fallback |
|---|---|---|---|---|
| 8 | Tory: choose Tori's My 5 (five products) and write a one-sentence reason for each; choose 10 to 15 more catalogue products. Send as a simple list: brand, product, category, product URL, reason (for the five). | 45 min (Tory) | List received by Blake. | Blake uses the illustrative list in section 5. |
| 9 | Blake: collect one image per product (save as JPG or PNG, under 500 KB), upload to a public Supabase Storage bucket `product-images`, copy each public URL. | 45 min | 15 to 20 image URLs open in a browser on a phone. | Use a plain placeholder image for any product without a good image. |
| 10 | Create the six tables in Supabase by pasting the schema in section 7 into the SQL editor (or prompt Lovable to create them with the exact names and columns). Seed `users` (tori), `products` (15 to 20), `locker_items` (Tori's five with `is_my5 = true`), `passes` (one code for Tori), and 6 to 10 `events` rows with `is_demo_seed = true` across several cities. Prepare the seed as a CSV so it can be re-imported in 5 minutes if a build step wipes it. | 40 min | Table editor shows the rows; a CSV of each table is saved locally. | If the SQL editor is intimidating, prompt Lovable: "Create these tables exactly as follows" and paste the schema. |
| 11 | Finalise the build brief (section 9) with your actual app URL, pass code and product names. Save it as a text file and in the shared workspace. | 20 min | The brief is under 600 words and every screen names a route. | Use section 9 verbatim. |
| 12 | Fallback test: open Bolt.new, start a project, connect the same Supabase project, prompt "show a list of products from the products table". Deploy to Netlify. Do not build further. | 20 min | Netlify URL shows the product list on your phone. | If Bolt cannot connect, note the anon key and URL so it can be pasted in as environment variables on the day. |

### Window 3: Wednesday 7 to Friday 9 October (about 1 hour 15 minutes)

| # | Task | Time | Done when | Fallback |
|---|---|---|---|---|
| 13 | Wednesday 7 October: dress rehearsal. In a throwaway Lovable project (or a branch of the real one), paste the first 40 percent of the build brief (goal, users, screens 1 and 2, data) and see what one prompt produces. Check credit consumption. Load the real project's /hello page once to keep Supabase active. | 45 min | You know roughly how many credits one screen costs and whether the tool respects your table names. | If credits are under 120 remaining on Pro, buy a top-up before travelling. |
| 14 | Thursday 8 October: check status pages for Lovable, Supabase and Netlify; confirm the published URL still opens on both phones; confirm mobile data will work in Spain for both of you (UK plans generally include EU roaming but caps and fair-use rules vary [NEEDS SOURCE, check your carrier]). Charge a power bank. | 20 min | Both phones open the URL on mobile data; roaming confirmed. | Laptop hotspot as the backup network; a printed QR as the backup Pass. |
| 15 | Friday 9 October morning, before flying: load /hello once more (keeps Supabase active through the weekend), confirm GitHub sync is current, export the seed CSVs to your laptop and to the shared workspace. | 10 min | Supabase shows "Active"; repo last commit is today. | None needed. |

Total prep: about 6 hours for Blake across three windows, about 50 minutes for Tory.

Things to pack: both phones, charging cables, power bank, laptop, the printed QR, the build brief as a text file, the seed CSVs, and the Supabase anon key and URL written down (for the Bolt fallback).

## 9. Draft build brief (the prompt)

Paste this as the first message in the Lovable project on Saturday. If the tool has a project "knowledge" or instructions area, paste it there too so it persists across prompts. Then drive the build screen by screen with short follow-up prompts ("Now build screen 2 as described"); do not expect one prompt to build everything.

---

**Sway prototype build brief**

**Goal.** Build "Sway", a mobile-first web app demonstrating one journey. An advocate (Tori) has a Locker of five products, each with an image and a one-line personal reason. She opens her Sway Pass, a QR code. A recipient scans it with a phone camera and lands on a recommendation page. Tori then sees the outcome: scan count, a city dot on a map, and a pending earning label. Every step must work on a phone.

**Users.** One seeded advocate, handle `tori`, no login; her pages live under `/me`. Recipients are anonymous phone visitors with no login.

**Data.** Use the connected Supabase project. These tables exist and are seeded: `users`, `products`, `locker_items`, `passes`, `recommendations`, `events`. Do not rename or recreate them. Allow anonymous reads on all six and anonymous inserts on `events`, `locker_items` and `recommendations`.

**Screens (build in this order).**

1. `/me` Locker. Title "Tori's Locker". Grid of her five `locker_items` (large image, brand, name, reason). Buttons: "View my Sway Pass" and "Add a product" (sheet: pick from `products` or enter brand, name, image URL, product URL, reason; saves a `locker_items` row).
2. `/me/pass` Sway Pass. Wallet-style card with Tori's name, avatar, "Founding Member" and a QR (qrcode.react, SVG, 260 px, level M) encoding `https://<app-url>/p/<pass code>`. Below: "Feature a product"; tapping one of her five creates a `recommendations` row (8-character slug, `reason_snapshot`, `pass_id`) and switches the QR to `https://<app-url>/r/<slug>`. Two plain buttons, "Add to Apple Wallet (coming soon)" and "Add to Google Wallet (coming soon)", open a sheet: "Wallet passes are coming. For now, show this screen."
3. `/p/<code>` Pass landing (recipient). Insert an `events` row (type `scan`, with `user_id`, `pass_id`, and the app's default city and coordinates). Show "Tori recommends" and her five products; tapping one opens `/r/<slug>`, creating the recommendation if needed.
4. `/r/<slug>` Recommendation page (recipient). Insert a `view` event. Show product image, brand, name, "Recommended by Tori" with avatar, her reason in quotes, one dominant button "Go to product" linking to `/go/<slug>`, and a secondary "Save to my email" field that inserts a `save_email` event and shows "Saved". Small "What is Sway?" link to a one-paragraph page.
5. `/go/<slug>` Redirect. Insert a `click_out` event, then redirect to the product's `product_url`.
6. `/me/trust` Trust. Three counters from `events` for Tori: scans, product clicks, saves. A Leaflet map (OpenStreetMap tiles) with one dot per event with coordinates, and a list under it (time, type, city, product). Label "Earnings: N pending (affiliate eligibility not yet confirmed)" where N is the click count. Caption "Demo data plus live scans".

**Must work.** QR scans from a phone camera and opens over mobile data. Events are inserted for scan, view, click_out and save_email. Trust counters change after a refresh.

**Mocked.** Wallet buttons (sheet only). Affiliate link (plain redirect with our logging). City (default "Barcelona", 41.3874, 2.1686). Earnings (label only, no amounts).

**Out of scope.** Sign up, login, points, Collectives, brand screens, notifications, payments, native apps, dark mode.

**Style.** Clean and product-forward: white background, one accent colour, large product images, system font, big touch targets, short human copy. The recipient page fits one phone screen above the fold.

**Acceptance tests.**
1. `/me` on a phone shows five products with images and reasons.
2. Scanning the QR on `/me/pass` with a second phone opens `/p/<code>` within 3 seconds.
3. Tapping a product opens `/r/<slug>` with product, "Recommended by Tori", reason and one dominant button.
4. "Go to product" reaches the retailer page and a `click_out` row exists.
5. Saving an email creates a `save_email` row.
6. `/me/trust` shows at least one scan, a map dot, and "1 pending".

---

(About 590 words.)

## 10. Hour-by-hour build sequence (7 hours hands-on) with checkpoints and cut list

The hours below are hands-on build time only. The orchestrator should place them in the two-day agenda; a natural split is 3 hours on Saturday after the scope lock and 4 hours on Sunday morning, ending at least 90 minutes before the final review. Blake builds; Tory tests as the recipient, writes the demo script, and keeps the cut list.

| Hour | Blake (build) | Tory (parallel) | Checkpoint (pass or cut) |
|---|---|---|---|
| 0:00 to 0:30 | Open the prepared project. Paste the brief. Prompt for screen 1 (`/me` Locker) reading from the seeded tables. Publish. | Reads the brief aloud once; starts the demo script (six beats, one per acceptance test). | CP1 at 0:30: `/me` shows Tori's five products with images on Blake's phone from the published URL. If not, the data connection is wrong; fix before anything else. |
| 0:30 to 1:30 | Screen 2 (`/me/pass`): card, QR encoding `/p/<code>`, "Feature a product" creating a recommendation and switching the QR. Then screen 3 (`/p/<code>`): pass landing with a `scan` event insert. Publish. | Scans the QR from her phone each time Blake republishes; reports what she sees. | CP2 at 1:30: Tory scans Blake's screen, `/p/<code>` opens on her phone, and a new `scan` row appears in Supabase. If inserts fail, prompt for anonymous insert access on `events` (10 minutes max). |
| 1:30 to 2:45 | Screen 4 (`/r/<slug>`): recommendation page with dominant action, `view` event, save by email. Screen 5 (`/go/<slug>`): click_out logging and redirect. Publish. | Tests the recipient page for clarity: does it say product, who, why, and one action in under five seconds? Suggests copy changes (max three). | CP3 at 2:45: the whole recipient side works from a scan to the retailer page, with `scan`, `view`, `click_out` and `save_email` rows. This is the minimum demo. Save a screen recording now. End of Saturday build if splitting 3 + 4. |
| 2:45 to 3:45 | Screen 6 (`/me/trust`): counters and event list first, map second. Default city setting. Publish. | Prepares the "outcome" beat of the demo script; checks seeded events look plausible. | CP4 at 3:45: Trust page shows counts that change after Tory scans again, plus the list. The map may still be missing. |
| 3:45 to 4:45 | Map with Leaflet and OSM tiles; dots from seeded and live events. Wallet mock sheet on the Pass screen. Publish. | Runs the six acceptance tests end to end on her phone; logs failures with screenshots. | CP5 at 4:45: all six acceptance tests pass on two phones. Save a second screen recording. |
| 4:45 to 5:45 | Fix list from Tory's test run (in order of demo impact). Add "What is Sway?" page. Tidy copy and spacing on the recipient page only. Republish after each fix. | Rewrites the demo script against the real screens; times it (target under 4 minutes). | CP6 at 5:45: fix list empty or only cosmetic items remain. Scope is frozen. No new features after this point. |
| 5:45 to 6:30 | Three full run-throughs with Tory as recipient, from a cold browser on her phone (clear the tab between runs). Fix only what breaks the run. Export seed CSVs again. | Drives the run-throughs; notes timing and any stumble. | CP7 at 6:30: three clean runs. Confirm GitHub sync is current. |
| 6:30 to 7:00 | Write the known-limitations list (what is mocked, what is seeded, what is not built) and the reset procedure (delete live events, keep seeds). Print or screenshot the QR as backup. | Final demo script and a one-line "what this proves and what it does not" statement. | Done. Hand over to the final review. |

Stretch, only after CP6 with time in hand: best-effort IP city lookup via an edge function (30 minutes cap); a "Save as image" action on the Pass.

### Ordered cut list (cut from the top when behind at a checkpoint)

1. Wallet-styled card polish and the wallet sheets. Keep a plain "Sway Pass" heading over the QR and one line of text "Wallet pass coming soon".
2. The map. Keep the counters and the event list with city names ("Scanned in Barcelona, 14:32").
3. "Add a product" sheet with manual entry. Seeded products only; say so in the demo.
4. "Feature a product" on the Pass (product-specific QR). The QR always points to `/p/<code>` and the recipient picks the product on the Pass landing.
5. "What is Sway?" page. Replace with a plain text line on the recipient page.
6. Save by email. Replace with a "Save" button that shows a toast and logs the event without an email field.
7. Pending earnings label. Replace with the click count only.

Never cut: the QR that opens the recipient page on a phone, the recommendation page with one dominant action, the `scan` and `click_out` events, and the scan count on the advocate side. If those four are not working by CP4 (hour 3:45), stop adding and spend the remaining time making exactly those four solid; the demo then shows the loop with the Supabase table open on the laptop as the "outcome" view. That is still a true demonstration of attribution.

If Lovable is unusable for more than 20 minutes at any point: switch to the Bolt fallback project (already connected to the same Supabase), paste the brief, and rebuild from the current checkpoint. Budget 45 minutes to get back to where you were. Data is intact because it never lived in Lovable.

## 11. Known risks and mitigations

| Risk | Likelihood | What it costs | Mitigation |
|---|---|---|---|
| Auth eats the morning: the tool adds sign-up, email confirmation, protected routes, and the recipient page ends up behind a login. | High if not prevented | 1 to 2 hours | The brief says "no login" explicitly. If the tool adds auth anyway, prompt "remove all authentication; all pages are public". If auth is ever needed, Lovable's built-in backend has an auto-confirm toggle so users do not need a confirmation email (search snippet, docs.lovable.dev/features/email-auth); enable it before building. |
| Row-level security silently blocks event inserts, so counts stay at zero. | High | 30 to 60 minutes of confusion | Hello-world in prep already exercised an anonymous insert. Prompt wording in the brief covers anonymous inserts. Check the Supabase table editor, not the app, when a count looks wrong. |
| Image hosting: hotlinked retailer images fail (403, expired URL) or load slowly on mobile data. | Medium | Ugly demo | Images uploaded to your own storage in prep. Placeholder image on load failure. Keep images under 500 KB. |
| Phone camera QR quirks: QR too small or too dense, low screen brightness, glare, dark-mode inversion, camera focus at close range, the recipient phone opening the link in a restricted in-app browser. | Medium | Fumbled demo opening | Short URL (8-character code), 260 px or larger, level M, white margin, screen brightness to maximum, hold the phones 20 to 30 cm apart, tested in prep from both a laptop screen and a phone screen. Paper QR as backup. iPhone Camera has scanned QR codes natively since iOS 11 and shows a tappable link to open in Safari (search snippets, support.apple.com/en-us/102680, primary page not fetched); on Android, use the camera or Google Lens. |
| Published URL is stale: the preview shows the new version but the published site is a snapshot, so the phone shows old behaviour. | High | Repeated "it worked a minute ago" | Publish after every meaningful change; Tory tests only the published URL, never the preview. Hard-refresh on the phone (close the tab, reopen). |
| Public URL sharing: the preview link needs a Lovable login or the published project is set to a restricted audience. | Medium | Recipient cannot open | Use the published `lovable.app` URL with the default public audience. Verified in prep from a phone that is not logged in to Lovable. |
| Tool outage: Lovable has had several incidents in late August and early September 2026, including Supabase project creation failures and a partial editor outage (search snippet, statusgator.com). | Medium over a weekend | Lost build time | Own Supabase project, GitHub sync after each checkpoint, Bolt fallback tested in prep, screen recordings at CP3 and CP5 as demo insurance. |
| Credits run out mid-build (debugging loops burn credits fast). | Medium | Stalled build | Start with a full Pro allocation; check the balance at each checkpoint; buy a top-up when under 60. Keep prompts small and specific; one screen per prompt. |
| Supabase free project paused after seven days of inactivity. | Medium if prep ends early | 5 to 10 minutes to unpause, panic if unnoticed | Load the app on 7 and 9 October (checklist items 13 and 15). Unpause is a button in the Supabase dashboard [UNVERIFIED wording]. |
| Retailer page blocks the redirect or is slow on mobile data, so "Go to product" looks broken. | Medium | Weak close to the recipient beat | The click is logged before the redirect. Choose product URLs that load fast on mobile in prep. If the retailer page fails live, show the Supabase row as proof and move on. |
| Map component breaks the page (tile loading, coordinate errors). | Medium | Trust screen fails | Build counters and list first, map second (hour 3:45 onward); the list is the fallback; the map is item 2 on the cut list. |
| Mobile data in Barcelona: roaming caps, no signal in the venue, or hotel Wi-Fi blocking a domain. | Low to medium | No demo | Both phones on mobile data, laptop hotspot as backup, roaming confirmed on 8 October, venue Wi-Fi tested Friday evening if the workshop is at the accommodation. |
| Same-city geolocation looks fake or wrong (both dots in one place, or carrier IP shows Madrid). | High if real lookup is used | Undermines the Trust map beat | Mock-first with seeded history and a default city; label the map honestly. Real lookup only as a stretch. |
| Demo data pollution: test scans during the build inflate the counts. | Certain | Confusing outcome screen | Reset procedure written at hour 6:30: delete `events` where `is_demo_seed = false` before the final review demo. |
| Scope creep from day-one discussions (points, Collectives, brand views). | High | Loses the loop | Scope lock time set by the agenda; the brief's out-of-scope list; Tory owns the cut list and says no. |
| Work-account contamination: building with employer accounts or tooling. | Low | Ownership questions later | Personal email for every account created in the checklist; personal GitHub repo; nothing from the day job. |

## 12. What this prototype proves and what it does not

Proves: a person can hold a recommendation identity on a phone, another person can reach it with a camera in seconds, the recipient sees product, who, why and one action, and the advocate sees that it happened. That is the wedge in 01_CURRENT_STRATEGY ("Build a useful recommendation identity, use it naturally when someone asks, generate trackable scans, clicks, saves").

Does not prove: demand, retention, affiliate economics, purchase attribution, wallet distribution, or any brand interest. Say this in the demo. The brief is explicit that the prototype "makes the concept tangible; it does not validate demand" (00_BRIEF).

## Sources

Primary pages fetched:
- Apple, Building a Pass: https://developer.apple.com/documentation/walletpasses/building-a-pass
- Apple, Creating the Source for a Pass: https://developer.apple.com/documentation/walletpasses/creating-the-source-for-a-pass
- Apple, Pass object (required keys): https://developer.apple.com/documentation/walletpasses/pass
- Apple, Wallet Passes overview: https://developer.apple.com/documentation/walletpasses
- Apple Developer Program ($99 annual membership): https://developer.apple.com/programs/
- Apple, Add to Apple Wallet badge guidelines: https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/
- qrcode.react README: https://github.com/zpao/qrcode.react/blob/trunk/README.md

Search snippets only (primary page blocked from this environment; verify before relying on numbers):
- Lovable plans and credits: https://docs.lovable.dev/introduction/plans-and-credits and https://lovable.dev/pricing
- Lovable pricing guides (Sept 2026): https://www.lowcode.agency/blog/lovable-pricing and https://www.nocode.mba/articles/lovable-pricing
- Lovable publish: https://docs.lovable.dev/features/publish and https://lovable.dev/guides/how-to-publish-a-web-app
- Lovable Cloud: https://docs.lovable.dev/integrations/cloud and https://supabase.com/blog/lovable-cloud-launch
- Lovable Supabase integration: https://lovable.dev/supabase-integration
- Lovable email auth (auto-confirm): https://docs.lovable.dev/features/email-auth
- Lovable status history: https://statusgator.com/services/lovable and https://statuspage.incident.io/lovable/history
- Bolt.new pricing and integrations: https://superdesign.dev/blog/bolt-review and https://www.taskade.com/blog/bolt-review and https://alternativeto.net/news/2025/3/new-update-for-bolt-new-integration-with-supabase
- Replit pricing: https://replit.com/blog/pro-plan and https://alternativeto.net/news/2026/2/replit-restructures-plans-with-lower-core-pricing-and-launches-pro-for-advanced-teams and https://www.nocode.mba/articles/replit-pricing
- v0 pricing and integrations: https://www.nxcode.io/resources/news/v0-by-vercel-complete-guide-2026 and https://vercel.com/changelog/vercel-marketplace-integrations-now-available-in-v0 and https://v0.app/docs/databases
- Base44: https://www.nocode.mba/articles/base44-review and https://flowstep.ai/blog/base44-review/ and https://opsily.com/hosting/ship/base44-review
- Claude Code and Cursor pricing: https://www.finout.io/blog/claude-code-pricing-2026 and https://www.nocode.mba/articles/cursor-pricing
- Tool comparisons for non-technical founders: https://www.productcompass.pm/p/ai-prototyping-lovable-ai-studio-claude and https://www.rapidevelopers.com/vs/lovable-vs-claude-code and https://claudecodeformarketers.com/blog/claude-code-vs-lovable-vs-cursor-vs-bolt/
- Supabase free tier: https://supabase.com/pricing and https://uibakery.io/blog/supabase-pricing and https://automationatlas.io/answers/supabase-free-tier-limits-2026/
- QR image API: https://goqr.me/api/ and https://goqr.me/api/doc/create-qr-code/
- iPhone QR scanning: https://support.apple.com/en-us/102680 and https://support.apple.com/guide/iphone/scan-a-qr-code-iphe8bda8762/ios
- Google Wallet: https://developers.google.com/wallet/generic/getting-started/issuer-onboarding and https://developers.google.com/wallet/generic/overview/add-to-google-wallet-flow and https://developers.google.com/wallet/generic/use-cases/jwt and https://developers.google.com/wallet/generic/web
- Apple WWDR intermediate certificates: https://www.developer.apple.com/help/account/certificates/wwdr-intermediate-certificates
- Amazon Associates tracking IDs and 180-day rule: https://affiliate-program.amazon.com/help/node/topic/GK5TZZ4AWML2QSLA and https://affiliate-program.amazon.com/help/node/topic/G7MJTPEP9NC3YKMG and https://azonpress.com/key-amazon-affiliate-requirements/
- Awin clickref: https://help.awin.com/developers/docs/click-appends-dyn-params and https://www.awin.com/gb/news-and-events/tips-and-tricks/utilising-click-references
- impact.com Sub ID and Shared ID: https://help.impact.com/partner/what-would-you-like-to-learn-about/platform-features/tracking/tracking-links/link-parameters/sub-id-and-shared-id-parameters-explained-for-partners
- Rakuten u1: https://pubhelp.rakutenadvertising.com/hc/en-us/articles/360061672251-Deep-Links-Overview
- IP geolocation free tiers: https://dev.to/apogeoapi/free-ip-geolocation-api-in-2026-top-5-compared-37mh and https://botoi.com/blog/ipinfo-alternative-free-ip-geolocation/
- Vercel geolocation headers: https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions and https://vercel.com/docs/headers/request-headers
- OpenGraph scraping tools and pitfalls: https://www.npmjs.com/package/open-graph-scraper and https://github.com/mod-protocol/mod/issues/116

Internal context used: 00_BRIEF.md, 00_SOURCE_OF_TRUTH.md, 01_CURRENT_STRATEGY.md, 02_PRODUCT_MODEL.md, 03_PHASED_LAUNCH_PLAN.txt, 05_FOUNDER_WORKING_SESSION.md, 06_SOURCE_INDEX.md.
