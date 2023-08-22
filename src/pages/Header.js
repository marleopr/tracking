import { styled } from "styled-components";
import trackingLogo from "../assets/tracking logo.png"
import DownloadButton from "../components/loadersButtons/DownloadButton";
import { goToHomePage } from "../routes/Cordinator";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div style={{ cursor: "pointer" }} onClick={() => goToHomePage(navigate)}>
                <ImgLogo src={trackingLogo} />
            </div>
            <DownloadButton />
        </div>
    )
}
export default Header;
const ImgLogo = styled.img`
    width: 250px;
    margin: 10px;
`