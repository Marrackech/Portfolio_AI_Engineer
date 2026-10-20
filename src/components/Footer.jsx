import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import profile from '../data/profile.json';
import { ArrowUpIcon, GithubIcon, HuggingFaceIcon } from './Icons.jsx';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.meta}>
          <p className={styles.copy}>
            © {year} {profile.name}. {t.footer.rights}
          </p>
          <p className={styles.built}>{t.footer.builtWith}</p>
        </div>

        <div className={styles.right}>
          <ul className={styles.socials}>
            <li>
              <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
            </li>
            <li>
              <a href={profile.contact.huggingface} target="_blank" rel="noopener noreferrer" aria-label="Hugging Face">
                <HuggingFaceIcon size={18} />
              </a>
            </li>
          </ul>
          <Link to="/#home" className={styles.top}>
            <ArrowUpIcon size={16} />
            {t.footer.backToTop}
          </Link>
        </div>
      </div>
    </footer>
  );
}
