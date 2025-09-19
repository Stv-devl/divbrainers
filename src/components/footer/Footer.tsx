'use client';

import { iconsMap } from '@/constante/iconsMap';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';

/**
 * Footer component displaying legal information, support links and social media
 * @returns {JSX.Element} The footer component
 */
const Footer = () => {
  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  const footerLinks = [
    {
      title: t('footer.legal.title'),
      links: [
        t('footer.legal.links.notice'),
        t('footer.legal.links.privacy'),
        t('footer.legal.links.cookies'),
      ],
    },
    {
      title: t('footer.support.title'),
      links: [t('footer.support.links.contact'), t('footer.support.links.faq')],
    },
    {
      title: t('footer.social.title'),
      links: [
        t('footer.social.links.linkedin'),
        t('footer.social.links.github'),
      ],
    },
  ];

  return (
    <footer className="relative z-80 w-full bg-blue-100 py-5 sm:py-10 ">
      <div className="max-w-screen-xl w-full mx-auto px-6 flex flex-col items-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {footerLinks.map((section, index) => (
            <ul key={index} className="space-y-2 flex flex-col items-center">
              <li className="font-bold text-base">{section.title}</li>
              {section.links.map((link, linkIndex) => (
                <li
                  key={linkIndex}
                  className="text-sm cursor-pointer hover:underline"
                >
                  {link}
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-3 text-sm text-gray-600 text-center">
          <iconsMap.IconLogo className="w-6 h-6" />
          <p>{t('landing.footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
