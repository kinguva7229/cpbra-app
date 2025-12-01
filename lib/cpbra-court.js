import { LitElement, html, css } from "lit";

export class CpbraCourt extends LitElement {
    static get tag() {
        return "cpbra-court";
    }

    static get properties() {
        return {
            players: { type: Array },
            gameTime: { type: Number },
            ballPos: { type: Object },
        };
    }

    static get styles() {
        return [
            css`
        :host {
          display: block;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          padding: var(--ddd-spacing-4);
        }

        .wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-4);
        }

        /* --- Header --- */
        .header-card {
          background: var(--ddd-theme-default-navy90);
          padding: var(--ddd-spacing-4);
          border-radius: var(--ddd-radius-md);
          border: var(--ddd-border-sm);
          border-color: var(--ddd-theme-default-opportunityGold);
          box-shadow: var(--ddd-boxShadow-md);
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-title {
          font-size: var(--ddd-font-size-xl);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-white);
          margin: 0;
          letter-spacing: var(--ddd-ls-16-sm);
        }

        .header-sub {
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-default-limestoneGray);
        }

        /* --- Stats Row --- */
        .stats {
          display: flex;
          justify-content: space-between;
          background: var(--ddd-theme-default-navy80);
          padding: var(--ddd-spacing-3);
          margin-top: var(--ddd-spacing-3);
          border-radius: var(--ddd-radius-sm);
          border: var(--ddd-border-sm);
          border-color: var(--ddd-theme-default-coalyGray);
        }

        .team-box {
          text-align: center;
        }

        .team-label.blue {
          color: var(--ddd-theme-default-skyBlue);
          font-weight: var(--ddd-font-weight-bold);
        }

        .team-label.red {
          color: var(--ddd-theme-default-original87Pink);
          font-weight: var(--ddd-font-weight-bold);
        }

        .team-count {
          font-size: var(--ddd-font-size-3xl);
          font-weight: var(--ddd-font-weight-bold);
        }

        .time-box {
          text-align: center;
        }

        .time-label {
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-default-limestoneGray);
        }

        .time-value {
          font-size: var(--ddd-font-size-xl);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-white);
        }

        /* --- Court --- */
        .court-container {
          background: linear-gradient(to top, #9a5521, #b46d2f);
          border-radius: var(--ddd-radius-md);
          aspect-ratio: 9/16; /* vertical phone court */
          position: relative;
          overflow: hidden;
          border: 4px solid var(--ddd-theme-default-coalyGray);
          box-shadow: var(--ddd-boxShadow-xl);
        }

        svg.court-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        /* Ball */
        .ball {
          position: absolute;
          width: 1.4rem;
          height: 1.4rem;
          background: #f97316;
          border-radius: var(--ddd-radius-circle);
          border: 2px solid var(--ddd-theme-default-coalyGray);
          transform: translate(-50%, -50%);
        }

        /* Players */
        .player {
          position: absolute;
          transform: translate(-50%, -50%);
        }

        .player-circle {
          width: 2.8rem;
          height: 2.8rem;
          border-radius: var(--ddd-radius-circle);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: var(--ddd-font-weight-bold);
          color: white;
          border: 3px solid;
        }

        .player-circle.blue {
          background: var(--ddd-theme-default-nittanyNavy);
          border-color: var(--ddd-theme-default-skyBlue);
        }

        .player-circle.red {
          background: var(--ddd-theme-default-original87Pink);
          border-color: var(--ddd-theme-default-creekTeal);
        }

        .player-name {
          font-size: var(--ddd-font-size-xs);
          text-align: center;
          margin-top: 4px;
          color: white;
        }
      `,
        ];
    }

    constructor() {
        super();
        this.players = [
            { id: 1, name: "P1", x: 50, y: 20, team: "blue" },
            { id: 2, name: "P2", x: 30, y: 40, team: "blue" },
            { id: 3, name: "P3", x: 70, y: 40, team: "red" },
            { id: 4, name: "P4", x: 30, y: 70, team: "red" },
            { id: 5, name: "P5", x: 70, y: 70, team: "blue" },
        ];
        this.ballPos = { x: 50, y: 50 };
        this.gameTime = 600;
    }

    connectedCallback() {
        super.connectedCallback();
        this.startTimer();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.gameTime = this.gameTime > 0 ? this.gameTime - 1 : 600;
            this.requestUpdate();
        }, 1000);
    }

    getTeamCount(team) {
        return this.players.filter((p) => p.team === team).length;
    }

    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    }

    render() {
        return html`
      <div class="wrapper">
        <!-- HEADER -->
        <div class="header-card">
          <div class="header-top">
            <div>
              <div class="header-title">THE PARK</div>
              <div class="header-sub">LIVE COURT MONITOR</div>
            </div>
          </div>

          <div class="stats">
            <div class="team-box">
              <div class="team-label blue">BLUE</div>
              <div class="team-count">${this.getTeamCount("blue")}</div>
            </div>

            <div class="time-box">
              <div class="time-label">TIME</div>
              <div class="time-value">${this.formatTime(this.gameTime)}</div>
            </div>

            <div class="team-box">
              <div class="team-label red">RED</div>
              <div class="team-count">${this.getTeamCount("red")}</div>
            </div>
          </div>
        </div>

        <!-- COURT -->
        <div class="court-container">
          <svg class="court-lines" viewBox="0 0 100 160">
            <!-- vertical full-court lines -->
            <rect x="2" y="2" width="96" height="156" fill="none" stroke="#000" stroke-width="0.4" />
            <line x1="2" y1="80" x2="98" y2="80" stroke="#000" stroke-width="0.4" />
            <circle cx="50" cy="80" r="10" fill="none" stroke="#000" stroke-width="0.4" />
          </svg>

          <!-- BALL -->
          <div
            class="ball"
            style="left:${this.ballPos.x}%; top:${this.ballPos.y}%;"
          ></div>

          <!-- PLAYERS -->
          ${this.players.map(
            (p) => html`
              <div class="player" style="left:${p.x}%; top:${p.y}%;">
                <div class="player-circle ${p.team}">${p.id}</div>
                <div class="player-name">${p.name}</div>
              </div>
            `
        )}
        </div>
      </div>
    `;
    }
}

customElements.define(CpbraCourt.tag, CpbraCourt);
