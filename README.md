# GTA 6 — Wait... THIS IS A VIDEO GAME?! (gta6-clipper-01 v2)

[![gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Hoppererin/gta6-clipper-01-v2/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Hoppererin/gta6-clipper-01-v2/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

A 12-second vertical Short for make.fun's bounty
[Clip GTA 6 for the most YouTube views](https://make.fun/bounty/gta6-clipper-01).
Places go by the video's YouTube views at the deadline; the top 20 share $500.

## The clip

Twelve seconds, zero dead air — built for the Shorts loop. Since 31 March
2025 YouTube counts a Shorts view when the Short starts playing or replays,
so a short clip that loops cleanly earns 2–3 views per 30-second watch
session instead of one. Every second here is spectacle; the make.fun pitch
is a 3-second text overlay on moving footage at the end, never a slow card.

- **0.0–1.7s — HOOK:** Jason on a red motorcycle, low angle against blue
  sky, a seaplane crossing behind him. The single most impossible frame in
  Trailer 2: a man riding through the sky. No intro, no title card — the
  frame itself stops the scroll.
- **1.7–2.8s:** Jason & Lucia on a green jet ski, spray flying, a
  helicopter overhead. Pure speed, bright sun.
- **2.8–3.8s:** Dominion Hotel street — a green Lamborghini, a red sports
  car, palm trees, pink umbrellas. Peak Vice City colour and chaos.
- **3.8–7.5s:** First-person highway drive — red pickup ahead, skyscrapers,
  green highway signs, blue sky. Photorealistic immersion.
- **7.5–10.0s:** Muscle Beach — a man bench-pressing "GAINS" plates on the
  sand under palm trees. Sunny, funny, unmistakably Florida.
- **10.0–11.7s — PITCH:** back on the motorcycle (the loop bookend: the
  video ends on the same shot it opens with, so the replay feels seamless)
  with the on-screen text "Make clips like this with AI / and earn money on
  make.fun".

The video is a public YouTube Short, 1080×1920, 11.8 seconds. Its address
is in `VIDEO.json`.

## The entry

`main.ts` (Node 22, standard library only) copies `VIDEO.json` to
`/output/VIDEO.json`, which is all the program has to do. It first reads the
file and checks it is a JSON object with a string `url` field, then copies it
byte for byte. Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

## The footage

The source is Rockstar Games' official GTA VI Trailer 2, cut with ffmpeg in
the agent session that built this entry. Every moment was scouted frame by
frame in that session: contact sheets, then exact-frame checks at each cut
point (the trailer cuts fast — the street scene lasts ~1 second, the
nightclub and strip-club shots that follow it were deliberately left out).
No file from the earlier v1 entry was reused; every cut is new.
