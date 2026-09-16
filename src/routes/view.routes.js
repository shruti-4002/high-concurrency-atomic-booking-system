import express from "express";

const router = express.Router();


const renderPage = (title, categoryTitle, description, imagePath) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Technical Proof</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #0b0e14; color: #adbac7; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; min-height: 100vh; }
        .proof-container { max-width: 900px; margin: 40px auto; padding: 0 20px; }
        .proof-card { background: #1c2128; border: 1px solid #373e47; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .proof-img { width: 100%; border-radius: 8px; border: 1px solid #444c56; margin-top: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .btn-back { background: #22272e; border: 1px solid #444c56; color: #adbac7; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-weight: 500; transition: 0.2s; }
        .btn-back:hover { background: #373e47; color: #ffffff; }
    </style>
</head>
<body>
<div class="proof-container">
    <a href="/" class="btn-back d-inline-block mb-4">← Back to Overview Dashboard</a>
    <div class="proof-card">
        <h2 class="text-white fw-bold mb-2">${categoryTitle}</h2>
        <p class="text-secondary fs-6 mb-4">${description}</p>
        <img src="${imagePath}" class="proof-img" alt="${title}">
    </div>
</div>
</body>
</html>
`;


router.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atomic Booking System - Engineering Evidence</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #0b0e14; color: #adbac7; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .hero { background: #1c2128; border-bottom: 1px solid #373e47; padding: 50px 0; margin-bottom: 40px; }
        .badge-ci { background: rgba(46, 160, 67, 0.15); border: 1px solid #2ea643; color: #3fb950; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 13px; }
        .card-custom { background: #1c2128; border: 1px solid #373e47; border-radius: 10px; padding: 22px; transition: all 0.2s ease-in-out; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
        .card-custom:hover { transform: translateY(-4px); border-color: #539bf5; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
        .card-title { color: #539bf5; font-weight: 600; margin-bottom: 8px; font-size: 1.1rem; }
        .btn-view { background: #22272e; border: 1px solid #444c56; color: #adbac7; border-radius: 6px; font-size: 13px; font-weight: 500; text-decoration: none; padding: 8px; text-align: center; transition: 0.2s; }
        .btn-view:hover { background: #316dca; border-color: #316dca; color: #ffffff; }
    </style>
</head>
<body>

<div class="hero text-center">
    <div class="container">
        <span class="badge-ci mb-3 d-inline-block">🐳 Dockerized & Deployed via GitHub Actions CI/CD on Render</span>
        <h1 class="fw-bold text-white mb-2">Atomic Booking System</h1>
        <p class="text-secondary mb-4 fs-6">Production-Grade  Ticketing Backend Verification Suite</p>
        <a href="/api-docs" target="_blank" class="btn btn-primary fw-bold px-4 py-2">⚡ Swagger API Docs</a>
    </div>
</div>

<div class="container pb-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="text-white fw-bold m-0">System Architecture Proofs</h4>
        <span class="text-secondary small">8 Live Technical Visualizations</span>
    </div>

    <div class="row g-4">
        
        <!-- 1. Admin RBAC -->
        <div class="col-md-6 col-lg-4">
            <div class="card-custom">
                <div>
                    <div class="card-title">👑 Admin Control & RBAC :Role Based</div>
                    <p class="text-secondary small">Bulk seat generation, event creation, and category setup restricted to Admin scope.</p>
                </div>
                <a href="/proof/rbac-admin-power" class="btn-view mt-3">Inspect Proof Page →</a>
            </div>
        </div>

        <!-- 2. Account Suspension -->
        <div class="col-md-6 col-lg-4">
            <div class="card-custom">
                <div>
                    <div class="card-title text-warning">🚫 Account Suspension Shield</div>
                    <p class="text-secondary small">Real-time DB validation in auth middleware to instantly drop suspended sessions.</p>
                </div>
                <a href="/proof/account-suspension" class="btn-view mt-3">Inspect Proof Page →</a>
            </div>
        </div>

        <!-- 3. Redis Concurrency Lock -->
        <div class="col-md-6 col-lg-4">
            <div class="card-custom">
                <div>
                    <div class="card-title text-success">🔒 Concurrency Mutex Lock</div>
                    <p class="text-secondary small">Distributed Redis lock mechanism protecting against double-booking race conditions.</p>
                </div>
                <a href="/proof/redis-lock" class="btn-view mt-3">Inspect Proof Page →</a>
            </div>
        </div>

        <!-- 4. Atomic Rate Limiter -->
        <div class="col-md-6 col-lg-4">
            <div class="card-custom">
                <div>
                    <div class="card-title text-danger">⚡ Rate Limiter (Lua Script)</div>
                    <p class="text-secondary small">Atomic Redis execution via Lua scripts for high-speed rate limiting and DDoS protection.</p>
                </div>
                <a href="/proof/redis-rate-limiter" class="btn-view mt-3">Inspect Proof Page →</a>
            </div>
        </div>

        <!-- 5. Token Rotation -->
        <div class="col-md-6 col-lg-4">
            <div class="card-custom">
                <div>
                    <div class="card-title text-info">🔄 JWT Token Rotation</div>
                    <p class="text-secondary small">HttpOnly Cookie Refresh Tokens paired with stateless Access Token blacklisting in Redis.</p>
                </div>
                <a href="/proof/token-rotation" class="btn-view mt-3">Inspect Proof Page →</a>
            </div>
        </div>

        <!-- 6. GIN Full-Text Search -->
        <div class="col-md-6 col-lg-4">
            <div class="card-custom">
                <div>
                    <div class="card-title">🔍 GIN Full-Text Search</div>
                    <p class="text-secondary small">PostgreSQL tsvector indexing and plainto_tsquery ranked using ts_rank() relevance.</p>
                </div>
                <a href="/proof/gin-search" class="btn-view mt-3">Inspect Proof Page →</a>
            </div>
        </div>

        <!-- 7. Database Pagination -->
        <div class="col-md-6 col-lg-4">
            <div class="card-custom">
                <div>
                    <div class="card-title text-info">📄 Cursor/Offset Pagination</div>
                    <p class="text-secondary small">High-efficiency paginated responses for event listings reducing query payload size.</p>
                </div>
                <a href="/proof/pagination" class="btn-view mt-3">Inspect Proof Page →</a>
            </div>
        </div>

        <!-- 8. Cascade Delete Resolution -->
        <div class="col-md-6 col-lg-4">
            <div class="card-custom">
                <div>
                    <div class="card-title text-success">💡 Cascade Delete Architecture</div>
                    <p class="text-secondary small">Preventing orphan record buildup in SQL database using Prisma onDelete: Cascade rules.</p>
                </div>
                <a href="/proof/cascade-delete" class="btn-view mt-3">Inspect Proof Page →</a>
            </div>
        </div>

    </div>
</div>

</body>
</html>
  `);
});

