import styles from './Button.module.css';

/** Lien-bouton (primary | secondary). Les liens externes s'ouvrent dans un nouvel onglet. */
export default function Button({ href, variant = 'primary', external = false, download = false, children, ...rest }) {
  const cls = `${styles.btn} ${variant === 'primary' ? styles.primary : styles.secondary}`;
  const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a href={href} className={cls} download={download ? '' : undefined} {...extra} {...rest}>
      {children}
    </a>
  );
}
