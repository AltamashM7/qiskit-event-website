# Official Website Requirements — Qiskit Fall Fest 2026

## Purpose

This document records the website-relevant requirements extracted from the USER-supplied **Qiskit Fall Fest 2026 Kickoff** material and the interpretation boundaries agreed with the USER.

It is a durable requirements reference, not an implementation report.

## Source authority

Primary supplied source:
- `Qiskit_Fall-Fest_2026_Kickoff.pdf` supplied by the USER on 2026-09-04.

Secondary reference inspected with the USER:
- approved associate template repository: `Vishwesh-Bhilare/fallfest`;
- deployed reference: `https://vishwesh-bhilare.github.io/fallfest/`.

The associate template is useful for **information types and formal content structure**. It is NOT authoritative for this event's facts, wording, dates, venue, speakers, sponsorship, partnership claims, or final branding.

## Website requirements from the kickoff material

The event website must:
- showcase the event;
- describe what participants will be accomplishing during the event;
- provide the appropriate registration path.

Registration-related requirements depend on event access/format:
- open + virtual: registration link and some form of photo release in registration;
- open + in-person: registration link, confirmation that the registrant is local/able to attend in person, and some form of photo release;
- closed with known student contact information: website showcase + event-accomplishment description + separate registration site with photo release;
- closed without known student contact information: website showcase + event-accomplishment description + registration link + current-student confirmation + photo release.

The kickoff material also warns that the submitted website may be posted on the IBM Quantum website and highlighted through IBM Quantum LinkedIn, so outside-user presentation quality is a real review concern.

## Branding constraints from the kickoff material

Allowed, subject to event-staff approval and without modification:
- the provided IBM Quantum logo;
- the provided Qiskit Fall Fest mark.

Not allowed under the supplied guidance:
- the striped corporate IBM logo, because the required contract is not provided.

IBM Quantum mark misuse guidance includes:
- do not use “Quantum” without “IBM”;
- do not stack, reconstruct, outline, stretch/compress, rotate, recolor with gradients, add glow/drop-shadow/effects/reflections, or otherwise alter the approved logotype;
- do not invent a new IBM Quantum logo;
- do not refer to IBM Quantum as “IBM Q”.

Official marks must remain separate, pristine assets. Do not bake them into generated scene artwork or apply the site's halftone/dither/pixel treatment to them.

## Dummy-data review strategy — USER APPROVED

The website will first be completed and submitted for visual/structural review using realistic dummy data in the **real intended content format**.

Rules:
- build production-intended page structure/components, not a disposable mockup;
- dummy dates, names, rooms, session titles, biographies, etc. may populate the intended fields;
- avoid `Lorem ipsum` where realistic review copy can be used instead;
- dummy data must not fabricate corporate relationships, sponsorships, official IBM speakers, or partnership claims;
- once the website structure/design is approved, real event data can replace dummy data without requiring a structural redesign.

## Lessons from the approved associate template

Useful information types:
- event identity and summary;
- event date/location/format metadata;
- registration CTA;
- About the Event;
- What to Expect / what participants accomplish;
- schedule/program;
- speaker directory;
- organizers/partners;
- footer/contact information.

Useful Schedule fields:
- day/date;
- start/end time;
- category/type;
- session title;
- speaker/facilitator;
- venue/room;
- short description.

Useful Speaker fields:
- photograph;
- name;
- role/title;
- affiliation;
- short biography;
- optional session association.

Do not copy that template's visual style or placeholder facts. The current project's distinctive art direction remains authoritative.

## Current target site map — approved, not yet implemented

- Home
- Schedule
- Speakers

The previous prototype routes `About Event` and `About Quantum Mechanics` are no longer part of the current target site map.

An informational/educational route may be reconsidered later only if the USER chooses to add one.
