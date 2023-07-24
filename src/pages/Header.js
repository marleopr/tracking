import { styled } from "styled-components";
import trackingLogo from "../assets/tracking logo.png"
const Header = () => {
    const handleReloadHomePage = () => {
        window.location.reload();
    };
    return (
        <div>
            <div style={{ cursor: "pointer" }} onClick={() => handleReloadHomePage()}>
                {/* <h1>Tracking</h1> */}
            <ImgLogo src={trackingLogo}/>
            </div>
        </div>
    )
}
export default Header;
const ImgLogo = styled.img`
    width: 250px;
    margin: 10px;
`