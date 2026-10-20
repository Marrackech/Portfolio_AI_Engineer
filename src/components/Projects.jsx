import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import projects from '../data/projects.json';
import SectionHeader from './SectionHeader.jsx';
import { ExternalIcon } from './Icons.jsx';
import styles from './Projects.module.css';

const FILTERS = ['all', 'ml', 'mlops', 'vision', 'llm', 'dl', 'data'];

export default function Projects() {
  const { t, pick } = useApp();
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.categories.indexOf(filter) !== -1)),
    [filter]
  );

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className={styles.container}>
        <SectionHeader id="projects-title" eyebrow="03" title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label={t.projects.filterLabel}>
            {FILTERS.map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.chip} ${filter === key ? styles.chipActive : ''}`}
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {t.projects.filters[key]}
              </button>
            ))}
          </div>
          <p className={styles.count} aria-live="polite">
            {t.projects.count(visible.length)}
          </p>
        </div>

        <ul className={styles.grid}>
          {visible.map((project) => {
            const title = pick(project.title);
            return (
              <li key={project.id} className={styles.item}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  aria-label={`${title} — ${t.projects.viewCode}`}
                >
                  <div className={styles.media} style={{ backgroundColor: project.bg }}>
                    <img
                      src={`/images/projects/${project.image}.webp`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={`${styles.image} ${project.fit === 'contain' ? styles.contain : ''}`}
                    />
                  </div>
                  <div className={styles.body}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{pick(project.description)}</p>
                    <ul className={styles.tags}>
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <span className={styles.link}>
                      {t.projects.viewCode}
                      <ExternalIcon size={16} />
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
