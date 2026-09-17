# Barcelona workshop logistics: transfers, cutoffs, venue, dinner, weather, holidays

Prepared Wednesday 16 September 2026 for the Sway founder workshop, Saturday 10 and Sunday 11 October 2026, Barcelona.

## How to read this file

Evidence in this file is labelled in one of four ways:

- **[SOURCED]**: taken from a page, tool or dataset I could actually retrieve in this session. The source is named next to the claim.
- **[COMPUTED]**: calculated in this session from a maintained open-source library (sunset times, holiday calendar, time zones). Library name and version are given.
- **[UNVERIFIED]**: general knowledge that I could not confirm against a primary page in this session because the network egress proxy blocked the domain. Treat as a planning assumption to confirm, not a fact. The URL to confirm against is given.
- **[NEEDS SOURCE]**: I could find nothing usable and am flagging the gap.

Network constraints this session: the WebSearch budget for the session was already exhausted before this task started (200 of 200 calls used by earlier research), and the egress proxy blocked every primary transport, airline, government, weather and travel domain I tried (aena.es, aerobusbarcelona.es, tmb.cat, renfe.com, taxi.amb.cat, travel-europe.europa.eu, gov.uk, timeanddate.com, aemet.es, gencat.cat, boe.es, barcelona.cat, firabarcelona.com, vueling.com, britishairways.com, easyjet.com, ryanair.com, jet2.com, lockerbarcelona.com, usebounce.com, and about 60 others). The only external routes that worked were PyPI, raw.githubusercontent.com, and the Kiwi.com, lastminute.com and Tripadvisor connectors. I used those to get real flight schedules for the workshop dates, computed sunset and holidays from maintained libraries, and labelled everything else honestly. The founders should spend 20 minutes confirming the [UNVERIFIED] items closest to their bookings (see the checklist at the end).

---

## 1. Fixed facts about the dates [COMPUTED]

Computed with Python `astral` 3.2 (sun times, Barcelona 41.3874 N, 2.1686 E, Europe/Madrid) and `holidays` 0.104 (Spain, subdivision CT for Catalonia), plus the IANA time zone database via `zoneinfo`.

| Item | Value |
|---|---|
| Friday 9 October 2026 | Arrival day. Sunset 19:19 CEST, civil dusk 19:48 |
| Saturday 10 October 2026 | Workshop day 1. Sunrise 07:57, sunset 19:18 CEST, civil dusk 19:46 |
| Sunday 11 October 2026 | Workshop day 2 and departure. Sunrise 07:58, sunset 19:16 CEST, civil dusk 19:44 |
| Monday 12 October 2026 | Fiesta Nacional de España, national public holiday in Spain including Catalonia |
| Time zones during the trip | Barcelona CEST (UTC+2). UK BST (UTC+1). Barcelona is one hour ahead of the UK for the whole trip. Both zones move back on Sunday 25 October 2026, so no clock change affects the workshop. |

Practical implications:

- Daylight is available until about 19:15 on both workshop days. A 09:00 to 17:30 working day sits entirely in daylight; a walk or outdoor debrief after 19:00 is in dusk.
- Sunday 11 October is a normal Sunday for transport (Sunday timetable). The Monday holiday does not change Sunday services, but it does create a three-day long weekend ("puente"), which affects crowding and prices (section 10).
- No UK public holiday falls on these dates (computed for England).

---

## 2. Real return flight schedules for Sunday 11 October 2026 [SOURCED]

Retrieved on 16 September 2026 from the Kiwi.com flight search connector (direct flights only, one adult) and cross-checked for London against the lastminute.com flight search connector (direct, departures after 15:00). Times are local (BCN departures in CEST, UK arrivals in BST). Schedules four weeks out can still change; the founders must confirm the exact flight on the airline's own site or app. Prices shown were the connector's quotes on 16 September for one adult with a personal item only; they are indicative, not a recommendation.

### Barcelona to London, direct, Sunday 11 October 2026

