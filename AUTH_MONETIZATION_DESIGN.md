# Authentication & Monetization Design for Prime Academy Platform

---

## 🔒 Authentication Architecture

### Features
- **SSO for Institutions/Companies:** OAuth2, SAML, Google, Microsoft, LinkedIn
- **Social Login:** Google, Facebook, GitHub
- **Multi-factor Authentication (MFA):** TOTP apps (Google Authenticator), Email/SMS OTP
- **Role-based Access Control (RBAC):** User, Student, Instructor, Recruiter, Admin, SuperAdmin
- **JWT tokens:** Stateless session management, refresh tokens
- **API Key support:** For partners and recruiter APIs
- **Passwordless Login:** Optional email magic links

### Flow Example

1. **User Registration**
    - Email/password OR social login OR institution SSO
    - Email verification required
2. **Login**
    - Issue JWT access + refresh tokens
    - Prompt for MFA if enabled
3. **Authorization**
    - API endpoints and UI pages check user role via JWT claims
    - Admin dashboard, recruiter API, premium content gated by role/subscription
4. **Session Refresh**
    - Short-lived access token, long-lived refresh token
5. **Logout**
    - Invalidate refresh token server-side

### Example: Express Backend (Node.js)

```javascript
// auth.js
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  const user = await User.findById(payload.id);
  return user ? done(null, user) : done(null, false);
}));

// Login endpoint (email/password or social)
app.post('/api/auth/login', async (req, res) => {
  // ... find user, verify password
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30m' });
  const refresh = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '90d' });
  res.json({ token, refresh });
});
```

---

## 💳 Monetization Architecture

### Revenue Streams
- **Subscription Tiers:** Free, Premium, Institutional, Recruiter, Enterprise
- **One-time Payments:** Certificate fees, special workshops, hackathon entry
- **Revenue Sharing:** User-generated courses, project/IP licensing
- **Talent Placement Fees:** % salary, project commission
- **Corporate SaaS:** API access, analytics, private challenge hosting

### Payment Integration

- **Stripe API** (primary), [PayPal, Flutterwave, MTN/Airtel Money (Africa)]
- **Webhooks:** Subscription renewal, payment success/failure
- **Invoices:** Automated, downloadable receipts
- **Trial Management:** Limited-time free access, auto-upgrade
- **Usage Metering:** API calls, project slots, storage

### Example: Subscription Flow

1. **User selects plan (e.g., Premium $29/mo)**
2. **Frontend calls `/api/billing/checkout-session`**
3. **Backend creates Stripe Checkout/Portal session**
4. **Stripe handles payment UI and card security**
5. **Webhook `/api/billing/webhook`** receives payment events
6. **Backend updates user’s `subscription_status` and role**
7. **Premium features instantly unlocked; invoice sent**

### Example: Express + Stripe Integration

```javascript
// billing.js
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Create checkout session
app.post('/api/billing/checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: req.body.email,
    line_items: [{ price: req.body.priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: 'https://platform.com/account/success',
    cancel_url: 'https://platform.com/account/cancel'
  });
  res.json({ url: session.url });
});

// Stripe webhook for event handling
app.post('/api/billing/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  if (event.type === 'customer.subscription.updated') {
    // update user in DB
  }
  res.status(200).send();
});
```

---

## 💡 Monetization UI

### Features
- **Pricing Page:** Feature comparison, testimonials, FAQ, promo codes
- **Account Billing Panel:** Subscription status, upgrade/downgrade, invoices
- **Role/Feature Gating:** “Upgrade to unlock” banners, premium badges
- **Admin Analytics:** Revenue dashboard, cohort churn/retention, LTV, ARPU

### Example: React Pricing Table

```jsx
const plans = [
  { name: "Free", price: "$0", features: ["Community content", "Basic jobs"] },
  { name: "Premium", price: "$29/mo", features: ["AI tutorials", "Live mentor", "All jobs", "Certs"] },
  { name: "Institutional", price: "Custom", features: ["SSO", "Analytics", "Private labs"] },
];
return (
  <div className="pricing">
    {plans.map(plan => (
      <div key={plan.name} className="plan">
        <h2>{plan.name}</h2>
        <p>{plan.price}</p>
        <ul>
          {plan.features.map(f => <li key={f}>{f}</li>)}
        </ul>
        <button>Choose</button>
      </div>
    ))}
  </div>
);
```

---

## 🔑 Why This is “Boom”

- **Seamless, secure onboarding:** Social + SSO + MFA + passwordless = high conversion, low friction
- **True global monetization:** All payment rails, auto-localized pricing, invoicing
- **Role-based unlocks:** Dynamic feature access for individuals, teams, institutions, and recruiters
- **Developer-friendly:** API keys, usage metering, Stripe/PayPal/MTN integrations
- **Growth ready:** Admin analytics, cohort tracking, campaign and promo code support

---