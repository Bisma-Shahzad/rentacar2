import '../Navbar/Navbar.css'

export default function Footer() {
    return (<>
        <div className="mainFooter">
            <div>
                <li className='FooterLogo'><a href='/'>Wheel Connect</a></li>
            </div>
            <div className='Footerlistdiv'>
                <ul>
                    <li className='Footerlist'>ABOUT</li>
                    <li className='Footerlist'>LOGIN</li>
                    <li className='FooterButton'>LIST YOUR VEHICLE</li>
                </ul>
            </div>
        </div>
    </>)
}