| Depart BCN | Arrive | Airline and flight | Source |
|---|---|---|---|
| 06:45 | 08:15 LGW | easyJet U28058 | Kiwi |
| 09:35 | 11:00 LTN | Wizz Air UK W95362 | Kiwi |
| 10:35 | 12:00 STN | Ryanair FR8231 | Kiwi |
| 10:50 | 12:20 LTN | easyJet U22324 | Kiwi |
| 11:15 | 12:45 LGW | easyJet U28056 | Kiwi |
| 12:15 | 13:40 LTN | Ryanair FR7808 | Kiwi |
| 13:05 | 14:30 STN | Ryanair FR9015 | Kiwi |
| 16:20 | 17:40 LGW | Vueling VY7824 (also sold as BA and Iberia codeshares) | Kiwi, lastminute |
| 16:30 | 17:55 STN | Ryanair FR9045 | Kiwi, lastminute |
| 16:40 | 18:05 LTN | Wizz Air UK W95360 | Kiwi, lastminute |
| 16:45 | 18:15 LGW | easyJet | lastminute |
| 17:15 | 18:40 LTN | easyJet U22326 | Kiwi, lastminute |
| 17:15 | 18:30 LCY | British Airways (London City) | lastminute |
| 18:20 | 19:40 LGW | Vueling (also sold as BA and Iberia codeshares) | lastminute |
| 18:35 | 20:05 LHR | Vueling VY6652 (also sold as BA and Iberia codeshares) | Kiwi, lastminute |
| 18:35 | 19:55 LHR | British Airways | lastminute |
| 19:30 | 20:45 LHR | British Airways | lastminute |
| 19:35 | 21:00 STN | Ryanair FR8215 | Kiwi, lastminute |
| 19:40 | 21:00 LGW | Vueling (also sold as BA and Iberia codeshares) | lastminute |
| 20:25 | 21:55 LGW | easyJet U28062 | Kiwi, lastminute |
| 20:40 | 21:55 LHR | British Airways | lastminute |
| 21:20 | 22:35 LHR | British Airways | lastminute |
| 21:20 | 22:40 LGW | Vueling (also sold as BA and Iberia codeshares) | lastminute |
| 21:40 | 23:05 LGW | easyJet U28060 | Kiwi, lastminute |
| 22:00 | 23:40 LTN | easyJet | lastminute |

Booking trap [SOURCED]: the lastminute.com "Barcelona to London" results also included Ryanair departures from Reus (REU 17:15 to STN) and Girona (GRO 21:15 to STN). Those airports are roughly 90 to 110 km from Barcelona and are marketed as "Barcelona Reus" and "Barcelona Girona". Any booking must show the airport code BCN (Josep Tarradellas Barcelona El Prat), not GRO or REU.

### Barcelona to other UK airports, direct, Sunday 11 October 2026 (Kiwi)

| Destination | Departures (BCN local) |
|---|---|
| Manchester | 07:30 Vueling VY8746 (Iberia codeshare IB5664); 11:05 easyJet U22002; 12:30 Jet2 LS804; 17:35 Ryanair UK RK5270; 18:40 Vueling VY8748 (IB5666); 22:05 easyJet U22036; 23:20 Ryanair FR7543 (arrives 00:55 Monday) |
| Bristol | 13:00 easyJet U27191; 13:40 Ryanair FR3160; 22:45 easyJet U22706 (arrives 00:05 Monday) |
| Edinburgh | 09:00 Ryanair FR6267; 16:10 easyJet U27115; 18:30 Vueling VY7846 (IB5963) |
| Birmingham | 08:00 Vueling VY8754 (IB5272); 11:20 Jet2 LS1338; 19:30 Ryanair FR6822 |

What this means for the workshop: for London and Manchester there is a genuine choice of departures between 16:20 and 22:05, so the founders can protect most of Sunday if they book deliberately. For Bristol and Birmingham the choice on Sunday is either early afternoon (which would end the workshop before lunch) or late evening (22:45 Bristol, or a 19:30 Birmingham). Edinburgh's last direct departure is 18:30.

### Friday 9 October 2026 arrivals into BCN (for the "light and optional" arrival evening) [SOURCED, Kiwi]

| From | Depart (UK local) | Arrive BCN (CEST) | Airline |
|---|---|---|---|
| Gatwick | 14:25 | 17:40 | Vueling VY7827 |
| Gatwick | 15:25 | 18:40 | Vueling VY7835 |
| Gatwick | 16:45 | 19:55 | easyJet U28061 |
| Gatwick | 17:45 | 20:55 | easyJet U28063 |
| Luton | 17:50 | 21:00 | easyJet U22325 |
| Stansted | 18:45 | 22:00 | Ryanair FR9014 |
| Luton | 19:40 | 22:50 | Ryanair FR7807 |
| Heathrow | 20:50 | 00:10 Sat | Vueling VY6653 |
| Gatwick | 20:55 | 00:10 Sat | Vueling VY7823 |
| Stansted | 21:25 | 00:40 Sat | Ryanair FR8216 |
| Manchester | 13:20 | 16:45 | Vueling VY8747 |
| Manchester | 17:10 | 20:30 | Ryanair FR7542 |
| Manchester | 17:40 | 21:05 | easyJet U22001 |
| Manchester | 20:55 | 00:25 Sat | Vueling VY8749 |

Implication: an arrival after about 21:00 CEST means reaching the accommodation around 22:15 or later (allowing EES entry checks and transfer, section 5). Only flights landing by roughly 19:00 leave room for a relaxed dinner and any shared preparation on Friday. If either founder lands after 21:00, Friday should be nothing more than check-in and sleep, and the programme should not schedule anything shared on Friday night.

---

## 3. Airport transfers between central Barcelona and BCN

Everything in this section is [UNVERIFIED] general knowledge of Barcelona transport, because aena.es, tmb.cat, aerobusbarcelona.es, renfe.com and taxi.amb.cat were all blocked. Figures are typical ranges from prior knowledge, not quotes. Confirm at: https://www.aena.es/en/josep-tarradellas-barcelona-el-prat.html (transport section), https://www.aerobusbarcelona.es/en, https://www.tmb.cat/en/barcelona/airport-transport, https://www.renfe.com/es/en/suburban/suburban-barcelona, https://taxi.amb.cat/en.

