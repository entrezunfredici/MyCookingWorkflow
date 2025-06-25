import React from 'react'; // React is implicitly imported by bundlers like Vite/Next.js but it's good practice to keep it.
import ThemeSwitcher from './ThemeSwitcher.jsx';

const NavBar = () => {
  // Components return JSX (JavaScript XML), which looks like HTML
    return (
        <div>
            <h1>My Cooking Workflow!</h1>
            <button id="switch_theme">light_mode</button>
            <button id="switch_to_main">main page</button>
            <ThemeSwitcher />
        </div>
    );
}

// Don't forget to export your component so it can be used elsewhere!
export default NavBar;
