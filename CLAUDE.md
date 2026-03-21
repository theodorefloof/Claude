# Claude Code Environment - Duel Product Team

## Owner
Blake Moseley, VP of Product at Duel (duel.tech) - Brand Advocacy Platform

## Key Slack Channel: #productpeople
- Channel ID: C086GFBU49W
- This is the product team's primary channel for daily standups, discussions, decisions, and updates

## Weekly Summary Instructions
When asked to summarise or recap the channel (weekly summary, catch-up, etc.):
1. ALWAYS use date filters to scope to the CURRENT week only (Monday to today)
2. Use `after:YYYY-MM-DD` Slack search syntax with the most recent Monday's date
3. NEVER pull messages older than 7 days unless explicitly asked
4. Structure the summary as:
   - **Key Decisions** - decisions made or agreed upon
      - **Updates & Progress** - status updates, shipped features, completed work
         - **Blockers & Risks** - anything flagged as blocked or at risk
            - **Action Items** - tasks assigned or commitments made
               - **Notable Discussions** - important threads worth highlighting
               5. Keep it concise and scannable - use bullet points
               6. Attribute updates to the person who posted them

               ## On-Demand Summary
               Same format as weekly summary. When asked for a summary without a time range, default to the current week (Monday to today).

               ## Active Participation
               When asked to engage or participate in the channel:
               - Read recent messages and threads
               - Respond helpfully to questions
               - Offer suggestions when relevant
               - Always be professional and constructive

               ## Date Handling
               - "This week" = most recent Monday through today
               - "Last week" = previous Monday through previous Sunday
               - "Today" = today only
               - Always calculate dates dynamically, never use hardcoded dates


## How to Fetch Messages (CRITICAL)
When reading #productpeople, you MUST use multiple approaches to capture all activity:

### Step 1: Read channel messages directly
Use `slack_read_channel` with channel_id `C086GFBU49W` and set `oldest` to the Monday timestamp and `latest` to now. Request up to 100 messages. If there is a `cursor` in the response, paginate to get ALL messages.

### Step 2: Read ALL thread replies
For EVERY message that has thread replies (indicated by reply_count > 0 or thread_ts), use `slack_read_thread` to fetch the full thread conversation. Threads contain the majority of discussions.

### Step 3: Search for additional messages
Use `slack_search_public_and_private` with query `in:#productpeople after:YYYY-MM-DD` (using Monday's date) to catch any messages that might have been missed, including messages in threads.

### Step 4: Read any linked canvases
If any messages reference Slack canvases or workflow posts (like standup trackers), use `slack_read_canvas` to read their content.

### Important Notes
- The channel uses Slack workflows for standups (Mon, Wed, Fri Stand-Up Trackers). These create threaded conversations that contain most of the team's daily updates.
- - ALWAYS read thread replies — they contain the substantive discussions.
  - - Paginate through ALL results. Do not stop after the first page.
    - - If the channel appears quiet, it likely means activity is happening in threads or workflows — dig deeper.
