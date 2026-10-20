import { useApp } from '../context/AppContext.jsx';
import skills from '../data/skills.json';
import SectionHeader from './SectionHeader.jsx';
import styles from './Skills.module.css';

const CATEGORY_ORDER = ['ai', 'mlops', 'data', 'tools', 'web'];

export default function Skills() {
  const { t } = useApp();

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className={styles.container}>
        <SectionHeader id="skills-title" eyebrow="02" title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className={styles.grid}>
          {CATEGORY_ORDER.map((cat) => {
            const items = skills.filter((s) => s.category === cat);
            return (
              <article key={cat} className={`${styles.card} ${cat === 'web' ? styles.wide : ''}`}>
                <h3 className={styles.cardTitle}>{t.skills.categories[cat]}</h3>
                <ul className={styles.list}>
                  {items.map((skill) => (
                    <li key={skill.id} className={styles.item}>
                      <span className={styles.logo}>
                        <img
                          src={`/images/skills/${skill.image}.webp`}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className={styles.name}>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
