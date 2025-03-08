const Footer = () => {
    return (
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CodeGenie AI. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;