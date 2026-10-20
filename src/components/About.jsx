import { useApp } from '../context/AppContext.jsx';
import profile from '../data/profile.json';
import projects from '../data/projects.json';
import { CV_FILE } from '../cv.js';
import Button from './Button.jsx';
import SectionHeader from './SectionHeader.jsx';
import { AwardIcon, CheckCircleIcon, ClockIcon, DownloadIcon, FolderIcon, GithubIcon, HuggingFaceIcon } from './Icons.jsx';
import styles from './About.module.css';

export default function About() {
  const { t, pick, lang } = useApp();
  const k = t.about.kpi;

  const kpis = [
    { Icon: AwardIcon, value: String(profile.kpis.level), unit: k.level, label: k.levelLabel, prefix: true },
    { Icon: ClockIcon, value: String(profile.kpis.months), unit: k.duration, label: k.durationLabel },
    { Icon: CheckCircleIcon, value: k.status, unit: '', label: k.statusLabel, text: true },
    { Icon: FolderIcon, value: String(projects.length), unit: k.projects, label: k.projectsLabel },
  ];

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.container}>
        <SectionHeader id="about-title" eyebrow="01" title={t.about.title} subtitle={t.about.subtitle} />

        <ul className={styles.kpis}>
          {kpis.map(({ Icon, value, unit, label, prefix, text }) => (
            <li key={label} className={styles.kpi}>
              <span className={styles.kpiIcon}>
                <Icon size={20} />
              </span>
              <p className={`${styles.kpiValue} ${text ? styles.kpiText : ''}`}>
                {prefix && unit ? <span className={styles.kpiUnit}>{unit}&nbsp;</span> : null}
                {value}
                {!prefix && unit ? <span className={styles.kpiUnit}>&nbsp;{unit}</span> : null}
              </p>
              <p className={styles.kpiLabel}>{label}</p>
            </li>
          ))}
        </ul>

        <div className={styles.profile}>
          <div className={styles.photoWrap}>
            <img
              src="/images/haroun.webp"
              alt={t.about.photoAlt}
              width="720"
              height="960"
              loading="lazy"
              decoding="async"
              className={styles.photo}
            />
          </div>

          <div className={styles.profileBody}>
            <p className={styles.cardLabel}>{t.about.profileTitle}</p>
            <h3 className={styles.profileName}>{profile.name}</h3>
            <p className={styles.profileRole}>{pick(profile.title)}</p>

            <div className={styles.bio}>
              {profile.bio[lang].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className={`${styles.cardLabel} ${styles.focusLabel}`}>{t.about.focusTitle}</p>
            <ul className={styles.focus}>
              {t.about.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className={styles.actions}>
              {CV_FILE && (
                <Button href={CV_FILE} download>
                  <DownloadIcon size={18} />
                  {t.hero.downloadCv}
                </Button>
              )}
              <Button href={profile.contact.github} variant="secondary" external>
                <GithubIcon size={18} />
                GitHub
              </Button>
              <Button href={profile.contact.huggingface} variant="secondary" external>
                <HuggingFaceIcon size={18} />
                Hugging Face
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
