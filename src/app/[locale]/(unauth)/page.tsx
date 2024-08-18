import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Home from '@/components/home/Home';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Index(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);

  return (
    <div>
      <div className="mx-auto flex max-w-6xl flex-col">
        <Home />
      </div>
    </div>
  );
}