### Summary by mode (city centre to terminal, Sunday)

| Mode | Door-to-terminal time to allow | Typical cost per person | Serves | Sunday caveats |
|---|---|---|---|---|
| Taxi (black and yellow, metered) | 25 to 40 min driving from Eixample, Gràcia or Ciutat Vella; 30 to 45 min from Poblenou. Allow 45 min plus 15 min contingency. | Roughly EUR 30 to 45 to either terminal, including the airport supplement; a minimum airport fare applies [UNVERIFIED, confirm current AMB tariff]. Two people share one fare. | T1 and T2 directly, kerbside | Weekend and holiday tariff applies (slightly higher per km). Hail on the street, use a rank, or book with the Free Now or Cabify apps. Rain or a road incident can add 15 to 20 min. |
| Aerobus (A1 to T1, A2 to T2) | About 35 min from Plaça de Catalunya to the terminal, plus getting to the stop; allow 60 min door to terminal. | Around EUR 7 to 8 single [UNVERIFIED, 2024 to 2025 price known to me was EUR 7.25] | Stops at Plaça de Catalunya, Plaça d'Universitat, Gran Via and Urgell, Plaça d'Espanya | Runs every day including Sundays, roughly every 5 to 10 min from early morning to after midnight. Check which line (A1 = T1, A2 = T2) before boarding. Luggage racks on board. |
| Metro L9 Sud | About 32 min from Zona Universitària to T1 (T2 one stop earlier). From Eixample or Gràcia add an L3 or L5 ride plus a change: allow 60 to 75 min door to terminal. | Airport-specific ticket, about EUR 5 to 6 [UNVERIFIED]; the ordinary T-casual ticket is not valid at the airport stations; the Hola Barcelona travel card is. | Aeroport T1 and Aeroport T2 stations | Sunday frequency is lower than weekday (roughly every 8 to 12 min [UNVERIFIED]). Metro runs on Sundays from about 05:00 to midnight. Steps and long walkways with bags. |
| Renfe Rodalies R2 Nord | About 19 min to Sants, 26 min to Passeig de Gràcia, 32 min to Clot from the airport station; allow 60 min door to terminal for T2 and 75 to 80 min for T1 (free shuttle bus needed). | Integrated single ticket, typically under EUR 5 [UNVERIFIED] | Aeroport station beside T2 only | Every 30 min on Sundays [UNVERIFIED]. Rodalies has had reliability problems in recent years; check the day's status. Not the right choice for a tight cutoff to T1. |
| Private transfer or ride app (Cabify, Uber via licensed VTC) | Same as taxi | Fixed quote, often similar to taxi or slightly higher [NEEDS SOURCE] | T1 and T2 | Pre-booking removes the "no taxi at the rank" risk on a wet Sunday evening. |

### By district (to the terminal, Sunday, no incidents)

| Staying in | Taxi driving time | Best public option | Notes |
|---|---|---|---|
| Eixample (Dreta or Esquerra) | 25 to 35 min | Aerobus from Plaça de Catalunya or Plaça d'Universitat; or R2 Nord from Passeig de Gràcia (T2 only) | Easiest district for every mode. |
| Gràcia | 30 to 40 min | Metro L3 to Zona Universitària then L9 Sud, or taxi | Narrow streets; walk to Diagonal or Fontana for a taxi rank. |
| Ciutat Vella (Gòtic, Born, Raval) | 25 to 35 min | Aerobus from Plaça de Catalunya; R2 Nord from Passeig de Gràcia | Taxis cannot enter many pedestrian streets; walk to Via Laietana or the Rambla to hail. |
| Poblenou | 30 to 45 min | R2 Nord from Clot (T2 only), or taxi | Furthest of the four from the airport; add 10 min to every estimate. |

All rows are [UNVERIFIED] typical ranges. The cutoff rule in section 11 uses a taxi with a 60-minute door-to-terminal allowance (45 min driving plus 15 min contingency), which is the most conservative realistic assumption for Eixample, Gràcia and Ciutat Vella and about right for Poblenou.

---

## 4. Which terminal, and the T1/T2 problem

Terminal allocations at BCN are [UNVERIFIED] general knowledge (aena.es and every airline site was blocked). The airline's booking confirmation and the Aena departures board are authoritative; confirm at https://www.aena.es/en/josep-tarradellas-barcelona-el-prat/airlines.html or on the boarding pass.

| Airline | Terminal at BCN (to confirm) |
|---|---|
| Vueling | T1 |
| British Airways | T1 |
| Iberia (codeshares on Vueling and BA flights above) | T1 |
| easyJet | T2 |
| Ryanair and Ryanair UK | T2 |
| Jet2 | T2 |
| Wizz Air UK | T2 [less certain, confirm] |

