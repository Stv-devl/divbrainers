import { iconsMap } from '@/constante/iconsMap';

const Footer = () => {
  return (
    <footer className="mt-4">
      <div className="flex flex-row justify-center items-center gap-2">
        <iconsMap.IconLogo className="size-8" />
        <p className="copyright">© 2025 DivBrainers. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
