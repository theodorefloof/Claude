# Claude Code Environment

## Owner
Blake Moseley (blake.m.moseley@gmail.com)

---

## Duel: disconnected

Blake no longer works at Duel (duel.tech). Nothing in this environment should
connect to Duel, act on Duel's behalf, or represent Blake as working there.

Concretely:
- **Do not post to Duel Slack.** The `#productpeople` channel (`C086GFBU49W`) and
  any other Duel workspace channel are out of scope. If a Slack token still has
  access, that is not permission to use it.
- **Do not read, summarise, or act on Duel data**: Slack, Linear, Notion, Craft.io,
  Intercom, or anything else scoped to a duel.tech workspace.
- **Do not describe Blake as VP of Product at Duel** in any document, email, deck,
  profile, or commit.
- If a request would require Duel access, say so and stop rather than working
  around it.

This applies even where credentials still happen to work. Access that was not
revoked is not access that is still authorised.

### Still to clean up (outside this repository)

These are synced from the claude.ai account and cannot be removed from here.
Remove or disable them in claude.ai skill settings:

`duel-brand-studio`, `duel-deck`, `duel-employee`, `duel-report`,
`chief-product-strategist`, `programme-ops-expert`, `vp-briefing`,
`roadmap-reconciler`, `monday-update`

The last four also carry live connector instructions pointing at Duel's Linear,
Notion, Craft.io and Slack. `internal-comms` and `morning` are generic, but both
were written around the Duel routine and are worth a read before reuse.

---

# Fireflies Integration

Fireflies is connected as a remote MCP server at `https://api.fireflies.ai/mcp`.
No local API key or client code is needed. Call the `fireflies_*` tools directly.

**Intended account owner: blake.m.moseley@gmail.com.**

### The connection is still a Duel identity

`fireflies_get_user` currently resolves to `blake@duel.tech` with workspace admin
rights. That is a Duel account, so under the rule above it should not be used for
ongoing work until it is separated:

1. Change the account email in Fireflies itself. No MCP tool exposes it.
2. Reauthorise the MCP connector so the token follows the new identity.
3. Confirm with `fireflies_get_user` that the address and admin flag are what
   Blake expects on a personal account.

Until that is done, treat the connection as read-only for Blake's own meetings and
raise it rather than working around it. Admin rights over a former employer's
workspace, including transcripts of meetings other people organised, are the part
to be most careful about: having the access is not the same as being entitled to
use it.

## Privacy Guardrail

Fireflies output stays in the Claude Code interface by default.

- **Never** post transcript text, summaries, action items, or attendee lists to any
  Slack channel or external service unless Blake explicitly names that meeting and
  asks for it to be shared.
- **Never** commit transcript content, summaries, or meeting IDs into this
  repository or any file that gets pushed.
- The workspace mixes 1:1s, HR conversations, exit discussions and personal calls in
  with ordinary meetings. Broad requests like "summarise my week" should be scoped
  by participant, channel or title rather than dumped wholesale.

## Tools

| Tool | Use it for |
| --- | --- |
| `fireflies_get_user` | Confirm auth, get the current user ID and most recent transcript ID |
| `fireflies_get_transcripts` | List meetings by date range, keyword, organiser, participant, channel |
| `fireflies_search` | Same data, richer query grammar (see below). Prefer this for anything non-trivial |
| `fireflies_get_transcript` | Full sentence-level transcript with speakers and timestamps for one meeting |
| `fireflies_get_summary` | Overview, keywords, action items, chapters for one meeting (no transcript body) |
| `fireflies_get_soundbites` | Shareable clips; needs one of `mine`, `transcript_id`, `my_team` |
| `fireflies_list_channels` | Channel/folder IDs for scoping queries |
| `fireflies_get_analytics`, `fireflies_get_user_contacts`, `fireflies_get_usergroups` | Workspace-level metadata |
| `fireflies_share_meeting`, `fireflies_revoke_meeting_access`, `fireflies_update_meeting_privacy`, `fireflies_move_meeting`, `fireflies_update_meeting_title`, `fireflies_create_soundbite` | **Write operations: always confirm with Blake first** |

## Search Grammar (`fireflies_search`)

Compose filters in a single query string:

```
keyword:"onboarding" scope:sentences from:2026-09-01 to:2026-09-08 limit:20
participants:blake.m.moseley@gmail.com from:2026-09-01
channel:CHANNEL_ID limit:20
```

- `scope`: `title` | `sentences` | `all` (default `all`)
- `limit` maxes out at 50; paginate with `skip:N`
- Dates are ISO `YYYY-MM-DD`

## Gotchas (verified, not assumed)

- **`mine:true` is a hard filter on organiser, not attendance.** It returns only
  meetings Blake organised, so it silently hides meetings he attended. For "what
  happened this week", omit `mine` or filter by participant email.
- **`format` defaults to `toon`** (token-efficient but awkward to read). Pass
  `format:"text"` when you intend to read or quote the output, `json` when parsing.
- **`fireflies_get_transcripts` does not accept a transcript ID.** To go deep on a
  specific meeting, call `fireflies_get_transcript` or `fireflies_get_summary` by ID.
- **Summaries can be missing.** Check `Summary Status`. A value of `skipped` or
  `processing` means there is no summary yet; fall back to the raw transcript.
- **`Duration: No duration`** appears on plenty of processed meetings. Do not treat
  a missing duration as a failed recording.
- Action item timestamps occasionally render as `04:30:00` rather than `04:30`.
  Treat them as approximate anchors, not exact offsets.
- Historical meetings are recorded against whichever address attended at the time.
  Changing the account email does not rewrite past attendee records, so a query
  filtered on the new address alone will not match older meetings.

## Deep Links

Every meeting ID maps to `https://app.fireflies.ai/view/{id}`. Append `?t={seconds}`
to jump to a moment, converting a sentence timestamp like `07:21` to `441`. Prefer
linking over pasting transcript text; it keeps access control with Fireflies.

## Recipes

**Catch up on a week of meetings**
1. `fireflies_search` with `participants:blake.m.moseley@gmail.com from:<Monday> to:<today> limit:50 format:"text"`
2. For anything relevant, `fireflies_get_summary` by ID, which is far cheaper than
   the full transcript
3. Present in the interface. Do not push anywhere else without being asked

**Pull action items for one meeting**
`fireflies_get_summary`. Action items come back grouped by owner with timestamps.

---

## Date Handling
- This week = most recent Monday through today
- Last week = previous Monday through previous Sunday
- Today = today only
- Always calculate dates dynamically

---

## Slack Summary Format (unbound)

Retained as a reusable template only. It is **not** bound to a channel and must not
be run against any Duel workspace. Use it only when Blake names a channel in a
workspace he currently belongs to.

:clipboard: *Weekly Summary*
:calendar: _Week of [Monday date] - [Friday date]_

:zap: *TL;DR - Week at a Glance*
[2-3 sentence executive summary. Specific, impactful, concise.]

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

:crystal_ball: *Insights and Recommended Next Actions*
1. *[Insight]* - [Why this matters and what to do about it]

:bulb: *Patterns I noticed:*
- [Observation about velocity, recurring blockers, or momentum shifts]

:bar_chart: *Activity Snapshot*
- Messages: [count] | Threads: [count] | Active contributors: [count]

Use Slack mrkdwn, not markdown headings. When reading a channel, paginate fully and
read every thread; threads carry most of the substance.
