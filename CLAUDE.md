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

**Exception:** content sourced from Fireflies is not covered by this rule. See the
Fireflies Integration section at the end of this file before sharing any of it.

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

---

# Fireflies Integration

Fireflies is connected as a remote MCP server at `https://api.fireflies.ai/mcp`.
Authenticated as **blake@duel.tech** (workspace admin). No local API key or client
code is needed — call the `fireflies_*` tools directly.

## Privacy Guardrail (CRITICAL — overrides Response Delivery)

The "always post to Slack" rule at the top of this file **does not apply to Fireflies
content**. Blake's Fireflies workspace contains 1:1s, HR conversations, exit and
settlement discussions, and personal calls alongside normal product meetings. Admin
access means transcripts of meetings other people organised are also readable.

Therefore:
- **Never** post transcript text, summaries, action items, or attendee lists to
  `#productpeople` (or any Slack channel) unless Blake explicitly names that meeting
  and asks for it to be shared.
- **Never** commit transcript content, summaries, or meeting IDs tied to sensitive
  topics into this repository or any file that gets pushed.
- Return Fireflies-derived output in the Claude Code interface by default. Ask before
  it goes anywhere else.
- When a request is broad ("summarise my week"), scope the query rather than dumping
  everything: filter by participants, channel, or meeting title.

## Tools

| Tool | Use it for |
| --- | --- |
| `fireflies_get_user` | Confirm auth, get the current user ID and most recent transcript ID |
| `fireflies_get_transcripts` | List meetings by date range, keyword, organiser, participant, channel |
| `fireflies_search` | Same data, richer query grammar (see below) — prefer this for anything non-trivial |
| `fireflies_get_transcript` | Full sentence-level transcript with speakers and timestamps for one meeting |
| `fireflies_get_summary` | Overview, keywords, action items, chapters for one meeting (no transcript body) |
| `fireflies_get_soundbites` | Shareable clips; needs one of `mine`, `transcript_id`, `my_team` |
| `fireflies_list_channels` | Channel/folder IDs for scoping queries |
| `fireflies_get_analytics`, `fireflies_get_user_contacts`, `fireflies_get_usergroups` | Workspace-level metadata |
| `fireflies_share_meeting`, `fireflies_revoke_meeting_access`, `fireflies_update_meeting_privacy`, `fireflies_move_meeting`, `fireflies_update_meeting_title`, `fireflies_create_soundbite` | **Write operations — always confirm with Blake first** |

## Search Grammar (`fireflies_search`)

Compose filters in a single query string:

```
keyword:"comms hub" scope:sentences from:2026-08-01 to:2026-09-08 limit:20
participants:neil@duel.tech,harriet.mullis@duel.tech from:2026-08-01
channel:69680125d1469377d4b619b3 limit:20
```

- `scope`: `title` | `sentences` | `all` (default `all`)
- `limit` maxes out at 50; paginate with `skip:N`
- Dates are ISO `YYYY-MM-DD`

## Gotchas (verified, not assumed)

- **`mine:true` is a hard filter on organiser, not attendance.** It returns only
  meetings Blake organised, so it silently hides team meetings he attended. For
  "what happened this week", omit `mine` or filter by `participants:blake@duel.tech`.
- **`format` defaults to `toon`** (token-efficient but awkward to read). Pass
  `format:"text"` when you intend to read or quote the output, `json` when parsing.
- **`fireflies_get_transcripts` does not accept a transcript ID.** To go deep on a
  specific meeting, call `fireflies_get_transcript` or `fireflies_get_summary` by ID.
- **Summaries can be missing.** Check `Summary Status` — `skipped` or `processing`
  means there is no summary yet; fall back to the raw transcript.
- **`Duration: No duration`** appears on plenty of processed meetings. Do not treat a
  missing duration as a failed recording.
- Action item timestamps occasionally render as `04:30:00` rather than `04:30`.
  Treat them as approximate anchors, not exact offsets.

## Deep Links

Every meeting ID maps to `https://app.fireflies.ai/view/{id}`. Append `?t={seconds}`
to jump to a moment — convert a sentence timestamp like `07:21` to `441`. Prefer
linking over pasting transcript text; it keeps access control with Fireflies.

## Recipes

**Catch up on a week of product meetings**
1. `fireflies_search` with `participants:blake@duel.tech from:<Monday> to:<today> limit:50 format:"text"`
2. For anything relevant, `fireflies_get_summary` by ID — it is far cheaper than the full transcript
3. Present in the interface; only push to Slack on explicit instruction

**Cross-check a Slack standup claim against what was actually said**
1. `fireflies_search` with `keyword:"<feature>" scope:sentences from:<date>`
2. `fireflies_get_transcript` on the hit, then deep-link the moment

**Pull action items for one meeting**
`fireflies_get_summary` — action items come back grouped by owner with timestamps.
