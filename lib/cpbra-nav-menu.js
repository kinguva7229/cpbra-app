import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/simple-icon.js"; // Needed for the hamburger icon
import "./cpbra-cta.js";

export class CpbraNavMenu extends DDDSuper(LitElement) {
  static get tag() {
    return "cpbra-nav-menu";
  }

  static get properties() {
    return {
      items: { type: Array },
      activeRoute: { type: String, attribute: "active-route" },
      collapsed: { type: Boolean, reflect: true } // State for collapsing
    };
  }

  constructor() {
    super();
    this.items = [];
    this.activeRoute = "/";
    this.collapsed = true; // Start collapsed on mobile
    this._fetchMenuData();
  }

  // --- Menu Data Fetch (No changes from your latest file) ---
  async _fetchMenuData() {
    try {
      const response = await fetch('/api/menu.json');
      if (response.ok) {
        const json = await response.json();
        this.items = json.items || json;
      } else {
        throw new Error('API Error');
      }
    } catch (e) {
      this.items = [
        { label: "Home", route: "/", icon: "home" },
        { label: "Schedule", route: "/schedule", icon: "event" },
        { label: "Gallery", route: "/gallery", icon: "image:collections" },
        { label: "Join", route: "/join", icon: "add" }
      ];
    }
  }

  // --- Routing and Collapse Logic ---
  _handleLinkClick(e, route) {
    e.preventDefault();

    // Query Parameter Routing (as updated in the prior step)
    const newRoute = route === '/' ? '/' : `/?page=${route.substring(1)}`;
    window.history.pushState({}, "", newRoute);

    // Dispatch the clean, internal route to the app
    const event = new CustomEvent("route-changed", {
      detail: { route: route },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);

    // Collapse the menu after a link is clicked
    if (!this.collapsed) {
      this.collapsed = true;
    }
  }

  toggleMenu() {
    this.collapsed = !this.collapsed;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100%;
          /* FIX: Use theme variable for background and accent color */
          background-color: var(--theme-bg-content-dark);
          border-bottom: 2px solid var(--theme-color-accent); /* Used accent for border */
          
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--ddd-box-shadow-md);
          transition: background-color 0.3s ease;
        }

        .menu-header {
            display: flex;
            justify-content: center; /* Center on desktop */
            align-items: center;
            padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
        }
        
        /* FIX: Ensure menu title text uses theme color */
        .menu-header > div {
            color: var(--theme-color-accent); /* Use accent color for menu title/text */
        }

        .menu-toggle {
            display: none; 
            background: transparent;
            border: none;
            /* FIX: Use theme text color for icon */
            color: var(--theme-color-text-light); 
            cursor: pointer;
            padding: var(--ddd-spacing-2, 8px);
        }
        
        .nav-wrapper {
            display: flex; 
            justify-content: center;
            align-items: center;
            gap: var(--ddd-spacing-4);
            max-width: 1400px;
            margin: 0 auto;
            overflow-x: auto;
        }

        /* --- Mobile Styles --- */
        @media (max-width: 768px) {
            .menu-header {
                justify-content: space-between; /* Adjusted for better spacing on mobile */
            }
            .menu-toggle {
                display: block; 
                order: 1; /* Place toggle on the right side */
            }
            .menu-header > div {
                margin-right: 0; /* Clear previous margin */
            }
            
            .nav-wrapper {
                display: none; 
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                /* FIX: Use secondary dark content for dropdown background */
                background-color: var(--theme-bg-content-dark-secondary);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
                padding-bottom: var(--ddd-spacing-4);
                align-items: stretch; 
            }
            
            :host([collapsed="false"]) .nav-wrapper {
                display: flex; 
            }
            
            /* Make CTA buttons fill the width in the dropdown */
            .nav-wrapper cpbra-cta {
                width: 90%;
                margin: 0 auto;
            }
        }
      
      `
    ];
  }

  render() {
    const cleanRoute = this.activeRoute.split('?')[0];

    return html`
        <div class="menu-header">
            <div style="color: var(--ddd-theme-default-white); font-weight: bold; margin-right: auto;">MENU</div> 
            
            <button class="menu-toggle" @click="${this.toggleMenu}">
                <simple-icon icon="${this.collapsed ? 'menu' : 'close'}"></simple-icon>
            </button>
            
            <nav class="nav-wrapper">
                ${this.items.map(item => html`
                <cpbra-cta 
                    @click="${(e) => this._handleLinkClick(e, item.route || item.location)}"
                    label="${item.label || item.title}" 
                    url="${item.route || item.location}" 
                    icon="${item.icon}"
                    size="md"
                    variant="${cleanRoute === (item.route || item.location) ? 'primary' : 'outline'}"
                ></cpbra-cta>
                `)}
            </nav>
        </div>
    `;
  }
}

customElements.define(CpbraNavMenu.tag, CpbraNavMenu);