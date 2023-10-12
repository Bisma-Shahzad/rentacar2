import { Box } from "@mui/material";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getIdData, userLogout } from "../../config/firebasemethods";
import BSScreenHeadercar from "../../components/BSScreenHeadercar";
import BSButton from "../../components/BSButton";
import UserCard from "../../components/UserCard";
import SearchBargpt from "../../components/Searchbar/searchbargpt";
import CircularProgress from '@mui/material/CircularProgress';
import { Navbar } from "../../components/Navbar/Navbar";
import '../../components/Navbar/Navbar.css'
import { Link, NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";



export default function Home() {
    const [listData, setListData] = useState([]);
    const [searchProd, setSearchProd] = useState('');
    const [loader, setLoader] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);

    let nav = useNavigate()
    const dataFromRedux = useSelector((a) => a.Login);
    console.log(dataFromRedux);

    let getdata = () => {
        setLoader(true)
        getIdData("cars", '')
            .then((res) => {
                console.log(res)
                const result = Object.values(res).flatMap((value) =>
                    Object.values(value)
                        .map(({
                            ac, bluetooth, carName, cost, description, gps, id, image, modelname, usbPort, userName, userid, available
                        }) => ({
                            ac, bluetooth, carName, cost, description, gps, id, image, modelname, usbPort, userName, userid, available
                        }))
                );

                console.log(result);
                setListData(result);
                setLoader(false)
            })
            .catch((err) => {
                console.log('no data found')
                setLoader(false)
            });
    };

    useEffect(() => {
        getdata();
    }, []);
    console.log(listData)


    let logout = () => {
        userLogout()
            .then((res) => {
                console.log("Logged out")
                nav("/")
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleSearch = (text) => {
        setSearchProd(text)
    };

    const getProduct = (e) => {
        nav('/cardetails', {
            state: e
        })
        console.log(e)
    }

    return <>
        <nav>
            <Link to="/" className="title">
                Website
            </Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
            </div>
            <div className="search-bar">
                <SearchBargpt label="Search cars" onSearch={handleSearch} />
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/about" style={{ width: '80px' }}>ABOUT</NavLink>
                </li>
                <li>
                    <NavLink to="/login" style={{ width: '80px' }}>LOGIN</NavLink>
                </li>
                <li>
                    <NavLink to="/services" className={'listvehicle'} >LIST YOUR VEHICLE</NavLink>
                </li>
            </ul>
        </nav>
        <div className="mainbanner">
            <h1 style={{ padding: 0 }}>iadfkjdshgjfhsgjdhgjghdaghjfghkjhkg</h1>
        </div>
        <Container>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <h1 style={{color: '#535969', borderBottom: '3px double #283043', marginBottom: '5%'}}>CARS AVAILABLE AT WHEEL CONNECT</h1>
            </div>
            {loader ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Spinner animation="border" style={{}} />
            </div> :
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', }}>
                        {listData.filter((x) => x.carName.toLowerCase().includes(searchProd)).map((x, i) => {
                            return (
                                <UserCard title={x.carName} src={x.image} price={x.cost}
                                    onClick={() => getProduct(x)}
                                />
                            )
                        })}
                    </div>
                </div>}
        </Container>
        <Footer />
    </>
}
// .filter((x) => x.title.toLowerCase().includes(searchProd))