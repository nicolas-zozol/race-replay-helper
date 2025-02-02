import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.company.title")}</h3>
            <p className="text-muted">{t("footer.company.description")}</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.legal.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted hover:text-white transition-colors">
                  {t("footer.legal.privacy")}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted hover:text-white transition-colors">
                  {t("footer.legal.terms")}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted hover:text-white transition-colors">
                  {t("footer.legal.blog")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted hover:text-white transition-colors">
                  {t("footer.legal.contact")}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.connect.title")}</h3>
            
            <p className="text-muted mb-2">{t("footer.connect.description")}</p>
            <Link 
              to="/contact" 
              className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
            >
              {t("footer.connect.cta")}
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-muted">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};