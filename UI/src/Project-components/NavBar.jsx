export default function NavBar() {
  return (
    <div className="NavBar">
      <h3 onClick={()=>{
        window.location.href = "/"
      }}>Scrollos</h3>
      <div></div>
    </div>
  );
}
