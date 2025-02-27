import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale, getMessages} from 'next-intl/server';
import {ReactNode} from 'react';
import BaseLayout from '@/components/BaseLayout';
import {routing} from '@/i18n/routing';

type Props = {
  children: ReactNode;
  params: {locale: string};
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params: {locale}
}: Omit<Props, 'children'>) {
  const t = await getTranslations({locale, namespace: 'LocaleLayout'});

  return {
    title: t('title')
  };
}




export default async function LocaleLayout({
  children,
  params: {locale}
}: Props) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <BaseLayout locale={locale}>{children}</BaseLayout>
    </NextIntlClientProvider>
  );
}
