import "../../../css/documentation.css";
import ReadMoreText from "./ReadMoreText.jsx";
import ExternalLink from "../ExternalLink.jsx";
import InfoSVG from "../../../assets/dashboard/catalog-assets/info.svg?react";
import CopySVG from "../../../assets/copy.svg?react";
export default function Documentation({ entityData }) {
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

  const googleDriveSVG = (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.998 6.44288L7.53709 0.335154C7.65199 0.218164 7.78419 0.141424 7.91639 0.0898438C6.89589 0.425734 6.42759 1.57179 6.42759 1.57179L0.105041 12.7267C0.0160809 13.0765 -0.0086291 13.3922 0.0024909 13.6703H6.90329L10.998 6.44288Z"
        fill="#34A853"
      />
      <path
        d="M10.998 6.44288L15.0927 13.6703H21.9935C22.0046 13.3922 21.9799 13.0765 21.8909 12.7267L15.5684 1.57179C15.5684 1.57179 15.0989 0.425734 14.0795 0.0898438C14.2105 0.141424 14.3439 0.218164 14.4588 0.335154L10.998 6.44288Z"
        fill="#FBBC05"
      />
      <path
        d="M10.998 6.44359L14.4589 0.3359C14.344 0.2189 14.2105 0.14216 14.0796 0.09058C13.9288 0.04152 13.767 0.00881 13.5915 0H13.4086H8.58741H8.40451C8.23031 0.00755 8.06721 0.04026 7.91641 0.09058C7.78551 0.14216 7.65201 0.2189 7.53711 0.3359L10.998 6.44359Z"
        fill="#188038"
      />
      <path
        d="M6.90429 13.6704L3.48296 19.709C3.48296 19.709 3.36929 19.6536 3.21484 19.5391C3.70043 19.9128 4.17242 19.992 4.17242 19.992H17.6095C18.3508 19.992 18.5053 19.709 18.5053 19.709C18.5077 19.7077 18.509 19.7064 18.5114 19.7052L15.0926 13.6704H6.90429Z"
        fill="#4285F4"
      />
      <path
        d="M6.9047 13.6704H0.00390625C0.0385063 14.4907 0.394356 14.97 0.394356 14.97L0.653826 15.4203C0.672366 15.4468 0.683486 15.4619 0.683486 15.4619L1.24815 16.4532L2.51586 18.6598C2.55293 18.7491 2.59618 18.8308 2.6419 18.9088C2.65919 18.9353 2.67525 18.9642 2.69379 18.9894C2.69873 18.9969 2.70367 19.0045 2.70862 19.012C2.86554 19.2334 3.04099 19.4045 3.21644 19.5391C3.37089 19.6549 3.48457 19.709 3.48457 19.709L6.9047 13.6704Z"
        fill="#1967D2"
      />
      <path
        d="M15.0928 13.6704H21.9935C21.9589 14.4907 21.6031 14.97 21.6031 14.97L21.3436 15.4203C21.3251 15.4468 21.314 15.4619 21.314 15.4619L20.7493 16.4532L19.4816 18.6598C19.4445 18.7491 19.4013 18.8308 19.3556 18.9088C19.3383 18.9353 19.3222 18.9642 19.3037 18.9894C19.2987 18.9969 19.2938 19.0045 19.2888 19.012C19.1319 19.2334 18.9565 19.4045 18.781 19.5391C18.6266 19.6549 18.5129 19.709 18.5129 19.709L15.0928 13.6704Z"
        fill="#EA4335"
      />
    </svg>
  );

  const notionSVG = (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.716 28.2178L1.27664 23.9331C0.44913 22.9023 0 21.6346 0 20.3299V4.81499C0 2.86064 1.56359 1.23897 3.58071 1.10125L19.5321 0.0121821C20.691 -0.0669359 21.8428 0.241092 22.7948 0.884702L28.3992 4.67391C29.4025 5.35219 30 6.46099 30 7.64426V25.2832C30 27.1958 28.4626 28.7793 26.4876 28.9009L8.78333 29.9907C7.20733 30.0877 5.68399 29.4237 4.716 28.2178Z"
        fill="white"
      />
      <path
        d="M10.2481 12.5788V12.3757C10.2481 11.8608 10.6605 11.4338 11.192 11.3983L15.0633 11.1398L20.417 19.0236V12.1042L19.039 11.9205V11.8241C19.039 11.3031 19.4608 10.8733 19.9991 10.8457L23.5216 10.6653V11.1722C23.5216 11.4101 23.3446 11.6137 23.1021 11.6547L22.2544 11.7981V23.0038L21.1906 23.3696C20.3018 23.6753 19.3124 23.3481 18.8036 22.5804L13.6061 14.7373V22.2231L15.2058 22.5292L15.1836 22.6776C15.1137 23.1424 14.7124 23.494 14.227 23.5156L10.2481 23.6927C10.1955 23.1928 10.5701 22.7457 11.0869 22.6914L11.6103 22.6364V12.6553L10.2481 12.5788Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.6749 1.96678L3.72347 3.05585C2.76799 3.12109 2.02734 3.88925 2.02734 4.81499V20.3299C2.02734 21.1997 2.32676 22.0448 2.87843 22.7321L6.3178 27.0167C6.87388 27.7094 7.74899 28.0909 8.65435 28.0352L26.3586 26.9454C27.266 26.8895 27.9724 26.1619 27.9724 25.2832V7.64426C27.9724 7.10059 27.6979 6.59115 27.2369 6.27951L21.6325 2.49029C21.0613 2.10413 20.3702 1.91931 19.6749 1.96678ZM4.51447 5.057C4.29261 4.89274 4.3982 4.55055 4.6769 4.53056L19.7822 3.44711C20.2635 3.41259 20.7417 3.54512 21.1309 3.82088L24.1617 5.96813C24.2767 6.04965 24.2228 6.22563 24.0803 6.23338L8.08387 7.10336C7.59977 7.12969 7.12193 6.98747 6.73701 6.7025L4.51447 5.057ZM7.33357 9.8307C7.33357 9.311 7.75341 8.88177 8.29027 8.85253L25.203 7.93145C25.7263 7.90296 26.1667 8.30534 26.1667 8.81182V24.0853C26.1667 24.604 25.7484 25.0328 25.2126 25.0633L8.40688 26.0195C7.8246 26.0527 7.33357 25.6052 7.33357 25.0415V9.8307Z"
        fill="black"
      />
    </svg>
  );

  return (
    <div className="Documentation">
      <h4 className="option-header">Documentation</h4>
      <div>
        <ReadMoreText
          title={entityData["Service Name"]}
          text={
            "The Order Service is responsible for managing customer orders, processing payments, and updating order statuses in real time. It provides a RESTful API that allows clients to create, retrieve, update, and cancel orders. The service ensures data consistency and reliability by integrating with inventory management and payment processing systems. Key features include order validation, transaction logging, and automated status updates (e.g., pending, confirmed, shipped, delivered). The service is built using a microservices architecture, supporting scalability and fault tolerance. Authentication and authorization are handled via JWT tokens to ensure secure access. Logging and monitoring are implemented using tools like Prometheus and ELK Stack, allowing seamless debugging and performance tracking."
          }
        />
      </div>

      <br></br>

      <h4>External Documents</h4>
      <div className="section-container">
        {entityData.Documentation.map((documentInfo, index) => {
          return (
            <ExternalLink
              key={index}
              title={documentInfo.title}
              url={documentInfo.url}
              description={documentInfo.description}
            />
          );
        })}
      </div>

      <br></br>

      <h4>Service Aliases</h4>
      <div className="section-wrapper">
        {entityData["Service Aliases"].map((alias, index) => {
          return (
            <div className="section-container">
              <div className="title">{alias.alias}</div>
              <div className="details">{alias.description}</div>
            </div>
          );
        })}
      </div>

      <br></br>

      <h4>Related Repos</h4>
      <div className="section-wrapper">
        {entityData["RelatedRepos"].map((repo, index) => {
          return (
            <ExternalLink
              key={index}
              title={repo.name}
              url={repo.url}
              description={repo.description}
            />
          );
        })}
      </div>

      <br></br>

      <h4>Monitoring Channels</h4>
      <div className="section-wrapper">
        {entityData["MonitoringChannels"].map((channel, index) => {
          return (
            <ExternalLink
              key={index}
              title={channel.name}
              url={channel.url}
              description={channel.description}
              type={channel.type}
            />
          );
        })}
      </div>

      <br></br>
      <h4>Infrastructure Components</h4>
      <div className="section-wrapper">
        {entityData["Infrastructure Components"].map((component, index) => {
          return (
            <div key={index}>
              <div className="title-container">
                <div className="title">{component.name}</div>
                <div className="type">{component.type}</div>
              </div>
              <div className="description-container">
                {/* <InfoSVG className="infoSVG" /> */}
                <div className="description-wrapper">
                  <div className="details">{component.description}</div>
                  <div
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(component.id);
                      } catch (err) {
                        console.error("Failed to copy: ", err);
                      }
                    }}
                    className="id-copy-container"
                  >
                    <div className="details">ID: {component.id}</div>
                    <CopySVG className="copySVG" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <br></br>

      <h4>Service Maturity Scores(s)</h4>
      <div className="section-wrapper">
        {entityData["Service Maturity Score(s)"].map((score, index) => {
          return (
            <div key={index} className="service-maturity-score">
              <div className="score-wrapper">
                <div className="score">{score.score}</div>
                <div className="score-container">
                  <div className="title">{score.metric}</div>
                  <div className="details">{score.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <br></br>
    </div>
  );
}
