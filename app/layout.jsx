import './globals.css';
import SiteFrame from '../components/SiteFrame.jsx';
export const metadata={title:{default:'LUXORA ESTATE — Spaces beyond expectation',template:'%s | LUXORA ESTATE'},description:'Explore considered spaces through a cinematic luxury property experience and interactive 3D architectural study.',icons:{icon:'/mark.svg'},robots:{index:false,follow:false}};
export default function RootLayout({children}){return <html lang="en"><body><SiteFrame>{children}</SiteFrame></body></html>}
