import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class CpbraContentBand extends DDDSuper(LitElement) {
    static get tag() {
        return "cpbra-content-band";
    }

    static get properties() {
        return {
            variant: { type: String, reflect: true },
        };
    }

    constructor() {
        super();
        this.variant = "default";
    }

    static get styles() {
        return [
            super.styles,
            css`
:host {
          display: block;
          width: 100%;
          padding: var(--ddd-spacing-12, 64px) var(--ddd-spacing-4, 16px);
          box-sizing: border-box;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        :host([variant="default"]) {
          background-color: var(--theme-bg-content-dark);
          color: var(--theme-color-text-light); 
        }

        :host([variant="light"]) {
          background-color: var(--theme-bg-page);
          color: var(--theme-color-text-dark);
        }

        :host([variant="accent"]) {
          background-color: var(--theme-color-accent);
          color: var(--theme-color-accent-text);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
      `
        ];
    }

    render() {
        return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
    }
}

customElements.define(CpbraContentBand.tag, CpbraContentBand);