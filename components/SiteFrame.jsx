'use client';
import {usePathname} from 'next/navigation';
import Navigation from './Navigation.jsx';
import Footer from './Footer.jsx';
export default function SiteFrame({children}){
  const pathname=usePathname();
  const privateArea=pathname==='/admin'||pathname==='/login';
  return <>{!privateArea&&<a href="#main-content" className="skip-to-content">Skip to content</a>}{!privateArea&&<Navigation/>}<main id="main-content">{children}</main>{!privateArea&&<Footer/>}</>;
}
