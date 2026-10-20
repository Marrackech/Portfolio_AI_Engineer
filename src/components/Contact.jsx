import { useApp } from '../context/AppContext.jsx';
import profile from '../data/profile.json';
import SectionHeader from './SectionHeader.jsx';
import { GithubIcon, HuggingFaceIcon, LinkedinIcon, MailIcon, PhoneIcon, PinIcon, ExternalIcon } from './Icons.jsx';
import styles from './Contact.module.css';

export default function Contact() {
  const { t, pick } = useApp();
  const c = profile.contact;
  const city = pick(c.city);

  // Seuls les champs renseignés dans src/data/profile.json sont affichés
  const items = [
    c.email && { key: 'email', Icon: MailIcon, label: t.contact.email, value: c.email, href: `mailto:${c.email}` },
    c.phone && { key: 'phone', Icon: PhoneIcon, label: t.contact.phone, value: c.phone, href: `tel:${c.phoneHref || c.phone}` },
    city && { key: 'city', Icon: PinIcon, label: t.contact.city, value: city },
    c.github && { key: 'github', Icon: GithubIcon, label: t.contact.github, value: c.github.replace('https://', ''), href: c.github, external: true },
    c.huggingface && { key: 'hf', Icon: HuggingFaceIcon, label: t.contact.huggingface, value: c.huggingface.replace('https://', ''), href: c.huggingface, external: true },
    c.linkedin && { key: 'linkedin', Icon: LinkedinIcon, label: t.contact.linkedin, value: c.linkedin.replace('https://', '').replace('www.', ''), href: c.linkedin, external: true },
  ].filter(Boolean);

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.container}>
        <SectionHeader id="contact-title" eyebrow="04" title={t.contact.title} subtitle={t.contact.subtitle} />

        <ul className={styles.grid}>
          {items.map(({ key, Icon, label, value, href, external }) => {
            const inner = (
              <>
                <span className={styles.icon}>
                  <Icon size={22} />
                </span>
                <span className={styles.text}>
                  <span className={styles.label}>{label}</span>
                  <span className={styles.value}>{value}</span>
                </span>
                {external && <ExternalIcon size={16} className={styles.ext} />}
              </>
            );
            return (
              <li key={key}>
                {href ? (
                  <a
                    href={href}
                    className={styles.card}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={`${styles.card} ${styles.static}`}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
