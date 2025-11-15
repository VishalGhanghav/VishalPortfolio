import { useEffect, useState } from 'react';
import './App.css';

const ASSET_BASE = `${process.env.PUBLIC_URL}/assets`;

const RESUME_URL = `${ASSET_BASE}/VishalGhanghav_Resume_SDE-2.pdf`;
const PORTRAIT_URL = `${ASSET_BASE}/Vishal_PersonalPhoto.jpeg`;
const BG_TEXTURE_URL = `${ASSET_BASE}/bg-texture.jpeg`;

const navLinks = [
  { id: '#top', label: 'Home', Icon: HomeIcon },
  { id: '#about', label: 'About', Icon: AboutIcon },
  { id: '#skills', label: 'Skills', Icon: SkillsIcon },
  { id: '#experience', label: 'Experience', Icon: ExperienceIcon },
  { id: '#contact', label: 'Contact', Icon: ContactIcon },
];

const skillCategories = [
  {
    title: 'Languages and Frameworks',
    skills: [
      { name: 'Java', level: 'Experienced' },
      { name: 'JavaScript', level: 'Proficient' },
      { name: 'Spring Boot', level: 'Experienced' },
      { name: 'Node.js', level: 'Proficient' },
      { name: 'Hibernate', level: 'Experienced' },
      { name: 'Apache Kafka', level: 'Advanced' },
      { name: 'ActiveMQ', level: 'Proficient' },
      { name: 'ORMB', level: 'Experienced' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', level: 'Experienced' },
      { name: 'MongoDB', level: 'Experienced' },
      { name: 'PostgreSQL', level: 'Proficient' },
      { name: 'Oracle SQL', level: 'Experienced' },
      { name: 'Redis', level: 'Proficient' },
      { name: 'ClickHouse', level: 'Proficient' },
    ],
  },
  {
    title: 'Tools & Services',
    groups: [
      {
        title: 'Cloud & Infrastructure',
        skills: [
          { name: 'AWS', level: 'Proficient' },
          { name: 'Kubernetes', level: 'Proficient' },
          { name: 'Docker', level: 'Proficient' },
          { name: 'Helm', level: 'Proficient' },
        ],
      },
      {
        title: 'Delivery & Automation',
        skills: [
          { name: 'ArgoCD', level: 'Proficient' },
          { name: 'GitHub', level: 'Experienced' },
          { name: 'GitHub Copilot', level: 'Proficient' },
          { name: 'Windsurf', level: 'Proficient' },
        ],
      },
      {
        title: 'Observability & Performance',
        skills: [
          { name: 'Grafana', level: 'Proficient' },
          { name: 'Prometheus', level: 'Proficient' },
          { name: 'Zipkin', level: 'Proficient' },
          { name: 'K6', level: 'Proficient' },
        ],
      },
    ],
  },
];

const experienceTimeline = [
  {
    company: 'M2P Fintech',
    title: 'Software Development Engineer II',
    tenure: 'Mar 2024 - Present',
    location: 'Chennai, India',
    website: 'https://m2pfintech.com/',
    bullets: [
      'Modernized legacy EOD batch jobs into an event-driven Kafka pipeline, cutting execution time from 8-12 hours to under 3 hours.',
      'Launched Write-off & Settlement and Fee Waiver Engine capabilities, improving throughput by 70-90% for high-volume tenants.',
      'Rolled out centralized monitoring and alerting across mission-critical microservices, reducing incident detection time by 80%.',
      'Introduced AI-assisted workflows and K6-based load testing to lower API latency by up to 90%.',
    ],
  },
  {
    company: 'Paytm Payments Bank',
    title: 'Software Engineer - Backend',
    tenure: 'Nov 2023 - Mar 2024',
    location: 'Noida, India',
    website: 'https://www.paytmbank.com/',
    bullets: [
      'Built AEPS Fund Transfer microservice with secure, high-throughput processing for thousands of daily transactions.',
      'Produced comprehensive low-level designs enabling scalable rollout of fund-transfer workflows.',
    ],
  },
  {
    company: 'RIA Advisory LLP',
    title: 'Software Developer',
    tenure: 'Jul 2021 - Nov 2023',
    location: 'Pune, India',
    website: 'https://www.riaadvisory.com/',
    bullets: [
      'Automated Pricing Workbench workflows, reducing operations effort by 90% and accelerating onboarding.',
      'Developed secure microservices and JWT-backed APIs that powered scalable ORMB implementations.',
      'Migrated onboarding from spreadsheets to Deal Pricing UI, tripling trial-to-permanent conversions.',
    ],
  },
];

const socialLinks = [
  { href: 'https://www.linkedin.com/in/vishal-ghanghav-024139176/', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://github.com/VishalGhanghav', label: 'GitHub', Icon: GithubIcon },
  { href: 'https://leetcode.com/u/Vishal96k/', label: 'LeetCode', Icon: LeetCodeIcon },
];

const footerLinks = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const Header = () => {
  const handleResumeDownload = async (event) => {
    event.preventDefault();

    const downloadProbe = document.createElement('a');
    const supportsDownloadAttr = typeof downloadProbe.download !== 'undefined';
    const userAgent = navigator.userAgent || '';
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (!supportsDownloadAttr || isMobileDevice) {
      const popup = window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
      if (!popup) {
        window.location.assign(RESUME_URL);
      }
      return;
    }

    try {
      const response = await fetch(RESUME_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch resume: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = RESUME_URL.split('/').pop() || 'VishalGhanghav_Resume.pdf';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 1500);
    } catch (error) {
      const popup = window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
      if (!popup) {
        window.location.assign(RESUME_URL);
      }
    }
  };

  return (
    <header id="top" style={{ backgroundImage: `url(${BG_TEXTURE_URL})` }}>
      <div className="container header__container">
        <h5>Hello, I'm</h5>
        <h1>Vishal Ghanghav</h1>
        <h5 className="text-light">Software Development Engineer-2</h5>
        <div className="cta">
          <a href={RESUME_URL} className="btn" onClick={handleResumeDownload}>
            Download CV
          </a>
          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
        </div>
      <a
        className="hero__feature"
        href="https://www.youtube.com/watch?v=dqlWGtt-oPY"
        target="_blank"
        rel="noreferrer"
      >
        <span className="hero__feature-icon" role="img" aria-label="Featured video">
          📺
        </span>
        <div>
          <p className="hero__feature-subtitle">Featured on Concept & Coding</p>
          <h5>Navigating My Tech Career Journey</h5>
          <span className="hero__feature-cta">Watch the Podcast →</span>
        </div>
      </a>
      <div className="header__socials">
        {socialLinks.map(({ href, label, Icon }) => (
          <a key={href} href={href} target="_blank" rel="noreferrer" aria-label={label}>
            <span className="social-pill">
              <Icon />
            </span>
          </a>
        ))}
      </div>
      <a href="#contact" className="scroll__down">
        Scroll Down
      </a>
    </div>
    </header>
  );
};

const Nav = ({ activeSection, onSelect }) => (
  <nav>
    {navLinks.map(({ id, label, Icon }) => (
      <a
        key={id}
        href={id}
        aria-label={label}
        className={activeSection === id ? 'active' : ''}
        onClick={() => onSelect(id)}
      >
        <Icon />
      </a>
    ))}
  </nav>
);

const About = () => (
  <section id="about">
    <h5>Get To Know</h5>
    <h2>About Me</h2>
    <div className="container about__container">
      <div className="about__me">
        <div className="about__me-image">
          <img src={PORTRAIT_URL} alt="Vishal Ghanghav" />
        </div>
      </div>
      <div className="about__content">
        <div className="about__cards">
          <article className="about__card">
            <span className="about__icon" role="img" aria-label="Experience">
              🚀
            </span>
            <h5>Experience</h5>
            <small>4.7+ Years</small>
          </article>
          <article className="about__card">
            <span className="about__icon" role="img" aria-label="Technologies">
              🛠️
            </span>
            <h5>Technologies</h5>
            <small>Java · Spring Boot · Kafka</small>
          </article>
          <a
            className="about__card about__card--link"
            href="https://github.com/VishalGhanghav"
            target="_blank"
            rel="noreferrer"
            aria-label="View GitHub projects"
          >
            <span className="about__icon" role="img" aria-label="Projects">
              📈
            </span>
            <h5>Projects</h5>
            <small>Fintech Platforms</small>
          </a>
        </div>
        <p>
          I'm SDE-2 with 4.7+ years of experience specializing in distributed and event-driven systems. Skilled in Java, SpringBoot, Kafka, and AWS, with a proven record of optimizing large-scale financial platforms for high throughput, reliability, and scalability.
        </p>
        <a href="#contact" className="btn btn-primary">
          Let's Talk
        </a>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills">
    <h5>What Skills I Have</h5>
    <h2>My Skillset</h2>
    <div className="container skills__container">
      {skillCategories.map((category) => (
        <div
          key={category.title}
          className={`skills__category${category.groups ? ' skills__category--wide' : ''}`}
        >
          <h3>{category.title}</h3>
          {category.groups ? (
            <div className="skills__groups">
              {category.groups.map((group) => (
                <div
                  key={`${category.title}-${group.title ?? 'core'}`}
                  className="skills__group"
                >
                  {group.title ? <h4>{group.title}</h4> : null}
                  <div className="skills__content">
                    {group.skills.map((skill) => (
                      <article key={skill.name} className="skills__details">
                        <span className="skills__details-icon" aria-hidden="true">
                          ✔
                        </span>
                        <div>
                          <h4>{skill.name}</h4>
                          <small className="text-light">{skill.level}</small>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="skills__content">
              {category.skills.map((skill) => (
                <article key={skill.name} className="skills__details">
                  <span className="skills__details-icon" aria-hidden="true">
                    ✔
                  </span>
                  <div>
                    <h4>{skill.name}</h4>
                    <small className="text-light">{skill.level}</small>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
);

const Experience = () => (
  <section id="experience">
    <h5>Everything About My Work Life</h5>
    <h2>Experience</h2>
    <div className="container experience__container">
      {experienceTimeline.map((job) => (
        <article key={job.company} className="experience__detail">
          <div className="experience_title active_title">
            <h5>
              <div>
                <span className="job_title">
                  {job.title} @ {job.company}
                </span>
                <span className="tenure">{job.tenure}</span>
              </div>
            </h5>
          </div>
          <div className="job_description">
            <small className="location">
              📍 {job.location}{' '}
              <a className="company__website" href={job.website} target="_blank" rel="noreferrer">
                {new URL(job.website).hostname}
              </a>
            </small>
            <ul className="exp">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const Contact = () => (
  <section id="contact">
    <h5>Get In Touch</h5>
    <h2>Contact Me</h2>
    <div className="container contact__container">
      <div className="contact__options">
        <article className="contact__option">
          <span className="contact__option-icon" role="img" aria-label="Email">
            ✉️
          </span>
          <h4>Email</h4>
          <h5>vishalghanghav5600@gmail.com</h5>
          <a href="mailto:vishalghanghav5600@gmail.com">Send a message</a>
        </article>
        <article className="contact__option">
          <span className="contact__option-icon" role="img" aria-label="Phone">
            📱
          </span>
          <h4>Phone</h4>
          <h5>+91 7558584400</h5>
          <a href="tel:+917558584400">Call Vishal</a>
        </article>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const name = formData.get('name') || 'Someone';
          const email = formData.get('email') || 'unknown';
          const message = formData.get('message') || '';
          const subject = `Portfolio enquiry from ${name}`;
          const body = `From: ${name} (${email})\n\n${message}`;
          window.location.href = `mailto:vishalghanghav5600@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          event.currentTarget.reset();
        }}
      >
        <input type="text" name="name" placeholder="Your Full Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" rows="7" placeholder="Your Message" />
        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>
    </div>
  </section>
);

const Footer = () => (
  <footer>
    <a href="#top" className="footer__logo">
      Vishal Ghanghav
    </a>
    <ul className="permalinks">
      {footerLinks.map((link) => (
        <li key={link.href}>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </ul>
    <div className="footer__socials">
      {socialLinks.map(({ href, label, Icon }) => (
        <a key={href} href={href} target="_blank" rel="noreferrer" aria-label={label}>
          <span className="social-pill">
            <Icon />
          </span>
        </a>
      ))}
    </div>
    <div className="footer__copyright">
      <small>© {new Date().getFullYear()} Vishal Ghanghav. All rights reserved.</small>
    </div>
  </footer>
);

function App() {
  const [activeSection, setActiveSection] = useState('#top');

  useEffect(() => {
    const sectionIds = navLinks.map(({ id }) => id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.25;

      for (const sectionId of sectionIds) {
        const sectionEl = document.querySelector(sectionId);
        if (!sectionEl) {
          continue;
        }

        const { offsetTop, offsetHeight } = sectionEl;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(sectionId);
          return;
        }
      }

      if (window.scrollY < 100) {
        setActiveSection('#top');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <Nav activeSection={activeSection} onSelect={setActiveSection} />
      <main>
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.75h3.96V21H3zm6.24 0H13v1.68h.06c.55-1.04 1.9-2.14 3.91-2.14 4.18 0 4.95 2.75 4.95 6.32V21h-3.96v-5.52c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.43-2.12 2.92V21H9.24z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.34-1.76c-1.1-.75.08-.74.08-.74a2.52 2.52 0 0 1 1.84 1.24 2.55 2.55 0 0 0 3.48 1 2.55 2.55 0 0 1 .76-1.6c-2.67-.3-5.47-1.34-5.47-5.95a4.66 4.66 0 0 1 1.24-3.24 4.32 4.32 0 0 1 .12-3.2s1-.32 3.3 1.23a11.38 11.38 0 0 1 6 0c2.28-1.55 3.28-1.23 3.28-1.23a4.32 4.32 0 0 1 .12 3.2 4.66 4.66 0 0 1 1.24 3.24c0 4.62-2.8 5.65-5.48 5.95a2.86 2.86 0 0 1 .82 2.21v3.28c0 .32.22.7.82.58A12 12 0 0 0 12 .5z" />
    </svg>
  );
}

function LeetCodeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M21.48 13.35h-7.53a.8.8 0 0 1 0-1.6h7.53a.8.8 0 1 1 0 1.6zm-9.92 6.57c.3.3.8.3 1.1 0l1.42-1.43a.78.78 0 1 0-1.1-1.1l-.87.87-5.6-5.6 5.6-5.6.87.87a.78.78 0 1 0 1.1-1.1L12.67 4.4c-.3-.3-.8-.3-1.1 0L4.4 11.58a.78.78 0 0 0 0 1.1z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 3.172 2.929 12.243l1.414 1.414L5 12v8h6v-6h2v6h6v-8l.657.657 1.414-1.414z" />
    </svg>
  );
}

function AboutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 16c5.33 0 10 2.665 10 6v2H2v-2c0-3.335 4.67-6 10-6zm0-14a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
    </svg>
  );
}

function SkillsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 3h16v2H4zm0 4h10v2H4zm0 4h16v2H4zm0 4h10v2H4zm0 4h16v2H4z" />
    </svg>
  );
}

function ExperienceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20 6h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v3h20V8a2 2 0 0 0-2-2zM10 4h4v2h-4zm-8 9v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7z" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M21 8V7l-3 2-2-1-3 2-2-1-3 2-2-1-3 2v8h18V8zM3 5l3-2 2 1 3-2 2 1 3-2 2 1 3-2v4l-3 2-2-1-3 2-2-1-3 2-2-1-3 2z" />
    </svg>
  );
}
