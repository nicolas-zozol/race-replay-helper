import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Race Replay Helper</h3>
            <p className="text-muted">Never miss an exciting race moment again.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <p className="text-muted mb-2">Questions? We're here to help.</p>
            <Link 
              to="/contact" 
              className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-muted">
          <p>&copy; {new Date().getFullYear()} Race Replay Helper. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};