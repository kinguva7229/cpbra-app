import { LitElement, html, css } from "lit";

export class CpbraCta extends LitElement {
  static get tag() {
    return "cpbra-cta";
  }

  static get properties() {
    return {
      label: { type: String },
      url: { type: String },
      variant: { type: String }, // primary, secondary, outline
      size: { type: String }, // sm, md, lg
      icon: { type: String },
      block: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.label = "Click Me";
    this.url = "#";
    this.variant = "primary";
    this.size = "md";
    this.icon = "";
    this.block = false;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      a {
        text-decoration: none;
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border: none;
        cursor: pointer;
        font-weight: 600;
        font-family: var(--ddd-font-navigation, "Inter", sans-serif);
        border-radius: 0.375rem;
        transition: 0.2s ease-in-out;
        color: var(--psu-white, #ffffff);
      }

      /* Sizes */
      button[size="sm"] {
        padding: 0.35rem 0.75rem;
        font-size: 0.9rem;
      }

      button[size="md"] {
        padding: 0.55rem 1.2rem;
        font-size: 1rem;
      }

      button[size="lg"] {
        padding: 0.8rem 1.6rem;
        font-size: 1.15rem;
      }

      /* Variants */
      button[variant="primary"] {
        background: var(--psu-blue, #1e407c);
      }

      button[variant="primary"]:hover {
        background: var(--psu-navy, #003b5c);
      }

      button[variant="secondary"] {
        background: var(--psu-gray, #a7a8aa);
        color: black;
      }

      button[variant="outline"] {
        background: transparent;
        color: var(--psu-blue, #1e407c);
        border: 2px solid var(--psu-blue, #1e407c);
      }

      button[variant="outline"]:hover {
        background: var(--psu-blue, #1e407c);
        color: white;
      }

      :host([block]) button {
        width: 100%;
        justify-content: center;
      }
    `;
  }

  render() {
    return html`
      <a href="${this.url}">
        <button
          variant="${this.variant}"
          size="${this.size}"
        >
          ${this.icon
        ? html`<simple-icon icon="${this.icon}"></simple-icon>`
        : ""}
          <slot>${this.label}</slot>
        </button>
      </a>
    `;
  }
}

customElements.define(CpbraCta.tag, CpbraCta);
