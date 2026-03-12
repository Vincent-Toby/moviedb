import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#000] text-[#A1A1AA] border-t border-[#222] px-[16px] md:px-[40px] py-[24px]">
      <div className="flex flex-col md:flex-row items-center justify-between">

        {/* logo */}
        <span className="text-white text-[18px] font-semibold">
          movieDB
        </span>

        <span className="text-[13px]">
          © 2026 Vincent
        </span>

      </div>
    </footer>
  );
};