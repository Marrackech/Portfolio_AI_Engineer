import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import profile from '../data/profile.json';
import { CV_FILE } from '../cv.js';
import Button from './Button.jsx';
import { ActivityIcon, ArrowRightIcon, CpuIcon, DatabaseIcon, DownloadIcon, ServerIcon, GithubIcon, HuggingFaceIcon } from './Icons.jsx';
import styles from './Hero.module.css';


const STEP_ICONS = [DatabaseIcon, CpuIcon, ServerIcon, ActivityIcon];

export default function Hero() {
  const { t, pick } = useApp();

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.kicker}>
            <span className={styles.dot} aria-hidden="true" />
            {t.hero.kicker}
          </p>
          <p className={styles.greeting}>{t.hero.greeting}</p>
          <h1 id="hero-title" className={styles.name}>
            {profile.name}
          </h1>
          <p className={styles.role}>{pick(profile.title)}</p>
          <p className={styles.tagline}>{pick(profile.tagline)}</p>

          <div className={styles.actions}>
            <Link to="/#projects" className={styles.ctaLink}>
              <span className={styles.ctaInner}>
                {t.hero.seeProjects}
                <ArrowRightIcon size={18} />
              </span>
            </Link>
            {CV_FILE ? (
              <Button href={CV_FILE} variant="secondary" download>
                <DownloadIcon size={18} />
                {t.hero.downloadCv}
              </Button>
            ) : (
              <Link to="/#contact" className={styles.secondaryLink}>
                {t.hero.contactMe}
              </Link>
            )}
          </div>

          <ul className={styles.socials}>
            <li>
              <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon />
              </a>
            </li>
            <li>
              <a href={profile.contact.huggingface} target="_blank" rel="noopener noreferrer" aria-label="Hugging Face">
                <HuggingFaceIcon />
              </a>
            </li>
          </ul>
        </div>

        <aside className={styles.pipeline} aria-label={t.hero.pipelineTitle}>
          <p className={styles.pipelineTitle}>{t.hero.pipelineTitle}</p>
          <ol className={styles.steps}>
            {t.hero.pipeline.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepIcon}>
                    <Icon size={20} />
                  </span>
                  <span className={styles.stepText}>
                    <strong>{step.title}</strong>
                    <span>{step.text}</span>
                  </span>
                  <span className={styles.stepIndex} aria-hidden="true">
                    0{i + 1}
                  </span>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </section>
  );
}
