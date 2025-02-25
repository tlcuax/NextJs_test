'use client';
import {useTranslations} from 'next-intl';
export default function Test() {
  const t = useTranslations('IndexPage');
  return (
    <div onClick={() => console.log(66666)}>
      {' '}
      {t.rich('description', {
        code: (chunks) => <code className="font-mono text-white">{chunks}</code>
      })}
    </div>
  );
}
