import React from 'react'; // React is implicitly imported by bundlers like Vite/Next.js but it's good practice to keep it.
import './Terms.css'

const Terms = () => {
  // Components return JSX (JavaScript XML), which looks like HTML
    return (
        <div className="footer">
            <h1>created by Fredissimo</h1>
        </div>
    );
}

// Don't forget to export your component so it can be used elsewhere!
export default Terms;
