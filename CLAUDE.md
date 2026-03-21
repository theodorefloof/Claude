# Claude Code Environment - Duel Product Team

## Owner
Blake Moseley, VP of Product at Duel (duel.tech) - Brand Advocacy Platform

## Key Slack Channel: #productpeople
- Channel ID: C086GFBU49W
- Product team's primary channel for daily standups, discussions, decisions, and updates

---

## Response Delivery (CRITICAL - READ FIRST)
ALWAYS send your responses to Slack using slack_send_message with channel_id C086GFBU49W.
If you were mentioned in a thread, reply in that thread using thread_ts.
NEVER just display output in the Claude Code interface - it MUST be posted to Slack so the team can see it.

---

## How to Fetch Messages (CRITICAL)
You MUST use ALL of these steps to capture the full picture:

### Step 1: Read channel messages
Use slack_read_channel with channel_id C086GFBU49W. Set oldest to Monday Unix timestamp and latest to now. Paginate with cursor until all messages are retrieved.

### Step 2: Read ALL thread replies
For EVERY message with replies, use slack_read_thread. Threads contain the majority of standup responses and discussions.

### Step 3: Search for extras
Use slack_search_public_and_private with in:#productpeople after:YYYY-MM-DD to catch anything missed.

### Step 4: Read canvases
If messages reference Slack canvases or workflow posts (standup trackers), use slack_read_canvas.

### Important
- The channel uses Slack workflows for standups (Mon, Wed, Fri Stand-Up Trackers) - these create threaded conversations with most daily updates.
- ALWAYS read thread replies. They contain the real substance.
- Paginate through ALL results.

---

## Weekly Summary Output Format (Slack-Optimised)

When posting a summary to Slack, use this EXACT format with Slack mrkdwn formatting.
Do NOT use markdown headings (##) - use Slack emoji + bold for section headers.
Keep it scannable, visual, and impactful.

### Template:

:clipboard: *#productpeople Weekly Summary*
:calendar: _Week of [Monday date] - [Friday date]_

---

:zap: *TL;DR - Week at a Glance*
[2-3 sentence executive summary. Be specific, impactful, and concise.]

---

:white_check_mark: *Decisions Made*
- [Decision] - _agreed by [who]_ ([day])

:rocket: *Shipped and Progress*
- [What was done] - _[who]_ ([day])

:warning: *Blockers and Risks*
- :red_circle: [Blocker] - _[who]_ - [impact]
- :large_orange_circle: [Risk] - _[who]_ - [potential impact]

:memo: *Action Items and Commitments*
- :arrow_right: [Action] - _Owner: [who]_ - Due: [when if stated]

:speech_balloon: *Notable Discussions*
- *[Topic]* - [brief summary, who was involved, any conclusion]

---

:crystal_ball: *AI Insights and Recommended Next Actions*

Based on this week's activity, here is what I would recommend focusing on:

1. *[Insight]* - [Why this matters and what to do about it]
2. *[Insight]* - [Why this matters and what to do about it]
3. *[Insight]* - [Why this matters and what to do about it]

:bulb: *Patterns I noticed:*
- [Observation about team velocity, recurring blockers, or momentum shifts]
- [Observation about topics gaining traction or losing attention]

---

:bar_chart: *Activity Snapshot*
- Messages: [count] | Threads: [count] | Active contributors: [count]
- Most active day: [day]
- Busiest thread: [topic]

### AI Insights Guidelines
The AI Insights section should:
- Identify items that need follow-up but have not been actioned
- Flag discussions that seem unresolved or need a decision
- Spot patterns (e.g. same blocker mentioned multiple weeks)
- Suggest specific next steps with clear rationale
- Highlight wins the team should celebrate
- Note if key people have not contributed (may indicate overload or absence)

---

## On-Demand Summary
Same format as weekly summary. Default to current week (Monday to today) unless told otherwise.

## Active Participation
When asked to engage in the channel:
- Read recent messages and threads
- Respond helpfully to questions
- Be professional, constructive, and concise

## Date Handling
- This week = most recent Monday through today
- Last week = previous Monday through previous Sunday
- Today = today only
- Always calculate dates dynamically
