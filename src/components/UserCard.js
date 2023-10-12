import { Button } from "@mui/material";
import BSButton from "./BSButton";
import './Navbar/Navbar.css'

function UserCard(a) {
    return <>
        <div className="prod-div" onClick={a.onClick}>
            {/* <h4>{a.id}</h4> */}
            <div className="img-div">
                <img src={a.src} />
            </div>
            <div className="prod-desc">
                <h4 className="prod-name">{a.title}</h4>

                <h5 className="prod-rate">Price: Rs{a.price}</h5>
            </div>
        </div>
    </>
}

export default UserCard;