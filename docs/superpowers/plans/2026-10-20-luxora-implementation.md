# LUXORA ESTATE Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a distinctive cinematic 3D luxury real estate application with functioning inventory and inquiry management.
**Architecture:** Next.js App Router, client-side WebGL experience, server route handlers with file-backed development persistence or MongoDB, cookie-based admin session.
**Tech Stack:** JavaScript, React JSX, Next.js, CSS/Tailwind, GSAP, Three.js, R3F, Mongoose, jose.
**Spec:** docs/superpowers/specs/2026-10-20-luxora-design.md

## Global Constraints
- JavaScript/JSX only, no TypeScript.
- All inventory is fictional sample data.
- Do not advertise 360 photography or BIM-quality models: the scene is procedural and representative.
- Require secrets for admin access.

## Review Focus
- Invalid inquiry fields and email validation.
- Authorization on every admin mutating endpoint.
- Duplicate property slugs.
- File upload type and size validation.
- Reduced motion and missing WebGL support.

### Task 1: Foundation and data
- [x] Create Next.js configuration and example environment.
- [x] Write validation tests and validation helpers.
- [x] Add JSON development store and MongoDB Mongoose models.

### Task 2: Public experience
- [x] Implement architecture-led responsive home and browse pages.
- [x] Implement property detail, about and contact flows.
- [x] Create procedural WebGL villa scene with orbit controls.
- [x] Add GSAP scroll reveal and accessible fallbacks.

### Task 3: Protected management
- [x] Add session authentication and privileged inventory/inquiry routes.
- [x] Add local image upload handler, admin editor and management UI.
- [x] Document how local setup and production deploy differ.

### Task 4: Verification
- [ ] Run npm test and build once dependencies are available.
- [ ] Desktop/mobile browser visual QA and interaction checks.
- [ ] Fix all discovered issues; do not claim unrun steps as completed.
