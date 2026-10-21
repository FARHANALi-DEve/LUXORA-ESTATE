import PropertyExplorer from '../../components/PropertyExplorer.jsx';
import HeroStage from '../../components/HeroStage.jsx';
import {listProperties} from '../../lib/store.js';
export const metadata={title:'Explore residences'};
export const dynamic='force-dynamic';
export default async function PropertiesPage(){const properties=await listProperties();return <><section className="page-intro page-intro-collection concept-3d-intro"><HeroStage/><div className="container"><div className="eyebrow light"><span className="small-dot"/> THE PRIVATE COLLECTION</div><div className="page-intro-bottom"><h1>Find your<br/><em>somewhere.</em></h1><p>Remarkable homes. Thoughtfully discovered.<br/>Explore our edit of extraordinary spaces.</p></div></div><span className="page-intro-index">01 / 02 — RESIDENCES · LIVE CONCEPTUAL 3D</span></section><section className="catalog-section section-pad"><div className="container"><div className="catalog-heading"><p>EXPLORE THE COLLECTION</p><span>DESIGNED FOR THE WAY YOU LIVE</span></div><PropertyExplorer initial={properties}/></div></section></>}
