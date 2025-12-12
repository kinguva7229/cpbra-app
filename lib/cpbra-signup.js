import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/simple-icon.js";

export class CpbraSignup extends DDDSuper(LitElement) {
    static get tag() {
        return "cpbra-signup";
    }

    static get properties() {
        return {
            name: { type: String },
            time: { type: String },
            players: { type: Number },
            court: { type: String },
            submitted: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.name = "";
        this.time = "18:00";
        this.players = 1;
        this.court = "Dreamville";
        this.submitted = false;
    }

    _handleInput(e) {
        const field = e.target.name;
        if (field === "players") {
            this[field] = Number(e.target.value);
        } else {
            this[field] = e.target.value;
        }
    }

    _handleSubmit(e) {
        e.preventDefault();

        this.dispatchEvent(new CustomEvent("player-signed-up", {
            detail: {
                name: this.name,
                players: this.players,
                time: this.time,
                court: this.court
            },
            bubbles: true,
            composed: true
        }));

        this.submitted = true;

        setTimeout(() => {
            this.submitted = false;
            this.name = "";
            this.players = 1;
            this.court = "Dreamville";
        }, 3000);
    }

    static get styles() {
        return [
            super.styles,
            css`
        :host {
          display: block;
          background-color: var(--ddd-theme-default-navy, #003B5C);
          color: var(--ddd-theme-default-white, white);
          padding: var(--ddd-spacing-8) var(--ddd-spacing-4);
          font-family: var(--ddd-font-navigation);
          border-top: 4px solid var(--ddd-theme-default-yellow, #FFB81C);
          text-align: center;
          height: 100%;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
        }

        h2 {
          color: var(--ddd-theme-default-yellow, #FFB81C);
          text-transform: uppercase;
          font-size: 2rem;
          margin: 0 0 var(--ddd-spacing-4);
          font-weight: 900;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-4);
          background: rgba(255, 255, 255, 0.1);
          padding: var(--ddd-spacing-6);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        label {
          text-align: left;
          font-weight: bold;
          font-size: 0.9rem;
          color: var(--ddd-theme-default-linkLight);
        }

        input, select {
          padding: 12px;
          border-radius: 4px;
          border: 1px solid var(--ddd-theme-default-navy80);
          background: var(--ddd-theme-default-white);
          font-size: 1rem;
          font-family: var(--ddd-font-primary);
          color: black;
          width: 100%;
          box-sizing: border-box;
        }

        button {
          background-color: var(--ddd-theme-default-yellow, #FFB81C);
          color: var(--ddd-theme-default-navy, #003B5C);
          border: none;
          padding: 16px;
          font-size: 1.2rem;
          font-weight: 900;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s ease;
          margin-top: var(--ddd-spacing-2);
        }

        button:hover {
          background-color: var(--ddd-theme-default-white);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .success-message {
          animation: fadeIn 0.5s ease;
          background: var(--ddd-theme-default-accentLight, #5D9981);
          color: white;
          padding: 20px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 1.2rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `
        ];
    }

    render() {
        return html`
      <div class="container">
        ${this.submitted ? html`
          <div class="success-message">
            <simple-icon icon="check" style="margin-right:8px;"></simple-icon>
            You're on the list! The court queue has been updated.
          </div>
        ` : html`
          <h2>Get Next</h2>
          <p style="margin-bottom: 24px;">Reserve your spot on a specific court.</p>
          
          <form @submit="${this._handleSubmit}">
            
            <div style="display:flex; flex-direction:column; gap:8px;">
              <label>Squad / Player Name</label>
              <input type="text" name="name" .value="${this.name}" @input="${this._handleInput}" required placeholder="e.g. The Ringers">
            </div>

            <div style="display:flex; flex-direction:column; gap:8px;">
              <label>Select Court</label>
              <select name="court" .value="${this.court}" @change="${this._handleInput}">
                <option value="Dreamville">Dreamville (Full Court)</option>
                <option value="The Cage">The Cage (Street Rules)</option>
                <option value="Rookie Run">Rookie Run (Half Court)</option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div style="display:flex; flex-direction:column; gap:8px;">
                <label>Arrival Time</label>
                <input type="time" name="time" .value="${this.time}" @input="${this._handleInput}" required>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <label>Headcount</label>
                <input type="number" name="players" min="1" max="10" .value="${String(this.players)}" @input="${this._handleInput}" required>
              </div>
            </div>

            <button type="submit">Join Queue</button>
          </form>
        `}
      </div>
    `;
    }
}

customElements.define(CpbraSignup.tag, CpbraSignup);