Why it matters: T1 and T2 are separate buildings about 4 km apart by road. They are linked by a free airport shuttle bus (roughly every 6 to 10 minutes, 10 to 15 minutes journey [UNVERIFIED]) and by one stop on metro L9 Sud (airport ticket required). If the two founders fly with different airlines from different terminals, they can share a taxi to the first terminal and one continues, or ask the driver to drop at each terminal in turn (adds about 10 minutes). If the founders fly from different terminals with different departure times, the earlier flight sets the shared cutoff unless they deliberately split at the venue.

The Renfe R2 Nord station is beside T2. Anyone flying from T1 by train must add the shuttle bus, which is why the train is not recommended for a T1 departure on a tight cutoff.

---

## 5. How early to be at the airport, and the EU Entry/Exit System (EES)

### Airline guidance [UNVERIFIED, from prior knowledge; the airline sites were blocked]

Confirm on the airline's own page before travel: Vueling https://www.vueling.com/en, easyJet https://www.easyjet.com/en/help, Ryanair https://www.ryanair.com/gb/en/useful-info/help-centre, British Airways https://www.britishairways.com/en-gb/information, Jet2 https://www.jet2.com/en/help.

| Airline | Typical guidance known to me (confirm) |
|---|---|
| easyJet | Bag drop opens 2 to 3 hours before and closes 40 minutes before departure; gate closes 30 minutes before; airline suggests arriving about 2 hours before. |
| Ryanair | Bag drop closes 40 minutes before departure; gate closes 30 minutes before; airline suggests at least 2 hours. Ryanair also requires non-EU/EEA passport holders (which includes UK citizens) to have their travel documents checked at the Ryanair visa and document check desk before security when departing from an EU airport; budget an extra queue. [UNVERIFIED, material if flying Ryanair] |
| Vueling | Check-in and bag drop desks close 45 minutes before departure at Barcelona; gate closes 15 minutes before; airline suggests 2 hours for international. |
| British Airways | Bag drop closes 45 minutes before departure for European flights (later at some airports); gate closes 20 minutes before; airline suggests 2 hours for short haul. |
| Jet2 | Check-in closes 40 minutes before departure; airline suggests at least 2 hours. |

Aena's own general advice for non-Schengen departures is commonly given as at least 2 hours, more at peak [UNVERIFIED]. For the Sunday of a Spanish long weekend, with EES exit checks (below) and a possible airline document check, this file uses **2 hours 30 minutes at the terminal before departure** as the default planning buffer. Two hours is the floor, and only if both founders have hand luggage only, have checked in online, and are not flying Ryanair.

### EES: what it is and how it affects UK passport holders at BCN [UNVERIFIED, primary EU and gov.uk pages blocked]

Known to me from EU and UK government communications up to my knowledge cutoff; confirm at https://travel-europe.europa.eu/ees_en and https://www.gov.uk/guidance/eu-entry-exit-system and the Spain entry requirements page at https://www.gov.uk/foreign-travel-advice/spain/entry-requirements:

