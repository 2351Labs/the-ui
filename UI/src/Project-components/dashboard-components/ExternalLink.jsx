import "../../css/ExternalLink.css";
export default function ExternalLink({ title, url, description, type }) {
  const linkSVG = (
    <svg
      className="linkSVG"
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.16488 13.6504C7.92513 13.8742 7.73958 14.024 7.54996 14.1335C6.62175 14.6694 5.47816 14.6694 4.54996 14.1335C4.20791 13.936 3.87912 13.6072 3.22153 12.9497C2.56394 12.2921 2.23514 11.9633 2.03767 11.6212C1.50177 10.693 1.50177 9.54938 2.03767 8.62118C2.23514 8.27918 2.56394 7.95038 3.22153 7.29278L6.04996 4.46436C6.70755 3.80677 7.03634 3.47797 7.37838 3.2805C8.30659 2.7446 9.4502 2.7446 10.3784 3.28049C10.7204 3.47797 11.0492 3.80677 11.7068 4.46436C12.3644 5.12195 12.6932 5.45074 12.8907 5.79278C13.4266 6.72098 13.4266 7.86458 12.8907 8.79278C12.7812 8.98238 12.6314 9.16798 12.4075 9.40768M9.5919 6.59208C9.368 6.83178 9.2182 7.01738 9.1087 7.20698C8.57284 8.13518 8.57284 9.27878 9.1087 10.207C9.3062 10.5491 9.635 10.8779 10.2926 11.5354C10.9502 12.193 11.279 12.5218 11.621 12.7193C12.5492 13.2552 13.6928 13.2552 14.621 12.7193C14.9631 12.5218 15.2919 12.193 15.9495 11.5354L18.7779 8.70698C19.4355 8.04938 19.7643 7.72058 19.9617 7.37858C20.4976 6.45038 20.4976 5.30677 19.9617 4.37857C19.7643 4.03653 19.4355 3.70773 18.7779 3.05014C18.1203 2.39255 17.7915 2.06376 17.4495 1.86628C16.5212 1.33038 15.3777 1.33038 14.4495 1.86628C14.2598 1.97576 14.0743 2.12559 13.8345 2.34943"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
  const gitHubSVG = (
    <svg
      className="gitHubSVG"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_258_24)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 0C15.523 0 20 4.58993 20 10.2529C20 14.7819 17.138 18.624 13.167 19.981C12.66 20.082 12.48 19.7618 12.48 19.4888C12.48 19.1508 12.492 18.0468 12.492 16.6748C12.492 15.7188 12.172 15.0949 11.813 14.7769C14.04 14.5229 16.38 13.6558 16.38 9.71777C16.38 8.59777 15.992 7.68382 15.35 6.96582C15.454 6.70682 15.797 5.66395 15.252 4.25195C15.252 4.25195 14.414 3.97722 12.505 5.30322C11.706 5.07622 10.85 4.96201 10 4.95801C9.15 4.96201 8.295 5.07622 7.497 5.30322C5.586 3.97722 4.746 4.25195 4.746 4.25195C4.203 5.66395 4.546 6.70682 4.649 6.96582C4.01 7.68382 3.619 8.59777 3.619 9.71777C3.619 13.6458 5.954 14.5262 8.175 14.7852C7.889 15.0412 7.63 15.4928 7.54 16.1558C6.97 16.4178 5.522 16.8712 4.63 15.3042C4.63 15.3042 4.101 14.3191 3.097 14.2471C3.097 14.2471 2.122 14.2341 3.029 14.8701C3.029 14.8701 3.684 15.1851 4.139 16.3701C4.139 16.3701 4.726 18.2001 7.508 17.5801C7.513 18.4371 7.522 19.2448 7.522 19.4888C7.522 19.7598 7.338 20.0769 6.839 19.9819C2.865 18.6269 0 14.7829 0 10.2529C0 4.58993 4.478 0 10 0Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_258_24">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  function getMainDomain(url) {
    try {
      const hostname = new URL(url).hostname;
      // Split the hostname into parts
      const parts = hostname.split(".");
      const length = parts.length;

      // Handle cases like "co.uk"
      if (length >= 2) {
        // Special handling for domains with known second-level TLDs (e.g., "co.uk", "gov.uk")
        const commonTLDs = ["co.uk", "org.uk", "gov.uk", "ac.uk"];
        const lastTwo = parts.slice(-2).join(".");

        if (commonTLDs.includes(lastTwo) && length > 2) {
          return parts.slice(-3).join("."); // e.g., "bbc.co.uk" from "news.bbc.co.uk"
        }

        return lastTwo; // Default to "example.com" from "sub.example.com"
      }
      return hostname;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  }
  const mainDomain = getMainDomain(url);
  return (
    <div className="document-info-container ExternalLink">
      {/* override if github to use better looking SVG */}
      {mainDomain === "github.com" ? (
        gitHubSVG
      ) : (
        <img
          src={`https://www.google.com/s2/favicons?sz=64&domain=${mainDomain}`}
        />
      )}
      <div className="doc-info-wrapper">
        <div className="document-info-sub-container">
          <a href={url}>
            <div className="title-link-container">
              <div className="document-title">{title}</div>
              {linkSVG}
            </div>
          </a>

          {type && <div className="type">{type}</div>}
        </div>
        <div className="link-description">{description}</div>
      </div>
    </div>
  );
}
