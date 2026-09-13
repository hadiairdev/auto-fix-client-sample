# auto-fix sandbox

A deliberately small app with a deliberately small bug, for exercising Airdev's auto-fix loop
end to end.

**Public on purpose.** GitHub Actions minutes are unlimited on public repositories, so running
this costs nothing but the model call.

## The bug

`resetPasswordUrl()` in `src/links.js` builds `/reset`. The site serves `/forgot-password`. So
every password-reset email 404s.

It is shaped the way a real one arrives: **the test suite passes**, because nothing covers that
function. A fix should correct the path *and* add the test that was missing — which is the more
interesting half, and what tells you whether the agent understood the problem or pattern-matched
the ticket.

## Running it

```
npm test
```

## The workflow

`.github/workflows/auto-fix.yml` is dispatched by the Airdev portal when a maintenance ticket is
judged fixable. It runs the coding agent here, on these runners, against this checkout — nothing
is uploaded to Airdev. It opens a **draft** pull request and stops; merging is a decision somebody
makes in the portal.

See `docs/auto-fix/setup.md` in the portal repository for the full setup.
