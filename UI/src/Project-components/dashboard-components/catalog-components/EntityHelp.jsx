import "../../../css/EntityHelp.css";
import InfoSVG from "../../../assets/dashboard/catalog-assets/info.svg?react";

export default function EntityHelp({ entityData }) {
  return (
    <div className="EntityHelp">
      <h4>Contacts</h4>
      <div className="contacts-container">
        {entityData.Contacts.map((contact, index) => {
          return (
            <div className="channel-container">
              <div className="description">
                <InfoSVG className="infoSVG" />
                <div className="description">{contact.description}</div>
              </div>
              <div className="wrapper">
                <div className="key-value-container">
                  <div className="key">Contact</div>
                  <a href={`mailto:${contact.email}`} className="contact value">
                  {contact.email}
                  </a>
                </div>
                <div className="key-value-container">
                  <div className="key">Role</div>
                  <div className="value">{contact.role}</div>
                </div>
              </div>
              <div className="absolute-container">
                <div className="name">{contact.name}</div>
              </div>
            </div>
            // <div key={index} className="contact-card">
            //   <div className="key">{contact.name}</div>
            //   <p class="role">{contact.role}</p>

            //   <p class="description">{contact.description}</p>
            //   <a href={`mailto:${contact.email}`} class="email">
            //     {contact.email}
            //   </a>
            // </div>
          );
        })}
      </div>
      <br></br>
      <h4>Support Channels</h4>
      <div className="support-channels-container">
        {entityData["Support Channels"].map((channel, index) => {
          return (
            <div className="channel-container">
              <div className="description">
                <InfoSVG className="infoSVG" />
                <div>{channel.description}</div>
              </div>
              <div className="wrapper">
                <div className="key-value-container">
                  <div className="key">Contact</div>
                  <div className="contact value">
                  {channel.contact}
                  </div>
                </div>
                <div className="key-value-container">
                  <div className="key">Type</div>
                  <div className="value">
                    {channel.type}
                  </div>
                </div>
              </div>
              <div className="absolute-container">
                <div className="name">{channel.name}</div>
              </div>
            </div>
          );
        })}
      </div>
      <br></br>
    </div>
  );
}
