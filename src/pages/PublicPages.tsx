import { landingFeatures } from '../data/libraryData'
import type { Page } from '../types'
import { Icon } from '../components/Icon'
import { Logo } from '../components/Layout'

export function Landing({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="landing">
      <header className="landing-nav">
        <Logo />
        <div>
          <button type="button" onClick={() => onNavigate('login')}>Login</button>
          <button type="button" className="primary small" onClick={() => onNavigate('signin')}>Sign Up</button>
        </div>
      </header>
      <section className="hero-section">
        <img src="/logo.jpg" alt="Balingasag Municipal Library seal" />
        <div>
          <h1>Welcome to<br />Balingasag Municipal Library</h1>
          <p>Your gateway to knowledge and learning. Browse books, manage borrowing, receive reminders, and stay connected to your public library.</p>
          <div className="button-row">
            <button className="primary" type="button" onClick={() => onNavigate('signin')}>Get Started</button>
            <button className="secondary" type="button" onClick={() => onNavigate('login')}>Member Login</button>
          </div>
        </div>
      </section>
      <section className="feature-grid" aria-label="Library benefits">
        {landingFeatures.map(([icon, title, copy]) => (
          <article className="feature" key={title}>
            <Icon name={icon} />
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
      <section className="how-card">
        <h2>How It Works</h2>
        <div className="steps">
          {['Create Account', 'Browse & Borrow', 'Return on Time'].map((step, index) => (
            <article key={step}>
              <span>{index + 1}</span>
              <h3>{step}</h3>
              <p>{index === 0 ? 'Sign up with your details.' : index === 1 ? 'Search the catalog and reserve books.' : 'Keep track of due dates to avoid fines.'}</p>
            </article>
          ))}
        </div>
      </section>
      <footer>© 2026 Balingasag Municipal Library, Misamis Oriental. All rights reserved.</footer>
    </div>
  )
}

export function AuthPage({ variant, onNavigate }: { variant: 'login' | 'signin'; onNavigate: (page: Page) => void }) {
  const signin = variant === 'signin'

  return (
    <div className="auth-page">
      <section className={`auth-card ${signin ? 'wide' : ''}`}>
        <button className="auth-logo" type="button" onClick={() => onNavigate('landing')}>
          <img src="/logo.jpg" alt="" />
          <strong>BALINGASAG<br />MUNICIPAL LIBRARY</strong>
        </button>
        <h1>{signin ? 'Create Your Account' : 'Welcome Back'}</h1>
        <p>{signin ? 'Join Balingasag Municipal Library and start your reading journey' : 'Login to access your library account'}</p>
        <form onSubmit={(event) => { event.preventDefault(); onNavigate('member-dashboard') }}>
          {signin && (
            <div className="form-grid">
              <label>First Name<input placeholder="First name" /></label>
              <label>Last Name<input placeholder="Last name" /></label>
            </div>
          )}
          <label>Email Address<input type="email" placeholder="your.email@example.com" /></label>
          {signin && (
            <>
              <label>Phone Number<input placeholder="+63 900 000 0000" /></label>
              <label>Address<input placeholder="Barangay, Balingasag, Misamis Oriental" /></label>
            </>
          )}
          <div className={signin ? 'form-grid' : ''}>
            <label>Password<input type="password" placeholder="Password" /></label>
            {signin && <label>Confirm Password<input type="password" placeholder="Confirm password" /></label>}
          </div>
          {signin && <label>Account Type<select defaultValue="Library Member"><option>Library Member</option><option>Administrator</option></select></label>}
          {!signin && (
            <div className="form-row">
              <label className="checkbox"><input type="checkbox" defaultChecked />Remember me</label>
              <button type="button" className="link">Forgot password?</button>
            </div>
          )}
          <button className="primary full" type="submit">{signin ? 'Create Account' : 'Login'}</button>
        </form>
        <p className="switch-copy">
          {signin ? 'Already have an account?' : "Don't have an account?"}
          <button type="button" onClick={() => onNavigate(signin ? 'login' : 'signin')}>{signin ? 'Login' : 'Sign up'}</button>
        </p>
      </section>
    </div>
  )
}
