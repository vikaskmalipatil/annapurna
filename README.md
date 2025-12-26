# Annapurna — Smart PDS Leakage Reduction System

## 🚩 Problem Statement
Reduce leakages in the Public Distribution System (PDS) using a tech-driven, fair, and efficient approach. Integrate AI for consumption analysis and anomaly detection, and leverage at least one tool from the Google ecosystem.

## 💡 Solution Overview
Annapurna removes dependency on middlemen by introducing a **zero-trust, self-service ration store model** backed by digital verification and AI-assisted quantity validation.

### Key Workflow:
1. **Admin/User Login** using **Firebase Authentication** (Google ecosystem requirement satisfied)
2. **Ration Card Verification** via QR scan (linked to database lookup)
3. **Face Authentication** using AI to match beneficiary identity
4. **Self-Service Ration Collection** inside store by user
5. **Weighing Validation** using:
   - Backend quota check
   - Gemini Vision API to confirm a ration bag is on scale and not tampered with
6. **Transaction logs & quota deduction** stored securely in Firestore
7. **User transparency** via history dashboard + complaint portal

## 🧠 AI Integration (Gemini Vision API)
We use AI to:
- Detect that the object on the weighing machine is a ration bag (not hand, empty container, or manipulation)
- Validate whether the user is physically holding/pressing the ration bag while weighing
- Compare weighed quantity with allocated quota
- Approve or reject checkout event in real time

## 🛠 Tech Stack
| Component | Technology |
|---|---|
| Frontend | React (modular pages + components) |
| Backend | Node.js services / API handlers |
| Authentication | Firebase Auth |
| Database | Firestore (collections: users, quotas, transactions, complaints) |
| AI Vision | Gemini Vision API (Gemini API is part of Google ecosystem) |

## 📂 Repository Structure & Branching
```
annapurna/
├── frontend/   → UI + Firebase client setup
├── backend/    → AI service + business logic
├── docs/       → Presentation & architecture diagrams
```
Team branches:
- `auth-admin`
- `auth-user`
- `ai-scale`
- `ui-pages`
> Members work only in their assigned branches. `main` branch is for integration.

## 🔐 Zero-Trust Principles Used
- No admin override for quantity approval
- Quota deduction only on AI-verified success
- Append-only logs (tamper-resistant)
- AI validates *events*, not UI text from scale display

## 📊 Expected Impact
| Issue | Improvement |
|---|---|
| Fake beneficiaries | QR + face authentication prevents proxy collection |
| Over-collection | AI + backend quota match rejects excess |
| Manual tampering | No blind trust, structured logs |
| Transparency | User dashboard + complaint system |

## 🚀 Future Scope (Not part of MVP)
- Region-wise consumption forecasting
- Admin behavior anomaly monitoring
- Internal counter tracking
- IoT sensor-based auto checkout

## 👥 Team Contribution Guide
1. Pull latest `main` before working
2. Commit and push only to assigned branch
3. Raise a Pull Request when done
4. Leader reviews and merges to `main`

## 📌 Summary for Hackathon Submission
Annapurna delivers a **fair, efficient, middleman-free PDS model** using **Firebase for secure access (Google ecosystem)** and **Gemini Vision API for AI-based ration weighing validation and anomaly detection**, with structured Firestore logs and a complaint portal to ensure transparency and accountability.

---

✍️ Project by Team *Annapurna*