import styled from "styled-components";

const TestComponent1 = ({ className, children }) => (
  <div className={className}>{children}test 1</div>
);

const TestComp2 = ({ className, children }) => (
  <div className={className}>Test comp 2</div>
);

const Link = ({ className, children }) => <a className={className}>LINK</a>;

const StyledTestComponent = styled(TestComp2)`
  background-color: rgb(194, 180, 57) !important;
  display: inline-block;
  color: #bf4f74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
  display: block;
`;

const StyledLink = styled(TestComponent1)`
  background-color: rgb(29, 104, 189) !important;
  display: inline-block;
  color: #bf4f74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solidrgb(94, 223, 62);
  border-radius: 3px;
  display: block;
`;

export default function StyledComponent() {
  return (
    <div>
      <StyledLink className={"testing!"} />
      <StyledLink className={"testing2"}>test</StyledLink>
      <StyledTestComponent className={"testing!2"}>water</StyledTestComponent>
    </div>
  );
}
