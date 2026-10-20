import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { useHideOnScroll } from '../hooks/useScrollDirection.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons.jsx';
import styles from './Navbar.module.css';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact'];
const LINKS = ['about', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const { t, lang, setLang, theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const hidden = useHideOnScroll(80, open);
  const active = useActiveSection(SECTION_IDS);
  const toggleRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  // Verrouille le défilement derrière le menu mobile + fermeture avec Échap
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (toggleRef.current) toggleRef.current.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  const themeLabel = theme === 'dark' ? t.controls.switchToLight : t.controls.switchToDark;

  return (
    <header className={`${styles.header} ${hidden ? styles.hidden : ''} ${open ? styles.open : ''}`}>
      <a href="#contenu" className={styles.skip}>
        {lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}
      </a>
      <nav className={styles.nav} aria-label={t.nav.primary}>
        <Link to="/#home" className={styles.logo} aria-label={t.nav.logoLabel} onClick={close}>
          <img src="/images/logo-mark.png" alt="" width="29" height="30" decoding="async" />
        </Link>

        <ul id="menu-principal" className={styles.links}>
          {LINKS.map((id) => (
            <li key={id}>
              <Link
                to={`/#${id}`}
                className={`${styles.link} ${active === id ? styles.active : ''}`}
                aria-current={active === id ? 'true' : undefined}
                onClick={close}
              >
                {t.nav[id]}
              </Link>
            </li>
          ))}
          <li className={styles.mobileControls}>
            <div className={styles.langGroup} role="group" aria-label={t.controls.language}>
              {['fr', 'en'].map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`${styles.langBtn} ${lang === code ? styles.langActive : ''}`}
                  aria-pressed={lang === code}
                  onClick={() => setLang(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </li>
        </ul>

        <div className={styles.actions}>
          <div className={`${styles.langGroup} ${styles.desktopOnly}`} role="group" aria-label={t.controls.language}>
            {['fr', 'en'].map((code) => (
              <button
                key={code}
                type="button"
                className={`${styles.langBtn} ${lang === code ? styles.langActive : ''}`}
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <button type="button" className={styles.iconBtn} onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            ref={toggleRef}
            type="button"
            className={`${styles.iconBtn} ${styles.burger}`}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
    </header>
  );
}
