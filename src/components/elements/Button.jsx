import clsx from 'clsx';
import {Link} from '@shopify/hydrogen';

export function Button({
  as = 'button',
  className = '',
  variant = '',
  width = '',
  ...props
}) {
  const Component = props?.to ? Link : as;

  // const baseButtonClasses = 'inline-block py-3 px-6';

  const variants = {
    primary: `btn-prim`,
    secondary: `btn-sec`,
    inline: 'border-b border-primary/10 leading-none pb-1',
  };

  const widths = {
    auto: 'w-auto',
    full: 'w-full',
  };

  const styles = clsx(
    missingClass(className, 'bg-') && variants[variant],
    missingClass(className, 'w-') && widths[width],
    className,
  );

  return <Component className={styles} {...props} />;
}

export function missingClass(string, prefix) {
  if (!string) {
    return true;
  }

  const regex = new RegExp(` ?${prefix}`, 'g');
  return string.match(regex) === null;
}