- The EES is the EU's automated system that registers non-EU nationals (including UK citizens) each time they cross an external Schengen border. It replaces passport stamping. It records name, travel document, date and place of entry and exit, and biometrics (a facial image and fingerprints).
- It began operating on 12 October 2025 with a progressive rollout across Schengen border points over about six months, with full operation planned for 10 April 2026. On that basis it should be fully in force at Barcelona El Prat by the workshop dates. If anything about that timeline changed after my knowledge cutoff, the two pages above will say so.
- First crossing after the launch: the traveller's biometrics are registered (fingerprints and facial image) at a kiosk or a manned booth. Later crossings: biometric verification only, which is quicker.
- Both entry (Friday 9 October, arrivals) and exit (Sunday 11 October, departures) are EES crossings for a UK passport holder. The UK government has consistently advised travellers to allow extra time at borders while the system beds in.
- Practical effect for the founders: on Friday, allow 30 to 60 minutes at BCN arrivals for passport control if either founder has not yet been registered on a previous trip since October 2025. On Sunday, the exit control in the non-Schengen departures area is the main queue risk; this is why the 2 hours 30 minutes buffer is recommended rather than 2 hours.
- ETIAS (the EU's travel authorisation for visa-exempt nationals, including UK citizens) was, as of my knowledge cutoff, expected to start in the last quarter of 2026 with a transitional grace period. If it has gone live by 10 October 2026, it would apply to the founders' entry on 9 October. [NEEDS SOURCE for the live status as of October 2026: check https://travel-europe.europa.eu/etias_en in the week before travel.]
- Passport validity for Spain (UK citizens, unchanged rules): the passport must have been issued less than 10 years before the entry date and be valid for at least 3 months after the planned departure date from the Schengen area [UNVERIFIED, standard gov.uk guidance]. Both founders should check their passports now, in September, not in October.

---

## 6. Checkout times and luggage on Sunday

### Checkout norms [UNVERIFIED, general practice; no primary page fetched]

- Barcelona hotels: checkout is usually 12:00, sometimes 11:00. Late checkout is often available on request for a fee or free if the room is not needed; it is much easier to arrange on a Sunday than on a weekday, but the long weekend (section 10) may mean the hotel is full.
- Apartments (Airbnb and similar): checkout is usually 10:00 or 11:00, set by the host, and hosts with a same-day changeover will not extend. Apartments rarely offer luggage storage after checkout.
- Hotels almost always hold luggage free of charge on the day of checkout and often the day before arrival. One central example [SOURCED]: the Tripadvisor listing for Hotel Jazz (Carrer de Pelai 3, Eixample, beside Plaça de Catalunya) describes "online check-in, 24-hour reception ... meeting rooms, business center, luggage room" and lists "Business Center with Internet Access" and "Conference facilities" among its amenities (https://www.tripadvisor.com/Hotel_Review-g187497-d296916-Reviews-Hotel_Jazz-Barcelona_Catalonia.html). This is an example of what a mid-range central hotel typically offers, not a recommendation to book it; the listing's policies block did not return check-in and check-out times, so those remain unverified.

### Luggage storage if the accommodation cannot hold bags [UNVERIFIED, sites blocked]

| Option | Where | Sunday | Indicative cost | Confirm at |
|---|---|---|---|---|
| Hotel luggage room | The hotel itself | Yes, usually 24-hour reception | Free on checkout day | Ask at booking |
| Locker Barcelona | Carrer d'Estruc 36, a few minutes from Plaça de Catalunya | Open daily including Sundays, roughly 08:30 to 22:00 | About EUR 5 to 12 per bag per day depending on size | https://www.lockerbarcelona.com |
| Bounce (network of shops and hotels that hold bags) | Many locations in Eixample, Gràcia, Ciutat Vella and Poblenou | Depends on each partner's Sunday hours; many are open, some close early | About EUR 5 to 8 per bag per day | https://usebounce.com/city/barcelona |
| Left luggage at Sants station | Inside Barcelona Sants railway station | Open daily, long hours | About EUR 6 to 10 per bag per day by size | Renfe or Sants station information |
| Left luggage at the airport | Aena service in T1 and T2 | Daily | Per bag per day | https://www.aena.es |

Recommendation: do not rely on third-party storage on the Sunday. The simplest arrangement is to keep the room or apartment until departure (section 8), and the second simplest is a hotel that holds bags. Bags in a locker across town cost 30 to 45 minutes of the Sunday afternoon to retrieve, which is exactly the time the cutoff rule is protecting.

---

## 7. Dinner in Barcelona: customs, realistic times, three quiet neighbourhoods

Customs [UNVERIFIED, well-established general knowledge; no primary page fetched]:

- Locals eat dinner late. Most restaurant kitchens open for dinner at 20:00 or 20:30 and are busiest from 21:00 to 22:30. Many kitchens close between 23:00 and 23:30, a little later on Fridays and Saturdays. Some places in tourist areas serve from 19:00, but they are the places to avoid for a quiet founder conversation.
- A 20:00 or 20:30 reservation on Saturday is realistic, gets the first sitting, and leaves the evening free. Book Saturday's table in advance: it is a Saturday on a long weekend and good small restaurants fill.
- Lunch is the main meal for many locals (13:30 to 15:30), and a fixed-price "menú del día" is common on weekdays but less so on weekends.
- Sunday and Monday closures: many independent restaurants close on Sunday evening and Monday; this does not affect the founders (they leave on Sunday afternoon or evening) but it does affect Friday if they arrive very late: after 23:00 on a Friday, options narrow to bars with a kitchen, pizza and late-night places. A founder landing after 21:00 should eat at the airport or on the plane and treat Friday dinner as optional.
- Tipping is modest (rounding up or a few euros); water is charged; bread may be charged as a cover.

Three practical neighbourhoods for a quiet, conversation-friendly dinner (no specific restaurants claimed; choose on the day or book from a current guide):

1. **Gràcia** (around Plaça de la Virreina, Plaça del Sol, Carrer de Verdi, Carrer de Torrijos). Village-like squares, small independent restaurants, mostly residents. Quiet side streets; the squares themselves can be lively on a Saturday, so choose a street rather than a square-side terrace if you want to hear each other. Ten to fifteen minutes from central Eixample by metro (L3 Fontana or L4 Joanic) or a short taxi.
2. **Sant Antoni** (Esquerra de l'Eixample, around Carrer del Parlament and the Sant Antoni market). Relaxed, local, walkable from most Eixample hotels, with a wide choice at moderate prices. Busy but not touristy.
3. **Poblenou** (Rambla del Poblenou and the streets either side). A converted industrial district with a calm, neighbourhood feel in the evening, good if the accommodation is on the east side of the city. Twenty minutes by metro L4 or a short taxi from Eixample.

Avoid for this purpose: the Rambla, the Barceloneta seafront, and the terrace restaurants on Passeig de Gràcia: loud, tourist-priced and poor for talking.

---

## 8. Where to work: coworking, cafés, hotel rooms, and the recommendation

What can be said with confidence [UNVERIFIED as to any specific operator; general pattern of the Barcelona market]:

- Coworking spaces in Barcelona typically operate Monday to Friday, roughly 08:00 or 09:00 to 19:00 or 20:00. Members with 24/7 access can use them at weekends; walk-in day passes are usually weekday only. Booking a meeting room by the hour for a Saturday and Sunday is possible in some spaces but must be confirmed in writing, because reception is often unstaffed at weekends and access depends on a code or a key. Confirm with individual spaces; the large operators (IWG/Regus and Spaces, and independents such as Aticco, Cloudworks or OneCoWork) publish meeting-room booking pages [NEEDS SOURCE for weekend availability and prices in October 2026].
- Cafés: laptop-friendly cafés exist in Eixample, Gràcia and Poblenou, but Saturday is their busiest day, tables are small, power points are scarce, and two people talking for six hours about product strategy is not a café activity. Treat cafés as a change of scene for 45 minutes at most, not as the workshop venue.
- Hotels: many three- and four-star hotels in Eixample have a small meeting room or a business centre that can be booked by the hour or half day; some will let two guests use it free if it is empty. The Hotel Jazz listing in section 6 is one sourced example of a central hotel advertising meeting rooms. Availability on a long-weekend Saturday is not guaranteed; ask when booking the rooms, not on arrival.

Recommendation, with reasoning:

**Book a serviced apartment or aparthotel with a proper dining table for four, reliable Wi-Fi, and a booking that runs through Sunday night (Friday to Monday), so the workspace is available until the travel cutoff.** If a Sunday-night booking is impossible, negotiate a written late checkout to at least the cutoff time before confirming. Reasons:

1. It removes the biggest single risk to Sunday: an 11:00 or 12:00 checkout in the middle of the last working session, followed by 30 minutes of packing and a move to a lobby.
2. Weekend coworking access is uncertain and cannot be checked from here; an apartment needs no third party to open a door on a Sunday.
3. It gives control of noise, hours, food (order in, keep working) and wall space for paper (the vibe-coding prototype session and the decision log benefit from a persistent wall).
4. The cost of one extra night is usually less than a weekend meeting room for two days plus luggage storage, and it also removes the "where do the bags go" problem.
5. It keeps Saturday evening flexible: a walk to dinner in Gràcia or Sant Antoni, then back to a quiet space, not a hotel bar.

Fallback if both founders prefer a hotel: choose one hotel with (a) a bookable meeting room or business centre for Sunday morning, (b) a luggage room, and (c) 24-hour reception, then request late checkout for one room to 16:00 as the Sunday workspace. Second fallback: hotel lobby or a booked meeting room by the hour near the hotel for the final Sunday block only.

Whichever option is chosen, the venue decision belongs on the master calendar with a deadline in September, because the long weekend (section 10) reduces availability.

---

## 9. Weather in Barcelona in the second week of October

Climate norms, not a forecast. [UNVERIFIED: AEMET's climate-normal page for Barcelona Airport (station 0076, 1991 to 2020 reference period) was blocked; figures below are recalled from those normals and should be confirmed at https://www.aemet.es/en/serviciosclimaticos/datosclimatologicos/valoresclimatologicos?l=0076&k=cat.]

- Daytime highs typically 21 to 24 °C; overnight lows typically 13 to 16 °C. Comfortable for walking; a light jacket for the evening.
- October is among the wettest months of the year in Barcelona, with roughly 80 to 90 mm on average and about six days with 1 mm or more. Autumn rain often arrives as short, intense downpours, sometimes during a "DANA" (cut-off low) episode that can flood roads and slow taxis and trains for hours.
- Sea temperature is still around 20 °C; not relevant to the workshop but explains why the city is busy.

Practical implications: pack a compact rain layer; do not plan an outdoor session that cannot move indoors; and treat heavy rain on Sunday afternoon as a reason to leave for the airport at the earliest time in the cutoff table, not the latest. Check a real forecast on Thursday 8 October.

---

## 10. Public holidays and events on 9 to 12 October 2026

Holidays [COMPUTED, `holidays` 0.104]:

- Monday 12 October 2026 is the Fiesta Nacional de España, a national public holiday that applies in Catalonia. It is the only public holiday in the window; 9, 10 and 11 October are ordinary days. Catalonia's own national day (11 September) and La Mercè (24 September, a Barcelona local holiday) fall before the trip.
- The Monday effect: because the holiday falls on a Monday, 10 to 12 October is a three-day long weekend for most of Spain. Effects to plan for:
  - Higher demand and prices for central accommodation on Friday and Saturday nights; book early (this is a September action).
  - Busier airport on Friday evening (arrivals) and a busy Sunday evening (people returning early), on top of normal weekend leisure traffic. This supports the 2 hours 30 minutes airport buffer.
  - Sunday 11 October runs on the normal Sunday timetable for metro, Aerobus and Rodalies. Monday 12 October runs on a holiday (Sunday-style) timetable, which only matters if a founder stays on.
  - Most shops, supermarkets and pharmacies are closed on Sunday in Barcelona outside tourist zones (general practice, [UNVERIFIED]). Buy anything needed for Sunday (snacks, stationery, batteries, a printer run) on Saturday.

City events [NEEDS SOURCE for 2026 dates; barcelona.cat, firabarcelona.com and the organisers' sites were all blocked]:

- The Barcelona International Boat Show (Salón Náutico) at Port Vell has in recent years run in the second week of October (for example 8 to 12 October in 2025). If it repeats on similar dates in 2026 it adds visitors near Barceloneta and the Port Vell area but does not affect Eixample, Gràcia or the airport.
- The Sitges Film Festival (in Sitges, 35 km south-west) usually runs from early to mid October and adds pressure on hotels in the region.
- FC Barcelona home fixtures affect traffic around the stadium area and the metro on match days. The October 2026 FIFA international window would normally suspend LaLiga around this weekend, but this must be checked once the fixture list is published, usually two to three weeks before.
- 12 October itself can bring small demonstrations or celebrations in central squares on the Monday, after the founders have left.

None of these is a reason to change the plan; the only items with a direct effect are accommodation demand and Sunday evening airport crowding.

---

## 11. Travel cutoff rule for Sunday 11 October 2026

### The rule

Working back from the departure time on the boarding pass (BCN local time, CEST):

- **At the terminal**: departure time minus 2 hours 30 minutes (section 5).
- **Leave the accommodation**: terminal time minus 60 minutes by taxi (45 minutes driving plus 15 minutes contingency), or minus 90 minutes by Aerobus, metro or train (sections 3 and 4).
- **End of workshop (last decision recorded, laptops closed)**: leave time minus 30 minutes for packing and bag collection.

So by taxi: **workshop ends 4 hours 00 minutes before departure**; by public transport: **4 hours 30 minutes before departure**. Add 15 minutes if flying Ryanair (document check) or if checking a bag with any airline (bag-drop closure is 40 to 45 minutes before departure and the queue on a Sunday evening is unpredictable).

### The table (taxi default; public-transport variant in the last column)

| Assumed departure (CEST) | At terminal by | Latest leave accommodation (taxi) | Latest end of workshop (taxi) | Latest end of workshop (Aerobus, metro or train) | Note |
|---|---|---|---|---|---|
| 17:00 | 14:30 | 13:30 | **13:00** | 12:30 | Sunday becomes a half day: one morning block and a working lunch, no afternoon session. Matches real flights such as easyJet 17:15 to Luton, BA 17:15 to London City, Ryanair UK 17:35 to Manchester, Vueling 16:20 to Gatwick. Only choose this if a late flight is impossible. |
| 18:30 | 16:00 | 15:00 | **14:30** | 14:00 | Sunday is a morning plus one short early-afternoon block, with lunch eaten at the venue. Matches Vueling and BA 18:35 to Heathrow, Vueling 18:20 to Gatwick, Vueling 18:40 to Manchester, Vueling 18:30 to Edinburgh. **Recommended default assumption until flights are booked.** |
| 20:00 | 17:30 | 16:30 | **16:00** | 15:30 | A genuine second working day (09:00 to 16:00 with lunch). Matches BA 19:30 to Heathrow, Ryanair 19:35 to Stansted, Vueling and BA 19:40 to Gatwick, Ryanair 19:30 to Birmingham, easyJet 20:25 to Gatwick, BA 20:40 to Heathrow. |
| 21:30 | 19:00 | 18:00 | **17:30** | 17:00 | Nearly a full day, with the final review after sunset (19:16) already at the airport. Matches BA 21:20 to Heathrow, Vueling and BA 21:20 to Gatwick, easyJet 21:40 to Gatwick, easyJet 22:00 to Luton, easyJet 22:05 to Manchester. UK arrival 22:35 to 23:40 BST; home after midnight for most of London, which costs Monday morning. |

Every departure time in the "Note" column is a real Sunday 11 October 2026 schedule from section 2 [SOURCED]; the founders should book from that list (or the airline's site) rather than assume a time.

### Recommended default provisional plan

**Plan Sunday against the 18:30 row until a flight is booked: workshop ends 14:30, leave the accommodation by 15:00, at the terminal by 16:00.** Reasons:

1. It is the middle of the realistic Sunday evening range for both London and Manchester and matches several real flights, so it is not an invented time.
2. It fails safe. If the founders later book a 20:00 or 21:30 departure, the Sunday agenda gains 90 minutes to 3 hours, which can be given back to prototype fixing and the final review. If the plan were built on 21:30 and a founder ends up on an 18:30 flight, the final review would have to be cut in a hurry, which the brief forbids.
3. A 14:30 end still allows a full morning block, a working lunch and one short afternoon block, which is enough for the final review and decision log if the design puts everything important before Sunday lunch.

Strong recommendation for the booking itself: **book a departure at 20:00 or later for both founders (for London: BA 20:40 or 21:20 to Heathrow, easyJet 20:25 or 21:40 to Gatwick, Vueling 21:20 to Gatwick; for Manchester: easyJet 22:05).** That converts Sunday into a real working day (end 16:00 to 17:30) for a modest cost in Sunday-night sleep. If the founders fly from different terminals or at different times, **the earlier departure sets the shared cutoff**, unless they agree in advance that one founder leaves first and the other closes the record alone.

### What the founders must confirm (September actions)

1. Each founder's flight: airline, flight number, departure time, destination airport, and airport code BCN (not GRO or REU). Owner: each founder. Due: by Friday 25 September so the Sunday agenda can be locked.
2. Terminal for each flight (T1 or T2), from the booking or Aena's airline list. Owner: each founder.
3. Whether either founder is checking a bag (bag drop closes 40 to 45 minutes before departure) and whether either is flying Ryanair (document check desk). Owner: each founder.
4. Accommodation checkout time and whether the room or apartment can be kept until the cutoff (Sunday-night booking or written late checkout); whether bags can be held if not. Owner: whoever books. Due: with the accommodation booking.
5. Work venue for Sunday until the cutoff (apartment table, hotel meeting room, or booked room). Owner: whoever books. Due: with the accommodation booking.
6. Passport validity (issued under 10 years ago, valid 3 months beyond 11 October) and EES status (has each founder already been registered since 12 October 2025?). Owner: each founder. Due: now.
7. Whether ETIAS has gone live by October 2026 and, if so, that both have applied. Owner: each founder. Due: week of 28 September, re-check 5 October.
8. Friday arrival times, to decide whether Friday evening has any shared content at all. Owner: each founder. Due: with the flight booking.
9. Taxi or pre-booked transfer for Sunday (book by app on Saturday evening; confirm the pick-up point if the street is pedestrianised). Owner: Blake. Due: Saturday 10 October, 21:00.
10. Real weather forecast and Rodalies or metro service notices. Owner: Tory. Due: Thursday 8 October and again Sunday 11 October, 08:30.

---

## 12. Friday 9 October arrival evening, in one paragraph

Whoever lands first should check in, confirm the Sunday transfer plan and the venue set-up (table, power, Wi-Fi, paper on the wall), and message the other. If both are in by 20:30, a 21:00 dinner near the accommodation is realistic and fits local hours; if either lands after 21:00, dinner is optional and separate, and nothing shared is scheduled. No preparation is scheduled for Friday night: the brief says essential preparation is completed beforehand, and EES arrival queues plus a taxi make a late arrival later than the flight time suggests.

---

## 13. Sources and evidence status

Sourced in this session:

- Kiwi.com flight search connector, queried 16 September 2026: BCN to London, Manchester, Bristol, Edinburgh and Birmingham for 11 October 2026 (direct only), and London and Manchester to BCN for 9 October 2026. Booking links were returned per itinerary (for example https://kiwi.com/u/vds7nw for Vueling VY6652 BCN to LHR 18:35) but are session links, not stable references; use the airline sites to book.
- lastminute.com flight search connector, queried 16 September 2026: BCN to London (all London airports) on 11 October 2026, direct, departures after 15:00, 30 results, including British Airways, Iberia, Vueling, easyJet, Ryanair and Wizz Air UK schedules and the Girona and Reus results noted in section 2.
- Tripadvisor hotel details connector: Hotel Jazz, Barcelona, listing description and amenities, https://www.tripadvisor.com/Hotel_Review-g187497-d296916-Reviews-Hotel_Jazz-Barcelona_Catalonia.html (policies block returned empty, so no check-in or check-out times).
- Python `astral` 3.2 (https://pypi.org/project/astral/) for sunrise, sunset and civil dusk in Barcelona on 9 to 12 October 2026.
- Python `holidays` 0.104 (https://pypi.org/project/holidays/) for the 2026 Spanish national and Catalan holiday calendar and UK (England) October 2026.
- IANA time zone database via Python `zoneinfo` for CEST and BST offsets during the trip and the 25 October 2026 clock change.

Blocked in this session (try these yourselves; each is the right primary page):

- Airport and transport: https://www.aena.es/en/josep-tarradellas-barcelona-el-prat.html, https://www.aerobusbarcelona.es/en, https://www.tmb.cat/en/barcelona/airport-transport, https://www.renfe.com/es/en/suburban/suburban-barcelona, https://taxi.amb.cat/en
- Airlines: https://www.vueling.com/en, https://www.britishairways.com/en-gb/information, https://www.easyjet.com/en/help, https://www.ryanair.com/gb/en/useful-info/help-centre, https://www.jet2.com/en/help
- Borders: https://travel-europe.europa.eu/ees_en, https://travel-europe.europa.eu/etias_en, https://www.gov.uk/guidance/eu-entry-exit-system, https://www.gov.uk/foreign-travel-advice/spain/entry-requirements
- Luggage: https://www.lockerbarcelona.com, https://usebounce.com/city/barcelona
- Weather: https://www.aemet.es/en/serviciosclimaticos/datosclimatologicos/valoresclimatologicos?l=0076&k=cat
- Holidays and events: https://web.gencat.cat (labour calendar 2026), https://www.boe.es, https://www.barcelona.cat/en, https://www.firabarcelona.com/en/calendar/
- Sun times cross-check: https://www.timeanddate.com/sun/spain/barcelona?month=10&year=2026

Nothing in this file about Duel, Sway's customers, market size or pricing is asserted; this file is logistics only.
