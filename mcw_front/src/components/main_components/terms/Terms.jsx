import React from 'react'; // React is implicitly imported by bundlers like Vite/Next.js but it's good practice to keep it.

const Terms = () => {
  // Components return JSX (JavaScript XML), which looks like HTML
    return (
        <div id="terms">
            <h1>created by Fredissimo</h1>
        </div>
    );
}

// Don't forget to export your component so it can be used elsewhere!
export default Terms;