// 2. INDIVIDUAL PROOF ROUTES
router.get("/proof/rbac-admin-power", (req, res) => {
  res.send(renderPage("Admin Power RBAC", "👑 Admin Privileges & RBAC Access Control", "Strict Role-Based Access Control (RBAC) enforcing Admin authorization for bulk seat creation, event setup, and category management.", "/public/Images/adminPower.png"));
});

router.get("/proof/account-suspension", (req, res) => {
  res.send(renderPage("Account Suspension", "🚫 User Account Suspension Enforcement", "Real-time access revocation for suspended accounts. Active sessions are instantly blocked using live DB query checks inside auth middleware.", "/public/Images/Account_Suspension.png"));
});

router.get("/proof/redis-lock", (req, res) => {
  res.send(renderPage("Redis Lock Concurrency", "🔒 Distributed Redis Mutex Lock for Transactions", "Ensures data consistency and prevents ticket double-booking race conditions during high concurrency reservations.", "/public/Images/redislock.png"));
});

router.get("/proof/redis-rate-limiter", (req, res) => {
  res.send(renderPage("Redis Rate Limiter", "⚡ Atomic Rate Limiter (Lua Script)", "Custom Lua scripts executed atomically inside Redis to control request spikes and shield API routes.", "/public/Images/ratelimiter.png"));
});

router.get("/proof/token-rotation", (req, res) => {
  res.send(renderPage("JWT Token Rotation", "🔄 JWT Token Rotation & Blacklisting", "Short-lived Access Tokens returned in payload and HttpOnly Refresh Tokens saved in cookies. Logout blacklisting managed in Redis.", "/public/Images/Token-Rotation-AcessandRefresh-Redis.png"));
});

router.get("/proof/gin-search", (req, res) => {
  res.send(renderPage("GIN Full Text Search", "🔍 GIN Indexing Full-Text Search", "High-performance query execution using PostgreSQL tsvector and plainto_tsquery, indexed with GIN and dynamically scored via ts_rank().", "/public/Images/Tsvector-search.png"));
});

router.get("/proof/pagination", (req, res) => {
  res.send(renderPage("Pagination Proof", "📄 Database Event Pagination Proof", "Optimized database querying using page offset parameters to load event records cleanly with metadata headers.", "/public/Images/Pagination.png"));
});

router.get("/proof/cascade-delete", (req, res) => {
  res.send(renderPage("Cascade Delete Learned Solution", "💡 Relational Integrity via Cascade Delete", "Problem solved: Avoided orphan records in child tables by implementing Prisma onDelete: Cascade behavior across relational schema models.", "/public/Images/Cascade_Delete.png"));
});

export default router;