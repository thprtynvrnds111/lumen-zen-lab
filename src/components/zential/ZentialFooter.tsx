import { Link } from "react-router-dom";
import { ZentialLogo } from "@/components/zential/ZentialLogo";
import { useTranslation } from "react-i18next";

type FooterLinkKey = 'allDevices' | 'bundles' | 'journal' | 'fiveStepMethod' | 'eveningProtocol' | 'howItWorks' | 'microcurrent' | 'redLightTherapy' | 'ems' | 'thermalTherapy' | 'theScience' | 'contact' | 'shipping' | 'returns' | 'faq' | 'privacyPolicy' | 'termsOfService';

const footerLinks: { section: string; links: { key: FooterLinkKey; to: string }[] }[] = [
  {
    section: 'Shop',
    links: [
      { key: 'allDevices', to: '/#devices' },
      { key: 'bundles', to: '/#bundles' },
      { key: 'journal', to: '/journal' },
    ],
  },
  {
    section: 'Ritual',
    links: [
      { key: 'fiveStepMethod', to: '/#ritual' },
      { key: 'eveningProtocol', to: '/journal/evening-protocol' },
      { key: 'howItWorks', to: '/journal/microcurrent-collagen' },
    ],
  },
  {
    section: 'Technology',
    links: [
      { key: 'microcurrent', to: '/technology/microcurrent' },
      { key: 'redLightTherapy', to: '/technology/red-light' },
      { key: 'ems', to: '/technology/ems' },
      { key: 'thermalTherapy', to: '/technology/thermal' },
      { key: 'theScience', to: '/science' },
    ],
  },
  {
    section: 'Support',
    links: [
      { key: 'contact', to: '/support' },
      { key: 'shipping', to: '/shipping' },
      { key: 'returns', to: '/returns' },
      { key: 'faq', to: '/faq' },
    ],
  },
  {
    section: 'Legal',
    links: [
      { key: 'privacyPolicy', to: '/privacy' },
      { key: 'termsOfService', to: '/terms' },
    ],
  },
];

export function ZentialFooter() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-foreground text-background/70">
      <div className="section-padding">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {footerLinks.map(({ section, links }) => (
            <div key={section}>
              <h3 className="text-xs tracking-[0.2em] uppercase text-background/40 mb-4">
                {t(`footer.sections.${section}`)}
              </h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.key}>
                    <Link to={link.to} className="text-sm hover:text-background transition-colors">
                      {t(`footer.links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" aria-label="Zential Pure — Home">
            <ZentialLogo size="md" variant="white" />
          </Link>
          <div className="text-right md:text-right">
            <p className="text-[10px] tracking-[0.2em] uppercase text-background/30 mb-1">{t('footer.tagline')}</p>
            <p className="text-xs text-background/40">{t('footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
