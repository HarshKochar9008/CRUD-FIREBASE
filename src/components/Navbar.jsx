import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="my-4 gap-4 h-[60px] rounded-xl flex items-center justify-between px-4 bg-white/10 border border-white/20 text-xl font-medium shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <img src="/firebase.svg" className="h-8 w-8" />
        <h1 className="font-sans text-white tracking-wide">Contact Manager</h1>
      </div>
      <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Home</Link>
    </div>
  );
};

export default Navbar;
