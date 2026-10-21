import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

const capabilities = [
  'Next.js & React',
  'Node.js & Express',
  'MongoDB',
  'Cloud & Docker',
  'AI Engineering',
  'Cybersecurity',
];

const selectedProjects = [
  'Full-Stack E-Commerce',
  'SaaS Analytics Dashboard',
  'Voice-Controlled AI Assistant',
  'Secure Password Manager',
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-overline"><span className="small-dot"/> THE ART OF LIVING WELL</div>
        <div className="footer-title">Your next chapter<br/><em>begins here.</em></div>
        <div className="footer-cta-wrap">
          <p>Exceptional places. Meaningful connections.<br/>The privilege of feeling at home.</p>
          <Link href="/contact" className="round-arrow" aria-label="Contact the Luxora team"><ArrowUpRight size={34}/></Link>
        </div>

        <section className="founder-spotlight" aria-labelledby="founder-heading">
          <div className="founder-photo-panel">
            <div className="founder-photo-frame">
              <Image
                className="founder-photo"
                src="/images/farhan-ali-portrait.jpg"
                alt="Portrait of Farhan Ali wearing a navy blazer"
                width={878}
                height={1536}
                sizes="(max-width: 680px) 75vw, (max-width: 1100px) 35vw, 330px"
                priority={false}
              />
            </div>
            <span className="founder-photo-corner" aria-hidden="true">FA / 01</span>
            <p className="founder-photo-caption">The person behind the pixels.</p>
          </div>

          <div className="founder-profile">
            <div className="founder-topline"><span className="small-dot"/> MEET THE CREATOR <span>— 001</span></div>
            <h2 id="founder-heading" className="founder-name">Crafted by<br/><em>Farhan Ali.</em></h2>
            <p className="founder-position">Freelance MERN Stack Developer <span aria-hidden="true">/</span> Cloud Engineer <span aria-hidden="true">/</span> Cybersecurity Specialist</p>
            <p className="founder-bio">I design and build modern digital experiences where thoughtful design meets dependable engineering. My work spans full-stack web development, cloud solutions, AI-powered applications and security-conscious systems.</p>
            <div className="founder-details-grid">
              <div className="founder-detail-group">
                <h3>EXPERTISE</h3>
                <ul className="founder-skill-list">
                  {capabilities.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
              <div className="founder-detail-group">
                <h3>SELECTED WORK</h3>
                <ul className="founder-project-list">
                  {selectedProjects.map((project, i) => <li key={project}><span>{String(i + 1).padStart(2, '0')}</span>{project}</li>)}
                </ul>
              </div>
            </div>
            <div className="founder-contact">
              <a href="https://github.com/FARHANALi-DEve" target="_blank" rel="noopener noreferrer" aria-label="View Farhan Ali on GitHub"><Github size={17}/> GitHub <ArrowUpRight size={14}/></a>
              <a href="https://www.linkedin.com/in/farhan-ali-985901241/" target="_blank" rel="noopener noreferrer" aria-label="View Farhan Ali on LinkedIn"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={14}/></a>
              <a href="mailto:farhan2545426@gmail.com" aria-label="Email Farhan Ali"><Mail size={17}/> Email <ArrowUpRight size={14}/></a>
            </div>
          </div>
        </section>

        <div className="footer-rule"/>
        <div className="footer-bottom">
          <Link href="/" className="footer-wordmark">LUXORA <small>ESTATE</small></Link>
          <div className="footer-links">
            <Link href="/properties">Residences</Link>
            <Link href="/experience">3D experience</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin">Owner access</Link>
          </div>
          <span>© {new Date().getFullYear()} LUXORA ESTATE · Concept by Farhan Ali</span>
        </div>
        <p className="demo-disclaimer">Demonstration website. Properties, prices and availability are fictional examples.</p>
      </div>
    </footer>
  );
}
