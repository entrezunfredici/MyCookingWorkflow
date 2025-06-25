import React from 'react'; // React is implicitly imported by bundlers like Vite/Next.js but it's good practice to keep it.

function navbar() {
  // Components return JSX (JavaScript XML), which looks like HTML
    return (
        <div>
            <h1>My Cooking Workflow!</h1>
            <button id="switch_to_main">main page</button>
        </div>
    );
}

// Don't forget to export your component so it can be used elsewhere!
export default navbar;
